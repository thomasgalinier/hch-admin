import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAdresseComplete } from "@/hooks/useAdresseComplete";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Feature } from "geojson";
import { useCalendar } from "@/components/Calendar/contexts/calendar-context";
import { useCreateIntervention } from "@/hooks/Intervention/useCreateIntervention";
import { zoneGeoSchema } from "@/schema/carte";
type AdresseCompleteProps = {
  setZoneSelected: (zone: zoneGeoSchema) => void;
  setAdresse: (adresse: { label: string; coordinates: [number, number] }) => void;
  adresse: { label: string; coordinates: [number, number] } | null;
  places: {
    data: {
      features: Feature[];
    };
  };
};

export function AdresseComplete({setZoneSelected, setAdresse, adresse, places}: AdresseCompleteProps) {
  const { isInZoneGeographique} = useAdresseComplete();
  const { zoneGeo } = useCalendar();
  const [open, setOpen] = useState(false);
  const handleSelect = (place: Feature) => {
    const zone = isInZoneGeographique(place.geometry.coordinates as [number, number], zoneGeo.data);
    // @ts-ignore
    setZoneSelected(zone);
    setAdresse({
      label: place?.properties?.label,
      // @ts-ignore
      coordinates: place.geometry.coordinates,
    });
    setOpen(false);
  };

  return (
    <Command className="rounded-lg border">
      <div>
        <CommandInput
          value={adresse?.label}
          onValueChange={(val) => setAdresse({ label: val, coordinates: [0, 0] })}
          placeholder="Chercher une adresse"
          onFocus={() => setOpen(true)}
        />
      </div>

      <CommandList className={cn(open ? "block" : "hidden")}>
        {places?.data?.features.length === 0 || places.data === undefined ? (
          <CommandEmpty>
            <div className="p-4">Veuillez entrer une adresse valide</div>
          </CommandEmpty>
        ) : (
          <CommandGroup>
            {places?.data?.features?.map((place) => {

              return (
                <CommandItem
                  key={place?.properties?.id}
                  onSelect={() => handleSelect(place)}
                  className="cursor-pointer"
                >
                  {place?.properties?.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
