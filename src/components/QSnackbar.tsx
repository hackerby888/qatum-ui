import useGlobalStore, { GlobalStore } from "@/stores/useGlobalStore";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export default function QSnackbar() {
    let [showSnackbar, setShowSnackbar] = useState(false);
    let [snackbarMessage, setSnackbarMessage] = useState("");
    let globalStore: GlobalStore = useGlobalStore();

    const handleOnCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    const handleOnpenAndSetSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setShowSnackbar(true);
    };

    useEffect(() => {
        globalStore.setHandleOnpenAndSetSnackbar(handleOnpenAndSetSnackbar);
    }, []);

    return (
        <Snackbar
            open={showSnackbar}
            autoHideDuration={5000}
            onClose={handleOnCloseSnackbar}
            message={snackbarMessage}
        />
    );
}
