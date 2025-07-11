import { z } from "zod";

export interface IIntervention   {
    id: string;
    debut: Date;
    fin: Date | null;
    adresse: {label: string; coordinates: [number, number]};
    detail: string;
    statut: "en cours" | "terminée" | "annulée" | "reportée" | "en attente";
    client_id: string;
    technicien_id: string;
    forfait_id: string;
    zone_id: string;
}

export const interventionSchema = z.object({
  date: z.date(),
  time: z.string(),
  duree: z.string(),
  color: z.string(),
  adresse: z.string(),
  status: z.enum(["en cours", "terminée", "annulée", "reportée", "en attente"]),
  client_id: z.string(),
  technicien_id: z.string(),
  forfait_id: z.string(),
  zone_id: z.string(),
})