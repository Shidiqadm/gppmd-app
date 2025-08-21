import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UserTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User</Text>
      <Text style={styles.subtitle}>Profile and settings will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  subtitle: { marginTop: 8, color: '#6B7280' },
});
