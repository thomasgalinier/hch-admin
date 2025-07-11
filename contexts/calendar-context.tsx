"use client";
import { createContext, useContext, useState } from "react";

interface ICalendarContext {
  currentDate: Date;
  handlePrevDate: () => void;
  handleNextDate: () => void;
  getViewTitle: () => string;
  handleToday: () => void;
  navigateDate: (direction: "prev" | "next") => void;
  view: ViewType;
  handleViewChange: (newView: ViewType) => void;
  handleUserChange?: (userId: string) => void;
  selectedUser?: string;
}
type ViewType = "month" | "week" | "day" | "list";
const CalendarContext = createContext({} as ICalendarContext);
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
export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>("month");
  const [selectedUser, setSelectedUser] = useState<string>("all");

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);

    switch (view) {
      case "month":
        newDate.setMonth(
          currentDate.getMonth() + (direction === "next" ? 1 : -1),
        );
        break;
      case "week":
        newDate.setDate(
          currentDate.getDate() + (direction === "next" ? 7 : -7),
        );
        break;
      case "day":
        newDate.setDate(
          currentDate.getDate() + (direction === "next" ? 1 : -1),
        );
        break;
    }

    setCurrentDate(newDate);
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
  const handlePrevDate = () => {
    navigateDate("prev");
  };
  const handleNextDate = () => {
    navigateDate("next");
  };
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  const handleViewChange = (newView: ViewType) => {
    setView(newView);
  };
  const handleUserChange = (userId: string) => {
    setSelectedUser(userId);
  };
  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        handlePrevDate,
        handleNextDate,
        getViewTitle,
        handleToday,
        navigateDate,
        view,
        handleViewChange,
        handleUserChange,
        selectedUser,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within a CalendarProvider.");
  return context;
}
