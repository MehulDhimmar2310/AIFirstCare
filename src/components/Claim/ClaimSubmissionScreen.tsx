import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { User } from '../../types/auth.types';
import ClaimSubmissionForm from './ClaimSubmissionForm';
import { colors } from '../../styles/theme';

interface ClaimSubmissionScreenProps {
  user: User;
  onBack?: () => void;
}

const ClaimSubmissionScreen: React.FC<ClaimSubmissionScreenProps> = ({
  user,
  onBack,
}) => {
  const handleClaimSuccess = (claimId: string) => {
    console.log('Claim submitted successfully:', claimId);
    // Handle success - could navigate to claim status or show success screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ClaimSubmissionForm user={user} onSuccess={handleClaimSuccess} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ClaimSubmissionScreen; 