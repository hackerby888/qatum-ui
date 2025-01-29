import { Box } from "@mui/material";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import usePaymentsHistory, { PAYMENTS_LIMIT } from "@/apis/usePaymentsHistory";
import { PaymentDbDataWithReward } from "@/types";
import formatNumber from "@/utils/number";

export default function Payments({ wallet }: { wallet: string }) {
    let {
        data: payments,
        isFetchingNextPage,
        fetchNextPage,
    }: {
        data: {
            pages: PaymentDbDataWithReward[][];
        };
        isFetchingNextPage: boolean;
        fetchNextPage: () => void;
    } = usePaymentsHistory({ wallet }) as any;
    console.log(payments);
    let isLastPage =
        payments?.pages[payments?.pages.length - 1].length < PAYMENTS_LIMIT;
    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    md: "40%",
                },
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                maxHeight: "300px",
                boxShadow: "0px 0px 5px 0px #ccc",
                padding: "5px",
                borderRadius: "5px",
            }}
        >
            <Box
                sx={{
                    paddingY: "5px",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                }}
            >
                Payments
            </Box>
            {payments?.pages?.map((page, _) =>
                page.map((payment, j) => (
                    <Box
                        key={j}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            border: "1px solid #ccc",
                            paddingY: "5px",
                            paddingX: "5px",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "var(--q-main-color)",
                                color: "white",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <HourglassTopRoundedIcon />
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {formatNumber(payment.reward)} @{" "}
                            {payment.solutionsShare > 0
                                ? `${payment.solutionsShare} Shares`
                                : `${payment.solutionsWritten} Solutions`}
                        </Box>
                        <Box>E{payment.epoch}</Box>
                    </Box>
                ))
            )}
            {!isLastPage ? (
                <Box
                    onClick={
                        isFetchingNextPage ? () => {} : () => fetchNextPage()
                    }
                    sx={{
                        paddingY: "5px",
                        paddingX: "5px",
                        display: "flex",
                        justifyContent: "center",
                        cursor: isFetchingNextPage ? "default" : "pointer",
                        "&:hover": isFetchingNextPage
                            ? {}
                            : {
                                  backgroundColor: "var(--q-main-color)",
                                  color: "white",
                              },
                    }}
                >
                    {isFetchingNextPage ? (
                        "Loading..."
                    ) : (
                        <ArrowDropDownRoundedIcon />
                    )}
                </Box>
            ) : null}
        </Box>
    );
}
