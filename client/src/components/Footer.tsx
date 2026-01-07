import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@assets/generated_images/clean_vector_logo_of_plant_with_digital_network_roots.png";

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground py-10 md:py-16 border-t border-sidebar-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="AgroVet POS Logo" className="h-10 md:h-12 w-auto brightness-0 invert" />
              <span className="font-display text-lg md:text-xl font-bold text-primary-foreground">AgroVet POS</span>
            </div>
            <p className="text-xs md:text-sm text-sidebar-foreground/70 leading-relaxed max-w-xs">
              Empowering agricultural businesses with smart, reliable, and easy-to-use point of sale technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4 text-xs md:text-sm uppercase tracking-wider text-primary-foreground">Product</h3>
            <ul className="space-y-2 text-xs md:text-sm text-sidebar-foreground/70">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Setup</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Download</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4 text-xs md:text-sm uppercase tracking-wider text-primary-foreground">Support</h3>
            <ul className="space-y-2 text-xs md:text-sm text-sidebar-foreground/70">
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display font-semibold mb-4 text-xs md:text-sm uppercase tracking-wider text-primary-foreground">Contact</h3>
            <ul className="space-y-3 text-xs md:text-sm text-sidebar-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+254 710 546 911</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@agrisols.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-sidebar-border flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-sidebar-foreground/50 font-medium">
          <p>&copy; {new Date().getFullYear()} Agrisols Systems. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <Link href="/admin/login" className="hover:text-primary transition-colors">
                Admin Login
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
