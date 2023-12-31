import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function PrintCode({ title, data }) {
    useEffect(() => {
        onafterprint = () => {
            history.back();
        };

        print();
    });

    return (
        <>
            <Head title={title} />
            <div className="flex flex-wrap">
                {data &&
                    data.map((d, i) => (
                        <div
                            key={i}
                            className="py-2 w-20 flex justify-center items-center border border-black"
                        >
                            {d.kode}
                        </div>
                    ))}
            </div>
        </>
    );
}
