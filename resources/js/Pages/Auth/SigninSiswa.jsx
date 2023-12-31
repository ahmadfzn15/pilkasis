import Loading from "@/Components/Loading";
import Auth from "@/Layouts/Auth";
import { Link } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useRef, useState } from "react";
import { HiMiniInformationCircle } from "react-icons/hi2";

export default function SigninSiswa() {
    const link = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [kode, setKode] = useState(null);

    const signIn = async (e) => {
        e.preventDefault();

        await axios
            .post(route("signin.siswa"), { data: btoa(kode) })
            .then((res) => {
                if (res.status == 200) {
                    link.current.click();
                    setLoading(true);
                }
            })
            .catch((err) => {
                setError({ kode: err.response.data });
            });
    };

    return (
        <>
            <Link ref={link} href={route("voting")} />
            {loading && <Loading />}
            <Auth>
                <form onSubmit={signIn}>
                    <Card className="shadow-lg shadow-slate-400 w-[25rem] blur-[0.4px]">
                        <CardHeader color="blue" className="px-4 py-3">
                            <Typography variant="h5" className="text-center">
                                Sign in Form
                            </Typography>
                        </CardHeader>
                        <CardBody className="pb-0">
                            <Input
                                label="Kode"
                                color="blue"
                                onChange={(e) => setKode(e.target.value)}
                                error={error}
                                autoFocus
                            />
                            {error && (
                                <small className="text-red flex items-center gap-1 absolute mt-1">
                                    <HiMiniInformationCircle className="w-4 h-4" />
                                    {error.kode}
                                </small>
                            )}
                        </CardBody>
                        <CardFooter>
                            <div className="flex justify-between mt-3">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    color="green"
                                    fullWidth
                                >
                                    Sign in
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </Auth>
        </>
    );
}
