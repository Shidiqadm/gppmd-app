import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ProgressRing from '@app/components/atoms/ProgressRing';

interface Props {
  title: string;
  phase: string;
  afeAmount: number; // millions
  completionPct: number;
  onPress?: () => void;
}

export default function ProjectCard({ title, phase, afeAmount, completionPct, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.caption}>Projects</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>{phase}</Text></View>
        <View style={styles.progressRow}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBar, { width: `${completionPct}%` }]} />
          </View>
          <Text style={styles.progressLabel}>AFE</Text>
        </View>
        <Text style={styles.money}>{`$${afeAmount.toLocaleString()} M`}</Text>
      </View>
      <ProgressRing progress={completionPct} label={`${completionPct}%`} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  caption: { color: '#6B7280', fontWeight: '700', fontSize: 12 },
  title: { fontSize: 16, fontWeight: '800', color: '#111827', marginTop: 4 },
  badge: { alignSelf: 'flex-start', marginTop: 8, backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  progressBarBg: { height: 8, backgroundColor: '#E5E7EB', flex: 1, borderRadius: 8 },
  progressBar: { height: 8, backgroundColor: '#3F3DE0', borderRadius: 8 },
  progressLabel: { fontSize: 12, color: '#6B7280', fontWeight: '700' },
  money: { marginTop: 8, fontWeight: '800', color: '#111827' },
});
