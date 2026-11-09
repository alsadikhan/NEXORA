'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockResetPasswordApi } from '@/lib/auth';

// Component with form functionality
function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Use the mock reset password API
      const result = await mockResetPasswordApi(email);
      
      if (result.success) {
        // Show success message
        setIsSubmitted(true);
      } else {
        setError(result.error || 'Failed to send reset link');
      }
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block">
          <h1 className="font-heading text-3xl font-bold tracking-tighter text-primary">NEXORA</h1>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Reset your password
        </h2>
        <p className="text-gray-600">
          {isSubmitted 
            ? "We've sent you an email with reset instructions" 
            : "Enter your email and we'll send you a link to reset your password"}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {isSubmitted ? (
        <div className="space-y-6">
          <div className="p-5 bg-green-50 border border-green-200 rounded-lg text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-green-800 mb-1">Check your email</h3>
            <p className="text-green-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-green-500 mt-2">
              Didn't receive the email? Check your spam folder or request another link.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <Button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50 hover:text-black"
            >
              Try another email
            </Button>
            
            <div>
              <Link 
                href="/login" 
                className="text-sm font-medium text-black hover:underline inline-flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 pl-10 bg-white border-gray-200 focus:ring-black focus:border-black"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending reset link...
              </div>
            ) : (
              'Send reset link'
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link href="/login" className="font-semibold text-black hover:underline">
                Back to login
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

// Loading fallback for Suspense
function ForgotPasswordSkeleton() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-block">
          <div className="font-heading text-3xl font-bold tracking-tighter text-primary">NEXORA</div>
        </div>
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-100 rounded mx-auto animate-pulse"></div>
      </div>
      <div className="space-y-6">
        <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Link 
          href="/" 
          className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
          <Suspense fallback={<ForgotPasswordSkeleton />}>
            <ForgotPasswordForm />
          </Suspense>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-900 relative">
          <Image
            src="https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg"
            alt="Fashion showcase"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-md text-center text-white">
              <h2 className="text-3xl font-bold mb-4">We've Got You Covered</h2>
              <p className="text-lg text-white/80">
                Reset your password and get back to shopping your favorite styles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 