import useGlobalStats from "@/apis/useGlobalStats";
import useMiningStrategy from "@/apis/useMiningStrategy";
import useUpdateMiningStrategy from "@/apis/useUpdateMiningStrategy";
import QButton from "@/components/QButton";
import QLoadingCircle from "@/components/QLoadingCircle";
import { GlobalStats, MiningConfig } from "@/types";
import { Box, styled, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function MiningStrategy({
    handleOnpenAndSetSnackbar,
}: {
    handleOnpenAndSetSnackbar: any;
}) {
    let {
        data: globalStats,
    }: {
        data: GlobalStats;
    } = useGlobalStats();
    let {
        data: miningStrategy,
        isFetching: isMiningStrategyFetching,
    }: {
        data: MiningConfig;
        isFetching: boolean;
    } = useMiningStrategy() as any;

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
    } = useUpdateMiningStrategy() as any;

    let hashrateInputRef = useRef<HTMLInputElement>(null);
    let solutionInputRef = useRef<HTMLInputElement>(null);
    let avgOverRateInputRef = useRef<HTMLInputElement>(null);

    let [miningStrategyState, setMiningStrategyState] = useState<MiningConfig>({
        diffHashRateToBalance: 0,
        diffSolutionToBalance: 0,
        avgOverRate: 0,
    });

    const CssTextField = styled(TextField)({
        "& label": {
            fontSize: ".8rem !important",
            fontFamily: "jura",
        },
        "& label.Mui-focused": {
            color: "black",
            borderRadius: "none",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "black",
            borderRadius: "none",
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "none",
            "& input": {
                paddingTop: "12px !important",
                paddingBottom: "12px !important",
            },
            "& fieldset": {
                borderColor: "black",
                borderRadius: "0px",
            },
            "&:hover fieldset": {
                borderColor: "black",
                borderRadius: "none",
            },
            "&.Mui-focused fieldset": {
                borderColor: "black",
                borderRadius: "none",
            },
        },
    });

    const handleSave = () => {
        let diffHashRateToBalance = parseInt(
            hashrateInputRef.current?.value as any
        );
        let diffSolutionToBalance = parseInt(
            solutionInputRef.current?.value as any
        );
        let avgOverRate = avgOverRateInputRef.current?.value as any;

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
                    }}
                >
                    <Box
                        sx={{
                            padding: "12px",
                            border: "1px solid black",
                            borderRight: "none",
                        }}
                    >
                        Avg Score: {parseInt(globalStats?.avgScore as any)}
                    </Box>

                    <CssTextField
                        defaultValue={miningStrategyState.diffHashRateToBalance}
                        inputRef={hashrateInputRef}
                        sx={{
                            width: "33%",
                        }}
                        id="outlined-basic"
                        label="Max It/s Difference Between Ids"
                        variant="outlined"
                    />

                    <CssTextField
                        defaultValue={miningStrategyState.diffSolutionToBalance}
                        inputRef={solutionInputRef}
                        sx={{
                            width: "33%",
                        }}
                        id="outlined-basic"
                        label="Max Solutions Difference Between Ids"
                        variant="outlined"
                    />
                    <CssTextField
                        defaultValue={miningStrategyState.avgOverRate}
                        inputRef={avgOverRateInputRef}
                        sx={{
                            width: "10%",
                        }}
                        id="outlined-basic"
                        label="Avg Over Rate"
                        variant="outlined"
                    />

                    {isUpdatePending ? (
                        <Box
                            sx={{
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                transform: "scale(1)",
                            }}
                        >
                            <QLoadingCircle />
                        </Box>
                    ) : (
                        <QButton
                            customCss={{
                                marginLeft: "10px",
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
                    <QLoadingCircle />
                </Box>
            )}
        </Box>
    );
}
