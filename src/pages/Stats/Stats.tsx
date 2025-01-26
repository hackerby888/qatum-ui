import { Box } from "@mui/material";
import { useState } from "react";
import QInput from "@/components/QInput";
import QMinerTable from "./MinerTable";
import FinalStats from "./FinalStats";
import CentralStats from "./CentralStats";
import GraphStats from "./GraphStats";
import Payments from "./Payments";
import { GlobalStats, QWorkerApi } from "@/types";
import useGlobalStats from "@/apis/useGlobalStats";
import useWorkersStats from "@/apis/useWorkersStats";

export default function Stats() {
    let [wallet, setWallet] = useState(localStorage.getItem("wallet") || "");
    let {
        data: workerStats,
    }: {
        data: QWorkerApi[];
    } = useWorkersStats({ wallet, needActive: true });

    let {
        data: globalStats,
    }: {
        data: GlobalStats;
    } = useGlobalStats();
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
                <CentralStats globalStats={globalStats} />
                <GraphStats globalStats={globalStats} />
            </Box>

            <QMinerTable globalStats={globalStats} workerStats={workerStats} />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    marginTop: "20px",
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                <FinalStats
                    globalStats={globalStats}
                    workerStats={workerStats}
                />
                <Payments />
            </Box>
        </Box>
    );
}
