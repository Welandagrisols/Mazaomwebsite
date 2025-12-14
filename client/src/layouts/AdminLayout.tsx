import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import logo from "@assets/generated_images/clean_vector_logo_of_plant_with_digital_network_roots.png";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setLocation("/admin/login");
  };

  const NavItems = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {ADMIN_NAV_ITEMS.map((item) => {
        const isActive = location === item.href;
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            onClick={onItemClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex-shrink-0 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90">
             <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="font-display text-lg font-bold text-sidebar-primary-foreground">Agrisols Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItems />
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 bg-sidebar p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Admin navigation menu</SheetDescription>
          </SheetHeader>
          <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
              <span className="font-display text-lg font-bold text-sidebar-primary-foreground">Agrisols</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <NavItems onItemClick={() => setMobileMenuOpen(false)} />
          </nav>
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-16 border-b bg-background flex items-center justify-between gap-4 px-6 md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-display font-bold">Agrisols Admin</span>
          <div className="w-9" />
        </div>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
