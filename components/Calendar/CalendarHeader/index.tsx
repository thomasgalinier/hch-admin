import { TodayButton } from "@/components/Calendar/CalendarHeader/today-button";
import DateNavigator from "@/components/Calendar/CalendarHeader/date-navigator";

import { Columns2, Grid, LayoutList, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendar } from "@/contexts/calendar-context";
import { ViewType } from "@/schema/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserSelect } from "@/components/Calendar/CalendarHeader/user-select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DialogIntervention from "@/components/Calendar/DialogIntervention";

const viewList: ViewType[] = ["month", "week", "day", "list"];
export function CalendarHeader() {
  const { view, handleViewChange } = useCalendar();

  return (
    <div className="flex  gap-2 justify-between w-full ">
      <div className="flex flex-col gap-2">
        <TodayButton />
        <DateNavigator />
      </div>
      <div className="flex gap-4 ">
        <UserSelect />
        <div className="flex rounded-lg border border-border overflow-hidden h-fit">
          {viewList.map((viewType) => (
            <Tooltip key={viewType}>
              <TooltipTrigger>
                <Button
                  key={viewType}
                  variant={viewType === view ? "default" : "ghost"}
                  onClick={() => handleViewChange(viewType)}
                >
                  {viewType === "month" && <Grid />}
                  {viewType === "week" && <Columns2 />}
                  {viewType === "day" && <LayoutList />}
                  {viewType === "list" && <List />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {viewType === "month" && "Mois"}
                {viewType === "week" && "Semaine"}
                {viewType === "day" && "Jour"}
                {viewType === "list" && "Liste"}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>Créer une intervention</Button>
            </DialogTrigger>
            <DialogIntervention />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
