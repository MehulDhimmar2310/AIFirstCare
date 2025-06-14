# Implementation Plan: Insurance Claim Portal Mobile App (React Native TypeScript)

## Summary
Implements a comprehensive mobile insurance claim management application with role-based access, complete claim lifecycle management, master data operations, and advanced reporting capabilities. Built with React Native TypeScript, Redux Toolkit, and integrates with backend REST APIs.

## Functional Flow

### Authentication Flow
1. User opens app → Check stored credentials
2. If no credentials → Navigate to Login screen
3. Enter email and password
4. Validate credentials with backend API
5. Store JWT token securely using Keychain/Keystore
6. Navigate to role-appropriate dashboard
7. Auto-refresh token when expired

### Claim Management Flow
1. **Patient Admission**
   - Hospital user navigates to Add Patient screen
   - Fill patient details form
   - Upload admission documents via camera/gallery
   - Submit to backend API
   - Show success/error notifications

2. **Discharge Process**
   - Navigate to patient list
   - Select patient for discharge
   - Upload discharge documents
   - Generate/upload final bills
   - Update claim status

3. **File Submission & Tracking**
   - Select online/offline submission
   - Fill courier details if offline
   - Upload supporting documents
   - Real-time status tracking
   - Push notifications for updates

4. **Payment Settlement**
   - View pending settlements
   - Calculate amounts with discounts
   - Upload payment proofs
   - Generate settlement receipts

### Offline Functionality
1. Cache critical data using AsyncStorage
2. Queue API calls when offline
3. Sync data when connection restored
4. Show offline indicators

## File Structure Suggestion

```
InsuranceClaimApp/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── Dashboard/
│   │   │   ├── SuperAdminDashboard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── StaffDashboard.tsx
│   │   │   └── HospitalDashboard.tsx
│   │   ├── ClaimManagement/
│   │   │   ├── PatientAdmitScreen.tsx
│   │   │   ├── DischargeScreen.tsx
│   │   │   ├── FileSubmissionScreen.tsx
│   │   │   ├── PaymentSettlementScreen.tsx
│   │   │   └── ClaimStatusScreen.tsx
│   │   ├── Masters/
│   │   │   ├── ServiceMasterScreen.tsx
│   │   │   ├── HospitalMasterScreen.tsx
│   │   │   ├── TPAMasterScreen.tsx
│   │   │   └── InsuranceMasterScreen.tsx
│   │   ├── Reports/
│   │   │   ├── ClaimReportsScreen.tsx
│   │   │   ├── HospitalReportsScreen.tsx
│   │   │   └── FinancialReportsScreen.tsx
│   │   ├── Billing/
│   │   │   ├── BillGenerationScreen.tsx
│   │   │   └── PaymentTrackingScreen.tsx
│   │   ├── Employee/
│   │   │   ├── EmployeeMasterScreen.tsx
│   │   │   └── SalaryCalculationScreen.tsx
│   │   └── Shared/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       ├── CustomButton.tsx
│   │       ├── CustomInput.tsx
│   │       ├── DocumentPicker.tsx
│   │       ├── Camera.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorMessage.tsx
│   │       ├── SuccessMessage.tsx
│   │       ├── DataTable.tsx
│   │       ├── SearchBar.tsx
│   │       ├── FilterModal.tsx
│   │       ├── DatePicker.tsx
│   │       └── PDFViewer.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── StackNavigator.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── claimService.ts
│   │   ├── masterService.ts
│   │   ├── reportService.ts
│   │   ├── storageService.ts
│   │   ├── cameraService.ts
│   │   └── notificationService.ts
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── claimSlice.ts
│   │   │   ├── masterSlice.ts
│   │   │   ├── reportSlice.ts
│   │   │   └── uiSlice.ts
│   │   ├── store.ts
│   │   └── middleware.ts
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── claim.types.ts
│   │   ├── master.types.ts
│   │   ├── report.types.ts
│   │   ├── navigation.types.ts
│   │   └── common.types.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── helpers.ts
│   │   ├── constants.ts
│   │   ├── permissions.ts
│   │   ├── dateUtils.ts
│   │   └── formatters.ts
│   ├── styles/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── globalStyles.ts
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
├── android/
├── ios/
├── package.json
├── tsconfig.json
├── metro.config.js
├── babel.config.js
└── App.tsx
```

## Dependencies

### Core Dependencies
| Package | Purpose | Version |
|---------|---------|---------|
| react-native | Core framework | ^0.73.0 |
| typescript | Type safety | ^5.0.0 |
| @react-navigation/native | Navigation | ^6.1.0 |
| @react-navigation/stack | Stack navigation | ^6.3.0 |
| @react-navigation/bottom-tabs | Tab navigation | ^6.5.0 |
| @react-navigation/drawer | Drawer navigation | ^6.6.0 |

