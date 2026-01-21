/**
 * spot.ts
 *
 * スポットデータの型定義
 * - JSON と 1対1 対応
 * - 変更する場合は必ず相談
 */

export type Spot = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  address: string;
  category: string[];
  tags: string[];
  radius: number;
  openingHours?: string;
  entranceFee?: string;
  images?: string[];
};
