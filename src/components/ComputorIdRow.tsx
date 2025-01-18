import { Box } from "@mui/material";
import QButton from "./QButton";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { ComputorId } from "../types";
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
    renderIndex,
}: {
    index: number;
    data: ComputorId;
    isEditing: boolean;
    isLastRow: boolean;
    setIds: any;
    setEditingIdIndex: any;
    renderIndex: number;
}) {
    let globalIndex = index;
    let [idText, setIdText] = useState(data.id);
    let [isOpenningDialog, setIsOpenningDialog] = useState(false);

    const handleOnTrueFalseSelectFollowAvg = (index: number) => {
        setIds((prev: ComputorId[]) => {
            let newArr = [...prev];
            newArr[globalIndex].followAvg = trueFalseOptions[index].value;
            return newArr;
        });
    };

    const handleOnTrueFalseSelectActive = (index: number) => {
        setIds((prev: ComputorId[]) => {
            let newArr = [...prev];
            newArr[globalIndex].active = trueFalseOptions[index].value;
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
                onClose={() => setIsOpenningDialog(false)}
                open={isOpenningDialog}
            >
                {idText}
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
                    onSelected={handleOnTrueFalseSelectActive}
                    text={trueFalseMap[String(data.active)].text}
                    isPlaceBottom={!isLastRow}
                    options={trueFalseOptions}
                    customCss={{
                        width: "7%",
                        color: trueFalseMap[String(data.active)].color,
                    }}
                />
                <QSelect
                    state={data.followAvg}
                    onSelected={handleOnTrueFalseSelectFollowAvg}
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
