import { Box } from "@mui/material";
import QButton from "./QButton";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useEffect, useState } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { ComputorId } from "../types";
import ComputorIdRow from "./ComputorIdRow";

export default function IdManager() {
    let [ids, setIds] = useState<ComputorId[]>([]);
    let [editingIdIndex, setEditingIdIndex] = useState<number | null>(null);

    useEffect(() => {
        new Array(10).fill(0).map((_, index) => {
            setIds((prev) => [
                ...prev,
                {
                    id: "RGGNEEZYXQYTYFNFTLQYZKNNFMSCTBRSNZJIQGCXKAVVELCXQQQRMAKDDGOA",
                    active: true,
                    followAvg: false,
                    workers: 123,
                    totalPerformance: 12312,
                },
            ]);
        });
    }, []);
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
                            sx={{
                                width: "33%",
                                overflowX: "hidden",
                                marginLeft: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            ID
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "7%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            Active
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "12%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            Follow Avg
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "15%",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Workers
                            <FilterListRoundedIcon
                                sx={{ marginLeft: "3px", fontSize: "1rem" }}
                                fontSize="small"
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "20%",
                                display: "flex",
                                alignItems: "center",
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
                        {ids.map((computorIdData, index) => (
                            // <Box
                            //     sx={{
                            //         display: "flex",
                            //         width: "100%",
                            //         paddingY: "10px",
                            //         borderTop: "1px solid black",
                            //     }}
                            // >
                            //     {" "}
                            //     {editingIdIndex === index ? (
                            //         <input
                            //             placeholder="Enter your id"
                            //             style={{
                            //                 marginLeft: "5px",
                            //                 width: "33%",
                            //             }}
                            //         />
                            //     ) : (
                            //         <Box
                            //             className="jura-font"
                            //             sx={{
                            //                 width: "33%",
                            //                 overflowX: "scroll",
                            //                 marginLeft: "5px",
                            //             }}
                            //         >
                            //             {computorIdData.id}
                            //         </Box>
                            //     )}
                            //     <Box
                            //         sx={{
                            //             width: "7%",
                            //             color: "var(--q-main-color)",
                            //             display: "flex",
                            //             justifyContent: "center",
                            //             cursor: "pointer",
                            //             position: "relative",
                            //             "&:hover div": {
                            //                 display: "flex",
                            //             },
                            //         }}
                            //     >
                            //         {computorIdData.active ? "True" : "False"}

                            //         <Box
                            //             sx={{
                            //                 position: "absolute",
                            //                 top:
                            //                     index === ids.length - 1
                            //                         ? "-100%"
                            //                         : "100%",
                            //                 border: "1px solid #ccc",
                            //                 background: "white",
                            //                 borderRadius: "5px",
                            //                 boxShadow: "0 0 5px 0 #ccc",
                            //                 zIndex: 2,
                            //                 left: 0,
                            //                 right: 0,
                            //                 bottom: 0,
                            //                 display: "none",
                            //                 alignItems: "center",
                            //                 justifyContent: "center",
                            //                 height: "fit-content",
                            //                 flexDirection: "column",
                            //             }}
                            //         >
                            //             <Box
                            //                 sx={{
                            //                     userSelect: "none",
                            //                     "&:hover": {
                            //                         fontWeight: "bold",
                            //                     },
                            //                 }}
                            //             >
                            //                 True
                            //             </Box>
                            //             <Box
                            //                 sx={{
                            //                     width: "100%",
                            //                     height: "1px",
                            //                     background: "#ccc",
                            //                 }}
                            //             ></Box>
                            //             <Box
                            //                 sx={{
                            //                     userSelect: "none",
                            //                     color: "red",
                            //                     "&:hover": {
                            //                         fontWeight: "bold",
                            //                     },
                            //                 }}
                            //             >
                            //                 False
                            //             </Box>
                            //         </Box>
                            //     </Box>
                            //     <Box
                            //         sx={{
                            //             width: "12%",
                            //             color: "red",
                            //             display: "flex",
                            //             justifyContent: "center",
                            //             cursor: "pointer",
                            //         }}
                            //     >
                            //         {computorIdData.followAvg
                            //             ? "True"
                            //             : "False"}
                            //     </Box>
                            //     <Box
                            //         className="jura-font"
                            //         sx={{
                            //             width: "15%",
                            //         }}
                            //     >
                            //         {computorIdData.workers}
                            //     </Box>
                            //     <Box
                            //         className="jura-font"
                            //         sx={{
                            //             width: "20%",
                            //         }}
                            //     >
                            //         {computorIdData.totalPerformance || 0} It/s
                            //     </Box>
                            //     <Box
                            //         sx={{
                            //             flex: 1,
                            //             display: "flex",
                            //         }}
                            //     >
                            //         {editingIdIndex === index ? (
                            //             <QButton
                            //                 customCss={{
                            //                     width: "fit-content",
                            //                 }}
                            //                 text="Confirm"
                            //             />
                            //         ) : (
                            //             <>
                            //                 <QButton
                            //                     customCss={{
                            //                         width: "fit-content",
                            //                     }}
                            //                     text="Detail"
                            //                 />
                            //                 <QButton
                            //                     // effect3d={false}
                            //                     // effect2dHoverColor="red"
                            //                     customCss={{
                            //                         width: "fit-content",
                            //                         paddingX: "3px",
                            //                         marginLeft: "5px",
                            //                     }}
                            //                     text=""
                            //                 >
                            //                     <DeleteOutlineRoundedIcon />
                            //                 </QButton>
                            //             </>
                            //         )}
                            //     </Box>
                            // </Box>
                            <ComputorIdRow
                                data={computorIdData}
                                index={index}
                                isEditing={index === editingIdIndex}
                                isLastRow={index === ids.length - 1}
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
                        />
                        <QButton
                            customCss={{
                                marginX: "5px",
                                opacity: editingIdIndex === null ? 0.5 : 1,
                            }}
                            effect3d={false}
                            effect2dHoverColor={
                                editingIdIndex === null ? "black" : ""
                            }
                            text="Cancel"
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
