import Loading from "@/Components/Loading";
import Admin from "@/Layouts/Admin";
import { Head, Link } from "@inertiajs/react";
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
    DialogHeader,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Textarea,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { BsCheck2Circle, BsPlus } from "react-icons/bs";
import {
    HiBars3,
    HiEye,
    HiPencil,
    HiPlus,
    HiTrash,
    HiXMark,
} from "react-icons/hi2";
import { MdError } from "react-icons/md";

export default function Candidate({ title }) {
    const fotoRef = useRef(null);
    const alertRef = useRef();
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const [dialogCreate, setDialogCreate] = useState(false);
    const [dialogEdit, setDialogEdit] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [field, setField] = useState({});
    const [idKandidat, setIdKandidat] = useState(null);
    const [urlFoto, setUrlFoto] = useState(null);

    const changePicture = async (e) => {
        const url = URL.createObjectURL(e);
        setUrlFoto(url);
        setField({ ...field, foto: e });
    };

    const openDialogEdit = (id) => {
        setIdKandidat(id);
        setDialogEdit(!dialogEdit);
        setField(data && data.filter((d) => d.id == id)[0]);
    };

    useEffect(() => {
        setField({});
        const getData = async () => {
            await axios
                .get(route("candidate.data"))
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

    const postData = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formStore = new FormData();
        formStore.append("paslon", field.paslon);
        formStore.append("foto", field.foto);
        formStore.append("ketua", field.ketua);
        formStore.append("wakil", field.wakil);
        formStore.append("visi", field.visi);
        formStore.append("misi", field.misi);

        await axios
            .post(route("candidate.store"), formStore, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setField({});
                setStatus(!status);
                setDialogCreate(!dialogCreate);
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

    const editData = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formEdit = new FormData();
        formEdit.append("paslon", field.paslon);
        formEdit.append("foto", field.foto);
        formEdit.append("ketua", field.ketua);
        formEdit.append("wakil", field.wakil);
        formEdit.append("visi", field.visi);
        formEdit.append("misi", field.misi);

        await axios
            .post(route("candidate.update", idKandidat), formEdit, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setField({});
                setIdKandidat(null);
                setStatus(!status);
                setDialogEdit(!dialogEdit);
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

    const deleteDialog = (id) => {
        setConfirmDelete(!confirmDelete);
        setIdKandidat(id);
    };

    const deleteKandidat = async () => {
        setConfirmDelete(!confirmDelete);
        setLoading(true);

        await axios
            .delete(route("candidate.delete", idKandidat))
            .then((res) => {
                setIdKandidat(null);
                setStatus(!status);
                setLoading(false);
                setAlert({
                    open: true,
                    type: "success",
                    message: res.data,
                });
            })
            .catch((err) => {
                setIdKandidat(null);
                setLoading(false);
                setAlert({
                    open: true,
                    type: "error",
                    message: err.response.data,
                });
            });
    };

    // useEffect(() => {
    //     if (alert.open) {
    //         setTimeout(() => {
    //             gsap.to(alertRef.current, {
    //                 y: -100,
    //                 opacity: 0,
    //             });
    //         }, 3000);
    //         setAlert({ open: false });
    //     }
    // }, [alert]);

    return (
        <>
            <Head title={title} />
            {loading && <Loading />}
            <Admin>
                {alert.open && (
                    <Alert
                        ref={alertRef}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-12">
                    {data &&
                        data.map((d, i) => (
                            <Card
                                key={i}
                                className="shadow-lg shadow-slate-400"
                            >
                                <CardHeader
                                    color="green"
                                    className="px-4 py-3 flex justify-between items-center"
                                >
                                    <Typography
                                        variant="h5"
                                        className="text-center"
                                    >
                                        Paslon {d.paslon}
                                    </Typography>
                                    <Menu>
                                        <MenuHandler>
                                            <IconButton
                                                size="sm"
                                                variant="text"
                                                color="white"
                                            >
                                                <HiBars3
                                                    className="w-6 h-6"
                                                    strokeWidth={1}
                                                />
                                            </IconButton>
                                        </MenuHandler>
                                        <MenuList>
                                            <MenuItem
                                                className="flex items-center gap-1 text-blue"
                                                onClick={() =>
                                                    openDialogEdit(d.id)
                                                }
                                            >
                                                <HiPencil className="w-4 h-4" />{" "}
                                                Edit
                                            </MenuItem>
                                            <MenuItem
                                                className="flex items-center gap-1 text-red"
                                                onClick={() =>
                                                    deleteDialog(d.id)
                                                }
                                            >
                                                <HiTrash className="w-4 h-4" />{" "}
                                                Hapus
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </CardHeader>
                                <CardBody className="pb-0">
                                    <div className="h-[17rem] flex justify-center items-center overflow-hidden rounded-lg">
                                        <img
                                            src={
                                                d.foto
                                                    ? `/storage/images/${d.foto}`
                                                    : "/img/lusi.jpeg"
                                            }
                                            alt="Foto"
                                            className=""
                                        />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <Typography className="text-center text-lg">
                                        {d.ketua + " & " + d.wakil}
                                    </Typography>
                                    <div className="flex justify-between mt-3">
                                        <Button
                                            color="blue"
                                            className="flex justify-center items-center gap-1"
                                            fullWidth
                                        >
                                            <HiEye className="w-4 h-4" /> Lihat
                                            Visi & Misi
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                </div>
                <div className="fixed right-5 bottom-5">
                    <Tooltip content="Tambah Kandidat Baru">
                        <IconButton
                            className="rounded-full"
                            variant="gradient"
                            color="green"
                            size="lg"
                            onClick={() => setDialogCreate(!dialogCreate)}
                        >
                            <BsPlus className="w-10 h-10" />
                        </IconButton>
                    </Tooltip>
                </div>
            </Admin>
            <Dialog
                dismiss={{ outsidePress: false }}
                open={dialogCreate}
                handler={setDialogCreate}
                size="xl"
                className="z-40"
            >
                <form onSubmit={postData} encType="multipart/formdata">
                    <DialogHeader className="flex justify-between bg-slate-800 text-slate-200 rounded-t-lg">
                        <Typography variant="lead">Form Kandidat</Typography>
                        <IconButton
                            color="blue"
                            size="sm"
                            variant="text"
                            onClick={() => {
                                setDialogCreate(!dialogCreate);
                                setField({
                                    ...field,
                                    foto: null,
                                });
                            }}
                        >
                            <HiXMark className="w-8 h-8" strokeWidth={1} />
                        </IconButton>
                    </DialogHeader>
                    <DialogBody divider className="overflow-auto max-h-[32rem]">
                        <div className="flex justify-between gap-10">
                            <div className="">
                                <div className="w-[24rem] h-[24rem] ring ring-slate-400 rounded-lg overflow-hidden flex flex-col justify-center items-center relative">
                                    {field.foto ? (
                                        <>
                                            <img src={urlFoto} alt="" />
                                            <div className="z-10 absolute flex gap-1 right-2 top-2 cursor-pointer">
                                                <IconButton
                                                    variant="gradient"
                                                    color="red"
                                                    onClick={() =>
                                                        setField({
                                                            ...field,
                                                            foto: null,
                                                        })
                                                    }
                                                    size="sm"
                                                >
                                                    <HiTrash className="w-5 h-5" />
                                                </IconButton>
                                                <IconButton
                                                    variant="gradient"
                                                    color="blue"
                                                    size="sm"
                                                    onClick={() =>
                                                        fotoRef.current.click()
                                                    }
                                                >
                                                    <HiPencil className="w-5 h-5" />
                                                </IconButton>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <HiPlus
                                                className="w-40 h-40 cursor-pointer"
                                                strokeWidth={1}
                                                onClick={() =>
                                                    fotoRef.current.click()
                                                }
                                            />
                                            <Typography variant="lead">
                                                Upload foto
                                            </Typography>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <input
                                    type="file"
                                    ref={fotoRef}
                                    name="foto"
                                    className="hidden"
                                    onChange={(e) =>
                                        changePicture(e.target.files[0])
                                    }
                                />
                                <Input
                                    color="blue"
                                    type="number"
                                    label="Nomor Paslon"
                                    value={field.paslon}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            paslon: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                />
                                <Input
                                    color="blue"
                                    type="text"
                                    label="Nama Ketua"
                                    value={field.ketua}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            ketua: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                />
                                <Input
                                    color="blue"
                                    type="text"
                                    label="Nama Wakil"
                                    value={field.wakil}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            wakil: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                />
                                <Textarea
                                    color="blue"
                                    label="Visi"
                                    value={field.visi}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            visi: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                    resize
                                />
                                <Textarea
                                    color="blue"
                                    label="Misi"
                                    value={field.misi}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            misi: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                    resize
                                />
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter className="flex justify-end gap-4">
                        <Button
                            type="submit"
                            color="green"
                            variant="gradient"
                            disabled={loading}
                        >
                            Tambah
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
            <Dialog
                dismiss={{ outsidePress: false }}
                open={dialogEdit}
                handler={setDialogEdit}
                size="xl"
                className="z-40"
            >
                <form onSubmit={editData} encType="multipart/formdata">
                    <DialogHeader className="flex justify-between bg-slate-800 text-slate-200 rounded-t-lg">
                        <Typography variant="lead">Edit Kandidat</Typography>
                        <IconButton
                            color="blue"
                            size="sm"
                            variant="text"
                            onClick={() => {
                                setDialogEdit(!dialogEdit);
                                setField({
                                    ...field,
                                    foto: null,
                                });
                            }}
                        >
                            <HiXMark className="w-8 h-8" strokeWidth={1} />
                        </IconButton>
                    </DialogHeader>
                    <DialogBody divider className="overflow-auto max-h-[32rem]">
                        <div className="flex justify-between gap-10">
                            <div className="">
                                <div className="w-[24rem] h-[24rem] ring ring-slate-400 rounded-lg overflow-hidden flex flex-col justify-center items-center relative">
                                    {field.foto ? (
                                        <>
                                            <img
                                                src={
                                                    urlFoto
                                                        ? urlFoto
                                                        : `/storage/images/${field.foto}`
                                                }
                                                alt=""
                                            />
                                            <div className="z-10 absolute flex gap-1 right-2 top-2 cursor-pointer">
                                                <IconButton
                                                    variant="gradient"
                                                    color="red"
                                                    onClick={() =>
                                                        setField({
                                                            ...field,
                                                            foto: null,
                                                        })
                                                    }
                                                    size="sm"
                                                >
                                                    <HiTrash className="w-5 h-5" />
                                                </IconButton>
                                                <IconButton
                                                    variant="gradient"
                                                    color="blue"
                                                    size="sm"
                                                    onClick={() =>
                                                        fotoRef.current.click()
                                                    }
                                                >
                                                    <HiPencil className="w-5 h-5" />
                                                </IconButton>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <HiPlus
                                                className="w-40 h-40 cursor-pointer"
                                                strokeWidth={1}
                                                onClick={() =>
                                                    fotoRef.current.click()
                                                }
                                            />
                                            <Typography variant="lead">
                                                Upload foto
                                            </Typography>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <input
                                    type="file"
                                    ref={fotoRef}
                                    name="foto"
                                    className="hidden"
                                    onChange={(e) =>
                                        changePicture(e.target.files[0])
                                    }
                                />
                                <Input
                                    color="blue"
                                    type="number"
                                    label="Nomor Paslon"
                                    value={field.paslon}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            paslon: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                />
                                <Input
                                    color="blue"
                                    type="text"
                                    label="Nama Ketua"
                                    value={field.ketua}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            ketua: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                />
                                <Input
                                    color="blue"
                                    type="text"
                                    label="Nama Wakil"
                                    value={field.wakil}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            wakil: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                />
                                <Textarea
                                    color="blue"
                                    label="Visi"
                                    value={field.visi}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            visi: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                    resize
                                />
                                <Textarea
                                    color="blue"
                                    label="Misi"
                                    value={field.misi}
                                    onChange={(e) =>
                                        setField({
                                            ...field,
                                            misi: e.target.value,
                                        })
                                    }
                                    required
                                    fullWidth
                                    resize
                                />
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter className="flex justify-end gap-4">
                        <Button
                            type="submit"
                            color="green"
                            variant="gradient"
                            disabled={loading}
                        >
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
            <Dialog
                open={confirmDelete}
                handler={setConfirmDelete}
                animate={{
                    mount: { scale: 1, opacity: 1 },
                    unmount: { scale: 0, opacity: 0 },
                }}
                className="z-40"
            >
                <DialogBody>
                    <Typography variant="h5" color="black">
                        Apakah anda yakin ingin menghapus Paslon 1?
                    </Typography>
                </DialogBody>
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        color="green"
                        onClick={() => {
                            setIdKandidat(null);
                            setConfirmDelete(!confirmDelete);
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        color="red"
                        onClick={deleteKandidat}
                        disabled={loading}
                    >
                        Ya
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
