import { API_SERVER } from "@/consts/apiServer";
import { useQuery } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";

export function getComputorIdsQueryKey() {
    return ["computor-ids"];
}

export default function useComputorIds() {
    return useQuery({
        queryKey: ["computor-ids"],
        queryFn: async () => {
            let res = await fetch(`${API_SERVER}/computor-ids`);
            return handleApiResponse(res);
        },
    }) as any;
}
