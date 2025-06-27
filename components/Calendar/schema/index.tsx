import {UserType} from "@/schema";

export type TCalendarView = "day" | "week" | "month" | "year" | "agenda";
export interface ICalendarCell {
    day: number;
    currentMonth: boolean;
    date: Date;
}
export interface IEvent {
    id: number;
    startDate: string;
    endDate: string;
    title: string;
    color: TEventColor;
    description: string;
    user: UserType;
}
export type TEventColor = "blue" | "green" | "red" | "yellow" | "purple" | "orange";
