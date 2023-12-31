import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function Admin({ children }) {
    return (
        <>
            <div className="max-w-screen min-h-screen overflow-hidden bg-slate-300">
                <Navbar />
                <Sidebar />
                <div className="pl-52 pt-16">
                    <main className="px-4 pt-12">{children}</main>
                </div>
            </div>
        </>
    );
}
