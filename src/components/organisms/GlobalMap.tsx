import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapboxGL from '@app/lib/mapbox';
import { DefaultStyleURL, hasAccessToken } from '@app/lib/mapbox';

export interface Marker {
  id: string;
  coordinate: [number, number]; // [lng, lat]
  count?: number;
}

interface Props {
  height?: number;
  center?: [number, number];
  zoom?: number;
  markers?: Marker[];
  onPressMarker?: (id: string) => void;
}

export default function GlobalMap({ height = 220, center = [0, 20], zoom = 1.2, markers = [], onPressMarker }: Props) {
  const markerViews = useMemo(() => markers, [markers]);

  if (!hasAccessToken) {
    return (
      <View style={[styles.placeholder, { height }]}>
        <Text style={styles.placeholderTitle}>Mapbox token missing</Text>
        <Text style={styles.placeholderSub}>Set EXPO_PUBLIC_MAPBOX_TOKEN or expo.extra.mapboxPublicToken</Text>
      </View>
    );
  }

  return (
    <View style={{ height, borderRadius: 12, overflow: 'hidden' }}>
      <MapboxGL.MapView style={StyleSheet.absoluteFillObject} styleURL={DefaultStyleURL} scaleBarEnabled={false} logoEnabled={false}>
        <MapboxGL.Camera zoomLevel={zoom} centerCoordinate={center} animationMode="flyTo" />
        {markerViews.map((m) => (
          <MapboxGL.PointAnnotation
            key={m.id}
            id={m.id}
            coordinate={m.coordinate}
            onSelected={() => onPressMarker?.(m.id)}
          >
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{m.count ?? 0}</Text>
            </View>
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    borderRadius: 12,
    backgroundColor: '#E5EEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTitle: {
    fontWeight: '800',
    color: '#1f2937',
  },
  placeholderSub: {
    marginTop: 4,
    color: '#6b7280',
    fontSize: 12,
  },
  bubble: {
    backgroundColor: '#2D2A6A',
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  bubbleText: {
    color: 'white',
    fontWeight: '800',
  },
});
