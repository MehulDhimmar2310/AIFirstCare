# SuperAdminDashboard Component

## Overview
The SuperAdminDashboard is a comprehensive dashboard component designed for super administrators in the insurance claim management system. It provides a complete overview of all system metrics and quick access to all administrative functions.

## Features

### Key Metrics Display
- **Total Claims**: Shows the total number of claims in the system
- **Completed Claims**: Number of claims that have been fully processed
- **In Process Claims**: Number of claims currently being processed
- **Total Hospitals**: Number of hospitals registered in the system

### File Management Metrics
- **Patient Admit Files**: Number of patient admission files
- **Discharge Files**: Number of discharge files
- **File Submit & Receive**: Number of files submitted and received
- **Payment Settlement Files**: Number of payment settlement files

### Quick Actions
- **Master Data Management**: Access to Services, Hospitals, TPA, and Insurance Companies
- **Claim Management**: Patient Admission, Discharge, and File Submission
- **Reports**: Generate comprehensive reports and analytics
- **Billing**: Hospital bill generation and payment tracking
- **Employee Management**: Employee master and salary calculations
- **Expense Management**: Track expenses and income with balance

### System Management
- **User Management**: Manage admin, staff, and hospital users
- **Role Permissions**: Configure role-based access control
- **System Settings**: Configure system parameters and preferences
- **Communication**: SMS and WhatsApp message management

## Usage

```typescript
import { SuperAdminDashboard } from './components/Dashboard';

// In your component
<SuperAdminDashboard />
```

## Props
Currently, the component doesn't accept any props as it's designed to be self-contained with mock data. In a real implementation, you would pass:

- `navigation`: Navigation object for screen navigation
- `user`: Current user information
- `onLogout`: Logout callback function

## Styling
The component uses a clean, modern design with:
- Card-based layout for metrics and navigation
- Color-coded metric cards with different border colors
- Responsive grid layout that adapts to screen size
- Shadow effects for depth
- Consistent typography and spacing

## Mock Data
The component currently uses mock data to simulate real API responses. In production, you would:
1. Replace the mock data with actual API calls
2. Add proper error handling
3. Implement real navigation
4. Add loading states for individual sections
5. Implement real-time updates

## Dependencies
- `react-native-safe-area-context`: For safe area handling
- React Native core components

## Future Enhancements
- Real-time data updates
- Push notifications for important metrics
- Charts and graphs for data visualization
- Export functionality for reports
- Dark mode support
- Accessibility improvements 