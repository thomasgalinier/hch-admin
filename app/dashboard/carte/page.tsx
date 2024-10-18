"use client";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import {Button} from "@/components/ui/button";

const CartePage = () => {
    const onCreated = (e: any) => {
        const { layerType, layer } = e;
        if (layerType === "polygon") {
            const polygon = layer.toGeoJSON();
            console.log("Polygon created:", polygon);
            // Ajoutez ici votre logique pour enregistrer le polygone
        }
    };
  return (
    <div>
      <Button>Enregistrer</Button>
      <MapContainer
        center={[45.75, 4.85]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-screen-minus-header"
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
            position={"topright"}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};
export default CartePage;
