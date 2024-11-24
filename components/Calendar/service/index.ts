import {getUrl} from "@/service/api";
import {ModelType} from "@/components/Calendar/shema";

const { url } = getUrl();
const createModel = async (data: ModelType) => {
    const response = await fetch(`${url}/model/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export { createModel };