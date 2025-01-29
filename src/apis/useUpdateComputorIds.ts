import { API_SERVER } from "@/consts/apiServer";
import { useMutation } from "@tanstack/react-query";
import handleApiResponse from "./handleApiResponse";

export default function useUpdateComputorIds() {
    return useMutation({
        mutationKey: ["computor-ids"],
        mutationFn: async (data) => {
            let res = await fetch(`${API_SERVER}/computor-ids`, {
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
