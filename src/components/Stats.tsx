import { Box } from "@mui/material";
import QInput from "./QInput";
import QLoading from "./QLoading";
import QMinerRow from "./QMinerRow";
import QMinerTable from "./QMinerTable";

export default function Stats() {
    return (
        <Box
            sx={{
                width: "100%",
                paddingTop: "20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        border: "1px solid black",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        width: "fit-content",
                    }}
                >
                    <Box className="jura-font">Epoch: 135</Box>
                    <Box className="jura-font">Users: 12</Box>
                    <Box className="jura-font">Miners: 24</Box>
                </Box>
                <Box
                    sx={{
                        border: "1px solid black",
                        borderLeft: "none",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        width: "fit-content",
                    }}
                >
                    <Box className="jura-font">Pool It/s: 135,1323</Box>
                    <Box className="jura-font">Pool Solutions: 12</Box>
                    <Box className="jura-font">Pool Shares: 24</Box>
                </Box>
            </Box>
            <QInput
                customCss={{
                    marginTop: "10px",
                }}
            />
            <QLoading />
            <QMinerTable />
        </Box>
    );
}
