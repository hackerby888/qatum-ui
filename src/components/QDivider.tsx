import { Box } from "@mui/material";

export default function Divider({ type = "dotted" }) {
    return (
        <Box
            sx={{
                flex: "1 1 auto",
                borderBottom: `3px ${type} #ccc`,
                height: "3px",
                maskImage:
                    "linear-gradient(90deg, transparent, #ccc, transparent)",
            }}
        ></Box>
    );
}
