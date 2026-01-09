import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Key, Settings, FileText, MessageSquare, BarChart } from "lucide-react";

export default function AdminDashboardPage() {
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
    { title: "Clients", icon: Users, url: "/admin/clients" },
    { title: "License Keys", icon: Key, url: "/admin/licenses" },
    { title: "Content", icon: FileText, url: "/admin/content" },
    { title: "Reviews", icon: MessageSquare, url: "/admin/reviews" },
    { title: "Analytics", icon: BarChart, url: "/admin/analytics" },
    { title: "Settings", icon: Settings, url: "/admin/settings" },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <h2 className="text-lg font-bold">Admin Panel</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center gap-4 p-4 border-b bg-background/95 backdrop-blur sticky top-0 z-10">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-xl font-bold md:text-2xl truncate">Admin Dashboard</h1>
          </header>
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Welcome back, Admin</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="p-6 rounded-lg border bg-card hover-elevate">
                <h3 className="text-muted-foreground mb-2">Total Clients</h3>
                <p className="text-2xl md:text-3xl font-bold">124</p>
              </div>
              <div className="p-6 rounded-lg border bg-card hover-elevate">
                <h3 className="text-muted-foreground mb-2">Active Licenses</h3>
                <p className="text-2xl md:text-3xl font-bold">89</p>
              </div>
              <div className="p-6 rounded-lg border bg-card hover-elevate">
                <h3 className="text-muted-foreground mb-2">Total Sales</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary">KES 4.2M</p>
              </div>
              <div className="p-6 rounded-lg border bg-card hover-elevate">
                <h3 className="text-muted-foreground mb-2">System Health</h3>
                <p className="text-2xl md:text-3xl font-bold text-green-500">Good</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
