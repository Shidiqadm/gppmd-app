import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0-100
  color?: string;
  label?: string;
}

const ProgressRing: React.FC<Props> = ({ size = 54, strokeWidth = 6, progress, color = '#4B4EFF', label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, progress));
  const dashoffset = circumference - (circumference * clamped) / 100;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E5E7EB"
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
        />
      </Svg>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center' as const,
    fontWeight: '700',
    color: '#111827',
  },
});

export default ProgressRing;
