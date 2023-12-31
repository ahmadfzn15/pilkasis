<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Admin/Candidate", [
            "title" => "Candidate",
            "data" => Candidate::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Candidate $candidate)
    {
        // try {
        $validated = $request->validate([
            "paslon" => "numeric|required|min:1|unique:candidates,paslon",
            "foto" => "required|image|mimes:png,jpg,jpeg|max:6144",
            "ketua" => "required|string|max:255",
            "wakil" => "required|string|max:255",
            "visi" => "required",
            "misi" => "required",
        ]);

        $fileName = time() . "." . $validated["foto"]->getClientOriginalExtension();
        Storage::putFileAs("images", $validated["foto"], $fileName);
        $validated["foto"] = $fileName;
        $candidate->create($validated);

        return response()->json("Data berhasil ditambahkan", 200);
        // } catch (\Throwable $th) {
        //     return response()->json("Data gagal ditambahkan", 500);
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show(Candidate $candidate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Candidate $candidate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(int $id, Request $request, Candidate $candidate)
    {
        try {
            $kandidat = $candidate->find($id);
            if ($request->hasFile("foto")) {
                $validated = $request->validate([
                    "paslon" => "numeric|required|min:1",
                    "foto" => "required|image|mimes:png,jpg,jpeg|max:6144",
                    "ketua" => "required|string|max:255",
                    "wakil" => "required|string|max:255",
                    "visi" => "required",
                    "misi" => "required",
                ]);
            }

            if (!$request->hasFile("foto")) {
                $validated = $request->validate([
                    "paslon" => "numeric|required|min:1",
                    "foto" => "required",
                    "ketua" => "required|string|max:255",
                    "wakil" => "required|string|max:255",
                    "visi" => "required",
                    "misi" => "required",
                ]);
            }

            if (!Storage::exists("images/" . $validated["foto"])) {
                if ($kandidat->foto) {
                    Storage::delete("images/" . $kandidat->foto);
                }
                $fileName = time() . "." . $validated["foto"]->getClientOriginalExtension();
                Storage::putFileAs("images", $validated["foto"], $fileName);
                $validated["foto"] = $fileName;
            }

            $kandidat->update($validated);

            return response()->json("Data berhasil diubah", 200);
        } catch (\Throwable $th) {
            return response()->json("Data gagal diubah", 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(int $id, Candidate $candidate)
    {
        $kandidat = $candidate->find($id);
        if ($kandidat->foto) {
            Storage::delete("images/" . $kandidat->foto);
        }
        $kandidat->deleteOrFail();
        return response()->json("Data berhasil dihapus", 200);
    }

    public function get()
    {
        try {
            $data = Candidate::all();

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json('Fetching data gagal!', 500);
        }
    }
}
