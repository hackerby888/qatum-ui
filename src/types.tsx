export interface ComputorId {
    id: string;
    active: boolean;
    followAvg: boolean;
    workers: number;
    totalPerformance: number;
}

export type ComputorIdKeys = keyof ComputorId;
