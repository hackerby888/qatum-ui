import { Box } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import QMinerRow from "./MinerRow";
import { GlobalStats, QWorkerApi } from "@/types";

export default function QMinerTable({
    workerStats,
    globalStats,
}: {
    workerStats: QWorkerApi[];
    globalStats: GlobalStats;
}) {
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
                {workerStats?.map((worker, i) => (
                    <QMinerRow
                        isShareModeEpoch={globalStats?.isShareModeEpoch}
                        data={worker}
                        key={i}
                        index={i}
                    />
                ))}
            </Box>
        </Box>
    );
}
