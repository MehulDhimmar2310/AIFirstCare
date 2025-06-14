import { ClaimFormData, ClaimSubmissionResponse } from '../types/claim.types';

export const useClaimSubmission = () => {
  const submitClaim = async (formData: ClaimFormData): Promise<string> => {
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form fields
      submitData.append('patientName', formData.patientName);
      submitData.append('admissionDate', formData.admissionDate.toISOString());
      submitData.append('tpaId', formData.tpaId);
      submitData.append('serviceIds', JSON.stringify(formData.serviceIds));
      
      // Add documents
      formData.documents.forEach((doc, index) => {
        const fileData = {
          uri: doc.uri,
          type: doc.type,
          name: doc.name,
        };
        submitData.append(`documents[${index}]`, fileData as any);
      });

      // Mock API call - replace with actual API endpoint
      const response = await mockSubmitClaim(submitData);
      
      return response.claimId;
    } catch (error) {
      console.error('Claim submission error:', error);
      throw new Error('Failed to submit claim');
    }
  };

  const mockSubmitClaim = async (formData: FormData): Promise<ClaimSubmissionResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock claim ID
    const claimId = `CLM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      claimId,
      referenceNumber: `REF-${claimId}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
  };

  return {
    submitClaim,
  };
}; 