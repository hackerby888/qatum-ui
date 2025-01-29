import { API_SERVER } from "@/consts/apiServer";
import { useInfiniteQuery } from "@tanstack/react-query";

export const PAYMENTS_LIMIT = 20;

export default function usePaymentsHistory({ wallet }: { wallet: string }) {
    return useInfiniteQuery({
        initialPageParam: 0,
        queryKey: ["payments", wallet],
        queryFn: ({ pageParam = 0 }) => {
            return fetch(
                `${API_SERVER}/payments?wallet=${wallet}&limit=${PAYMENTS_LIMIT}&offset=${
                    pageParam * PAYMENTS_LIMIT
                }`
            ).then((res) => res.json());
        },
        getNextPageParam: (_, allPages) => allPages.length,
    });
}
