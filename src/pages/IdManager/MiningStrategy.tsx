import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import useGeneralPost from "@/apis/useGeneralPost";
import MaterialUIInput from "@/components/MaterialUIInput";
import QButtonSimple from "@/components/QButtonSimple";
import { GlobalStats, MiningConfig } from "@/types";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function MiningStrategy({
    handleOnpenAndSetSnackbar,
}: {
    handleOnpenAndSetSnackbar: any;
}) {
    let {
        data: globalStats,
    }: {
        data: GlobalStats;
    } = useGeneralGet({
        path: "globalStats",
        queryKey: queryKeys["globalStats"](),
    }) as any;
    let {
        data: miningStrategy,
        isFetching: isMiningStrategyFetching,
    }: {
        data: MiningConfig;
        isFetching: boolean;
    } = useGeneralGet({
        queryKey: queryKeys["miningConfig"](),
        path: "mining-config",
    }) as any;

    let {
        mutate: updateMiningStrategy,
        isPending: isUpdatePending,
        isError,
        isSuccess,
        reset,
    }: {
        mutate: (data: MiningConfig) => void;
        isPending: boolean;
        isError: any;
        isSuccess: any;
        reset: any;
    } = useGeneralPost({
        queryKey: queryKeys["miningConfig"](),
        path: "mining-config",
    }) as any;

    let [hashrateText, setHashrateText] = useState("");
    let [solutionText, setSolutionText] = useState("");
    let [avgOverRateText, setAvgOverRateText] = useState("");

    let [_, setMiningStrategyState] = useState<MiningConfig>({
        diffHashRateToBalance: 0,
        diffSolutionToBalance: 0,
        avgOverRate: 0,
    });

    const handleSave = () => {
        let diffHashRateToBalance = parseInt(hashrateText);
        let diffSolutionToBalance = parseInt(solutionText);
        let avgOverRate = Number(avgOverRateText);

        setMiningStrategyState({
            diffHashRateToBalance,
            diffSolutionToBalance,
            avgOverRate,
        });

        updateMiningStrategy({
            diffHashRateToBalance,
            diffSolutionToBalance,
            avgOverRate,
        });
    };

    useEffect(() => {
        if (miningStrategy) {
            setMiningStrategyState(miningStrategy);
            setHashrateText(
                miningStrategy?.diffHashRateToBalance?.toString() || "0"
            );
            setSolutionText(
                miningStrategy?.diffSolutionToBalance?.toString() || "0"
            );
            setAvgOverRateText(miningStrategy?.avgOverRate?.toString() || "0");
        }
    }, [miningStrategy]);

    useEffect(() => {
        if (isSuccess) {
            handleOnpenAndSetSnackbar("Successfully Updated");
            reset();
        } else if (isError) {
            handleOnpenAndSetSnackbar("Error Updating Mining Strategy");
            reset();
        }
    }, [isSuccess, isError]);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            {" "}
            <Box
                sx={{
                    width: "100%",
                    textAlign: "center",
                    paddingY: "10px",
                }}
            >
                Mining Strategy
            </Box>
            {!isMiningStrategyFetching ? (
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                    }}
                >
                    <Box
                        sx={{
                            paddingX: "12px",
                            border: "1px solid var(--q-border-color)",
                            borderRight: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                    >
                        Avg Score: {parseInt(globalStats?.avgScore as any)}
                    </Box>

                    <MaterialUIInput
                        value={hashrateText}
                        onChange={(e: any) => {
                            setHashrateText(e.target.value);
                        }}
                        customCss={{
                            width: {
                                xs: "100%",
                                md: "33%",
                            },
                            marginY: {
                                xs: "10px",
                                md: "0",
                            },
                        }}
                        label="Max It/s Difference Between Ids"
                    />

                    <MaterialUIInput
                        value={solutionText}
                        onChange={(e: any) => {
                            setSolutionText(e.target.value);
                        }}
                        customCss={{
                            width: {
                                xs: "100%",
                                md: "33%",
                            },
                            marginY: {
                                xs: "10px",
                                md: "0",
                            },
                        }}
                        label="Max Solutions Difference Between Ids"
                    />

                    <MaterialUIInput
                        value={avgOverRateText}
                        onChange={(e: any) => {
                            setAvgOverRateText(e.target.value);
                        }}
                        customCss={{
                            width: {
                                xs: "100%",
                                md: "10%",
                            },
                        }}
                        label="Avg Over Rate"
                    />

                    {isUpdatePending ? (
                        <QButtonSimple
                            customCss={{
                                marginLeft: "10px",
                            }}
                            isDisabled={true}
                            text="Saving..."
                        />
                    ) : (
                        <QButtonSimple
                            customCss={{
                                marginLeft: {
                                    xs: "0",
                                    md: "10px",
                                },
                                marginY: {
                                    xs: "10px",
                                    md: "0",
                                },
                            }}
                            onClick={handleSave}
                            text="Save"
                        />
                    )}
                </Box>
            ) : (
                <Box
                    sx={{
                        paddingLeft: "10px",
                        display: "flex",
                        alignItems: "center",
                        transform: "scale(1)",
                    }}
                >
                    Loading...
                </Box>
            )}
        </Box>
    );
}
