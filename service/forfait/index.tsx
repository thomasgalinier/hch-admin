import {getUrl} from "@/service/api";

const {url} = getUrl();
export const getForfait = async () => {
    const response = await fetch(`${url}/forfait`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
}