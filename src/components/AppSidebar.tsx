import {
  Home,
  Building2,
  Settings,
  Plus,
  FileUp,
  LogOut,
  BarChart3,
  Shield,
  Search,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";



const mainNav = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Submeter Documento", url: "/submeter", icon: Plus, highlight: true },
  { title: "Submissões", url: "/submissoes", icon: FileUp },
];

const reportsNav = [
  { title: "Análises", url: "/analises", icon: BarChart3 },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="overflow-hidden transition-all duration-300 group-data-[collapsible=icon]:w-0">
            <h2 className="text-lg font-bold text-sidebar-foreground">Revitalise</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 p-2">
        <div className="mb-2 px-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SidebarInput placeholder="Pesquisar..." className="pl-8" />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <NavLink
                    to={item.url}
                    end={item.url === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${item.highlight
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                        : isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="truncate transition-all duration-300 group-data-[collapsible=icon]:w-0">
                      {item.title}
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Relatórios</SidebarGroupLabel>
          <SidebarMenu>
            {reportsNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="truncate transition-all duration-300 group-data-[collapsible=icon]:w-0">
                      {item.title}
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Configurações">
              <NavLink
                to="/configuracoes"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all"
              >
                <Settings className="h-5 w-5" />
                <span className="truncate transition-all duration-300 group-data-[collapsible=icon]:w-0">Configurações</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Sair"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="truncate transition-all duration-300 group-data-[collapsible=icon]:w-0">Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="h-px w-full bg-sidebar-border my-2" />
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden transition-all duration-300 group-data-[collapsible=icon]:w-0">
            <p className="font-semibold text-sm">Admin</p>
            <p className="text-xs text-muted-foreground">admin@revitalise.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}