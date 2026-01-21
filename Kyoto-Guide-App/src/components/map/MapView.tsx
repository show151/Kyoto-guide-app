import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Spot } from '../../types/spot';
import { useAudioPlayback } from '../../services/audio-trigger/trigger';
import { useLocation } from '../../hooks/use-location';

interface MapViewComponentProps {
  spots: Spot[];
  distanceThreshold?: number;
  googleMap?: boolean;
}

export default function MapViewComponent({ spots, distanceThreshold = 50, googleMap = false }: MapViewComponentProps) {
  const { currentLocation, region, setRegion } = useLocation();
  useAudioPlayback(currentLocation, spots , distanceThreshold);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: '100%', height: '100%' }}
        provider={googleMap ? PROVIDER_GOOGLE : undefined}
        region={region}
      >
        {spots.map((spot) => (
          <Marker
              key={spot.name}
              coordinate={{ latitude: spot.location.latitude, longitude: spot.location.longitude }}
              title={spot.name}
              description={spot.description}
          />
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
