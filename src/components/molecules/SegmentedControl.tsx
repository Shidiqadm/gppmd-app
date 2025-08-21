import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}

export default function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View style={styles.container}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable key={opt.value} onPress={() => onChange(opt.value)} style={[styles.segment, selected && styles.segmentSelected]}>
            <Text style={[styles.label, selected && styles.labelSelected]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 4,
    borderRadius: 12,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentSelected: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    color: '#6B7280',
    fontWeight: '700',
  },
  labelSelected: {
    color: '#3F3DE0',
  },
});
