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
  return (
    <Marker
      key={spot.name}
      coordinate={{ latitude: spot.location.latitude, longitude: spot.location.longitude }}
      title={spot.name}
      description={spot.description}
    >
      <Callout tooltip onPress={() => onPress && onPress(spot)}>
        <View style={styles.callout}>
          <Text style={styles.title}>{spot.name}</Text>
          <Text style={styles.description}>{spot.description}</Text>
          <TouchableOpacity style={styles.button} onPress={() => onPress && onPress(spot)}>
            <Text style={styles.buttonText}>詳細</Text>
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
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