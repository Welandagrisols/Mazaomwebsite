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
      <section className="relative pt-10 pb-12 md:pt-20 md:pb-16 overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="AgroVet Shop Inventory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-white/10">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs md:text-sm font-semibold tracking-wide">Powered by Agrisols Systems</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-4 tracking-tight leading-tight">
              AgroVet <span className="text-primary">POS</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white/95 leading-tight">Smart Point of Sale</h2>
            <p className="max-w-2xl mx-auto text-base md:text-xl text-white/80 mb-10 leading-relaxed font-medium">
              The complete solution for Agricultural & Veterinary Shops. Easy inventory management, sales tracking, and AI-powered receipt scanning – all in one powerful platform.
            </p>
            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              <Button size="lg" className="w-full rounded-xl bg-primary hover:bg-primary/90 h-14 text-lg font-bold shadow-xl shadow-primary/20" asChild>
                <a href="https://bit.ly/agrovet-pos-app" target="_blank" rel="noopener noreferrer">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm h-14 text-lg font-semibold hover:bg-white/20">
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-12 md:mt-20 max-w-md mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-2"><Users className="h-5 w-5 text-primary" /></div>
                <p className="text-2xl font-black">500+</p>
                <p className="text-[10px] text-white/60 font-bold uppercase">Active Shops</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2"><Shield className="h-5 w-5 text-primary" /></div>
                <p className="text-2xl font-black">99.9%</p>
                <p className="text-[10px] text-white/60 font-bold uppercase">Uptime</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2"><Clock className="h-5 w-5 text-primary" /></div>
                <p className="text-2xl font-black">24/7</p>
                <p className="text-[10px] text-white/60 font-bold uppercase">Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">App Preview</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">See <span className="text-primary">AgroVet POS</span> In Action</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-16 text-lg">
            A glimpse into the powerful interface that makes managing your shop effortless.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { src: posScreenshot, label: "Point of Sale" },
              { src: inventoryScreenshot, label: "Inventory" },
              { src: reportsScreenshot, label: "Reports" },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <div className="rounded-[2.5rem] border-[10px] border-foreground p-1 shadow-2xl bg-black overflow-hidden mb-6 aspect-[9/19]">
                  <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                </div>
                <p className="text-lg font-bold text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to run your shop</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-16 text-lg">
            Built specifically for the unique needs of agricultural and veterinary businesses.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="hover-elevate h-full border-none shadow-xl rounded-3xl overflow-visible text-left p-2 md:p-6">
                <CardHeader className="relative pt-8 md:pt-10">
                  <div className="absolute -top-6 left-6 h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <feature.icon className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <CardTitle className="text-lg md:text-2xl mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Simple Setup</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get Started in 4 Easy Steps</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-16 text-lg">
            From download to your first sale in minutes. No technical skills required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {HOW_IT_WORKS.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="h-24 w-24 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-8 relative group-hover:bg-primary/10 transition-colors">
                  <item.icon className="h-10 w-10 text-primary" />
                  <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center border-4 border-background">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Affordable Pricing</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-16 text-lg">
            Choose the plan that works best for your business. All plans include full features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan, index) => (
              <Card key={index} className={`relative hover-elevate overflow-hidden border-none shadow-2xl rounded-[2rem] ${plan.popular ? 'scale-105 ring-4 ring-primary/20' : ''}`}>
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-bold mb-6">{plan.name}</CardTitle>
                  <div className="flex flex-col gap-1">
                    <span className="text-5xl font-black">Ksh {plan.price}</span>
                    <span className="text-muted-foreground font-medium text-lg">{plan.period}</span>
                  </div>
                  <p className="text-primary font-bold text-sm mt-4 uppercase tracking-widest">{plan.description}</p>
                </CardHeader>
                <CardContent className="p-8 pt-0 text-left">
                  <div className="h-px bg-border w-full my-8" />
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 font-medium"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <Button className="w-full rounded-2xl h-14 text-lg font-bold bg-white border-2 border-foreground hover:bg-foreground hover:text-white transition-colors" variant="outline" onClick={scrollToContact}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by AgroVet Owners Across Kenya</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-16 text-lg">
            See what our customers have to say about AgroVet POS.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayTestimonials.map((t, i) => (
              <Card key={i} className="hover-elevate border-none shadow-xl rounded-3xl p-8 text-left">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, idx) => <Star key={idx} className="h-6 w-6 fill-primary text-primary" />)}
                </div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t pt-6">
                  <div>
                    <p className="font-bold text-xl">{t.name}</p>
                    <p className="text-muted-foreground font-medium">{t.business}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Ready to Transform Your Business?</h2>
          <p className="max-w-3xl mx-auto text-white/80 mb-12 text-lg md:text-2xl font-medium">
            Join hundreds of agricultural and veterinary shops already using AgroVet POS to streamline their operations and boost sales.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-2xl bg-white text-primary hover:bg-white/90 h-16 px-10 text-xl font-black shadow-2xl" asChild>
              <a href="https://bit.ly/agrovet-pos-app"><Smartphone className="mr-2 h-6 w-6" /> Download Now</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl border-2 border-white/30 text-white h-16 px-10 text-xl font-bold hover:bg-white/10" onClick={scrollToContact}>
              Contact Sales <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Contact Us</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <Card className="border-none shadow-xl rounded-[2rem] p-8 text-left h-full">
              <h3 className="text-3xl font-black mb-6">Get in touch</h3>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">
                Need help with installation or licensing? Our support team is available 24/7.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">Call or WhatsApp</h4>
                    <p className="text-xl font-bold text-muted-foreground">+254 710 546 911</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <CreditCard className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">Payment via M-Pesa</h4>
                    <p className="text-xl font-bold text-muted-foreground">Contact us for payment details</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">24/7 Support</h4>
                    <p className="text-xl font-bold text-muted-foreground">We're always here to help</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden text-left h-full">
              <div className="bg-primary p-10 text-white">
                <h3 className="text-3xl font-black mb-2">Request a License</h3>
                <p className="text-white/80 text-lg font-medium leading-relaxed">Fill out the form below and we'll send you a license key immediately.</p>
              </div>
              <CardContent className="p-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl><Input placeholder="Shop Name" className="bg-muted/50 border-none h-14 text-lg rounded-xl px-6" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl><Input placeholder="Phone Number" className="bg-muted/50 border-none h-14 text-lg rounded-xl px-6" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full rounded-xl h-16 bg-secondary text-secondary-foreground hover:bg-secondary/90 border-none shadow-xl font-black text-xl uppercase tracking-widest mt-4" disabled={mutation.isPending}>
                      {mutation.isPending ? "Sending..." : "Send Request"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
