import Admin from "@/Layouts/Admin";
import { Head } from "@inertiajs/react";

export default function Setting({ title }) {
    return (
        <>
            <Head title={title} />
            <Admin></Admin>
        </>
    );
}
