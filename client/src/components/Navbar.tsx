import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary hover:opacity-90 transition-opacity">
          <Leaf className="h-6 w-6" />
          <span>AgroVet POS</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#gallery" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Gallery</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/admin/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Admin Login
          </Link>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-6 shadow-lg shadow-primary/20">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
