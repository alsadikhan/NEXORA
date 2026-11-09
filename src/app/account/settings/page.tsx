'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { requireAuth } from '@/lib/auth';

export default function AccountSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    notifications: {
      email: true,
      sms: false,
    },
  });
  
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = requireAuth(router);
    
    if (isAuthenticated) {
      setIsAuthenticated(true);
      
      // Simulate fetching user data
      setTimeout(() => {
        setFormData({
          email: 'user@example.com',
          name: 'John Doe',
          phone: '+1 (555) 123-4567',
          notifications: {
            email: true,
            sms: false,
          },
        });
        setIsLoading(false);
      }, 800);
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.startsWith('notifications.')) {
        const notificationType = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [notificationType]: checked
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message or handle response
    setIsSaving(false);
    
    // Optionally show a success message
    alert('Settings saved successfully!');
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

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link 
              href="/account" 
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to account
            </Link>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Settings header */}
            <div className="px-6 py-6 sm:px-8 sm:py-7 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">Account Settings</h1>
              <p className="mt-1 text-sm text-gray-500">Update your account preferences and personal information</p>
            </div>

            {/* Settings form */}
            <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8 sm:py-7 space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-10 bg-white border-gray-200 focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-10 bg-white border-gray-200 focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-10 bg-white border-gray-200 focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications.email"
                        name="notifications.email"
                        type="checkbox"
                        checked={formData.notifications.email}
                        onChange={handleChange}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications.email" className="font-medium text-gray-700">Email notifications</label>
                      <p className="text-gray-500">Receive order updates and promotional offers via email</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications.sms"
                        name="notifications.sms"
                        type="checkbox"
                        checked={formData.notifications.sms}
                        onChange={handleChange}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications.sms" className="font-medium text-gray-700">SMS notifications</label>
                      <p className="text-gray-500">Receive order status updates via text message</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy and Security */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy and Security</h2>
                <div className="space-y-4">
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 hover:text-black"
                      onClick={() => router.push('/change-password')}
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 