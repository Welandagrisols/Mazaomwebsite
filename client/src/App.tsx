import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import AdminDashboardPage from "@/pages/AdminDashboard";
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
      <Route path="/" component={LandingPage} />
      <Route path="/admin-dashboard" component={AdminDashboardPage} />
      
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/setup" component={AdminSetup} />
      
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
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
