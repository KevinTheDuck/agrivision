<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /** @return Response */
    public function index(): Response
    {
        return Inertia::render("Home", [
            "title" => "Agrivision - Home",
        ]);
    }
}
