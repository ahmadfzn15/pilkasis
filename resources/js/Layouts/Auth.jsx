export default function Auth({ children }) {
    return (
        <>
            <div className="max-w-screen h-screen flex flex-col pt-10 items-center gap-10 overflow-hidden bg-slate-300">
                <img src="/img/logo.png" alt="Logo" className="w-44 h-44" />
                <main>{children}</main>
            </div>
        </>
    );
}
