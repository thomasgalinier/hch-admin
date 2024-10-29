"use client";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCarteSchema } from "@/schema/carte";
import { createCarte } from "@/service/carte";

const CartePage = () => {
  const mutation = useMutation({
    mutationFn: (data: createCarteSchema) => createCarte(data),
    mutationKey: ["carte"],
  });
  const onCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const polygone = layer.toGeoJSON();
      mutation.mutate({ nom: `zone_${Date.now()}`, polygone });
    }
  };

  return (
    <div>
      <MapContainer
        center={[45.75, 4.85]}
        zoom={13}
        scrollWheelZoom={true}
        className=" mx-auto"
        style={{ height: "calc(100vh - 8rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          <EditControl
            onCreated={onCreated}
            draw={{
              circle: false,
              marker: false,
              polyline: false,
              rectangle: false,
              circlemarker: false,
            }}
            edit={{
              edit: false,
              remove: false,
            }}
            position={"topright"}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};
export default CartePage;
