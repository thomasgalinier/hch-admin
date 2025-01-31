"use client";
import Header from "@/components/Header";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useCookies } from "react-cookie";
import { useMe } from "@/service/auth";
import {usePathname, useRouter} from "next/navigation";
import {useZoneStore} from "@/store/useZoneStore";
import {useEffect} from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { setIsCarte } = useZoneStore();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/carte")) {
      setIsCarte(true);
    }
  }, [pathname, setIsCarte]);
  const [cookies, _setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  const { data: user, isFetching } = useMe(cookies.token);

  const logout = () => {
    removeCookie("token");
    router.replace("/auth/signin");
  };

  if (!user && !isFetching) {
    router.replace("/auth/signin");
  }
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
