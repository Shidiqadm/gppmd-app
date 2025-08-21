import React from 'react';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';

export interface BarItem { label: string; value: number; }

interface Props {
  data: BarItem[];
  height?: number;
  barColor?: string;
}

export default function BarChart({ data, height = 180, barColor = '#2D2A6A' }: Props) {
  const width = 320; // content width
  const padding = 20;
  const innerWidth = width - padding * 2;
  const max = Math.max(...data.map((d) => d.value), 1);
  const barHeight = 18;
  const gap = 16;

  return (
    <View style={styles.card}>
      <Svg width={width} height={height}>
        {data.map((d, i) => {
          const y = padding + i * (barHeight + gap);
          const w = (d.value / max) * innerWidth;
          return (
            <React.Fragment key={d.label}>
              <SvgText x={padding} y={y - 4} fill="#111827" fontSize={12}>{d.label}</SvgText>
              <Rect x={padding} y={y} width={innerWidth} height={barHeight} fill="#E5E7EB" rx={8} />
              <Rect x={padding} y={y} width={w} height={barHeight} fill={barColor} rx={8} />
            </React.Fragment>
          );
        })}
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
  },
});
