import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getZone } from "@/service/carte";
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
import {useCookies} from "react-cookie";
import {UserType} from "@/schema";

const CarteSidebar = () => {
  const [cookies] = useCookies(["token"]);
  const { data = [], refetch } = useQuery({
    queryFn: getZone,
    queryKey: ["zone"],
  });
  const { data: technicienData = []} = useQuery({
    queryFn: () => getTechnicien(cookies.token),
    queryKey: ["technicien"],
  });
  const [zonesData, setZonesData] = useState<zoneGeoSchema[]>(data);
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
  useEffect(() => {
    refetch();
    setZonesData(data);
  }, [data]);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Carte Action</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-4">
        {zonesData.map((zone: zoneGeoSchema) => (
          <Collapsible key={zone.id} defaultOpen className="group/collapsible">
            <SidebarMenuButton asChild>
              <CollapsibleTrigger>
                {zone.nom}
                <div
                  style={{ backgroundColor: zone.color }}
                  className="h-3 w-3 rounded-sm ml-auto"
                ></div>
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
                        <Button
                          style={{ backgroundColor: zone.color }}
                        ></Button>
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
                  <Select defaultValue={zone.id_technicien ? zone.id_technicien : undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Technicien" />
                    </SelectTrigger>
                    <SelectContent>
                      {technicienData.map((technicien: UserType) => (
                          <SelectItem value={String(technicien.id)} key={technicien.id}>
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
