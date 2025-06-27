import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/service/api/adresse";
import { useState } from "react";
import { point, polygon } from "@turf/helpers";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";

export const useAdresseComplete = () => {
  const isInZoneGeographique = (
    coordinates: [number, number],
    zones: {
      id: string;
      nom: string;
      polygone: { type: string; coordinates: number[][][] };
      color: string;
    }[]
  ) => {
    const pt = point(coordinates);

    for (const zone of zones) {
      const poly = polygon(zone.polygone.coordinates);
      if (booleanPointInPolygon(pt, poly)) {
        return zone; // Retourne la zone correspondante
      }
    }
    return null;
  };

  return { isInZoneGeographique };
};
