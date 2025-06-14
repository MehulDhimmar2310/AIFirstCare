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

interface HospitalDashboardMetrics {
  totalClaims: number;
  completedClaims: number;
  inProcessClaims: number;
}

interface HospitalDashboardProps {
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

const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ onLogout }) => {
  const [metrics, setMetrics] = useState<HospitalDashboardMetrics>({
    totalClaims: 0,
    completedClaims: 0,
    inProcessClaims: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Mock data loading - in real app, this would fetch from API
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMetrics({
          totalClaims: 156,
          completedClaims: 98,
          inProcessClaims: 58,
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
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Hospital Dashboard</Text>
          <Text style={styles.headerSubtitle}>View Only Access</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to FirstCare</Text>
          <Text style={styles.welcomeSubtitle}>
            Insurance Claim Portal - Hospital Access
          </Text>
        </View>

        {/* Metrics Section */}
        <SectionHeader title="Claim Overview" />
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Total Claims"
            value={metrics.totalClaims}
            color="#4CAF50"
            icon="📄"
            onPress={() => handleNavigation('Total Claims')}
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
        </View>

        <Divider />

        {/* Quick Actions Section */}
        <SectionHeader title="Quick Actions" />
        <View style={styles.navigationGrid}>
          <NavigationCard
            title="View Claims"
            description="Browse all your hospital claims"
            icon="📋"
            onPress={() => handleNavigation('View Claims')}
          />
          <NavigationCard
            title="Claim Status"
            description="Check status of specific claims"
            icon="🔍"
            onPress={() => handleNavigation('Claim Status')}
          />
          <NavigationCard
            title="Reports"
            description="View hospital-specific reports"
            icon="📊"
            onPress={() => handleNavigation('Reports')}
          />
          <NavigationCard
            title="Documents"
            description="Access claim documents"
            icon="📁"
            onPress={() => handleNavigation('Documents')}
          />
        </View>

        <Divider />

        {/* Recent Activity Section */}
        <SectionHeader title="Recent Activity" />
        <View style={styles.activityContainer}>
          <ActivityItem
            title="Claim #HC-2024-001"
            description="Status updated to 'In Process'"
            time="2 hours ago"
            type="update"
          />
          <ActivityItem
            title="Claim #HC-2024-002"
            description="Documents uploaded successfully"
            time="4 hours ago"
            type="upload"
          />
          <ActivityItem
            title="Claim #HC-2024-003"
            description="Payment settled"
            time="1 day ago"
            type="payment"
          />
        </View>

        <Divider />

        {/* Information Section */}
        <SectionHeader title="Information" />
        <View style={styles.infoContainer}>
          <InfoCard
            title="Support"
            description="Contact our support team for assistance"
            icon="📞"
            onPress={() => handleNavigation('Support')}
          />
          <InfoCard
            title="Guidelines"
            description="View claim submission guidelines"
            icon="📖"
            onPress={() => handleNavigation('Guidelines')}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 FirstCare Insurance. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

const ActivityItem: React.FC<{
  title: string;
  description: string;
  time: string;
  type: 'update' | 'upload' | 'payment';
}> = ({ title, description, time, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'update': return '🔄';
      case 'upload': return '📤';
      case 'payment': return '💰';
      default: return '📝';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'update': return '#FF9800';
      case 'upload': return '#4CAF50';
      case 'payment': return '#2196F3';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.activityItem}>
      <View style={[styles.activityIcon, { backgroundColor: getColor() }]}>
        <Text style={styles.activityIconText}>{getIcon()}</Text>
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityDescription}>{description}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
};

const InfoCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}> = ({ title, description, icon, onPress }) => (
  <TouchableOpacity style={styles.infoCard} onPress={onPress} activeOpacity={0.85}>
    <View style={styles.infoIconContainer}>
      <Text style={styles.infoIcon}>{icon}</Text>
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

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
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
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
  welcomeSection: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 10,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: (width - 50) / 2,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  metricIcon: {
    fontSize: 24,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  navigationGrid: {
    paddingHorizontal: 15,
    gap: 10,
  },
  navigationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  navigationIcon: {
    fontSize: 24,
  },
  navigationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  navigationDescription: {
    fontSize: 14,
    color: '#666',
  },
  activityContainer: {
    paddingHorizontal: 15,
  },
  activityItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  infoContainer: {
    paddingHorizontal: 15,
    gap: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3e5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default HospitalDashboard; 