import Navbar from "@/Components/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <div className="max-w-screen min-h-screen overflow-hidden bg-slate-300 scroll-custom">
                <Navbar />
                <main className="px-16 pt-28 pb-10">{children}</main>
            </div>
        </>
    );
}
