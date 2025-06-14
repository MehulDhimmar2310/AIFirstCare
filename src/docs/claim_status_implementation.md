# Implementation Plan: Claim Status Search Screen (React Native)

## Summary
Implements a claim status lookup interface for React Native mobile app with TypeScript. Features hospital selection dropdown, multiple search criteria validation, and real-time status display for unauthenticated users.

## Functional Flow

### Screen Load
1. Load hospital list from API
2. Initialize dropdown with autocomplete
3. Setup form validation using Yup schema
4. Track event: `claimSearchScreenLoad`

### Search Process
1. **Hospital Selection**
   - User selects from searchable dropdown
   - Validate hospital selection required
   - Enable identifier input fields

2. **Input Validation**  
   - Validate at least one identifier filled
   - Format validation per field type:
     - Policy No: alphanumeric only
     - Claim No: numeric only
     - Patient Name: alphabetic only
   - Real-time validation feedback

3. **Search Execution**
   - Track event: `claimSearchStart`
   - Dispatch `searchClaimStatusThunk`
   - Show loading overlay
   - Display results or error state

### Result Display
- Show claim status with color-coded badge
- Display optional metadata (date, reference)
- Track event: `claimSearchSuccess` or `claimSearchFailed`
- Handle "No Record Found" gracefully

## UI/UX Notes

### Claim Search Screen
- Hospital dropdown with search functionality
- Three conditional input fields (at least 1 required)
- Search button with disabled state
- Result card with status badge
- Empty state for no results
- Loading indicator overlay
- Error message display
- Keyboard optimization for inputs

### Key Interactions
- Touch-optimized dropdown selection
- Auto-focus next input after selection
- Keyboard dismiss on search
- Pull-to-refresh for hospital list
- Haptic feedback on search completion

## File Structure Suggestion

```
src/
├── screens/
│   └── claim/
│       └── ClaimStatusSearch.tsx        # Main claim search screen
├── components/
│   └── claim/
│       ├── HospitalPicker.tsx          # Hospital selection dropdown
│       ├── SearchForm.tsx              # Search form component
│       ├── ClaimStatusCard.tsx         # Status result display
│       ├── EmptyStateView.tsx          # No results component
│       └── LoadingOverlay.tsx          # Loading indicator
├── hooks/
│   ├── useHospitalData.ts              # Hospital list management
│   ├── useClaimSearch.ts               # Search functionality
│   └── useFormValidation.ts            # Form validation logic
├── services/
│   └── claimService.ts                 # API service layer
├── store/
│   └── slices/
│       └── claimSearchSlice.ts         # Redux state management
├── types/
│   └── claim.types.ts                  # TypeScript interfaces
└── utils/
    ├── validation.ts                   # Yup validation schemas
    └── formatters.ts                   # Data formatting utilities
```

## Dependencies

| Package | Purpose |
|---------|---------|
| `formik & yup` | Form management & validation |
| `@reduxjs/toolkit` | State management |
| `react-native-picker-select` | Hospital dropdown |
| `@react-navigation/native` | Navigation |
| `react-native-vector-icons` | Icons |
| `react-native-config` | Environment variables |
| `@react-native-async-storage/async-storage` | Local storage |
| `axios` | HTTP client |
| `react-native-haptic-feedback` | Haptic feedback |

## Backend APIs Required

| Endpoint | Method | Description | Request Body |
|----------|---------|-------------|--------------|
| `/hospitals` | GET | Get hospital list for dropdown | - |
| `/claim-search` | POST | Search claim status | `{ hospital_id: string, claim_no?: string, policy_no?: string, patient_name?: string }` |

Note: These endpoints are managed through Redux thunks in claimSearchSlice.ts.

## Edge Case Handling

❌ **No internet connection** → Show offline message  
🔄 **Poor network** → Show loading with retry option  
📱 **Hospital list empty** → Show error with refresh  
🔄 **Multiple search requests** → Debounce search calls  
🔑 **API timeout** → Show timeout message with retry  
📱 **Keyboard overlap** → Adjust scroll view  
🔤 **Invalid characters** → Real-time validation feedback  
📱 **App backgrounded** → Maintain search state  
🕒 **Slow API response** → Show loading indicator  
📊 **Large hospital list** → Implement pagination/search  

## Analytics Events Required

### CleverTap Events
| Event | Properties |
|-------|------------|
| `CLAIM_SEARCH_SCREEN_LOAD` | `screenName, timestamp` |
| `HOSPITAL_SELECTED` | `hospitalId, hospitalName` |
| `CLAIM_SEARCH_START` | `searchType, hospitalId` |
| `CLAIM_SEARCH_SUCCESS` | `searchType, claimStatus, hospitalId` |
| `CLAIM_SEARCH_FAILED` | `searchType, errorMessage, hospitalId` |

## QA Scenarios

| Scenario | Expected Outcome |
|----------|------------------|
| First screen load | Hospital dropdown loads |
| No hospital selected | Search button disabled |
| Invalid policy format | Show validation error |
| Valid search | Display claim status |
| No results found | Show empty state message |
| Network error | Show retry option |
| Multiple identifiers | Accept any combination |
| Keyboard navigation | Smooth input transitions |

## TypeScript Interfaces

```typescript
interface Hospital {
  id: string;
  name: string;
  code?: string;
}

interface ClaimSearchRequest {
  hospital_id: string;
  claim_no?: string;
  policy_no?: string;
  patient_name?: string;
}

interface ClaimStatusResponse {
  status: 'found' | 'not_found';
  claim_stage?: string;
  status_date?: string;
  reference_no?: string;
}

interface SearchFormData {
  hospital: Hospital | null;
  claimNo: string;
  policyNo: string;
  patientName: string;
}
```

## Validation Schema

```typescript
const claimSearchSchema = yup.object().shape({
  hospital: yup.object().required('Hospital selection is required'),
  claimNo: yup.string().matches(/^\d*$/, 'Claim number must be numeric'),
  policyNo: yup.string().matches(/^[a-zA-Z0-9]*$/, 'Policy number must be alphanumeric'),
  patientName: yup.string().matches(/^[a-zA-Z\s]*$/, 'Patient name must contain only letters'),
}).test('at-least-one', 'At least one identifier is required', (values) => {
  return !!(values.claimNo || values.policyNo || values.patientName);
});
```

## Security Considerations

🔒 **Input sanitization** for all user inputs  
🛡️ **Rate limiting** on search requests  
📱 **Secure API communication** with HTTPS  
🔐 **No sensitive data** stored locally  
🔑 **Request validation** on backend  
📊 **Analytics data** anonymization  

## Performance Optimization

⚡ **Debounced hospital search** (300ms delay)  
📊 **Lazy loading** for large hospital lists  
🔄 **Request caching** for hospital data  
📱 **Optimized renders** with React.memo  
⚡ **Async validation** for better UX  
🔄 **Background refresh** for hospital list