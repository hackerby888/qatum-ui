import { Box } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import QMinerRow from "./MinerRow";
import { GlobalStats, QWorkerApi } from "@/types";
import { v4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import useGeneralGet from "@/apis/useGeneralGet";
import queryKeys from "@/apis/getQueryKey";

let sortMap = {
    name: "asc",
    shares: "asc",
    solutionsWritten: "asc",
    hashrate: "asc",
    uptime: "asc",
    isActive: "asc",
};

export default function QMinerTable({ wallet }: { wallet: string }) {
    let {
        data: workerStats,
        isFetching: isFetchingWorkerStats,
        error: workerStatsError,
    }: {
        data: QWorkerApi[];
        isFetching: boolean;
        error: any;
    } = useGeneralGet({
        queryKey: queryKeys["workerStats"]({ wallet }),
        path: "workers",
        reqQuery: {
            wallet,
            needActive: false,
        },
        enabled: !!wallet,
    }) as any;

    let {
        data: globalStats,
    }: {
        data: GlobalStats;
    } = useGeneralGet({
        path: "globalStats",
        queryKey: queryKeys["globalStats"](),
    }) as any;

    let queryClient = useQueryClient();

    const handleSort = (key: keyof QWorkerApi) => {
        let queryKey = queryKeys["workerStats"]({ wallet });

        let queryData = structuredClone(workerStats);

        queryData.sort((a, b) => {
            //@ts-ignore
            if (sortMap[key] === "asc") {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });

        // @ts-ignore
        sortMap[key] = sortMap[key] === "asc" ? "desc" : "asc";

        queryClient.setQueryData(queryKey, queryData);
    };

    let activeWorkers = workerStats?.filter((worker) => worker.isActive);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                fontSize: {
                    xs: ".8rem",
                    sm: "1rem",
                },
                borderRadius: "5px",
            }}
        >
            {/* title */}
            <Box
                sx={{
                    // boxShadow:
                    //     "-2px 0 0 0 var(--q-border-color), 2px 0 0 0 var(--q-border-color),  0 -2px 0 0 var(--q-border-color),  0 2px 0 0 var(--q-border-color)",
                    display: "flex",
                    width: "100%",
                    border: "1px solid var(--q-border-color)",
                    background: "var(--q-background-color)",
                    paddingY: "5px",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                }}
            >
                <Box
                    sx={{
                        userSelect: "none",
                        width: "5%",
                        textAlign: "center",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        justifyContent: "center",
                    }}
                >
                    #
                </Box>
                <Box
                    onClick={() => handleSort("name")}
                    sx={{
                        userSelect: "none",
                        width: "30%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": { color: "var(--q-main-color)" },
                    }}
                >
                    Worker{" "}
                    <FilterListRoundedIcon
                        sx={{ marginLeft: "3px", fontSize: "1rem" }}
                        fontSize="small"
                    />
                </Box>
                <Box
                    onClick={() =>
                        handleSort(
                            globalStats?.isShareModeEpoch
                                ? "solutionsShare"
                                : "solutionsWritten"
                        )
                    }
                    sx={{
                        userSelect: "none",
                        width: {
                            xs: "25%",
                            md: "15%",
                        },
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": { color: "var(--q-main-color)" },
                    }}
                >
                    {globalStats?.isShareModeEpoch ? "Shares" : "Solutions"}
                    <FilterListRoundedIcon
                        sx={{ marginLeft: "3px", fontSize: "1rem" }}
                        fontSize="small"
                    />
                </Box>
                <Box
                    onClick={() => handleSort("hashrate")}
                    sx={{
                        userSelect: "none",
                        width: "15%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": { color: "var(--q-main-color)" },
                    }}
                >
                    It/s
                    <FilterListRoundedIcon
                        sx={{ marginLeft: "3px", fontSize: "1rem" }}
                        fontSize="small"
                    />
                </Box>
                <Box
                    onClick={() => handleSort("startTimestamp")}
                    sx={{
                        userSelect: "none",
                        width: "25%",
                        paddingLeft: "5px",
                        paddingY: "5px",
                        display: {
                            xs: "none",
                            md: "flex",
                        },
                        cursor: "pointer",
                        "&:hover": { color: "var(--q-main-color)" },
                    }}
                >
                    Uptime
                    <FilterListRoundedIcon
                        sx={{ marginLeft: "3px", fontSize: "1rem" }}
                        fontSize="small"
                    />
                </Box>
                <Box
                    onClick={() => handleSort("isActive")}
                    sx={{
                        userSelect: "none",
                        flex: 1,
                        textAlign: "center",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": { color: "var(--q-main-color)" },
                        justifyContent: "center",
                    }}
                >
                    Status
                    <FilterListRoundedIcon
                        sx={{ marginLeft: "3px", fontSize: "1rem" }}
                        fontSize="small"
                    />
                </Box>
            </Box>

            {/* rows */}
            <Box
                sx={{
                    paddingBottom: "10px",
                    overflowY: "auto",
                    maxHeight: "50vh",
                }}
            >
                {isFetchingWorkerStats ? (
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            border: "1px solid var(--q-border-color)",
                            borderTop: "none",
                            paddingY: "10px",
                        }}
                    >
                        Loading...
                    </Box>
                ) : (
                    activeWorkers?.map((worker, i) =>
                        worker.isActive ? (
                            <QMinerRow
                                isShareModeEpoch={globalStats?.isShareModeEpoch}
                                data={worker}
                                key={v4()}
                                index={i}
                            />
                        ) : null
                    )
                )}

                {!isFetchingWorkerStats && workerStatsError && (
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            paddingY: "10px",
                            border: "1px solid var(--q-border-color)",
                            borderTop: "none",
                            color: "red",
                        }}
                    >{`${workerStatsError}`}</Box>
                )}
            </Box>
        </Box>
    );
}
