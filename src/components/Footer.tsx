import { Box } from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                paddingTop: "20px",
                width: "100%",
                display: "flex",
                flex: 1,
                alignItems: "flex-end",
                flexDirection: {
                    xs: "column",
                    sm: "row",
                },
            }}
        >
            <Box
                sx={{
                    width: "70%",
                    height: "100px",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "url('/pixel.svg')",
                    filter: "sepia(50%) hue-rotate(160deg) saturate(200%)",
                }}
            ></Box>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "30%",
                    },
                    height: "100px",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        fontSize: "1.5rem",
                    }}
                >
                    Qatum
                </Box>
                <Box
                    sx={{
                        opacity: ".6",
                    }}
                >
                    The first mining protocol for Qubic.
                </Box>
                <Box
                    sx={{
                        opacity: ".6",
                    }}
                >
                    Copyright 2025.
                </Box>
            </Box>
        </Box>
    );
}
