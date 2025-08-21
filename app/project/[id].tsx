import React, { useMemo, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { projects as allProjects, entities as allEntities } from '@app/data/sample';
import SegmentedControl from '@app/components/molecules/SegmentedControl';
import GlobalMap from '@app/components/organisms/GlobalMap';
import { WebView } from 'react-native-webview';
import ProgressRing from '@app/components/atoms/ProgressRing';
import DonutChart from '@app/components/charts/DonutChart';

const { width } = Dimensions.get('window');

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const project = allProjects.find((p) => p.id === id) ?? allProjects[0];
  const entity = allEntities.find((e) => e.id === project.entityId);
  const [tab, setTab] = useState<'site' | 'sat' | 'map' | 'video'>('site');

  const marker = useMemo(() => [{ id: project.id, coordinate: project.location, count: undefined }], [project]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tabCard}>
        <SegmentedControl<'site' | 'sat' | 'map' | 'video'>
          options={[
            { label: 'Site Photos', value: 'site' },
            { label: 'Satellite Photos', value: 'sat' },
            { label: 'Map', value: 'map' },
            { label: 'Video', value: 'video' },
          ]}
          value={tab}
          onChange={(v) => setTab(v)}
        />
        <View style={{ marginTop: 12 }}>
          {tab === 'site' && (
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {project.images.map((src, i) => (
                <Image key={i} source={{ uri: src }} style={{ width: width - 32, height: 220, borderRadius: 12, marginRight: 8 }} />
              ))}
            </ScrollView>
          )}
          {tab === 'sat' && (
            <Image source={{ uri: 'https://images.unsplash.com/photo-1476435704582-abc0e593a6f0?q=80&w=1280&auto=format&fit=crop' }} style={{ width: '100%', height: 220, borderRadius: 12 }} />
          )}
          {tab === 'map' && <GlobalMap height={220} center={project.location} zoom={8} markers={marker} />}
          {tab === 'video' && (
            <View style={{ height: 220, borderRadius: 12, overflow: 'hidden' }}>
              <WebView source={{ uri: project.video ?? 'https://www.w3schools.com/html/mov_bbb.mp4' }} />
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{project.title}</Text>
          <ProgressRing progress={project.completionPct} label={`${project.completionPct}%`} />
        </View>
        <Text style={styles.caption}>Update Summary • Last Update : 20-5-2025</Text>
        <Text style={styles.paragraph}>
          The answer is actually no - rather than generating fancy fonts, this converter creates fancy symbols.
          An industry standard which creates the specification.
        </Text>

        <Text style={[styles.caption, { marginTop: 12 }]}>Project Description</Text>
        <Text style={styles.paragraph}>
          While weighbridge clerk (IP) was returning to weighbridge office (elevated platform). Well, the answer is actually no - rather than generating fancy fonts, this converter creates fancy symbols.
        </Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoPill}><Text style={styles.infoLabel}>GPPMD Section</Text><Text style={styles.infoValue}>Marine & Infrastructure</Text></View>
          <View style={styles.infoPill}><Text style={styles.infoLabel}>Project Manager</Text><Text style={styles.infoValue}>Ian Wilcock</Text></View>
          <View style={styles.infoPill}><Text style={styles.infoLabel}>Project Class</Text><Text style={styles.infoValue}>Class 1: Major Project</Text></View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AFE</Text>
        <DonutChart percent={45} />
        <View style={styles.afeGrid}>
          <View style={styles.afeBox}><Text style={styles.afeLabel}>Committed</Text><Text style={styles.afeValue}>$ 829,411,882</Text></View>
          <View style={styles.afeBox}><Text style={styles.afeLabel}>Actual</Text><Text style={styles.afeValue}>$ 760,650,238</Text></View>
          <View style={styles.afeBox}><Text style={styles.afeLabel}>Spent</Text><Text style={styles.afeValue}>$ 760,650,238</Text></View>
          <View style={styles.afeBox}><Text style={styles.afeLabel}>Total AFE Amount</Text><Text style={styles.afeValue}>$ 105,505,802</Text></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  tabCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  section: { backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  caption: { marginTop: 8, color: '#6B7280', fontWeight: '700' },
  paragraph: { marginTop: 6, color: '#374151', lineHeight: 20 },
  infoGrid: { marginTop: 12, gap: 8 },
  infoPill: { backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  infoLabel: { fontSize: 12, color: '#6B7280', fontWeight: '700' },
  infoValue: { fontWeight: '800', color: '#111827', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937', marginBottom: 8 },
  afeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  afeBox: { backgroundColor: '#F9FAFB', borderRadius: 10, padding: 12, minWidth: (width - 56) / 2, flex: 1 },
  afeLabel: { fontSize: 12, fontWeight: '700', color: '#6B7280' },
  afeValue: { fontWeight: '800', color: '#111827', marginTop: 6 },
});
