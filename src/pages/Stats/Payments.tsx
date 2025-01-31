import { Box } from "@mui/material";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { PaymentDbDataWithReward } from "@/types";
import formatNumber from "@/utils/number";
import useInfiniteGet from "@/apis/useInfiniteGet";
import queryKeys from "@/apis/getQueryKey";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import { v4 } from "uuid";
const PAYMENTS_LIMIT = 20;
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
    } = useInfiniteGet({
        queryKey: queryKeys["payments"]({ wallet }),
        path: "payments",
        reqQuery: {
            wallet,
        },
        limit: PAYMENTS_LIMIT,
    }) as any;

    const handleOpenNewTab = (url: string) => {
        window.open(url, "_blank");
    };

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
                        onClick={
                            payment.isPaid
                                ? () =>
                                      handleOpenNewTab(
                                          `https://explorer.qubic.org/network/tx/${payment.txId}?type=latest`
                                      )
                                : () => {}
                        }
                        key={v4()}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            border: "1px solid #ccc",
                            paddingY: "5px",
                            paddingX: "5px",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": payment.isPaid
                                ? {
                                      backgroundColor: "var(--q-main-color)",
                                      color: "white",
                                  }
                                : {},
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {payment.isPaid ? (
                                <CreditScoreRoundedIcon />
                            ) : (
                                <HourglassTopRoundedIcon />
                            )}
                        </Box>
                        <Box
                            className="jura-font"
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
