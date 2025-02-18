import { Storage } from "@/utils/storage";
import { Box, Container } from "@mui/material";

export default function Header() {
    const handleOpenNewTab = (url: string) => {
        window.open(url, "_blank");
    };
    return (
        <Box
            sx={{
                display: "flex",
                fontSize: "1.5rem",
                paddingY: "10px",
                borderBottom: "1px solid var(--q-border-color)",
                background: "var(--q-background-color)",
            }}
        >
            <Container
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    <Box
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Q
                    </Box>
                    <Box>atum</Box>
                    {Storage.getLoginCredential() && (
                        <Box
                            sx={{
                                marginLeft: "5px",
                                fontSize: ".9rem",
                            }}
                        >
                            <Box
                                className="jura-font"
                                sx={{
                                    border: "1px solid var(--q-border-color)",
                                    padding: "3px",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                }}
                            >
                                Admin
                            </Box>
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                        alignItems: "center",
                    }}
                >
                    <Box
                        onClick={() =>
                            handleOpenNewTab(
                                "https://github.com/hackerby888/qatum-protocol/blob/main/docs/how-to-interact-with-qatum.md"
                            )
                        }
                        className="jura-font"
                        sx={{
                            userSelect: "none",
                            cursor: "pointer",
                            marginRight: {
                                xs: "0px",
                                md: "20px",
                            },
                            fontWeight: "bold",
                            fontSize: ".9rem",
                            padding: "5px",
                            borderRadius: "5px",
                            "&:hover": {
                                background: "var(--q-border-color)",
                            },
                            display: { xs: "none", md: "block" },
                        }}
                    >
                        How to connect your custom miner?
                    </Box>
                    <img
                        onClick={() =>
                            handleOpenNewTab("https://discord.com/invite/qubic")
                        }
                        width={"24"}
                        height={"24"}
                        src="/discord.svg"
                        alt=""
                        style={{ marginRight: "10px" }}
                    />
                    <img
                        onClick={() =>
                            handleOpenNewTab(
                                "https://github.com/hackerby888/qatum-protocol"
                            )
                        }
                        width={"24"}
                        height={"24"}
                        src="/github.svg"
                        alt=""
                    />
                </Box>
            </Container>
        </Box>
    );
}
