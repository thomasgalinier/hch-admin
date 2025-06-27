import { IIntervention } from "@/schema/intervention";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createIntervention } from "@/service/api/intervention";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { UserType } from "@/schema";
import { useState } from "react";
import { ForfaitType } from "@/schema/forfait";
import { useAdresseComplete } from "@/hooks/useAdresseComplete";
import { useCalendar } from "@/components/Calendar/contexts/calendar-context";
import { zoneGeoSchema } from "@/schema/carte";
import { getPlaces } from "@/service/api/adresse";

export const useCreateIntervention = (intervention?: IIntervention) => {
  const queryClient = useQueryClient();
  const [adresse, setAdresse] = useState<{
    label: string;
    coordinates: [number, number];
  } | null>(null);
  const [client, setClient] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [forfait, setForfait] = useState<ForfaitType | undefined>(undefined);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [cookies] = useCookies(["token"]);
  const { zoneGeo } = useCalendar();
  const [time, setTime] = useState<string | undefined>("08:00:00");
  const { isInZoneGeographique } = useAdresseComplete();
  const [zoneSelected, setZoneSelected] = useState<zoneGeoSchema | null>(null);
  const dateTimeDebut =
    date && time
      ? new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Number(time.split(":")[0]),
        Number(time.split(":")[1]),
        Number(time.split(":")[2] || 0),
      )
      : undefined;


  const places = useQuery({
    queryFn: () => getPlaces(adresse?.label ?? ""),
    queryKey: ["places", adresse],
    // @ts-ignore
    enabled: adresse?.label.length > 2 && adresse !== undefined,
  });

  const createInterventionMutation = useMutation({
    mutationFn: createIntervention,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["intervention"] });
      data.error
        ? toast("Erreur lors de la création de l'intervention", {
            action: {
              label: "OK",
              onClick: () => {
                console.error(data.error);
              },
            },
          })
        : toast("Intervention créée avec succès", {
            action: {
              label: "OK",
              onClick: () => {
                console.log(data);
              },
            },
          });
    },
  });
  const onSubmit = () => {
    const data: IIntervention = {
      client_id: client,
      forfait_id: forfait?.id,
      statut: "en attente",
      technicien_id: zoneSelected?.id_technicien,
      zone_id:zoneSelected?.id,
      adresse: adresse?.label,
      debut: dateTimeDebut,

      fin: dateTimeDebut && forfait? new Date(dateTimeDebut?.getTime() + forfait?.formatted_duree): null,
    };
    const obj = {
      token: cookies.token,
      data,
    };
    console.log({ data: obj.data });
    createInterventionMutation.mutate(obj);
  };
  const handleClientChange = (client: string) => {
    setClient(client);
  };
  const handleForfaitChange = (forfait: ForfaitType) => {
    setForfait(forfait);
  };

  return {
    onSubmit,
    client,
    handleClientChange,
    forfait,
    handleForfaitChange,
    date,
    setDate,
    openCalendar,
    setOpenCalendar,
    time,
    setTime,
    setZoneSelected,
    places,
    adresse,
    setAdresse,
  };
};
