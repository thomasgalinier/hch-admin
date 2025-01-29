import {getUrl} from "@/service/api";
import {ForfaitType} from "@/schema/forfait";

const {url} = getUrl();

export const createForfait = async (obj: {token: string, data: ForfaitType}) => {
    const { token, data } = obj;
    const response = await fetch(`${url}/forfait/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export const getForfait = async (token: string) => {
    const response = await fetch(`${url}/forfait`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}
export const updateForfait = async (obj: {token: string, id: string, data: ForfaitType}) => {
 const { token, id, data } = obj;

    const response = await fetch(`${url}/forfait/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ forfait: data }),
    });
    return await response.json();
};
export const deleteForfait = async (obj: {token: string, id: string}) => {
    const { token, id } = obj;
    const response = await fetch(`${url}/forfait/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}