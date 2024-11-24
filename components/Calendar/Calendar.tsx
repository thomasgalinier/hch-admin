import ToolBar from "@/components/Calendar/ToolBar";
import { useState } from "react";
import WeeklyView from "@/components/Calendar/WeeklyView";
import {ViewType} from "@/components/Calendar/shema";


const Calendar = () => {
    const [view, setView] = useState<ViewType>('week');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const hours = Array.from({ length: 24 }, (_, index) => `${index}:00`);
    const toolbarInfo = (view: ViewType) => {
        if (view === 'day') {
            return(
            currentDate.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }))
        } else if (view === 'week' || 'month') {
            return(
            currentDate.toLocaleDateString('fr-FR', {
                month: 'long',
                year: 'numeric'
            }))
        }
        return(
            currentDate.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }))
    }
    const goNext = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            if(view === 'day') {
                newDate.setDate(newDate.getDate() + 1);
            } else if (view === 'week') {
                newDate.setDate(newDate.getDate() + 7);
            } else if (view === 'month') {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        })
    }
    const goToday = () => {
        setCurrentDate(new Date());
    }
    const goBack = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            if(view === 'day') {
                newDate.setDate(newDate.getDate() - 1);
            } else if (view === 'week') {
                newDate.setDate(newDate.getDate() - 7);
            } else if (view === 'month') {
                newDate.setMonth(newDate.getMonth() - 1);
            }
            return newDate;
        })
    }
    console.log(currentDate)
    return (
        <div>
            <ToolBar setView={setView} view={view} toolbarInfo={toolbarInfo} goNext={goNext} goBack={goBack} goToday={goToday} />
            {view === 'week' && <WeeklyView currentDate={currentDate} hours={hours} />}
        </div>
    );
};

export default Calendar;