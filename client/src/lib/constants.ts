import { LayoutDashboard, Key, Users, BarChart3, Package, ScanLine, Smartphone, CloudUpload, WifiOff, LogOut, FileText, Star, Settings, TrendingUp } from "lucide-react";

export const FEATURES = [
  {
    title: "Inventory Management",
    description: "Track stock levels, expiration dates, and reorder points automatically.",
    icon: Package,
  },
  {
    title: "AI Receipt Scanning",
    description: "Instantly capture and digitize supplier invoices with advanced AI OCR.",
    icon: ScanLine,
  },
  {
    title: "Multi-user Access",
    description: "Secure PIN login for staff with granular permission controls.",
    icon: Users,
  },
  {
    title: "Sales & Analytics",
    description: "Real-time reports on daily sales, profits, and top-selling products.",
    icon: BarChart3,
  },
  {
    title: "Offline Capable",
    description: "Keep selling even when the internet is down. Syncs when back online.",
    icon: WifiOff,
  },
  {
    title: "Cloud Sync",
    description: "Powered by Supabase for secure, reliable data storage and backup.",
    icon: CloudUpload,
  },
];

export const MOCK_LICENSES = [
  {
    id: 1,
    key: "AGRO-8821-XJY9-2201",
    status: "Active",
    shop: "GreenFields Agro",
    expiry: "2025-12-31",
    created: "2024-12-01",
  },
  {
    id: 2,
    key: "AGRO-9921-MMK2-1002",
    status: "Used",
    shop: "Valley Vet Center",
    expiry: "2025-06-30",
    created: "2024-11-15",
  },
  {
    id: 3,
    key: "AGRO-7732-KKL9-3321",
    status: "Unused",
    shop: "-",
    expiry: "2025-12-31",
    created: "2025-01-10",
  },
  {
    id: 4,
    key: "AGRO-5541-PPL0-8821",
    status: "Unused",
    shop: "-",
    expiry: "2025-12-31",
    created: "2025-01-12",
  },
  {
    id: 5,
    key: "AGRO-1122-QWE3-4455",
    status: "Expired",
    shop: "Highland Feed & Seed",
    expiry: "2024-12-01",
    created: "2023-12-01",
  },
];

export const MOCK_CLIENTS = [
  {
    id: 1,
    name: "GreenFields Agro",
    location: "Nakuru, Kenya",
    phone: "+254 712 345 678",
    status: "Active",
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    name: "Valley Vet Center",
    location: "Eldoret, Kenya",
    phone: "+254 722 987 654",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Highland Feed & Seed",
    location: "Kericho, Kenya",
    phone: "+254 733 111 222",
    status: "Inactive",
    lastActive: "2 months ago",
  },
];

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { label: "License Keys", href: "/admin/licenses", icon: Key },
  { label: "Create Content", href: "/admin/content", icon: FileText },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];
