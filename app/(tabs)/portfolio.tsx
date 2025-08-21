import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DonutChart from '@app/components/charts/DonutChart';
import StatsCard from '@app/components/molecules/StatsCard';
import { portfolioSummary } from '@app/data/sample';

export default function PortfolioTab() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Portfolio Summary</Text>
        <View style={styles.grid}>
          <StatsCard value={portfolioSummary.projects} label="Projects" color="#EEF2FF" />
          <StatsCard value={`$ ${portfolioSummary.valueAFE.toLocaleString()} M`} label="Value AFE" color="#FEF3C7" />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Spent vs Committed</Text>
        <DonutChart percent={portfolioSummary.spentPct} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  title: { fontSize: 16, fontWeight: '800', color: '#1F2937', marginBottom: 8 },
  grid: { flexDirection: 'row', gap: 10 },
});
