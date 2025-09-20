import { BarChart3, Building2, Package, ShoppingCart, Truck, Users, FileText } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import noyaLogo from "@/assets/noya-logo.png"

const items = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Acteurs", url: "/acteurs", icon: Users },
  { title: "Précommandes", url: "/precommandes", icon: ShoppingCart },
  { title: "Livraisons", url: "/livraisons", icon: Truck },
  { title: "Stocks", url: "/stocks", icon: Package },
  { title: "Rapports", url: "/rapports", icon: FileText },
]

export function AppSidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    (isActive
      ? "bg-primary text-primary-foreground font-medium"
      : "hover:bg-accent")
    + " flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-800 dark:text-slate-100"

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <img src={noyaLogo} alt="NOYA" className="h-8 w-8" />
            <span className="font-bold text-lg text-primary">NOYA</span>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}