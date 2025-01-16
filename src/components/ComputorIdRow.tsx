import { Box } from "@mui/material";
import QButton from "./QButton";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { ComputorId } from "../types";
import { memo, useState } from "react";
import QSelect from "./QSelect";

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
}: {
    index: number;
    data: ComputorId;
    isEditing: boolean;
    isLastRow: boolean;
    setIds: any;
    setEditingIdIndex: any;
}) {
    let [idText, setIdText] = useState(data.id);
    let [followAvg, setFollowAvg] = useState(data.followAvg);
    let [isActived, setIsActived] = useState(data.active);

    const handleOnTrueFalseSelectFollowAvg = (index: number) => {
        let value = trueFalseOptions[index].value;
        setFollowAvg(value);
    };

    const handleOnTrueFalseSelectActive = (index: number) => {
        let value = trueFalseOptions[index].value;
        setIsActived(value);
    };

    const handleIdChange = (e: any) => {
        setIdText(e.target.value);
    };

    const handleConfirm = () => {
        setIds((prev: ComputorId[]) => {
            let newArr = [...prev];
            newArr[index].id = idText;
            return newArr;
        });
        setEditingIdIndex(null);
    };

    return (
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
                text={trueFalseMap[String(isActived)].text}
                isPlaceBottom={!isLastRow}
                options={trueFalseOptions}
                customCss={{
                    width: "7%",
                    color: trueFalseMap[String(isActived)].color,
                }}
            />
            <QSelect
                onSelected={handleOnTrueFalseSelectFollowAvg}
                text={trueFalseMap[String(followAvg)].text}
                isPlaceBottom={!isLastRow}
                options={trueFalseOptions}
                customCss={{
                    width: "12%",
                    color: trueFalseMap[String(followAvg)].color,
                }}
            />
            {/* <Box
                sx={{
                    width: "12%",
                    color: "red",
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                {data.followAvg ? "True" : "False"}
            </Box> */}
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
                        onClick={handleConfirm}
                        customCss={{
                            width: "fit-content",
                        }}
                        text="Confirm"
                    />
                ) : (
                    <>
                        <QButton
                            customCss={{
                                width: "fit-content",
                            }}
                            text="Detail"
                        />
                        <QButton
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
    );
});
