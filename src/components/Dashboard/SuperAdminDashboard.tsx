import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SummaryView, { SummaryMetrics } from './SummaryView';
import { ClaimStage } from '../../types/claim.types';

interface DashboardMetrics {
  totalClaims: number;
  completedClaims: number;
  inProcessClaims: number;
  totalHospitals: number;
  patientAdmitFiles: number;
  dischargeFiles: number;
  fileSubmitReceive: number;
  paymentSettlementFiles: number;
  claimStageBreakdown: {
    [key in ClaimStage]?: number;
  };
}

interface SuperAdminDashboardProps {
  onLogout?: () => void;
}

interface MetricCardProps {
  title: string;
  value: number;
  color: string;
  onPress?: () => void;
}

interface NavigationCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  color,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.metricCard, { borderLeftColor: color }]}
    onPress={onPress}
    disabled={!onPress}
  >
    <Text style={styles.metricValue}>{value.toLocaleString()}</Text>
    <Text style={styles.metricTitle}>{title}</Text>
  </TouchableOpacity>
);

const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  onPress,
}) => (
  <TouchableOpacity style={styles.navigationCard} onPress={onPress}>
    <Text style={styles.navigationTitle}>{title}</Text>
    <Text style={styles.navigationDescription}>{description}</Text>
  </TouchableOpacity>
);

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onLogout }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalClaims: 0,
    completedClaims: 0,
    inProcessClaims: 0,
    totalHospitals: 0,
    patientAdmitFiles: 0,
    dischargeFiles: 0,
    fileSubmitReceive: 0,
    paymentSettlementFiles: 0,
    claimStageBreakdown: {},
  });

  const [isLoading, setIsLoading] = useState(true);

  // Mock data loading - in real app, this would fetch from API
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMetrics({
          totalClaims: 1250,
          completedClaims: 890,
          inProcessClaims: 360,
          totalHospitals: 45,
          patientAdmitFiles: 180,
          dischargeFiles: 165,
          fileSubmitReceive: 320,
          paymentSettlementFiles: 890,
          claimStageBreakdown: {
            [ClaimStage.ADMITTED]: 180,
            [ClaimStage.DISCHARGED]: 165,
            [ClaimStage.FILE_SUBMITTED]: 320,
            [ClaimStage.SETTLED]: 890,
            [ClaimStage.PENDING]: 45,
            [ClaimStage.REJECTED]: 12,
          },
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleNavigation = (screen: string) => {
    Alert.alert('Navigation', `Navigate to ${screen} screen`);
    // In real app, this would use navigation.navigate(screen)
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: () => {
            onLogout?.();
          }
        },
      ]
    );
  };

  const handleDateFilterChange = (dateFrom: string, dateTo: string) => {
    // In real app, this would trigger API call with date filters
    console.log('Date filter changed:', { dateFrom, dateTo });
  };

  const handleExport = (data: any) => {
    // In real app, this would handle CSV export
    console.log('Export data:', data);
  };

  const summaryMetrics: SummaryMetrics = {
    totalClaims: metrics.totalClaims,
    completedClaims: metrics.completedClaims,
    inProcessClaims: metrics.inProcessClaims,
    totalHospitals: metrics.totalHospitals,
    claimStageBreakdown: metrics.claimStageBreakdown,
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading Dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Super Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary View */}
        <SummaryView
          metrics={summaryMetrics}
          role="super_admin"
          onDateFilterChange={handleDateFilterChange}
          onExport={handleExport}
          isLoading={isLoading}
        />

        {/* File Management Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>File Management</Text>
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Patient Admit Files"
              value={metrics.patientAdmitFiles}
              color="#E91E63"
              onPress={() => handleNavigation('Patient Admit')}
            />
            <MetricCard
              title="Discharge Files"
              value={metrics.dischargeFiles}
              color="#607D8B"
              onPress={() => handleNavigation('Discharge')}
            />
            <MetricCard
              title="File Submit & Receive"
              value={metrics.fileSubmitReceive}
              color="#795548"
              onPress={() => handleNavigation('File Submission')}
            />
            <MetricCard
              title="Payment Settlement Files"
              value={metrics.paymentSettlementFiles}
              color="#3F51B5"
              onPress={() => handleNavigation('Payment Settlement')}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.navigationGrid}>
            <NavigationCard
              title="Master Data"
              description="Manage Services, Hospitals, TPA, Insurance Companies"
              onPress={() => handleNavigation('Master Data')}
            />
            <NavigationCard
              title="Claim Management"
              description="Patient Admission, Discharge, File Submission"
              onPress={() => handleNavigation('Claim Management')}
            />
            <NavigationCard
              title="Reports"
              description="Generate comprehensive reports and analytics"
              onPress={() => handleNavigation('Reports')}
            />
            <NavigationCard
              title="Billing"
              description="Hospital bill generation and payment tracking"
              onPress={() => handleNavigation('Billing')}
            />
            <NavigationCard
              title="Employee Management"
              description="Employee master and salary calculations"
              onPress={() => handleNavigation('Employee Management')}
            />
            <NavigationCard
              title="Expense Management"
              description="Track expenses and income with balance"
              onPress={() => handleNavigation('Expense Management')}
            />
          </View>
        </View>

        {/* System Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Management</Text>
          <View style={styles.navigationGrid}>
            <NavigationCard
              title="User Management"
              description="Manage admin, staff, and hospital users"
              onPress={() => handleNavigation('User Management')}
            />
            <NavigationCard
              title="Role Permissions"
              description="Configure role-based access control"
              onPress={() => handleNavigation('Role Permissions')}
            />
            <NavigationCard
              title="System Settings"
              description="Configure system parameters and preferences"
              onPress={() => handleNavigation('System Settings')}
            />
            <NavigationCard
              title="Communication"
              description="SMS and WhatsApp message management"
              onPress={() => handleNavigation('Communication')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f44336',
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  section: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navigationCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navigationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  navigationDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});

export default SuperAdminDashboard; 