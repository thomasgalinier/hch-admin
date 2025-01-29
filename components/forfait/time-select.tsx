import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

type TimeSelectProps = {
    name: 'titre' | 'type' | 'description' | 'duree' | 'categorie_velo' | 'prix';
    control: Control<{
        id: string;
        titre: string;
        type: string;
        description: string;
        duree: string;
        categorie_velo: string;
        prix: string;
    }>;
};

// Fonction pour générer les options horaires
const generateTimeOptions = () => {
    const times = [];
    const start = new Date(0, 0, 0, 0, 15, 0); // Début à 00:15
    const end = new Date(0, 0, 0, 7, 0, 0); // Fin à 07:00

    while (start <= end) {
        const hours = start.getHours().toString().padStart(2, "0");
        const minutes = start.getMinutes().toString().padStart(2, "0");
        times.push({ label: `${hours}:${minutes}` });
        start.setMinutes(start.getMinutes() + 15); // Incrément de 15 minutes
    }

    return times;
};

// Composant TimeSelect
export const TimeSelect = ({ name, control, ...props }: TimeSelectProps) => {
    const times = generateTimeOptions();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>Heure</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            {...props}
                            aria-label={`Sélectionner une heure pour ${name}`}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une heure" />
                            </SelectTrigger>
                            <SelectContent>
                                {times.map((time) => (
                                    <SelectItem key={time.label} value={time.label}>
                                        {time.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};
