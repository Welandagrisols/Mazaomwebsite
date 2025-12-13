import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FEATURES } from "@/lib/constants";
import { CheckCircle2, ArrowRight, Download, Phone } from "lucide-react";
import heroBg from "@assets/generated_images/modern_agricultural_veterinary_shop_interior_background.png";
import posMockup from "@assets/generated_images/pos_checkout_interface_mockup.png";
import inventoryMockup from "@assets/generated_images/inventory_management_interface_mockup.png";
import analyticsMockup from "@assets/generated_images/sales_analytics_dashboard_mockup.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="AgroVet Shop" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-6">
                New: AI Receipt Scanning
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground mb-6">
                The Smart POS for Modern <span className="text-primary">AgroVets</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Streamline your agricultural business with intelligent inventory management, sales tracking, and AI-powered receipt scanning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full text-lg px-8 shadow-xl shadow-primary/20">
                  Download Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 bg-background/50 backdrop-blur-sm">
                  View Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Everything you need to run your shop</h2>
            <p className="text-muted-foreground text-lg">Built specifically for the unique needs of agricultural and veterinary businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-background/50 backdrop-blur-sm h-full">
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full" />
              <div className="relative grid gap-4">
                 <img src={posMockup} alt="POS Interface" className="rounded-lg shadow-2xl border" />
                 <div className="grid grid-cols-2 gap-4">
                    <img src={inventoryMockup} alt="Inventory" className="rounded-lg shadow-xl border" />
                    <img src={analyticsMockup} alt="Analytics" className="rounded-lg shadow-xl border" />
                 </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Designed for clarity and speed</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our interface is intuitive and easy to learn, so you can spend less time training staff and more time serving customers.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Fast checkout process optimized for touch",
                  "Visual inventory tracking with low stock alerts",
                  "Detailed reports exported to PDF or Excel",
                  "Dark mode support for late evenings"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Download / CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to upgrade your shop?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join hundreds of AgroVets using our system to grow their business. 
            Download the desktop app today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="rounded-full text-lg px-8 h-14">
              <Download className="mr-2 h-5 w-5" /> Download for Windows
            </Button>
            <Button size="lg" className="rounded-full text-lg px-8 h-14 bg-primary-foreground/10 hover:bg-primary-foreground/20 border-2 border-primary-foreground/20 text-primary-foreground">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-display font-bold mb-6">Get in touch</h3>
                <p className="text-muted-foreground mb-8">
                  Need help with installation or licensing? Our support team is available 24/7.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Call or WhatsApp</h4>
                      <p className="text-muted-foreground">+254 710 546 911</p>
                      <p className="text-muted-foreground">+254 710 546 911</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="font-bold text-primary text-xs">M-PESA</div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Payment Details</h4>
                      <p className="text-muted-foreground">Paybill: 123456</p>
                      <p className="text-muted-foreground">Account: Your Shop Name</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary p-8 md:p-12 text-primary-foreground flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"></div>
                
                <h3 className="text-2xl font-display font-bold mb-4">Request a License</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Fill out the form below and we'll send you a license key immediately.
                </p>
                
                <form className="space-y-4">
                  <Input placeholder="Shop Name" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
                  <Input placeholder="Phone Number" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
                  <Button variant="secondary" className="w-full">Send Request</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
