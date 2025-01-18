import { Box } from "@mui/material";
import QButton from "./QButton";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useEffect, useState } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { ComputorId } from "../types";
import ComputorIdRow from "./ComputorIdRow";

const ID_LENGTH = 60;
const sortMap: {
    [key: string]: "asc" | "desc";
} = {
    id: "asc",
    active: "asc",
    followAvg: "asc",
    workers: "asc",
    totalPerformance: "asc",
};

export default function IdManager() {
    let [renderTrigger, setRenderTrigger] = useState(0);
    let [ids, setIds] = useState<ComputorId[]>([]);
    let [editingIdIndex, setEditingIdIndex] = useState<number | null>(null);

    const sort = (key: string) => {
        setIds((prev) => {
            console.log("sort", key, sortMap[key]);
            let newArr = [...prev];
            if (!key) return newArr;
            let lastElement = editingIdIndex ? newArr.pop() : null;
            newArr.sort((a, b) => {
                if (sortMap[key] === "asc") {
                    // @ts-ignore
                    return a[key] > b[key] ? 1 : -1;
                } else {
                    // @ts-ignore
                    return a[key] < b[key] ? 1 : -1;
                }
            });
            if (lastElement) newArr.push(lastElement);
            sortMap[key] = sortMap[key] === "asc" ? "desc" : "asc";
            return newArr;
        });
    };

    const handleCancel = () => {
        //remove editing id index
        if (editingIdIndex !== null) {
            setIds((prev) => {
                let newArr = [...prev].filter(
                    (_, index) => index !== editingIdIndex
                );
                return newArr;
            });

            setEditingIdIndex(null);
        }
    };

    useEffect(() => {
        new Array(2).fill(0).map((_, index) => {
            //random 1 to 9
            let randomLength = Math.floor(Math.random() * 109) + 1;
            setIds((prev) => [
                ...prev,
                {
                    id: `${randomLength}GGNEEZYXQYTYFNFTLQYZKNNFMSCTBRSNZJIQGCXKAVVELCXQQQRMAKDDGOA`,
                    active: Math.random() > 0.5,
                    followAvg: Math.random() > 0.5,
                    workers: Math.floor(Math.random() * 100),
                    totalPerformance: Math.floor(Math.random() * 100),
                },
            ]);
        });
    }, []);

    let isThereUncompletedId = ids.some((id) => id.id.length < ID_LENGTH);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                paddingTop: "20px",
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
                    Mining Strategy
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            padding: "12px",
                            border: "1px solid black",
                            borderRight: "none",
                        }}
                    >
                        Avg Score: 122
                    </Box>
                    <input
                        placeholder="Max It/s Difference Between Ids"
                        style={{
                            width: "33%",
                            border: "1px solid black",
                            padding: "12px",
                        }}
                    />
                    <input
                        placeholder="Max Solutions Difference Between Ids"
                        style={{
                            width: "33%",
                            border: "1px solid black",
                            borderLeft: "none",
                            padding: "12px",
                        }}
                    />
                    <QButton text="Save" />
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
                <Box
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        paddingY: "10px",
                    }}
                >
                    Computor Ids
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        border: "1px solid black",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            paddingY: "10px",
                        }}
                    >
                        {" "}
                        <Box
                            onClick={() => sort("id")}
                            sx={{
                                width: "33%",
                                overflowX: "hidden",
                                marginLeft: "5px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                        >
                            ID
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => sort("active")}
                            sx={{
                                width: "7%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                        >
                            Active
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => sort("followAvg")}
                            sx={{
                                width: "12%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                        >
                            Follow Avg
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => sort("workers")}
                            sx={{
                                width: "15%",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                        >
                            Workers
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            onClick={() => sort("totalPerformance")}
                            sx={{
                                width: "20%",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                        >
                            Total Performance
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                userSelect: "none",
                            }}
                        >
                            Action
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            maxHeight: "70vh",
                            overflowY: "scroll",
                        }}
                    >
                        {ids.map((computorIdData, renderIndex) => (
                            <ComputorIdRow
                                key={renderIndex + computorIdData.id}
                                active={computorIdData.active}
                                followAvg={computorIdData.followAvg}
                                data={computorIdData}
                                index={renderIndex}
                                isEditing={renderIndex === editingIdIndex}
                                isLastRow={renderIndex === ids.length - 1}
                                setIds={setIds}
                                setEditingIdIndex={setEditingIdIndex}
                            />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                            paddingY: "5px",
                            borderTop: "2px solid black",
                        }}
                    >
                        <QButton
                            onClick={() => {
                                setIds((prev) => [
                                    ...prev,
                                    {
                                        id: "",
                                        active: false,
                                        followAvg: false,
                                        workers: 0,
                                        totalPerformance: 0,
                                    },
                                ]);

                                setEditingIdIndex(ids.length);
                            }}
                            customCss={{
                                marginX: "5px",
                            }}
                            effect3d={false}
                            text="Add New Id"
                            isDisabled={isThereUncompletedId}
                        />
                        <QButton
                            onClick={handleCancel}
                            customCss={{
                                marginX: "5px",
                            }}
                            effect3d={false}
                            text="Cancel"
                            isDisabled={editingIdIndex === null}
                        />
                        <QButton
                            customCss={{
                                marginX: "5px",
                            }}
                            effect3d={false}
                            text="Update"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
