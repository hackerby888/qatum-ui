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
                    }}
                >
                    <img
                        onClick={() =>
                            handleOpenNewTab("https://discord.gg/sVwMPMd8Ve")
                        }
                        width={"24"}
                        height={"24"}
                        src="/discord.svg"
                        alt=""
                    />
                </Box>
            </Container>
        </Box>
    );
}
