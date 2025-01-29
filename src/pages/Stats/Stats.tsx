import { Box } from "@mui/material";
import { useState } from "react";
import QInput from "@/components/QInput";
import QMinerTable from "./MinerTable";
import FinalStats from "./FinalStats";
import CentralStats from "./CentralStats";
import GraphStats from "./GraphStats";
import Payments from "./Payments";

export default function Stats() {
    let [wallet, setWallet] = useState(localStorage.getItem("wallet") || "");

    return (
        <Box
            sx={{
                width: "100%",
                paddingTop: "20px",
            }}
        >
            <QInput
                initialValue={wallet}
                onCommit={(value) => {
                    setWallet(value);
                    localStorage.setItem("wallet", value);
                }}
                customCss={{
                    marginTop: "10px",
                }}
            />
            {/* <QLoading /> */}
            <Box
                id="stats-main-wrapper"
                sx={{
                    width: "100%",
                    display: "flex",
                    height: "fit-content",
                    marginY: "15px",
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                {" "}
                <CentralStats />
                <GraphStats />
            </Box>

            <QMinerTable wallet={wallet} />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    marginTop: "20px",
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                <FinalStats wallet={wallet} />
                <Payments wallet={wallet} />
            </Box>
        </Box>
    );
}
