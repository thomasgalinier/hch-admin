import * as z from "zod";

export const eventSchema = z.object({
    id_technicien: z.string(),
    id_model: z.string(),
    debut: z.date(),
    fin: z.date(),
});

export type ModelType = {
    id: string;
    nom: string;
    duree: number;
};
export type ViewType = "month" | "week" | "day" | "list";
