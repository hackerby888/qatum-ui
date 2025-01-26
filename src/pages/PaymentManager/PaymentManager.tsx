import { Box, Button, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import QSelect from "@/components/QSelect";
import QButton from "@/components/QButton";

export default function PaymentManager() {
    let [epoch, setEpoch] = useState(0);
    let [isEnablePayment, setIsEnablePayment] = useState(false);
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                paddingTop: "20px",
            }}
        >
            <Box
                sx={{
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
                    Payment Settings
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
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
                        onSelected={(option) => setEpoch(option.value)}
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
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {" "}
                    <QButton
                        customCss={{
                            paddingX: "20px",
                            paddingY: "5px",
                        }}
                        text="Save"
                    />
                </Box>
            </Box>

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
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <QSelect
                        onSelected={(option) => setEpoch(option.value)}
                        options={[
                            { text: "E103", value: 103 },
                            { text: "E101", value: 101 },
                        ]}
                        customCss={{
                            border: "1px solid black",
                            borderRight: "none",
                            padding: "3px 10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        isPlaceBottom={true}
                    />
                    <input
                        placeholder="Qubic Per Solution"
                        style={{
                            width: "33%",
                            border: "1px solid black",
                            padding: "12px",
                        }}
                    />
                    <input
                        placeholder="Qubic Per Share"
                        style={{
                            width: "33%",
                            border: "1px solid black",
                            borderLeft: "none",
                            padding: "12px",
                        }}
                    />{" "}
                    <QButton text="Save" />
                </Box>
            </Box>

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
                            onSelected={(option) => setEpoch(option.value)}
                            options={[
                                {
                                    text: "All",
                                    value: true,
                                    customCss: {},
                                },
                                {
                                    text: "Paid",
                                    value: false,
                                    customCss: {},
                                },
                                {
                                    text: "Unpaid",
                                    value: false,
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
                        <QButton
                            customCss={{
                                paddingX: "20px",
                                paddingY: "5px",
                            }}
                            text="Save"
                        />
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
                            borderBottom: "1px solid #ccc",
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
                            sx={{
                                width: "37%",
                            }}
                        >
                            WALLET
                        </Box>
                        <Box
                            sx={{
                                width: "15%",
                                paddingLeft: "5px",
                            }}
                        >
                            Shares
                        </Box>
                        <Box
                            sx={{
                                width: "15%",
                                paddingLeft: "5px",
                            }}
                        >
                            Solutions
                        </Box>
                        <Box
                            sx={{
                                width: "20%",
                                paddingLeft: "5px",
                            }}
                        >
                            Reward
                        </Box>
                        <Box
                            sx={{
                                width: "10%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            Is Paid
                        </Box>
                    </Box>
                    {new Array(10).fill(0).map((_, index) => (
                        <Box
                            sx={{
                                display: "flex",
                                paddingY: "10px",
                                borderBottom: "1px solid #ccc",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "3%",
                                }}
                            >
                                1
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    width: "37%",
                                    overflowX: "auto",
                                }}
                            >
                                93GGNEEZYXQYTYFNFTLQYZKNNFMSCTBRSNZJIQGCXKAVVELCXQQQRMAKDDGOA
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    width: "15%",
                                    paddingLeft: "5px",
                                }}
                            >
                                15,000
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    width: "15%",
                                    paddingLeft: "5px",
                                }}
                            >
                                30
                            </Box>
                            <Box
                                className="jura-font"
                                sx={{
                                    width: "20%",
                                    paddingLeft: "5px",
                                }}
                            >
                                3,111,111
                            </Box>
                            <Box
                                sx={{
                                    width: "10%",
                                }}
                            >
                                <QSelect
                                    onSelected={(option) =>
                                        setEpoch(option.value)
                                    }
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
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
