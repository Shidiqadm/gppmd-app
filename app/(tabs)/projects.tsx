import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import BarChart from '@app/components/charts/BarChart';
import { projects } from '@app/data/sample';

export default function ProjectsTab() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Projects Overview</Text>
        <BarChart data={projects.slice(0, 8).map((p) => ({ label: p.title, value: p.afeAmount }))} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  title: { fontSize: 16, fontWeight: '800', color: '#1F2937', marginBottom: 8 },
});
