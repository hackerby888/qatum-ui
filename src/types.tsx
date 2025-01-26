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

export interface GlobalStats {
    epoch: number;
    isShareModeEpoch: boolean;
    estimatedIts: number;
    solutionsPerHour: number;
    solutionsPerHourEpoch: number;
    wallets: number;
    workers: number;
    hashrate: number;
    hashrateList: number[];
    solutionsShare: number;
    solutionsVerified: number;
    solutionsWritten: number;
}

export interface QWorkerApi {
    name: string;
    isActive: boolean;
    hashrate: number;
    solutions: number;
    solutionsVerified: number;
    solutionsWritten: number;
    solutionsShare: number;
    lastActive: number;
    startTimestamp: number;
}

export type ComputorIdKeys = keyof ComputorId;
