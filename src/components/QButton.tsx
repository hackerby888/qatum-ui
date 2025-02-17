import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";

export default function QButton({
    text,
    customCss,
    effect3d = true,
    onClick,
    children,
    effect2dHoverColor,
    isDisabled,
}: {
    text: string;
    customCss?: SxProps<Theme>;
    effect3d?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    effect2dHoverColor?: string;
    isDisabled?: boolean;
}) {
    return (
        <Box
            onClick={isDisabled ? () => {} : onClick}
            sx={{
                opacity: isDisabled ? 0.5 : 1,
                userSelect: "none",
                position: "relative",
                cursor: isDisabled ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                background: "black",
                color: "white",
                paddingRight: "30px",
                paddingLeft: "30px",
                "&:after": effect3d
                    ? {
                          content: "''",
                          zIndex: -1,
                          display: "block",
                          width: "100%",
                          height: "100%",
                          background: "black",
                          opacity: 0.2,
                          position: "absolute",
                          bottom: "-2px",
                          right: "-2px",
                      }
                    : {},
                "&:hover": isDisabled
                    ? {}
                    : effect3d
                    ? {
                          transform: "translateY(2px) translateX(2px)",
                          "&:after": {
                              display: "none",
                          },
                      }
                    : {
                          background:
                              effect2dHoverColor || "var(--q-main-color)",
                      },
                ...customCss,
            }}
        >
            {text} {children}
        </Box>
    );
}
