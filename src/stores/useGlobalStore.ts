import { create } from "zustand";

export interface GlobalStore {
    handleOnpenAndSetSnackbar: (message: string) => void;
    setHandleOnpenAndSetSnackbar: (newFn: any) => void;
}

const useGlobalStore = create((set) => ({
    handleOnpenAndSetSnackbar: null,
    setHandleOnpenAndSetSnackbar: (newFn: any) =>
        set(() => ({ handleOnpenAndSetSnackbar: newFn })),
})) as any;

export default useGlobalStore;
