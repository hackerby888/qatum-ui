import { SxProps, Theme } from "@mui/material";

export interface QSelectOptions {
    text: string;
    value: any;
    customCss?: SxProps<Theme>;
    isDefault?: boolean;
}

export interface ClusterData {
    randomUUID: string;
    ip: string;
    cpu: string;
    threads: number;
    solutionsVerified: number;
    isConnected: boolean;
    useThreads: number;
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
    // QU held by this identity. Every ant solution it publishes stakes a refundable deposit from
    // this balance, so an identity that cannot cover one publishes nothing at all.
    balance: number;
    canFundDeposit: boolean;
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

export interface EpochDbData {
    epoch: number;
    solutionValue: number;
    shareValue: number;
}

export interface Solution {
    seed: string;
    nonce: string;
    computorId: string;
    md5Hash: string;
    submittedAt: number;
}

export type SolutionPendingToProcess = Solution & {
    wallet: string;
    workerUUID: string;
};

export interface SolutionResult {
    md5Hash: string;
    resultScore: number;
}

export type SolutionNetState = Solution & {
    resultScore: number;
    isSolution: boolean;
    isWritten: boolean;
    isShare: boolean;
};

export interface SolutionsApiData {
    solutionsPendingToGetProcessQueue: SolutionPendingToProcess[];
    solutionQueue: Solution[];
    solutionVerifyingQueue: Solution[];
    solutionClusterVerifyingQueue: Solution[];
    solutionVerifiedQueue: SolutionNetState[];
    solutionsToSubmitQueue: Solution[];
}

export interface NodesApiGetData {
    nodeIps: string[];
    nodeIpsInactive: string[];
}

export interface NodesApiPostData {
    nodeIps: {
        add: string[];
        delete: string[];
    };
    nodeIpsInactive: {
        add: string[];
        delete: string[];
    };
}

export interface TotalSolutionsStats {
    totalSolutionsShare: number;
    totalSolutionsWritten: number;
    totalSolutionVerified: number;
}

// Per-epoch ant colony parameters, read from the node. They change between epochs, so nothing here
// is a constant to rely on.
export interface AntEpochContext {
    spectrumDigest: string;
    topologyHash: string;
    dataHash: string;
    threshold: number;
    freshnessWindow: number;
    solutionCount: number;
    freeAnnSlotsCount: number;
    maxChildrenPerParent: number;
    epoch: number;
}

// The tick a solution's search is bound to. Only non-empty ticks carry one.
export interface AntAnchor {
    tick: number;
    digest: string;
}

export interface AntJob {
    jobId: string;
    computorId: string;
    seed: string;
    anchorTick: number;
    anchorDigest: string;
    threshold: number;
    parentTick: number;
    parentSolutionIndexInTick: number;
    parentScore: number;
    createdAt: number;
}

export interface SystemStatusApi {
    lastSuccessSyncSeed: number;
    lastFetchScoreTime: number;
    lastHighestTickFromCurrentNodes: number;
    lastHighestTickFromExplorer: number;
    // Null until the pool has read the epoch context from a node; no work is handed out before then.
    antContext: AntEpochContext | null;
    // The node scores against a different bpp9000 task than the one we hold. Hard stop: our scores
    // could never match, and each submission would cost a computor its deposit.
    antTaskMismatch: boolean;
    currentAnchor: AntAnchor | null;
    canMineAnt: boolean;
    // Tree-walking state. `enabled` false means no operator key configured, so the pool mines
    // depth-1 children from the root only - a working mode, not a fault.
    antTree: {
        enabled: boolean;
        pending: number;
        computors: Record<
            string,
            {
                nodes: number;
                bestScore: number | null;
                maxDepth: number;
                mismatched: number;
                unverified: number;
            }
        >;
    };
}

export type PaymentDbState = "all" | "unpaid" | "paid";
