"use client";
import { motion } from "framer-motion";
import {
  buttonHover,
  slideFromLeft,
  slideFromRight,
  transition,
} from "@/components/Calendar/animation";
import { TodayButton } from "@/components/Calendar/CalendarHeader/today-button";
import { useCalendar } from "@/components/Calendar/contexts/calendar-context";
import DateNavigator from "@/components/Calendar/CalendarHeader/date-navigator";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarRange,
  Columns,
  Grid2X2,
  Grid3X3,
  LayoutList,
  List,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ButtonGroup } from "@/components/button-group";
import { UserSelect } from "@/components/Calendar/CalendarHeader/user-select";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogIntervention from "@/components/Calendar/DialogIntervention";

const MotionButton = motion.create(Button);
export function CalendarHeader() {
  const { view, setView } = useCalendar();
  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <motion.div
        className="flex gap-2 items-center"
        initial="initial"
        animate="animate"
        transition={transition}
        variants={slideFromLeft}
      >
        <TodayButton />
        <DateNavigator view={view} />
      </motion.div>
      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-1.5"
        variants={slideFromRight}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <div className="options flex items-center gap-4 md:gap-2">
          <MotionButton
            variant="outline"
            onClick={() => setView("agenda")}
            asChild
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            <Toggle className="relative">
              {view === "agenda" ? (
                <Tooltip>
                  <TooltipTrigger>
                    <CalendarRange />
                    <span className="absolute -top-1 -right-1 size-3 rounded-full bg-green-500"></span>
                  </TooltipTrigger>
                  <TooltipContent>Vue Agenda active</TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger>
                    <LayoutList />
                  </TooltipTrigger>
                  <TooltipContent>Vue Agenda</TooltipContent>
                </Tooltip>
              )}
            </Toggle>
          </MotionButton>
          <Separator orientation="vertical" className="h-6" />
          <ButtonGroup>
            <MotionButton
              variant={view === "day" ? "default" : "outline"}
              aria-label="View by day"
              onClick={() => {
                setView("day");
              }}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <List className="h-4 w-4" />
            </MotionButton>

            <MotionButton
              variant={view === "week" ? "default" : "outline"}
              aria-label="View by week"
              onClick={() => setView("week")}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Columns className="h-4 w-4" />
            </MotionButton>

            <MotionButton
              variant={view === "month" ? "default" : "outline"}
              aria-label="View by month"
              onClick={() => setView("month")}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Grid3X3 className="h-4 w-4" />
            </MotionButton>
            <MotionButton
              variant={view === "year" ? "default" : "outline"}
              aria-label="View by year"
              onClick={() => setView("year")}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Grid2X2 className="h-4 w-4" />
            </MotionButton>
          </ButtonGroup>
        </div>
        <UserSelect />
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary">Crée une intervention</Button>
          </DialogTrigger>
          <DialogIntervention />
        </Dialog>
      </motion.div>
    </div>
  );
}
