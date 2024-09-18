import * as z from "zod";

export const SignInSchema = z.object({
    email: z.string().email({message: "Email invalide"}),
    password: z.string().min(2, {message: "Le mot de passe doit contenir au moins 6 caractères"}),
});

export const SignUpSchema = z.object({
    nom: z.string().min(2, {message: "Le nom doit contenir au moins 2 caractères"}),
    prenom: z.string().min(2, {message: "Le prénom doit contenir au moins 2 caractères"}),
    email: z.string().email({message: "Email invalide"}),
    password: z.string().min(4, {message: "Le mot de passe doit contenir au moins 4 caractères"}),
    role: z.string().min(2, {message: "Le rôle doit contenir au moins 2 caractères"}),
    telephone: z.string().min(10, {message: "Le numéro de téléphone doit contenir au moins 10 caractères"}).max(10, {message: "Le numéro de téléphone doit contenir au plus 10 caractères"}),
});

export interface AllDataSignUp {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: string;
    token: string;
}


export interface UserType {
    id: string;
    entreprise_id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
}

export interface ErrorType {
    error: string;
    message: string;
    statusCode: number;
}

export interface UserType {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    role: string;
    entreprise_id: string;
    created_at: Date;
}

