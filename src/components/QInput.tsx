import { Box } from "@mui/material";
import QButton from "./QButton";

export default function QInput({ customCss }: { customCss: any }) {
    return (
        <Box
            sx={{
                display: "flex",
                ...customCss,
            }}
        >
            <input
                placeholder="Enter your wallet"
                style={{
                    border: "1px solid black",
                    padding: "12px",
                    flex: "1",
                }}
            />
            <QButton text="Enter" />
        </Box>
    );
}
