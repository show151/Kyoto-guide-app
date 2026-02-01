/**
 * audio-trigger/index.ts
 *
 * 音声トリガー機能の外部公開用インターフェース
 *
 * 役割:
 * - Screen や他サービスから呼ばれる唯一の入口
 * - trigger / player / state をまとめて扱う
 *
 * 方針:
 * - Screen 側は内部構造を知らなくてよい
 * - 「呼ぶだけ」で音声トリガーが動く設計
 *
 * 注意:
 * - 実装ロジックは書かない
 * - export のみを行う
 *
 * 例:
 * - checkAndPlay(currentLocation, spots)
 */

export { useAudioPlayback } from './trigger';
export { playAudio } from './player';
export { hasPlayed, markPlayed, resetPlayed, getPlayedCount } from './state';