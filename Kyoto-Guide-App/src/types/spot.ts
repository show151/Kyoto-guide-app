/**
 * spot.ts
 *
 * スポットデータの型定義
 * - JSON と 1対1 対応
 * - 変更する場合は必ず相談
 */

export type Spot = {
  id?: string; // frontendからの移植：一意な識別子
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
  opening_hours?: string;
  entrance_fee?: string;
  images?: string[];
  thumbnailImg?: string; // frontendからの移植：サムネイル画像
  'thumbnail-img'?: string;
  url?: string; // frontendからの移植：公式サイトなどのURL
  audioFile?: string;
  references?: {
    title: string;
    url: string;
    author: string;
    year: string;
    note: string;
  }[];
};
