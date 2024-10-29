"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { redirect, usePathname } from "next/navigation";
import { useCookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();
  const path = usePathname();
  const [cookies] = useCookies(["token"]);
  console.log(path);
  if (path === "/") {
    redirect("/dashboard");
  }
  return (
    <html lang="en">
<head>
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css"
  />
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css"
  />
</head>
      <QueryClientProvider client={queryClient}>
        <body className={`${inter.className}`}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
