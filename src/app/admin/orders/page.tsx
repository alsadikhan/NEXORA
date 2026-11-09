'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  FileText, 
  Printer, 
  ArrowDownToLine,
  CheckCircle,
  XCircle,
  Clock,
  TruckIcon,
  PackageCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Order, OrderStatus, PaymentStatus } from '@/types/admin';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

// Mock orders data
const mockOrders: Order[] = [
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
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2023-08-10'
  },
  {
    id: '4',
    orderNumber: 'ORD-1237',
    customerId: 'C004',
    customerName: 'Emily Wilson',
    customerEmail: 'emily@example.com',
    items: [
      {
        id: '5',
        productId: '6',
        name: 'Heritage Embroidered Polo',
        price: 799,
        quantity: 1,
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995415/66cd75ad24196-square_gly7is.png',
        size: 'L',
        total: 799
      }
    ],
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    subtotal: 799,
    shipping: 50,
    tax: 80,
    discount: 0,
    total: 929,
    createdAt: '2023-08-05T11:45:00Z',
    updatedAt: '2023-08-07T14:30:00Z',
    shippingAddress: {
      firstName: 'Emily',
      lastName: 'Wilson',
      addressLine1: '101 Lake View',
      city: 'Dhaka',
      state: 'Dhaka',
      postalCode: '1212',
      country: 'Bangladesh',
      phone: '+8801612345678'
    },
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2023-08-07'
  },
  {
    id: '5',
    orderNumber: 'ORD-1238',
    customerId: 'C005',
    customerName: 'Michael Brown',
    customerEmail: 'michael@example.com',
    items: [
      {
        id: '6',
        productId: '4',
        name: 'Essential Performance Tee',
        price: 545,
        quantity: 2,
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-75_utfpmc.jpg',
        size: 'S',
        total: 1090
      }
    ],
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'bkash',
    subtotal: 1090,
    shipping: 50,
    tax: 109,
    discount: 0,
    total: 1249,
    createdAt: '2023-08-04T16:20:00Z',
    updatedAt: '2023-08-05T09:10:00Z',
    shippingAddress: {
      firstName: 'Michael',
      lastName: 'Brown',
      addressLine1: '45 Green Road',
      city: 'Dhaka',
      state: 'Dhaka',
      postalCode: '1205',
      country: 'Bangladesh',
      phone: '+8801512345678'
    }
  }
];

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

// Helper function to get status badge
const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Pending</span>
        </Badge>
      );
    case 'processing':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 flex items-center gap-1">
          <PackageCheck className="h-3 w-3" />
          <span>Processing</span>
        </Badge>
      );
    case 'shipped':
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 flex items-center gap-1">
          <TruckIcon className="h-3 w-3" />
          <span>Shipped</span>
        </Badge>
      );
    case 'delivered':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          <span>Delivered</span>
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          <span>Cancelled</span>
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Helper function to get payment status badge
const getPaymentStatusBadge = (status: PaymentStatus) => {
  switch (status) {
    case 'paid':
      return <Badge variant="outline" className="bg-green-100 text-green-800">Paid</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'failed':
      return <Badge variant="outline" className="bg-red-100 text-red-800">Failed</Badge>;
    case 'refunded':
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">Refunded</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Filter and sort orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'total-asc':
        return a.total - b.total;
      case 'total-desc':
        return b.total - a.total;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    }
  };

  const handleSelectOrder = (id: string) => {
    setSelectedOrders(prev => 
      prev.includes(id) 
        ? prev.filter(orderId => orderId !== id)
        : [...prev, id]
    );
  };

  // Get status options
  const statusOptions: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'on_hold'];
  const paymentStatusOptions: PaymentStatus[] = ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-500">Manage and process customer orders</p>
        </div>
        <Button variant="outline">
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      {/* Order stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(order => order.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(order => order.status === 'processing').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(order => order.status === 'delivered').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search orders..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment Status</SelectItem>
                  {paymentStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest First)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
                  <SelectItem value="total-desc">Total (High to Low)</SelectItem>
                  <SelectItem value="total-asc">Total (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk actions */}
          {selectedOrders.length > 0 && (
            <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedOrders.length} {selectedOrders.length === 1 ? 'order' : 'orders'} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          )}

          {/* Orders table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all orders"
                    />
                  </TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => handleSelectOrder(order.id)}
                          aria-label={`Select order ${order.orderNumber}`}
                        />
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/orders/${order.id}`} className="font-medium text-blue-600 hover:underline">
                          #{order.orderNumber}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.customerEmail}</div>
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {getPaymentStatusBadge(order.paymentStatus)}
                          <div className="text-xs text-gray-500">{order.paymentMethod.replace('_', ' ')}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/orders/${order.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Print Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    
                    // Show ellipsis for gaps
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 