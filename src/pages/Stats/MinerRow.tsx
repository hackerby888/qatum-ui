import { QWorkerApi } from "@/types";
import { Box } from "@mui/material";
import ms from "ms";

export default function QMinerRow({
    index,
    data,
    isShareModeEpoch,
}: {
    index: number;
    data: QWorkerApi;
    isShareModeEpoch: boolean;
}) {
    return (
        <>
            {" "}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    border: "1px solid var(--q-border-color)",
                    borderTop: "none",
                }}
            >
                <Box
                    sx={{
                        width: "5%",
                        textAlign: "center",
                        paddingY: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        justifyContent: "center",
                    }}
                >
                    {index + 1}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: "30%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                    }}
                >
                    {data.name}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: "15%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                    }}
                >
                    {isShareModeEpoch
                        ? data.solutionsShare
                        : data.solutionsWritten}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: "15%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                    }}
                >
                    {data?.hashrate}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: "25%",
                        // borderRight: "1px solid black",
                        paddingLeft: "5px",
                        paddingY: "5px",
                    }}
                >
                    {ms(Date.now() - data.startTimestamp)}
                </Box>
                <Box
                    sx={{
                        width: "10%",
                        color: data.isActive ? "var(--q-main-color)" : "red",
                        textAlign: "center",
                        paddingY: "5px",
                    }}
                >
                    {data.isActive ? "Active" : "Inactive"}
                </Box>
            </Box>
        </>
    );
}
