import { Spinner, Typography } from "@material-tailwind/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Loading() {
    const load = useRef();

    useEffect(() => {
        gsap.from(load.current, {
            duration: 0.5,
            opacity: 0,
        });
    });

    return (
        <div
            ref={load}
            className="w-screen h-screen fixed bg-slate-900/40 backdrop-blur-md z-[99999] flex flex-col gap-5 justify-center items-center"
        >
            <Spinner className="w-32 h-32" color="blue" />
            <Typography variant="lead" color="white">
                Please Wait!
            </Typography>
        </div>
    );
}
