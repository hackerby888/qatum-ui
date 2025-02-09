import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import useGeneralPost from "@/apis/useGeneralPost";
import MaterialUIInput from "@/components/MaterialUIInput";
import QButtonSimple from "@/components/QButtonSimple";
import { NodesApiGetData, NodesApiPostData } from "@/types";
import { Box, Chip, styled } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

let lastData: NodesApiGetData = {
    nodeIps: [],
    nodeIpsInactive: [],
};

export default function NodeManager() {
    let [activeIpText, setActiveIpText] = useState<string>("");
    let [inactiveIpText, setInactiveIpText] = useState<string>("");
    let queryClient = useQueryClient();
    let { data, isFetching } = useGeneralGet<NodesApiGetData>({
        queryKey: queryKeys["nodes"](),
        path: "nodes",
    });

    let { mutate: updateNodesData, isPending: isUpdatingNodesData } =
        useGeneralPost({
            queryKey: queryKeys["nodes"](),
            path: "nodes",
        });

    const handleAddIp = (ip: string, to: "active" | "inactive" = "active") => {
        if (!ip) return;
        let nodeIps = [...(data?.nodeIps || [])];
        let nodeIpsInactive = [...(data?.nodeIpsInactive || [])];
        if (to === "active") {
            nodeIps.push(ip);
        } else {
            nodeIpsInactive.push(ip);
        }
        queryClient.setQueryData(queryKeys["nodes"](), {
            nodeIps,
            nodeIpsInactive,
        });
    };

    const handleRemoveIp = (
        ip: string,
        from: "active" | "inactive" = "active"
    ) => {
        let nodeIps = [...(data?.nodeIps || [])];
        let nodeIpsInactive = [...(data?.nodeIpsInactive || [])];
        if (from === "active") {
            nodeIps = nodeIps.filter((x) => x !== ip);
        } else {
            nodeIpsInactive = nodeIpsInactive.filter((x) => x !== ip);
        }
        queryClient.setQueryData(queryKeys["nodes"](), {
            nodeIps,
            nodeIpsInactive,
        });
    };

    const handleUpdateNodes = () => {
        let addedActviveNodes = data?.nodeIps.filter(
            (x) => !lastData.nodeIps.includes(x)
        );

        let removedActiveNodes = lastData.nodeIps.filter(
            (x) => !data?.nodeIps.includes(x)
        );

        let addedInactiveNodes = data?.nodeIpsInactive.filter(
            (x) => !lastData.nodeIpsInactive.includes(x)
        );

        let removedInactiveNodes = lastData.nodeIpsInactive.filter(
            (x) => !data?.nodeIpsInactive.includes(x)
        );

        let postData: NodesApiPostData = {
            nodeIps: {
                add: addedActviveNodes || [],
                delete: removedActiveNodes,
            },
            nodeIpsInactive: {
                add: addedInactiveNodes || [],
                delete: removedInactiveNodes,
            },
        };

        updateNodesData(postData as any);

        lastData = structuredClone(data) as NodesApiGetData;
    };

    useEffect(() => {
        if (data && !isFetching) {
            lastData = structuredClone(data);
        }
    }, [isFetching]);

    return (
        <Box
            sx={{
                paddingTop: "30px",
            }}
        >
            <Box>
                <Box
                    sx={{
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    Active Nodes
                </Box>
                {!isFetching ? (
                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                width: "fit-content",
                            }}
                        >
                            {" "}
                            <MaterialUIInput
                                onKeydown={(e: any) => {
                                    if (e.key === "Enter") {
                                        handleAddIp(activeIpText, "active");
                                        setActiveIpText("");
                                    }
                                }}
                                label="Add New Node Ip"
                                value={activeIpText}
                                onChange={(e: any) => {
                                    setActiveIpText(e.target.value);
                                }}
                            />{" "}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                {" "}
                                <QButtonSimple
                                    onClick={() => {
                                        handleAddIp(activeIpText, "active");
                                        setActiveIpText("");
                                    }}
                                    effect3d={false}
                                    customCss={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "50%",
                                        borderTop: "none",
                                        borderRight: "none",
                                    }}
                                    text="Add"
                                />
                                {!isUpdatingNodesData ? (
                                    <QButtonSimple
                                        onClick={handleUpdateNodes}
                                        effect3d={false}
                                        customCss={{
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "50%",
                                            borderTop: "none",
                                        }}
                                        text="Save"
                                    />
                                ) : (
                                    <QButtonSimple
                                        effect3d={false}
                                        customCss={{
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "50%",
                                            borderTop: "none",
                                        }}
                                        text="..."
                                        isDisabled={true}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Box
                            component={"ul"}
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                                paddingTop: "10px",
                            }}
                        >
                            {" "}
                            {data?.nodeIps.map((data) => {
                                return (
                                    <ListItem sx={{}} key={data}>
                                        <Chip
                                            label={data}
                                            onDelete={() => {
                                                handleRemoveIp(data, "active");
                                            }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ textAlign: "center" }}>Loading...</Box>
                )}
            </Box>
            <Box>
                <Box
                    sx={{
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    Inactive Nodes
                </Box>
                {!isFetching ? (
                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                width: "fit-content",
                            }}
                        >
                            {" "}
                            <MaterialUIInput
                                onKeydown={(e: any) => {
                                    if (e.key === "Enter") {
                                        handleAddIp(inactiveIpText, "inactive");
                                        setInactiveIpText("");
                                    }
                                }}
                                label="Add New Node Ip"
                                value={inactiveIpText}
                                onChange={(e: any) => {
                                    setInactiveIpText(e.target.value);
                                }}
                            />{" "}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                {" "}
                                <QButtonSimple
                                    onClick={() => {
                                        handleAddIp(inactiveIpText, "inactive");
                                        setInactiveIpText("");
                                    }}
                                    effect3d={false}
                                    customCss={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "50%",
                                        borderTop: "none",
                                        borderRight: "none",
                                    }}
                                    text="Add"
                                />
                                {!isUpdatingNodesData ? (
                                    <QButtonSimple
                                        onClick={handleUpdateNodes}
                                        effect3d={false}
                                        customCss={{
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "50%",
                                            borderTop: "none",
                                        }}
                                        text="Save"
                                    />
                                ) : (
                                    <QButtonSimple
                                        effect3d={false}
                                        customCss={{
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "50%",
                                            borderTop: "none",
                                        }}
                                        text="..."
                                        isDisabled={true}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Box
                            component={"ul"}
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                                paddingTop: "10px",
                            }}
                        >
                            {" "}
                            {data?.nodeIpsInactive.map((data) => {
                                return (
                                    <ListItem sx={{}} key={data}>
                                        <Chip
                                            label={data}
                                            onDelete={() => {
                                                handleRemoveIp(
                                                    data,
                                                    "inactive"
                                                );
                                            }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ textAlign: "center" }}>Loading...</Box>
                )}
            </Box>
        </Box>
    );
}
