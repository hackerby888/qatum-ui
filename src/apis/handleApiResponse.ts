export default async function handleApiResponse(res: Response) {
    let json = await res.json();

    if (res.status !== 200) {
        throw new Error(json.error);
    }

    return json;
}
