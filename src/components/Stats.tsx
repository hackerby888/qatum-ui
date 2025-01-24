import { Box } from "@mui/material";
import QInput from "./QInput";
import QLoading from "./QLoading";
import QMinerRow from "./QMinerRow";
import QMinerTable from "./QMinerTable";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import Divider from "./Divider";
import QDivider from "./QDivider";
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import echarts from "echarts";

function formaterDivide(val: number) {
    if (val < 1000) {
        return val;
    }
    if (val < 1_000_000) {
        return `${(val / 1000).toFixed(0)}K`;
    }

    if (val < 1e9) {
        return `${(val / 1_000_000).toFixed(0)}M`;
    }

    if (val < 1e12) {
        return `${(val / 1e9).toFixed(0)}G`;
    }

    return `${(val / 1e12).toFixed(0)}T`;
}

var axisCommon = function () {
    return {
        splitLine: {
            lineStyle: {
                width: 0.5,
            },
        },
        visualMap: {
            textStyle: {
                color: "red",
                background: "red",
            },
        },
    };
};

// echarts.registerTheme("qatum", {
//     timeAxis: axisCommon(),
//     logAxis: axisCommon(),
//     valueAxis: axisCommon(),
//     categoryAxis: axisCommon(),
//     textStyle: {
//         opacity: 0.7,
//     },
// });

export default function Stats() {
    let [graphHeight, setGraphHeight] = useState(0);
    useEffect(() => {
        let statsWrapper = document.getElementById("stats-main-wrapper");
        let statsGraph = document.getElementById("stats-graph");

        if (statsWrapper && statsGraph) {
            setGraphHeight(statsWrapper.offsetHeight);
        }
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                paddingTop: "20px",
            }}
        >
            <QInput
                customCss={{
                    marginTop: "10px",
                }}
            />
            {/* <QLoading /> */}
            <Box
                id="stats-main-wrapper"
                sx={{
                    width: "100%",
                    display: "flex",
                    height: "fit-content",
                    marginY: "15px",
                }}
            >
                {" "}
                <Box
                    sx={{
                        display: "flex",
                        width: "fit-content",
                        boxShadow: "0px 0px 5px 0px #ccc",

                        flexDirection: "column",
                    }}
                >
                    {" "}
                    <Box
                        sx={{
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <Box>Network Stats</Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                            }}
                        >
                            Net It/s: 135,1323
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                            }}
                        >
                            Epoch Solution Rate: 1,392 / h
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                            }}
                        >
                            Current Solution Rate: 898 / h
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <Box>General Stats</Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                            }}
                        >
                            Epoch: 135
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                            }}
                        >
                            Users: 12
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                            }}
                        >
                            Miners: 24
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            borderLeft: "none",
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            width: "fit-content",
                        }}
                    >
                        <Box>Peformance Stats</Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                            }}
                        >
                            Pool It/s: 135,1323
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                            }}
                        >
                            Pool Solutions: 12
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                            }}
                        >
                            Pool Shares: 24
                        </Box>
                    </Box>
                </Box>
                <Box
                    id="stats-graph"
                    sx={{
                        flex: 1,
                        height: `${graphHeight}px`,
                    }}
                >
                    <ReactECharts
                        style={{
                            width: "100%",
                            height: `${graphHeight}px`,
                        }}
                        option={{
                            // visualMap: [
                            //     {
                            //         show: false,
                            //         type: "continuous",
                            //         seriesIndex: 0,
                            //         min: 0,
                            //         max: 5000,
                            //     },
                            // ],

                            tooltip: {
                                trigger: "axis",
                            },
                            legend: {
                                type: "scroll",
                                lineStyle: {
                                    color: "#d2d6ec",
                                },
                                textStyle: {
                                    color: "#9c27b0",
                                },
                                data: ["Pool It/s"],
                            },
                            xAxis: {
                                axisTick: {
                                    alignWithLabel: true,
                                },
                                type: "category",
                                data: new Array(460).fill(0).map((_, i) => i),
                                axisLine: {
                                    lineStyle: {
                                        color: "#d2d6ec",
                                    },
                                },
                                show: false,
                            },
                            yAxis: {
                                type: "value",
                                position: "left",
                                axisLabel: {
                                    formatter: (val: number) =>
                                        `${formaterDivide(val)}It/s`,
                                },

                                axisLine: {
                                    lineStyle: {
                                        color: "#d2d6ec",
                                    },
                                },
                            },
                            series: [
                                {
                                    name: "Pool It/s",
                                    color: "#9c27b0",
                                    smooth: true,
                                    showSymbol: false,
                                    type: "line",
                                    data: new Array(460)
                                        .fill(0)
                                        .map((_, i) => i % 400),
                                },
                            ],
                        }}
                        notMerge={true}
                        lazyUpdate={true}
                        opts={{}}
                        theme={"qatum"}
                    />
                </Box>
            </Box>
            <QMinerTable />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    marginTop: "20px",
                }}
            >
                <Box
                    sx={{
                        width: "60%",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0px 0px 5px 0px #ccc",
                        padding: "5px",
                        borderRadius: "5px",
                        marginRight: "10px",
                    }}
                >
                    <Box
                        className="jura-font"
                        sx={{
                            paddingY: "5px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            // justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                marginRight: "5px",
                                fontSize: "1.2rem",
                            }}
                        >
                            Epoch
                        </Box>{" "}
                        133
                    </Box>

                    {[
                        {
                            text: "Your Total Performance",
                            value: 123,
                            unit: "It/s",
                        },
                        {
                            text: "Your Total Workers",
                            value: 123,
                            unit: "",
                        },
                        {
                            text: "Your Total Shares",
                            value: 123,
                            unit: "Shares",
                        },

                        {
                            text: "Your Total Solutions",
                            value: 123,
                            unit: "Solutions",
                        },
                    ].map((item) => (
                        <Box
                            key={item.text}
                            sx={{
                                paddingY: "5px",
                                // borderBottom: "1px solid #ccc",
                                paddingX: "5px",
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                            }}
                            className="jura-font"
                        >
                            {item.text} <Divider /> {item.value} {item.unit}
                        </Box>
                    ))}

                    <Box
                        sx={{
                            display: "flex",
                            flex: 1,
                            width: "100%",
                            alignItems: "flex-end",
                        }}
                    >
                        {" "}
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        maxHeight: "300px",
                        boxShadow: "0px 0px 5px 0px #ccc",
                        padding: "5px",
                        borderRadius: "5px",
                    }}
                >
                    <Box
                        sx={{
                            paddingY: "5px",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                        }}
                    >
                        Payments
                    </Box>
                    {new Array(10).fill(0).map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                                border: "1px solid #ccc",
                                paddingY: "5px",
                                paddingX: "5px",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "var(--q-main-color)",
                                    color: "white",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <HourglassTopRoundedIcon />
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                3,111,111 @ 300 Solutions
                            </Box>
                            <Box>E122</Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
