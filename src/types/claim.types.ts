export interface Hospital {
  id: string;
  name: string;
  code?: string;
}

export interface ClaimItem {
  id: string;
  claimNo: string;
  policyNo: string;
  patientName: string;
  hospitalName: string;
  claimStage: string;
  statusDate: string;
  referenceNo: string;
  submittedDate: string;
}

export interface ClaimsListResponse {
  claims: ClaimItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ClaimFilterOptions {
  hospitalId?: string;
  claimStage?: string;
  dateFrom?: string;
  dateTo?: string;
  searchText?: string;
}

export interface ClaimSearchState {
  hospitals: Hospital[];
  claimsList: ClaimItem[];
  isLoading: boolean;
  error: string | null;
  isFiltering: boolean;
  filterOptions: ClaimFilterOptions;
  totalClaims: number;
  currentPage: number;
}

export enum ClaimStage {
  ADMITTED = 'Admitted',
  DISCHARGED = 'Discharged',
  FILE_SUBMITTED = 'File Submitted',
  SETTLED = 'Settled',
  PENDING = 'Pending',
  REJECTED = 'Rejected'
}

export interface ClaimStatusBadgeProps {
  stage: ClaimStage;
  date?: string;
  referenceNo?: string;
}

export interface TPA {
  id: string;
  name: string;
  code: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
}

export interface Document {
  uri: string;
  name: string;
  type: string;
  size: number;
}

export interface ClaimFormData {
  patientName: string;
  admissionDate: Date;
  tpaId: string;
  serviceIds: string[];
  documents: Document[];
}

export interface ClaimSubmissionResponse {
  claimId: string;
  referenceNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface ValidationErrors {
  patientName?: string;
  admissionDate?: string;
  tpaId?: string;
  serviceIds?: string;
  documents?: string;
} 