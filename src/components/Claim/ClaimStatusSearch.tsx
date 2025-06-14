import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ClaimListItem from './ClaimListItem';
import ClaimFilter from './ClaimFilter';
import LoadingOverlay from './LoadingOverlay';
import { 
  Hospital, 
  ClaimSearchState,
  ClaimItem,
  ClaimFilterOptions} from '../../types/claim.types';

interface ClaimStatusSearchProps {
  onBackToLogin?: () => void;
}

const ClaimStatusSearch: React.FC<ClaimStatusSearchProps> = ({ onBackToLogin }) => {
  const [state, setState] = useState<ClaimSearchState>({
    hospitals: [],
    claimsList: [],
    isLoading: false,
    error: null,
    isFiltering: false,
    filterOptions: {},
    totalClaims: 0,
    currentPage: 1,
  });

  const [showFilter, setShowFilter] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<ClaimItem | null>(null);

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

  // Mock claims data
  const mockClaims: ClaimItem[] = [
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
    {
      id: '3',
      claimNo: 'CLM-2024-003',
      policyNo: 'POL-2024-003',
      patientName: 'Mike Johnson',
      hospitalName: 'Manipal Hospital',
      claimStage: 'Settled',
      statusDate: '2024-01-25',
      referenceNo: 'REF-2024-003',
      submittedDate: '2024-01-22',
    },
    {
      id: '4',
      claimNo: 'CLM-2024-004',
      policyNo: 'POL-2024-004',
      patientName: 'Sarah Wilson',
      hospitalName: 'Narayana Health',
      claimStage: 'Pending',
      statusDate: '2024-01-30',
      referenceNo: 'REF-2024-004',
      submittedDate: '2024-01-28',
    },
    {
      id: '5',
      claimNo: 'CLM-2024-005',
      policyNo: 'POL-2024-005',
      patientName: 'David Brown',
      hospitalName: 'Max Healthcare',
      claimStage: 'Discharged',
      statusDate: '2024-02-05',
      referenceNo: 'REF-2024-005',
      submittedDate: '2024-02-01',
    },
  ];

  useEffect(() => {
    loadHospitals();
    loadClaims();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [state.filterOptions]);

  const loadHospitals = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setState(prev => ({ 
        ...prev, 
        hospitals: mockHospitals, 
        isLoading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load hospitals', 
        isLoading: false 
      }));
    }
  };

  const loadClaims = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setState(prev => ({ 
        ...prev, 
        claimsList: mockClaims,
        totalClaims: mockClaims.length,
        isLoading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load claims', 
        isLoading: false 
      }));
    }
  };

  const applyFilters = async () => {
    setState(prev => ({ ...prev, isFiltering: true }));
    try {
      // Simulate API call with filters
      await new Promise(resolve => setTimeout(resolve, 1000));
      let filteredClaims = [...mockClaims];
      const { hospitalId, claimStage, searchText, dateFrom, dateTo } = state.filterOptions;

      // Check if all filter values are empty or undefined
      const hasActiveFilters = hospitalId || claimStage || searchText || dateFrom || dateTo;
      
      // If no active filters, show all claims
      if (!hasActiveFilters) {
        setState(prev => ({
          ...prev,
          claimsList: mockClaims,
          totalClaims: mockClaims.length,
          isFiltering: false
        }));
        return;
      }

      if (hospitalId) {
        filteredClaims = filteredClaims.filter(claim => 
          mockHospitals.find(h => h.id === hospitalId)?.name === claim.hospitalName
        );
      }
      if (claimStage) {
        filteredClaims = filteredClaims.filter(claim => 
          claim.claimStage === claimStage
        );
      }
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        filteredClaims = filteredClaims.filter(claim =>
          claim.claimNo.toLowerCase().includes(searchLower) ||
          claim.policyNo.toLowerCase().includes(searchLower) ||
          claim.patientName.toLowerCase().includes(searchLower)
        );
      }
      if (dateFrom || dateTo) {
        filteredClaims = filteredClaims.filter(claim => {
          const claimDate = new Date(claim.statusDate);
          const fromDate = dateFrom ? new Date(dateFrom) : null;
          const toDate = dateTo ? new Date(dateTo) : null;
          if (fromDate && toDate) {
            return claimDate >= fromDate && claimDate <= toDate;
          } else if (fromDate) {
            return claimDate >= fromDate;
          } else if (toDate) {
            return claimDate <= toDate;
          }
          return true;
        });
      }
      setState(prev => ({ 
        ...prev, 
        claimsList: filteredClaims,
        totalClaims: filteredClaims.length,
        isFiltering: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to apply filters', 
        isFiltering: false 
      }));
    }
  };

  const handleRefresh = () => {
    loadHospitals();
    loadClaims();
  };

  const handleFilterChange = (filterOptions: ClaimFilterOptions) => {
    setState(prev => ({ ...prev, filterOptions }));
  };

  const handleClaimPress = (claim: ClaimItem) => {
    setSelectedClaim(claim);
  };

  const handleCloseClaimDetail = () => {
    setSelectedClaim(null);
  };

  const getActiveFiltersCount = (): number => {
    const { hospitalId, claimStage, searchText, dateFrom, dateTo } = state.filterOptions;
    let count = 0;
    if (hospitalId) count++;
    if (claimStage) count++;
    if (searchText) count++;
    if (dateFrom) count++;
    if (dateTo) count++;
    return count;
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
          <Text style={styles.title}>Claim Status</Text>
          <TouchableOpacity 
            style={styles.filterButton} 
            onPress={() => setShowFilter(true)}
          >
            <Text style={styles.filterButtonText}>
              Filter {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={state.isLoading}
              onRefresh={handleRefresh}
              colors={['#007AFF']}
            />
          }
        >
          {state.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{state.error}</Text>
            </View>
          )}

          {/* Claims List Section */}
          <View style={styles.listSection}>
            <View style={styles.listHeader}>
              <Text style={styles.sectionTitle}>All Claims</Text>
              <Text style={styles.claimsCount}>
                {state.totalClaims} claim{state.totalClaims !== 1 ? 's' : ''}
              </Text>
            </View>

            {state.claimsList.length > 0 ? (
              <FlatList
                data={state.claimsList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ClaimListItem
                    claim={item}
                    onPress={handleClaimPress}
                  />
                )}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No claims found</Text>
                <Text style={styles.emptySubtext}>
                  {getActiveFiltersCount() > 0 
                    ? 'Try adjusting your filters' 
                    : 'Claims will appear here once available'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Filter Modal */}
        <ClaimFilter
          filterOptions={state.filterOptions}
          onFilterChange={handleFilterChange}
          hospitals={state.hospitals}
          isVisible={showFilter}
          onClose={() => setShowFilter(false)}
        />

        {/* Claim Detail Modal */}
        {selectedClaim && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Claim Details</Text>
                <TouchableOpacity onPress={handleCloseClaimDetail}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalContent}>
                <View style={styles.claimDetailCard}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Claim Number:</Text>
                    <Text style={styles.detailValue}>{selectedClaim.claimNo}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Policy Number:</Text>
                    <Text style={styles.detailValue}>{selectedClaim.policyNo}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Patient Name:</Text>
                    <Text style={styles.detailValue}>{selectedClaim.patientName}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Hospital:</Text>
                    <Text style={styles.detailValue}>{selectedClaim.hospitalName}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status:</Text>
                    <Text style={styles.detailValue}>{selectedClaim.claimStage}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status Date:</Text>
                    <Text style={styles.detailValue}>{selectedClaim.statusDate}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Reference Number:</Text>
                    <Text style={styles.detailValue}>{selectedClaim.referenceNo}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Submitted Date:</Text>
                    <Text style={styles.detailValue}>{selectedClaim.submittedDate}</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}

        {state.isFiltering && <LoadingOverlay />}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
  listSection: {
    marginTop: 10,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  claimsCount: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  closeButton: {
    fontSize: 20,
    color: '#666666',
    padding: 8,
  },
  modalContent: {
    padding: 20,
  },
  claimDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 2,
    textAlign: 'right',
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
});

export default ClaimStatusSearch; 