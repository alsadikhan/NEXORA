'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { mockSignupApi } from '@/lib/auth';

// Component that uses router
function SignupForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password: string) => {
    const requirements = [
      { test: password.length >= 8, text: 'At least 8 characters' },
      { test: /[A-Z]/.test(password), text: 'At least one uppercase letter' },
      { test: /[a-z]/.test(password), text: 'At least one lowercase letter' },
      { test: /[0-9]/.test(password), text: 'At least one number' },
      { test: /[^A-Za-z0-9]/.test(password), text: 'At least one special character' },
    ];
    return requirements;
  };

  const passwordRequirements = validatePassword(formData.password);
  const passwordStrength = passwordRequirements.filter(req => req.test).length;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill out all fields');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Your password is not strong enough');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Use the mock signup API
      const result = await mockSignupApi({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        // Redirect to login with success message
        router.push('/login?registered=true');
      } else {
        setError(result.error || 'Failed to create account');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error('Registration error:', err);
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
          Create an account
        </h2>
        <p className="text-gray-600">
          Join us for a premium shopping experience
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Progress steps */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-xs flex items-center">
          <div className={`flex-1 ${step === 1 ? 'text-black' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full border-2 ${step === 1 ? 'border-black bg-black text-white' : 'border-gray-300'}`}>
              1
            </div>
            <div className="text-xs text-center mt-1">Your info</div>
          </div>
          <div className={`flex-1 border-t-2 ${step > 1 ? 'border-black' : 'border-gray-300'}`}></div>
          <div className={`flex-1 ${step === 2 ? 'text-black' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full border-2 ${step === 2 ? 'border-black bg-black text-white' : 'border-gray-300'}`}>
              2
            </div>
            <div className="text-xs text-center mt-1">Security</div>
          </div>
        </div>
      </div>

      {step === 1 ? (
        <form className="space-y-6" onSubmit={handleNextStep}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-12 pl-10 bg-white border-gray-200 focus:ring-black focus:border-black"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-12 bg-white border-gray-200 focus:ring-black focus:border-black"
                  placeholder="Last Name"
                />
              </div>
            </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 pl-10 bg-white border-gray-200 focus:ring-black focus:border-black"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white text-base font-medium"
          >
            Continue
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-black hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Create password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 pl-10 bg-white border-gray-200 focus:ring-black focus:border-black"
                  placeholder="Create a password"
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
              
              {/* Password strength indicators */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        passwordStrength > i 
                          ? passwordStrength >= 4
                            ? 'bg-green-500'
                            : passwordStrength >= 3
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
                
                <div className="text-xs space-y-1.5">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center">
                      {req.test ? (
                        <Check className="h-3 w-3 text-green-500 mr-1.5 flex-shrink-0" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400 mr-1.5 flex-shrink-0" />
                      )}
                      <span className={req.test ? 'text-gray-700' : 'text-gray-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-12 pl-10 bg-white border-gray-200 focus:ring-black focus:border-black"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the <Link href="/terms" className="text-black hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-black hover:underline">Privacy Policy</Link>
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
                Creating account...
              </div>
            ) : (
              'Create account'
            )}
          </Button>
          
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="inline h-3 w-3 mr-1" />
              Back to previous step
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Loading fallback for Suspense
function SignupFormSkeleton() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-block">
          <div className="font-heading text-3xl font-bold tracking-tighter text-primary">NEXORA</div>
        </div>
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-100 rounded mx-auto animate-pulse"></div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="w-full max-w-xs flex items-center">
          <div className="flex-1">
            <div className="w-8 h-8 mx-auto rounded-full bg-gray-200 animate-pulse"></div>
          </div>
          <div className="flex-1 border-t-2 border-gray-200"></div>
          <div className="flex-1">
            <div className="w-8 h-8 mx-auto rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

export default function SignupPage() {
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
          <Suspense fallback={<SignupFormSkeleton />}>
            <SignupForm />
          </Suspense>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-900 relative">
          <Image
            src="https://res.cloudinary.com/dfijxvhfl/image/upload/v1748991882/mens-collection-2_qzjdzq.png"
            alt="Fashion showcase"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-md text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg text-white/80">
                Create an account to enjoy exclusive benefits and personalized shopping experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 