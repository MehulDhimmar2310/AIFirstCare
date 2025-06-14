export interface User {
  id: string;
  email: string;
  role: UserRole;
  hospitalId?: string;
  permissions: Permission[];
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  STAFF = 'staff',
  HOSPITAL = 'hospital',
  USER = 'user'
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
} 