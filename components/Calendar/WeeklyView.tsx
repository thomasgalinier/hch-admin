import { useEffect, useState } from "react";
import { addDays, format, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { WeeklyDateType } from "@/components/Calendar/shema";
type WeeklyProps = {
  currentDate: Date;
  hours: string[];
};
const WeeklyView = (props: WeeklyProps) => {
  const { currentDate, hours } = props;
  const [weeksDays, setWeeksDays] = useState<WeeklyDateType[]>([]);

  useEffect(() => {
    const startOfTheWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(startOfTheWeek, i);
      days.push({
        date: day,
        formattedDateString: format(day, "EE", { locale: fr }),
        formattedDate: format(day, "dd", { locale: fr }),
      });
    }

    setWeeksDays(days);
  }, [currentDate]);
  return (
      <div className="flex flex-col h-[88vh] overflow-auto">
        <div className="flex sticky top-0 bg-accent">
          <div className="w-16"></div>
          {weeksDays.map((day, index) => (
              <div key={index} className="flex-1 text-center p-2">
                <span className="text-sm font-medium">{day.formattedDateString}</span>
                <span className="text-lg font-semibold">{day.formattedDate}</span>
              </div>
          ))}
        </div>

        <div className="flex">
          <div className="flex flex-col w-16">
            {hours.map((hour, index) => (
                <span key={index} className="h-16 flex items-center justify-center text-sm text-gray-500">
                  {hour}
                </span>
            ))}
          </div>

          <div className="flex flex-1">
            {weeksDays.map((_, dayIndex) => (
                <div key={dayIndex} className="flex-1 flex flex-col">
                  {hours.map((_, hourIndex) => (
                      <div key={hourIndex} className="h-16 border border-gray-300 hover:bg-gray-100">
                      </div>
                  ))}
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default WeeklyView;
