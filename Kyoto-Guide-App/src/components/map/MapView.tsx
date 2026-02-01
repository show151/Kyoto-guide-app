import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Spot } from '../../types/spot';
import { useAudioPlayback } from '../../services/audio-trigger/trigger';
import { useLocation } from '../../hooks/use-location';
import SpotMarker from './spot-marker';

interface MapViewComponentProps {
  spots: Spot[];
  distanceThreshold?: number;
  googleMap?: boolean;
}

export default function MapViewComponent({ spots, distanceThreshold = 50, googleMap = false }: MapViewComponentProps) {
  const { currentLocation, region, setRegion } = useLocation();
  useAudioPlayback(currentLocation, spots , distanceThreshold);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const coordinates = spots
      .map((spot) => ({
        latitude: spot.location.latitude,
        longitude: spot.location.longitude,
      }))
      .filter((coord) => typeof coord.latitude === 'number' && typeof coord.longitude === 'number');

    if (currentLocation) {
      coordinates.push({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    }

    if (coordinates.length > 0) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
        animated: true,
      });
    }
  }, [spots, currentLocation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        provider={googleMap ? PROVIDER_GOOGLE : undefined}
        region={region}
      >
        {spots.map((spot) => (
          <SpotMarker key={spot.name} spot={spot} />
        ))}
        {currentLocation && (
          <Marker
            key="currentLocation"
            coordinate={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}
            title="現在地"
          />
        )}
      </MapView>
    </View>
  );
}
