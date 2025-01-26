import { API_SERVER } from "@/consts/apiServer";
import { useQuery } from "@tanstack/react-query";

export default function useGlobalStats() {
    return useQuery({
        queryKey: ["central-stats"],
        queryFn: async () => {
            let res = await fetch(`${API_SERVER}/globalStats`);
            return res.json();
        },
    }) as any;
}
