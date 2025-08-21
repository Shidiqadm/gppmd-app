import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  value: number | string;
  label: string;
  color?: string; // tile background
}

const StatsCard: React.FC<Props> = ({ value, label, color = '#F3F4F6' }) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}> 
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    minWidth: 120,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  label: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    opacity: 0.8,
  },
});

export default StatsCard;
