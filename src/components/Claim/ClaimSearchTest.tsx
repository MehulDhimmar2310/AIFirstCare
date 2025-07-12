import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ClaimSearchInterface from './ClaimSearchInterface';
import { Hospital } from '../../types/claim.types';

const ClaimSearchTest: React.FC = () => {
  const [showSearch, setShowSearch] = React.useState(false);

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

  if (showSearch) {
    return (
      <ClaimSearchInterface 
        hospitals={mockHospitals}
        onBackToLogin={() => setShowSearch(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Claim Search Interface Demo</Text>
      <Text style={styles.description}>
        This demonstrates the new search interface with:
      </Text>
      
      <View style={styles.featuresList}>
        <Text style={styles.feature}>• Hospital dropdown with autocomplete</Text>
        <Text style={styles.feature}>• Text inputs for Claim No, Policy No, Patient Name</Text>
        <Text style={styles.feature}>• Search button (disabled unless at least 1 field is filled)</Text>
        <Text style={styles.feature}>• Clean status badge with stage & date</Text>
        <Text style={styles.feature}>• Empty state: "No Record Found" message</Text>
        <Text style={styles.feature}>• Keyboard optimization for inputs</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => setShowSearch(true)}
      >
        <Text style={styles.buttonText}>Launch Search Interface</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feature: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ClaimSearchTest; 