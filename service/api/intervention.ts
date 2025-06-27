import { IIntervention } from "@/schema/intervention";
import {getUrl} from "@/service/api/index";
const { url } = getUrl();
export const createIntervention = async (obj: {
  token: string;
  data: IIntervention;
}) => {
  const response = await fetch(`${url}/intervention/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
    },
    body: JSON.stringify(obj.data),
  });
  return await response.json();
};