### State Management
| Package | Purpose | Version |
|---------|---------|---------|
| @reduxjs/toolkit | State management | ^2.0.0 |
| react-redux | React-Redux bindings | ^9.0.0 |
| redux-persist | Persist state | ^6.0.0 |

### Network & Storage
| Package | Purpose | Version |
|---------|---------|---------|
| axios | HTTP client | ^1.6.0 |
| @react-native-async-storage/async-storage | Local storage | ^1.21.0 |
| react-native-keychain | Secure storage | ^8.1.0 |
| @react-native-community/netinfo | Network status | ^11.0.0 |

### UI & Forms
| Package | Purpose | Version |
|---------|---------|---------|
| react-native-paper | UI components | ^5.11.0 |
| react-native-vector-icons | Icons | ^10.0.0 |
| formik | Form management | ^2.4.0 |
| yup | Form validation | ^1.3.0 |
| react-native-modal | Modal components | ^13.0.0 |

### Media & Documents
| Package | Purpose | Version |
|---------|---------|---------|
| react-native-image-picker | Camera/Gallery | ^7.1.0 |
| react-native-document-picker | Document picker | ^9.1.0 |
| react-native-pdf | PDF viewer | ^6.7.0 |
| react-native-image-crop-picker | Image cropping | ^0.40.0 |

### Charts & Reports
| Package | Purpose | Version |
|---------|---------|---------|
| react-native-chart-kit | Charts | ^6.12.0 |
| react-native-svg | SVG support | ^14.1.0 |
| react-native-share | Share functionality | ^10.0.0 |

### Notifications & Communication
| Package | Purpose | Version |
|---------|---------|---------|
| @react-native-firebase/messaging | Push notifications | ^19.0.0 |
| @react-native-firebase/analytics | Analytics | ^19.0.0 |
| react-native-push-notification | Local notifications | ^8.1.0 |

### Date & Time
| Package | Purpose | Version |
|---------|---------|---------|
| react-native-date-picker | Date picker | ^4.3.0 |
| date-fns | Date utilities | ^2.30.0 |

## TypeScript Type Definitions

### Authentication Types
```typescript
// src/types/auth.types.ts
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
  HOSPITAL = 'hospital'
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
```

### Claim Types
```typescript
// src/types/claim.types.ts
export interface Claim {
  id: string;
  claimNumber: string;
  patientName: string;
  hospitalId: string;
  serviceId: string;
  status: ClaimStatus;
  amount: number;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export enum ClaimStatus {
  ADMITTED = 'admitted',
  DISCHARGED = 'discharged',
  FILE_SUBMITTED = 'file_submitted',
  PAYMENT_SETTLED = 'payment_settled'
}

export interface Document {
  id: string;
  fileName: string;
  fileType: string;
  filePath: string;
  uploadedAt: string;
}
```

## Backend APIs Required

### Authentication APIs
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| /api/auth/login | POST | User login | `LoginRequest` | `{ user: User, token: string }` |
| /api/auth/logout | POST | User logout | - | `{ message: string }` |
| /api/auth/refresh | POST | Refresh token | `{ refreshToken: string }` | `{ token: string }` |
| /api/auth/forgot-password | POST | Reset password | `{ email: string }` | `{ message: string }` |

### Claim Management APIs
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| /api/claims | GET | Get claims list | Query params | `{ claims: Claim[], total: number }` |
| /api/claims | POST | Create claim | `CreateClaimRequest` | `{ claim: Claim }` |
| /api/claims/:id | PUT | Update claim | `UpdateClaimRequest` | `{ claim: Claim }` |
| /api/claims/:id | DELETE | Delete claim | - | `{ message: string }` |
| /api/claims/:id/documents | POST | Upload documents | FormData | `{ documents: Document[] }` |
| /api/claims/search | GET | Search claims | Query params | `{ claims: Claim[] }` |
| /api/claims/status | GET | Get claim status | `{ claimNumber: string }` | `{ status: ClaimStatus }` |

### Master Data APIs
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| /api/masters/services | GET/POST/PUT/DELETE | Service CRUD | Service object | Service data |
| /api/masters/hospitals | GET/POST/PUT/DELETE | Hospital CRUD | Hospital object | Hospital data |
| /api/masters/insurance | GET/POST/PUT/DELETE | Insurance CRUD | Insurance object | Insurance data |
| /api/masters/tpa | GET/POST/PUT/DELETE | TPA CRUD | TPA object | TPA data |

## Screen Flow & Navigation

### Authentication Flow
```
SplashScreen → LoginScreen → DashboardScreen
                ↓
         ForgotPasswordScreen
```

