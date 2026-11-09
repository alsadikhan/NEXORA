/**
 * Auth utilities for managing user authentication
 */

// Helper to check if user is logged in
export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('user-token');
  return !!token;
};

// Helper to log in user
export const login = (token: string, redirectTo: string = '/'): void => {
  localStorage.setItem('user-token', token);
  
  // Redirect after login
  window.location.href = redirectTo;
};

// Helper to log out user
export const logout = (redirectTo: string = '/login'): void => {
  localStorage.removeItem('user-token');
  
  // Redirect after logout
  window.location.href = redirectTo;
};

// Mock function to simulate an API login request
export const mockLoginApi = async (email: string, password: string): Promise<{success: boolean, token?: string, error?: string}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would be an actual API call
  if (email === 'user@example.com' && password === 'password') {
    return {
      success: true,
      token: 'mock-jwt-token'
    };
  }
  
  return {
    success: false,
    error: 'Invalid email or password'
  };
};

type SignupPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  name?: string;
};

// Mock function to simulate an API signup request
export const mockSignupApi = async (_userData: SignupPayload): Promise<{success: boolean, token?: string, error?: string}> => {
  void _userData;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real app, this would validate and create a user
  return {
    success: true,
    token: 'mock-jwt-token'
  };
};

// Mock function to simulate an API password reset request
export const mockResetPasswordApi = async (_email: string): Promise<{success: boolean, error?: string}> => {
  void _email;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Always return success for demo purposes
  return {
    success: true
  };
};

interface AuthRouter {
  push: (path: string) => void;
}

// For protected routes - use in useEffect
export const requireAuth = (router: AuthRouter): boolean => {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('user-token');

  if (!token) {
    router.push('/login');
    return false;
  }

  return true;
}; 