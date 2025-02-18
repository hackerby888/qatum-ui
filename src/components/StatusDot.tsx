import { Box } from "@mui/material";

export default function StatusDot({ status }: { status: boolean }) {
    return (
        <Box
            sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: status ? "var(--q-main-color)" : "#ccc",
                boxShadow: status ? "var(--q-main-color) 0px 0px 2px" : "",
            }}
        ></Box>
    );
}
