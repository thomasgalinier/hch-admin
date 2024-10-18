"use client";
import SideBar from "@/components/SideBar";
import { useState } from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="h-screen">{children}</div>;
};

export default layout;
