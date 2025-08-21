import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapboxGL from '@/src/lib/mapbox';

export default function MapScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>Location permission denied. Enable it in settings to show your location.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={StyleSheet.absoluteFillObject}>
        <MapboxGL.Camera zoomLevel={12} centerCoordinate={[0, 0]} />
        {/* Show the user's location if permission is granted */}
        {hasPermission && (
          // @ts-ignore LocationPuck is available in @rnmapbox/maps v11+
          <MapboxGL.LocationPuck />
        )}
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
