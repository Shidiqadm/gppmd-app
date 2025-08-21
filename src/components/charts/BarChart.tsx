import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface BarChartData {
  name: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartData[];
  title?: string;
  maxValue?: number;
  height?: number;
  showValues?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  maxValue,
  height = 200,
  showValues = true
}) => {
  const max = maxValue || Math.max(...data.map(item => item.value));
  
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.chartContainer, { height }]}>
          {data.map((item, index) => {
            const barHeight = (item.value / max) * (height - 40);
            return (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  {showValues && (
                    <Text style={styles.valueText}>
                      {item.value > 1000 ? `${(item.value / 1000).toFixed(0)}K` : item.value}
                    </Text>
                  )}
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: item.color || '#4F46E5',
                      }
                    ]}
                  />
                </View>
                <Text style={styles.labelText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    minWidth: 40,
  },
  barWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bar: {
    width: 24,
    borderRadius: 4,
    minHeight: 4,
  },
  valueText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  labelText: {
    fontSize: 10,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    transform: [{ rotate: '-45deg' }],
  },
});
