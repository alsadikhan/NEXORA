'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Package, 
  ShoppingBag, 
  Users, 
  AlertTriangle,
  ArrowRight,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardStats, Order } from '@/types/admin';
import { Badge } from '@/components/ui/badge';

// Mock data for demonstration
const mockStats: DashboardStats = {
  totalSales: 24850,
  totalOrders: 128,
  averageOrderValue: 194,
  pendingOrders: 5,
  lowStockProducts: 8,
  totalCustomers: 256,
  revenueByDay: [
    { date: '2023-08-01', revenue: 1250 },
    { date: '2023-08-02', revenue: 1800 },
    { date: '2023-08-03', revenue: 1600 },
    { date: '2023-08-04', revenue: 2100 },
    { date: '2023-08-05', revenue: 1900 },
    { date: '2023-08-06', revenue: 2400 },
    { date: '2023-08-07', revenue: 2200 },
  ],
  topSellingProducts: [
    { 
      id: '1', 
      name: 'Premium Cotton T-Shirt', 
      unitsSold: 48, 
      revenue: 23952, 
      image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995324/blank-tshirt-14_cfsydj.jpg' 
    },
    { 
      id: '2', 
      name: 'Slim Fit Polo Shirt', 
      unitsSold: 32, 
      revenue: 22368, 
      image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995427/image-157_xsbuoe.jpg' 
    },
    { 
      id: '3', 
      name: 'Signature Collection Tee', 
      unitsSold: 24, 
      revenue: 14376, 
      image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817871/tshirt-6_dzfego.jpg' 
    },
  ],
  recentOrders: [
    {
      id: '1',
      orderNumber: 'ORD-1234',
      customerId: 'C001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      items: [
        {
          id: '1',
          productId: '1',
          name: 'Premium Cotton T-Shirt',
          price: 499,
          quantity: 2,
          image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995324/blank-tshirt-14_cfsydj.jpg',
          color: '#000000',
          size: 'L',
          total: 998
        }
      ],
      status: 'pending',
      paymentStatus: 'paid',
      paymentMethod: 'credit_card',
      subtotal: 998,
      shipping: 50,
      tax: 100,
      discount: 0,
      total: 1148,
      createdAt: '2023-08-07T10:30:00Z',
      updatedAt: '2023-08-07T10:30:00Z',
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        addressLine1: '123 Main St',
        city: 'Dhaka',
        state: 'Dhaka',
        postalCode: '1000',
        country: 'Bangladesh',
        phone: '+8801712345678'
      }
    },
    {
      id: '2',
      orderNumber: 'ORD-1235',
      customerId: 'C002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      items: [
        {
          id: '2',
          productId: '2',
          name: 'Slim Fit Polo Shirt',
          price: 699,
          quantity: 1,
          image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995427/image-157_xsbuoe.jpg',
          color: '#1C2833',
          size: 'M',
          total: 699
        }
      ],
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'bkash',
      subtotal: 699,
      shipping: 50,
      tax: 70,
      discount: 0,
      total: 819,
      createdAt: '2023-08-07T09:15:00Z',
      updatedAt: '2023-08-07T09:30:00Z',
      shippingAddress: {
        firstName: 'Jane',
        lastName: 'Smith',
        addressLine1: '456 Park Ave',
        city: 'Chittagong',
        state: 'Chittagong',
        postalCode: '4000',
        country: 'Bangladesh',
        phone: '+8801812345678'
      }
    },
    {
      id: '3',
      orderNumber: 'ORD-1236',
      customerId: 'C003',
      customerName: 'Robert Johnson',
      customerEmail: 'robert@example.com',
      items: [
        {
          id: '3',
          productId: '3',
          name: 'Signature Collection Tee',
          price: 599,
          quantity: 1,
          image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817871/tshirt-6_dzfego.jpg',
          size: 'M',
          total: 599
        },
        {
          id: '4',
          productId: '5',
          name: 'Lightweight Merino Tee',
          price: 445,
          quantity: 1,
          image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817863/tshirt-38_jwjr9w.jpg',
          color: '#283747',
          size: 'L',
          total: 445
        }
      ],
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'nagad',
      subtotal: 1044,
      shipping: 50,
      tax: 104,
      discount: 100,
      total: 1098,
      createdAt: '2023-08-06T14:20:00Z',
      updatedAt: '2023-08-07T08:15:00Z',
      shippingAddress: {
        firstName: 'Robert',
        lastName: 'Johnson',
        addressLine1: '789 Broadway',
        city: 'Sylhet',
        state: 'Sylhet',
        postalCode: '3100',
        country: 'Bangladesh',
        phone: '+8801912345678'
      }
    }
  ]
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return `৳${amount.toLocaleString()}`;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Helper function to get status color
const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get payment status color
const getPaymentStatusColor = (status: Order['paymentStatus']) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('week');
  
  // In a real app, you would fetch data based on the selected time range
  const stats = mockStats;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your store dashboard.</p>
      </div>

      {/* Time range selector */}
      <Tabs defaultValue="week" className="w-full" onValueChange={(value) => setTimeRange(value as any)}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
        </div>

        {/* Key metrics */}
        <TabsContent value="week" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Sales */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(stats.totalSales)}</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>12% from last week</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>8% from last week</span>
                </div>
              </CardContent>
            </Card>

            {/* Average Order Value */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                <Package className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(stats.averageOrderValue)}</div>
                <div className="flex items-center pt-1 text-xs text-red-600">
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                  <span>3% from last week</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Customers */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>5% from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-l-4 border-yellow-500">
              <CardHeader className="flex flex-row items-center pb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                <p className="text-xs text-gray-500">Orders awaiting processing</p>
              </CardContent>
              <CardFooter>
                <Link href="/admin/orders?status=pending">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-l-4 border-red-500">
              <CardHeader className="flex flex-row items-center pb-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                <CardTitle className="text-sm font-medium">Low Stock Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.lowStockProducts}</div>
                <p className="text-xs text-gray-500">Products below threshold</p>
              </CardContent>
              <CardFooter>
                <Link href="/admin/products/inventory?filter=low-stock">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Your best performing products this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topSellingProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.unitsSold} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/products">
                <Button variant="outline" size="sm">
                  View All Products
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-2 pl-2">Order</th>
                      <th className="text-left font-medium py-2">Customer</th>
                      <th className="text-left font-medium py-2">Date</th>
                      <th className="text-left font-medium py-2">Status</th>
                      <th className="text-left font-medium py-2">Payment</th>
                      <th className="text-right font-medium py-2 pr-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3 pl-2">
                          <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:underline">
                            #{order.orderNumber}
                          </Link>
                        </td>
                        <td className="py-3">{order.customerName}</td>
                        <td className="py-3">{formatDate(order.createdAt)}</td>
                        <td className="py-3">
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" className={getPaymentStatusColor(order.paymentStatus)}>
                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 pr-2 text-right font-medium">{formatCurrency(order.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm">
                  View All Orders
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Placeholder for other time ranges */}
        <TabsContent value="today">
          <div className="py-10 text-center text-gray-500">
            Today's data would be displayed here
          </div>
        </TabsContent>
        <TabsContent value="month">
          <div className="py-10 text-center text-gray-500">
            This month's data would be displayed here
          </div>
        </TabsContent>
        <TabsContent value="year">
          <div className="py-10 text-center text-gray-500">
            This year's data would be displayed here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 