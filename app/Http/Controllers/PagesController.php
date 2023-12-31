<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function index()
    {
        // if (auth()->user()->role == "pemilih") {
        // } else {
        return Inertia::render("Admin/Dashboard", [
            "title" => "Dashboard"
        ]);
        // }
    }

    public function signInSiswa(Request $request)
    {
        try {
            if ($request->data) {
                $kodeDecode = base64_decode($request->data);
                $user = User::where("kode", $kodeDecode)->where("status", "belum memilih");
                if ($user->first()) {
                    $user->update([
                        "status" => "sudah memilih"
                    ]);
                    Auth::attempt(["kode" => $request->data]);
                    $request->session()->regenerate();
                    return response()->json("Sign in berhasil!", 200);
                }
                return response()->json("Kode yang anda masukkan salah!", 500);
            } else {
                return response()->json("Harap isi kode terlebih dahulu!", 500);
            }
        } catch (\Throwable $th) {
            return response()->json("Terjadi kesalahan!", 500);
        }
    }

    public function setting()
    {
        return Inertia::render("Admin/Setting", [
            "title" => "Setting"
        ]);
    }
}
