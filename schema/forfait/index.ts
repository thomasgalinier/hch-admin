import * as z from "zod";

export interface ForfaitType {
    nom: string;
    type: string;
    description: string;
    duree: number;
    categorie_velo: string;
    prix: number;
}

export const ForfaitForm = z.object({
    nom: z.string().min(2, {message: "Le nom doit contenir au moins 2 caractères"}),
    type: z.string().min(2, {message: "Le type doit contenir au moins 2 caractères"}),
    description: z.string().min(2, {message: "La description doit contenir au moins 2 caractères"}),
    duree: z.number().int().positive(),
    categorie_velo: z.string().min(2, {message: "La catégorie vélo doit contenir au moins 2 caractères"}),
    prix: z.number().int().positive(),
})