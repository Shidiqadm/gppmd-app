import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface ChipProps {
  label: string;
  value?: string;
  selected?: boolean;
  onPress?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, value, selected, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[styles.base, selected && styles.selected]}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      {typeof value !== 'undefined' && (
        <View style={styles.valuePill}>
          <Text style={styles.valueText}>{value}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  selected: {
    borderColor: '#4B4EFF',
  },
  label: {
    fontWeight: '600',
    color: '#111827',
  },
  labelSelected: {
    color: '#4B4EFF',
  },
  valuePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  valueText: {
    fontWeight: '700',
    color: '#111827',
  },
});

export default Chip;
