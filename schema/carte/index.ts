export interface zoneGeoSchema {
    id?: string
    id_technicien?: string;
    nom: string;
    polygone: {type: string, coordinates: number[][][] };
    color: string;
}