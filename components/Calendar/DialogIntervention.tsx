import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { interventionSchema } from "@/schema/intervention";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function DialogIntervention() {
  const form = useForm({
    resolver: zodResolver(interventionSchema),
    defaultValues: {
      date: new Date(),
      time: "09:00",
      duree: "01:00",
      color: "#C0C9EE",
      adresse: "",
      status: "en attente",
      client_id: "",
      technicien_id: "",
      forfait_id: "",
      zone_id: "",
    },
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Créer une intervention</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline">
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Sélectionner une date"}
                        <CalendarIcon />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </form>
      </Form>
      {/*<Select*/}
      {/*  value={client}*/}
      {/*  onValueChange={(value) => handleClientChange(value)}*/}
      {/*>*/}
      {/*  <SelectTrigger>*/}
      {/*    <SelectValue placeholder="Sélectionner un client" />*/}
      {/*  </SelectTrigger>*/}
      {/*  <SelectContent>*/}
      {/*    {clients?.data?.map((client) => (*/}
      {/*      <SelectItem*/}
      {/*        key={client.id}*/}
      {/*        value={client.id ?? ""}*/}
      {/*        className="flex-1 cursor-pointer"*/}
      {/*      >*/}
      {/*        <div className="flex items-center gap-2">*/}
      {/*          <Avatar key={client.id} className="size-6">*/}
      {/*            <AvatarImage*/}
      {/*              src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${client?.nom}${client?.prenom}`}*/}
      {/*              alt={`${client.prenom}-${client.nom}`}*/}
      {/*            />*/}
      {/*            <AvatarFallback className="text-xxs">*/}
      {/*              {client.prenom[0]}*/}
      {/*            </AvatarFallback>*/}
      {/*          </Avatar>*/}
      {/*          <p className="truncate">{`${client.prenom} - ${client.nom}`}</p>*/}
      {/*        </div>*/}
      {/*      </SelectItem>*/}
      {/*    ))}*/}
      {/*  </SelectContent>*/}
      {/*</Select>*/}
      {/*<AdresseComplete*/}
      {/*  setZoneSelected={setZoneSelected}*/}
      {/*  adresse={adresse}*/}
      {/*  setAdresse={setAdresse}*/}
      {/*  places={places}*/}
      {/*/>*/}

      {/*<Select*/}
      {/*  // @ts-ignore*/}
      {/*  value={forfait}*/}
      {/*  onValueChange={(value) => handleForfaitChange(value)}*/}
      {/*>*/}
      {/*  <SelectTrigger>*/}
      {/*    <SelectValue placeholder="Sélectionner un forfait" />*/}
      {/*  </SelectTrigger>*/}
      {/*  <SelectContent>*/}
      {/*    {forfaits?.data?.map((forfait) => (*/}
      {/*      <SelectItem*/}
      {/*        // @ts-ignore*/}
      {/*        value={forfait}*/}
      {/*        key={forfait.id}*/}
      {/*        className="cursor-pointer"*/}
      {/*      >*/}
      {/*        <div className="flex gap-5">*/}
      {/*          <p>*/}
      {/*            {forfait.titre} - {forfait.categorie_velo}*/}
      {/*          </p>*/}
      {/*          <p>{forfait.duree}</p>*/}
      {/*        </div>*/}
      {/*      </SelectItem>*/}
      {/*    ))}*/}
      {/*  </SelectContent>*/}
      {/*</Select>*/}
      {/*<div className="flex gap-4">*/}
      {/*  <div className="flex flex-col gap-3 w-full">*/}
      {/*    <Label htmlFor="date-picker" className="px-1">*/}
      {/*      Date*/}
      {/*    </Label>*/}
      {/*    <Popover*/}
      {/*      open={openCalendar}*/}
      {/*      onOpenChange={setOpenCalendar}*/}
      {/*      modal={true}*/}
      {/*    >*/}
      {/*      <PopoverTrigger asChild>*/}
      {/*        <Button*/}
      {/*          variant="outline"*/}
      {/*          id="date-picker"*/}
      {/*          className="w-full*/}
      {/*           justify-between font-normal"*/}
      {/*        >*/}
      {/*          {date ? date.toLocaleDateString() : "Select date"}*/}
      {/*          <ChevronDownIcon />*/}
      {/*        </Button>*/}
      {/*      </PopoverTrigger>*/}
      {/*      <PopoverContent*/}
      {/*        className="w-auto overflow-hidden p-0 z-[1001]"*/}
      {/*        align="start"*/}
      {/*        forceMount*/}
      {/*      >*/}
      {/*        <Calendar*/}
      {/*          mode="single"*/}
      {/*          selected={date}*/}
      {/*          captionLayout="dropdown"*/}
      {/*          onSelect={(date) => {*/}
      {/*            setDate(date);*/}
      {/*            setOpenCalendar(false);*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </PopoverContent>*/}
      {/*    </Popover>*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col gap-3">*/}
      {/*    <Label htmlFor="time-picker" className="px-1">*/}
      {/*      Heure*/}
      {/*    </Label>*/}
      {/*    <Input*/}
      {/*      onChange={(e) => {*/}
      {/*        setTime(e.target.value);*/}
      {/*      }}*/}
      {/*      value={time}*/}
      {/*      type="time"*/}
      {/*      id="time-picker"*/}
      {/*      step="1"*/}
      {/*      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<Button onClick={onSubmit}>Créer l&#39;intervention</Button>*/}
    </DialogContent>
  );
}
