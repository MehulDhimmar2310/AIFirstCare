import * as yup from 'yup';

export const validation = {
  // Email validation
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  // Password validation
  isValidPassword: (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },
  
  // Required field validation
  isRequired: (value: string): boolean => {
    return value.trim().length > 0;
  },
  
  // Minimum length validation
  hasMinLength: (value: string, minLength: number): boolean => {
    return value.length >= minLength;
  },
  
  // Maximum length validation
  hasMaxLength: (value: string, maxLength: number): boolean => {
    return value.length <= maxLength;
  },
  
  // Phone number validation
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
  
  // Get validation error messages
  getErrorMessage: (field: string, type: string): string => {
    const messages: Record<string, Record<string, string>> = {
      email: {
        required: 'Email is required',
        invalid: 'Please enter a valid email address',
      },
      password: {
        required: 'Password is required',
        invalid: 'Password must be at least 8 characters with uppercase, lowercase, and number',
        minLength: 'Password must be at least 8 characters',
      },
      required: {
        required: 'This field is required',
      },
    };
    
    return messages[field]?.[type] || 'Invalid input';
  },
};

export const claimSearchSchema = yup.object().shape({
  hospital: yup.object().required('Hospital selection is required'),
  claimNo: yup.string().matches(/^\d*$/, 'Claim number must be numeric'),
  policyNo: yup.string().matches(/^[a-zA-Z0-9]*$/, 'Policy number must be alphanumeric'),
  patientName: yup.string().matches(/^[a-zA-Z\s]*$/, 'Patient name must contain only letters'),
}).test('at-least-one', 'At least one identifier is required', (values: any) => {
  return !!(values.claimNo || values.policyNo || values.patientName);
});

export const validateClaimNumber = (value: string): string | null => {
  if (value && !/^\d+$/.test(value)) {
    return 'Claim number must contain only numbers';
  }
  return null;
};

export const validatePolicyNumber = (value: string): string | null => {
  if (value && !/^[a-zA-Z0-9]+$/.test(value)) {
    return 'Policy number must contain only letters and numbers';
  }
  return null;
};

export const validatePatientName = (value: string): string | null => {
  if (value && !/^[a-zA-Z\s]+$/.test(value)) {
    return 'Patient name must contain only letters and spaces';
  }
  return null;
}; 