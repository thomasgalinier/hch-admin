"use client";
import { Inter } from "next/font/google";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SideBar from "@/components/SideBar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();
  const path = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false); // To manage sidebar state

  return (
    <html lang="en">
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css"
      />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css"
      />
      <QueryClientProvider client={queryClient}>
        <body className={`${inter.className}`}>
        {/*  {path === "/signin" ? null : (*/}
        {/*    <div className=" h-screen">*/}
        {/*      <SideBar*/}
        {/*        isCollapsed={isCollapsed}*/}
        {/*        setIsCollapsed={setIsCollapsed}*/}
        {/*      />*/}

        {/*      /!* Main Content *!/*/}
        {/*      <div*/}
        {/*        data-collapse={isCollapsed}*/}
        {/*        className="p-2 overflow-auto  h-full ml-56 data-[collapse=true]:ml-20"*/}
        {/*      >*/}
        {/*        <Header />*/}
                {children}
          {/*      <Toaster />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
          {/*{path === "/signin" && children}*/}
        </body>
      </QueryClientProvider>
    </html>
  );
}
