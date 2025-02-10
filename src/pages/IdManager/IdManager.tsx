import { Box } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { memo, useEffect, useState } from "react";
import ComputorIdRow from "./ComputorIdRow";
import { useQueryClient } from "@tanstack/react-query";
import { ComputorIdDataApi } from "@/types";
import MiningStrategy from "./MiningStrategy";
import useGeneralGet from "@/apis/useGeneralGet";
import queryKeys from "@/apis/getQueryKey";
import useGeneralPost from "@/apis/useGeneralPost";
import useGlobalStore, { GlobalStore } from "@/stores/useGlobalStore";
import QButtonSimple from "@/components/QButtonSimple";
import QLoadingBlob from "@/components/QLoadingBlob";

const ID_LENGTH = 60;
const sortMap: {
    [key: string]: "asc" | "desc";
} = {
    id: "asc",
    active: "asc",
    followAvg: "asc",
    workers: "asc",
    totalPerformance: "asc",
};

let lastComputorIdData: ComputorIdDataApi[] = [];

export default memo(function IdManager() {
    let globalStore: GlobalStore = useGlobalStore();
    let {
        data: ids,
        isFetching,
    }: {
        data: ComputorIdDataApi[];
        isFetching: any;
    } = useGeneralGet({
        queryKey: queryKeys["computorIds"](),
        path: "computor-ids",
    }) as any;
    let {
        mutate: updateComputorIds,
        isPending: isUpdateComputorIdsPending,
        isSuccess,
        isError,
        reset,
        error,
    } = useGeneralPost({
        queryKey: queryKeys["computorIds"](),
        path: "computor-ids",
    });

    let [editingIdIndex, setEditingIdIndex] = useState<number | null>(null);
    let [_, setRerenderTrigger] = useState(0);

    let queryClient = useQueryClient();

    const sort = (key: keyof ComputorIdDataApi) => {
        let newArr = [...ids];
        if (!key) return newArr;
        let lastElement = editingIdIndex ? newArr.pop() : null;
        newArr.sort((a, b) => {
            if (sortMap[key] === "asc") {
                // @ts-ignore
                return a[key] > b[key] ? 1 : -1;
            } else {
                // @ts-ignore
                return a[key] < b[key] ? 1 : -1;
            }
        });
        if (lastElement) newArr.push(lastElement);
        sortMap[key] = sortMap[key] === "asc" ? "desc" : "asc";
        queryClient.setQueryData(queryKeys["computorIds"](), newArr);
    };

    const handleAddNewId = () => {
        let newIds: ComputorIdDataApi[] = [
            ...ids,
            {
                id: "",
                mining: false,
                followingAvgScore: false,
                workers: 0,
                totalHashrate: 0,
                score: 0,
                bcscore: 0,
                ip: "",
                lastUpdateScoreTime: 0,
                solutionsFetched: 0,
                submittedSolutions: {
                    isWrittenToBC: 0,
                    total: 0,
                },
                targetScore: undefined,
            },
        ];

        queryClient.setQueryData(queryKeys["computorIds"](), newIds);

        setEditingIdIndex(ids?.length);
    };

    const handleCancel = () => {
        //remove editing id index
        if (editingIdIndex !== null || ids?.some((id) => id.workers === -1)) {
            let newArr = [...ids].filter(
                (_, index) => index !== editingIdIndex
            );

            newArr = newArr.map((id, _) => {
                if (id.workers === -1) id.workers = 0;
                return id;
            });

            queryClient.setQueryData(queryKeys["computorIds"](), newArr);

            setEditingIdIndex(null);
        }
    };

    const handleSaveUpdateToServer = () => {
        //prepare data for server
        let apiData = ids
            .map((id) => {
                //detect if changes are made
                let lastData = lastComputorIdData.find(
                    (data) => data.id === id.id
                ) as ComputorIdDataApi;
                if (!lastData) return id;
                for (let key in id) {
                    if (
                        lastData &&
                        lastData[key as keyof ComputorIdDataApi] !==
                            id[key as keyof ComputorIdDataApi]
                    ) {
                        if (
                            typeof id[key as keyof ComputorIdDataApi] !==
                            "object"
                        ) {
                            return id;
                        }
                    }
                }
            })
            .filter((id) => id);

        //send to server
        console.log(apiData);
        lastComputorIdData = structuredClone(ids);
        //@ts-ignore
        updateComputorIds({
            computorIds: apiData,
        });
    };

    let isThereUncompletedId = ids?.some((id) => id.id.length < ID_LENGTH);

    let canCancel =
        editingIdIndex !== null || ids?.some((id) => id.workers === -1);

    // let numberOfDeletedIds = ids?.filter((id) => id.workers === -1).length;
    let lastElementIndex = -1;

    console.log(ids);

    useEffect(() => {
        if (ids && !lastComputorIdData.length) {
            lastComputorIdData = structuredClone(ids);
            console.log("lastComputorIdData", lastComputorIdData);
        }
    }, [ids]);

    useEffect(() => {
        if (isSuccess) {
            globalStore.handleOnpenAndSetSnackbar("Successfully updated");
            reset();
        } else if (isError) {
            console.log(error);
            globalStore.handleOnpenAndSetSnackbar(`Error updating ${error}`);
            reset();
        }
    }, [isSuccess, isError]);

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    paddingTop: "20px",
                }}
            >
                <MiningStrategy
                    handleOnpenAndSetSnackbar={
                        globalStore.handleOnpenAndSetSnackbar
                    }
                />
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            textAlign: "center",
                            paddingY: "10px",
                        }}
                    >
                        Computor Ids
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                            border: "1px solid var(--q-border-color)",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                paddingY: "10px",
                            }}
                        >
                            {" "}
                            <Box
                                onClick={() => sort("id")}
                                sx={{
                                    width: "33%",
                                    overflowX: "hidden",
                                    marginLeft: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    "&:hover": { color: "var(--q-main-color)" },
                                    userSelect: "none",
                                }}
                            >
                                ID
                                <FilterListRoundedIcon
                                    sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                    fontSize="small"
                                />
                            </Box>
                            <Box
                                onClick={() => sort("mining")}
                                sx={{
                                    width: "7%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    "&:hover": { color: "var(--q-main-color)" },
                                    userSelect: "none",
                                }}
                            >
                                Active
                                <FilterListRoundedIcon
                                    sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                    fontSize="small"
                                />
                            </Box>
                            <Box
                                onClick={() => sort("followingAvgScore")}
                                sx={{
                                    width: "12%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    "&:hover": { color: "var(--q-main-color)" },
                                    userSelect: "none",
                                }}
                            >
                                Follow Avg
                                <FilterListRoundedIcon
                                    sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                    fontSize="small"
                                />
                            </Box>
                            <Box
                                onClick={() => sort("workers")}
                                sx={{
                                    width: "15%",
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    "&:hover": { color: "var(--q-main-color)" },
                                    userSelect: "none",
                                }}
                            >
                                Workers
                                <FilterListRoundedIcon
                                    sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                    fontSize="small"
                                />
                            </Box>
                            <Box
                                onClick={() => sort("totalHashrate")}
                                sx={{
                                    width: "20%",
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    "&:hover": { color: "var(--q-main-color)" },
                                    userSelect: "none",
                                }}
                            >
                                Total Performance
                                <FilterListRoundedIcon
                                    sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                    fontSize="small"
                                />
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    userSelect: "none",
                                }}
                            >
                                Action
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                overflow: "visible",
                            }}
                        >
                            {isFetching ? (
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        paddingY: "10px",
                                        borderTop:
                                            "1px solid var(--q-border-color)",
                                    }}
                                >
                                    <QLoadingBlob />
                                </Box>
                            ) : (
                                ids?.map((computorIdData, renderIndex) => (
                                    <ComputorIdRow
                                        index={renderIndex}
                                        handleCancel={handleCancel}
                                        key={computorIdData.id}
                                        mining={computorIdData.mining}
                                        followingAvgScore={
                                            computorIdData.followingAvgScore
                                        }
                                        data={computorIdData}
                                        isEditing={
                                            renderIndex === editingIdIndex
                                        }
                                        isLastRow={
                                            renderIndex === lastElementIndex
                                        }
                                        setEditingIdIndex={setEditingIdIndex}
                                        setRerenderTrigger={setRerenderTrigger}
                                    />
                                ))
                            )}
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                paddingY: "5px",
                                borderTop: "2px solid var(--q-border-color)",
                            }}
                        >
                            <QButtonSimple
                                onClick={handleAddNewId}
                                customCss={{
                                    marginX: "5px",
                                    borderRadius: "5px",
                                }}
                                effect3d={false}
                                text="Add New Id"
                                isDisabled={isThereUncompletedId}
                            />
                            <QButtonSimple
                                onClick={handleCancel}
                                customCss={{
                                    marginX: "5px",
                                    borderRadius: "5px",
                                }}
                                effect3d={false}
                                text="Cancel"
                                isDisabled={!canCancel}
                            />
                            {!isUpdateComputorIdsPending ? (
                                <QButtonSimple
                                    onClick={handleSaveUpdateToServer}
                                    customCss={{
                                        marginX: "5px",
                                        borderRadius: "5px",
                                    }}
                                    effect3d={false}
                                    text="Update"
                                />
                            ) : (
                                <QButtonSimple
                                    onClick={handleSaveUpdateToServer}
                                    customCss={{
                                        marginX: "5px",
                                        borderRadius: "5px",
                                    }}
                                    isDisabled={true}
                                    effect3d={false}
                                    text="Updating..."
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
});
