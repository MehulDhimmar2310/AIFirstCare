import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { User } from '../../types/auth.types';
import ClaimStatusSearch from '../Claim/ClaimStatusSearch';
import ClaimSubmissionScreen from '../Claim/ClaimSubmissionScreen';

interface UserDashboardProps {
  user: User;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<'main' | 'claimSearch' | 'claimSubmission'>('main');

  const handleLogout = () => {
    onLogout();
  };

  const navigateToClaimSearch = () => {
    setCurrentView('claimSearch');
  };

  const navigateToClaimSubmission = () => {
    setCurrentView('claimSubmission');
  };

  const navigateToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'claimSearch') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateToMain} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Claim Status</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <ClaimStatusSearch />
      </SafeAreaView>
    );
  }

  if (currentView === 'claimSubmission') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateToMain} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Submit Claim</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <ClaimSubmissionScreen user={user} onBack={navigateToMain} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FirstCare Dashboard</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userRole}>Role: {user.role.replace('_', ' ').toUpperCase()}</Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Available Features</Text>
          
          <TouchableOpacity style={styles.featureCard} onPress={navigateToClaimSearch}>
            <View style={styles.featureIcon}>🔍</View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Claim Status Search</Text>
              <Text style={styles.featureDescription}>
                Search for your insurance claim status using hospital name and claim details
              </Text>
            </View>
            <Text style={styles.featureArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard} onPress={navigateToClaimSubmission}>
            <View style={styles.featureIcon}>📝</View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Submit New Claim</Text>
              <Text style={styles.featureDescription}>
                Submit a new healthcare claim with patient details and supporting documents
              </Text>
            </View>
            <Text style={styles.featureArrow}>→</Text>
          </TouchableOpacity>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>📋</View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>My Claims</Text>
              <Text style={styles.featureDescription}>
                View and manage your insurance claims (Coming Soon)
              </Text>
            </View>
            <Text style={styles.featureArrow}>→</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>🏥</View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Hospital Directory</Text>
              <Text style={styles.featureDescription}>
                Browse network hospitals and their details (Coming Soon)
              </Text>
            </View>
            <Text style={styles.featureArrow}>→</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>📞</View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Support</Text>
              <Text style={styles.featureDescription}>
                Contact customer support for assistance (Coming Soon)
              </Text>
            </View>
            <Text style={styles.featureArrow}>→</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Quick Information</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              • Use the Claim Status Search to check your claim progress{'\n'}
              • Submit new claims with patient details and supporting documents{'\n'}
              • Ensure you have the correct hospital name and claim details{'\n'}
              • Contact support if you need assistance with your claims
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  logoutButton: {
    padding: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#D32F2F',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  welcomeSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  featuresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  featureArrow: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default UserDashboard; 