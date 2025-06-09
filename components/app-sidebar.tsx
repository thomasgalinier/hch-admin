"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  Users,
  Map,
  ChevronUp,
  LogOut,
  Calendar,
  EuroIcon,
  User,
  ChevronRight,
  ShoppingBasket,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/schema";
import CarteSidebar from "@/components/carte-sidebar";
import { useZoneStore } from "@/store/useZoneStore";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Comptes",
    icon: Users,
    type: "group",
    children: [
      {
        title: "Liste des comptes",
        url: "/dashboard/comptes",
        icon: Users,
      },
      {
        title: "Créer un compte",
        url: "/dashboard/comptes/create",
        icon: User,
      },
    ],
  },
  {
    title: "Carte",
    url: "/dashboard/carte",
    icon: Map,
  },
  {
    title: "Planing",
    url: "/dashboard/intervention",
    icon: Calendar,
  },
  {
    title: "Forfait",
    icon: EuroIcon,
    type: "group",
    children: [
      {
        title: "Liste des forfaits",
        url: "/dashboard/forfait",
        icon: EuroIcon,
      },
      {
        title: "Créer un forfait",
        url: "/dashboard/forfait/create",
        icon: EuroIcon,
      },
    ],
  },
  {
    title: "Produits",
    type: "group",
    icon: ShoppingBasket,
    children: [
      {
        title: "Liste des produits",
        url: "/dashboard/produits",
      },
      {
        title: "Créer un produit",
        url: "/dashboard/produits/create",
      },
    ],
  },
];
export function AppSidebar({
  user,
  logout,
}: {
  user: UserType | undefined;
  logout: () => void;
}) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    JSON.parse(localStorage.getItem("openGroups") ?? "{}"),
  );
  const { isCarte } = useZoneStore();
  useEffect(() => {
    const savedState = localStorage.getItem("openGroups");
    console.log(savedState);
    if (savedState) {
      setOpenGroups(JSON.parse(savedState));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("openGroups", JSON.stringify(openGroups));
  }, [openGroups]);
  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return item.type === "group" ? (
                  <Collapsible
                    className="group/collapsible"
                    open={openGroups[item.title]}
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.title}>
                              <SidebarMenuButton asChild>
                                <a href={child.url}>
                                  <span>{child.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
                <DropdownMenuItem className="flex gap-2" onClick={logout}>
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
