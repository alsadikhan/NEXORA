'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { requireAuth, logout } from '@/lib/auth';
import { useSession } from 'next-auth/react';

export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === 'loading') return;

    // Check if user is authenticated
    const isAuthenticated = requireAuth(router, sessionStatus === 'authenticated');
    
    if (isAuthenticated) {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router, sessionStatus]);

  const handleLogout = () => {
    // Use the logout utility
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  const accountMenuItems = [
    { 
      icon: <User className="w-5 h-5" />, 
      title: 'Personal Information', 
      description: 'Manage your personal details', 
      href: '/account/profile' 
    },
    { 
      icon: <Package className="w-5 h-5" />, 
      title: 'Orders', 
      description: 'View your order history', 
      href: '/account/orders' 
    },
    { 
      icon: <Heart className="w-5 h-5" />, 
      title: 'Wishlist', 
      description: 'Items you\'ve saved', 
      href: '/wishlist' 
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      title: 'Account Settings', 
      description: 'Manage your account preferences', 
      href: '/account/settings' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Account header */}
            <div className="px-6 py-8 sm:p-10 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
                  <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Account menu grid */}
            <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {accountMenuItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href}
                  className="group flex items-start p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-white border border-gray-200 text-gray-500 group-hover:text-black transition-colors">
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-black">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent orders preview */}
          <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                <div className="mt-6">
                  <Link
                    href="/shop"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 