export interface IIntervention   {
    id: string;
    debut: Date | null;
    fin: Date | null;
    adresse: {label: string; coordinates: [number, number]};
    detail: string;
    statut: "en cours" | "terminée" | "annulée" | "reportée" | "en attente";
    client_id: string;
    technicien_id: string;
    forfait_id: string;
    zone_id: string;
}