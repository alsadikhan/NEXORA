'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { mockLoginApi, login } from '@/lib/auth';
import { signIn } from 'next-auth/react';

// Separate component to handle search params
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGoogleConfigured, setIsGoogleConfigured] = useState(false);
  const [hasCheckedGoogleConfig, setHasCheckedGoogleConfig] = useState(false);
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if user just registered
    const registered = searchParams ? searchParams.get('registered') : null;
    if (registered === 'true') {
      setSuccessMessage('Account created successfully! Please log in with your credentials.');
    }

    const authError = searchParams?.get('error');
    if (authError) {
      setError('Google sign-in failed. Check your OAuth settings and try again.');
    }
  }, [searchParams]);

  useEffect(() => {
    let isActive = true;

    const checkGoogleConfiguration = async () => {
      try {
        const response = await fetch('/api/auth/providers');
        if (!response.ok) {
          throw new Error(`Provider check failed with status ${response.status}`);
        }

        const providers: Record<string, unknown> = await response.json();
        if (isActive) {
          setIsGoogleConfigured(Object.hasOwn(providers, 'google'));
          setHasCheckedGoogleConfig(true);
        }
      } catch (configError) {
        console.error('Google provider check failed:', configError);
        if (isActive) {
          setError('Unable to check Google sign-in configuration. Please try again later.');
          setHasCheckedGoogleConfig(true);
        }
      }
    };

    void checkGoogleConfiguration();
    return () => {
      isActive = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Use the mock login API
      const result = await mockLoginApi(email, password);
      
      if (result.success && result.token) {
        // Login and redirect to home page
        login(result.token, '/');
      } else {
        setError(result.error || 'An error occurred during login');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');

    try {
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: false,
      });

      if (result?.error) {
        setError('Google sign-in failed. Check the OAuth configuration and try again.');
        return;
      }

      if (!result?.url) {
        setError('Google sign-in could not be started. Please try again.');
        return;
      }

      window.location.assign(result.url);
    } catch (signInError) {
      console.error('Google sign-in error:', signInError);
      setError('Google sign-in is unavailable. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block">
          <h1 className="font-heading text-3xl font-bold tracking-tighter text-primary">NEXORA</h1>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p className="text-gray-600">
          Sign in to your account to continue shopping
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
          {successMessage}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
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

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs font-medium text-black hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pl-10 bg-white border-gray-200 focus:ring-black focus:border-black"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
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
              Signing in...
            </div>
          ) : (
            'Sign in'
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || !isGoogleConfigured}
            className="flex justify-center items-center py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isGoogleLoading ? 'Connecting to Google...' : 'Google'}
          </button>
        </div>
        {hasCheckedGoogleConfig && !isGoogleConfigured && (
          <p className="text-center text-xs text-gray-500">
            Add the Google client secret to your local environment to enable Google sign-in.
          </p>
        )}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

// Loading fallback for Suspense
function LoginFormSkeleton() {
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
        <div className="space-y-4">
          <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-5 bg-gray-100 rounded animate-pulse"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
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
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-900 relative">
          <Image
            src="https://res.cloudinary.com/dfijxvhfl/image/upload/v1748991861/mens-collection_zppszp.png"
            alt="Fashion showcase"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-md text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Premium Fashion Collection</h2>
              <p className="text-lg text-white/80">
                Discover the latest trends and timeless classics from our collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 