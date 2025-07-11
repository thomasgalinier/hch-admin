import { AnimatePresence, motion } from "framer-motion";
import { formatDate } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "@/contexts/calendar-context";

export default function DateNavigator() {
  const { handlePrevDate, handleNextDate, getViewTitle, view } = useCalendar();
  return (
    <>
      {view !== "list" ? (
        <div className="flex  items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={handlePrevDate}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <p className="text-sm">{getViewTitle()}</p>

          <Button
            variant="outline"
            size="icon"
            className="w-6 h-6 p-0"
            onClick={handleNextDate}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <p className="text-sm">{getViewTitle()}</p>
      )}
    </>
  );
}
