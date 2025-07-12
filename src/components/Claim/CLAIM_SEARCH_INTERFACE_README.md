# Claim Search Interface

A comprehensive search interface for insurance claims with hospital dropdown, form validation, and clean result display.

## Features Implemented

### ✅ Hospital Dropdown (Autocomplete)
- Searchable dropdown with hospital name and code
- Autocomplete functionality for quick selection
- "All Hospitals" option to clear selection
- Loading state support

### ✅ Text Inputs (At least 1 mandatory)
- **Claim Number**: Auto-capitalize none, auto-correct disabled
- **Policy Number**: Auto-capitalize none, auto-correct disabled  
- **Patient Name**: Auto-capitalize words, auto-correct disabled
- Form validation ensures at least one field is filled

### ✅ Search Button
- Disabled state when no fields are filled
- Visual feedback with disabled styling
- Triggers search on "Search" key press for patient name field

### ✅ Result Display
- Clean status badges with color-coded stages
- Formatted dates for better readability
- Comprehensive claim information display
- Card-based layout for easy scanning

### ✅ Empty State
- "No Record Found" message when no results
- Helpful suggestions for users
- Contact support information

### ✅ Keyboard Optimization
- `KeyboardAvoidingView` for proper keyboard handling
- `keyboardShouldPersistTaps="handled"` for better UX
- Proper `returnKeyType` for each input field
- Auto-focus management

## Components

### ClaimSearchInterface
Main search interface component with all features implemented.

**Props:**
- `hospitals: Hospital[]` - Array of available hospitals
- `onBackToLogin?: () => void` - Optional back navigation handler

**Features:**
- Form validation
- Search functionality with mock data
- Result display with status badges
- Empty state handling
- Keyboard optimization

### ClaimSearchTest
Interactive demo component with feature explanations.

### ClaimSearchDemoApp
Complete demo application with navigation between different views.

## Usage Examples

### Basic Usage
```tsx
import ClaimSearchInterface from './components/Claim/ClaimSearchInterface';

const hospitals = [
  { id: '1', name: 'Apollo Hospital', code: 'APL001' },
  { id: '2', name: 'Fortis Hospital', code: 'FRT002' },
];

<ClaimSearchInterface hospitals={hospitals} />
```

### Demo Application
```tsx
import ClaimSearchDemoApp from './components/Claim/ClaimSearchDemoApp';

<ClaimSearchDemoApp />
```

## Status Badge Colors

The interface includes color-coded status badges:

- **Admitted**: Blue (#E3F2FD)
- **Discharged**: Green (#E8F5E8)
- **File Submitted**: Orange (#FFF3E0)
- **Settled**: Green (#E8F5E8)
- **Pending**: Yellow (#FFF8E1)
- **Rejected**: Red (#FFEBEE)

## Form Validation

The search form implements the following validation:

1. **At least one field required**: Hospital, Claim Number, Policy Number, or Patient Name
2. **Search button disabled** when no fields are filled
3. **Visual feedback** with disabled styling
4. **Alert message** if user tries to search with empty form

## Keyboard Behavior

- **Claim Number**: `returnKeyType="next"`
- **Policy Number**: `returnKeyType="next"`
- **Patient Name**: `returnKeyType="search"` with `onSubmitEditing={handleSearch}`

## Mock Data

The interface includes mock search results for demonstration:

```tsx
const mockSearchResults: ClaimItem[] = [
  {
    id: '1',
    claimNo: 'CLM-2024-001',
    policyNo: 'POL-2024-001',
    patientName: 'John Doe',
    hospitalName: 'Apollo Hospital',
    claimStage: 'File Submitted',
    statusDate: '2024-01-15',
    referenceNo: 'REF-2024-001',
    submittedDate: '2024-01-10',
  },
  // ... more mock data
];
```

## Integration

The search interface can be easily integrated into existing applications:

1. Import the component
2. Provide hospital data
3. Handle navigation callbacks
4. Customize styling as needed

## Future Enhancements

- Real API integration
- Advanced filtering options
- Search history
- Favorites functionality
- Export results
- Push notifications for status updates 