import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressIndicator } from './ProgressIndicator';

interface ProjectCardProps {
  name: string;
  status: string;
  afe: number;
  completion: number;
  onPress?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  status,
  afe,
  completion,
  onPress
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return '#F59E0B';
      case 'Pre Projects': return '#6B7280';
      case 'Executing': return '#10B981';
      case 'Closing': return '#EF4444';
      default: return '#4F46E5';
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
        <ProgressIndicator 
          percentage={completion} 
          size={60} 
          strokeWidth={6}
          color={getStatusColor(status)}
        />
      </View>
      
      <View style={styles.afeContainer}>
        <Text style={styles.afeLabel}>AFE</Text>
        <Text style={styles.afeAmount}>{formatCurrency(afe)}</Text>
        <Text style={styles.completionText}>Completion</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectInfo: {
    flex: 1,
    marginRight: 16,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  afeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  afeLabel: {
    fontSize: 12,
    color: '#666',
  },
  afeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  completionText: {
    fontSize: 12,
    color: '#666',
  },
});
