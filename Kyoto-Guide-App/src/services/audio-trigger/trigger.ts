/**
 * trigger.ts
 *
 * 音声再生の判定ロジック
 * - 現在地とスポット情報から再生条件を判断
 * - 再生そのものは player.ts に任せる
 */
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { Spot } from '../../types/spot';
import { calculateDistance } from '../distance';
import { playAudio } from './player';
import { hasPlayed, markPlayed } from './state';


export function useAudioPlayback(currentLocation: Location.LocationObject | null, spots: Spot[], distanceThreshold: number) {
  useEffect(() => {
    if (!currentLocation) return;
    
    // オーディオ処理は最初の20件のスポットだけに限定して軽量化
    const limitedSpots = spots.slice(0, 20);
    
    limitedSpots.forEach(spot => {
      try {
        // production Spot 型は location: { latitude, longitude }
        const lat = (spot as any).location?.latitude ?? (spot as any).lat;
        const lng = (spot as any).location?.longitude ?? (spot as any).lng;
        if (typeof lat !== 'number' || typeof lng !== 'number') return;

        const distance = calculateDistance(
          currentLocation.coords,
          { latitude: lat, longitude: lng }
        );
        const effectiveRadius = typeof spot.radius === 'number' ? spot.radius : distanceThreshold;
        if (distance <= effectiveRadius) {
          const audioFile = (spot as any).audioFile;
          if (audioFile && !hasPlayed(spot.name)) {
            // 再生処理は player に移譲予定。とりあえずログ出力。
            console.log(`Playing audio for spot: ${spot.name} (${audioFile})`);
            void playAudio(audioFile);
            markPlayed(spot.name);
          }
        }
      } catch (error) {
        console.error('Error in audio playback:', error);
      }
    });
  }, [currentLocation, spots, distanceThreshold]);
}
