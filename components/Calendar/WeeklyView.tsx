import {useEffect, useState} from "react";
import {addDays, format, startOfWeek} from "date-fns";
import {fr} from "date-fns/locale";
type WeeklyProps = {
    currentDate: Date;
}
const WeeklyView = (props: WeeklyProps) => {
    const {currentDate} = props;
    const [weeksDays, setWeeksDays] = useState<Date[]>([]);

    useEffect(() => {
        // Calcul du premier jour de la semaine
        const startOfTheWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // Lundi comme premier jour de la semaine
        const days = [];

        // Génère les 7 jours de la semaine à partir de startOfTheWeek
        for (let i = 0; i < 7; i++) {
            const day = addDays(startOfTheWeek, i);
            days.push({
                date: day,
                formattedDate: format(day, 'EEEE dd MMMM', { locale: fr })
            });
        }

        setWeeksDays(days);
    }, [currentDate]);
    console.log(weeksDays)
    return (
        <div>

        </div>
    )
}

export default WeeklyView;