// "use client";
// import { CalendarProvider } from "@/components/Calendar/contexts/calendar-context";
// import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
// import { useQuery } from "@tanstack/react-query";
// import { getTechnicien } from "@/service/auth";
// import { useCookies } from "react-cookie";
// import { CalendarBody } from "@/components/Calendar/CalendarBody";
// import { DragDropProvider } from "@/components/Calendar/contexts/drag-drop-context";
//
// export default function Calendar() {
//   const [cookies] = useCookies(["token"]);
//
//   const { data: technicienData = [] } = useQuery({
//     queryFn: () => getTechnicien(cookies.token),
//     queryKey: ["technicien"],
//   });
//
//   return (
//     <DragDropProvider>
//       <CalendarProvider users={technicienData}>
//         <div className="w-full">
//           <CalendarHeader />
//           <CalendarBody />
//         </div>
//       </CalendarProvider>
//     </DragDropProvider>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TodayButton } from "@/components/Calendar/CalendarHeader/today-button";
import DateNavigator from "@/components/Calendar/CalendarHeader/date-navigator";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { ViewType } from "@/schema/calendar";
import { useCalendar } from "@/contexts/calendar-context";

type Event = {
  id: string;
  title: string;
  date: Date;
  time?: string;
  color: string;
  description?: string;
  duree?: string;
};

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Réunion équipe",
    date: new Date(2024, 11, 15),
    time: "09:00",
    color: "bg-blue-500",
    description: "Réunion hebdomadaire de l'équipe",
    duree: "01:00"
  },
  {
    id: "2",
    title: "Présentation client",
    date: new Date(2025, 6, 18),
    time: "14:12",
    color: "bg-green-500",
    description: "Présentation du projet au client",
    duree: "01:00"
  },
  {
    id: "2",
    title: "Présentation client",
    date: new Date(2025, 6, 18),
    time: "14:12",
    color: "bg-green-500",
    description: "Présentation du projet au client",
    duree: "01:00"
  },
  {
    id: "3",
    title: "Formation",
    date: new Date(2024, 11, 20),
    time: "10:00",
    color: "bg-purple-500",
    description: "Formation sur les nouvelles technologies",
  },
  {
    id: "4",
    title: "Déjeuner d'affaires",
    date: new Date(2024, 11, 22),
    time: "12:00",
    color: "bg-orange-500",
    description: "Déjeuner avec les partenaires",
    duree: "01:00"
  },
  {
    id: "5",
    title: "Conférence",
    date: new Date(2024, 11, 25),
    time: "09:30",
    color: "bg-red-500",
    description: "Conférence sur l'innovation",
    duree: "01:00"
  },
];

