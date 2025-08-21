import React from 'react';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

interface Props {
  percent: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  bg?: string;
}

export default function DonutChart({ percent, size = 180, strokeWidth = 16, color = '#2D2A6A', bg = '#E5E7EB' }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const dashoffset = circumference - (circumference * clamped) / 100;

  return (
    <View style={styles.card}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={bg} strokeWidth={strokeWidth} fill="transparent" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
        />
        <SvgText x={size / 2} y={size / 2 + 4} textAnchor="middle" fontSize={20} fontWeight="800" fill="#111827">
          {`${clamped} %`}
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
