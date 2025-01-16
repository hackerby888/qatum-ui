import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";

export default function QSelect({
    text,
    options,
    isPlaceBottom,
    customCss,
    onSelected,
}: {
    text: string;
    isPlaceBottom: boolean;
    options: {
        text: string;
        color: string;
    }[];
    customCss?: SxProps<Theme>;
    onSelected?: (index: number) => void;
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                "&:hover div": {
                    display: "flex",
                },
                ...customCss,
            }}
        >
            {text}

            <Box
                sx={{
                    position: "absolute",
                    top: isPlaceBottom ? "100%" : "-100%",
                    zIndex: 2,
                    left: "0",
                    right: "0",
                    bottom: 0,
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "fit-content",
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
                    }}
                >
                    {" "}
                    {options.map((option, index) => (
                        <>
                            <Box
                                onClick={() => {
                                    onSelected && onSelected(index);
                                }}
                                sx={{
                                    userSelect: "none",
                                    "&:hover": {
                                        fontWeight: "bold",
                                    },
                                    color: option.color,
                                    width: "fit-content",
                                    paddingY: "1px",
                                    paddingX: "15px",
                                }}
                            >
                                {option.text}
                            </Box>
                            {index !== options.length - 1 ? (
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "1px",
                                        background: "#ccc",
                                    }}
                                ></Box>
                            ) : (
                                <> </>
                            )}
                        </>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
