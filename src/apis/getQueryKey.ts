import { PaymentDbState } from "@/types";

const queryKeys = {
    getIsPaymentEnabled: () => ["isPaymentEnabled"],
    workerStats: ({ wallet }: { wallet: string }) => ["workerStats", wallet],
    globalStats: () => ["globalStats"],
    payments: ({ wallet }: { wallet: string }) => ["payments", wallet],
    paymentsEpoch: ({
        epoch,
        type,
    }: {
        epoch: number;
        type: PaymentDbState;
    }) => ["paymentsEpoch", epoch, type],
    computorIdDetail: ({ computorId }: { computorId: string }) => [
        "computorIdDetail",
        computorId,
    ],
    computorIds: () => ["computorIds"],
    miningConfig: () => ["miningConfig"],
    epochData: ({ epoch }: { epoch: number }) => ["epochData", epoch],
    epochsPaying: () => ["epochsPaying"],
    solutions: (epoch: number) => ["solutions", epoch],
    cluster: () => ["cluster"],
    login: () => ["login"],
    nodes: () => ["nodes"],
    difficulty: () => ["difficulty"],
};

export default queryKeys;
