import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FEATURES } from "@/lib/constants";
import { CheckCircle2, ArrowRight, Download, Phone, Play, Users, Shield, Clock } from "lucide-react";
import posScreenshot from "@assets/WhatsApp_Image_2025-12-14_at_01.04.18_4192d0ad_1765663551344.jpg";
import inventoryScreenshot from "@assets/WhatsApp_Image_2025-12-14_at_01.04.17_4a410ec0_1765663551457.jpg";
import reportsScreenshot from "@assets/WhatsApp_Image_2025-12-14_at_01.04.17_07d2f0f7_1765663551459.jpg";
import { useState } from "react";

export default function Home() {
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hello, I would like to request a license for AgroVet POS.\n\nShop Name: ${shopName}\nPhone: ${phoneNumber}`;
    
    window.open(`https://wa.me/254710546911?text=${encodeURIComponent(message)}`, '_blank');
    
    window.location.href = `mailto:welandagrisols@gmail.com?subject=License Request - ${shopName}&body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={posScreenshot} 
            alt="AgroVet POS App" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Powered by Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8" data-testid="badge-powered-by">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Powered by Agrisols Systems
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-foreground mb-4 leading-tight">
                <span className="text-primary">AgroVet POS</span>
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground/80 mb-6">
                Smart Point of Sale
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                The complete solution for Agricultural & Veterinary Shops. Easy inventory management, sales tracking, and AI-powered receipt scanning - all in one powerful platform.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <Button size="lg" className="rounded-full text-lg px-8 shadow-xl shadow-primary/20" data-testid="button-get-started">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 bg-background/50 backdrop-blur-sm" data-testid="button-watch-demo">
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </Button>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
                <div className="text-center" data-testid="stat-active-shops">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <span className="text-3xl md:text-4xl font-display font-bold text-foreground">500+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Active Shops</p>
                </div>
                <div className="text-center" data-testid="stat-uptime">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <span className="text-3xl md:text-4xl font-display font-bold text-foreground">99.9%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center" data-testid="stat-support">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span className="text-3xl md:text-4xl font-display font-bold text-foreground">24/7</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-4">App Preview</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              See <span className="text-primary">AgroVet POS</span> In Action
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A glimpse into the powerful interface that makes managing your shop effortless.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative mx-auto w-[200px] md:w-[220px]">
                <div className="rounded-[2.5rem] border-[8px] border-foreground/90 bg-foreground/90 p-1 shadow-2xl">
                  <div className="rounded-[2rem] overflow-hidden bg-black">
                    <img src={posScreenshot} alt="AgroVet POS Interface" className="w-full" />
                  </div>
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground/90 rounded-full"></div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 font-medium">Point of Sale</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative mx-auto w-[200px] md:w-[220px]">
                <div className="rounded-[2.5rem] border-[8px] border-foreground/90 bg-foreground/90 p-1 shadow-2xl">
                  <div className="rounded-[2rem] overflow-hidden bg-black">
                    <img src={inventoryScreenshot} alt="Inventory Management" className="w-full" />
                  </div>
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground/90 rounded-full"></div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 font-medium">Inventory</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative mx-auto w-[200px] md:w-[220px]">
                <div className="rounded-[2.5rem] border-[8px] border-foreground/90 bg-foreground/90 p-1 shadow-2xl">
                  <div className="rounded-[2rem] overflow-hidden bg-black">
                    <img src={reportsScreenshot} alt="Sales Reports Dashboard" className="w-full" />
                  </div>
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground/90 rounded-full"></div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 font-medium">Reports</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
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
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-muted/50 h-full">
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

      {/* Real Shops Section */}
      <section id="gallery" className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative w-[140px] md:w-[160px]"
                >
                  <div className="rounded-[2rem] border-[6px] border-foreground/90 bg-foreground/90 p-0.5 shadow-2xl">
                    <div className="rounded-[1.5rem] overflow-hidden bg-black">
                      <img src={posScreenshot} alt="AgroVet POS Interface" className="w-full" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-foreground/90 rounded-full"></div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative w-[140px] md:w-[160px]"
                >
                  <div className="rounded-[2rem] border-[6px] border-foreground/90 bg-foreground/90 p-0.5 shadow-2xl">
                    <div className="rounded-[1.5rem] overflow-hidden bg-black">
                      <img src={inventoryScreenshot} alt="Inventory Management" className="w-full" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-foreground/90 rounded-full"></div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative w-[140px] md:w-[160px]"
                >
                  <div className="rounded-[2rem] border-[6px] border-foreground/90 bg-foreground/90 p-0.5 shadow-2xl">
                    <div className="rounded-[1.5rem] overflow-hidden bg-black">
                      <img src={reportsScreenshot} alt="Sales Reports" className="w-full" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-foreground/90 rounded-full"></div>
                </motion.div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-4">Trusted by Real Shops</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Designed for clarity and speed</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our interface is intuitive and easy to learn, so you can spend less time training staff and more time serving customers.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Fast checkout process optimized for touch",
                  "Visual inventory tracking with low stock alerts",
                  "Detailed reports exported to PDF or Excel",
                  "Works offline - no internet required"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join hundreds of agricultural and veterinary shops already using AgroVet POS to streamline their operations and boost sales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="rounded-full text-lg px-8 h-14" data-testid="button-download">
              <Download className="mr-2 h-5 w-5" /> Download Now
            </Button>
            <Button size="lg" className="rounded-full text-lg px-8 h-14 bg-primary-foreground/10 hover:bg-primary-foreground/20 border-2 border-primary-foreground/20 text-primary-foreground" data-testid="button-contact-sales">
              Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-4">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Contact Us</h2>
          </div>
          
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
                
                <form className="space-y-4" onSubmit={handleRequest}>
                  <Input 
                    placeholder="Shop Name" 
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" 
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                    data-testid="input-shop-name"
                  />
                  <Input 
                    placeholder="Phone Number" 
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    data-testid="input-phone"
                  />
                  <Button variant="secondary" className="w-full" type="submit" data-testid="button-send-request">
                    Send Request
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
