import { Box } from "@mui/material";

export default function QMinerRow({ index }: { index: number }) {
    return (
        <>
            {" "}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    border: "1px solid black",
                    borderTop: "none",
                }}
            >
                <Box
                    sx={{
                        width: "5%",
                        textAlign: "center",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        justifyContent: "center",
                    }}
                >
                    {index + 1}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: "30%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                    }}
                >
                    amdrxs-22
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: "15%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                    }}
                >
                    15
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: "15%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                    }}
                >
                    20
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: "25%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                    }}
                >
                    1h32p
                </Box>
                <Box
                    sx={{
                        width: "10%",
                        color: "var(--q-main-color)",
                        textAlign: "center",
                        paddingY: "5px",
                    }}
                >
                    Active
                </Box>
            </Box>
        </>
    );
}
