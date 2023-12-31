import Admin from "@/Layouts/Admin";
import { Head, Link } from "@inertiajs/react";
import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Chip,
    Dialog,
    DialogBody,
    DialogFooter,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Spinner,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import {
    HiBars3,
    HiMiniInformationCircle,
    HiPrinter,
    HiTrash,
    HiXMark,
} from "react-icons/hi2";
import { BsCheck2Circle } from "react-icons/bs";
import { MdError } from "react-icons/md";
import Loading from "@/Components/Loading";

export default function Voter({ title }) {
    const card = useRef(null);
    const inputGenerate = useRef(null);
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const [dialogDelete, setDialogDelete] = useState(false);
    const [data, setData] = useState(null);
    const [jumlahPemilih, setJumlahPemilih] = useState(null);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sm, setSm] = useState(true);
    const [bm, setBm] = useState(true);

    useEffect(() => {
        setData(
            (d) =>
                d &&
                d.filter((item) => {
                    if (sm && bm) {
                        return item;
                    } else if (sm) {
                        return item.status == "sudah memilih";
                    } else if (bm) {
                        return item.status == "belum memilih";
                    }
                })
        );
    }, [sm, bm]);

    const generate = async (e) => {
        e.preventDefault();

        if (jumlahPemilih) {
            setLoading(true);

            await axios
                .post(route("generate.voter"), { data: jumlahPemilih })
                .then((res) => {
                    setJumlahPemilih(0);
                    setStatus(!status);
                    setLoading(false);
                    setAlert({
                        open: true,
                        type: "success",
                        message: res.data,
                    });
                })
                .catch((err) => {
                    setJumlahPemilih(0);
                    setLoading(false);
                    setAlert({
                        open: true,
                        type: "error",
                        message: err.response.data,
                    });
                });
        } else {
            setError({
                message:
                    "Harap isi terlebih dahulu jumlah pemilih yang akan di generate!",
            });
            inputGenerate.current.focus();
        }
    };

    const deleteAll = async () => {
        setDialogDelete(!dialogDelete);
        setLoading(true);
        await axios
            .delete(route("delete.voter"))
            .then((res) => {
                setStatus(!status);
                setLoading(false);
                setAlert({
                    open: true,
                    type: "success",
                    message: res.data,
                });
            })
            .catch((err) => {
                setLoading(false);
                setAlert({
                    open: true,
                    type: "error",
                    message: err.response.data,
                });
            });
    };

    useEffect(() => {
        const getData = async () => {
            await axios
                .get(route("voter.data"))
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    setAlert({
                        open: true,
                        type: "error",
                        message: err.response.data,
                    });
                });
        };

        getData();
    }, [status]);

    useEffect(() => {
        gsap.from(card.current, {
            y: 40,
            duration: 0.5,
            opacity: 0,
        });
    }, []);

    return (
        <>
            {loading && <Loading />}
            <Head title={title} />
            <Admin>
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
                <Card className="shadow-lg" ref={card}>
                    <CardHeader color="blue" className="px-5 py-4">
                        <Typography variant="h5">Voter</Typography>
                    </CardHeader>
                    <CardBody className="p-5">
                        <div className="w-full flex justify-between gap-10">
                            <div className="flex flex-col gap-4 w-3/4">
                                <div className="flex justify-between">
                                    <div className="flex items-center justify-around w-full">
                                        {data && (
                                            <div className="flex items-center gap-2">
                                                <Typography>Total</Typography>
                                                <Chip
                                                    color="blue"
                                                    value={data.length}
                                                />
                                            </div>
                                        )}
                                        {data && (
                                            <div className="flex items-center gap-2">
                                                <Typography>
                                                    Sudah Memilih
                                                </Typography>
                                                <Chip
                                                    color="blue"
                                                    value={
                                                        data.filter(
                                                            (d) =>
                                                                d.status ==
                                                                "sudah memilih"
                                                        ).length
                                                    }
                                                />
                                            </div>
                                        )}
                                        {data && (
                                            <div className="flex items-center gap-2">
                                                <Typography>
                                                    Belum Memilih
                                                </Typography>
                                                <Chip
                                                    color="blue"
                                                    value={
                                                        data.filter(
                                                            (d) =>
                                                                d.status ==
                                                                "belum memilih"
                                                        ).length
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        {/* <ButtonGroup color="blue">
                                            <Button className="py-1 px-4">
                                                <Checkbox
                                                    color="green"
                                                    label="Sudah memilih"
                                                    containerProps={{
                                                        className: "p-1",
                                                    }}
                                                    labelProps={{
                                                        className: "text-white",
                                                    }}
                                                    onChange={() => setSm(!sm)}
                                                    checked={sm}
                                                />
                                            </Button>
                                            <Button className="py-1 px-4">
                                                <Checkbox
                                                    color="green"
                                                    label="Belum memilih"
                                                    containerProps={{
                                                        className: "p-1",
                                                    }}
                                                    labelProps={{
                                                        className: "text-white",
                                                    }}
                                                    onChange={() => setBm(!bm)}
                                                    checked={bm}
                                                />
                                            </Button>
                                        </ButtonGroup> */}
                                        <Menu>
                                            <MenuHandler>
                                                <IconButton
                                                    color="blue"
                                                    variant="gradient"
                                                >
                                                    <HiBars3
                                                        className="w-6 h-6"
                                                        strokeWidth={1}
                                                    />
                                                </IconButton>
                                            </MenuHandler>
                                            <MenuList>
                                                <Link
                                                    href={route("voter.print")}
                                                >
                                                    <MenuItem className="flex items-center gap-2 text-blue">
                                                        <HiPrinter className="w-4 h-4" />
                                                        Cetak Kode
                                                    </MenuItem>
                                                </Link>
                                                <MenuItem
                                                    className="flex items-center gap-2 text-red"
                                                    onClick={() =>
                                                        setDialogDelete(true)
                                                    }
                                                >
                                                    <HiTrash className="w-4 h-4" />
                                                    Hapus Semua
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="overflow-x-auto max-h-[25rem] rounded-lg ring-2 ring-slate-300 table-siswa">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    No
                                                </th>
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    Kode
                                                </th>
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data ? (
                                                data.length != 0 ? (
                                                    data.map((d, i) => (
                                                        <tr
                                                            key={i}
                                                            className="odd:bg-white even:bg-blue-100 text-slate-700 text-center border-t border-slate-300"
                                                        >
                                                            <td className="py-2 px-4 whitespace-nowrap">
                                                                {i + 1}.
                                                            </td>
                                                            <td className="py-2 px-4 whitespace-nowrap">
                                                                {d.kode}
                                                            </td>
                                                            <td className="py-2 px-4 whitespace-nowrap">
                                                                {d.status}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                                        <td
                                                            className="py-2 px-4 whitespace-nowrap"
                                                            colSpan="10"
                                                        >
                                                            Data Voter Kosong
                                                        </td>
                                                    </tr>
                                                )
                                            ) : (
                                                <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                                    <td
                                                        className="py-2 px-4 whitespace-nowrap"
                                                        colSpan="10"
                                                    >
                                                        <Spinner
                                                            color="blue"
                                                            className="w-32 h-32 mx-auto my-10"
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-1/2 pt-14">
                                <form onSubmit={generate} className="space-y-4">
                                    <div className="">
                                        <Input
                                            type="number"
                                            color="blue"
                                            label="Jumlah Pemilih"
                                            value={jumlahPemilih}
                                            onChange={(e) =>
                                                setJumlahPemilih(e.target.value)
                                            }
                                            inputRef={inputGenerate}
                                            min={1}
                                            max={1000}
                                        />
                                        {error ? (
                                            <small className="text-red flex items-center gap-1 mt-1">
                                                <HiMiniInformationCircle className="w-4 h-4" />
                                                {error.message}
                                            </small>
                                        ) : (
                                            <small className="text-gray flex items-center gap-1 mt-1">
                                                <HiMiniInformationCircle className="w-4 h-4" />
                                                Maksimal 1000 pemilih
                                            </small>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        color="blue"
                                        fullWidth
                                        className="flex justify-center items-center gap-2"
                                    >
                                        Tambah Pemilih
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Admin>
            <Dialog
                open={dialogDelete}
                handler={setDialogDelete}
                animate={{
                    mount: { scale: 1, opacity: 1 },
                    unmount: { scale: 0, opacity: 0 },
                }}
            >
                <DialogBody>
                    <Typography variant="h5" color="black">
                        Apakah anda yakin ingin menghapus semua data pemilih?
                    </Typography>
                </DialogBody>
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        color="green"
                        onClick={() => setDialogDelete(!dialogDelete)}
                    >
                        Batal
                    </Button>
                    <Button color="red" onClick={deleteAll}>
                        Ya
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
