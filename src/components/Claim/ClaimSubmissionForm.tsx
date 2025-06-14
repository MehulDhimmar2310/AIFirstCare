import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import { User } from '../../types/auth.types';
import { useClaimSubmission } from '../../hooks/useClaimSubmission';
import { useFormValidation } from '../../hooks/useFormValidation';
import { ClaimFormData, TPA, Service } from '../../types/claim.types';
import { colors, spacing, typography } from '../../styles/theme';

interface ClaimSubmissionFormProps {
  user: User;
  onSuccess?: (claimId: string) => void;
}

const ClaimSubmissionForm: React.FC<ClaimSubmissionFormProps> = ({
  user,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ClaimFormData>({
    patientName: '',
    admissionDate: new Date(),
    tpaId: '',
    serviceIds: [],
    documents: [],
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tpas, setTpas] = useState<TPA[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { validateForm, errors, clearErrors } = useFormValidation();
  const { submitClaim } = useClaimSubmission();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Load TPAs and services from backend
      const [tpasData, servicesData] = await Promise.all([
        fetchTPAs(),
        fetchServices(),
      ]);
      setTpas(tpasData);
      setServices(servicesData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load form data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTPAs = async (): Promise<TPA[]> => {
    // Mock API call - replace with actual API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'TPA Health Solutions', code: 'TPA001' },
          { id: '2', name: 'MediCare TPA', code: 'TPA002' },
          { id: '3', name: 'HealthFirst TPA', code: 'TPA003' },
        ]);
      }, 1000);
    });
  };

  const fetchServices = async (): Promise<Service[]> => {
    // Mock API call - replace with actual API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'General Consultation', category: 'Consultation' },
          { id: '2', name: 'Surgery', category: 'Surgical' },
          { id: '3', name: 'Laboratory Tests', category: 'Diagnostic' },
          { id: '4', name: 'Radiology', category: 'Diagnostic' },
          { id: '5', name: 'Pharmacy', category: 'Medication' },
        ]);
      }, 1000);
    });
  };

  const handleFieldChange = (field: keyof ClaimFormData, value: any) => {
    setFormData((prev: ClaimFormData) => ({ ...prev, [field]: value }));
    clearErrors(field);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleFieldChange('admissionDate', selectedDate);
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceIds: prev.serviceIds.includes(serviceId)
        ? prev.serviceIds.filter(id => id !== serviceId)
        : [...prev.serviceIds, serviceId],
    }));
  };

  const handleDocumentPick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 10,
        includeBase64: false,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', `Failed to pick documents: ${result.errorMessage}`);
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const newDocuments = result.assets.map((asset: Asset) => ({
          uri: asset.uri || '',
          name: asset.fileName || 'document',
          type: asset.type || 'application/octet-stream',
          size: asset.fileSize || 0,
        }));

        // Validate file count
        if (formData.documents.length + newDocuments.length > 10) {
          Alert.alert('Error', 'Maximum 10 files allowed');
          return;
        }

        // Validate file sizes
        const oversizedFiles = newDocuments.filter((doc: any) => doc.size > 5 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
          Alert.alert('Error', 'Some files exceed 5MB limit');
          return;
        }

        setFormData((prev: ClaimFormData) => ({
          ...prev,
          documents: [...prev.documents, ...newDocuments],
        }));
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick documents');
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const claimId = await submitClaim(formData);
      Alert.alert(
        'Success',
        `Claim successfully created!\nClaim Reference: ${claimId}`,
        [
          {
            text: 'Submit Another',
            onPress: () => {
              setFormData({
                patientName: '',
                admissionDate: new Date(),
                tpaId: '',
                serviceIds: [],
                documents: [],
              });
            },
          },
          { text: 'OK' },
        ]
      );
      onSuccess?.(claimId);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading form data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Claim Submission</Text>
        <Text style={styles.subtitle}>Submit a new healthcare claim</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Patient Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Details</Text>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Patient Name *</Text>
            <TextInput
              style={[styles.input, errors.patientName && styles.inputError]}
              value={formData.patientName}
              onChangeText={(text) => handleFieldChange('patientName', text)}
              placeholder="Enter patient name"
              placeholderTextColor={colors.textSecondary}
            />
            {errors.patientName && (
              <Text style={styles.errorText}>{errors.patientName}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Admission Date *</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {formatDate(formData.admissionDate)}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.admissionDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>
        </View>

        {/* TPA Selection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Third Party Administrator</Text>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Select TPA *</Text>
            <View style={[styles.pickerContainer, errors.tpaId && styles.inputError]}>
              <Picker
                selectedValue={formData.tpaId}
                onValueChange={(value) => handleFieldChange('tpaId', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select a TPA" value="" />
                {tpas.map((tpa) => (
                  <Picker.Item key={tpa.id} label={tpa.name} value={tpa.id} />
                ))}
              </Picker>
            </View>
            {errors.tpaId && (
              <Text style={styles.errorText}>{errors.tpaId}</Text>
            )}
          </View>
        </View>

        {/* Services Selection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Select Services *</Text>
            <Text style={styles.helpText}>Select all applicable services</Text>
            
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceItem}
                onPress={() => handleServiceToggle(service.id)}
              >
                <View style={styles.serviceCheckbox}>
                  {formData.serviceIds.includes(service.id) && (
                    <View style={styles.serviceCheckboxSelected} />
                  )}
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceCategory}>{service.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
            
            {errors.serviceIds && (
              <Text style={styles.errorText}>{errors.serviceIds}</Text>
            )}
          </View>
        </View>

        {/* Document Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Upload Documents *</Text>
            <Text style={styles.helpText}>
              Upload supporting documents (PDF, JPG, PNG). Max 10 files, 5MB each.
            </Text>
            
            <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPick}>
              <Text style={styles.uploadButtonText}>Select Documents</Text>
            </TouchableOpacity>
            
            {formData.documents.length > 0 && (
              <View style={styles.documentList}>
                {formData.documents.map((doc, index) => (
                  <View key={index} style={styles.documentItem}>
                    <View style={styles.documentInfo}>
                      <Text style={styles.documentName}>{doc.name}</Text>
                      <Text style={styles.documentSize}>
                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeDocument(index)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            
            {errors.documents && (
              <Text style={styles.errorText}>{errors.documents}</Text>
            )}
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Claim</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  formContainer: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  fieldContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.body,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  helpText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.xs,
    padding: spacing.sm,
    fontSize: typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.xs,
    padding: spacing.sm,
    backgroundColor: colors.white,
  },
  dateButtonText: {
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.xs,
    backgroundColor: colors.white,
  },
  picker: {
    height: 50,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  serviceCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceCheckboxSelected: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: typography.body,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  serviceCategory: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: spacing.xs,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: '500',
  },
  documentList: {
    marginTop: spacing.sm,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
    backgroundColor: colors.backgroundLight,
    borderRadius: spacing.xs,
    marginBottom: spacing.xs,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  documentSize: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  removeButton: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
  },
  removeButtonText: {
    color: colors.white,
    fontSize: typography.caption,
    fontWeight: '500',
  },
  submitContainer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: spacing.sm,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: typography.h3,
    fontWeight: '600',
  },
});

export default ClaimSubmissionForm; 