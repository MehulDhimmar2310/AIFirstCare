import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ClaimStage } from '../../types/claim.types';

interface ClaimStatusCardProps {
  stage: string;
  date?: string;
  referenceNo?: string;
}

const ClaimStatusCard: React.FC<ClaimStatusCardProps> = ({
  stage,
  date,
  referenceNo,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'admitted':
        return { backgroundColor: '#E3F2FD', textColor: '#1976D2', borderColor: '#2196F3' };
      case 'discharged':
        return { backgroundColor: '#E8F5E8', textColor: '#2E7D32', borderColor: '#4CAF50' };
      case 'file submitted':
        return { backgroundColor: '#FFF3E0', textColor: '#F57C00', borderColor: '#FF9800' };
      case 'settled':
        return { backgroundColor: '#E8F5E8', textColor: '#2E7D32', borderColor: '#4CAF50' };
      case 'pending':
        return { backgroundColor: '#FFF8E1', textColor: '#F57F17', borderColor: '#FFC107' };
      case 'rejected':
        return { backgroundColor: '#FFEBEE', textColor: '#D32F2F', borderColor: '#F44336' };
      default:
        return { backgroundColor: '#F5F5F5', textColor: '#757575', borderColor: '#9E9E9E' };
    }
  };

  const statusColors = getStatusColor(stage);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Claim Status</Text>
        <View style={[
          styles.statusBadge,
          {
            backgroundColor: statusColors.backgroundColor,
            borderColor: statusColors.borderColor,
          }
        ]}>
          <Text style={[
            styles.statusText,
            { color: statusColors.textColor }
          ]}>
            {stage}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {date && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status Date:</Text>
            <Text style={styles.infoValue}>{formatDate(date)}</Text>
          </View>
        )}

        {referenceNo && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Reference Number:</Text>
            <Text style={styles.infoValue}>{referenceNo}</Text>
          </View>
        )}

        <View style={styles.statusDescription}>
          <Text style={styles.descriptionText}>
            Your claim is currently in the "{stage}" stage. 
            {stage.toLowerCase() === 'settled' && ' The claim has been processed and completed.'}
            {stage.toLowerCase() === 'pending' && ' Your claim is under review. Please check back later for updates.'}
            {stage.toLowerCase() === 'file submitted' && ' Your claim file has been submitted and is being processed.'}
            {stage.toLowerCase() === 'admitted' && ' The patient has been admitted and treatment is ongoing.'}
            {stage.toLowerCase() === 'discharged' && ' The patient has been discharged and the claim is being processed.'}
            {stage.toLowerCase() === 'rejected' && ' Your claim has been rejected. Please contact support for more information.'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusDescription: {
    marginTop: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default ClaimStatusCard; 