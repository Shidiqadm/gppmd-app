import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GlobalMap from '@app/components/organisms/GlobalMap';
import Chip from '@app/components/molecules/Chip';
import SegmentedControl from '@app/components/molecules/SegmentedControl';
import StatsCard from '@app/components/molecules/StatsCard';
import BarChart from '@app/components/charts/BarChart';
import DonutChart from '@app/components/charts/DonutChart';
import { regions, projectPhaseSummary, portfolioSummary, projects } from '@app/data/sample';
import { useRouter } from 'expo-router';

type Mode = 'PROJECT' | 'PORTFOLIO';

export default function HomeScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('PROJECT');

  const markers = useMemo(
    () => regions.map((r) => ({ id: r.code, coordinate: r.center, count: r.activeProjects })),
    []
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GlobalMap
        height={240}
        center={[10, 20]}
        zoom={1.3}
        markers={markers}
        onPressMarker={(id) => router.push(`/region/${id}`)}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: -24 }} contentContainerStyle={styles.chips}>
        {regions.map((r) => (
          <Chip key={r.code} label={r.code} value={String(r.activeProjects)} onPress={() => router.push(`/region/${r.code}`)} />
        ))}
      </ScrollView>

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Group {mode === 'PROJECT' ? 'Projects' : 'Portfolio'}</Text>
          <SegmentedControl
            options={[{ label: 'PROJECT', value: 'PROJECT' }, { label: 'PORTFOLIO', value: 'PORTFOLIO' }]}
            value={mode}
            onChange={(v) => setMode(v)}
          />
        </View>

        {mode === 'PROJECT' ? (
          <View style={styles.grid}>
            <StatsCard value={projectPhaseSummary.counts['Pre Projects']} label="Pre Projects" color="#EEF2FF" />
            <StatsCard value={projectPhaseSummary.counts.Initiating} label="Initiating" color="#FEF3C7" />
            <StatsCard value={projectPhaseSummary.counts.Planning} label="Planning" color="#FFE9B5" />
            <StatsCard value={projectPhaseSummary.counts.Executing} label="Executing" color="#D1FAE5" />
            <StatsCard value={projectPhaseSummary.counts.Closing} label="Closing" color="#FEE2E2" />
            <StatsCard value={projectPhaseSummary.counts.Closed} label="Closed" color="#E0E7FF" />
          </View>
        ) : (
          <View style={styles.grid2}>
            <StatsCard value={portfolioSummary.projects} label="Portfolio Projects" color="#2D2A6A" />
            <StatsCard value={`${portfolioSummary.valueAFE.toLocaleString()} M`} label="Portfolio Value AFE" color="#D1FAE5" />
          </View>
        )}
      </View>

      {mode === 'PORTFOLIO' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spent Vs Committed (USD)</Text>
          <DonutChart percent={portfolioSummary.spentPct} />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Afe by Project</Text>
        <BarChart
          data={projects.slice(0, 5).map((p) => ({ label: p.title, value: p.afeAmount }))}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  chips: { gap: 8, paddingHorizontal: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  grid2: { flexDirection: 'row', gap: 10 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: { fontWeight: '800', color: '#1F2937', marginBottom: 8 },
});
