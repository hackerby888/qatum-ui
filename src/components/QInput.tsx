import { Box } from "@mui/material";
import QButton from "./QButton";
import { memo, useState } from "react";

export default memo(function QInput({
    customCss,
    onCommit,
    initialValue,
}: {
    customCss: any;
    initialValue?: string;
    onCommit?: (value: any) => void;
}) {
    let [inputValue, setInputValue] = useState(initialValue || "");

    let handleInput = (e: any) => {
        setInputValue(e.target.value);
    };

    let handleCommit = () => {
        if (onCommit) onCommit(inputValue);
    };

    return (
        <Box
            sx={{
                display: "flex",
                ...customCss,
            }}
        >
            <input
                //@ts-ignore
                spellCheck={"false"}
                value={inputValue}
                onChange={handleInput}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleCommit();
                }}
                placeholder="Enter your wallet"
                style={{
                    border: "1px solid black",
                    padding: "12px",
                    flex: "1",
                }}
            />
            <QButton onClick={handleCommit} text="Enter" />
        </Box>
    );
});
