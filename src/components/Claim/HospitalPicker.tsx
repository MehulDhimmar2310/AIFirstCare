import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import { Hospital } from '../../types/claim.types';

interface HospitalPickerProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  onSelectHospital: (hospital: Hospital | null) => void;
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
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHospitalSelect = (hospital: Hospital | null) => {
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



  const renderClearOption = () => (
    <TouchableOpacity
      style={[styles.hospitalItem, styles.clearOption]}
      onPress={() => handleHospitalSelect(null)}
    >
      <View style={styles.hospitalInfo}>
        <Text style={styles.clearOptionText}>All Hospitals</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
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
          </View>
        ) : (
          <Text style={styles.placeholder}>Select a hospital</Text>
        )}
        
        <Text style={styles.dropdownIcon}>
          {isDropdownOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search hospitals..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>
            
            <ScrollView 
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
            >
              {renderClearOption()}
              {filteredHospitals.map((hospital) => (
                <TouchableOpacity
                  key={hospital.id}
                  style={styles.hospitalItem}
                  onPress={() => handleHospitalSelect(hospital)}
                >
                  <View style={styles.hospitalInfo}>
                    <Text style={styles.hospitalName}>{hospital.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              {filteredHospitals.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {searchQuery ? 'No hospitals found' : 'No hospitals available'}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    zIndex: 1000,
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
  dropdownScrollView: {
    maxHeight: 200,
  },
  dropdownContent: {
    maxHeight: 200,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalScrollView: {
    maxHeight: 300,
  },
  hospitalList: {
    maxHeight: 200,
    flexGrow: 0,
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
  clearOption: {
    backgroundColor: '#F8F9FA',
  },
  clearOptionText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default HospitalPicker; 