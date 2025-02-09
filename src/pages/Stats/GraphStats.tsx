import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import QLoadingBlob from "@/components/QLoadingBlob";
import { ONE_DAY, THREE_MINUTES } from "@/consts/time";
import useGraphHighStore, {
    GraphHeightStore,
} from "@/stores/useGraphHighStore";
import { GlobalStats } from "@/types";
import { Box } from "@mui/material";
import ReactECharts from "echarts-for-react";
import { useEffect } from "react";

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

export default function GraphStats() {
    let {
        data: globalStats,
        isFetching,
    }: {
        data: GlobalStats;
        isFetching: boolean;
    } = useGeneralGet({
        path: "globalStats",
        queryKey: queryKeys["globalStats"](),
    }) as any;

    let graphStore: GraphHeightStore = useGraphHighStore();

    useEffect(() => {
        let statsWrapper = document.getElementById("stats-main-wrapper");
        let statsGraph = document.getElementById("stats-graph");
        if (statsWrapper && statsGraph) {
            if (isFetching)
                graphStore.setGraphHeight(statsWrapper.clientHeight);
            else {
                //sum all height of children in centralStas
                statsGraph.style.display = "none";
                setTimeout(() => {
                    graphStore.setGraphHeight(statsWrapper.clientHeight);
                    statsGraph.style.display = "block";
                }, 0);
            }
        }
    }, [globalStats, isFetching]);

    let needToFillList =
        ONE_DAY / THREE_MINUTES - globalStats?.hashrateList?.length || 0;

    let xAxisTimeStamps = new Array(ONE_DAY / THREE_MINUTES)
        .fill(0)
        .map((_, i) =>
            new Date(
                new Date().getTime() - i * THREE_MINUTES
            ).toLocaleTimeString()
        )
        .reverse();

    let hashrateList = globalStats?.hashrateList || [];
    if (needToFillList > 0) {
        hashrateList = new Array(needToFillList)
            .fill(null)
            .concat(globalStats.hashrateList);
    }

    return (
        <Box
            id="stats-graph"
            sx={{
                flex: 1,
                height: `${graphStore.graphHeight}px`,
                // boxShadow: "0px 0px 5px 0px #ccc",
                paddingTop: "10px",
                border: "1px solid var(--q-border-color)",
                borderRadius: "5px",
                marginTop: {
                    xs: "10px",
                    md: "0",
                },
            }}
        >
            {!isFetching ? (
                <ReactECharts
                    style={{
                        width: "100%",
                        height: `${graphStore.graphHeight}px`,
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
                                color: "white",
                            },
                            textStyle: {
                                color: "#9c27b0",
                                fontWeight: "bold",
                            },
                            data: ["Pool It/s"],
                        },
                        xAxis: {
                            axisTick: {
                                alignWithLabel: true,
                            },
                            type: "category",
                            data: xAxisTimeStamps,
                            axisLine: {
                                lineStyle: {
                                    color: "black",
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
                                    color: "gray",
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
                                data: hashrateList || [],
                            },
                        ],
                    }}
                    notMerge={true}
                    lazyUpdate={true}
                    opts={{}}
                    theme={"qatum"}
                />
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <QLoadingBlob />
                </Box>
            )}
        </Box>
    );
}
