import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import Divider from "@/components/QDivider";
import { GlobalStats, QWorkerApi } from "@/types";
import { Box } from "@mui/material";

export default function FinalStats({ wallet }: { wallet: string }) {
    let {
        data: workerStats,
        isFetching: _,
    }: {
        data: QWorkerApi[];
        isFetching: boolean;
    } = useGeneralGet({
        queryKey: queryKeys["workerStats"]({ wallet }),
        path: "workers",
        reqQuery: {
            wallet,
            needActive: true,
        },
    }) as any;

    let {
        data: globalStats,
    }: {
        data: GlobalStats;
    } = useGeneralGet({
        path: "globalStats",
        queryKey: queryKeys["globalStats"](),
    }) as any;
    let totalPerformance = workerStats?.reduce((acc, curr) => {
        return acc + curr.hashrate;
    }, 0);
    let totalWorkers = workerStats?.length;
    let totalShares = workerStats?.reduce((acc, curr) => {
        return acc + curr.solutionsShare;
    }, 0);
    let totalSolutions = workerStats?.reduce((acc, curr) => {
        return acc + curr.solutionsWritten;
    }, 0);
    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    md: "60%",
                },
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
                    paddingLeft: "5px",
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
                {globalStats?.epoch}
            </Box>

            {[
                {
                    text: "Your Total Performance",
                    value: totalPerformance,
                    unit: "It/s",
                },
                {
                    text: "Your Total Workers",
                    value: totalWorkers,
                    unit: "",
                },
                globalStats?.isShareModeEpoch
                    ? {
                          text: "Your Total Shares",
                          value: totalShares,
                          unit: "Shares",
                      }
                    : {
                          text: "Your Total Solutions",
                          value: totalSolutions,
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
    );
}
