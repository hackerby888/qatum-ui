import { API_SERVER } from "@/consts/apiServer";
import { useMutation } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";

export default function useUpdateMiningStrategy() {
    return useMutation({
        mutationKey: ["mining-strategy"],
        mutationFn: async (data) => {
            let res = await fetch(`${API_SERVER}/mining-config`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return handleApiResponse(res);
        },
    });
}
