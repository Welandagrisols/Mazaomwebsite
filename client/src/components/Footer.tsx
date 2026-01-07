import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@assets/generated_images/clean_vector_logo_of_plant_with_digital_network_roots.png";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="AgroVet POS Logo" className="h-12 w-auto brightness-0 invert" />
              <span className="font-display text-2xl font-bold">AgroVet POS</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Empowering agricultural businesses with smart, reliable, and easy-to-use point of sale technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-bold mb-6 text-sm uppercase tracking-widest text-primary">Product</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Setup</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Download</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold mb-6 text-sm uppercase tracking-widest text-primary">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display font-bold mb-6 text-sm uppercase tracking-widest text-primary">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+254 710 546 911</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@agrisols.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Agrisols Systems. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link href="/admin/login" className="hover:text-primary transition-colors">
                Admin Login
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
