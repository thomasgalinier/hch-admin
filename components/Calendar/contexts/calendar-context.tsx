"use client";
import { TCalendarView } from "@/components/Calendar/schema";
import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { UserType } from "@/schema";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getForfait } from "@/service/forfait";
import { useCookies } from "react-cookie";
import { ForfaitType } from "@/schema/forfait";
import { getClient } from "@/service/auth";
import {getZone} from "@/service/carte";
import { zoneGeoSchema } from "@/schema/carte";

interface ICalendarContext {
  selectedDate: Date;
  setSelectedDate: (date: Date | undefined) => void;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  users: UserType[];
  selectedUserId: UserType["id"] | "all";
  badgeVariant: "dot" | "colored";
  setBadgeVariant: (variant: "dot" | "colored") => void;
  forfaits: UseQueryResult<ForfaitType[], Error>;
  clients: UseQueryResult<UserType[], Error>;
  zoneGeo: UseQueryResult<zoneGeoSchema>
}
interface CalendarSettings {
  badgeVariant: "dot" | "colored";
  view: TCalendarView;
  use24HourFormat: boolean;
  agendaModeGroupBy: "date" | "color";
  selectedUserId?: UserType["id"] | "all";
}

const DEFAULT_SETTINGS: CalendarSettings = {
  badgeVariant: "colored",
  view: "day",
  use24HourFormat: true,
  agendaModeGroupBy: "date",
};

const CalendarContext = createContext({} as ICalendarContext);
export function CalendarProvider({
  children,
  users,
  view = "day",
  badge = "colored",
}: {
  children: React.ReactNode;
  users: UserType[];
  view?: TCalendarView;
  badge?: "dot" | "colored";
}) {
  const [settings, setSettings] = useLocalStorage<CalendarSettings>(
    "calendarSettings",
    {
      ...DEFAULT_SETTINGS,
      badgeVariant: badge,
      view: view,
    },
  );
  const [cookies] = useCookies(["token"]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [badgeVariant, setBadgeVariantState] = useState<"dot" | "colored">(
    settings.badgeVariant,
  );
  const [currentView, setCurrentViewState] = useState<TCalendarView>(
    settings.view,
  );
  const [selectedUserId, setSelectedUserId] = useState<UserType["id"] | "all">(
    "all",
  );
  const forfaits: UseQueryResult<ForfaitType[], Error> = useQuery({
    queryFn: () => getForfait(cookies.token),
    queryKey: ["forfaits"],
  });
  const clients: UseQueryResult<UserType[], Error> = useQuery({
    queryFn: () => getClient(cookies.token),
    queryKey: ["client"],
  });
  const zoneGeo = useQuery({
    queryFn: () => getZone(cookies.token),
    queryKey: ["zone"],
  })
  const updateSettings = (newPartialSettings: Partial<CalendarSettings>) => {
    setSettings({
      ...settings,
      ...newPartialSettings,
    });
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };
  const setBadgeVariant = (variant: "dot" | "colored") => {
    setBadgeVariantState(variant);
    updateSettings({ badgeVariant: variant });
  };
  const setView = (newView: TCalendarView) => {
    setCurrentViewState(newView);
    updateSettings({ view: newView });
  };

  const value = {
    selectedDate,
    setSelectedDate: handleSelectDate,
    view: currentView,
    setView,
    users,
    selectedUserId,
    badgeVariant,
    setBadgeVariant,
    forfaits,
    clients,
    zoneGeo
  };
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
