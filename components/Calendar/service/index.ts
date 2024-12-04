import {getUrl} from "@/service/api";
import {CreateModelType, CreatePlanningType, ModelType} from "@/components/Calendar/shema";

const { url } = getUrl();
const createModel = async (data: CreateModelType) => {
    const response = await fetch(`${url}/model/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}
const getModels = async () => {
    const response = await fetch(`${url}/model`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
}
const createPlanning = async (data: CreatePlanningType) => {
    const response = await fetch(`${url}/planning/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}
export { createModel, getModels, createPlanning };