import { Box } from "@mui/material";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

export default function Payments() {
    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    md: "40%",
                },
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
                    key={i}
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
            <Box
                sx={{
                    paddingY: "5px",
                    paddingX: "5px",
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: "var(--q-main-color)",
                        color: "white",
                    },
                }}
            >
                <ArrowDropDownRoundedIcon />
            </Box>
        </Box>
    );
}
