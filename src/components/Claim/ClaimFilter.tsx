import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { ClaimFilterOptions, Hospital, ClaimStage } from '../../types/claim.types';

interface ClaimFilterProps {
  filterOptions: ClaimFilterOptions;
  onFilterChange: (options: ClaimFilterOptions) => void;
  hospitals: Hospital[];
  isVisible: boolean;
  onClose: () => void;
}

const ClaimFilter: React.FC<ClaimFilterProps> = ({
  filterOptions,
  onFilterChange,
  hospitals,
  isVisible,
  onClose,
}) => {
  const [localFilters, setLocalFilters] = useState<ClaimFilterOptions>(filterOptions);

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters: ClaimFilterOptions = {};
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
    onClose();
  };

  const handleInputChange = (field: keyof ClaimFilterOptions, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value || undefined,
    }));
  };

  const claimStages = Object.values(ClaimStage);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filter Claims</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Search Text */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search</Text>
            <TextInput
              style={styles.input}
              placeholder="Search by claim number, policy number, or patient name"
              value={localFilters.searchText || ''}
              onChangeText={(value) => handleInputChange('searchText', value)}
            />
          </View>

          {/* Hospital Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hospital</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
              <TouchableOpacity
                style={[
                  styles.chip,
                  !localFilters.hospitalId && styles.chipActive
                ]}
                onPress={() => handleInputChange('hospitalId', '')}
              >
                <Text style={[
                  styles.chipText,
                  !localFilters.hospitalId && styles.chipTextActive
                ]}>
                  All Hospitals
                </Text>
              </TouchableOpacity>
              {hospitals.map((hospital) => (
                <TouchableOpacity
                  key={hospital.id}
                  style={[
                    styles.chip,
                    localFilters.hospitalId === hospital.id && styles.chipActive
                  ]}
                  onPress={() => handleInputChange('hospitalId', hospital.id)}
                >
                  <Text style={[
                    styles.chipText,
                    localFilters.hospitalId === hospital.id && styles.chipTextActive
                  ]}>
                    {hospital.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Status Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
              <TouchableOpacity
                style={[
                  styles.chip,
                  !localFilters.claimStage && styles.chipActive
                ]}
                onPress={() => handleInputChange('claimStage', '')}
              >
                <Text style={[
                  styles.chipText,
                  !localFilters.claimStage && styles.chipTextActive
                ]}>
                  All Status
                </Text>
              </TouchableOpacity>
              {claimStages.map((stage) => (
                <TouchableOpacity
                  key={stage}
                  style={[
                    styles.chip,
                    localFilters.claimStage === stage && styles.chipActive
                  ]}
                  onPress={() => handleInputChange('claimStage', stage)}
                >
                  <Text style={[
                    styles.chipText,
                    localFilters.claimStage === stage && styles.chipTextActive
                  ]}>
                    {stage}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Date Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date Range</Text>
            <View style={styles.dateContainer}>
              <View style={styles.dateInput}>
                <Text style={styles.dateLabel}>From</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={localFilters.dateFrom || ''}
                  onChangeText={(value) => handleInputChange('dateFrom', value)}
                />
              </View>
              <View style={styles.dateInput}>
                <Text style={styles.dateLabel}>To</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={localFilters.dateTo || ''}
                  onChangeText={(value) => handleInputChange('dateTo', value)}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#666666',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  clearButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  applyButton: {
    flex: 2,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ClaimFilter; 