import { API_SERVER } from "@/consts/apiServer";
import { useQuery } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";

export function getComputorIdDetailQueryKey({
    computorId,
}: {
    computorId: string;
}) {
    return ["computor-id-detail", computorId];
}

export default function useComputorIdDetail({
    computorId,
    enabled = false,
}: {
    computorId: string;
    enabled?: boolean;
}) {
    return useQuery({
        queryKey: ["computor-id-detail", computorId],
        queryFn: async () => {
            let res = await fetch(
                `${API_SERVER}/computor-id/detail?computorId=${computorId}`
            );
            return handleApiResponse(res);
        },
        enabled,
    });
}
