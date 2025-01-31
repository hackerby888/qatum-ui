import MaterialUIInput from "@/components/MaterialUIInput";
import QButton from "@/components/QButton";
import { Box } from "@mui/material";
import { useState } from "react";

export default function WalletInput({
    onCommit,
    initialValue,
}: {
    onCommit: (value: any) => void;
    initialValue?: string;
}) {
    let [wallet, setWallet] = useState(initialValue || "");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginY: "15px",
            }}
        >
            {" "}
            <MaterialUIInput
                value={wallet}
                onChange={(e: any) => setWallet(e.target.value)}
                customCss={{
                    width: "100%",
                }}
                label="Enter your wallet"
            />
            <QButton
                onClick={() => onCommit(wallet)}
                customCss={{
                    paddingTop: "14.5px",
                    paddingBottom: "14.5px",
                }}
                text="Enter"
            />
        </Box>
    );
}
