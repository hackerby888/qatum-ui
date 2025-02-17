import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import QDivider from "@/components/QDivider";
import { SystemStatusApi } from "@/types";
import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { useEffect } from "react";

export default function Status() {
    let { data, refetch } = useGeneralGet<SystemStatusApi>({
        queryKey: queryKeys["status"](),
        path: "status",
    });

    let queryClient = useQueryClient();

    return (
        <Box
            sx={{
                paddingTop: "30px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                Status
            </Box>
            <Box
                sx={{
                    width: "50%",
                    border: "1px solid var(--q-border-color)",
                    borderRadius: "5px",
                    padding: "10px",
                    marginTop: "10px",
                }}
            >
                {data &&
                    [
                        {
                            text: "Last Success Sync Seed",
                            value: ms(Date.now() - data.lastSuccessSyncSeed),
                        },
                        {
                            text: "Last Fetch Score Time",
                            value: ms(Date.now() - data.lastFetchScoreTime),
                        },
                    ].map((item) => (
                        <Box
                            key={item.text}
                            className="jura-font"
                            sx={{
                                paddingY: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {item.text}
                            <QDivider />
                            {item.value}
                        </Box>
                    ))}
            </Box>
        </Box>
    );
}
