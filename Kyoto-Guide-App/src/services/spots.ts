/**
 * spots.ts
 *
 * スポットデータ取得専用サービス
 * - JSONを直接importするのは禁止
 * - 全員このファイル経由でスポットデータを使う
 */

import spotsData from '../../assets/data/spots.json';
import { Spot } from '../types/spot';

/**
 * 全スポットを取得する
 */
export const getAllSpots = (): Spot[] => {
  return spotsData as Spot[];
};

/**
 * 名前でスポットを取得する（任意）
 */
export const getSpotByName = (name: string): Spot | undefined => {
  return getAllSpots().find((spot) => spot.name === name);
};
