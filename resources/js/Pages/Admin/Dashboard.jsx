import Admin from "@/Layouts/Admin";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function Dashboard({ title }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            await axios
                .get(route("voting.result"))
                .then((res) => {
                    setData({
                        paslon: res.data.map((item) => "Paslon" + item.paslon),
                        result: res.data.map((item) => item.hasil),
                    });
                })
                .catch((err) => {
                    setLoading(false);
                });
        };

        getData();
    }, []);

    const barChart = {
        type: "bar",
        height: 400,
        series: [
            {
                name: "Vote",
                data: data && data.result,
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: true,
                },
            },
            title: {
                show: "",
            },
            colors: ["#3b82f6"],
            plotOptions: {
                bar: {
                    columnWidth: "75%",
                    borderRadius: 5,
                },
            },
            xaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: data && data.paslon,
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "15px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    return (
        <>
            <Head title={title} />
            <Admin>
                <Card>
                    <CardHeader color="blue" className="px-5 py-4 text-center">
                        <Typography variant="h5">Hasil</Typography>
                    </CardHeader>
                    <CardBody>
                        <Chart {...barChart} />
                    </CardBody>
                </Card>
            </Admin>
        </>
    );
}
