import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapboxGL from '@/src/lib/mapbox';
import { Region } from '@/src/data/sampleData';

interface GlobalMapProps {
  regions: Region[];
  selectedRegion?: Region | null;
  onRegionPress?: (region: Region) => void;
  style?: any;
}

export const GlobalMap: React.FC<GlobalMapProps> = ({
  regions,
  selectedRegion,
  onRegionPress,
  style
}) => {
  const mapRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  useEffect(() => {
    if (selectedRegion && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: selectedRegion.coordinates,
        zoomLevel: selectedRegion.id === 'amr' ? 3 : 4,
        animationDuration: 1000,
      });
    } else if (!selectedRegion && cameraRef.current) {
      // Reset to global view
      cameraRef.current.setCamera({
        centerCoordinate: [0, 20],
        zoomLevel: 1.5,
        animationDuration: 1000,
      });
    }
  }, [selectedRegion]);

  const handleRegionPress = (region: Region) => {
    if (onRegionPress) {
      onRegionPress(region);
    }
  };

  const renderRegionMarkers = () => {
    return regions.map((region) => (
      <MapboxGL.PointAnnotation
        key={region.id}
        id={region.id}
        coordinate={region.coordinates}
        onSelected={() => handleRegionPress(region)}
      >
        <View style={[
          styles.markerContainer,
          selectedRegion?.id === region.id && styles.selectedMarker
        ]}>
          <View style={styles.marker}>
            <Text style={styles.numberText}>
              {region.projectCount}
            </Text>
          </View>
        </View>
      </MapboxGL.PointAnnotation>
    ));
  };

  const renderBusinessEntityMarkers = () => {
    if (!selectedRegion) return null;

    return selectedRegion.businessEntities.map((entity) => (
      <MapboxGL.PointAnnotation
        key={entity.id}
        id={entity.id}
        coordinate={entity.coordinates}
      >
        <View style={styles.entityMarker}>
          <View style={[styles.entityDot, { 
            backgroundColor: entity.id === 'callao' ? '#F59E0B' : 
                           entity.id === 'santos' ? '#10B981' : 
                           entity.id === 'duke' ? '#EF4444' : '#8B5CF6' 
          }]} />
        </View>
      </MapboxGL.PointAnnotation>
    ));
  };

  return (
    <View style={[styles.container, style]}>
      <MapboxGL.MapView
        ref={mapRef}
        style={styles.map}
        styleURL="mapbox://styles/mapbox/light-v11"
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
        scaleBarEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        <MapboxGL.Camera
          ref={cameraRef}
          centerCoordinate={[0, 20]}
          zoomLevel={1.5}
        />
        
        {renderRegionMarkers()}
        {renderBusinessEntityMarkers()}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMarker: {
    transform: [{ scale: 1.2 }],
  },
  marker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  numberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  entityMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  entityDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
