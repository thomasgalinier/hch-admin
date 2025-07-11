import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { buttonHover, transition } from "@/components/Calendar/animation";
import {formatDate} from "date-fns";
import {fr} from "date-fns/locale";
import { useCalendar } from "@/contexts/calendar-context";

const MotionButton = motion.create(Button);
export function TodayButton() {
  const today = new Date();
  const { handleToday } = useCalendar();
  return (
    <MotionButton
      variant="outline"
      className="flex h-14 w-14 flex-col items-center justify-center p-0 text-center"
      variants={buttonHover}
      whileHover="hover"
      whileTap="tap"
      onClick={handleToday}
      transition={transition}
    >
      <motion.span
          className="w-full bg-primary py-1 text-xs font-semibold text-primary-foreground rounded-t-md"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, ...transition }}
      >
        {formatDate(today, "MMM", { locale: fr }).toUpperCase()}
      </motion.span>
      <motion.span
          className="text-lg font-bold"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, ...transition }}
      >
        {today.getDate()}
      </motion.span>
    </MotionButton>
  );
}
