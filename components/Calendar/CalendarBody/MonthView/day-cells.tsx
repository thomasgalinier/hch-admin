import { ICalendarCell, IEvent } from "@/components/Calendar/schema";
import { useMemo } from "react";
import { getMonthCellEvents } from "@/components/Calendar/tools";
import { motion } from "framer-motion";
import {DroppableArea} from "@/components/Calendar/dnd/droppable-area";
import {staggerContainer, transition} from "@/components/Calendar/animation";
import {cn} from "@/lib/utils";
import {isToday} from "date-fns";
import {EventBullet} from "@/components/Calendar/CalendarBody/MonthView/event-bullet";

interface IProps {
  cells: ICalendarCell;
  events: IEvent[];
  eventPositions: Record<string, number>;
}

export function DayCells({ cells, events, eventPositions }: IProps) {
  const { day, currentMonth, date } = cells;
  const cellEvents = useMemo(
    () => getMonthCellEvents(date, events, eventPositions),
    [date, events, eventPositions],
  );
  const isSunday = date.getDay() === 0;

  return(
      <motion.div
          className={cn(
              "flex flex-col gap-1 border-l border-t py-1.5",
              isSunday && "border-l-0"
          )}
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          transition={transition}
      >
        <DroppableArea date={date}>
          <motion.span
              className={cn(
                  "h-6 w-6 px-1 flex translate-x-1 items-center justify-center rounded-full text-xs font-semibold lg:px-2 mb-1", // mb-0.5 here, always applied
                  !currentMonth && "text-muted-foreground",
                  isToday(date) && " bg-primary text-primary-foreground"
              )}
              whileHover={{ scale: 1.1 }}
              transition={transition}
          >
            {day}
          </motion.span>
          <motion.div
              className={cn(
                  "flex h-6 gap-1 px-2 lg:min-h-[94px] lg:flex-col lg:gap-2 lg:px-0",
                  !currentMonth && "opacity-50"
              )}
              variants={staggerContainer}
          >
            {[0, 1, 2].map((position) => {
              const event = cellEvents.find((e) => e.position === position);
              const eventKey = event
                  ? `event-${event.id}-${position}`
                  : `empty-${position}`;

              return (
                  <motion.div
                      key={eventKey}
                      className="lg:flex-1"
                      initial={{opacity: 0, x: -10}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: position * 0.1, ...transition}}
                  >
                    {event && (
                        <>
                          <EventBullet className="lg:hidden" color={event.color}/>
                          <MonthEventBadge
                              className="hidden lg:flex"
                              event={event}
                              cellDate={startOfDay(date)}
                          />
                        </>
                    )}
                  </motion.div>
              );
            })}
          </motion.div>
        </DroppableArea>
      </motion.div>
  )
}
