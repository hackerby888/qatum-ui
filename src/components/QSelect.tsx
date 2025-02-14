import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";
import { QSelectOptions } from "../types";
import React, { useEffect, useState } from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

export default function QSelect({
    options,
    isPlaceBottom,
    customCss,
    listWrapperCustomCss,
    onSelected,
    value,
}: {
    value?: any | null;
    isPlaceBottom: boolean;
    options: QSelectOptions[];
    customCss?: SxProps<Theme>;
    listWrapperCustomCss?: SxProps<Theme>;
    onSelected?: (options: QSelectOptions) => void;
}) {
    let [isShowingList, setIsShowingList] = useState(false);
    let [selected, setSelected] = useState<QSelectOptions | null>(
        options.find((option) => option.value === value) ||
            options.find((option) => option.isDefault) ||
            options[0]
    );

    useEffect(() => {
        if (selected !== value) {
            setSelected(
                options.find((option) => option.value === value) || selected
            );
        }
    });

    return (
        //@ts-ignore
        <Box
            onClick={() => {
                setIsShowingList(!isShowingList);
            }}
            sx={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                ...selected?.customCss,
                ...customCss,
            }}
        >
            {value?.text || selected?.text}
            <ArrowDropDownRoundedIcon fontSize="small" />
            <Box
                sx={{
                    position: "absolute",
                    top: isPlaceBottom ? "100%" : "-100%",
                    zIndex: 2,
                    left: "0",
                    right: "0",
                    display: isShowingList ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        border: "1px solid #ccc",
                        background: "white",
                        borderRadius: "5px",
                        boxShadow: "0 0 5px 0 #ccc",
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "40vh",
                        overflowY: "auto",
                        width: "fit-content",
                        ...listWrapperCustomCss,
                    }}
                >
                    {options.map((option, index) => (
                        <React.Fragment key={index}>
                            <Box
                                onClick={() => {
                                    setIsShowingList(false);
                                    setSelected(option);
                                    onSelected && onSelected(option);
                                }}
                                sx={{
                                    userSelect: "none",
                                    height: "fit-content",
                                    "&:hover": {
                                        fontWeight: "bold",
                                    },
                                    width: "100%",
                                    paddingY: "1px",
                                    paddingX: "15px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    ...option.customCss,
                                }}
                            >
                                {option.text}
                            </Box>
                            {index !== options.length - 1 ? (
                                <Box
                                    sx={{
                                        width: "100%",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    {" "}
                                </Box>
                            ) : (
                                <> </>
                            )}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
