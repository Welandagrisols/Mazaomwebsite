import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FEATURES } from "@/lib/constants";
import { 
  CheckCircle2, ArrowRight, Download, Phone, Play, Users, Shield, Clock, 
  Star, Check, MessageCircle, Smartphone, CreditCard, Headphones,
  ChevronRight
} from "lucide-react";
import heroImage from "@assets/WhatsApp_Image_2025-12-13_at_23.49.49_7d55f885_1765665092659.jpg";
import posScreenshot from "@assets/WhatsApp_Image_2025-12-14_at_01.04.18_4192d0ad_1765663551344.jpg";
import inventoryScreenshot from "@assets/WhatsApp_Image_2025-12-14_at_01.04.17_4a410ec0_1765663551457.jpg";
import reportsScreenshot from "@assets/WhatsApp_Image_2025-12-14_at_01.04.17_07d2f0f7_1765663551459.jpg";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Review } from "@shared/schema";

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

const PRICING_PLANS = [
  {
    name: "Monthly",
    price: "500",
    period: "/month",
    description: "Pay as you go",
    features: [
      "Full POS Features",
      "Inventory Management",
      "Sales Reports",
      "Cloud Backup",
      "WhatsApp Support",
    ],
    popular: false,
  },
  {
    name: "Quarterly",
    price: "1,400",
    period: "/3 months",
    description: "Save Ksh 100",
    features: [
      "Full POS Features",
      "Inventory Management",
      "Sales Reports",
      "Cloud Backup",
      "Priority Support",
      "1 Month Discount",
    ],
    popular: false,
  },
  {
    name: "Yearly",
    price: "5,000",
    period: "/year",
    description: "Best Value - 2 Months FREE",
    features: [
      "Full POS Features",
      "Inventory Management",
      "Sales Reports",
      "Cloud Backup",
      "Priority Support",
      "2 Months FREE",
      "Free Setup Assistance",
    ],
    popular: true,
  },
];

const TESTIMONIALS = [
  {
    name: "James Mwangi",
    business: "GreenFields AgroVet, Nakuru",
    rating: 5,
    text: "AgroVet POS has completely transformed how I run my shop. The inventory tracking saves me hours every week, and I never run out of stock anymore.",
  },
  {
    name: "Mary Wanjiku",
    business: "Valley Veterinary, Eldoret",
    rating: 5,
    text: "The AI receipt scanning is amazing! I just take a photo of supplier invoices and everything is captured automatically. No more manual entry.",
  },
  {
    name: "Peter Ochieng",
    business: "Highland Feed & Seed, Kericho",
    rating: 5,
    text: "Even when my internet goes down, I can still make sales. The offline mode is a lifesaver for my rural location. Highly recommend!",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Download the App",
    description: "Get AgroVet POS from our website. It's a quick download that works on any Android phone.",
    icon: Smartphone,
  },
  {
    step: 2,
    title: "Get Your License",
    description: "Contact us via WhatsApp or call. Pay via M-Pesa and receive your license key instantly.",
    icon: CreditCard,
  },
  {
    step: 3,
    title: "Set Up Your Shop",
    description: "Enter your shop details and start adding your inventory. Our team can help you set up if needed.",
    icon: Users,
  },
  {
    step: 4,
    title: "Start Selling",
    description: "You're ready to go! Make sales, track inventory, and grow your business with powerful insights.",
    icon: CheckCircle2,
  },
];

const FAQ_ITEMS = [
  {
    question: "How do I pay for AgroVet POS?",
    answer: "Payment is easy via M-Pesa. Simply contact us on WhatsApp (+254 710 546 911) and we'll send you the payment details. Once payment is confirmed, you'll receive your license key immediately.",
  },
  {
    question: "Does the app work without internet?",
    answer: "Yes! AgroVet POS works fully offline. You can make sales, update inventory, and generate receipts without internet. When you're back online, everything syncs automatically to the cloud.",
  },
  {
    question: "Can I use it on multiple devices?",
    answer: "Each license is for one device. If you need the app on multiple phones or tablets in your shop, you'll need a license for each device. Contact us for multi-device discounts.",
  },
  {
    question: "What happens when my subscription expires?",
    answer: "You'll receive reminders before expiry. If it expires, your data is safe - you just won't be able to make new sales until you renew. Your data is backed up in the cloud for 90 days.",
  },
  {
    question: "Do you provide training?",
    answer: "Yes! We offer free setup assistance for yearly subscribers. For monthly and quarterly plans, we have video tutorials and WhatsApp support to help you get started.",
  },
  {
    question: "Can I import my existing inventory?",
    answer: "Absolutely! You can add products manually, use the AI receipt scanner to import from supplier invoices, or contact us for bulk import assistance if you have a spreadsheet.",
  },
];

