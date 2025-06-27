"use client";
import {
  FeatureGroup,
  MapContainer,
  Polygon,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { zoneGeoSchema } from "@/schema/carte";
import { createZone, getZone } from "@/service/carte";
import {useZoneStore} from "@/store/useZoneStore";
import {useCookies} from "react-cookie";

const CartePage = () => {
  const {setZoneSelected} = useZoneStore();
  const [cookie] = useCookies(["token"]);
  const queryClient= useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: zoneGeoSchema) => createZone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["zone"]});
    },
    mutationKey: ["zone"],
  });
  const { data } = useQuery({ queryFn: () => getZone(cookie.token), queryKey: ["zone"] });
  const onCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const polygone = layer.toGeoJSON();
      mutation.mutate({
        nom: `zone_${Date.now()}`,
        polygone: {type:'Polygon', coordinates: [polygone.geometry.coordinates[0]]},
        color: "#FFDD00",
      });
    }
  };
  return (
    <div>
      <MapContainer
        center={[45.75, 4.85]}
        zoom={13}
        scrollWheelZoom={true}
        className="mx-auto"
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

        {data?.map((zone: zoneGeoSchema) => (
            zone.polygone.coordinates.map((polygon: any, index: number) => (
                <Polygon
                    key={`${zone.id}-${index}`} // Ajoutez un index unique pour chaque polygone
                    positions={polygon.map((coord: any) => [coord[1], coord[0]])} // Inverser les coordonnées
                    color={zone.color}
                    fillColor="#000000"
                    eventHandlers={{
                      click: () => {
                        setZoneSelected(zone.id);
                      },
                    }}
                />

            ))
        ))}
      </MapContainer>
    </div>
  );
};

export default CartePage;
