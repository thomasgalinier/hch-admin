import * as z from "zod";

export const SignInSchema = z.object({
    email: z.string().email({message: "Email invalide"}),
    password: z.string().min(2, {message: "Le mot de passe doit contenir au moins 6 caractères"}),
});

export interface UserType {
    id: string;
    entreprise_id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
}