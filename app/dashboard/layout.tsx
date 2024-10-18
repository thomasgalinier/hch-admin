'use client';
import SideBar from "@/components/SideBar";
import { useState } from "react";
import Header from "@/components/Header";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="h-screen">
            <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div
                data-collapse={isCollapsed}
                className="p-2 overflow-auto h-full ml-56 data-[collapse=true]:ml-20"
            >
                <Header />
                {children}
            </div>
        </div>
    );
};

export default layout;
