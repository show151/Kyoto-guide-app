/**
 * location.ts
 *
 * 位置情報に関する型定義
 * - expo-location や react-native-maps から取得した値を
 *   アプリ内で統一した形で扱うための型
 *
 * 目的:
 * - 緯度・経度の表現を1つに統一する
 * - distance.ts や audio-trigger で安全に使えるようにする
 *
 * 注意:
 * - UIロジックや取得処理は書かない
 * - 型定義のみを行う
 */