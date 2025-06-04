import { Calendar, Home, Inbox, Search, Settings,ChartBar } from "lucide-react"
 
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
import Link from "next/link"
 
// Menu items.
const items = [
  {
    title: "Coming Soon",
    url: "/",
    icon: Home,
  },
  {
    title: "Coming Sooon",
    url: "/",
    icon: Inbox,
  },
  {
    title: "Stat Tables",
    url: "/statTables/PetContract",
    icon: ChartBar,
  },
  {
    title: "Coming Soooon",
    url: "/",
    icon: Search,
  },
  {
    title: "Coming Sooooon",
    url: "/",
    icon: Settings,
  },
]
 
export function AppSidebar() {
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