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
                //  boxShadow: "0px 0px 5px 0px #ccc",
                border: "1px solid var(--q-border-color)",
                borderRadius: "5px",
                marginRight: "10px",
                flex: 1,
                background: "linear-gradient(45deg,#642cec,#2c82ec)",
                marginTop: "10px",
            }}
        >
            <Box
                sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    paddingTop: "10px",
                    paddingLeft: "10px",
                }}
            >
                Nevermine.io
            </Box>
            <Box
                className="jura-font"
                sx={{
                    paddingLeft: "10px",
                    color: "white",
                    opacity: 0.9,
                }}
            >
                Embark on crypto mining with us to revolutionize the world and
                earn cryptocurrency, together we can shape the future.
            </Box>
            <Box
                className="jura-font"
                sx={{
                    paddingLeft: "10px",
                    color: "white",
                    opacity: 0.9,
                    paddingTop: "10px",
                    fontSize: ".9rem",
                    fontWeight: "bold",
                }}
            >
                Reliable • Secure • Profitable - Mining Easy As Never Mine
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
                    onClick={() => handleOpenNewTab("https://nevermine.io/")}
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
                    text="Check Out"
                />
            </Box>
        </Box>
    );
}
