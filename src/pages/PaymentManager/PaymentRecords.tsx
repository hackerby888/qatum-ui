import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import QSelect from "@/components/QSelect";
import { PaymentDbDataWithReward, PaymentDbState } from "@/types";
import formatNumber from "@/utils/number";
import { Box } from "@mui/material";
import { useState } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useQueryClient } from "@tanstack/react-query";

const sortMap: {
    [key: string]: "asc" | "desc";
} = {
    wallet: "asc",
    solutionsShare: "asc",
    solutionsWritten: "asc",
    reward: "asc",
    isPaid: "asc",
};

export default function PaymentRecords({
    setSelectedEpoch,
    selectedEpoch,
}: {
    setSelectedEpoch: (epoch: number) => void;
    selectedEpoch: number;
}) {
    let [type, setType]: [PaymentDbState, (type: PaymentDbState) => void] =
        useState("all") as any;
    let {
        data: payments,
        isFetching,
    }: {
        data: PaymentDbDataWithReward[];
        isFetching: boolean;
    } = useGeneralGet({
        queryKey: queryKeys["paymentsEpoch"]({ epoch: selectedEpoch, type }),
        path: "payments",
        reqQuery: {
            epoch: selectedEpoch,
            type,
        },
    }) as any;

    let queryClient = useQueryClient();

    const handleSort = (key: keyof PaymentDbDataWithReward) => {
        let newPayments = structuredClone(payments);

        newPayments.sort((a, b) => {
            if (sortMap[key] === "asc") {
                // @ts-ignore
                return a[key] > b[key] ? 1 : -1;
            } else {
                // @ts-ignore
                return a[key] < b[key] ? 1 : -1;
            }
        });

        queryClient.setQueryData(
            queryKeys["paymentsEpoch"]({ epoch: selectedEpoch, type }),
            newPayments
        );

        sortMap[key] = sortMap[key] === "asc" ? "desc" : "asc";
    };
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
                Payment Records
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    position: "relative",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {" "}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        Show Payment
                    </Box>
                    <QSelect
                        value={type}
                        onSelected={(option) => setType(option.value)}
                        options={[
                            {
                                text: "All",
                                value: "all",
                                customCss: {},
                            },
                            {
                                text: "Paid",
                                value: "paid",
                                customCss: {},
                            },
                            {
                                text: "Unpaid",
                                value: "unpaid",
                                customCss: {},
                            },
                        ]}
                        customCss={{
                            padding: "3px 10px",
                            borderRadius: "5px",
                        }}
                        isPlaceBottom={true}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {" "}
                    {/* <QButton
                        customCss={{
                            paddingX: "20px",
                            paddingY: "5px",
                        }}
                        text="Save"
                    /> */}
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        paddingY: "10px",
                        borderBottom: "1px solid var(--q-border-color)",
                    }}
                >
                    <Box
                        sx={{
                            width: "3%",
                        }}
                    >
                        #
                    </Box>
                    <Box
                        onClick={() => handleSort("wallet")}
                        sx={{
                            width: "37%",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": { color: "var(--q-main-color)" },
                            userSelect: "none",
                        }}
                    >
                        Wallet{" "}
                        <FilterListRoundedIcon
                            sx={{ marginLeft: "3px", fontSize: "1rem" }}
                            fontSize="small"
                        />
                    </Box>
                    <Box
                        onClick={() => handleSort("solutionsShare")}
                        sx={{
                            width: "15%",
                            paddingLeft: "5px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": { color: "var(--q-main-color)" },
                            userSelect: "none",
                        }}
                    >
                        Shares{" "}
                        <FilterListRoundedIcon
                            sx={{ marginLeft: "3px", fontSize: "1rem" }}
                            fontSize="small"
                        />
                    </Box>
                    <Box
                        onClick={() => handleSort("solutionsWritten")}
                        sx={{
                            width: "15%",
                            paddingLeft: "5px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": { color: "var(--q-main-color)" },
                            userSelect: "none",
                        }}
                    >
                        Solutions{" "}
                        <FilterListRoundedIcon
                            sx={{ marginLeft: "3px", fontSize: "1rem" }}
                            fontSize="small"
                        />
                    </Box>
                    <Box
                        onClick={() => handleSort("reward")}
                        sx={{
                            width: "20%",
                            paddingLeft: "5px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": { color: "var(--q-main-color)" },
                            userSelect: "none",
                        }}
                    >
                        Reward{" "}
                        <FilterListRoundedIcon
                            sx={{ marginLeft: "3px", fontSize: "1rem" }}
                            fontSize="small"
                        />
                    </Box>
                    <Box
                        onClick={() => handleSort("isPaid")}
                        sx={{
                            width: "10%",
                            display: "flex",
                            justifyContent: "center",
                            cursor: "pointer",
                            "&:hover": { color: "var(--q-main-color)" },
                            userSelect: "none",
                        }}
                    >
                        Is Paid{" "}
                        <FilterListRoundedIcon
                            sx={{ marginLeft: "3px", fontSize: "1rem" }}
                            fontSize="small"
                        />
                    </Box>
                </Box>
                {!isFetching ? (
                    payments?.map((payment, index) => (
                        <Box
                            sx={{
                                display: "flex",
                                paddingY: "10px",
                                borderBottom: "1px solid var(--q-border-color)",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "3%",
                                }}
                            >
                                {index + 1}
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    width: "37%",
                                    overflowX: "auto",
                                }}
                            >
                                {payment.wallet}
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    width: "15%",
                                    paddingLeft: "5px",
                                }}
                            >
                                {payment.solutionsShare}
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    width: "15%",
                                    paddingLeft: "5px",
                                }}
                            >
                                {payment.solutionsWritten}
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    width: "20%",
                                    paddingLeft: "5px",
                                }}
                            >
                                {formatNumber(payment.reward)}
                            </Box>
                            <Box
                                sx={{
                                    width: "10%",
                                }}
                            >
                                <Box
                                    sx={{
                                        color: payment.isPaid ? "green" : "red",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    {payment.isPaid ? "True" : "False"}
                                </Box>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingY: "10px",
                        }}
                    >
                        Loading...
                    </Box>
                )}
            </Box>
        </Box>
    );
}
