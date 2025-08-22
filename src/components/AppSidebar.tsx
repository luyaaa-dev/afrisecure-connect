import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Shield,
  Brain,
  CreditCard,
  GraduationCap,
  Coins,
  ArrowLeftRight,
  Vault,
  BarChart3,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Emergency Shield", url: "/dashboard/emergency-shield", icon: Shield },
  { title: "AI Fraud Detection", url: "/dashboard/fraud-detection", icon: Brain },
  { title: "AI Credit Scoring", url: "/dashboard/credit-scoring", icon: CreditCard },
  { title: "Anti-Scam Coach", url: "/dashboard/anti-scam", icon: GraduationCap },
  { title: "Savings Assistant", url: "/dashboard/savings", icon: Coins },
  { title: "Cross-Border Payments", url: "/dashboard/remittance", icon: ArrowLeftRight },
  { title: "SafeVault", url: "/dashboard/safevault", icon: Vault },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            AfriSecure Finance
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
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