import { useCalendar } from "@/components/Calendar/contexts/calendar-context";
import { getCalendarCells } from "@/components/Calendar/tools";
import { motion } from "framer-motion";
import { staggerContainer, transition } from "@/components/Calendar/animation";

const WEEK_DAYS = ["DIM.", "LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM."];

export function CalendarMonthView() {
  const { selectedDate } = useCalendar();

  const cells = getCalendarCells(selectedDate);

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <div className="grid grid-cols-7">
        {WEEK_DAYS.map((day, index) => (
          <motion.div
            key={day}
            className="flex items-center justify-center py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, ...transition }}
          >
            <span className="text-xs font-medium text-t-quaternary">{day}</span>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-7 overflow-hidden">

      </div>
    </motion.div>
  );
}
