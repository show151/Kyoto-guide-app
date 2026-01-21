/**
 * map-screen.tsx
 *
 * 地図画面
 * - 現在地の取得（use-location）
 * - react-native-maps の表示
 * - spot-marker を使ったピン表示
 *
 * 注意:
 * - データ取得は services/spots.ts 経由のみ
 * - 距離計算は services/distance.ts を使用
 * - 音声トリガーは audio-trigger を呼ぶだけ
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapViewComponent from '../components/map/MapView';
import { getAllSpots } from '../services/spots';

export default function MapScreen() {
	const spots = getAllSpots();

	return (
		<View style={styles.container}>
			<MapViewComponent spots={spots} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
});