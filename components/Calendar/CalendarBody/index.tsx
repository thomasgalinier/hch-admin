import { motion } from "framer-motion";
import { useCalendar } from "@/components/Calendar/contexts/calendar-context";
import {fadeIn, transition} from "@/components/Calendar/animation";
import {CalendarMonthView} from "@/components/Calendar/CalendarBody/MonthView/calendar-month-view";

export function CalendarBody() {
  const { view } = useCalendar();
  return (
    <div className="w-full h-full overflow-scroll relative">
      <motion.div key={view} initial="initial" animate="animate" exit="exit" variants={fadeIn} transition={transition}>
          {view === "month" && (
              <CalendarMonthView />
          )}
      </motion.div>
    </div>
  );
}
