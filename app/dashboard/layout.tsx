"use client";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useCookies } from "react-cookie";
import { useMe } from "@/service/auth";
import { useRouter } from "next/navigation";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [cookies, _setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  const { data: user, isLoading } = useMe(cookies.token);

  const logout = () => {
    removeCookie("token");
    router.replace("/auth/signin");
  };
  console.log(isLoading);
  if (!user && !isLoading) {
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
