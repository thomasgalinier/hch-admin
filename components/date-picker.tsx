import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";

interface DateTimePickerProps {
    value: Date; // La valeur de la date, c'est une prop optionnelle
    onChange: (date: Date) => void; // Fonction pour envoyer la nouvelle valeur au parent
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    console.log(value)


    const hours = Array.from({ length: 23 }, (_, i) => i + 1);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            onChange(selectedDate); // Mettre à jour la date dans le formulaire
        }
    };
    const handleTimeChange = (type: "hour" | "minute", newValue: string) => {
        if (newValue && newValue !== "") {
            // Utiliser "value" comme base. Si "value" est invalide, initialiser avec la date actuelle.
            const baseDate = value instanceof Date && !isNaN(value.getTime()) ? value : new Date();

            // Créer une copie de baseDate pour éviter la mutation directe
            const updatedDate = new Date(baseDate);

            if (type === "hour") {
                updatedDate.setHours(parseInt(newValue, 10)); // Mettre à jour l'heure
            } else if (type === "minute") {
                updatedDate.setMinutes(parseInt(newValue, 10)); // Mettre à jour les minutes
            }

            // Appeler onChange avec la nouvelle date mise à jour
            onChange(updatedDate);
        }
    };
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "MM/dd/yyyy hh:mm") : <span>MM/DD/YYYY hh:mm</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="sm:flex">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={handleDateSelect}
                        initialFocus
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex items-center sm:flex-col p-2">
                                <div>H</div>
                                {hours.map((hour) => (
                                    <Button
                                        key={hour}
                                        size="icon"
                                        variant={value && value.getHours() % 12 === hour % 12 ? "default" : "ghost"}
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() => handleTimeChange("hour", hour.toString())}
                                    >
                                        {hour}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="sm:hidden" />
                        </ScrollArea>
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex items-center sm:flex-col p-2">
                                <div>mm</div>
                                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (

                                    <Button
                                        key={minute}
                                        size="icon"
                                        variant={value && value.getMinutes() === minute ? "default" : "ghost"}
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() => handleTimeChange("minute", minute.toString())}
                                    >
                                        {minute}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="sm:hidden" />
                        </ScrollArea>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
