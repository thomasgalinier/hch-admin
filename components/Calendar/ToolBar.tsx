import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ViewType } from "@/components/Calendar/shema";

interface ToolBarProps {
  setView: (view: ViewType) => void;
  view: "day" | "week" | "month";
  toolbarInfo: (view: ViewType) => string;
  goNext: () => void;
  goBack: () => void;
  goToday: () => void;
}

const ToolBar = (props: ToolBarProps) => {
  const { setView, view, toolbarInfo, goNext, goBack, goToday } = props;
  const handleViewChange = (view: ViewType) => {
    setView(view);
  };
  const toto = toolbarInfo(view);
  console.log(toto)
  return (
    <div className="flex justify-between">
      <div className='flex items-center gap-2'>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={goBack}>
          <ChevronLeft />
        </Button>
        <Button variant="secondary" onClick={goToday}>Aujourd&apos;hui</Button>
        <Button variant="ghost" onClick={goNext}>
          <ChevronRight />
        </Button>
      </div>
        <div className='text-xl'>{toolbarInfo(view)}</div>
    </div>
      <div className="flex gap-2">
        <div className='flex gap-2'>
          <Button variant='secondary'>Créer un modéle</Button>
          <Button>Créer un evénement</Button>
        </div>
        <div>
          <Button
            variant={view === "day" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("day")}
          >
            Jour
          </Button>
          <Button
            variant={view === "week" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("week")}
          >
            Semaine
          </Button>
          <Button
            variant={view === "month" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("month")}
          >
            Mois
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
