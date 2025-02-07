import { API_SERVER } from "@/consts/apiServer";
import { useMutation } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";
import { Storage } from "@/utils/storage";

export default function useGeneralPost({
    queryKey,
    path,
    reqQuery,
}: {
    queryKey: any[];
    path: string;
    reqQuery?: {
        [key: string]: any;
    };
}) {
    return useMutation({
        mutationKey: queryKey,
        mutationFn: async (data) => {
            let reqQueryString = "";
            if (reqQuery) {
                reqQueryString = Object.keys(reqQuery)
                    .map((key) => `${key}=${reqQuery[key]}`)
                    .join("&");
            } else {
                reqQueryString = "_=blank";
            }
            let res = await fetch(`${API_SERVER}/${path}?${reqQueryString}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: "Bearer " + Storage.getLoginCredential(),
                },
                body: JSON.stringify(data),
            });

            return handleApiResponse(res);
        },
    });
}
