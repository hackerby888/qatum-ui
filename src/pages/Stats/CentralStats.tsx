import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import { GlobalStats } from "@/types";
import formatNumber from "@/utils/number";
import { Box } from "@mui/material";

export default function CentralStats() {
    let {
        data: globalStats,
    }: {
        data: GlobalStats;
    } = useGeneralGet({
        path: "globalStats",
        queryKey: queryKeys["globalStats"](),
    }) as any;
    return (
        <Box
            sx={{
                display: "flex",
                width: {
                    xs: "100%",
                    md: "fit-content",
                },
                //      boxShadow: "0px 0px 5px 0px #ccc",
                flexDirection: "column",
                marginRight: "10px",
                borderRadius: "5px",
            }}
        >
            {" "}
            <Box
                sx={{
                    border: "1px solid var(--q-border-color)",
                    borderRadius: "5px",
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
                    border: "1px solid var(--q-border-color)",
                    borderRadius: "5px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    marginY: "10px",
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
                    border: "1px solid var(--q-border-color)",
                    borderRadius: "5px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
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
