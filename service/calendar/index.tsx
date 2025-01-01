import {getUrl} from "@/service/api";
import {z} from "zod";
import {eventSchema} from "@/schema/calendar";
import {EventApi} from "@fullcalendar/core";

const { url } = getUrl();

export const getModels = async () => {
    const response = await fetch(`${url}/model`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
}
export const createPlanning = async (data: z.infer<typeof eventSchema>) => {
    const response = await fetch(`${url}/planning/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export const getPlanningByTechnicien = async (id: string | undefined) => {
  const response = await fetch(`${url}/planning/technicien/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const updateEvent = async (data: {allData: z.infer<typeof eventSchema>, selectedEvent:EventApi }) => {
    console.log(data)
    const response = await fetch(`${url}/planning/update/${data.selectedEvent.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data.allData),
    });
    return await response.json();
}

export const deleteEvent = async (id: string) => {

    const response = await fetch(`${url}/planning/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
}