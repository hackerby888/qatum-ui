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
        }>({
            queryKey: queryKeys["difficulty"](),
            path: "difficulty",
        });

    const handleSave = () => {
        updateMiningDifficulty({
            difficulty: {
                pool: parseInt(poolDifficultyText),
                net: parseInt(netDifficultyText),
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
                        onChange={(e: any) => {
                            setNetDifficultyText(e.target.value);
                        }}
                        customCss={{
                            width: "100%",
                        }}
                        label="Net Difficulty"
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