export function Calendar() {
  const { currentDate, view } = useCalendar();
  const [events] = useState<Event[]>(sampleEvents);
  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // Met à jour toutes les 30 secondes

    return () => clearInterval(timer);
  }, []);

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const dayNamesFull = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString(),
    );
  };

  const getCurrentTimePosition = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const hourHeight = 60;
    const position = hours * hourHeight + (minutes / 60) * hourHeight;
    return position;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const renderMonthView = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayEvents = getEventsForDate(currentDateObj);
      const isCurrentMonth =
        currentDateObj.getMonth() === currentDate.getMonth();
      const isToday =
        currentDateObj.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={i}
          className={`min-h-[120px] border border-border p-2 ${
            isCurrentMonth ? "bg-background" : "bg-muted opacity-50"
          } ${isToday ? "" : ""}`}
        >
          <div
            className={`text-sm font-medium mb-1 ${
              isCurrentMonth ? "text-foreground" : "text-muted-foreground"
            } ${isToday ? "bg-primary w-fit p-2 rounded-full text-white" : ""}`}
          >
            {currentDateObj.getDate()}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                title={event.title}
              >
                {event.time && (
                  <span className="font-medium">{event.time}</span>
                )}{" "}
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 3} autres
              </div>
            )}
          </div>
        </div>,
      );

      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
        {dayNames.map((day) => (
          <div
            key={day}
            className="bg-muted p-3 text-center font-medium text-sm"
          >
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 bg-muted">
          <div className="p-3 text-center font-medium text-sm">Heure</div>
          {weekDays.map((day, index) => (
            <div key={index} className="p-3 text-center">
              <div className="font-medium text-sm">
                {dayNames[day.getDay()]}
              </div>
              <div
                className={`text-lg ${
                  day.toDateString() === new Date().toDateString()
                    ? "bg-primary p-2 rounded-full text-white"
                    : "text-foreground"
                }`}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="max-h-[600px] overflow-y-auto relative">
          {/* Barre de l'heure actuelle */}
          {weekDays.some((day) => isToday(day)) && (
            <div
              className="absolute left-0 right-0 z-10 pointer-events-none"
              style={{ top: `${getCurrentTimePosition()}px` }}
            >
              <div className="flex items-center">
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-l font-medium min-w-[60px] shadow-lg">
                  {currentTime.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="h-0.5 bg-red-500 flex-1 shadow-sm"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full -ml-1"></div>
              </div>
            </div>
          )}

          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-t border-border">
              <div className="p-2 text-xs text-muted-foreground border-r border-border">
                {hour.toString().padStart(2, "0")}:00
              </div>
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDate(day).filter((event) => {
                  if (!event.time) return false;
                  const eventHour = Number.parseInt(event.time.split(":")[0]);
                  return eventHour === hour;
                });

                return (
                  <div
                    key={dayIndex}
                    className="p-1 h-[60px] border-r border-border relative"
                  >
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded text-white mb-1 ${event.color}`}
                      >
                        <div className="font-medium">{event.time}</div>
                        <div className="truncate">{event.title}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {dayNamesFull[currentDate.getDay()]} {currentDate.getDate()}{" "}
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Badge variant="secondary">{dayEvents.length} événement(s)</Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto relative">
            {/* Barre de l'heure actuelle */}
            {isToday(currentDate) && (
              <div
                className="absolute left-0 right-0 z-10 pointer-events-none"
                style={{ top: `${getCurrentTimePosition()}px` }}
              >
                <div className="flex items-center">
                  <div className="w-20"></div>
                  <div className="flex items-center flex-1">
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium shadow-lg">
                      {currentTime.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="h-0.5 bg-red-500 flex-1 ml-2 shadow-sm"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full -ml-1"></div>
                  </div>
                </div>
              </div>
            )}

            {hours.map((hour) => {
              const hourEvents = dayEvents.filter((event) => {
                if (!event.time) return false;
                const eventHour = Number.parseInt(event.time.split(":")[0]);
                return eventHour === hour;
              });

              return (
                <div key={hour} className="flex border-t border-border">
                  <div className="w-20 p-3 text-sm text-muted-foreground border-r border-border">
                    {hour.toString().padStart(2, "0")}:00
                  </div>
                  <div className="flex-1 p-3 h-[60px] relative">
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`p-3 rounded-lg text-white mb-2 ${event.color}`}
                      >
                        <div className="font-medium text-sm">
                          {event.time} - {event.title}
                        </div>
                        {event.description && (
                          <div className="text-xs opacity-90 mt-1">
                            {event.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const sortedEvents = [...events].sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );

    return (
      <div className="space-y-4">
        {sortedEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${event.color}`}
                    ></div>
                    <h3 className="font-medium text-lg">{event.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {event.date.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {event.time && ` à ${event.time}`}
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const getViewTitle = () => {
    switch (view) {
      case "month":
        return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      case "week":
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      case "day":
        return `${dayNamesFull[currentDate.getDay()]} ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      case "list":
        return "Liste des événements";
    }
  };

  return (
    <div className="h-full">
        <CalendarHeader />
      <div>
        {view === "month" && renderMonthView()}
        {view === "week" && renderWeekView()}
        {view === "day" && renderDayView()}
        {view === "list" && renderListView()}
      </div>
    </div>
  );
}
