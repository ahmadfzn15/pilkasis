import Sidebar from "./Sidebar";

export default function Navbar() {
    return (
        <>
            <nav className="w-screen fixed h-16 bg-slate-900 px-10 flex justify-between items-center gap-2 z-10">
                <h1 className="text-slate-300 font-semibold text-2xl">
                    SMK DA
                </h1>
                <div className="">
                    <div className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden ring-2 ring-blue-500">
                        <img src="/img/lusi.jpeg" alt="" />
                    </div>
                </div>
            </nav>
        </>
    );
}
