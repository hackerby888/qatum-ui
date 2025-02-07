import { Storage } from "@/utils/storage";

export default async function handleApiResponse(
    res: Response,
    navigate?: (path: string) => void
) {
    let json = await res.json();

    if (res.status !== 200) {
        if (res.status === 401) {
            if (navigate) {
                Storage.setLoginCredential("");
                navigate("/login");
            }
        }
        throw new Error(json.error);
    }

    return json;
}
