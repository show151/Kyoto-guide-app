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