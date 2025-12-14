import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@assets/generated_images/clean_vector_logo_of_plant_with_digital_network_roots.png";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity">
          <img src={logo} alt="AgroVet POS by Agrisols" className="h-10 md:h-14 w-auto" />
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-xl font-bold text-foreground leading-none">AgroVet POS</span>
            <span className="text-[10px] md:text-xs font-medium text-muted-foreground tracking-wide">by Agrisols Systems</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-4 md:px-6 shadow-lg shadow-primary/20" asChild>
            <a href="https://expo.dev/artifacts/eas/4t2t8g33j2uvUnVJwPPpST.apk" target="_blank" rel="noopener noreferrer" data-testid="button-get-started-nav">
              Get Started
            </a>
          </Button>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="AgroVet POS" className="h-10 w-auto" />
                  <span className="font-display text-lg font-bold">AgroVet POS</span>
                </div>
                
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a 
                      key={link.href}
                      href={link.href} 
                      onClick={(e) => {
                        scrollToSection(e, link.href);
                        setMobileMenuOpen(false);
                      }}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                
                <Button className="w-full rounded-full" asChild>
                  <a href="https://expo.dev/artifacts/eas/4t2t8g33j2uvUnVJwPPpST.apk" target="_blank" rel="noopener noreferrer" data-testid="button-get-started-mobile">
                    Download App
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
