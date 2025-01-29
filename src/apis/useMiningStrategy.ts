import { API_SERVER } from "@/consts/apiServer";
import { useQuery } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";

export function getMiningStrategyQueryKey() {
    return ["mining-strategy"];
}

export default function useMiningStrategy() {
    return useQuery({
        queryKey: ["mining-strategy"],
        queryFn: async () => {
            let res = await fetch(`${API_SERVER}/mining-config`);
            return handleApiResponse(res);
        },
    });
}
