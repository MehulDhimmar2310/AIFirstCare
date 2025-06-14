import React, { useState } from 'react';
import LoginScreen from './components/Auth/LoginScreen';
import { SuperAdminDashboard, AdminDashboard, StaffDashboard, HospitalDashboard } from './components/Dashboard';
import UserDashboard from './components/Dashboard/UserDashboard';
import { UserRole, LoginFormData, User } from './types/auth.types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic with role-based redirection
      const mockUsers = {
        'superadmin@firstcare.com': {
          id: '1',
          email: 'superadmin@firstcare.com',
          role: UserRole.SUPER_ADMIN,
          permissions: [
            { id: '1', name: 'full_access', description: 'Full system access' }
          ]
        },
        'admin@firstcare.com': {
          id: '2',
          email: 'admin@firstcare.com',
          role: UserRole.ADMIN,
          permissions: [
            { id: '2', name: 'admin_access', description: 'Admin level access' }
          ]
        },
        'staff@firstcare.com': {
          id: '3',
          email: 'staff@firstcare.com',
          role: UserRole.STAFF,
          permissions: [
            { id: '3', name: 'staff_access', description: 'Staff level access' }
          ]
        },
        'hospital@firstcare.com': {
          id: '4',
          email: 'hospital@firstcare.com',
          role: UserRole.HOSPITAL,
          hospitalId: 'hosp_001',
          permissions: [
            { id: '4', name: 'hospital_access', description: 'Hospital level access' }
          ]
        },
        'user@firstcare.com': {
          id: '5',
          email: 'user@firstcare.com',
          role: UserRole.USER,
          permissions: [
            { id: '5', name: 'user_access', description: 'User level access' }
          ]
        }
      };

      const user = mockUsers[formData.email as keyof typeof mockUsers];
      
      if (user && formData.password === '1234') {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    console.log('Forgot password pressed');
  };

  // Show loading screen while authenticating
  if (isLoading) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onForgotPassword={handleForgotPassword}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  // Role-based dashboard redirection for authenticated users
  if (isAuthenticated && currentUser) {
    switch (currentUser.role) {
      case UserRole.SUPER_ADMIN:
        return <SuperAdminDashboard onLogout={handleLogout} />;
      case UserRole.ADMIN:
        return <AdminDashboard onLogout={handleLogout} />;
      case UserRole.STAFF:
        return <StaffDashboard onLogout={handleLogout} />;
      case UserRole.HOSPITAL:
        return <HospitalDashboard onLogout={handleLogout} />;
      case UserRole.USER:
        return <UserDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return <UserDashboard user={currentUser} onLogout={handleLogout} />;
    }
  }

  // Show login screen for unauthenticated users
  return (
    <LoginScreen
      onLogin={handleLogin}
      onForgotPassword={handleForgotPassword}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default App; 