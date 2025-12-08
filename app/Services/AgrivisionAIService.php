<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AgrivisionAIService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.agrivision_ai.url');
    }

    /**
     * Send an image to the AI model for classification.
     *
     * @param UploadedFile $image
     * @return array
     */
    public function classify(UploadedFile $image)
    {
        try {
            $response = Http::attach(
                'file',
                file_get_contents($image->getRealPath()),
                $image->getClientOriginalName()
            )->post("{$this->baseUrl}/predict");

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json()
                ];
            }

            // Handle known error responses
            $errorData = $response->json();
            $errorCode = $errorData['detail']['code'] ?? 'UNKNOWN_ERROR';
            $errorMessage = $errorData['detail']['message'] ?? 'An unknown error occurred during analysis.';

            // Map specific codes to user-friendly messages if needed
            $userMessage = match($errorCode) {
                'NOT_PLANT_IMAGE' => 'The image does not appear to contain a plant.',
                'INVALID_IMAGE' => 'The image file appears to be corrupt or invalid.',
                'FILE_TOO_LARGE' => 'The image file is too large (Max 5MB).',
                'MODEL_NOT_LOADED' => 'The AI model is currently initializing. Please try again later.',
                default => "AI Analysis failed: $errorMessage"
            };

            Log::warning("Agrivision AI Error ($errorCode): " . $response->body());

            return [
                'success' => false,
                'error' => $userMessage,
                'code' => $errorCode
            ];

        } catch (\Exception $e) {
            Log::error('Agrivision AI Exception: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => 'System connection error. AI service unavailable.',
                'code' => 'CONNECTION_ERROR'
            ];
        }
    }
}
