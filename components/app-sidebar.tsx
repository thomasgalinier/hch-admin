import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {LayoutDashboardIcon, Users, Map, ChevronUp, LogOut, Calendar, EuroIcon} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {UserType} from "@/schema";
import CarteSidebar from "@/components/carte-sidebar";
import {useZoneStore} from "@/store/useZoneStore";


const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Comptes",
    url: "/dashboard/comptes",
    icon: Users,
  },
  {
    title: "Carte",
    url: "/dashboard/carte",
    icon: Map,
  },
  {
    title: 'Planing',
    url: '/dashboard/planing',
    icon: Calendar,
  },
  {
    title: 'Forfait',
    url: '/dashboard/forfait',
    icon: EuroIcon
  }
];
export function AppSidebar({user, logout}: {user: UserType | undefined, logout: () => void}) {
  const { isCarte } = useZoneStore();
  return (
    <Sidebar variant="inset" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isCarte && <CarteSidebar />}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="cursor-pointer size-7">
                    <AvatarImage
                        src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.nom}${user?.prenom}`}
                    />
                  </Avatar>
                  {user?.prenom}.{user?.nom}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className='flex gap-2' onClick={logout}>
                  <LogOut size={15} /> Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
