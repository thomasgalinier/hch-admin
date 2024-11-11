import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {deleteZone, getZone, updateZone} from "@/service/carte";
import { Button } from "@/components/ui/button";
import { zoneGeoSchema } from "@/schema/carte";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronUp, Delete, Save } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTechnicien } from "@/service/auth";
import { useCookies } from "react-cookie";
import { UserType } from "@/schema";
import { useZoneStore } from "@/store/useZoneStore";
import {log} from "node:util";

const CarteSidebar = () => {
  const { zoneSelected, setZoneSelected } = useZoneStore();
  console.log(zoneSelected);
  const [cookies] = useCookies(["token"]);
  const { data = [], refetch } = useQuery({
    queryFn: getZone,
    queryKey: ["zone"],
  });
  const [zonesData, setZonesData] = useState<zoneGeoSchema[]>(data);
  const mutation = useMutation({
    mutationFn: (data: { id?: string; zone: zoneGeoSchema }) =>
      updateZone(data),
    mutationKey: ["zone"],
  });
  const { data: technicienData = [] } = useQuery({
    queryFn: () => getTechnicien(cookies.token),
    queryKey: ["technicien"],
  });
  const handleInputChange = (
    id: string | undefined,
    field: string,
    value: string,
  ) => {
    setZonesData((prevZone) =>
      prevZone.map((zone) =>
        zone.id === id ? { ...zone, [field]: value } : zone,
      ),
    );
  };
  const handleSave = (zone: zoneGeoSchema) => {
    mutation.mutate({ id: zone.id, zone });
    console.log(zone);
    window.location.reload();
  };
  const deleteZoneMutation = useMutation({
    mutationFn: (id: string) => deleteZone(id),
    mutationKey: ["delete"],
    onSuccess: () => {
      refetch();
    }
  });
  useEffect(() => {
    refetch();
    setZonesData(data);
  }, [data]);
  const handleDelete = (zoneId?: string) => {
    // @ts-ignore
    deleteZoneMutation.mutate(zoneId);
    setZoneSelected(null);
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Carte Action</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-4">
        {zonesData.map((zone: zoneGeoSchema) => (
          <Collapsible
            key={zone.id}
            className="group/collapsible"
            open={zone.id === zoneSelected}
          >
            <SidebarMenuButton asChild>
              <CollapsibleTrigger onClick={() => setZoneSelected(zone.id)}>
                <div className="flex items-center justify-between w-full">
                  {zone.nom}
                  <div
                    style={{ backgroundColor: zone.color }}
                    className="h-3 w-3 rounded-sm ml-auto"
                  ></div>
                </div>
                <ChevronUp className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarMenuButton>
            <CollapsibleContent>
              <Card className="py-2">
                <CardContent className="flex flex-col gap-2">
                  <Input
                    value={zone.nom}
                    className="w-full"
                    placeholder="Nom"
                    onChange={(e) =>
                      handleInputChange(zone.id, "nom", e.target.value)
                    }
                  />
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button style={{ backgroundColor: zone.color }} />
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <HexColorPicker
                          color={zone.color}
                          onChange={(color) =>
                            handleInputChange(zone.id, "color", color)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      value={zone.color}
                      onChange={(e) =>
                        handleInputChange(zone.id, "color", e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <Select
                    defaultValue={
                      zone.id_technicien ? zone.id_technicien : undefined
                    }
                    onValueChange={(value) =>
                      handleInputChange(zone.id, "id_technicien", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Technicien" />
                    </SelectTrigger>
                    <SelectContent>
                      {technicienData.map((technicien: UserType) => (
                        <SelectItem
                          value={String(technicien.id)}
                          key={technicien.id}
                        >
                          {technicien.prenom} {technicien.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
                <TooltipProvider>
                  <CardFooter className="justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-full"
                          onClick={() => handleSave(zone)}
                        >
                          <Save />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Enregistrer</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="w-full"
                          onClick={() => handleDelete(zone.id)}
                        >
                          <Delete />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Supprimer</TooltipContent>
                    </Tooltip>
                  </CardFooter>
                </TooltipProvider>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default CarteSidebar;
