import MaterialUIInput from "@/components/MaterialUIInput";
import QButton from "@/components/QButton";
import QButtonSimple from "@/components/QButtonSimple";
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
            <QButtonSimple
                onClick={() => onCommit(wallet)}
                customCss={{
                    height: "47px",
                }}
                text="Enter"
            />
        </Box>
    );
}
