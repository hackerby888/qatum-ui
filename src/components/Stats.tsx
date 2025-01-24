import { Box } from "@mui/material";
import QInput from "./QInput";
import QLoading from "./QLoading";
import QMinerRow from "./QMinerRow";
import QMinerTable from "./QMinerTable";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import Divider from "./Divider";
export default function Stats() {
    return (
        <Box
            sx={{
                width: "100%",
                paddingTop: "20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        border: "1px solid black",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        width: "fit-content",
                    }}
                >
                    <Box className="jura-font">Epoch: 135</Box>
                    <Box className="jura-font">Users: 12</Box>
                    <Box className="jura-font">Miners: 24</Box>
                </Box>
                <Box
                    sx={{
                        border: "1px solid black",
                        borderLeft: "none",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        width: "fit-content",
                    }}
                >
                    <Box className="jura-font">Pool It/s: 135,1323</Box>
                    <Box className="jura-font">Pool Solutions: 12</Box>
                    <Box className="jura-font">Pool Shares: 24</Box>
                </Box>
            </Box>
            <QInput
                customCss={{
                    marginTop: "10px",
                }}
            />
            <QLoading />
            <QMinerTable />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    marginTop: "20px",
                }}
            >
                <Box
                    sx={{
                        width: "60%",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0px 0px 5px 0px #ccc",
                        padding: "5px",
                        borderRadius: "5px",
                        marginRight: "10px",
                    }}
                >
                    <Box
                        className="jura-font"
                        sx={{
                            paddingY: "5px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            // justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                marginRight: "5px",
                                fontSize: "1.2rem",
                            }}
                        >
                            Epoch
                        </Box>{" "}
                        133
                    </Box>

                    {[
                        {
                            text: "Your Total Performance",
                            value: 123,
                            unit: "It/s",
                        },
                        {
                            text: "Your Total Workers",
                            value: 123,
                            unit: "",
                        },
                        {
                            text: "Your Total Shares",
                            value: 123,
                            unit: "Shares",
                        },

                        {
                            text: "Your Total Solutions",
                            value: 123,
                            unit: "Solutions",
                        },
                    ].map((item) => (
                        <Box
                            sx={{
                                paddingY: "5px",
                                borderBottom: "1px solid #ccc",
                                paddingX: "5px",
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                            }}
                            className="jura-font"
                        >
                            {item.text} <Divider /> {item.value} {item.unit}
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        width: "40%",
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
                    {new Array(10).fill(0).map((_, i) => (
                        <Box
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
                                3,111,111 @ 300 Solutions
                            </Box>
                            <Box>E122</Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
