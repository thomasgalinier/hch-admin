"use client";



import React, {useState, useEffect, useMemo} from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {eventSchema, ModelType} from "@/schema/calendar";
import {createPlanning, deleteEvent, getModels, getPlanningByTechnicien, updateEvent} from "@/service/calendar";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger} from "@/components/ui/select";
import {DateTimePicker} from "@/components/date-picker";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {useCookies} from "react-cookie";
import {getTechnicien} from "@/service/auth";
import {UserType} from "@/schema";
import {z} from "zod";
import {DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";

const Calendar: React.FC = () => {
    const [cookies] = useCookies(['token']);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
    const [technicienValue, setTechnicienValue] = useState<string | undefined>(undefined);
    const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);

    const form = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            id_technicien: "",
            id_model: "",
            debut: new Date(),
            fin: new Date(),
        },
    })
    const { data: modelData = [] } = useQuery({
        queryFn: () => getModels(),
        queryKey: ["model"],
    });
    const { data: technicienData = [] } = useQuery({
        queryFn: () => getTechnicien(cookies.token),
        queryKey: ["technicien"],
    })
    const { data: planningData = [], refetch } = useQuery({
        queryFn: () => getPlanningByTechnicien(technicienValue),
        queryKey: ["planning", technicienValue],
        enabled: !!technicienValue,
    })
    console.log(planningData);
    const mutation = useMutation({
        mutationFn: createPlanning,
        mutationKey: ['planning'],
        onSuccess: (data) => {
            if (data.error) {
                console.log(data)
                return;
            }
            console.log(data)
        }
    })
    const mutationUpdate = useMutation({
        mutationFn: updateEvent,
        mutationKey: ['planning'],
        onSuccess: (data) => {
            if (data.error) {
                console.log(data)
                return;
            }
            refetch()
            console.log(data)
        }
    });
    const mutationDelete = useMutation({
        mutationFn: deleteEvent,
        mutationKey: ['planning'],
        onSuccess: (data) => {
            if (data.error) {
                console.log(data)
                return;
            }
            refetch()
            console.log(data)
        }
    })

    const handleDeleteEvent = (id: string) => {
        mutationDelete.mutate(id);
    }

    const handleSelect = () => {
        setDialogMode("create");
        setIsDialogOpen(true);
    };

    const handleEventClick = (selected: EventClickArg) => {
        setDialogMode("update");
        // @ts-ignore
        setSelectedEvent(selected.event.extendedProps);

        form.reset({
            id_model: selected.event.extendedProps.id_model,
            id_technicien: selected.event.extendedProps.id_technicien,
            debut: new Date(selected.event.start!),
            fin: new Date(selected.event.end!),
        });
        setIsDialogOpen(true);
    };


    const handleSubmit = (data: z.infer<typeof eventSchema>) => {
        const {debut, id_model} = data;
        const duree = modelData.find((model: ModelType) => model.id === id_model)?.duree
        const debutDate = new Date(debut);
        const fin = new Date(debutDate.getTime() + duree);
        const allData = {...data, fin}
        if (dialogMode === "create") {
            mutation.mutate(allData);

        }else {

            // @ts-ignore
            mutationUpdate.mutate({allData, selectedEvent});
        }
        setIsDialogOpen(false);
    }
    const calendarEvents = useMemo(() => {
        return planningData.map((event: {id: string, title: string, debut: Date, fin: Date, id_model: string, id_technicien: string}) => ({
            id: event.id,
            title: modelData.find((model: ModelType) => model.id === event.id_model)?.nom || "Inconnu",
            start: event.debut,
            end: event.fin,
            extendedProps: { ...event },
        }));
    }, [planningData, modelData]);



    // @ts-ignore
    return (
        <div>
            <div className="flex w-full px-10 justify-start items-start gap-8">
                <div className="w-full mt-8">
                    <Select value={technicienValue} onValueChange={(value) => setTechnicienValue(value)}>
                        <SelectTrigger>

                                {technicienValue?
                            <div className="flex items-center gap-2">
                                    <Avatar className="size-7">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${technicienData.find((technicien: UserType) => technicien.id === technicienValue)?.nom}${technicienData.find((technicien: UserType) => technicien.id === technicienValue)?.prenom}`}
                                    />
                                </Avatar>
                                {technicienData.find((technicien: UserType) => technicien.id === technicienValue)?.nom}.{technicienData.find((technicien: UserType) => technicien.id === technicienValue)?.prenom}
                            </div>: 'Séléctionnez un technicien'
                                }
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                { technicienData.map((technicien: UserType) => (
                                    <SelectItem
                                        key={technicien.id}
                                        value={technicien.id ?? ""}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Avatar className="size-7">
                                                <AvatarImage
                                                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${technicien.nom}${technicien.prenom}`}
                                                />
                                            </Avatar>
                                            {technicien.nom}.{technicien.prenom}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FullCalendar
                        height={"85vh"}
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} // Initialize calendar with required plugins.
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                        }}
                        weekends={false} // Hide weekends.
                        locale={frLocale} // Set French as the default locale.
                        initialView="timeGridWeek" // Initial view mode of the calendar.
                        editable={true} // Allow events to be edited.
                        selectable={true} // Allow dates to be selectable.
                        selectMirror={true} // Mirror selections visually.
                        dayMaxEvents={true} // Limit the number of events displayed per day.
                        select={handleSelect} // Handle date selection to create new events.
                        eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
                        
                        events={calendarEvents}
                    />
                </div>
            </div>

            {/* Dialog for adding new events */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un nouvel évenement</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="flex flex-col gap-2">
                                <FormField control={form.control} name="id_model" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Modéle</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    {modelData.find(
                                                        (model: ModelType) => model.id === field.value,
                                                    )?.nom || "Sélectionnez un modéle"}
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {modelData.map((model: ModelType) => (
                                                            <SelectItem
                                                                key={model.id}
                                                                value={model.id ?? ""}
                                                            >
                                                                {model.nom}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name='id_technicien' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Technicien</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    {field.value ? (
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="size-7">
                                                                <AvatarImage
                                                                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${technicienData.find((technicien: UserType) => technicien.id === field.value)?.nom}${technicienData.find((technicien: UserType) => technicien.id === field.value)?.prenom}`}
                                                                />
                                                            </Avatar>
                                                            {technicienData.find((technicien: UserType) => technicien.id === field.value)?.nom}.{technicienData.find((technicien: UserType) => technicien.id === field.value)?.prenom}
                                                        </div>
                                                    ) : 'Séléctionnez un technicien'}
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {technicienData.map((technicien: UserType) => (
                                                            <SelectItem
                                                                key={technicien.id}
                                                                value={technicien.id ?? ""}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <Avatar className="size-7">
                                                                        <AvatarImage
                                                                            src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${technicien?.nom}${technicien?.prenom}`}
                                                                        />
                                                                    </Avatar>
                                                                    {technicien.nom}.{technicien.prenom}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}/>
                                <FormField
                                    control={form.control}
                                    name="debut"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date et Heure</FormLabel>
                                            <FormControl>
                                                <DateTimePicker
                                                    value={field.value}
                                                    onChange={(date: Date) => field.onChange(date)}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">{dialogMode === "create"  ? 'Créer un évenement': "Modifier l'évenement"}</Button>
                                {dialogMode === "update" && (
                                    // @ts-ignore
                                    <Button variant="destructive" onClick={() => handleDeleteEvent(selectedEvent.id)}>Supprimer l&#39;évenement</Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Calendar; // Export the Calendar component for use in other parts of the application.