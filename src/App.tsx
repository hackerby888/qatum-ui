import { useState } from "react";
import "./App.css";
import { Box, Container, Divider } from "@mui/material";
import QDivider from "./components/QDivider";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import IdManager from "./components/IdManager";
import PaymentManager from "./components/PaymentManager";

function App() {
    const [page, setPage] = useState("stats");
    return (
        <Container
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                className="cursor-pointer"
                sx={{
                    display: "flex",
                    fontSize: "2rem",
                }}
            >
                <Box
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    Q
                </Box>
                <Box>atum Protocol</Box>
            </Box>
            <QDivider py={"5px"} />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        height: "fit-content",
                        marginTop: "20px",
                    }}
                >
                    {["Stats", "Id Manager", "Payment Manager"].map((item) => {
                        let isActive =
                            item.replace(/ /g, "").toLowerCase() === page;
                        return (
                            <Box
                                onClick={() =>
                                    setPage(
                                        item.replace(/ /g, "").toLowerCase()
                                    )
                                }
                                sx={{
                                    userSelect: "none",
                                    cursor: "pointer",
                                    marginX: "20px",
                                    padding: "10px",
                                    background: isActive ? "black" : "white",
                                    color: isActive ? "white" : "black",
                                    "&:hover": {
                                        color: "white",
                                        background: "black",
                                    },
                                }}
                            >
                                {item}
                            </Box>
                        );
                    })}
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {
                        {
                            stats: <Stats />,
                            idmanager: <IdManager />,
                            paymentmanager: <PaymentManager />,
                        }[page]
                    }
                </Box>
            </Box>

            <Footer />
        </Container>
    );
}

export default App;
