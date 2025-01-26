import { Box, Divider } from "@mui/material";
import React from "react";

export default function QDivider({ py }: { py: string }) {
    return (
        <React.Fragment>
            {" "}
            <Box
                sx={{
                    width: "100%",
                    fontSize: ".5rem",
                    userSelect: "none",
                    display: "flex",
                    marginTop: "20px",
                }}
            >
                {new Array(100).fill(0).map((_, i) => {
                    let randomOpacity = Math.random();
                    //random from .6 to 1

                    return (
                        <Box
                            key={i}
                            sx={{
                                height: "8px",
                                width: "1%",
                                background: "black",
                                opacity: Math.round(randomOpacity),
                            }}
                        ></Box>
                    );
                })}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    fontSize: ".5rem",
                    userSelect: "none",
                    display: "flex",
                }}
            >
                {new Array(100).fill(0).map((_, i) => {
                    let randomOpacity = Math.random();
                    //random from .6 to 1

                    return (
                        <Box
                            key={i}
                            sx={{
                                height: "8px",
                                width: "1%",
                                background: "black",
                                opacity: Math.round(randomOpacity),
                            }}
                        ></Box>
                    );
                })}
            </Box>
        </React.Fragment>
    );
}
