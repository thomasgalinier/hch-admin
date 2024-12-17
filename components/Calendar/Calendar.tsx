import ToolBar from "@/components/Calendar/ToolBar";
import { useEffect, useState } from "react";
import WeeklyView from "@/components/Calendar/WeeklyView";
import { ViewType } from "@/components/Calendar/shema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPlanningsByTechnicien } from "@/components/Calendar/service";
import { getTechnicien } from "@/service/auth";
import { useCookies } from "react-cookie";

const Calendar = () => {
  const [view, setView] = useState<ViewType>("week");
  const [cookies] = useCookies(["token"]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [technicienId, setTechnicienId] = useState<string>("");

  const { data: technicienData = [], isFetched } = useQuery({
    queryFn: () => getTechnicien(cookies.token),
    queryKey: ["technicien"],
  });
  useEffect(() => {
    if (isFetched) {
      setTechnicienId(technicienData[0].id);
    }
  }, [isFetched, technicienData]);
  const hours = Array.from({ length: 24 }, (_, index) => `${index}:00`);

  const { data: planningData = [], refetch: refetchPlanning } = useQuery({
    queryFn: () => getPlanningsByTechnicien(technicienId),
    queryKey: ["planning", technicienId],
  });
  console.log(planningData);
  const toolbarInfo = (view: ViewType) => {
    if (view === "day") {
      return currentDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } else if (view === "week" || "month") {
      return currentDate.toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
      });
    }
    return currentDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const goNext = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (view === "day") {
        newDate.setDate(newDate.getDate() + 1);
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() + 7);
      } else if (view === "month") {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };
  const goToday = () => {
    setCurrentDate(new Date());
  };
  const goBack = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (view === "day") {
        newDate.setDate(newDate.getDate() - 1);
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() - 7);
      } else if (view === "month") {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };
  return (
    <div>
      <ToolBar
        setView={setView}
        view={view}
        toolbarInfo={toolbarInfo}
        goNext={goNext}
        goBack={goBack}
        goToday={goToday}
        technicienId={technicienId}
        setTechnicienId={setTechnicienId}
        refetchPlanning={refetchPlanning}
      />
      {view === "week" && (
        <WeeklyView currentDate={currentDate} hours={hours} />
      )}
    </div>
  );
};

export default Calendar;
