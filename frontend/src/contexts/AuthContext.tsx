import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useProgress } from '../stores/progress-store';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'teacher';
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'parent') => Promise<void>;
  logout: () => void;
  loginAsGuest: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setStudent, currentAvatar } = useProgress();

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setStudent(parsedUser.id, parsedUser.name);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, [setStudent]);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: 'student',
        avatar: currentAvatar,
      };

      setUser(mockUser);
      setStudent(mockUser.id, mockUser.name);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('שם משתמש או סיסמה שגויים');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    _password: string,
    role: 'student' | 'parent'
  ) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
        avatar: currentAvatar,
      };

      setUser(newUser);
      setStudent(newUser.id, newUser.name);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('ההרשמה נכשלה. נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = (name: string) => {
    const guestUser: User = {
      id: `guest_${Date.now()}`,
      name,
      email: '',
      role: 'student',
      avatar: currentAvatar,
    };

    setUser(guestUser);
    setStudent(guestUser.id, guestUser.name);
    localStorage.setItem('auth_user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    // Note: We keep progress data even after logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        loginAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
