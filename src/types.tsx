import { SxProps, Theme } from "@mui/material";

export interface ComputorId {
    id: string;
    active: boolean;
    followAvg: boolean;
    workers: number;
    totalPerformance: number;
}

export interface QSelectOptions {
    text: string;
    value: any;
    customCss?: SxProps<Theme>;
    isDefault?: boolean;
}

export type ComputorIdKeys = keyof ComputorId;
