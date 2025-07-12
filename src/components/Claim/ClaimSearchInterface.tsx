import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hospital, ClaimItem, ClaimStage } from '../../types/claim.types';
import HospitalPicker from './HospitalPicker';
import EmptyStateView from './EmptyStateView';
import LoadingOverlay from './LoadingOverlay';

interface ClaimSearchInterfaceProps {
  hospitals: Hospital[];
  onBackToLogin?: () => void;
}

interface SearchFormData {
  hospitalId: string;
  claimNo: string;
  policyNo: string;
  patientName: string;
}

interface ValidationErrors {
  hospitalId?: string;
  claimNo?: string;
  policyNo?: string;
  patientName?: string;
  general?: string;
}

const ClaimSearchInterface: React.FC<ClaimSearchInterfaceProps> = ({
  hospitals,
  onBackToLogin,
}) => {
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    hospitalId: '',
    claimNo: '',
    policyNo: '',
    patientName: '',
  });
  
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [searchResults, setSearchResults] = useState<ClaimItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Mock search results for demonstration
  const mockSearchResults: ClaimItem[] = [
    {
      id: '1',
      claimNo: 'CLM-2024-001',
      policyNo: 'POL-2024-001',
      patientName: 'John Doe',
      hospitalName: 'Apollo Hospital',
      claimStage: 'File Submitted',
      statusDate: '2024-01-15',
      referenceNo: 'REF-2024-001',
      submittedDate: '2024-01-10',
    },
    {
      id: '2',
      claimNo: 'CLM-2024-002',
      policyNo: 'POL-2024-002',
      patientName: 'Jane Smith',
      hospitalName: 'Fortis Hospital',
      claimStage: 'Admitted',
      statusDate: '2024-01-20',
      referenceNo: 'REF-2024-002',
      submittedDate: '2024-01-18',
    },
  ];

  // Validation functions
  const validateHospital = (): boolean => {
    if (!searchForm.hospitalId) {
      setValidationErrors(prev => ({ ...prev, hospitalId: 'Hospital Name is required' }));
      return false;
    }
    setValidationErrors(prev => ({ ...prev, hospitalId: undefined }));
    return true;
  };

  const validateIdentifiers = (): boolean => {
    const hasClaimNo = searchForm.claimNo.trim().length > 0;
    const hasPolicyNo = searchForm.policyNo.trim().length > 0;
    const hasPatientName = searchForm.patientName.trim().length > 0;
    
    if (!hasClaimNo && !hasPolicyNo && !hasPatientName) {
      setValidationErrors(prev => ({ 
        ...prev, 
        general: 'At least one identifier (Claim No, Policy No, or Patient Name) must be filled' 
      }));
      return false;
    }
    setValidationErrors(prev => ({ ...prev, general: undefined }));
    return true;
  };

  const validateClaimNo = (): boolean => {
    if (searchForm.claimNo.trim() && !/^\d+$/.test(searchForm.claimNo.trim())) {
      setValidationErrors(prev => ({ ...prev, claimNo: 'Claim Number must contain only numbers' }));
      return false;
    }
    setValidationErrors(prev => ({ ...prev, claimNo: undefined }));
    return true;
  };

  const validatePolicyNo = (): boolean => {
    if (searchForm.policyNo.trim() && !/^[a-zA-Z0-9]+$/.test(searchForm.policyNo.trim())) {
      setValidationErrors(prev => ({ ...prev, policyNo: 'Policy Number must contain only letters and numbers' }));
      return false;
    }
    setValidationErrors(prev => ({ ...prev, policyNo: undefined }));
    return true;
  };

  const validatePatientName = (): boolean => {
    if (searchForm.patientName.trim() && !/^[a-zA-Z\s]+$/.test(searchForm.patientName.trim())) {
      setValidationErrors(prev => ({ ...prev, patientName: 'Patient Name must contain only letters and spaces' }));
      return false;
    }
    setValidationErrors(prev => ({ ...prev, patientName: undefined }));
    return true;
  };

  const validateForm = (): boolean => {
    const isHospitalValid = validateHospital();
    const isIdentifiersValid = validateIdentifiers();
    const isClaimNoValid = validateClaimNo();
    const isPolicyNoValid = validatePolicyNo();
    const isPatientNameValid = validatePatientName();
    
    return isHospitalValid && isIdentifiersValid && isClaimNoValid && isPolicyNoValid && isPatientNameValid;
  };

  const isSearchButtonDisabled = () => {
    return !searchForm.hospitalId || 
           (!searchForm.claimNo && !searchForm.policyNo && !searchForm.patientName) ||
           Object.keys(validationErrors).some(key => validationErrors[key as keyof ValidationErrors]);
  };

  const handleInputChange = (field: keyof SearchFormData, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear validation errors when user starts typing
    setValidationErrors(prev => ({ ...prev, [field]: undefined, general: undefined }));
  };

  const handleHospitalSelect = (hospital: Hospital | null) => {
    setSelectedHospital(hospital);
    handleInputChange('hospitalId', hospital?.id || '');
  };

  const handleSearch = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock search logic - in real app, this would be an API call
      let results = [...mockSearchResults];
      
      if (searchForm.hospitalId) {
        const hospital = hospitals.find(h => h.id === searchForm.hospitalId);
        results = results.filter(claim => claim.hospitalName === hospital?.name);
      }
      
      if (searchForm.claimNo) {
        results = results.filter(claim => 
          claim.claimNo.toLowerCase().includes(searchForm.claimNo.toLowerCase())
        );
      }
      
      if (searchForm.policyNo) {
        results = results.filter(claim => 
          claim.policyNo.toLowerCase().includes(searchForm.policyNo.toLowerCase())
        );
      }
      
      if (searchForm.patientName) {
        results = results.filter(claim => 
          claim.patientName.toLowerCase().includes(searchForm.patientName.toLowerCase())
        );
      }

      setSearchResults(results);
    } catch (error) {
      Alert.alert('Search Error', 'Failed to search for claims. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchForm({
      hospitalId: '',
      claimNo: '',
      policyNo: '',
      patientName: '',
    });
    setSelectedHospital(null);
    setSearchResults([]);
    setHasSearched(false);
    setValidationErrors({});
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'admitted':
        return { backgroundColor: '#E3F2FD', textColor: '#1976D2', borderColor: '#2196F3' };
      case 'discharged':
        return { backgroundColor: '#E8F5E8', textColor: '#2E7D32', borderColor: '#4CAF50' };
      case 'file submitted':
        return { backgroundColor: '#FFF3E0', textColor: '#F57C00', borderColor: '#FF9800' };
      case 'settled':
        return { backgroundColor: '#E8F5E8', textColor: '#2E7D32', borderColor: '#4CAF50' };
      case 'pending':
        return { backgroundColor: '#FFF8E1', textColor: '#F57F17', borderColor: '#FFC107' };
      case 'rejected':
        return { backgroundColor: '#FFEBEE', textColor: '#D32F2F', borderColor: '#F44336' };
      default:
        return { backgroundColor: '#F5F5F5', textColor: '#757575', borderColor: '#9E9E9E' };
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          {onBackToLogin && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={onBackToLogin}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.title}>Claim Status Search</Text>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Search Form */}
          <View style={styles.searchForm}>
            <Text style={styles.formTitle}>Search Claims</Text>
            
            {/* General Validation Error */}
            {validationErrors.general && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{validationErrors.general}</Text>
              </View>
            )}

            {/* Hospital Dropdown */}
            <View style={styles.inputGroup}>
              <HospitalPicker
                hospitals={hospitals}
                selectedHospital={selectedHospital}
                onSelectHospital={handleHospitalSelect}
                isLoading={false}
              />
              {validationErrors.hospitalId && (
                <Text style={styles.errorText}>{validationErrors.hospitalId}</Text>
              )}
            </View>

            {/* Text Inputs */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Claim Number</Text>
              <TextInput
                style={[
                  styles.textInput,
                  validationErrors.claimNo && styles.textInputError
                ]}
                placeholder="Enter claim number (numbers only)"
                value={searchForm.claimNo}
                onChangeText={(value) => handleInputChange('claimNo', value)}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="numeric"
              />
              {validationErrors.claimNo && (
                <Text style={styles.errorText}>{validationErrors.claimNo}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Policy Number</Text>
              <TextInput
                style={[
                  styles.textInput,
                  validationErrors.policyNo && styles.textInputError
                ]}
                placeholder="Enter policy number (letters and numbers)"
                value={searchForm.policyNo}
                onChangeText={(value) => handleInputChange('policyNo', value)}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
              {validationErrors.policyNo && (
                <Text style={styles.errorText}>{validationErrors.policyNo}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Patient Name</Text>
              <TextInput
                style={[
                  styles.textInput,
                  validationErrors.patientName && styles.textInputError
                ]}
                placeholder="Enter patient name (letters only)"
                value={searchForm.patientName}
                onChangeText={(value) => handleInputChange('patientName', value)}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
              {validationErrors.patientName && (
                <Text style={styles.errorText}>{validationErrors.patientName}</Text>
              )}
            </View>

            {/* Search Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.clearButton} 
                onPress={handleClearSearch}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.searchButton,
                  isSearchButtonDisabled() && styles.searchButtonDisabled
                ]} 
                onPress={handleSearch}
                disabled={isSearchButtonDisabled()}
              >
                <Text style={[
                  styles.searchButtonText,
                  isSearchButtonDisabled() && styles.searchButtonTextDisabled
                ]}>
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Results */}
          {hasSearched && (
            <View style={styles.resultsSection}>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>Search Results</Text>
                <Text style={styles.resultsCount}>
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </Text>
              </View>

              {isLoading ? (
                <LoadingOverlay />
              ) : searchResults.length > 0 ? (
                <View style={styles.resultsList}>
                  {searchResults.map((claim) => (
                    <View key={claim.id} style={styles.resultCard}>
                      <View style={styles.resultHeader}>
                        <View style={styles.claimInfo}>
                          <Text style={styles.claimNumber}>{claim.claimNo}</Text>
                          <Text style={styles.policyNumber}>{claim.policyNo}</Text>
                        </View>
                        <View style={[
                          styles.statusBadge,
                          {
                            backgroundColor: getStatusColor(claim.claimStage).backgroundColor,
                            borderColor: getStatusColor(claim.claimStage).borderColor,
                          }
                        ]}>
                          <Text style={[
                            styles.statusText,
                            { color: getStatusColor(claim.claimStage).textColor }
                          ]}>
                            {claim.claimStage}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.resultContent}>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Patient:</Text>
                          <Text style={styles.value}>{claim.patientName}</Text>
                        </View>
                        
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Hospital:</Text>
                          <Text style={styles.value}>{claim.hospitalName}</Text>
                        </View>

                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Status Date:</Text>
                          <Text style={styles.value}>{formatDate(claim.statusDate)}</Text>
                        </View>

                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Reference:</Text>
                          <Text style={styles.value}>{claim.referenceNo}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <EmptyStateView />
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 48,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  clearButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  searchButton: {
    flex: 2,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  searchButtonTextDisabled: {
    color: '#999999',
  },
  resultsSection: {
    marginTop: 10,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  resultsList: {
    gap: 12,
  },
  resultCard: {
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
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  claimInfo: {
    flex: 1,
  },
  claimNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  policyNumber: {
    fontSize: 14,
    color: '#666666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  resultContent: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 2,
    textAlign: 'right',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  errorText: {
    fontSize: 14,
    color: '#D32F2F',
    marginTop: 4,
  },
  textInputError: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
});

export default ClaimSearchInterface; 