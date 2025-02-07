import { create } from "zustand";

export interface GraphHeightStore {
    graphHeight: number;
    setGraphHeight: (newHeight: number) => void;
}

const useGraphHighStore = create((set) => ({
    graphHeight: 0,
    setGraphHeight: (newHeight: number) =>
        set(() => ({ graphHeight: newHeight })),
})) as any;

export default useGraphHighStore;
