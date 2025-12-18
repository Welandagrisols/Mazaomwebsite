import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLicenses from "@/pages/admin/Licenses";
import AdminClients from "@/pages/admin/Clients";
import AdminContent from "@/pages/admin/Content";
import AdminReviews from "@/pages/admin/Reviews";
import AdminSettings from "@/pages/admin/Settings";
import { useEffect } from "react";

// Track page views on initial load
const trackPageView = async () => {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "page_view",
        page: "landing",
        action: "landing_viewed",
        referrer: document.referrer || "direct",
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
};

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Navbar />
        <Home />
        <Footer />
      </Route>
      
      <Route path="/admin/login" component={AdminLogin} />
      
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/licenses" component={AdminLicenses} />
      <Route path="/admin/content" component={AdminContent} />
      <Route path="/admin/reviews" component={AdminReviews} />
      <Route path="/admin/clients" component={AdminClients} />
      <Route path="/admin/settings" component={AdminSettings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
