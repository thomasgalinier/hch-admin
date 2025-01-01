"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { redirect, usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();
  const path = usePathname();
  const [cookies] = useCookies(["token"]);

  return (
      <html lang="en">
      <Head>
          <link
              rel="stylesheet"
              href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css"
          />
          <link
              rel="stylesheet"
              href="//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css"
          />
          <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css"
          />
      </Head>
      <Script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.5/index.global.min.js'></Script>
      <QueryClientProvider client={queryClient}>
          <Toaster/>
          <body className={`${inter.className}`}>{children}</body>
      </QueryClientProvider>
      </html>
  );
}
