import { useState } from "react";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  FileText, 
  Calendar,
  Home,
  Settings,
  LogOut
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const studentItems = [
  { title: "Dashboard", url: "/dashboard/student", icon: Home },
  { title: "Tasks", url: "/dashboard/tasks", icon: Target },
  { title: "Story Mode", url: "/dashboard/story", icon: BookOpen },
  { title: "Leaderboards", url: "/dashboard/leaderboards", icon: Trophy },
  { title: "Challenges", url: "/dashboard/challenges", icon: Calendar },
];

const educatorItems = [
  { title: "Dashboard", url: "/dashboard/educator", icon: Home },
  { title: "Tasks", url: "/dashboard/tasks", icon: Target },
  { title: "Submissions", url: "/dashboard/submissions", icon: FileText },
  { title: "Leaderboards", url: "/dashboard/leaderboards", icon: Trophy },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const items = user?.role === 'educator' ? educatorItems : studentItems;
  
  const isActive = (path: string) => currentPath === path;
  const getNavCls = (active: boolean) =>
    active 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={`${!open ? "w-16" : "w-64"} border-r border-border/50 bg-card/30 backdrop-blur-sm`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo Section */}
        {open && (
          <div className="mb-8 px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                EcoLearn
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavCls(isActive(item.url))}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <div className="mt-auto pt-4 border-t border-border/50">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className="h-12"
                    onClick={logout}
                  >
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-all">
                      <LogOut className="h-5 w-5 flex-shrink-0" />
                      {open && <span>Logout</span>}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}