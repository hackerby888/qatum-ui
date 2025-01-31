import { Box } from "@mui/material";
import QMinerTable from "./MinerTable";
import FinalStats from "./FinalStats";
import CentralStats from "./CentralStats";
import GraphStats from "./GraphStats";
import Payments from "./Payments";
import { memo, useState } from "react";
import WalletInput from "./WalletInput";

export default memo(function Stats() {
    let [wallet, setWallet] = useState(localStorage.getItem("wallet") || "");

    const handleOnSaveWallet = (wallet: string) => {
        localStorage.setItem("wallet", wallet);
        setWallet(wallet);
    };

    return (
        <Box
            sx={{
                width: "100%",
                paddingTop: "20px",
            }}
        >
            {/* <QLoading /> */}
            <WalletInput initialValue={wallet} onCommit={handleOnSaveWallet} />
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
});
