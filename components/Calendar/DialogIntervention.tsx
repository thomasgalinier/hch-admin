import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdresseComplete } from "@/components/adresse-complete";
import { useCalendar } from "@/components/Calendar/contexts/calendar-context";
import { useCreateIntervention } from "@/hooks/Intervention/useCreateIntervention";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { InterventionFormRHF } from "@/components/Intervention/InterventionFormRHF";

export default function DialogIntervention() {
  const { clients, forfaits } = useCalendar();
  const {
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
    onSubmit,
    setZoneSelected,
    setAdresse,
    adresse,
    places,
  } = useCreateIntervention();
  console.log(clients.data);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Créer une intervention</DialogTitle>
      </DialogHeader>

      <Select
        value={client}
        onValueChange={(value) => handleClientChange(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un client" />
        </SelectTrigger>
        <SelectContent>
          {clients?.data?.map((client) => (
            <SelectItem
              key={client.id}
              value={client.id ?? ""}
              className="flex-1 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Avatar key={client.id} className="size-6">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${client?.nom}${client?.prenom}`}
                    alt={`${client.prenom}-${client.nom}`}
                  />
                  <AvatarFallback className="text-xxs">
                    {client.prenom[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="truncate">{`${client.prenom} - ${client.nom}`}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <AdresseComplete
        setZoneSelected={setZoneSelected}
        adresse={adresse}
        setAdresse={setAdresse}
        places={places}
      />

      <Select
        // @ts-ignore
        value={forfait}
        onValueChange={(value) => handleForfaitChange(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un forfait" />
        </SelectTrigger>
        <SelectContent>
          {forfaits?.data?.map((forfait) => (
            <SelectItem
              // @ts-ignore
              value={forfait}
              key={forfait.id}
              className="cursor-pointer"
            >
              <div className="flex gap-5">
                <p>
                  {forfait.titre} - {forfait.categorie_velo}
                </p>
                <p>{forfait.duree}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-4">
        <div className="flex flex-col gap-3 w-full">
          <Label htmlFor="date-picker" className="px-1">
            Date
          </Label>
          <Popover
            open={openCalendar}
            onOpenChange={setOpenCalendar}
            modal={true}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-full
                 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0 z-[1001]"
              align="start"
              forceMount
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpenCalendar(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-picker" className="px-1">
            Heure
          </Label>
          <Input
            onChange={(e) => {
              setTime(e.target.value);
            }}
            value={time}
            type="time"
            id="time-picker"
            step="1"
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
      <Button onClick={onSubmit}>Créer l&#39;intervention</Button>
    </DialogContent>
  );
}
