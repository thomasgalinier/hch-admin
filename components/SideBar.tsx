import { Bike, Home, LogOut, Map, PanelLeft, Plus, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { useMe } from "@/service/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}
export const routes = {
  comptes: { main: "/dashboard/comptes", create: "/dashboard/comptes/create" },
  carte: { main: "/dashboard/carte" },
  dashboard: { main: "/dashboard" },
};

const SideBar = ({ isCollapsed, setIsCollapsed }: SideBarProps) => {
  const [cookies, _setCookie, removeCookie] = useCookies(["token"]);
  const { data: user, isLoading } = useMe(cookies.token);
  const router = useRouter();
  const path = usePathname();
  console.log(path);

  if (!user && !isLoading ) {
    router.replace("/auth/signin");
  }


  return (
    <aside
      data-collapse={isCollapsed}
      className="fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex w-56 transition-all duration-300 ease-in-out data-[collapse=true]:w-20"
    >
      <TooltipProvider>
        {!isCollapsed ? (
          <div className="flex items-center px-2 py-4 justify-between">
            {!isCollapsed && <Bike size={40} color="#557C56" />}
            <div className="flex items-center">
              <div className="pr-3 w-full justify-center items-center flex">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <PanelLeft size={isCollapsed ? 20 : 15} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Plus size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href={routes.comptes.create}>
                        Ajouter un utilisateur
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer size-7">
                    <AvatarImage
                      src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.nom}${user?.prenom}`}
                    />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user?.prenom}.{user?.nom}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex gap-2 cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut size={15} /> Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="flex justify-center p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <PanelLeft size={20} />
            </Button>
          </div>
        )}
        <Separator />
        <nav className="flex items-start flex-col p-3 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-collapse={isCollapsed}
                className="w-full flex justify-start gap-5 data-[collapse=true]:justify-center"
                variant={path === routes.dashboard.main ? "secondary" : "ghost"}
                asChild
              >
                <Link href={routes.dashboard.main}>
                  <Home size={isCollapsed ? 20 : 15} />
                  <p
                    data-collapse={isCollapsed}
                    className="text-xs data-[collapse=true]:hidden"
                  >
                    Dashboard
                  </p>
                </Link>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent>
                <p>Dashboard</p>
              </TooltipContent>
            )}
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-collapse={isCollapsed}
                className="w-full flex justify-start gap-5 data-[collapse=true]:justify-center"
                variant={path === routes.comptes.main ? "secondary" : "ghost"}
                asChild
              >
                <Link href={routes.comptes.main}>
                  <Users size={isCollapsed ? 20 : 15} />
                  <p
                    data-collapse={isCollapsed}
                    className="text-xs data-[collapse=true]:hidden"
                  >
                    Comptes
                  </p>
                </Link>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent>
                <p>Comptes</p>
              </TooltipContent>
            )}
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-collapse={isCollapsed}
                className="w-full flex justify-start gap-5 data-[collapse=true]:justify-center"
                variant={path === routes.carte.main ? "secondary" : "ghost"}
                asChild
              >
                <Link href={routes.carte.main}>
                  <Map size={isCollapsed ? 20 : 15} />
                  <p
                    data-collapse={isCollapsed}
                    className="text-xs data-[collapse=true]:hidden"
                  >
                    Carte
                  </p>
                </Link>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent>
                <p>Carte</p>
              </TooltipContent>
            )}
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default SideBar;
