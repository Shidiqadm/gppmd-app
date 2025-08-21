import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DonutChartProps {
  percentage: number;
  centerValue: string;
  centerLabel?: string;
  spentAmount: string;
  remainingAmount: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  centerValue,
  centerLabel,
  spentAmount,
  remainingAmount,
  size = 160,
  strokeWidth = 20,
  color = '#4F46E5'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={[styles.chartContainer, { width: size, height: size }]}>
        <svg width={size} height={size} style={styles.svg}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <View style={styles.centerContent}>
          <Text style={styles.percentage}>{percentage}%</Text>
          <Text style={styles.centerValue}>{centerValue}</Text>
          {centerLabel && <Text style={styles.centerLabel}>{centerLabel}</Text>}
        </View>
      </View>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: color }]} />
          <Text style={styles.legendText}>{spentAmount}</Text>
          <Text style={styles.legendLabel}>Spent Amount</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#E5E7EB' }]} />
          <Text style={styles.legendText}>{remainingAmount}</Text>
          <Text style={styles.legendLabel}>Remaining Amount</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  chartContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  svg: {
    position: 'absolute',
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  centerValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  centerLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  legendItem: {
    alignItems: 'center',
    flex: 1,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  legendText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  legendLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
