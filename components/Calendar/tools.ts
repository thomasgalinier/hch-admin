import { ICalendarCell, IEvent, TCalendarView } from "./schema";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
  isValid,
  differenceInDays,
  eachDayOfInterval,
} from "date-fns";
import { fr } from "date-fns/locale";
import { IIntervention } from "@/schema/intervention";

const FORMAT_STRING = "MMM d, yyyy";

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export function navigateDate(
  date: Date,
  view: TCalendarView,
  direction: "previous" | "next",
): Date {
  const operation: Record<TCalendarView, (d: Date, n: number) => Date> = {
    month: direction === "next" ? addMonths : subMonths,
    week: direction === "next" ? addWeeks : subWeeks,
    day: direction === "next" ? addDays : subDays,
    year: direction === "next" ? addYears : subYears,
    agenda: direction === "next" ? addMonths : subMonths,
  };
  return operation[view](date, 1);
}

export function rangeText(view: TCalendarView, date: Date): string {
  let start: Date;
  let end: Date;

  switch (view) {
    case "month":
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;
    case "week":
      start = startOfWeek(date);
      end = endOfWeek(date);
      break;
    case "day":
      return format(date, FORMAT_STRING, { locale: fr });
    case "year":
      start = startOfYear(date);
      end = endOfYear(date);
      break;
    case "agenda":
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;
    default:
      return "Error while formatting";
  }
  return `${format(start, FORMAT_STRING, { locale: fr })} - ${format(end, FORMAT_STRING, { locale: fr })}`;
}
