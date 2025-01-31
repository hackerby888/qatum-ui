import { Box, Chip, styled } from "@mui/material";
import { memo, useState } from "react";
import PaymentConfigForm from "./PaymentConfigForm";
import PaymentRecords from "./PaymentRecords";
import MaterialUIInput from "@/components/MaterialUIInput";

export default memo(function PaymentManager() {
    let [selectedEpoch, setSelectedEpoch] = useState(0);

    return (
        <>
            {" "}
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    paddingTop: "20px",
                }}
            >
                <PaymentConfigForm
                    selectedEpoch={selectedEpoch}
                    setSelectedEpoch={setSelectedEpoch}
                />

                <PaymentRecords
                    selectedEpoch={selectedEpoch}
                    setSelectedEpoch={setSelectedEpoch}
                />
            </Box>
        </>
    );
});
