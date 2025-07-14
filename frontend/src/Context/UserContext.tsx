import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
} | null;

// Define the context type
interface UserContextType {
  user: User;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  verifyEmail: (code: string) => Promise<{ success: boolean; message?: string }>;
}

// Define register data type
interface RegisterData {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  country: string;
}

// Create the context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  verifyEmail: async () => ({ success: false }),
});

// Define props for UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// Create the provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/server.php?action=check_auth', {
          method: 'GET',
          credentials: 'include', // Include cookies for session
        });
        
        const data = await response.json();
        
        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const response = await fetch('/server.php?action=login', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies for session
      });
      
      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: data.message || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'An error occurred during login' 
      };
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      const formData = new FormData();
      
      // Append all user data to form
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      const response = await fetch('/server.php?action=register', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      return { 
        success: data.success, 
        message: data.message || 'Registration failed' 
      };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: 'An error occurred during registration' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch('/server.php?action=logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // Clear user state regardless of server response
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user state even if request fails
      setUser(null);
    }
  };

  // Verify email function
  const verifyEmail = async (code: string) => {
    try {
      const formData = new FormData();
      formData.append('code', code);
      
      const response = await fetch('/server.php?action=verify', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      return { 
        success: data.success, 
        message: data.message 
      };
    } catch (error) {
      console.error('Email verification error:', error);
      return { 
        success: false, 
        message: 'An error occurred during verification' 
      };
    }
  };

  // Create value object
  const value = {
    user,
    isLoading,
    isAdmin,
    login,
    register,
    logout,
    verifyEmail,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => useContext(UserContext);

export default UserContext;