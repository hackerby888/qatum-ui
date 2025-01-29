import { API_SERVER } from "@/consts/apiServer";
import { useQuery } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";

export function getWorkersStatsQueryKey(wallet: string) {
    return ["workers-stats", wallet];
}

export default function useWorkersStats({
    wallet,
    needActive,
}: {
    wallet: string;
    needActive?: boolean;
}) {
    return useQuery({
        queryKey: ["workers-stats", wallet],
        queryFn: async () => {
            let res = await fetch(
                `${API_SERVER}/workers?wallet=${wallet}&needActive=${needActive}`
            );
            return handleApiResponse(res);
        },
    });
}
