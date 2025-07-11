"use client";

import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useCookies } from "react-cookie";
import { useMe } from "@/service/auth";
import { usePathname, useRouter } from "next/navigation";
import { useZoneStore } from "@/store/useZoneStore";
import { useEffect } from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { setIsCarte } = useZoneStore();
  const pathname = usePathname();
  const router = useRouter();

  const [cookies, _setCookie, removeCookie] = useCookies(["token"]);
  const { data: user, isFetching } = useMe(cookies.token);

  // 1️⃣ Détection de la carte
  useEffect(() => {
    if (pathname.includes("/carte")) {
      setIsCarte(true);
    } else {
      setIsCarte(false);
    }
  }, [pathname, setIsCarte]);

  // 2️⃣ Redirection sécurisée
  useEffect(() => {
    if (!user && !isFetching) {
      router.replace("/auth/signin");
    }
  }, [user, isFetching, router]);

  const logout = () => {
    removeCookie("token");
    router.replace("/auth/signin");
  };

  return (
    <SidebarProvider>
      <AppSidebar user={user} logout={logout} />
      <SidebarInset>
        <div className="h-full">
          <Header />
          <main>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
