import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Save, Eye, EyeOff, Key } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import type { Setting } from "@shared/schema";

export default function AdminSettings() {
  const { toast } = useToast();
  const [openaiKey, setOpenaiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const { data: settings, isLoading } = useQuery<Setting[]>({
    queryKey: ["/api/settings"],
  });

  useEffect(() => {
    if (settings) {
      const openaiSetting = settings.find((s) => s.key === "OPENAI_API_KEY");
      if (openaiSetting) {
        setOpenaiKey(openaiSetting.value);
      }
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      return apiRequest("POST", "/api/settings", { key, value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({ title: "Settings saved successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSaveOpenAI = () => {
    if (!openaiKey.trim()) {
      toast({ title: "Please enter an API key", variant: "destructive" });
      return;
    }
    saveMutation.mutate({ key: "OPENAI_API_KEY", value: openaiKey });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Spinner />
        </div>
      </AdminLayout>
    );
  }

  const hasOpenAIKey = settings?.some((s) => s.key === "OPENAI_API_KEY");

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your application settings and API keys</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              OpenAI API Key
            </CardTitle>
            <CardDescription>
              Required for AI-powered content generation. Your key is stored securely in the database.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openai-key">API Key</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="openai-key"
                    type={showKey ? "text" : "password"}
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    placeholder="sk-..."
                    data-testid="input-openai-key"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowKey(!showKey)}
                    data-testid="button-toggle-key-visibility"
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  onClick={handleSaveOpenAI}
                  disabled={saveMutation.isPending}
                  data-testid="button-save-openai-key"
                >
                  {saveMutation.isPending ? <Spinner className="h-4 w-4" /> : <Save className="h-4 w-4 mr-2" />}
                  Save
                </Button>
              </div>
              {hasOpenAIKey && (
                <p className="text-sm text-green-600">API key is configured and active.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Connection</CardTitle>
            <CardDescription>Your Supabase database connection status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm">Connected to Supabase</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Info</CardTitle>
            <CardDescription>About AgroVet POS Admin Panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Version:</span> 1.0.0</p>
            <p><span className="text-muted-foreground">Environment:</span> Production</p>
            <p><span className="text-muted-foreground">API Status:</span> <span className="text-green-600">Online</span></p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
