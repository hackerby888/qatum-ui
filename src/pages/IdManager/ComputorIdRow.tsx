import { Box } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { ComputorIdDataApi, QSelectOptions } from "@/types";
import { memo, useState } from "react";
import QSelect from "@/components/QSelect";
import Dialog from "@mui/material/Dialog";
import { useQueryClient } from "@tanstack/react-query";
import QLoadingCircle from "@/components/QLoadingCircle";
import formatNumber from "@/utils/number";
import useGeneralGet from "@/apis/useGeneralGet";
import queryKeys from "@/apis/getQueryKey";
import QButtonSimple from "@/components/QButtonSimple";
import useGlobalStore, { GlobalStore } from "@/stores/useGlobalStore";

const trueFalseOptions: QSelectOptions[] = [
    {
        text: "True",
        value: true,
        customCss: {
            color: "var(--q-main-color)",
        },
    },
    {
        text: "False",
        value: false,
        customCss: {
            color: "red",
        },
    },
];

let backupWorkersForDelete: {
    [key: string]: number;
} = {};

export default memo(function ComputorIdRow({
    data,
    isEditing,
    isLastRow,
    setEditingIdIndex,
    // force react rerender when these props change
    mining,
    followingAvgScore,
    handleCancel,
    setRerenderTrigger,
    index,
}: {
    data: ComputorIdDataApi;
    isEditing: boolean;
    isLastRow: boolean;
    setEditingIdIndex: any;
    mining: boolean;
    followingAvgScore: boolean;
    handleCancel: any;
    setRerenderTrigger: any;
    index: number;
}) {
    let globalIndex = index;
    let globalStore: GlobalStore = useGlobalStore();
    let [internalMining, setInternalMining] = useState(mining);
    let [internalFollowingAvgScore, setInternalFollowingAvgScore] =
        useState(followingAvgScore);
    let [idText, setIdText] = useState(data.id);
    let [isOpenningDialog, setIsOpenningDialog] = useState(false);
    let {
        data: computorIdDetail,
        isFetching: isComputorIdDetailFetching,
    }: {
        data: {
            walletArray: {
                wallet: string;
                hashrate: number;
                workers: number;
            }[];
        };
        isFetching: boolean;
    } = useGeneralGet({
        queryKey: queryKeys["computorIdDetail"]({
            computorId: data.id,
        }),
        path: "computor-id/detail",
        reqQuery: {
            computorId: data.id,
        },
        enabled: isOpenningDialog,
    }) as any;
    let queryClient = useQueryClient();

    const handleOnTrueFalseSelect = (
        option: QSelectOptions,
        field: "mining" | "followingAvgScore"
    ) => {
        globalStore.handleOnpenAndSetSnackbar(
            `Set ${field.normalize()} to ${option.text} for id ${idText}`
        );

        let currentIds = queryClient.getQueryData(
            queryKeys["computorIds"]()
        ) as ComputorIdDataApi[];

        currentIds[globalIndex] = structuredClone(currentIds[globalIndex]);
        currentIds[globalIndex][field] = option.value;
        queryClient.setQueryData(queryKeys["computorIds"](), currentIds);

        switch (field) {
            case "mining":
                setInternalMining(option.value);
                break;
            case "followingAvgScore":
                setInternalFollowingAvgScore(option.value);
                break;
        }

        console.log(field, option);
    };

    const handleOnDelete = () => {
        let currentIds = queryClient.getQueryData(
            queryKeys["computorIds"]()
        ) as ComputorIdDataApi[];

        //set .workers = -1 to delete
        // let newIds = currentIds.map((id) => {
        //     if (id.id === data.id) {
        //         if (!backupWorkersForDelete[id.id])
        //             backupWorkersForDelete[id.id] = id.workers;
        //         id.workers = -1;
        //     }
        //     return id;
        // });

        currentIds[globalIndex].workers = -1;

        queryClient.setQueryData(queryKeys["computorIds"](), currentIds);
        setRerenderTrigger((prev: number) => prev + 1);
    };

    const handleIdChange = (e: any) => {
        setIdText(e.target.value);
    };

    const handleConfirm = () => {
        setEditingIdIndex(null);

        let currentIds = queryClient.getQueryData(
            queryKeys["computorIds"]()
        ) as ComputorIdDataApi[];

        if (currentIds.some((id) => id.id === idText)) {
            handleCancel();
            return;
        }

        currentIds[globalIndex].id = idText;

        queryClient.setQueryData(queryKeys["computorIds"](), currentIds);
    };

    if (data.workers === -1) return null;

    return (
        <>
            <Dialog
                maxWidth="lg"
                onClose={() => setIsOpenningDialog(false)}
                open={isOpenningDialog}
            >
                <Box
                    className="jura-font"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px",
                    }}
                >
                    {" "}
                    <Box
                        className="jura-font"
                        sx={{
                            fontWeight: "bold",
                            paddingBottom: "5px",
                        }}
                    >
                        {idText}
                    </Box>
                    <Box className="jura-font">
                        Solutions From Pool (Total/Written On BlockChain) :{" "}
                        {data.submittedSolutions.total}
                        <span
                            className="jura-font"
                            style={{ color: "green", fontWeight: "bold" }}
                        >
                            /{data.submittedSolutions.isWrittenToBC}
                        </span>
                    </Box>
                    <Box className="jura-font">
                        Total Solutions Written On BlockChain: {data.bcscore}
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                paddingY: "5px",
                            }}
                        >
                            Wallet Stats
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                className="jura-font"
                                sx={{
                                    paddingY: "5px",
                                    opacity: 0.5,
                                    fontSize: ".8rem",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                ID Workers/Peformance Its
                            </Box>
                            {!isComputorIdDetailFetching ? (
                                computorIdDetail?.walletArray?.map(
                                    (walletData, index) => (
                                        <Box key={index} className="jura-font">
                                            {walletData.wallet}
                                            <span
                                                className="jura-font"
                                                style={{
                                                    marginLeft: "5px",
                                                    color: "var(--q-main-color)",
                                                }}
                                            >
                                                {walletData.workers}
                                            </span>
                                            /
                                            <span
                                                className="jura-font"
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {formatNumber(
                                                    walletData.hashrate
                                                )}{" "}
                                                Its
                                            </span>{" "}
                                        </Box>
                                    )
                                )
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        transform: "scale(.8)",
                                        paddingTop: "10px",
                                    }}
                                >
                                    <QLoadingCircle />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Dialog>{" "}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    paddingY: "10px",
                    borderTop: "1px solid var(--q-border-color)",
                }}
            >
                {" "}
                {isEditing ? (
                    <input
                        className="jura-font"
                        value={idText}
                        onChange={handleIdChange}
                        placeholder="Enter your id"
                        style={{
                            marginLeft: "5px",
                            width: "33%",
                        }}
                    />
                ) : (
                    <Box
                        className="jura-font"
                        sx={{
                            width: {
                                xs: "auto",
                                md: "33%",
                            },
                            overflowX: "auto",
                            marginLeft: "5px",
                        }}
                    >
                        {data.id}
                    </Box>
                )}
                <QSelect
                    value={internalMining}
                    onSelected={(option) =>
                        handleOnTrueFalseSelect(option, "mining")
                    }
                    isPlaceBottom={!isLastRow}
                    options={trueFalseOptions}
                    customCss={{
                        width: {
                            xs: "auto",
                            md: "7%",
                        },
                    }}
                />
                <QSelect
                    value={internalFollowingAvgScore}
                    onSelected={(option) =>
                        handleOnTrueFalseSelect(option, "followingAvgScore")
                    }
                    isPlaceBottom={!isLastRow}
                    options={trueFalseOptions}
                    customCss={{
                        width: {
                            xs: "auto",
                            md: "12%",
                        },
                    }}
                />
                <Box
                    className="jura-font"
                    sx={{
                        width: {
                            xs: "auto",
                            md: "15%",
                        },
                        fontWeight: !isNaN(data?.targetScore as number)
                            ? "bold"
                            : "normal",
                        marginX: {
                            xs: "5px",
                            md: "0",
                        },
                    }}
                >
                    {backupWorkersForDelete[data.id] || data.workers}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: {
                            xs: "auto",
                            md: "20%",
                        },
                        fontWeight: !isNaN(data?.targetScore as number)
                            ? "bold"
                            : "normal",
                    }}
                >
                    {data.totalHashrate || 0} It/s
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                    }}
                >
                    {isEditing ? (
                        <QButtonSimple
                            isDisabled={idText.length !== 60}
                            onClick={handleConfirm}
                            customCss={{
                                width: "fit-content",
                                borderRadius: "5px",
                            }}
                            text="Confirm"
                        />
                    ) : (
                        <>
                            <QButtonSimple
                                onClick={() => setIsOpenningDialog(true)}
                                customCss={{
                                    borderRadius: "5px",
                                    paddingRight: "15px",
                                    paddingLeft: "15px",
                                    marginRight: "5px",
                                }}
                                text="Detail"
                            />
                            <QButtonSimple
                                onClick={() => handleOnDelete()}
                                // effect3d={false}
                                // effect2dHoverColor="red"
                                customCss={{
                                    paddingRight: "5px",
                                    paddingLeft: "5px",
                                    borderRadius: "5px",
                                }}
                                text=""
                            >
                                <DeleteOutlineRoundedIcon />
                            </QButtonSimple>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
});
