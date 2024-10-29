import { getUrl } from "@/service/api";
import { createCarteSchema } from "@/schema/carte";

const { url } = getUrl();
const createZone = async (data: createCarteSchema) => {
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
