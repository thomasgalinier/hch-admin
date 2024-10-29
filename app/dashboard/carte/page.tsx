"use client";
import {FeatureGroup, MapContainer, Polygon, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import { createCarteSchema } from "@/schema/carte";
import {createZone, getZone} from "@/service/carte";

const CartePage = () => {
  const mutation = useMutation({
    mutationFn: (data: createCarteSchema) => createZone(data),
    mutationKey: ["zone"],
  });
  const {data} = useQuery({queryFn: getZone, queryKey: ["zone"]});
    console.log(data)
  const onCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const polygone = layer.toGeoJSON();
      mutation.mutate({ nom: `zone_${Date.now()}`, polygone: polygone.geometry.coordinates[0] });
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
          {data?.map((zone: createCarteSchema) => (
              <Polygon
               key={zone.nom}
               positions={zone.polygone.map((p: any) => [p[1], p[0]])}
              />
          ))}
      </MapContainer>
    </div>
  );
};
export default CartePage;
