import { Box } from "@mui/material";
import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import { ClusterData } from "@/types";
import { useEffect } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useQueryClient } from "@tanstack/react-query";
import QButtonSimple from "@/components/QButtonSimple";
import useGeneralPost from "@/apis/useGeneralPost";

const sortMap = {
    ip: "asc",
    cpu: "asc",
    threads: "asc",
    solutionsVerified: "asc",
    isConnected: "asc",
};

export default function ClusterManager() {
    let { data, isFetching, refetch } = useGeneralGet<ClusterData[]>({
        queryKey: queryKeys["cluster"](),
        path: "cluster",
    });

    let {
        mutate: learInactiveNodes,
        isPending: isClearingPending,
        isSuccess: isClearingSuccess,
        reset: resetClearInactive,
    } = useGeneralPost({
        queryKey: queryKeys["cluster"](),
        path: "cluster/clear-inactive",
    });

    let queryClient = useQueryClient();

    const handleClearInactive = () => {
        learInactiveNodes();
    };

    const handleSort = (key: keyof ClusterData) => {
        let sortedData = structuredClone(data || []).sort((a, b) => {
            // @ts-ignore
            if (sortMap[key] === "asc") {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });

        //@ts-ignore
        sortMap[key] = sortMap[key] === "asc" ? "desc" : "asc";

        queryClient.setQueryData(queryKeys["cluster"](), sortedData);
    };

    useEffect(() => {
        if (isClearingSuccess) {
            refetch();
            resetClearInactive();
        }
    }, [isClearingSuccess]);
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
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                {" "}
                <Box
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        paddingY: "10px",
                    }}
                >
                    Nodes
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        position: "relative",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {" "}
                        {/* <QButton
                        customCss={{
                            paddingX: "20px",
                            paddingY: "5px",
                        }}
                        text="Save"
                    /> */}
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <QButtonSimple
                            onClick={handleClearInactive}
                            isDisabled={isClearingPending}
                            customCss={{
                                width: "fit-content",
                            }}
                            text={
                                !isClearingPending
                                    ? "Clear Disconnected"
                                    : "Clearing..."
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            paddingY: "10px",
                            borderBottom: "1px solid var(--q-border-color)",
                        }}
                    >
                        <Box
                            sx={{
                                width: "3%",
                            }}
                        >
                            #
                        </Box>
                        <Box
                            onClick={() => handleSort("ip")}
                            sx={{
                                width: "20%",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                            }}
                        >
                            IP{" "}
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => handleSort("cpu")}
                            sx={{
                                width: "25%",
                                paddingLeft: "5px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                            }}
                        >
                            CPU{" "}
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => handleSort("threads")}
                            sx={{
                                width: "20%",
                                paddingLeft: "5px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                            }}
                        >
                            Threads (Total/Used)
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => handleSort("solutionsVerified")}
                            sx={{
                                width: "15%",
                                paddingLeft: "5px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                            }}
                        >
                            Solutions Verified{" "}
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => handleSort("isConnected")}
                            sx={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                                alignItems: "center",
                            }}
                        >
                            Status
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                    </Box>
                    {!isFetching ? (
                        data?.map((node, index) => (
                            <Box
                                key={node.randomUUID}
                                sx={{
                                    display: "flex",
                                    paddingY: "10px",
                                    borderBottom:
                                        "1px solid var(--q-border-color)",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "3%",
                                    }}
                                >
                                    {index + 1}
                                </Box>
                                <Box
                                    className="jura-font"
                                    sx={{
                                        width: "20%",
                                        overflowX: "auto",
                                    }}
                                >
                                    {node.ip.replace("::ffff:", "")}
                                </Box>
                                <Box
                                    className="jura-font"
                                    sx={{
                                        width: "25%",
                                        paddingLeft: "5px",
                                    }}
                                >
                                    {node.cpu}
                                </Box>
                                <Box
                                    className="jura-font"
                                    sx={{
                                        width: "20%",
                                        paddingLeft: "5px",
                                    }}
                                >
                                    {node.threads}
                                    <span
                                        className="jura-font"
                                        style={{
                                            color: "var(--q-main-color)",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        /{node.useThreads}
                                    </span>
                                </Box>
                                <Box
                                    className="jura-font"
                                    sx={{
                                        width: "15%",
                                        paddingLeft: "5px",
                                    }}
                                >
                                    {node.solutionsVerified}
                                </Box>
                                <Box
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: node.isConnected
                                                ? "green"
                                                : "red",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {node.isConnected
                                            ? "Connected"
                                            : "Disconnected"}
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingY: "10px",
                            }}
                        >
                            Loading...
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
