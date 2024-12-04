import * as z from "zod";

type ViewType = "day" | "week" | "month";
type WeeklyDateType = {
  date: Date;
  formattedDateString: string;
  formattedDate: string;
};
const modelSchema = z.object({
  nom: z.string().min(1, "Le nom du modèle doit être renseigné."),
  duree: z.string().transform((value) => {
    const [hours, minutes] = value.split(":").map(Number);
    return (hours * 3600 + minutes * 60) * 1000; // Conversion en timestamp
  }),
});

const planningSchema = z.object({
  dateTime: z.date(),
    id_technicien: z.string().min(1, "L'id du technicien doit être renseigné."),
    id_model: z.string().min(1, "L'id du modèle doit être renseigné."),

});
type CreateModelType = {
  nom: string;
  duree: number;
};
type ModelType = {
  id: string;
  nom: string;
  duree: number;
};
type CreatePlanningType = {
    dateTime: Date;
    id_technicien: string;
    id_model: string;
};
export type { ViewType, WeeklyDateType, ModelType, CreateModelType, CreatePlanningType };
export { modelSchema, planningSchema };
