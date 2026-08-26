import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import useGeneralPost from "@/apis/useGeneralPost";
import MaterialUIInput from "@/components/MaterialUIInput";
import QButtonSimple from "@/components/QButtonSimple";
import useGlobalStore, { GlobalStore } from "@/stores/useGlobalStore";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function DifficultyConfig() {
    let [poolDifficultyText, setPoolDifficultyText] = useState("");
    let [netDifficultyText, setNetDifficultyText] = useState("");
    let globalStore: GlobalStore = useGlobalStore();
    let {
        mutate: updateMiningDifficulty,
        isPending: isUpdatePending,
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        error: updateError,
        reset: resetUpdate,
    } = useGeneralPost({
        queryKey: queryKeys["difficulty"](),
        path: "difficulty",
    });

    let { data: difficultyData, isFetching: isGetDifficultyFetching } =
        useGeneralGet<{
            pool: number;
            net: number;
            netIsDerived: boolean;
            threshold: number | null;
            epoch: number | null;
            freshnessWindow: number | null;
            maxScore: number;
            canMineAnt: boolean;
            antTaskMismatch: boolean;
            anchorTick: number | null;
        }>({
            queryKey: queryKeys["difficulty"](),
            path: "difficulty",
        });

    // Under ant colony the net threshold is whatever the node says it is for this epoch - sending a
    // different one just gets every solution rejected - so only the pool number is editable.
    const handleSave = () => {
        updateMiningDifficulty({
            difficulty: {
                pool: parseInt(poolDifficultyText),
            },
        } as any);
    };

    useEffect(() => {
        if (isUpdateSuccess) {
            globalStore.handleOnpenAndSetSnackbar(
                "difficulty updated successfully"
            );
            resetUpdate();
        } else {
            if (isUpdateError) {
                globalStore.handleOnpenAndSetSnackbar(
                    "difficulty update failed" + `${updateError}`
                );
                resetUpdate();
            }
        }
    }, [isUpdateSuccess, isUpdateError]);

    useEffect(() => {
        if (difficultyData) {
            setPoolDifficultyText(difficultyData.pool.toString());
            setNetDifficultyText(difficultyData.net.toString());
        }
    }, [difficultyData]);

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
                Mining Difficulty
            </Box>
            {difficultyData ? (
                <Box
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        paddingBottom: "10px",
                        fontSize: "0.85rem",
                        opacity: 0.8,
                    }}
                >
                    {difficultyData.antTaskMismatch ? (
                        <Box sx={{ color: "error.main", fontWeight: "bold" }}>
                            TASK MISMATCH — the node scores against a different
                            bpp9000 task. Mining is halted; replace data/bpp9000.task
                            with the epoch's canonical file.
                        </Box>
                    ) : !difficultyData.canMineAnt ? (
                        <Box sx={{ color: "warning.main" }}>
                            Not mining — waiting for the epoch context and a
                            non-empty tick to anchor on.
                        </Box>
                    ) : (
                        <Box>
                            Epoch {difficultyData.epoch} · threshold{" "}
                            {difficultyData.threshold} · anchor tick{" "}
                            {difficultyData.anchorTick} · freshness window{" "}
                            {difficultyData.freshnessWindow} ticks
                        </Box>
                    )}
                    <Box sx={{ paddingTop: "4px" }}>
                        Scores are error counts — lower is better, and a higher
                        difficulty number is an easier target. Pool must be ≥ net.
                    </Box>
                </Box>
            ) : null}
            {!isGetDifficultyFetching ? (
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <MaterialUIInput
                        value={poolDifficultyText}
                        onChange={(e: any) => {
                            setPoolDifficultyText(e.target.value);
                        }}
                        customCss={{
                            width: "100%",
                        }}
                        label="Pool Difficulty"
                    />

                    <MaterialUIInput
                        value={netDifficultyText}
                        isDisabled={true}
                        customCss={{
                            width: "100%",
                        }}
                        label="Net Difficulty (from epoch)"
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
                    Loading...
                </Box>
            )}
        </Box>
    );
}
