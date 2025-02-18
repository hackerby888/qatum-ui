import QButtonSimple from "@/components/QButtonSimple";
import { Box } from "@mui/material";

export default function NevermineBanner() {
    const handleOpenNewTab = (url: string) => {
        window.open(url, "_blank");
    };
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid var(--q-border-color)",
                borderRadius: "5px",
                marginRight: "10px",
                background:
                    "linear-gradient(45deg,rgba(139, 249, 232, 0.1),rgba(140, 200, 250, 0.1))",
                marginTop: "10px",
                flex: 1,
            }}
        >
            <Box
                sx={{
                    fontSize: "1.2rem",
                    paddingTop: "10px",
                    paddingLeft: "10px",
                }}
            >
                Qubic
            </Box>
            <Box
                className="jura-font"
                sx={{
                    paddingLeft: "10px",
                    opacity: 0.9,
                }}
            >
                Qubic is a high-performance Layer 1 blockchain enabling instant
                finality, feeless transactions, and the fastest smart contracts.
                Built on Useful Proof of Work (UPoW), it’s the first to
                integrate artificial neural networks for the future of
                Artificial General Intelligence.
            </Box>
            <Box
                className="jura-font"
                sx={{
                    paddingLeft: "10px",

                    opacity: 0.9,
                    paddingTop: "10px",
                    fontSize: ".9rem",
                    fontWeight: "bold",
                }}
            >
                FORGET WHAT YOU KNOW
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    flex: 1,
                    alignItems: "flex-end",
                    paddingBottom: "10px",
                    paddingRight: "10px",
                }}
            >
                <QButtonSimple
                    onClick={() => handleOpenNewTab("https://qubic.org/")}
                    customCss={{
                        width: "fit-content",
                        background: "white",
                        borderRadius: "5px",
                        padding: "10px",
                        height: "fit-content",
                        fontFamily: "jura",
                        fontWeight: "bold",
                        fontSize: ".9rem",
                        marginTop: "10px",
                    }}
                    text="Learn More"
                />
            </Box>
        </Box>
    );
}
