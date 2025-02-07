import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import QDivider from "@/components/QDivider";
import Skeletons from "@/components/Skeletons";
import useGraphHighStore, {
    GraphHeightStore,
} from "@/stores/useGraphHighStore";
import { GlobalStats } from "@/types";
import formatNumber from "@/utils/number";
import { Box } from "@mui/material";
import { useEffect } from "react";

export default function CentralStats() {
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

    return (
        <Box
            id="central-stats"
            sx={{
                display: "flex",
                width: {
                    xs: "100%",
                    md: "30%",
                },
                //      boxShadow: "0px 0px 5px 0px #ccc",
                flexDirection: "column",
                marginRight: "10px",
                borderRadius: "5px",
            }}
        >
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
                {!isFetching ? (
                    <>
                        {" "}
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Network <QDivider />{" "}
                            {formatNumber(globalStats?.estimatedIts || 0)} It/s
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Epoch Solution Rate <QDivider />{" "}
                            {formatNumber(globalStats?.solutionsPerHour || 0)} /
                            h
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Current Solution Rate
                            <QDivider />{" "}
                            {formatNumber(
                                globalStats?.solutionsPerHourEpoch || 0
                            )}{" "}
                            / h
                        </Box>
                    </>
                ) : (
                    <Skeletons
                        customCss={{
                            marginTop: "3px",
                        }}
                        row={3}
                    />
                )}
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
                {!isFetching ? (
                    <>
                        {" "}
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Epoch <QDivider />
                            {globalStats?.epoch || 0}
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Users
                            <QDivider /> {globalStats?.wallets || 0}
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Workers <QDivider /> {globalStats?.workers || 0}
                        </Box>
                    </>
                ) : (
                    <Skeletons
                        customCss={{
                            marginTop: "3px",
                        }}
                        row={3}
                    />
                )}
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
                {!isFetching ? (
                    <>
                        {" "}
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Pool It/s <QDivider />{" "}
                            {formatNumber(globalStats?.hashrate || 0)}
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Pool Solutions <QDivider />{" "}
                            {formatNumber(globalStats?.solutionsWritten || 0)}
                        </Box>
                        <Box
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Pool Shares <QDivider />{" "}
                            {formatNumber(globalStats?.solutionsShare || 0)}
                        </Box>
                    </>
                ) : (
                    <Skeletons
                        customCss={{
                            marginTop: "3px",
                        }}
                        row={3}
                    />
                )}
            </Box>
        </Box>
    );
}
