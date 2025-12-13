import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MOCK_LICENSES } from "@/lib/constants";
import { Plus, Search, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Licenses() {
  const { toast } = useToast();
  const [licenses, setLicenses] = useState(MOCK_LICENSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newKey = `AGRO-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`;
    const newLicense = {
      id: licenses.length + 1,
      key: newKey,
      status: "Unused",
      shop: shopName || "-", // Use the entered shop name
      expiry: "2025-12-31", // Default 1 year
      created: new Date().toISOString().split('T')[0],
    };
    
    setLicenses([newLicense, ...licenses]);
    setIsGenerateOpen(false);
    
    // Reset form
    setShopName("");
    setPhone("");
    
    toast({
      title: "License Generated",
      description: `New key: ${newKey} for ${shopName}`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "License key copied to clipboard",
    });
  };

  const filteredLicenses = licenses.filter(l => 
    l.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.shop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">License Management</h1>
          <p className="text-muted-foreground">Generate and manage software licenses.</p>
        </div>
        
        <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2 shadow-md">
              <Plus className="h-5 w-5" /> Generate New Key
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Generate License Key</DialogTitle>
              <DialogDescription>
                Create a new license key to activate the AgroVet POS desktop application.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleGenerate}>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">License Type</Label>
                  <Select defaultValue="annual">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Subscription (1 Year)</SelectItem>
                      <SelectItem value="lifetime">Lifetime Access</SelectItem>
                      <SelectItem value="trial">30-Day Trial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client">Shop/Client Name</Label>
                  <Input 
                    id="client" 
                    placeholder="e.g. GreenFields Agro" 
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Contact Phone (Optional)</Label>
                  <Input 
                    id="phone" 
                    placeholder="+254..." 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" size="lg" className="w-full">Generate & Activate Key</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-4 border-b flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search keys or shops..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License Key</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLicenses.map((license) => (
              <TableRow key={license.id}>
                <TableCell className="font-mono font-medium">{license.key}</TableCell>
                <TableCell>
                  <Badge variant={
                    license.status === "Active" ? "default" : 
                    license.status === "Unused" ? "secondary" : 
                    "destructive"
                  } className={
                    license.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-200 border-transparent shadow-none" : 
                    license.status === "Unused" ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-transparent shadow-none" : 
                    "bg-red-100 text-red-700 hover:bg-red-200 border-transparent shadow-none"
                  }>
                    {license.status}
                  </Badge>
                </TableCell>
                <TableCell>{license.shop}</TableCell>
                <TableCell>{license.created}</TableCell>
                <TableCell>{license.expiry}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(license.key)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
