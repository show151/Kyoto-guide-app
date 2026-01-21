/**
 * use-location.ts
 *
 * 現在地取得用カスタムフック
 * - location.ts を内部で使用
 * - Screen 側をシンプルに保つ
 */
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Region } from 'react-native-maps';

export function useLocation() {
	const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
	const [region, setRegion] = useState<Region>({
		latitude: 35.645736,
		longitude: 139.747575,
		latitudeDelta: 0.03,
		longitudeDelta: 0.03,
	});

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Permission to access location was denied');
				return;
			}

			// 継続追跡を開始
			const subscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 5000, // 5秒ごとに更新
					distanceInterval: 10, // 10m移動ごとに更新
				},
				(location) => {
					setCurrentLocation(location);
				}
			);

			// 初回位置を取得してregionを設定
			let initialLocation = await Location.getCurrentPositionAsync({});
			setCurrentLocation(initialLocation);
			setRegion({
				latitude: initialLocation.coords.latitude,
				longitude: initialLocation.coords.longitude,
				latitudeDelta: 0.03,
				longitudeDelta: 0.03,
			});

			// クリーンアップ
			return () => subscription.remove();
		})();
	}, []);

	return { currentLocation, region, setRegion };
}