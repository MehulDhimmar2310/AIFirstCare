import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { ClaimStage } from '../../types/claim.types';
import { exportToCSV, CSVExportData } from '../../utils/csvExport';

export interface SummaryMetrics {
  totalClaims: number;
  completedClaims: number;
  inProcessClaims: number;
  totalHospitals: number;
  claimStageBreakdown: {
    [key in ClaimStage]?: number;
  };
}

export interface SummaryViewProps {
  metrics: SummaryMetrics;
  role: 'super_admin' | 'admin' | 'staff' | 'hospital';
  onDateFilterChange?: (dateFrom: string, dateTo: string) => void;
  onExport?: (data: CSVExportData[]) => void;
  isLoading?: boolean;
}

interface DateFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (dateFrom: string, dateTo: string) => void;
  currentDateFrom?: string;
  currentDateTo?: string;
}

const DateFilterModal: React.FC<DateFilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentDateFrom,
  currentDateTo,
}) => {
  const [dateFrom, setDateFrom] = useState(currentDateFrom || '');
  const [dateTo, setDateTo] = useState(currentDateTo || '');

  const handleApply = () => {
    onApply(dateFrom, dateTo);
    onClose();
  };

  const handleClear = () => {
    setDateFrom('');
    setDateTo('');
    onApply('', '');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Date Filter</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalContent}>
          <View style={styles.dateInputContainer}>
            <Text style={styles.dateLabel}>From Date (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.dateInput}
              value={dateFrom}
              onChangeText={setDateFrom}
              placeholder="2024-01-01"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.dateInputContainer}>
            <Text style={styles.dateLabel}>To Date (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.dateInput}
              value={dateTo}
              onChangeText={setDateTo}
              placeholder="2024-12-31"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const SummaryView: React.FC<SummaryViewProps> = ({
  metrics,
  role,
  onDateFilterChange,
  onExport,
  isLoading = false,
}) => {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [currentDateFrom, setCurrentDateFrom] = useState('');
  const [currentDateTo, setCurrentDateTo] = useState('');

  const handleDateFilterApply = (dateFrom: string, dateTo: string) => {
    setCurrentDateFrom(dateFrom);
    setCurrentDateTo(dateTo);
    onDateFilterChange?.(dateFrom, dateTo);
  };

  const handleExport = () => {
    const exportData: CSVExportData[] = [
      {
        'Total Claims': metrics.totalClaims,
        'Completed Claims': metrics.completedClaims,
        'In Process Claims': metrics.inProcessClaims,
        'Total Hospitals': metrics.totalHospitals,
        'Admitted': metrics.claimStageBreakdown[ClaimStage.ADMITTED] || 0,
        'Discharged': metrics.claimStageBreakdown[ClaimStage.DISCHARGED] || 0,
        'File Submitted': metrics.claimStageBreakdown[ClaimStage.FILE_SUBMITTED] || 0,
        'Settled': metrics.claimStageBreakdown[ClaimStage.SETTLED] || 0,
        'Pending': metrics.claimStageBreakdown[ClaimStage.PENDING] || 0,
        'Rejected': metrics.claimStageBreakdown[ClaimStage.REJECTED] || 0,
        'Date From': currentDateFrom || 'All',
        'Date To': currentDateTo || 'All',
      },
    ];

    const csvContent = exportToCSV(exportData, {
      filename: `${role}_summary_${new Date().toISOString().split('T')[0]}`,
    });

    Alert.alert(
      'Export Summary',
      'Summary data has been prepared for export. Check the console for CSV content.',
      [
        { text: 'OK' },
      ]
    );

    onExport?.(exportData);
  };

  const getStageColor = (stage: ClaimStage) => {
    switch (stage) {
      case ClaimStage.ADMITTED:
        return '#2196F3';
      case ClaimStage.DISCHARGED:
        return '#4CAF50';
      case ClaimStage.FILE_SUBMITTED:
        return '#FF9800';
      case ClaimStage.SETTLED:
        return '#4CAF50';
      case ClaimStage.PENDING:
        return '#FFC107';
      case ClaimStage.REJECTED:
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const renderMetricCard = (title: string, value: number, color: string) => (
    <View style={[styles.metricCard, { borderLeftColor: color }]}>
      <Text style={styles.metricValue}>{value.toLocaleString()}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
  );

  const renderStageBreakdown = () => (
    <View style={styles.stageBreakdownContainer}>
      <Text style={styles.sectionTitle}>Claim Stage Breakdown</Text>
      <View style={styles.stageGrid}>
        {Object.values(ClaimStage).map((stage) => {
          const count = metrics.claimStageBreakdown[stage] || 0;
          return (
            <View key={stage} style={styles.stageItem}>
              <View style={[styles.stageIndicator, { backgroundColor: getStageColor(stage) }]} />
              <Text style={styles.stageLabel}>{stage}</Text>
              <Text style={styles.stageCount}>{count}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading summary...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with filters and export */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Summary View</Text>
          {(currentDateFrom || currentDateTo) && (
            <Text style={styles.dateFilterText}>
              {currentDateFrom && currentDateTo 
                ? `${currentDateFrom} to ${currentDateTo}`
                : currentDateFrom || currentDateTo}
            </Text>
          )}
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowDateFilter(true)}
          >
            <Text style={styles.filterButtonText}>📅 Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExport}
          >
            <Text style={styles.exportButtonText}>📊 Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Claims', metrics.totalClaims, '#4CAF50')}
            {renderMetricCard('Completed Claims', metrics.completedClaims, '#2196F3')}
            {renderMetricCard('In Process Claims', metrics.inProcessClaims, '#FF9800')}
            {role !== 'hospital' && renderMetricCard('Total Hospitals', metrics.totalHospitals, '#9C27B0')}
          </View>
        </View>

        {/* Claim Stage Breakdown */}
        {renderStageBreakdown()}
      </ScrollView>

      <DateFilterModal
        visible={showDateFilter}
        onClose={() => setShowDateFilter(false)}
        onApply={handleDateFilterApply}
        currentDateFrom={currentDateFrom}
        currentDateTo={currentDateTo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  dateFilterText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
  },
  filterButtonText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  exportButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E8F5E8',
    borderRadius: 6,
  },
  exportButtonText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 120,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  stageBreakdownContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stageGrid: {
    gap: 12,
  },
  stageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  stageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  stageLabel: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  stageCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666666',
  },
  modalContent: {
    padding: 20,
  },
  dateInputContainer: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 8,
  },
  dateInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  clearButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  applyButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SummaryView; 