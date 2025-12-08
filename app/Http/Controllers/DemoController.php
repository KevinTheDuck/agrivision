<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\AgrivisionAIService;
use Illuminate\Support\Facades\Log;

class DemoController extends Controller
{
    public function index()
    {
        return Inertia::render('Demo/Index');
    }

    public function analyze(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120', // 5MB max
        ]);

        try {
            $aiService = new AgrivisionAIService();
            $result = $aiService->classify($request->file('image'));

            if ($result['success']) {
                return back()->with([
                    'analysis' => $result['data'],
                    'success' => 'Analysis completed successfully.'
                ]);
            } else {
                return back()->withErrors(['image' => $result['error']]);
            }
        } catch (\Exception $e) {
            Log::error('Demo analysis exception: ' . $e->getMessage());
            return back()->withErrors(['image' => 'System error during analysis.']);
        }
    }
}
