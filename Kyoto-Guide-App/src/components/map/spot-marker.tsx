/**
 * spot-marker.tsx
 *
 * 地図上のスポット用 Marker コンポーネント
 * - 見た目のみを担当
 * - ロジック（距離・音声）は書かない
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { Spot } from '../../types/spot';

interface SpotMarkerProps {
  spot: Spot;
  onPress?: (spot: Spot) => void;
}

export default function SpotMarker({ spot, onPress }: SpotMarkerProps) {
  // locationプロパティが存在しない、または不正な場合は何も表示しない
  if (!spot.location || typeof spot.location.latitude !== 'number' || typeof spot.location.longitude !== 'number') {
    console.warn('Invalid spot location:', spot.name);
    return null;
  }

  return (
    <Marker
      key={spot.name}
      coordinate={{ latitude: spot.location.latitude, longitude: spot.location.longitude }}
      title={spot.name}
      description={spot.description}
      tracksViewChanges={false}
    />
  );
}

const styles = StyleSheet.create({
  callout: {
    width: 200,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontWeight: 'bold', marginBottom: 4 },
  description: { marginBottom: 8 },
  button: { alignSelf: 'flex-end', paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#007AFF', borderRadius: 6 },
  buttonText: { color: 'white' },
});