/**
 * distance.ts
 *
 * 距離計算ロジック
 * - 緯度・経度から距離を計算する
 * - UIや音声処理は行わない
 *
 * 例:
 * - calculateDistance(from, to): number
 */


export function calculateDistance(from: { latitude: number; longitude: number }, to: { latitude: number; longitude: number }): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = (to.latitude - from.latitude) * Math.PI / 180;
  const dLon = (to.longitude - from.longitude) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(from.latitude * Math.PI / 180) * Math.cos(to.latitude * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
