import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import useGeneralPost from "@/apis/useGeneralPost";
import MaterialUIInput from "@/components/MaterialUIInput";
import QButtonSimple from "@/components/QButtonSimple";
import QSelect from "@/components/QSelect";
import useGlobalStore, { GlobalStore } from "@/stores/useGlobalStore";
import { EpochDbData, GlobalStats, QSelectOptions } from "@/types";
import { Box, Chip, styled } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

interface EpochChipData {
    key: number;
    label: string;
}

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

let lastFetchEpochsPaying = [] as number[];

export default function PaymentConfigForm({
    setSelectedEpoch,
    selectedEpoch,
}: {
    setSelectedEpoch: (epoch: number) => void;
    selectedEpoch: number;
}) {
    let globalStore: GlobalStore = useGlobalStore();
    let {
        data: globalStats,
        isFetching: _,
    }: {
        data: GlobalStats;
        isFetching: boolean;
    } = useGeneralGet({
        path: "globalStats",
        queryKey: queryKeys["globalStats"](),
    }) as any;

    let {
        data: apiEpochsPaying,
    }: {
        data: {
            epochs: number[];
        };
        isFetching: boolean;
    } = useGeneralGet({
        queryKey: queryKeys["epochsPaying"](),
        path: "payments/system/epoch",
    }) as any;

    let {
        mutate: updateEpochsPaying,
        isPending: isEpochsUpdatePayingPending,
        isSuccess: isEpochsUpdatePayingSuccess,
        reset: resetEpochsUpdatePaying,
        error: updateEpochsPayingError,
        isError: isEpochsUpdatePayingError,
    } = useGeneralPost({
        queryKey: queryKeys["epochsPaying"](),
        path: "payments/system/epoch",
    }) as any;

    const [epochPaying, setEpochPaying] = useState<readonly EpochChipData[]>([
        // { key: 123, label: "E123" },
        // { key: 124, label: "E124" },
    ]);

    let [epochAddingPaying, setEpochAddingPaying] = useState<number>(0);

    let {
        data: epochData,
        isFetching: isEpochDataFetching,
    }: {
        data: EpochDbData;
        isFetching: boolean;
    } = useGeneralGet({
        queryKey: queryKeys["epochData"]({ epoch: selectedEpoch }),
        path: "solutionData",
        reqQuery: {
            epoch: selectedEpoch,
        },
        enabled: selectedEpoch !== 0,
    }) as any;

    let {
        mutate: updateEpochData,
        isError: isUpdateEpochDataError,
        isSuccess: isUpdateEpochDataSuccess,
        reset: resetUpdateEpochData,
        error: updateEpochDataError,
        isPending: isUpdateEpochDataPending,
    }: {
        mutate: (data: EpochDbData) => void;
        isError: any;
        isSuccess: any;
        reset: any;
        error: any;
        isPending: any;
    } = useGeneralPost({
        queryKey: queryKeys["epochData"]({ epoch: selectedEpoch }),
        path: "solutionData",
    }) as any;

    let {
        data: paymentEnable,
    }: {
        data: {
            enable: boolean;
        };
    } = useGeneralGet({
        queryKey: queryKeys["getIsPaymentEnabled"](),
        path: "payments/system/enable",
    }) as any;

    let {
        mutate: updatePaymentEnable,
        isError: isUpdatePaymentEnableError,
        isSuccess: isUpdatePaymentEnableSuccess,
        reset: resetUpdatePaymentEnable,
        error: updatePaymentEnableError,
    }: {
        mutate: (data: { enable: boolean }) => void;
        isError: any;
        isSuccess: any;
        reset: any;
        error: any;
    } = useGeneralPost({
        queryKey: queryKeys["getIsPaymentEnabled"](),
        path: "payments/system/enable",
    }) as any;

    let queryClient = useQueryClient();

    const handleOnChangePaymentEnable = (option: QSelectOptions) => {
        queryClient.setQueryData(queryKeys["getIsPaymentEnabled"](), {
            enable: option.value,
        });
        updatePaymentEnable({ enable: option.value });
    };

    const handleDelete = (chipToDelete: EpochChipData) => () => {
        setEpochPaying((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        );
    };

    let prepareLast100Epochs = () => {
        let epochs: {
            text: string;
            value: number;
        }[] = [];
        if (!globalStats) return epochs;
        for (let i = 0; i < 100; i++) {
            epochs.push({
                text: `E${globalStats.epoch - i}`,
                value: globalStats.epoch - i,
            });
        }
        return epochs;
    };

    const handleOnChangeEpoch = (option: QSelectOptions) => {
        setSelectedEpoch(option.value);
    };

    const handleOnEpochDataChange = (e: any, field: keyof EpochDbData) => {
        let value = e.target.value;
        queryClient.setQueryData(
            queryKeys["epochData"]({
                epoch: selectedEpoch,
            }),
            {
                ...epochData,
                [field]: value,
            }
        );
    };

    const handleOnSave = () => {
        updateEpochData({
            ...epochData,
            epoch: selectedEpoch,
        });
    };

    const handleAddNewEpochToPaying = () => {
        if (!epochPaying.map((e) => e.key).includes(epochAddingPaying)) {
            setEpochPaying((chips) => [
                ...chips,
                {
                    key: epochAddingPaying,
                    label: `E${epochAddingPaying}`,
                },
            ]);
        }
        setEpochAddingPaying(0);
    };

    const handleUpdateEpochsPaying = () => {
        //detect add epochs
        let addEpochs = epochPaying
            .filter((epoch) => !lastFetchEpochsPaying.includes(epoch.key))
            .map((e) => e.key);

        //detect remove epochs
        let removeEpochs = lastFetchEpochsPaying.filter(
            (epoch) => !epochPaying.map((e) => e.key).includes(epoch)
        );

        let apiData = {
            epochs: {
                add: addEpochs,
                remove: removeEpochs,
            },
        };
        lastFetchEpochsPaying = epochPaying.map((e) => e.key);
        updateEpochsPaying(apiData);
    };

    useEffect(() => {
        if (isEpochsUpdatePayingSuccess) {
            globalStore.handleOnpenAndSetSnackbar(`Updated Epochs Paying`);
            resetEpochsUpdatePaying();
        } else if (isEpochsUpdatePayingError) {
            globalStore.handleOnpenAndSetSnackbar(
                `Failed to Update Epochs Paying: ${updateEpochsPayingError}`
            );
            resetEpochsUpdatePaying();
        }
    }, [isEpochsUpdatePayingError, isEpochsUpdatePayingSuccess]);

    useEffect(() => {
        if (apiEpochsPaying) {
            setEpochPaying(
                apiEpochsPaying?.epochs?.map((epoch) => {
                    return {
                        key: epoch,
                        label: `E${epoch}`,
                    };
                })
            );
        }
    }, [apiEpochsPaying]);

    useEffect(() => {
        if (apiEpochsPaying?.epochs && !lastFetchEpochsPaying.length) {
            lastFetchEpochsPaying = apiEpochsPaying?.epochs;
        }
    }, [apiEpochsPaying]);

    useEffect(() => {
        if (isUpdateEpochDataSuccess) {
            globalStore.handleOnpenAndSetSnackbar(`Updated Epoch Data`);
            resetUpdateEpochData();
        } else if (isUpdateEpochDataError) {
            globalStore.handleOnpenAndSetSnackbar(
                `Failed to Update Epoch Data: ${updateEpochDataError}`
            );
            resetUpdateEpochData();
        }
    }, [isUpdateEpochDataError, isUpdateEpochDataSuccess]);

    useEffect(() => {
        if (isUpdatePaymentEnableSuccess) {
            globalStore.handleOnpenAndSetSnackbar(`Updated Payment Enable`);
            resetUpdatePaymentEnable();
        } else if (isUpdatePaymentEnableError) {
            globalStore.handleOnpenAndSetSnackbar(
                `Failed to Update Payment Enable: ${updatePaymentEnableError}`
            );
            resetUpdatePaymentEnable();
        }
    }, [isUpdatePaymentEnableError, isUpdatePaymentEnableSuccess]);

    useEffect(() => {
        if (globalStats) {
            setSelectedEpoch(globalStats.epoch);
        }
    }, [globalStats]);

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
                Epoch Payment
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    paddingY: "10px",
                }}
            >
                <Box sx={{ paddingY: "10px" }}>
                    <MaterialUIInput
                        type="number"
                        onKeydown={(e: any) => {
                            if (e.key === "Enter") {
                                handleAddNewEpochToPaying();
                            }
                        }}
                        label="Add New Epoch"
                        value={epochAddingPaying}
                        onChange={(e: any) => {
                            setEpochAddingPaying(parseInt(e.target.value));
                        }}
                        //do on enter
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        {" "}
                        <QButtonSimple
                            onClick={handleAddNewEpochToPaying}
                            effect3d={false}
                            customCss={{
                                display: "flex",
                                justifyContent: "center",
                                width: "50%",
                                borderTop: "none",
                                borderRight: "none",
                            }}
                            text="Add"
                        />
                        {!isEpochsUpdatePayingPending ? (
                            <QButtonSimple
                                onClick={handleUpdateEpochsPaying}
                                effect3d={false}
                                customCss={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50%",
                                    borderTop: "none",
                                }}
                                text="Save"
                            />
                        ) : (
                            <QButtonSimple
                                effect3d={false}
                                customCss={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50%",
                                    borderTop: "none",
                                }}
                                text="..."
                                isDisabled={true}
                            />
                        )}
                    </Box>
                </Box>
                <Box
                    component={"ul"}
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {" "}
                    {epochPaying.map((data) => {
                        return (
                            <ListItem sx={{}} key={data.key}>
                                <Chip
                                    label={data.label}
                                    onDelete={handleDelete(data)}
                                />
                            </ListItem>
                        );
                    })}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
                        alignItems: "center",
                        border: "1px solid var(--q-border-color)",
                        paddingLeft: "10px",
                        flex: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        Enable
                    </Box>
                    <QSelect
                        //@ts-ignore
                        key={paymentEnable?.enable}
                        value={paymentEnable?.enable}
                        onSelected={handleOnChangePaymentEnable}
                        options={[
                            {
                                text: "True",
                                value: true,
                                customCss: { color: "green" },
                            },
                            {
                                text: "False",
                                value: false,
                                customCss: { color: "red" },
                            },
                        ]}
                        customCss={{
                            padding: "3px 10px",
                            borderRadius: "5px",
                        }}
                        isPlaceBottom={true}
                    />
                </Box>

                {/* {!isEpochDataFetching ? (
                    <QSelect
                        value={selectedEpoch}
                        onSelected={handleOnChangeEpoch}
                        options={prepareLast100Epochs()}
                        customCss={{
                            border: "1px solid black",
                            borderLeft: "none",
                            borderRight: "none",
                            padding: "3px 10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        isPlaceBottom={true}
                    />
                ) : (
                    <Box
                        sx={{
                            padding: "3px 10px",
                            border: "1px solid black",
                            borderLeft: "none",
                            borderRight: "none",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Loading...
                    </Box>
                )} */}
                <QSelect
                    value={selectedEpoch}
                    onSelected={handleOnChangeEpoch}
                    options={prepareLast100Epochs()}
                    customCss={{
                        border: "1px solid var(--q-border-color)",
                        borderLeft: "none",
                        borderRight: "none",
                        padding: "3px 10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    isPlaceBottom={true}
                />
                {!isEpochDataFetching && epochData ? (
                    <React.Fragment>
                        {" "}
                        <MaterialUIInput
                            onChange={(e: any) =>
                                handleOnEpochDataChange(e, "solutionValue")
                            }
                            value={epochData?.solutionValue}
                            label="Qubic Per Solution"
                            customCss={{
                                width: "33%",
                            }}
                        />
                        <MaterialUIInput
                            onChange={(e: any) =>
                                handleOnEpochDataChange(e, "shareValue")
                            }
                            value={epochData?.shareValue}
                            label="Qubic Per Share"
                            customCss={{
                                width: "33%",
                            }}
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {" "}
                        <MaterialUIInput
                            onChange={() => {}}
                            value={""}
                            label="Loading..."
                            customCss={{
                                width: "33%",
                            }}
                        />
                        <MaterialUIInput
                            onChange={() => {}}
                            value={""}
                            label="Loading..."
                            customCss={{
                                width: "33%",
                            }}
                        />
                    </React.Fragment>
                )}

                {!isUpdateEpochDataPending ? (
                    <QButtonSimple
                        onClick={handleOnSave}
                        customCss={{
                            marginLeft: "10px",
                        }}
                        text="Save"
                    />
                ) : (
                    <QButtonSimple
                        isDisabled={true}
                        customCss={{
                            marginLeft: "10px",
                        }}
                        text="Saving..."
                    />
                )}
            </Box>
        </Box>
    );
}
