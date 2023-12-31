import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dialog,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { HiEye, HiXMark } from "react-icons/hi2";
import { MdError } from "react-icons/md";

export default function Voting({ auth, title, data }) {
    const card = useRef();
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const [confirm, setConfirm] = useState(false);
    const [visi, setVisi] = useState(false);
    const [ID, setID] = useState(null);

    const pilih = async () => {
        setConfirm(!confirm);
        if (ID) {
            await axios.post(route("vote"), { data: ID });
        }
    };

    useEffect(() => {
        gsap.from(card.current, {
            duration: 0.5,
            y: -100,
            opacity: 0,
        });
        console.log(auth);
    }, []);

    return (
        <>
            <Head title={title} />
            <Layout>
                {alert.open && (
                    <Alert
                        color={alert.type == "success" ? "green" : "red"}
                        variant="gradient"
                        className="fixed top-0 right-0 left-0 py-5 z-50"
                        animate={{
                            mount: { y: 0, opacity: 1 },
                            unmount: { y: -30, opacity: 0 },
                        }}
                        icon={
                            alert.type == "success" ? (
                                <BsCheck2Circle className="w-6 h-6" />
                            ) : (
                                <MdError className="w-6 h-6" />
                            )
                        }
                        open={alert.open}
                        action={
                            <HiXMark
                                className="w-6 h-6 absolute right-0 mr-5 cursor-pointer"
                                onClick={() => setAlert({ open: false })}
                            />
                        }
                    >
                        {alert.message}
                    </Alert>
                )}
                <div
                    ref={card}
                    className="grid grid-cols-3 gap-10 justify-center z-[3]"
                >
                    {data &&
                        data.map((d, i) => (
                            <Card
                                key={i}
                                className="shadow-lg shadow-slate-400"
                            >
                                <CardHeader color="green" className="px-4 py-3">
                                    <Typography
                                        variant="h5"
                                        className="text-center"
                                    >
                                        Paslon {d.paslon}
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pb-0">
                                    <div className="h-[20rem] flex justify-center items-center overflow-hidden rounded-lg">
                                        <img src="/img/lusi.jpeg" alt="Foto" />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <Typography className="text-center text-lg">
                                        {d.ketua + " & " + d.wakil}
                                    </Typography>
                                    <div className="flex justify-between mt-3">
                                        <Button
                                            color="blue"
                                            className="flex items-center gap-1"
                                            onClick={() => setVisi(!visi)}
                                        >
                                            <HiEye className="w-4 h-4" /> Lihat
                                            Visi & Misi
                                        </Button>
                                        <Button
                                            color="green"
                                            onClick={() => {
                                                setConfirm(!confirm);
                                                setID(d.id);
                                            }}
                                        >
                                            Pilih
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                </div>
            </Layout>
            <Dialog
                open={confirm}
                handler={setConfirm}
                animate={{
                    mount: { x: 0, scale: 1, opacity: 1 },
                    unmount: { x: ID == 1 ? -500 : 500, scale: 0, opacity: 0 },
                }}
            >
                <DialogBody>
                    <Typography variant="h5" color="black">
                        Apakah anda yakin ingin memilih Paslon 1?
                    </Typography>
                </DialogBody>
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        color="red"
                        onClick={() => {
                            setConfirm(!confirm);
                            setID(null);
                        }}
                    >
                        Batal
                    </Button>
                    <Button color="green" onClick={pilih}>
                        Ya
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog
                open={visi}
                handler={setVisi}
                animate={{
                    mount: { x: 0, scale: 1, opacity: 1 },
                    unmount: { x: -500, scale: 0, opacity: 0 },
                }}
                size="xl"
            >
                <DialogBody className="flex gap-5">
                    <div className="w-[20rem] h-[20rem] overflow-hidden rounded-lg flex justify-center items-center shrink-0">
                        <img src="/img/lusi.jpeg" alt="" />
                    </div>
                    <div className="flex flex-col gap-4 max-h-[20rem] overflow-y-auto">
                        <div>
                            <Typography variant="lead" color="black">
                                Visi
                            </Typography>
                            <Typography variant="paragraph">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Laboriosam dolore doloribus
                                doloremque odio hic vitae obcaecati veniam
                                quidem quas minus? Totam voluptate rem aperiam
                                veritatis neque at ipsam, quis voluptatum.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="lead" color="black">
                                Misi
                            </Typography>
                            <Typography variant="paragraph">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Laboriosam dolore doloribus
                                doloremque odio hic vitae obcaecati veniam
                                quidem quas minus? Totam voluptate rem aperiam
                                veritatis neque at ipsam, quis voluptatum.
                            </Typography>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        color="blue"
                        onClick={() => setVisi(!visi)}
                        className="flex items-center gap-1"
                    >
                        <HiXMark className="w-4 h-4" strokeWidth="2" />
                        Tutup
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
