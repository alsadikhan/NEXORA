'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inter } from "next/font/google";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Bell, 
  Menu, 
  X,
  BarChart3,
  Percent,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { AdminNotification } from '@/types/admin';
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  submenu?: {
    title: string;
    href: string;
  }[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: <Package className="w-5 h-5" />,
    submenu: [
      { title: 'All Products', href: '/admin/products' },
      { title: 'Add New', href: '/admin/products/new' },
      { title: 'Categories', href: '/admin/products/categories' },
      { title: 'Inventory', href: '/admin/products/inventory' },
    ],
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: <ShoppingBag className="w-5 h-5" />,
    badge: 5,
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: 'Marketing',
    href: '/admin/marketing',
    icon: <BarChart3 className="w-5 h-5" />,
    submenu: [
      { title: 'Analytics', href: '/admin/marketing/analytics' },
      { title: 'Campaigns', href: '/admin/marketing/campaigns' },
    ],
  },
  {
    title: 'Discounts',
    href: '/admin/discounts',
    icon: <Percent className="w-5 h-5" />,
  },
  {
    title: 'Reviews',
    href: '/admin/reviews',
    icon: <MessageSquare className="w-5 h-5" />,
    badge: 2,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

// Mock notifications for demo
const mockNotifications: AdminNotification[] = [
  {
    id: '1',
    type: 'order',
    title: 'New Order #1234',
    message: 'A new order has been placed',
    isRead: false,
    createdAt: new Date().toISOString(),
    link: '/admin/orders/1234'
  },
  {
    id: '2',
    type: 'inventory',
    title: 'Low Stock Alert',
    message: 'Premium Cotton T-Shirt is running low on stock',
    isRead: false,
    createdAt: new Date().toISOString(),
    link: '/admin/products/inventory'
  },
  {
    id: '3',
    type: 'system',
    title: 'System Update',
    message: 'The system will be updated tonight at 2 AM',
    isRead: true,
    createdAt: new Date().toISOString()
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [notifications, setNotifications] = useState<AdminNotification[]>(mockNotifications);
  const pathname = usePathname();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSubmenu = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    // This wrapper prevents the main site layout from being applied
    <div className={`min-h-screen h-screen flex bg-gray-50 overflow-hidden ${inter.className}`}>
      <Toaster position="top-right" richColors closeButton />
      {/* Sidebar - fixed position */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:relative",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b sticky top-0 bg-white z-10">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="font-bold text-xl">NEXORA Admin</div>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar content - scrollable */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href || (pathname && pathname.startsWith(`${item.href}/`));
                const isExpanded = expandedItems[item.title];
                
                return (
                  <div key={item.title}>
                    {item.submenu ? (
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-between",
                            isActive && "bg-gray-100 text-black font-medium"
                          )}
                          onClick={() => toggleSubmenu(item.title)}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-3">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-2 bg-gray-200 text-gray-700">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isExpanded && "transform rotate-180"
                            )}
                          />
                        </Button>
                        {isExpanded && (
                          <div className="ml-6 space-y-1">
                            {item.submenu.map((subItem) => {
                              const isSubActive = pathname === subItem.href;
                              return (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  className={cn(
                                    "block py-2 px-3 rounded-md text-sm",
                                    isSubActive
                                      ? "bg-gray-100 text-black font-medium"
                                      : "text-gray-700 hover:bg-gray-100"
                                  )}
                                >
                                  {subItem.title}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md",
                          isActive
                            ? "bg-gray-100 text-black font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto bg-gray-200 text-gray-700">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Sidebar footer - fixed at bottom */}
          <div className="h-16 flex items-center px-4 border-t sticky bottom-0 bg-white">
            <Button variant="ghost" className="w-full justify-start text-red-600">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - fixed */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center ml-auto space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs h-auto py-1"
                    >
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-gray-500">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-0">
                      <Link
                        href={notification.link || '#'}
                        className={cn(
                          "w-full p-3 flex flex-col space-y-1",
                          !notification.isRead && "bg-blue-50"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{notification.title}</span>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                        <span className="text-sm text-gray-600">{notification.message}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(notification.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/notifications" className="w-full text-center text-sm text-blue-600">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/admin.png" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content - scrollable */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 