


import { Calendar } from "@/components/Calendar";
import { CalendarProvider } from "@/contexts/calendar-context";

export default function InterventionsPage() {
    return (
        <main className="p-4">
          <CalendarProvider>
            <Calendar />
          </CalendarProvider>
        </main>
    );
}