import { Link } from "@inertiajs/react";
import { Button, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { HiBars3, HiCog6Tooth, HiHome, HiUser, HiUsers } from "react-icons/hi2";

export default function Sidebar() {
    const [collapseBar, setCollapseBar] = useState(false);
    const barList = [
        {
            link: "dashboard",
            icon: <HiHome className="w-6 h-6" />,
        },
        {
            link: "candidate",
            icon: <HiUsers className="w-6 h-6" />,
        },
        {
            link: "voter",
            icon: <HiUser className="w-6 h-6" />,
        },
        {
            link: "setting",
            icon: <HiCog6Tooth className="w-6 h-6" />,
        },
    ];

    return (
        <>
            <div
                className={`fixed mt-16 ${
                    collapseBar ? "w-14" : "w-52"
                } transition-all h-[calc(100vh-4rem)] bg-slate-900 flex flex-col justify-between`}
            >
                <div className="flex flex-col items-center gap-2 w-full">
                    <img
                        src="/img/logo.png"
                        alt="Logo"
                        className={`${
                            collapseBar ? "w-12 h-12 mt-24" : "w-36 h-36"
                        }`}
                    />
                    <div className="w-full px-2 flex flex-col gap-2">
                        {barList &&
                            barList.map((d, i) => (
                                <Link key={i} href={route(d.link)}>
                                    <Button
                                        color="blue"
                                        variant={
                                            route().current(d.link)
                                                ? "gradient"
                                                : "text"
                                        }
                                        fullWidth
                                        className="flex items-center gap-2 p-2"
                                    >
                                        {d.icon}
                                        {!collapseBar && d.link}
                                    </Button>
                                </Link>
                            ))}
                    </div>
                </div>
                <IconButton
                    variant="text"
                    color="blue"
                    className="self-end m-2"
                    onClick={() => setCollapseBar(!collapseBar)}
                >
                    <HiBars3 strokeWidth={1} className="w-6 h-6 text-white" />
                </IconButton>
            </div>
        </>
    );
}
