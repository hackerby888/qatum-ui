import { API_SERVER } from "@/consts/apiServer";
import { useQuery } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";
import { Storage } from "@/utils/storage";
import { useNavigate } from "react-router";

export default function useGeneralGet<T>({
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
    let navigate = useNavigate();
    return useQuery<T>({
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
            let res = await fetch(`${API_SERVER}/${path}?${reqQueryString}`, {
                headers: {
                    token: "Bearer " + Storage.getLoginCredential(),
                },
            });
            return handleApiResponse(res, navigate);
        },
        enabled,
    });
}
