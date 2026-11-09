'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Mail, 
  ArrowDownToLine,
  CheckCircle,
  XCircle
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
import { User } from '@/types/admin';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

// Mock customers data
const mockCustomers: User[] = [
  {
    id: 'c1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '+8801712345678',
    createdAt: '2023-06-15T10:30:00Z',
    lastLogin: '2023-08-07T14:25:00Z',
    isActive: true
  },
  {
    id: 'c2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '+8801812345678',
    createdAt: '2023-06-20T11:45:00Z',
    lastLogin: '2023-08-06T09:15:00Z',
    isActive: true
  },
  {
    id: 'c3',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    phone: '+8801912345678',
    createdAt: '2023-07-05T14:20:00Z',
    lastLogin: '2023-08-05T16:40:00Z',
    isActive: true
  },
  {
    id: 'c4',
    firstName: 'Emily',
    lastName: 'Wilson',
    email: 'emily@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=9',
    phone: '+8801612345678',
    createdAt: '2023-07-12T09:10:00Z',
    lastLogin: '2023-08-07T11:30:00Z',
    isActive: true
  },
  {
    id: 'c5',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=11',
    phone: '+8801512345678',
    createdAt: '2023-07-18T16:35:00Z',
    lastLogin: '2023-07-30T08:45:00Z',
    isActive: false
  },
  {
    id: 'c6',
    firstName: 'Sarah',
    lastName: 'Davis',
    email: 'sarah@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=10',
    phone: '+8801612987654',
    createdAt: '2023-07-25T13:50:00Z',
    lastLogin: '2023-08-04T17:20:00Z',
    isActive: true
  },
  {
    id: 'c7',
    firstName: 'David',
    lastName: 'Miller',
    email: 'david@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=12',
    phone: '+8801712987654',
    createdAt: '2023-08-01T10:15:00Z',
    lastLogin: '2023-08-06T12:10:00Z',
    isActive: true
  },
  {
    id: 'a1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=68',
    phone: '+8801812987654',
    createdAt: '2023-01-10T09:00:00Z',
    lastLogin: '2023-08-07T09:30:00Z',
    isActive: true
  },
  {
    id: 'm1',
    firstName: 'Manager',
    lastName: 'User',
    email: 'manager@example.com',
    role: 'manager',
    avatar: 'https://i.pravatar.cc/150?img=69',
    phone: '+8801912987654',
    createdAt: '2023-02-15T11:30:00Z',
    lastLogin: '2023-08-07T10:45:00Z',
    isActive: true
  }
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Helper function to get initials from name
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Helper function to get time since last login
const getTimeSince = (dateString: string | undefined) => {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }
  if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }
  
  return formatDate(dateString);
};

export default function CustomersPage() {
  const [customers] = useState<User[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 8;

  // Filter and sort customers
  const filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || 
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (customer.phone && customer.phone.includes(searchQuery));
    const matchesRole = selectedRole === 'all' || customer.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && customer.isActive) ||
                         (selectedStatus === 'inactive' && !customer.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      case 'name-desc':
        return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
      case 'email-asc':
        return a.email.localeCompare(b.email);
      case 'email-desc':
        return b.email.localeCompare(a.email);
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedCustomers.length === paginatedCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(paginatedCustomers.map(customer => customer.id));
    }
  };

  const handleSelectCustomer = (id: string) => {
    setSelectedCustomers(prev => 
      prev.includes(id) 
        ? prev.filter(customerId => customerId !== id)
        : [...prev, id]
    );
  };

  // Role options
  const roleOptions = ['all', 'customer', 'admin', 'manager', 'editor'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-gray-500">Manage your customers and users</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/customers/new">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
          <Button variant="outline">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Customer stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.role === 'customer').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.role === 'customer' && c.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => {
                const date = new Date(c.createdAt);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Staff Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.role !== 'customer').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Customer Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search customers..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="email-asc">Email (A-Z)</SelectItem>
                  <SelectItem value="email-desc">Email (Z-A)</SelectItem>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk actions */}
          {selectedCustomers.length > 0 && (
            <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedCustomers.length} {selectedCustomers.length === 1 ? 'customer' : 'customers'} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Customers table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedCustomers.length === paginatedCustomers.length && paginatedCustomers.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all customers"
                    />
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedCustomers.includes(customer.id)}
                          onCheckedChange={() => handleSelectCustomer(customer.id)}
                          aria-label={`Select ${customer.firstName} ${customer.lastName}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={customer.avatar} alt={`${customer.firstName} ${customer.lastName}`} />
                            <AvatarFallback>{getInitials(customer.firstName, customer.lastName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.firstName} {customer.lastName}</div>
                            <div className="text-xs text-gray-500">{customer.phone || 'No phone'}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <Badge variant={customer.role === 'customer' ? 'outline' : 'default'} className={
                          customer.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          customer.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                          customer.role === 'editor' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {customer.role.charAt(0).toUpperCase() + customer.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(customer.createdAt)}</TableCell>
                      <TableCell>{getTimeSince(customer.lastLogin)}</TableCell>
                      <TableCell className="text-center">
                        {customer.isActive ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1 justify-center">
                            <CheckCircle className="h-3 w-3" />
                            <span>Active</span>
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center gap-1 justify-center">
                            <XCircle className="h-3 w-3" />
                            <span>Inactive</span>
                          </Badge>
                        )}
                      </TableCell>
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
                              <Link href={`/admin/customers/${customer.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/customers/${customer.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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