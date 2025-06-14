import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Calendar, Home, Inbox, Settings } from "lucide-react"

export function AppSidebar() {
  const items = [
    {
      title: "Dashboard",
      url: "/?tab=dashboard",
      icon: Home,
    },
    {
      title: "Registrar",
      url: "/?tab=timer",
      icon: Inbox,
    },
    {
      title: "Histórico",
      url: "/?tab=history",
      icon: Calendar,
    },
    {
      title: "Configurações",
      url: "/?tab=settings",
      icon: Settings,
    },
  ]

  return (
   <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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