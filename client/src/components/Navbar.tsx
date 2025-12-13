import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import logo from "@assets/generated_images/clean_vector_logo_of_plant_with_digital_network_roots.png";

export function Navbar() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src={logo} alt="AgroVet POS by Agrisols" className="h-14 w-auto" />
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold text-foreground leading-none">AgroVet POS</span>
            <span className="text-xs font-medium text-muted-foreground tracking-wide">by Agrisols Systems</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#gallery" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Gallery</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-6 shadow-lg shadow-primary/20">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
