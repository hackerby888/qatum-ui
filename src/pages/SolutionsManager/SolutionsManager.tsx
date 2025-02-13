import QDivider from "@/components/QDivider";
import Skeletons from "@/components/Skeletons";
import { Box } from "@mui/material";
import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import QSelect from "@/components/QSelect";
import { SolutionNetState, SolutionsApiData } from "@/types";
import { useState } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useQueryClient } from "@tanstack/react-query";
import DifficultyConfig from "./DifficultyConfig";

function StatusDot({ status }: { status: boolean }) {
    return (
        <Box
            sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: status ? "var(--q-main-color)" : "#ccc",
                boxShadow: status ? "var(--q-main-color) 0px 0px 2px" : "",
            }}
        ></Box>
    );
}

const sortMap = {
    computorId: "asc",
    seed: "asc",
    nonce: "asc",
    resultScore: "asc",
    isWritten: "asc",
    submittedAt: "asc",
};

interface SortMap {
    computorId: "asc" | "desc";
    seed: "asc" | "desc";
    nonce: "asc" | "desc";
    resultScore: "asc" | "desc";
    isWritten: "asc" | "desc";
    submittedAt: "asc" | "desc";
}

export default function SolutionsManager() {
    let { data, isFetching } = useGeneralGet<SolutionsApiData>({
        queryKey: queryKeys["solutions"](),
        path: "solutions",
    });

    let [selectedSolution, setSelectedSolution] =
        useState<keyof SolutionsApiData>("solutionQueue");

    const sort = (key: keyof SortMap) => {
        if (!data) return;
        let newArr = [...data[selectedSolution]];
        if (!key || !newArr) return;

        newArr.sort((a, b) => {
            //@ts-ignore
            if (a[key] === undefined || b[key] === undefined) return 0;
            if (sortMap[key] === "asc") {
                // @ts-ignore
                return a[key] > b[key] ? 1 : -1;
            } else {
                // @ts-ignore
                return a[key] < b[key] ? 1 : -1;
            }
        });
        //@ts-ignore
        sortMap[key] = sortMap[key] === "asc" ? "desc" : "asc";
        queryClient.setQueryData(queryKeys["solutions"](), {
            ...data,
            [selectedSolution]: newArr,
        });
    };

    let numberOfIsShareSolution = data?.solutionVerifiedQueue.filter(
        (sol) => (sol as SolutionNetState).isShare
    ).length;

    let numberOfIsSolutionSolution = data?.solutionVerifiedQueue.filter(
        (sol) => (sol as SolutionNetState).isSolution
    ).length;

    let numberOfIsWrittenSolution = data?.solutionVerifiedQueue.filter(
        (sol) => (sol as SolutionNetState).isWritten
    ).length;

    let numberOfSubmittingSolution = data?.solutionsToSubmitQueue.length;

    let queryClient = useQueryClient();

    return (
        <Box
            sx={{
                paddingTop: "30px",
            }}
        >
            <DifficultyConfig />

            <Box>
                <Box
                    sx={{
                        paddingY: "10px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    General Stats
                </Box>
                <Box
                    sx={{
                        border: "1px solid var(--q-border-color)",
                        borderRadius: "5px",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                    }}
                >
                    <Box>General Stats</Box>
                    {!isFetching ? (
                        <>
                            {" "}
                            {[
                                {
                                    text: "Solutions Pending To Get In Queue",
                                    value:
                                        data?.solutionsPendingToGetProcessQueue
                                            .length || 0,
                                },
                                {
                                    text: "Solutions In Queue",
                                    value: data?.solutionQueue.length || 0,
                                },
                                {
                                    text: "Solutions Verifying",
                                    value:
                                        data?.solutionVerifyingQueue.length ||
                                        0,
                                },
                                {
                                    text: "Solutions Verifying Cluster",
                                    value:
                                        data?.solutionClusterVerifyingQueue
                                            .length || 0,
                                },
                                {
                                    text: "Solutions Verified (Total/IsShare/IsSolution/IsWritten)",
                                    value: `${
                                        data?.solutionVerifiedQueue.length || 0
                                    } / ${numberOfIsShareSolution} / ${numberOfIsSolutionSolution} / ${numberOfIsWrittenSolution}`,
                                },
                                {
                                    text: "Solution To Submit",
                                    value: numberOfSubmittingSolution || 0,
                                },
                                {
                                    text: "Total Solutions Received",
                                    value:
                                        (data?.solutionQueue.length || 0) +
                                        (data?.solutionVerifyingQueue.length ||
                                            0) +
                                        (data?.solutionClusterVerifyingQueue
                                            .length || 0) +
                                        (data?.solutionVerifiedQueue.length ||
                                            0) +
                                        (data?.solutionsPendingToGetProcessQueue
                                            .length || 0),
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
                        </>
                    ) : (
                        <Skeletons
                            customCss={{
                                marginTop: "3px",
                            }}
                            row={4}
                        />
                    )}
                </Box>
            </Box>

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
                    Solutions Records
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
                            alignItems: "center",
                        }}
                    >
                        {" "}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            Show Solutions
                        </Box>
                        <QSelect
                            value={selectedSolution}
                            onSelected={(opt) => setSelectedSolution(opt.value)}
                            options={[
                                {
                                    text: "In Queue",
                                    value: "solutionQueue",
                                    customCss: {},
                                },
                                {
                                    text: "Verifying",
                                    value: "solutionVerifyingQueue",
                                    customCss: {},
                                },
                                {
                                    text: "Verify Cluster",
                                    value: "solutionClusterVerifyingQueue",
                                    customCss: {},
                                },
                                {
                                    text: "Verified",
                                    value: "solutionVerifiedQueue",
                                    customCss: {},
                                },
                            ]}
                            customCss={{
                                padding: "3px 10px",
                                borderRadius: "5px",
                            }}
                            isPlaceBottom={true}
                        />
                    </Box>

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
                            display: "flex",
                            paddingY: "10px",
                            borderBottom: "1px solid var(--q-border-color)",
                        }}
                    >
                        <Box
                            sx={{
                                width: "3%",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            #
                        </Box>
                        <Box
                            onClick={() => sort("computorId")}
                            sx={{
                                width: "27%",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                            }}
                        >
                            Computor Id{" "}
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => sort("seed")}
                            sx={{
                                width: "15%",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                            }}
                        >
                            Seed{" "}
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => sort("nonce")}
                            sx={{
                                width: "15%",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                            }}
                        >
                            Nonce{" "}
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => sort("resultScore")}
                            sx={{
                                width: "10%",
                                paddingLeft: "5px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                            }}
                        >
                            Score{" "}
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => sort("submittedAt")}
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
                            Submitted At{" "}
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => sort("isWritten")}
                            sx={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "center",
                                cursor: "pointer",
                                "&:hover": { color: "var(--q-main-color)" },
                                userSelect: "none",
                                overflow: "auto",
                                textAlign: "center",
                                alignItems: "center",
                            }}
                        >
                            Is Share / Is Solution / Is Written{" "}
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                    </Box>
                    {!false && data ? (
                        data[selectedSolution].map((solution, index) => {
                            let isVerifiedList =
                                selectedSolution === "solutionVerifiedQueue";

                            return (
                                <Box
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
                                            width: "27%",
                                            overflowX: "auto",
                                        }}
                                    >
                                        {solution.computorId}
                                    </Box>
                                    <Box
                                        className="jura-font"
                                        sx={{
                                            width: "15%",
                                            paddingLeft: "10px",
                                        }}
                                    >
                                        <Box
                                            className="jura-font"
                                            sx={{
                                                overflowX: "auto",
                                            }}
                                        >
                                            {solution.seed}
                                        </Box>
                                    </Box>
                                    <Box
                                        className="jura-font"
                                        sx={{
                                            width: "15%",
                                            paddingLeft: "10px",
                                        }}
                                    >
                                        <Box
                                            className="jura-font"
                                            sx={{
                                                overflowX: "auto",
                                            }}
                                        >
                                            {solution.nonce}
                                        </Box>
                                    </Box>
                                    <Box
                                        className="jura-font"
                                        sx={{
                                            width: "10%",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        {isVerifiedList
                                            ? (solution as SolutionNetState)
                                                  .resultScore
                                            : "N/A"}
                                    </Box>
                                    <Box
                                        className="jura-font"
                                        sx={{
                                            width: "15%",
                                            paddingLeft: "5px",
                                            display: "flex",
                                            alignItems: "center",
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "var(--q-main-color)",
                                            },
                                            userSelect: "none",
                                        }}
                                    >
                                        {new Date(
                                            solution.submittedAt
                                        ).toLocaleString()}
                                    </Box>
                                    <Box
                                        sx={{
                                            flex: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#ccc",
                                            }}
                                        >
                                            {isVerifiedList ? (
                                                <StatusDot
                                                    status={
                                                        (
                                                            solution as SolutionNetState
                                                        ).isShare
                                                    }
                                                />
                                            ) : (
                                                "N/A"
                                            )}{" "}
                                            /{" "}
                                            {isVerifiedList ? (
                                                <StatusDot
                                                    status={
                                                        (
                                                            solution as SolutionNetState
                                                        ).isSolution
                                                    }
                                                />
                                            ) : (
                                                "N/A"
                                            )}{" "}
                                            /{" "}
                                            {isVerifiedList ? (
                                                <StatusDot
                                                    status={
                                                        (
                                                            solution as SolutionNetState
                                                        ).isWritten
                                                    }
                                                />
                                            ) : (
                                                "N/A"
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })
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
