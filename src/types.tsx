import { SxProps, Theme } from "@mui/material";

export interface QSelectOptions {
    text: string;
    value: any;
    customCss?: SxProps<Theme>;
    isDefault?: boolean;
}

export interface GlobalStats {
    avgScore: number;
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

export interface Payment {
    wallet: string;
    amount: number;
    timestamp: number;
}

export interface PaymentDbData {
    solutionsShare: number;
    solutionsVerified: number;
    solutionsWritten: number;
    epoch: number;
    insertedAt: number;
    wallet: string;
    isPaid: boolean;
    txId: string | null;
}

export interface ComputorIdDataApi {
    id: string;
    workers: number;
    totalHashrate: number;
    score: number;
    bcscore: number;
    mining: boolean;
    followingAvgScore: boolean;
    targetScore: number | undefined;
    ip: string;
    lastUpdateScoreTime: number;
    // we use map for faster access
    submittedSolutions: {
        isWrittenToBC: number;
        total: number;
    };
    solutionsFetched: number;
}

export interface ComputorEditableFields {
    mining?: boolean;
    followingAvgScore?: boolean;
    ip?: string;
}

export type PaymentDbDataWithReward = PaymentDbData & {
    reward: number;
};

export interface MiningConfig {
    diffHashRateToBalance: number; // hashrate difference between highest - lowest to balance
    diffSolutionToBalance: number; // solution difference between highest - lowest to balance
    avgOverRate: number; // when our ids below avg score, we should mine to target score = avgScore * avgOverRate
}
