import { Box } from "@mui/material";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { PaymentDbDataWithReward } from "@/types";
import formatNumber from "@/utils/number";
import useInfiniteGet from "@/apis/useInfiniteGet";
import queryKeys from "@/apis/getQueryKey";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import { v4 } from "uuid";
import Skeletons from "@/components/Skeletons";
import { useEffect, useRef } from "react";
const PAYMENTS_LIMIT = 20;
export default function Payments({ wallet }: { wallet: string }) {
    let {
        data: payments,
        isFetchingNextPage,
        fetchNextPage,
        isFetching,
        error,
    }: {
        data: {
            pages: PaymentDbDataWithReward[][];
        };
        isFetchingNextPage: boolean;
        isFetching: boolean;
        error: any;
        fetchNextPage: () => void;
    } = useInfiniteGet({
        queryKey: queryKeys["payments"]({ wallet }),
        path: "payments",
        reqQuery: {
            wallet,
        },
        limit: PAYMENTS_LIMIT,
        enabled: !!wallet,
    }) as any;

    let wrapperRef = useRef<HTMLDivElement>(null);

    const handleOpenNewTab = (url: string) => {
        window.open(url, "_blank");
    };

    let isLastPage =
        payments?.pages[payments?.pages.length - 1].length < PAYMENTS_LIMIT;

    useEffect(() => {
        if (wrapperRef.current && !payments)
            wrapperRef.current.style.maxHeight =
                wrapperRef.current?.scrollHeight + "px";
    });

    return (
        <Box
            ref={wrapperRef}
            sx={{
                width: {
                    xs: "100%",
                    md: "40%",
                },
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                border: "1px solid var(--q-border-color)",
                borderRadius: "5px",
                padding: "10px",
                marginTop: {
                    xs: "10px",
                    md: "0",
                },
                flex: {
                    xs: "0 1 auto",
                    md: 1,
                },
                height: {
                    xs: "30vh",
                    md: "auto",
                },
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
            {payments?.pages?.map((page, i) =>
                page.map((payment, j) => {
                    let isLastPayment =
                        i === payments.pages.length - 1 &&
                        j === page.length - 1;
                    return (
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
                                borderBottom: !isLastPayment
                                    ? "1px solid var(--q-border-color)"
                                    : "none",
                                paddingY: "5px",
                                paddingX: "5px",
                                alignItems: "center",
                                cursor: payment.isPaid ? "pointer" : "default",
                                "&:hover": payment.isPaid
                                    ? {
                                          backgroundColor:
                                              "var(--q-background-color)",
                                          // color: "white !important",
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
                                    <CreditScoreRoundedIcon
                                        fontSize="small"
                                        sx={{
                                            color: "inherit",
                                        }}
                                    />
                                ) : (
                                    <HourglassTopRoundedIcon
                                        fontSize="small"
                                        sx={{
                                            color: "inherit",
                                        }}
                                    />
                                )}
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    fontSize: ".9rem",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    className="jura-font"
                                    sx={{
                                        width: "45%",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    {" "}
                                    {formatNumber(payment.reward)} QUBIC
                                </Box>
                                <Box
                                    sx={{
                                        width: "5%",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "5px",
                                            height: "5px",
                                            background: payment.isPaid
                                                ? "var(--q-main-color)"
                                                : "red",
                                            borderRadius: "50%",
                                            marginX: "5px",
                                        }}
                                    ></Box>
                                </Box>
                                <Box
                                    className="jura-font"
                                    sx={{
                                        width: "45%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    {payment.solutionsShare > 0
                                        ? `${payment.solutionsShare} Shares`
                                        : `${payment.solutionsWritten} Solutions`}
                                </Box>
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: ".9rem",
                                }}
                            >
                                E{payment.epoch}
                            </Box>
                        </Box>
                    );
                })
            )}
            {isFetching && <Skeletons row={3} />}
            {!isLastPage && !isFetching && payments ? (
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

            {error && (
                <Box
                    sx={{
                        width: "100%",
                        color: "red",
                        display: "flex",
                        justifyContent: "center",

                        height: "100%",
                        alignItems: "center",
                    }}
                >
                    Error {`${error}`}
                </Box>
            )}
        </Box>
    );
}
