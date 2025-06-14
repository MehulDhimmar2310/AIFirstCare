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
  patientAdmitFiles: number;
  dischargeFiles: number;
  fileSubmitReceive: number;
  paymentSettlementFiles: number;
  pendingCourierStickers: number;
  claimUserStatus: number;
}

interface StaffDashboardProps {
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

const StaffDashboard: React.FC<StaffDashboardProps> = ({ onLogout }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalClaims: 0,
    completedClaims: 0,
    inProcessClaims: 0,
    patientAdmitFiles: 0,
    dischargeFiles: 0,
    fileSubmitReceive: 0,
    paymentSettlementFiles: 0,
    pendingCourierStickers: 0,
    claimUserStatus: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Mock data loading - in real app, this would fetch from API
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMetrics({
          totalClaims: 450,
          completedClaims: 320,
          inProcessClaims: 130,
          patientAdmitFiles: 85,
          dischargeFiles: 75,
          fileSubmitReceive: 165,
          paymentSettlementFiles: 320,
          pendingCourierStickers: 12,
          claimUserStatus: 45,
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
        <Text style={styles.headerTitle}>Staff Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Overview Metrics Section */}
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
            title="Claim User Status"
            value={metrics.claimUserStatus}
            color="#9C27B0"
            icon="👤"
            onPress={() => handleNavigation('Claim User Status')}
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

        {/* Courier & Sticker Management Section */}
        <SectionHeader title="Courier & Sticker Management" />
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Pending Courier Stickers"
            value={metrics.pendingCourierStickers}
            color="#FF5722"
            icon="🏷️"
            onPress={() => handleNavigation('Courier Stickers')}
          />
        </View>
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="Generate Courier Sticker"
            description="Create courier stickers for claim files"
            icon="🏷️"
            onPress={() => handleNavigation('Generate Courier Sticker')}
          />
          <NavigationCard
            title="Courier Tracking"
            description="Track courier status and delivery"
            icon="📦"
            onPress={() => handleNavigation('Courier Tracking')}
          />
        </View>
        <Divider />

        {/* Claim User Management Section */}
        <SectionHeader title="Claim User Management" />
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="Claim User Status"
            description="View and manage claim user status"
            icon="👤"
            onPress={() => handleNavigation('Claim User Status')}
          />
          <NavigationCard
            title="Service Charge Management"
            description="Manage service charges for claims"
            icon="💼"
            onPress={() => handleNavigation('Service Charge Management')}
          />
          <NavigationCard
            title="TPA Selection"
            description="Select and manage TPA assignments"
            icon="🤝"
            onPress={() => handleNavigation('TPA Selection')}
          />
          <NavigationCard
            title="User Performance"
            description="Track user performance metrics"
            icon="📊"
            onPress={() => handleNavigation('User Performance')}
          />
        </View>
        <Divider />

        {/* Claim Management Section */}
        <SectionHeader title="Claim Management" />
        <View style={styles.navigationGrid}>
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
          <NavigationCard
            title="File Submission"
            description="Submit claim files online/offline"
            icon="📬"
            onPress={() => handleNavigation('File Submission')}
          />
          <NavigationCard
            title="Payment Settlement"
            description="Process payment settlements"
            icon="💰"
            onPress={() => handleNavigation('Payment Settlement')}
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
            title="File Status Reports"
            description="Track file submission and status"
            icon="📈"
            onPress={() => handleNavigation('File Status Reports')}
          />
          <NavigationCard
            title="Courier Reports"
            description="Courier tracking and delivery reports"
            icon="📦"
            onPress={() => handleNavigation('Courier Reports')}
          />
          <NavigationCard
            title="User Activity Reports"
            description="Staff activity and performance reports"
            icon="👥"
            onPress={() => handleNavigation('User Activity Reports')}
          />
        </View>
        <Divider />

        {/* Communication Section */}
        <SectionHeader title="Communication" />
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="SMS Management"
            description="Send SMS notifications and reminders"
            icon="📱"
            onPress={() => handleNavigation('SMS Management')}
          />
          <NavigationCard
            title="WhatsApp Integration"
            description="WhatsApp communication system"
            icon="💬"
            onPress={() => handleNavigation('WhatsApp Integration')}
          />
          <NavigationCard
            title="Reminder System"
            description="Set and manage reminders"
            icon="⏰"
            onPress={() => handleNavigation('Reminder System')}
          />
          <NavigationCard
            title="Notification Center"
            description="View all notifications and alerts"
            icon="🔔"
            onPress={() => handleNavigation('Notification Center')}
          />
        </View>
        <Divider />

        {/* Quick Actions Section */}
        <SectionHeader title="Quick Actions" />
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="Add New Claim"
            description="Quickly add a new claim entry"
            icon="➕"
            onPress={() => handleNavigation('Add New Claim')}
          />
          <NavigationCard
            title="Search Claims"
            description="Search and find specific claims"
            icon="🔍"
            onPress={() => handleNavigation('Search Claims')}
          />
          <NavigationCard
            title="Bulk Operations"
            description="Perform bulk operations on claims"
            icon="📋"
            onPress={() => handleNavigation('Bulk Operations')}
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

export default StaffDashboard; 