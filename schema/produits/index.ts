import * as z from "zod";

export const ProduitSchema = z.object({
    id: z.string(),
    nom: z.string().min(2, {message: "Le nom doit contenir au moins 2 caractères"}),
    quantite: z.string(),
    description: z.string().min(2, {message: "La description doit contenir au moins 2 caractères"}),
    prix: z.string(),
    categorie: z.string().min(2, {message: "La catégorie doit contenir au moins 2 caractères"}),
})

export type ProduitType = {
    id: string;
    nom: string;
    quantite: number;
    description: string;
    prix: number;
    categorie: string;
}