export default function Home() {
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { data: approvedReviews } = useQuery<Review[]>({
    queryKey: ["/api/reviews/approved"],
  });

  const displayTestimonials = approvedReviews && approvedReviews.length > 0 
    ? approvedReviews.map(r => ({
        name: r.clientName,
        business: r.business,
        rating: r.rating,
        text: r.text,
      }))
    : TESTIMONIALS;

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    trackCTAClick("license_request_submitted");
    
    const message = `Hello, I would like to request a license for AgroVet POS.\n\nShop Name: ${shopName}\nPhone: ${phoneNumber}`;
    
    window.open(`https://wa.me/254710546911?text=${encodeURIComponent(message)}`, '_blank');
    
    window.location.href = `mailto:welandagrisols@gmail.com?subject=License Request - ${shopName}&body=${encodeURIComponent(message)}`;
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-10 md:pt-20 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="AgroVet Shop Inventory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium text-white mb-3 md:mb-4" data-testid="badge-powered-by">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Powered by Agrisols Systems
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white mb-2 leading-tight">
                <span className="text-primary">AgroVet POS</span>
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold text-white/90 mb-3 md:mb-4">
                Smart Point of Sale
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-white/80 mb-4 md:mb-6 leading-relaxed max-w-2xl mx-auto px-2">
                The complete solution for Agricultural & Veterinary Shops. Easy inventory management, sales tracking, and AI-powered receipt scanning - all in one powerful platform.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8 px-4">
                <Button size="lg" className="rounded-full text-sm md:text-base px-5 md:px-6 shadow-xl shadow-primary/20" data-testid="button-get-started" asChild>
                  <a 
                    href="https://bit.ly/agrovet-pos-app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("get_started_hero")}
                  >
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-sm md:text-base px-5 md:px-6 bg-white/10 backdrop-blur-sm border-white/30 text-white" data-testid="button-watch-demo" onClick={() => trackCTAClick("watch_demo")}>
                  <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-md mx-auto">
                <div className="text-center" data-testid="stat-active-shops">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-primary mr-1 md:mr-2" />
                    <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">500+</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-white/70">Active Shops</p>
                </div>
                <div className="text-center" data-testid="stat-uptime">
                  <div className="flex items-center justify-center mb-1">
                    <Shield className="h-3 w-3 md:h-4 md:w-4 text-primary mr-1 md:mr-2" />
                    <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">99.9%</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-white/70">Uptime</p>
                </div>
                <div className="text-center" data-testid="stat-support">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary mr-1 md:mr-2" />
                    <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">24/7</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-white/70">Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase mb-3 md:mb-4">App Preview</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">
              See <span className="text-primary">AgroVet POS</span> In Action
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              A glimpse into the powerful interface that makes managing your shop effortless.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
            {[
              { src: posScreenshot, label: "Point of Sale", alt: "AgroVet POS Interface" },
              { src: inventoryScreenshot, label: "Inventory", alt: "Inventory Management" },
              { src: reportsScreenshot, label: "Reports", alt: "Sales Reports Dashboard" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative mx-auto w-[140px] sm:w-[180px] md:w-[220px]">
                  <div className="rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[8px] border-foreground/90 bg-foreground/90 p-0.5 md:p-1 shadow-2xl">
                    <div className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black">
                      <img src={item.src} alt={item.alt} className="w-full" />
                    </div>
                  </div>
                  <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-10 md:w-16 h-3 md:h-4 bg-foreground/90 rounded-full"></div>
                </div>
                <p className="text-center text-xs md:text-sm text-muted-foreground mt-3 md:mt-4 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background scroll-mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">Everything you need to run your shop</h2>
            <p className="text-sm md:text-lg text-muted-foreground">Built specifically for the unique needs of agricultural and veterinary businesses.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card h-full">
                  <CardContent className="p-6 md:p-8">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-primary flex items-center justify-center mb-4 md:mb-6">
                      <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-white" fill="currentColor" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold mb-2 md:mb-3">{feature.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-muted/30 scroll-mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase mb-3 md:mb-4">Simple Setup</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">
              Get Started in 4 Easy Steps
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              From download to your first sale in minutes. No technical skills required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {HOW_IT_WORKS.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="relative inline-flex">
                    <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-6 w-6 md:h-7 md:w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs md:text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-display text-base md:text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-background scroll-mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase mb-3 md:mb-4">Pricing</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">
              Simple, Affordable Pricing
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for your business. All plans include full features.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`relative h-full ${plan.popular ? 'border-primary shadow-xl scale-[1.02]' : 'border-border'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1">
                        Best Value
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-lg md:text-xl">{plan.name}</CardTitle>
                    <div className="mt-3 md:mt-4">
                      <span className="text-3xl md:text-4xl font-display font-bold">Ksh {plan.price}</span>
                      <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2 text-xs md:text-sm font-medium text-primary">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 md:space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs md:text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full rounded-full" 
                      variant={plan.popular ? "default" : "outline"}
                      onClick={scrollToContact}
                      data-testid={`button-pricing-${plan.name.toLowerCase()}`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
              <CreditCard className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Payment via <strong className="text-foreground">M-Pesa</strong></span>
            </div>
            <p className="mt-3 text-xs md:text-sm text-muted-foreground">
              Contact us via WhatsApp for payment details
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-muted/30 scroll-mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase mb-3 md:mb-4">Testimonials</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">
              Trusted by AgroVet Owners Across Kenya
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about AgroVet POS.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 max-w-5xl mx-auto">
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex gap-1 mb-3 md:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-sm md:text-base">{testimonial.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{testimonial.business}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-background scroll-mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase mb-3 md:mb-4">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">Still have questions?</p>
            <Button variant="outline" className="rounded-full" asChild>
              <a href="https://wa.me/254710546911" target="_blank" rel="noopener noreferrer" data-testid="button-whatsapp-faq">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with us on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 md:mb-6">Ready to Transform Your Business?</h2>
          <p className="text-base md:text-xl text-primary-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto">
            Join hundreds of agricultural and veterinary shops already using AgroVet POS to streamline their operations and boost sales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button size="lg" variant="secondary" className="rounded-full text-base md:text-lg px-6 md:px-8 h-12 md:h-14" data-testid="button-download" asChild>
              <a href="https://expo.dev/artifacts/eas/4t2t8g33j2uvUnVJwPPpST.apk" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Download Now
              </a>
            </Button>
            <Button size="lg" className="rounded-full text-base md:text-lg px-6 md:px-8 h-12 md:h-14 bg-primary-foreground/10 hover:bg-primary-foreground/20 border-2 border-primary-foreground/20 text-primary-foreground" data-testid="button-contact-sales" asChild>
              <a href="https://wa.me/254710546911?text=Hello%2C%20I%20am%20interested%20in%20AgroVet%20POS.%20I%20would%20like%20to%20inquire%20about%20pricing%20and%20licensing.%20Please%20get%20back%20to%20me." target="_blank" rel="noopener noreferrer">
                Contact Sales <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-muted/50 scroll-mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase mb-3 md:mb-4">Get In Touch</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">Contact Us</h2>
          </div>
          
          <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-12">
                <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-6">Get in touch</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                  Need help with installation or licensing? Our support team is available 24/7.
                </p>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base">Call or WhatsApp</h4>
                      <p className="text-sm text-muted-foreground">+254 710 546 911</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="font-bold text-primary text-[10px] md:text-xs">M-PESA</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base">Payment via M-Pesa</h4>
                      <p className="text-sm text-muted-foreground">Contact us for payment details</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Headphones className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base">24/7 Support</h4>
                      <p className="text-sm text-muted-foreground">We're always here to help</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary p-6 md:p-12 text-primary-foreground flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"></div>
                
                <h3 className="text-xl md:text-2xl font-display font-bold mb-3 md:mb-4">Request a License</h3>
                <p className="text-sm md:text-base text-primary-foreground/80 mb-4 md:mb-6">
                  Fill out the form below and we'll send you a license key immediately.
                </p>
                
                <form className="space-y-3 md:space-y-4" onSubmit={handleRequest}>
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
