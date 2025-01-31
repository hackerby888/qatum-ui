import { API_SERVER } from "@/consts/apiServer";
import { useInfiniteQuery } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";

export default function useInfiniteGet({
    queryKey,
    path,
    enabled = true,
    reqQuery,
    limit = 0,
}: {
    queryKey: any[];
    path: string;
    enabled?: boolean;
    reqQuery?: {
        [key: string]: any;
    };
    limit?: number;
}) {
    return useInfiniteQuery({
        initialPageParam: 0,
        queryKey,
        queryFn: async ({ pageParam = 0 }) => {
            let reqQueryString = "";
            if (reqQuery) {
                reqQueryString = Object.keys(reqQuery)
                    .map((key) => `${key}=${reqQuery[key]}`)
                    .join("&");
            } else {
                reqQueryString = "_=blank";
            }
            let res = await fetch(
                `${API_SERVER}/${path}?${reqQueryString}&limit=${limit}&offset=${
                    pageParam * limit
                }`
            );

            return handleApiResponse(res);
        },
        getNextPageParam: (_, allPages) => allPages.length,
        enabled,
    });
}
