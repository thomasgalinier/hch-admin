import * as z from "zod";

export interface ForfaitType {
    id: string;
    titre: string;
    type: string;
    description: string;
    duree: string;
    categorie_velo: string;
    prix: string;
    formatted_duree: number;
}

export const ForfaitForm = z.object({
    id: z.string(),
    titre: z.string().min(2, {message: "Le nom doit contenir au moins 2 caractères"}),
    type: z.string().min(2, {message: "Le type doit contenir au moins 2 caractères"}),
    description: z.string().min(2, {message: "La description doit contenir au moins 2 caractères"}),
    duree: z.string().min(2, {message: "La durée doit contenir au moins 2 caractères"}),
    categorie_velo: z.string().min(2, {message: "La catégorie vélo doit contenir au moins 2 caractères"}),
    prix: z.string().min(2, {message: "Le prix doit contenir au moins 2 caractères"}),
})