import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FEATURES } from "@/lib/constants";
import { 
  CheckCircle2, ArrowRight, Smartphone, CreditCard, Users, 
  Check, Star, ChevronRight, Play, Shield, Clock
} from "lucide-react";
import heroImage from "@assets/WhatsApp_Image_2025-12-13_at_23.49.49_7d55f885_1765665092659.jpg";
import posScreenshot from "@assets/WhatsApp_Image_2025-12-14_at_01.04.18_4192d0ad_1765663551344.jpg";
import inventoryScreenshot from "@assets/WhatsApp_Image_2025-12-14_at_01.04.17_4a410ec0_1765663551457.jpg";
import reportsScreenshot from "@assets/WhatsApp_Image_2025-12-14_at_01.04.17_07d2f0f7_1765663551459.jpg";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { Review, Content } from "@shared/schema";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

export default function LandingPage() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/public/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Message sent successfully!" });
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

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

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-6 pb-10 md:pt-20 md:pb-16 overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="AgroVet Shop Inventory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 md:mb-6 px-3 md:px-4 py-0.5 md:py-1 border-white/40 text-white bg-white/10 backdrop-blur-sm text-[10px] md:text-sm font-semibold uppercase tracking-wider">
              Powered by Agrisols Systems
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black mb-3 md:mb-6 tracking-tight leading-[1.1]">
              AgroVet <span className="text-primary">POS</span>
            </h1>
            <h2 className="text-lg md:text-4xl font-bold mb-4 md:mb-8 text-white/95 leading-tight">Smart Point of Sale for <br className="md:hidden" /> Agribusiness</h2>
            <p className="max-w-xl mx-auto text-sm md:text-xl text-white/90 mb-6 md:mb-10 leading-relaxed font-medium px-2">
              The complete solution for inventory, sales tracking, and AI-powered automation.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 px-4 max-w-sm mx-auto md:max-w-none">
              <Button size="lg" className="w-full md:w-auto rounded-full bg-primary hover-elevate h-11 md:h-14 text-sm md:text-lg font-bold" asChild>
                <a href="https://bit.ly/agrovet-pos-app" target="_blank" rel="noopener noreferrer">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full md:w-auto rounded-full bg-white/10 border-white/30 text-white hover-elevate h-11 md:h-14 text-sm md:text-lg">
                <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 md:gap-8 mt-8 md:mt-16 max-w-xs md:max-w-md mx-auto border-t border-white/10 pt-6">
              <div><p className="text-xl md:text-4xl font-black">500+</p><p className="text-[9px] md:text-xs text-white/70 font-bold uppercase tracking-tighter">Active Shops</p></div>
              <div><p className="text-xl md:text-4xl font-black">99.9%</p><p className="text-[9px] md:text-xs text-white/70 font-bold uppercase tracking-tighter">Uptime</p></div>
              <div><p className="text-xl md:text-4xl font-black">24/7</p><p className="text-[9px] md:text-xs text-white/70 font-bold uppercase tracking-tighter">Support</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">See <span className="text-primary">AgroVet POS</span> In Action</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { src: posScreenshot, label: "Point of Sale" },
              { src: inventoryScreenshot, label: "Inventory" },
              { src: reportsScreenshot, label: "Reports" },
            ].map((item, index) => (
              <motion.div key={index} className="w-[200px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                <div className="rounded-[2rem] border-[8px] border-foreground p-1 shadow-2xl bg-black overflow-hidden mb-4">
                  <img src={item.src} alt={item.label} className="w-full" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-background scroll-mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Everything you need to run your shop</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="hover-elevate h-full border-none shadow-md">
                <CardHeader className="p-4 md:p-6">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary flex items-center justify-center mb-3 md:mb-4 text-white">
                    <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <CardTitle className="text-sm md:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                  <p className="text-xs md:text-base text-muted-foreground line-clamp-3">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get Started in 4 Easy Steps</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {HOW_IT_WORKS.map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4 relative">
                  <item.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 md:h-6 md:w-6 rounded-full bg-primary text-white text-[10px] md:text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">{item.title}</h3>
                <p className="text-[10px] md:text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Simple, Affordable Pricing</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, index) => (
              <Card key={index} className={`relative hover-elevate ${plan.popular ? 'border-primary shadow-xl scale-100 md:scale-105' : ''}`}>
                {plan.popular && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] md:text-xs px-2 py-0">Best Value</Badge>}
                <CardHeader className="text-center p-4 md:p-6">
                  <CardTitle className="text-sm md:text-xl">{plan.name}</CardTitle>
                  <div className="py-2 md:py-4">
                    <span className="text-xl md:text-4xl font-bold">Ksh {plan.price}</span>
                    <span className="text-[10px] md:text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="text-primary font-medium text-[10px] md:text-sm">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                  <ul className="space-y-1.5 md:space-y-3 mb-4 md:mb-8 hidden md:block">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs md:text-sm"><Check className="h-3 w-3 md:h-4 md:w-4 text-primary" />{f}</li>
                    ))}
                  </ul>
                  <Button className="w-full rounded-full h-8 md:h-10 text-xs md:text-base" variant={plan.popular ? "default" : "outline"} onClick={scrollToContact}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Trusted by AgroVet Owners</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {displayTestimonials.map((t, i) => (
              <Card key={i} className="hover-elevate">
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-4">
                    {[...Array(t.rating)].map((_, idx) => <Star key={idx} className="h-3 w-3 md:h-4 md:w-4 fill-primary text-primary" />)}
                  </div>
                  <p className="italic text-[10px] md:text-sm text-muted-foreground mb-4 line-clamp-4">"{t.text}"</p>
                  <div className="border-t pt-3 md:pt-4">
                    <p className="font-bold text-xs md:text-base">{t.name}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{t.business}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-4 md:px-6 bg-muted/20">
                <AccordionTrigger className="text-left font-bold text-sm md:text-lg hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs md:text-base pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 md:space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">Let's <span className="text-primary">Grow</span> <br className="hidden md:block" /> Your Shop</h2>
                <p className="text-base md:text-xl text-muted-foreground font-medium leading-relaxed">
                  Ready to transform your AgroVet business? Our team is here to help you set up and get the most out of your new POS.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-background shadow-sm border border-primary/10">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Smartphone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-lg">Call or WhatsApp</h4>
                    <p className="text-xs md:text-base text-muted-foreground">+254 710 546 911</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-background shadow-sm border border-primary/10">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-lg">Business Hours</h4>
                    <p className="text-xs md:text-base text-muted-foreground">Mon - Sat: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-2xl overflow-hidden">
                <div className="bg-primary p-4 md:p-6 text-white">
                  <CardTitle className="text-lg md:text-2xl font-bold">Request a License</CardTitle>
                  <CardDescription className="text-white/80 text-xs md:text-sm mt-1">Fill out the form and we'll send you a license key.</CardDescription>
                </div>
                <CardContent className="p-4 md:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Shop Name</FormLabel>
                              <FormControl><Input placeholder="AgroVet Name" className="bg-muted/30 border-none h-11 md:h-12" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</FormLabel>
                              <FormControl><Input placeholder="07XX XXX XXX" className="bg-muted/30 border-none h-11 md:h-12" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full rounded-xl hover-elevate font-black text-sm md:text-lg h-12 md:h-14 bg-accent hover:bg-accent/90 border-none shadow-lg text-white uppercase tracking-widest mt-2" disabled={mutation.isPending}>
                        {mutation.isPending ? "Sending Request..." : "Send Request"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
