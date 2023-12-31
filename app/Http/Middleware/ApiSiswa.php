<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiSiswa
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $check = User::where("nis", $request->user()->nis)->where("password", $request->user()->password)->get()->count();

        if (!$request->expectsJson() || $request->user()->role != "siswa" || $check != 1) {
            return response()->json("Anda tidak memiliki hak akses", 403);
        }

        return $next($request);
    }
}
