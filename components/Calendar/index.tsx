'use client';
import {CalendarProvider} from "@/components/Calendar/contexts/calendar-context";
import {CalendarHeader} from "@/components/Calendar/CalendarHeader";
import {useQuery} from "@tanstack/react-query";
import {getTechnicien} from "@/service/auth";
import {useCookies} from "react-cookie";

export default function Calendar() {
    const [cookies] = useCookies(["token"]);

    const { data: technicienData = [] } = useQuery({
        queryFn: () => getTechnicien(cookies.token),
        queryKey: ["technicien"],
    });
    console.log(technicienData);
    return (
        <CalendarProvider users={technicienData}>
            <div className="w-full">
                <CalendarHeader />
            </div>
        </CalendarProvider>
    )
}