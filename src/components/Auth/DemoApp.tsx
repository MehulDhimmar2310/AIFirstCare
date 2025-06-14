import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import LoginScreen from './LoginScreen';
import SuperAdminDashboard from '../Dashboard/SuperAdminDashboard';
import ClaimStatusSearch from '../Claim/ClaimStatusSearch';
import { LoginFormData, UserRole, User } from '../../types/auth.types';
import { colors } from '../../styles/colors';
import { AdminDashboard, StaffDashboard, HospitalDashboard, UserDashboard } from '../Dashboard';

type AppScreen = 'login' | 'superAdminDashboard' | 'adminDashboard' | 'staffDashboard' | 'hospitalDashboard' | 'userDashboard' | 'claimStatusSearch';

const DemoApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Demo validation logic with role-based redirection
      const validCredentials = {
        'superadmin@firstcare.com': UserRole.SUPER_ADMIN,
        'admin@firstcare.com': UserRole.ADMIN,
        'staff@firstcare.com': UserRole.STAFF,
        'hospital@firstcare.com': UserRole.HOSPITAL,
        'user@firstcare.com': UserRole.USER,
      };

      const userRole = validCredentials[formData.email as keyof typeof validCredentials];
      
      if (userRole && formData.password === '1234') {
        // Set current user
        setCurrentUser({ 
          id: `user-${Date.now()}`, 
          email: formData.email, 
          role: userRole,
          permissions: []
        });
        
        // Navigate to appropriate dashboard based on role
        switch (userRole) {
          case UserRole.SUPER_ADMIN:
            setCurrentScreen('superAdminDashboard');
            break;
          case UserRole.ADMIN:
            setCurrentScreen('adminDashboard');
            break;
          case UserRole.STAFF:
            setCurrentScreen('staffDashboard');
            break;
          case UserRole.HOSPITAL:
            setCurrentScreen('hospitalDashboard');
            break;
          case UserRole.USER:
            setCurrentScreen('userDashboard');
            break;
          default:
            setError('Unknown user role');
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset functionality would be implemented here.',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setError(null);
  };

  const handleClaimStatusSearch = () => {
    setCurrentScreen('claimStatusSearch');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  // Render appropriate screen based on current state
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'superAdminDashboard':
        return <SuperAdminDashboard onLogout={handleLogout} />;
      case 'adminDashboard':
        return <AdminDashboard onLogout={handleLogout} />;
      case 'staffDashboard':
        return <StaffDashboard onLogout={handleLogout} />;
      case 'hospitalDashboard':
        return <HospitalDashboard onLogout={handleLogout} />;
      case 'userDashboard':
        return currentUser ? <UserDashboard user={currentUser} onLogout={handleLogout} /> : null;
      case 'claimStatusSearch':
        return <ClaimStatusSearch onBackToLogin={handleBackToLogin} />;
      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
            onClaimStatusSearch={handleClaimStatusSearch}
            isLoading={isLoading}
            error={error}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default DemoApp; 