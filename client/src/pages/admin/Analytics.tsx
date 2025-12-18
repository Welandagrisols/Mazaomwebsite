import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Activity, TrendingUp, Users, MousePointer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useState, useMemo } from "react";

export default function Analytics() {
  const [selectedPeriod] = useState<"week" | "month" | "all">("month");

  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["/api/analytics"],
    queryFn: async () => {
      const response = await fetch("/api/analytics");
      if (!response.ok) throw new Error("Failed to fetch analytics");
      return response.json();
    },
  });

  const { data: insights, isLoading: insightsLoading } = useQuery({
    queryKey: ["/api/analytics/insights"],
    queryFn: async () => {
      const response = await fetch("/api/analytics/insights");
      if (!response.ok) throw new Error("Failed to fetch insights");
      return response.json();
    },
    enabled: !!analyticsData && analyticsData.length > 0,
  });

  // Calculate metrics
  const metrics = useMemo(() => {
    if (!analyticsData) return { pageViews: 0, ctaClicks: 0, unique: 0, ctaRate: 0 };

    const pageViews = analyticsData.filter((item: any) => item.eventType === "page_view").length;
    const ctaClicks = analyticsData.filter((item: any) => item.eventType === "cta_click").length;
    const uniqueReferrers = new Set(analyticsData.map((item: any) => item.referrer)).size;
    const ctaRate = pageViews > 0 ? ((ctaClicks / pageViews) * 100).toFixed(1) : 0;

    return {
      pageViews,
      ctaClicks,
      unique: uniqueReferrers,
      ctaRate,
    };
  }, [analyticsData]);

  // Group by action for chart
  const chartData = useMemo(() => {
    if (!analyticsData) return [];

    const actionCounts = analyticsData.reduce((acc: any, item: any) => {
      const existing = acc.find((a: any) => a.name === item.action);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ name: item.action || "Unknown", count: 1 });
      }
      return acc;
    }, []);

    return actionCounts.sort((a: any, b: any) => b.count - a.count).slice(0, 8);
  }, [analyticsData]);

  // Hourly trend
  const trendData = useMemo(() => {
    if (!analyticsData) return [];

    const hourlyData: any = {};
    analyticsData.forEach((item: any) => {
      const date = new Date(item.timestamp);
      const hour = `${date.getHours()}:00`;
      hourlyData[hour] = (hourlyData[hour] || 0) + 1;
    });

    return Object.entries(hourlyData)
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => a.hour.localeCompare(b.hour));
  }, [analyticsData]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Spinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Marketing Analytics</h1>
        <p className="text-muted-foreground">Track website performance and user engagement</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pageViews}</div>
            <p className="text-xs text-muted-foreground">Landing page visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTA Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.ctaClicks}</div>
            <p className="text-xs text-muted-foreground">Button interactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.ctaRate}%</div>
            <p className="text-xs text-muted-foreground">CTA engagement rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.unique}</div>
            <p className="text-xs text-muted-foreground">Unique referrers</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Engagement by Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} width={150} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Traffic Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      {insightsLoading ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <Spinner />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights?.suggestions && Array.isArray(insights.suggestions) && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Suggestions:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {insights.suggestions.map((suggestion: string, idx: number) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {insights?.conclusion && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Conclusion:</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insights.conclusion}</p>
                </div>
              )}

              {insights?.topPerformers && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Top Performing CTAs:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {insights.topPerformers.map((performer: any, idx: number) => (
                      <li key={idx}>• {performer.action}: {performer.count} clicks ({performer.percentage}%)</li>
                    ))}
                  </ul>
                </div>
              )}

              {!insights && (
                <p className="text-sm text-muted-foreground">No analytics data available yet. Start collecting data to see insights.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </AdminLayout>
  );
}
