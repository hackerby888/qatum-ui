import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";

export default function QButtonSimple({
    text,
    customCss,
    onClick,
    children,
    isDisabled,
    onDoubleClick,
}: {
    text: string;
    customCss?: SxProps<Theme>;
    effect3d?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    effect2dHoverColor?: string;
    isDisabled?: boolean;
    onDoubleClick?: () => void;
}) {
    return (
        <Box
            onClick={isDisabled ? () => {} : onClick}
            onDoubleClick={isDisabled ? () => {} : onDoubleClick}
            sx={{
                opacity: isDisabled ? 0.5 : 1,
                userSelect: "none",
                position: "relative",
                cursor: isDisabled ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                background: "#f6f8fa",
                color: "#25292e",
                paddingRight: "30px",
                paddingLeft: "30px",
                border: "1px solid var(--q-border-color)",
                "&:hover": !isDisabled
                    ? {
                          background: "#eff2f5",
                      }
                    : {},
                ...customCss,
            }}
        >
            {text} {children}
        </Box>
    );
}
