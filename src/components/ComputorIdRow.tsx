import { Box } from "@mui/material";
import QButton from "./QButton";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { ComputorId, ComputorIdKeys } from "../types";
import { memo, useEffect, useState } from "react";
import QSelect from "./QSelect";
import Dialog from "@mui/material/Dialog";
const trueFalseMap: {
    [key: string]: {
        text: string;
        color: string;
        value: boolean;
    };
} = {
    true: {
        text: "True",
        color: "var(--q-main-color)",
        value: true,
    },
    false: {
        text: "False",
        color: "red",
        value: false,
    },
};

const trueFalseOptions: {
    text: string;
    color: string;
    value: boolean;
}[] = Object.keys(trueFalseMap).map((key) => trueFalseMap[key]);

export default memo(function ComputorIdRow({
    data,
    index,
    isEditing,
    isLastRow,
    setIds,
    setEditingIdIndex,
    // force react rerender when these props change
    active,
    followAvg,
}: {
    index: number;
    data: ComputorId;
    isEditing: boolean;
    isLastRow: boolean;
    setIds: any;
    setEditingIdIndex: any;
    active: boolean;
    followAvg: boolean;
}) {
    let globalIndex = index;
    let [idText, setIdText] = useState(data.id);
    let [isOpenningDialog, setIsOpenningDialog] = useState(false);

    const handleOnTrueFalseSelect = (
        index: number,
        field: "active" | "followAvg"
    ) => {
        setIds((prev: ComputorId[]) => {
            let newArr = [...prev];
            newArr[globalIndex][field] = trueFalseOptions[index].value;
            return newArr;
        });
    };

    const handleOnDelete = () => {
        setIds((prev: ComputorId[]) => {
            let newArr = [...prev];
            newArr.splice(globalIndex, 1);
            return newArr;
        });
    };

    const handleIdChange = (e: any) => {
        setIdText(e.target.value);
    };

    const handleConfirm = () => {
        setEditingIdIndex(null);
        setIds((prev: ComputorId[]) => {
            let newArr = [...prev];
            newArr[globalIndex].id = idText;
            return newArr;
        });
    };

    return (
        <>
            <Dialog
                maxWidth="lg"
                onClose={() => setIsOpenningDialog(false)}
                open={isOpenningDialog}
            >
                <Box
                    className="jura-font"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px",
                    }}
                >
                    {" "}
                    <Box
                        className="jura-font"
                        sx={{
                            fontWeight: "bold",
                            paddingBottom: "5px",
                        }}
                    >
                        {idText}
                    </Box>
                    <Box className="jura-font">
                        Solutions Sent From Pool : 12
                    </Box>
                    <Box className="jura-font">
                        Solutions Accepted On Node: 12312
                    </Box>
                    <Box className="jura-font">
                        Solutions Written On BlockChain: 12312
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                paddingY: "5px",
                            }}
                        >
                            Wallet Stats
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                className="jura-font"
                                sx={{
                                    paddingY: "5px",
                                    opacity: 0.5,
                                    fontSize: ".8rem",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                ID Workers/Peformance Its
                            </Box>
                            {new Array(100).fill(0).map((_, index) => (
                                <Box className="jura-font">
                                    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                                    <span
                                        className="jura-font"
                                        style={{
                                            marginLeft: "5px",
                                            color: "var(--q-main-color)",
                                        }}
                                    >
                                        121
                                    </span>
                                    /
                                    <span
                                        className="jura-font"
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        12321 Its
                                    </span>{" "}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Dialog>{" "}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    paddingY: "10px",
                    borderTop: "1px solid black",
                }}
            >
                {" "}
                {isEditing ? (
                    <input
                        className="jura-font"
                        value={idText}
                        onChange={handleIdChange}
                        placeholder="Enter your id"
                        style={{
                            marginLeft: "5px",
                            width: "33%",
                        }}
                    />
                ) : (
                    <Box
                        className="jura-font"
                        sx={{
                            width: "33%",
                            overflowX: "scroll",
                            marginLeft: "5px",
                        }}
                    >
                        {data.id}
                    </Box>
                )}
                <QSelect
                    onSelected={(index) =>
                        handleOnTrueFalseSelect(index, "active")
                    }
                    text={trueFalseMap[String(data.active)].text}
                    isPlaceBottom={!isLastRow}
                    options={trueFalseOptions}
                    customCss={{
                        width: "7%",
                        color: trueFalseMap[String(data.active)].color,
                    }}
                />
                <QSelect
                    onSelected={(index) =>
                        handleOnTrueFalseSelect(index, "followAvg")
                    }
                    text={trueFalseMap[String(data.followAvg)].text}
                    isPlaceBottom={!isLastRow}
                    options={trueFalseOptions}
                    customCss={{
                        width: "12%",
                        color: trueFalseMap[String(data.followAvg)].color,
                    }}
                />
                <Box
                    className="jura-font"
                    sx={{
                        width: "15%",
                    }}
                >
                    {data.workers}
                </Box>
                <Box
                    className="jura-font"
                    sx={{
                        width: "20%",
                    }}
                >
                    {data.totalPerformance || 0} It/s
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                    }}
                >
                    {isEditing ? (
                        <QButton
                            isDisabled={idText.length !== 60}
                            onClick={handleConfirm}
                            customCss={{
                                width: "fit-content",
                            }}
                            text="Confirm"
                        />
                    ) : (
                        <>
                            <QButton
                                onClick={() => setIsOpenningDialog(true)}
                                customCss={{
                                    width: "fit-content",
                                }}
                                text="Detail"
                            />
                            <QButton
                                onClick={() => handleOnDelete()}
                                // effect3d={false}
                                // effect2dHoverColor="red"
                                customCss={{
                                    width: "fit-content",
                                    paddingX: "3px",
                                    marginLeft: "5px",
                                }}
                                text=""
                            >
                                <DeleteOutlineRoundedIcon />
                            </QButton>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
});
