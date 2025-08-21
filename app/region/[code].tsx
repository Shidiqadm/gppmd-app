import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import GlobalMap from '@app/components/organisms/GlobalMap';
import Chip from '@app/components/molecules/Chip';
import StatsCard from '@app/components/molecules/StatsCard';
import ProjectCard from '@app/components/molecules/ProjectCard';
import { entities as allEntities, projects as allProjects, regions as allRegions, type RegionCode } from '@app/data/sample';

export default function RegionScreen() {
  const { code } = useLocalSearchParams<{ code: RegionCode }>();
  const router = useRouter();
  const region = allRegions.find((r) => r.code === code) ?? allRegions[0];
  const regionEntities = allEntities.filter((e) => e.region === region.code);
  const [entityId, setEntityId] = useState<string | null>(regionEntities[0]?.id ?? null);

  const markers = useMemo(() => regionEntities.map((e) => ({ id: e.id, coordinate: e.location, count: e.activeProjects })), [regionEntities]);
  const projects = useMemo(() => allProjects.filter((p) => !entityId || p.entityId === entityId), [entityId]);

  const phaseCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Pre Projects': 0, Initiating: 0, Planning: 0, Executing: 0, Closing: 0, Closed: 0 };
    projects.forEach((p) => { counts[p.phase] = (counts[p.phase] ?? 0) + 1; });
    return counts;
  }, [projects]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GlobalMap height={260} center={region.center} zoom={3.2} markers={markers} onPressMarker={(id) => setEntityId(id)} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: -24 }} contentContainerStyle={styles.chips}>
        {regionEntities.map((e) => (
          <Chip key={e.id} label={e.name} value={String(e.activeProjects)} selected={e.id === entityId} onPress={() => setEntityId(e.id)} />
        ))}
      </ScrollView>

      <View style={styles.card}>
        <Text style={styles.headerTitle}>{region.code} Projects</Text>
        <View style={styles.grid}>
          <StatsCard value={phaseCounts['Pre Projects'] ?? 0} label="Pre Projects" color="#EEF2FF" />
          <StatsCard value={phaseCounts['Initiating'] ?? 0} label="Initiating" color="#FEF3C7" />
          <StatsCard value={phaseCounts['Planning'] ?? 0} label="Planning" color="#FFE9B5" />
          <StatsCard value={phaseCounts['Executing'] ?? 0} label="Executing" color="#D1FAE5" />
          <StatsCard value={phaseCounts['Closing'] ?? 0} label="Closing" color="#FEE2E2" />
          <StatsCard value={phaseCounts['Closed'] ?? 0} label="Closed" color="#E0E7FF" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{regionEntities.find((e) => e.id === entityId)?.name ?? 'Projects'}</Text></View>
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            title={p.title}
            phase={p.phase}
            afeAmount={p.afeAmount}
            completionPct={p.completionPct}
            onPress={() => router.push(`/project/${p.id}`)}
          />
        ))}
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937', marginBottom: 8 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  sectionTitle: { fontWeight: '800', color: '#1F2937' },
});
