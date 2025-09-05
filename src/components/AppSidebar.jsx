import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Building2,
  Bed,
  Users,
  BarChart3,
  Search,
  Settings,
  Building,
} from "lucide-react";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Branches", url: "/branches", icon: Building2 },
  { title: "Rooms", url: "/rooms", icon: Bed },
  { title: "Students", url: "/students", icon: Users },
];

const managementItems = [
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state: collapsed } = useSidebar();
  const location = useLocation();

  const getNavClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
  };

  return (
    <Sidebar className={`border-r border-sidebar-border ${collapsed ? "w-16" : "w-64"}`}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Building className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-sidebar-foreground">HostelPro</h2>
              <p className="text-xs text-sidebar-foreground/70">Management System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 px-2 py-1 text-xs font-medium">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={getNavClass(item.url)} asChild>
                    <NavLink to={item.url} className="flex items-center gap-3 px-2 py-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 px-2 py-1 text-xs font-medium">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={getNavClass(item.url)} asChild>
                    <NavLink to={item.url} className="flex items-center gap-3 px-2 py-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}