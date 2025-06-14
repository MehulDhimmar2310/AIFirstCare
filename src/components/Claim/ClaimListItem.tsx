import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ClaimItem } from '../../types/claim.types';

interface ClaimListItemProps {
  claim: ClaimItem;
  onPress: (claim: ClaimItem) => void;
}

const ClaimListItem: React.FC<ClaimListItemProps> = ({ claim, onPress }) => {
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

  const statusColors = getStatusColor(claim.claimStage);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(claim)}>
      <View style={styles.header}>
        <View style={styles.claimInfo}>
          <Text style={styles.claimNumber}>{claim.claimNo}</Text>
          <Text style={styles.policyNumber}>{claim.policyNo}</Text>
        </View>
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
            {claim.claimStage}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Patient:</Text>
          <Text style={styles.value}>{claim.patientName}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Hospital:</Text>
          <Text style={styles.value}>{claim.hospitalName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Status Date:</Text>
          <Text style={styles.value}>{formatDate(claim.statusDate)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Reference:</Text>
          <Text style={styles.value}>{claim.referenceNo}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.submittedDate}>
          Submitted: {formatDate(claim.submittedDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  claimInfo: {
    flex: 1,
  },
  claimNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  policyNumber: {
    fontSize: 14,
    color: '#666666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 2,
    textAlign: 'right',
  },
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  submittedDate: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'right',
  },
});

export default ClaimListItem; 