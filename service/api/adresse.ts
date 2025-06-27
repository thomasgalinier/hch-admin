import { FeatureCollection } from "geojson";

export const getPlaces = async (adresse: string): Promise<FeatureCollection> => {
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${adresse}&limit=5`,
  );
  return response.json();
};

