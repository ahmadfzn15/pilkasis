<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class VotingController extends Controller
{
    public function index()
    {
        return Inertia::render("Voting", [
            "title" => config("app.name") ?? "Votes",
            "data" => Candidate::all()
        ]);
    }

    public function voter()
    {
        return Inertia::render("Admin/Voter", [
            "title" => "Voter"
        ]);
    }

    public function get()
    {
        try {
            $data = User::where('role', 'pemilih')->get();

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json('Fetching data gagal!', 500);
        }
    }

    public function generate(Request $request)
    {
        try {
            for ($i = 1; $i <= $request->data; $i++) {
                $kode = Str::random(5);
                User::create([
                    'kode' => $kode,
                ]);
            }

            return response()->json($request->data . " Kode pemilih berhasil digenerate", 200);
        } catch (\Throwable $th) {
            return response()->json('Kode pemilih gagal digenerate!', 500);
        }
    }

    public function truncate()
    {
        try {
            User::where('role', 'pemilih')->truncate();

            return response()->json("Semua data pemilih berhasil dihapus", 200);
        } catch (\Throwable $th) {
            return response()->json('Data pemilih gagal dihapus', 500);
        }
    }

    public function result()
    {
        try {
            $data = Candidate::all();

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json('Data pemilih gagal dihapus', 500);
        }
    }

    public function vote(Request $request, Candidate $candidate, User $user)
    {
        try {
            $kandidat = $candidate->find($request->data);
            $kandidat->update([
                "hasil" => $kandidat->hasil + 1
            ]);
            $user->find(1)->update([
                "status" => "sudah memilih"
            ]);

            return response()->json("Permintaan berhasil dikonfirmasi", 200);
        } catch (\Throwable $th) {
            return response()->json('Data pemilih gagal dihapus', 500);
        }
    }

    public function print()
    {
        return Inertia::render("Admin/PrintCode", [
            "title" => "Print Code",
            "data" => User::where("role", "pemilih")->get()
        ]);
    }
}
