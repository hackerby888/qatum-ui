import { API_SERVER } from "@/consts/apiServer";
import { useQuery } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";

export default function useGeneralGet({
    queryKey,
    path,
    enabled = true,
    reqQuery,
}: {
    queryKey: any[];
    path: string;
    enabled?: boolean;
    reqQuery?: {
        [key: string]: any;
    };
}) {
    return useQuery({
        queryKey,
        queryFn: async () => {
            let reqQueryString = "";
            if (reqQuery) {
                reqQueryString = Object.keys(reqQuery)
                    .map((key) => `${key}=${reqQuery[key]}`)
                    .join("&");
            } else {
                reqQueryString = "_=blank";
            }
            let res = await fetch(`${API_SERVER}/${path}?${reqQueryString}`);
            return handleApiResponse(res);
        },
        enabled,
    });
}
