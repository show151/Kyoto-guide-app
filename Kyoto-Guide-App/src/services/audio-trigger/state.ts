/**
 * state.ts
 *
 * 音声再生状態の管理
 * - すでに再生済みかどうか
 * - 再生中フラグなど
 */

const playedSpotNames = new Set<string>();

export const hasPlayed = (spotName: string): boolean => {
	return playedSpotNames.has(spotName);
};

export const markPlayed = (spotName: string): void => {
	playedSpotNames.add(spotName);
};

export const resetPlayed = (): void => {
	playedSpotNames.clear();
};

export const getPlayedCount = (): number => {
	return playedSpotNames.size;
};