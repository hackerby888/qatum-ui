import { styled, SxProps, TextField, Theme } from "@mui/material";

const CssTextField = styled(TextField)({
    "& label": {
        fontSize: ".8rem !important",
        fontFamily: "Pixelify Sans",
    },
    "& label.Mui-focused": {
        color: "black",
        borderRadius: "none",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "black",
        borderRadius: "none",
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: "none",
        "& input": {
            paddingTop: "12px !important",
            paddingBottom: "12px !important",
            //  fontSize: ".9rem",
            fontFamily: "Jura",
        },
        "& fieldset": {
            borderColor: "var(--q-border-color)",
            borderRadius: "0px",
        },
        "&:hover fieldset": {
            borderColor: "var(--q-border-color)",
            borderRadius: "none",
        },
        "&.Mui-focused fieldset": {
            borderColor: "var(--q-border-color)",
            borderRadius: "none",
        },
    },
});

export default function MaterialUIInput({
    customCss,
    value,
    onChange,
    label,
    onKeydown,
    type = "text",
}: {
    value: any;
    onChange?: any;
    customCss?: SxProps<Theme>;
    label?: string;
    onKeydown?: any;
    type?: string;
}) {
    return (
        <CssTextField
            type={type}
            onKeyDown={onKeydown}
            onChange={onChange}
            value={value || ""}
            sx={{
                ...customCss,
            }}
            id="outlined-basic"
            label={label}
            variant="outlined"
        />
    );
}
