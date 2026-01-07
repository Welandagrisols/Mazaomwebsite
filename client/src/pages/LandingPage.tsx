import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center bg-primary/5">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight mb-6">AgroVet POS</h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Professional point-of-sale software for agricultural and veterinary shops.
              Manage inventory, sales, and clients with ease.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="hover-elevate" asChild>
                <a href="#pricing">Start Free</a>
              </Button>
              <Button size="lg" variant="outline" className="hover-elevate">
                Download App
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover-elevate">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4">Free</p>
                  <p className="text-muted-foreground mb-6">For small shops starting out.</p>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card className="hover-elevate border-primary">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4">$29/mo</p>
                  <p className="text-muted-foreground mb-6">Everything you need for growth.</p>
                  <Button className="w-full" variant="default">Go Pro</Button>
                </CardContent>
              </Card>
              <Card className="hover-elevate">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4">Custom</p>
                  <p className="text-muted-foreground mb-6">For large multi-branch networks.</p>
                  <Button className="w-full" variant="outline">Contact Us</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
