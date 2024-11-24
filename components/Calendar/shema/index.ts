import * as z from "zod";

type ViewType = 'day' | 'week' | 'month';
type WeeklyDateType = {
    date: Date;
    formattedDateString: string;
    formattedDate: string;
}
const modelSchema = z.object({
    nom: z.string(),
    duree: z.preprocess((value) => {
        if (typeof value === "string") {
            const [hours, minutes] = value.split(":").map(Number);
            return hours * 60 + minutes; // Convertit en minutes (ou utilisez *3600 + *60 pour secondes)
        }
        return value; // Si ce n'est pas une string, laissez tel quel
    }, z.number({
        invalid_type_error: "La durée doit être un nombre après conversion.",
    }).min(1, "La durée doit être positive")),
});

type ModelType = {
    nom: string;
    duree: number;
}
export type { ViewType, WeeklyDateType, ModelType };
export { modelSchema };