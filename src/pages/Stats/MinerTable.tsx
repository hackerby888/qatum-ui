import { Box } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import QMinerRow from "./MinerRow";
import { GlobalStats, QWorkerApi } from "@/types";
import { v4 } from "uuid";
import QLoading from "@/components/QLoading";
import useWorkersStats, {
    getWorkersStatsQueryKey,
} from "@/apis/useWorkersStats";
import useGlobalStats from "@/apis/useGlobalStats";
import { useQueryClient } from "@tanstack/react-query";

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
        isFetching,
    }: {
        data: QWorkerApi[];
        isFetching: boolean;
    } = useWorkersStats({ wallet, needActive: false }) as any;

    let {
        data: globalStats,
    }: {
        data: GlobalStats;
    } = useGlobalStats();

    let queryClient = useQueryClient();

    const handleSort = (key: keyof QWorkerApi) => {
        let queryKey = getWorkersStatsQueryKey(wallet);

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

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                fontSize: {
                    xs: ".8rem",
                    sm: "1rem",
                },
                boxShadow: "0px 0px 5px 0px #ccc",
                padding: "10px",
                borderRadius: "5px",
            }}
        >
            {/* title */}
            <Box
                sx={{
                    boxShadow:
                        "-2px 0 0 0 black, 2px 0 0 0 black,  0 -2px 0 0 black,  0 2px 0 0 black",
                    display: "flex",
                    width: "100%",
                    border: "1px solid black",
                    fontWeight: "bold",
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
                        width: "15%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
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
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
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
                        width: "10%",
                        textAlign: "center",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
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
                {isFetching ? (
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {" "}
                        <QLoading />
                    </Box>
                ) : (
                    workerStats?.map((worker, i) => (
                        <QMinerRow
                            isShareModeEpoch={globalStats?.isShareModeEpoch}
                            data={worker}
                            key={v4()}
                            index={i}
                        />
                    ))
                )}
            </Box>
        </Box>
    );
}
