import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@assets/generated_images/clean_vector_logo_of_plant_with_digital_network_roots.png";

// Track CTA clicks
const trackCTAClick = async (action: string) => {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "cta_click",
        page: "landing",
        action: action,
        referrer: document.referrer || "direct",
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    console.error("Failed to track CTA click:", error);
  }
};

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
    <nav className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-3">
          <img src={logo} alt="AgroVet POS by Agrisols" className="h-10 md:h-14 w-auto" />
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-2xl font-bold text-foreground leading-none">AgroVet POS</span>
            <span className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">by Agrisols Systems</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full px-6 shadow-lg shadow-primary/20 h-11" asChild>
            <a 
              href="https://bit.ly/agrovet-pos-app" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackCTAClick("get_started_nav")}
            >
              Get Started
            </a>
          </Button>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-8 mt-10">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="AgroVet POS" className="h-12 w-auto" />
                  <span className="font-display text-xl font-bold">AgroVet POS</span>
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a 
                      key={link.href}
                      href={link.href} 
                      onClick={(e) => {
                        scrollToSection(e, link.href);
                        setMobileMenuOpen(false);
                      }}
                      className="text-lg font-bold text-foreground hover:text-primary transition-colors py-3 border-b border-muted flex items-center justify-between group"
                    >
                      {link.label}
                      <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </nav>
                
                <Button className="w-full rounded-2xl h-14 text-lg font-bold" asChild>
                  <a 
                    href="https://bit.ly/agrovet-pos-app" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackCTAClick("get_started_mobile")}
                  >
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
