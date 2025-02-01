import { useEffect, useState } from "react";
import "./App.css";
import { Box, Container, Divider, Snackbar } from "@mui/material";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import DvrRoundedIcon from "@mui/icons-material/DvrRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import Footer from "./components/Footer";
import IdManager from "./pages/IdManager/IdManager";
import PaymentManager from "./pages/PaymentManager/PaymentManager";
import Stats from "./pages/Stats/Stats";
import useGlobalStore, { GlobalStore } from "./stores/useGlobalStore";
import Header from "./components/Header";

function App() {
    const [page, setPage] = useState("stats");
    let [showSnackbar, setShowSnackbar] = useState(false);
    let [snackbarMessage, setSnackbarMessage] = useState("");
    let globalStore: GlobalStore = useGlobalStore();
    const handleOnCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    const handleOnpenAndSetSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setShowSnackbar(true);
    };

    useEffect(() => {
        globalStore.setHandleOnpenAndSetSnackbar(handleOnpenAndSetSnackbar);
    }, []);

    return (
        <>
            <Header />

            <Container
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={5000}
                    onClose={handleOnCloseSnackbar}
                    message={snackbarMessage}
                />

                {/* <QDivider py={"5px"} /> */}

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            height: "fit-content",
                            width: "fit-content",
                        }}
                    >
                        {[
                            {
                                text: "Stats",
                                icon: QueryStatsRoundedIcon,
                            },
                            {
                                text: "ID Manager",
                                icon: DvrRoundedIcon,
                            },
                            {
                                text: "Payment Manager",
                                icon: LocalAtmRoundedIcon,
                            },
                        ].map((item) => {
                            let isActive =
                                item.text.replace(/ /g, "").toLowerCase() ===
                                page;
                            return (
                                <Box
                                    key={item.text}
                                    onClick={() =>
                                        setPage(
                                            item.text
                                                .replace(/ /g, "")
                                                .toLowerCase()
                                        )
                                    }
                                    sx={{
                                        borderBottom: `2px solid var(${
                                            isActive
                                                ? "--q-main-color"
                                                : "--q-border-color"
                                        })`,
                                        userSelect: "none",
                                        cursor: "pointer",
                                        padding: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {
                                        <item.icon
                                            sx={{
                                                marginRight: "5px",
                                            }}
                                            fontSize="small"
                                        />
                                    }
                                    {item.text}
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
        </>
    );
}

export default App;
