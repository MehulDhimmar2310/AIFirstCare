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

interface DashboardMetrics {
  totalClaims: number;
  completedClaims: number;
  inProcessClaims: number;
  totalHospitals: number;
  patientAdmitFiles: number;
  dischargeFiles: number;
  fileSubmitReceive: number;
  paymentSettlementFiles: number;
}

interface AdminDashboardProps {
  onLogout?: () => void;
}

interface MetricCardProps {
  title: string;
  value: number;
  color: string;
  icon: string;
  onPress?: () => void;
}

interface NavigationCardProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  color,
  icon,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.metricCard, { borderLeftColor: color }]}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.8 : 1}
  >
    <View style={styles.metricIconContainer}>
      <Text style={styles.metricIcon}>{icon}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.metricValue}>{value.toLocaleString()}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  icon,
  onPress,
}) => (
  <TouchableOpacity style={styles.navigationCard} onPress={onPress} activeOpacity={0.85}>
    <View style={styles.navigationIconContainer}>
      <Text style={styles.navigationIcon}>{icon}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.navigationTitle}>{title}</Text>
      <Text style={styles.navigationDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalClaims: 0,
    completedClaims: 0,
    inProcessClaims: 0,
    totalHospitals: 0,
    patientAdmitFiles: 0,
    dischargeFiles: 0,
    fileSubmitReceive: 0,
    paymentSettlementFiles: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Mock data loading - in real app, this would fetch from API
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMetrics({
          totalClaims: 850,
          completedClaims: 620,
          inProcessClaims: 230,
          totalHospitals: 32,
          patientAdmitFiles: 125,
          dischargeFiles: 110,
          fileSubmitReceive: 245,
          paymentSettlementFiles: 620,
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
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Metrics Section */}
        <SectionHeader title="Overview" />
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Total Claims"
            value={metrics.totalClaims}
            color="#4CAF50"
            icon="📄"
            onPress={() => handleNavigation('Claims')}
          />
          <MetricCard
            title="Completed Claims"
            value={metrics.completedClaims}
            color="#2196F3"
            icon="✅"
            onPress={() => handleNavigation('Completed Claims')}
          />
          <MetricCard
            title="In Process Claims"
            value={metrics.inProcessClaims}
            color="#FF9800"
            icon="⏳"
            onPress={() => handleNavigation('In Process Claims')}
          />
          <MetricCard
            title="Total Hospitals"
            value={metrics.totalHospitals}
            color="#9C27B0"
            icon="🏥"
            onPress={() => handleNavigation('Hospitals')}
          />
        </View>
        <Divider />
        {/* File Management Section */}
        <SectionHeader title="File Management" />
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Patient Admit Files"
            value={metrics.patientAdmitFiles}
            color="#E91E63"
            icon="📝"
            onPress={() => handleNavigation('Patient Admit')}
          />
          <MetricCard
            title="Discharge Files"
            value={metrics.dischargeFiles}
            color="#607D8B"
            icon="📤"
            onPress={() => handleNavigation('Discharge')}
          />
          <MetricCard
            title="File Submit & Receive"
            value={metrics.fileSubmitReceive}
            color="#795548"
            icon="📬"
            onPress={() => handleNavigation('File Submission')}
          />
          <MetricCard
            title="Payment Settlement Files"
            value={metrics.paymentSettlementFiles}
            color="#3F51B5"
            icon="💰"
            onPress={() => handleNavigation('Payment Settlement')}
          />
        </View>
        <Divider />
        {/* Master Data Section */}
        <SectionHeader title="Master Data Management" />
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="Hospital Master"
            description="Manage hospital info, doctors, and services"
            icon="🏥"
            onPress={() => handleNavigation('Hospital Master')}
          />
          <NavigationCard
            title="Insurance Company Master"
            description="Manage insurance company details"
            icon="🏦"
            onPress={() => handleNavigation('Insurance Company Master')}
          />
          <NavigationCard
            title="Service Master"
            description="Configure services and pricing"
            icon="🛠️"
            onPress={() => handleNavigation('Service Master')}
          />
          <NavigationCard
            title="TPA Master"
            description="Manage TPA details"
            icon="🤝"
            onPress={() => handleNavigation('TPA Master')}
          />
        </View>
        <Divider />
        {/* Claim Management Section */}
        <SectionHeader title="Claim Management" />
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="Claim User Status"
            description="View and manage claim user status"
            icon="👤"
            onPress={() => handleNavigation('Claim User Status')}
          />
          <NavigationCard
            title="Claim Details"
            description="Comprehensive claim tracking"
            icon="🔍"
            onPress={() => handleNavigation('Claim Details')}
          />
          <NavigationCard
            title="Patient Admission"
            description="Manage patient admission process"
            icon="📝"
            onPress={() => handleNavigation('Patient Admission')}
          />
          <NavigationCard
            title="Discharge Management"
            description="Handle discharge and billing"
            icon="📤"
            onPress={() => handleNavigation('Discharge Management')}
          />
        </View>
        <Divider />
        {/* Reports Section */}
        <SectionHeader title="Reports & Analytics" />
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="Claim Reports"
            description="Generate claim reports and analytics"
            icon="📊"
            onPress={() => handleNavigation('Claim Reports')}
          />
          <NavigationCard
            title="Hospital Reports"
            description="Hospital-wise performance metrics"
            icon="📈"
            onPress={() => handleNavigation('Hospital Reports')}
          />
          <NavigationCard
            title="Financial Reports"
            description="Financial summaries and payments"
            icon="💹"
            onPress={() => handleNavigation('Financial Reports')}
          />
          <NavigationCard
            title="Outstanding Reports"
            description="Track pending claims and amounts"
            icon="⏰"
            onPress={() => handleNavigation('Outstanding Reports')}
          />
        </View>
        <Divider />
        {/* Billing Section */}
        <SectionHeader title="Billing & Payments" />
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="Hospital Billing"
            description="Generate and manage hospital bills"
            icon="🧾"
            onPress={() => handleNavigation('Hospital Billing')}
          />
          <NavigationCard
            title="Payment Tracking"
            description="Track payment status and settlements"
            icon="💳"
            onPress={() => handleNavigation('Payment Tracking')}
          />
          <NavigationCard
            title="TDS Reports"
            description="Tax Deducted at Source reports"
            icon="🧮"
            onPress={() => handleNavigation('TDS Reports')}
          />
          <NavigationCard
            title="Commission Reports"
            description="Reference commission tracking"
            icon="📑"
            onPress={() => handleNavigation('Commission Reports')}
          />
        </View>
        <Divider />
        {/* System Management Section */}
        <SectionHeader title="System Management" />
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="User Management"
            description="Manage staff and hospital users"
            icon="🧑‍💼"
            onPress={() => handleNavigation('User Management')}
          />
          <NavigationCard
            title="System Settings"
            description="Configure system preferences"
            icon="⚙️"
            onPress={() => handleNavigation('System Settings')}
          />
          <NavigationCard
            title="Communication"
            description="SMS and WhatsApp management"
            icon="💬"
            onPress={() => handleNavigation('Communication')}
          />
          <NavigationCard
            title="Data Export"
            description="Export data to Excel and PDF"
            icon="📤"
            onPress={() => handleNavigation('Data Export')}
          />
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#2d3e50',
    borderBottomWidth: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f44336',
    borderRadius: 8,
    elevation: 2,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f7f9fb',
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
  sectionHeaderContainer: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3e50',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#e3e8ee',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 1,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  metricCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    borderLeftWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3.84,
    elevation: 3,
  },
  metricIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f2f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  metricIcon: {
    fontSize: 22,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3e50',
    marginBottom: 2,
  },
  metricTitle: {
    fontSize: 13,
    color: '#7b8a9a',
    fontWeight: '600',
  },
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  navigationCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3.84,
    elevation: 2,
  },
  navigationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e3e8ee',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  navigationIcon: {
    fontSize: 20,
  },
  navigationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2d3e50',
    marginBottom: 2,
  },
  navigationDescription: {
    fontSize: 12,
    color: '#7b8a9a',
    lineHeight: 16,
  },
});

export default AdminDashboard; 