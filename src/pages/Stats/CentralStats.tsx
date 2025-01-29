import useGlobalStats from "@/apis/useGlobalStats";
import { GlobalStats } from "@/types";
import formatNumber from "@/utils/number";
import { Box } from "@mui/material";

export default function CentralStats() {
    let {
        data: globalStats,
    }: {
        data: GlobalStats;
    } = useGlobalStats();
    return (
        <Box
            sx={{
                display: "flex",
                width: {
                    xs: "100%",
                    md: "fit-content",
                },
                boxShadow: "0px 0px 5px 0px #ccc",
                flexDirection: "column",
                marginRight: "10px",
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
                    Network: {formatNumber(globalStats?.estimatedIts || 0)} It/s
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        paddingY: "5px",
                    }}
                >
                    Epoch Solution Rate:{" "}
                    {formatNumber(globalStats?.solutionsPerHour || 0)} / h
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        paddingY: "5px",
                    }}
                >
                    Current Solution Rate:{" "}
                    {formatNumber(globalStats?.solutionsPerHourEpoch || 0)} / h
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
                    Epoch: {globalStats?.epoch || 0}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        paddingY: "5px",
                    }}
                >
                    Users: {globalStats?.wallets || 0}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        paddingY: "5px",
                    }}
                >
                    Workers: {globalStats?.workers || 0}
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
                    Pool It/s: {formatNumber(globalStats?.hashrate || 0)}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        paddingY: "5px",
                    }}
                >
                    Pool Solutions:{" "}
                    {formatNumber(globalStats?.solutionsWritten || 0)}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        paddingY: "5px",
                    }}
                >
                    Pool Shares:{" "}
                    {formatNumber(globalStats?.solutionsShare || 0)}
                </Box>
            </Box>
        </Box>
    );
}
