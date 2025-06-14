import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Hospital } from '../../types/claim.types';

interface HospitalPickerProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  onSelectHospital: (hospital: Hospital) => void;
  isLoading: boolean;
}

const HospitalPicker: React.FC<HospitalPickerProps> = ({
  hospitals,
  selectedHospital,
  onSelectHospital,
  isLoading,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHospitalSelect = (hospital: Hospital) => {
    onSelectHospital(hospital);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setSearchQuery('');
    }
  };

  const renderHospitalItem = ({ item }: { item: Hospital }) => (
    <TouchableOpacity
      style={styles.hospitalItem}
      onPress={() => handleHospitalSelect(item)}
    >
      <View style={styles.hospitalInfo}>
        <Text style={styles.hospitalName}>{item.name}</Text>
        {item.code && (
          <Text style={styles.hospitalCode}>{item.code}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hospital Name *</Text>
      
      <TouchableOpacity
        style={[
          styles.pickerButton,
          selectedHospital && styles.pickerButtonSelected,
        ]}
        onPress={toggleDropdown}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : selectedHospital ? (
          <View style={styles.selectedHospital}>
            <Text style={styles.selectedHospitalName}>
              {selectedHospital.name}
            </Text>
            {selectedHospital.code && (
              <Text style={styles.selectedHospitalCode}>
                {selectedHospital.code}
              </Text>
            )}
          </View>
        ) : (
          <Text style={styles.placeholder}>Select a hospital</Text>
        )}
        
        <Text style={styles.dropdownIcon}>
          {isDropdownOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search hospitals..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
          
          <FlatList
            data={filteredHospitals}
            renderItem={renderHospitalItem}
            keyExtractor={(item) => item.id}
            style={styles.hospitalList}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
          
          {filteredHospitals.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {searchQuery ? 'No hospitals found' : 'No hospitals available'}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    minHeight: 56,
  },
  pickerButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  selectedHospital: {
    flex: 1,
  },
  selectedHospitalName: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  selectedHospitalCode: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  placeholder: {
    fontSize: 16,
    color: '#999999',
    flex: 1,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 8,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  hospitalList: {
    maxHeight: 200,
  },
  hospitalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  hospitalCode: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999999',
  },
});

export default HospitalPicker; 