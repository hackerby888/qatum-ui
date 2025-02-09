import { Box, Skeleton, SxProps, Theme } from "@mui/material";

export default function Skeletons({
    row = 1,
    customCss,
}: {
    row?: number;
    customCss?: SxProps<Theme>;
}) {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                ...customCss,
            }}
        >
            {new Array(row).fill(0).map((_, index) => (
                <Skeleton
                    sx={{
                        marginBottom: "5px",
                    }}
                    key={index}
                    variant="rounded"
                    height={30}
                />
            ))}
        </Box>
    );
}
