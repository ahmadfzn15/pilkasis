<?php

namespace App\Http\Middleware;

use App\Models\Spp;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Siswa
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->guest() || auth()->user()->role != 'siswa') {
            abort(403);
        }
        $spp = new Spp();
        $spp->generateSpp();

        return $next($request);
    }
}
