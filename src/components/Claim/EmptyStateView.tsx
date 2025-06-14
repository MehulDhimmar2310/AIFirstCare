import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const EmptyStateView: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔍</Text>
      </View>
      
      <Text style={styles.title}>No Record Found</Text>
      
      <Text style={styles.description}>
        We couldn't find any claim records matching your search criteria. 
        Please verify the information you entered and try again.
      </Text>
      
      <View style={styles.suggestions}>
        <Text style={styles.suggestionsTitle}>Please check:</Text>
        <Text style={styles.suggestionItem}>• Hospital name is correct</Text>
        <Text style={styles.suggestionItem}>• Claim number is accurate</Text>
        <Text style={styles.suggestionItem}>• Policy number is correct</Text>
        <Text style={styles.suggestionItem}>• Patient name spelling</Text>
      </View>
      
      <Text style={styles.contactText}>
        If you believe this is an error, please contact our support team.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  suggestions: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  suggestionItem: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
    paddingLeft: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default EmptyStateView; 