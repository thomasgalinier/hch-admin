import { getUrl } from "@/service/api";
import { zoneGeoSchema } from "@/schema/carte";
import { UseQueryResult } from "@tanstack/react-query";
import { UserType } from "@/schema";

const { url } = getUrl();
const createZone = async (data: zoneGeoSchema) => {
  const response = await fetch(`${url}/carte/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
const getZone = async () => {
  const response = await fetch(`${url}/carte`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export { createZone, getZone };
