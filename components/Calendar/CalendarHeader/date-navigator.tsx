import { TCalendarView } from "@/components/Calendar/schema";
import { AnimatePresence, motion } from "framer-motion";
import { buttonHover, transition } from "@/components/Calendar/animation";
import { useCalendar } from "@/components/Calendar/contexts/calendar-context";
import {capitalizeFirstLetter, navigateDate, rangeText} from "@/components/Calendar/tools";
import { formatDate } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  view: TCalendarView;
}
const MotionBadge = motion.create(Badge);
const MotionButton = motion.create(Button);
export default function DateNavigator({ view }: { view: TCalendarView }) {
  const { selectedDate, setSelectedDate } = useCalendar();
  const month = capitalizeFirstLetter(
    formatDate(selectedDate, "MMM", { locale: fr }),
  );
  const year = selectedDate.getFullYear();
  //TODO ajouter le nombre d'événements dynamique
  const eventCount = 10;

  const handlePrevious = () => {
    setSelectedDate(navigateDate(selectedDate, view, "previous"));
  };
  const handleNext = () => {
    setSelectedDate(navigateDate(selectedDate, view, "next"));
  };

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <motion.span
          className="text-lg font-semibold"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={transition}
        >
          {month} {year}
        </motion.span>
        <AnimatePresence mode="wait">
          <MotionBadge
            key={eventCount}
            variant="secondary"
            transition={transition}
          >
            {eventCount} évènement
          </MotionBadge>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2">
        <MotionButton
          variant="outline"
          size="icon"
          className="h-6 w-6"
          variants={buttonHover}
          onClick={handlePrevious}
          whileHover="hover"
          whileTap="tap"
        >
          <ChevronLeft className="h-4 w-4" />
        </MotionButton>
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {rangeText(view, selectedDate)}
        </motion.p>
        <MotionButton
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handleNext}
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
        >
          <ChevronRight className="h-4 w-4" />
        </MotionButton>
      </div>
    </div>
  );
}