### Main App Flow
```
DashboardScreen
├── ClaimManagement
│   ├── PatientAdmitScreen
│   ├── DischargeScreen
│   ├── FileSubmissionScreen
│   └── PaymentSettlementScreen
├── Masters
│   ├── ServiceMasterScreen
│   ├── HospitalMasterScreen
│   ├── TPAMasterScreen
│   └── InsuranceMasterScreen
├── Reports
│   ├── ClaimReportsScreen
│   ├── HospitalReportsScreen
│   └── FinancialReportsScreen
└── Settings
    ├── ProfileScreen
    └── NotificationSettingsScreen
```

## Offline Handling Strategy

### Data Caching
```typescript
// Store critical data for offline access
interface OfflineStorage {
  claims: Claim[];
  hospitals: Hospital[];
  services: Service[];
  lastSyncTime: string;
}

// Queue API calls when offline
interface QueuedAction {
  id: string;
  type: string;
  data: any;
  timestamp: string;
}
```

### Sync Strategy
1. **On App Launch** → Check network, sync if online
2. **Periodic Sync** → Every 15 minutes when online
3. **Manual Sync** → Pull-to-refresh functionality
4. **Conflict Resolution** → Last update wins with user notification

## Security Implementation

### Secure Storage
```typescript
// Store sensitive data in Keychain/Keystore
import { setInternetCredentials, getInternetCredentials } from 'react-native-keychain';

const storeToken = async (token: string) => {
  await setInternetCredentials('auth_token', 'user', token);
};

const getToken = async (): Promise<string | null> => {
  const credentials = await getInternetCredentials('auth_token');
  return credentials ? credentials.password : null;
};
```

### API Security
```typescript
// Add JWT token to all API requests
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Refresh token or redirect to login
    }
    return Promise.reject(error);
  }
);
```

## QA Scenarios

| Scenario | Expected Outcome | Test Steps |
|----------|------------------|------------|
| First-time app launch | Navigate to login screen | 1. Install app 2. Launch 3. Verify login screen |
| Valid login credentials | Navigate to dashboard | 1. Enter valid email/password 2. Tap login 3. Verify dashboard |
| Invalid credentials | Show error message | 1. Enter invalid credentials 2. Verify error display |
| Network connectivity lost | Show offline indicator | 1. Disable network 2. Verify offline UI |
| Camera permission denied | Show permission dialog | 1. Deny camera permission 2. Verify fallback options |
| Large file upload | Show progress indicator | 1. Select large file 2. Verify progress UI |
| Background app state | Maintain session | 1. Background app 2. Return 3. Verify state preserved |
| Role-based access | Show appropriate screens | 1. Login with different roles 2. Verify UI differences |

## Performance Optimization

### Image Optimization
```typescript
// Compress images before upload
const compressImage = {
  quality: 0.8,
  maxWidth: 1024,
  maxHeight: 1024,
  compressImageQuality: 0.8,
};
```

### List Performance
```typescript
// Use FlatList for large datasets
<FlatList
  data={claims}
  keyExtractor={(item) => item.id}
  renderItem={renderClaimItem}
  getItemLayout={getItemLayout}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
/>
```

### Memory Management
- Use `useCallback` and `useMemo` for expensive operations
- Implement proper cleanup in `useEffect`
- Use lazy loading for heavy components
- Optimize image loading with caching

## Build & Deployment

### Development Setup
```bash
# Install dependencies
npm install

# iOS setup
cd ios && pod install

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

### Build Configuration
```typescript
// Environment-specific configs
interface Config {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  ENABLE_LOGS: boolean;
}

const configs: Record<string, Config> = {
  development: {
    API_BASE_URL: 'http://localhost:3000/api',
    API_TIMEOUT: 10000,
    ENABLE_LOGS: true,
  },
  production: {
    API_BASE_URL: 'https://api.insuranceclaim.com/api',
    API_TIMEOUT: 30000,
    ENABLE_LOGS: false,
  },
};
```

### Release Process
1. **Code Review** → Ensure code quality
2. **Testing** → Run automated tests
3. **Build** → Generate release builds
4. **Upload** → App Store/Play Store
5. **Monitor** → Track crashes and performance

## Push Notifications

### Firebase Configuration
```typescript
// Handle notification permissions
const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  if (enabled) {
    getFCMToken();
  }
};

// Handle foreground notifications
messaging().onMessage(async (remoteMessage) => {
  // Show local notification
  PushNotification.localNotification({
    title: remoteMessage.notification?.title,
    message: remoteMessage.notification?.body,
  });
});
```

### Notification Types
- **Claim Status Updates** → Patient admission, discharge, settlement
- **Document Upload** → Success/failure notifications
- **Payment Alerts** → Settlement processed
- **System Alerts** → Maintenance, updates
- **Reminders** → Pending actions, deadlines