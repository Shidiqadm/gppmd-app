import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface StatusCardProps {
  title: string;
  count: number;
  color: string;
  textColor?: string;
  onPress?: () => void;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  count,
  color,
  textColor = '#000',
  onPress
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.count, { color: textColor }]}>{count}</Text>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  count: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
