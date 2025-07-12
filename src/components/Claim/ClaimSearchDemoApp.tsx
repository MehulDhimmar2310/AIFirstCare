import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import ClaimSearchInterface from './ClaimSearchInterface';
import ClaimSearchTest from './ClaimSearchTest';
import { Hospital } from '../../types/claim.types';

type ViewType = 'menu' | 'search' | 'test';

const ClaimSearchDemoApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('menu');

  // Mock hospital data
  const mockHospitals: Hospital[] = [
    { id: '1', name: 'Apollo Hospital', code: 'APL001' },
    { id: '2', name: 'Fortis Hospital', code: 'FRT002' },
    { id: '3', name: 'Manipal Hospital', code: 'MNL003' },
    { id: '4', name: 'Narayana Health', code: 'NRY004' },
    { id: '5', name: 'Max Healthcare', code: 'MAX005' },
    { id: '6', name: 'Medanta Hospital', code: 'MDT006' },
    { id: '7', name: 'Artemis Hospital', code: 'ART007' },
    { id: '8', name: 'BLK Hospital', code: 'BLK008' },
  ];

  const navigateToSearch = () => setCurrentView('search');
  const navigateToTest = () => setCurrentView('test');
  const navigateToMenu = () => setCurrentView('menu');

  if (currentView === 'search') {
    return (
      <ClaimSearchInterface 
        hospitals={mockHospitals}
        onBackToLogin={navigateToMenu}
      />
    );
  }

  if (currentView === 'test') {
    return <ClaimSearchTest />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Claim Search Interface Demo</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Choose a demo to see the new search interface in action:
        </Text>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={navigateToSearch}
        >
          <Text style={styles.menuButtonText}>🔍 Direct Search Interface</Text>
          <Text style={styles.menuButtonSubtext}>
            Launch the search interface directly with hospital dropdown and form validation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={navigateToTest}
        >
          <Text style={styles.menuButtonText}>🧪 Interactive Test Demo</Text>
          <Text style={styles.menuButtonSubtext}>
            See the interface with explanation and interactive features
          </Text>
        </TouchableOpacity>

        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Features Implemented:</Text>
          <Text style={styles.feature}>✅ Hospital dropdown with autocomplete</Text>
          <Text style={styles.feature}>✅ Text inputs for Claim No, Policy No, Patient Name</Text>
          <Text style={styles.feature}>✅ Search button (disabled unless at least 1 field is filled)</Text>
          <Text style={styles.feature}>✅ Clean status badge with stage & date</Text>
          <Text style={styles.feature}>✅ Empty state: "No Record Found" message</Text>
          <Text style={styles.feature}>✅ Keyboard optimization for inputs</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  menuButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  menuButtonSubtext: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  feature: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default ClaimSearchDemoApp; 