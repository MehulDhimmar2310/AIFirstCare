import { useState } from 'react';
import { ClaimFormData, ValidationErrors } from '../types/claim.types';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (formData: ClaimFormData): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Patient name validation
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    } else if (formData.patientName.trim().length < 2) {
      newErrors.patientName = 'Patient name must be at least 2 characters';
    }

    // Admission date validation
    if (!formData.admissionDate) {
      newErrors.admissionDate = 'Admission date is required';
    } else if (formData.admissionDate > new Date()) {
      newErrors.admissionDate = 'Admission date cannot be in the future';
    }

    // TPA validation
    if (!formData.tpaId) {
      newErrors.tpaId = 'TPA selection is required';
    }

    // Services validation
    if (!formData.serviceIds.length) {
      newErrors.serviceIds = 'At least one service must be selected';
    }

    // Documents validation
    if (!formData.documents.length) {
      newErrors.documents = 'At least one document must be uploaded';
    } else if (formData.documents.length > 10) {
      newErrors.documents = 'Maximum 10 files allowed';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const clearErrors = (field?: keyof ValidationErrors) => {
    if (field) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } else {
      setErrors({});
    }
  };

  const setFieldError = (field: keyof ValidationErrors, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  return {
    errors,
    validateForm,
    clearErrors,
    setFieldError,
  };
}; 