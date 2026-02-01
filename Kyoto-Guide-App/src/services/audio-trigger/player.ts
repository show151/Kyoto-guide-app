/**
 * player.ts
 *
 * 音声再生処理
 * - expo-audio を使用
 * - trigger.ts から呼ばれる
 */
import { createAudioPlayer, AudioPlayer } from 'expo-audio';

let currentPlayer: AudioPlayer | null = null;

const audioAssetMap: Record<string, number> = {
	'voice1-01.m4a': require('../../../assets/audio/voice1-01.m4a'),
	'voice1-02.m4a': require('../../../assets/audio/voice1-02.m4a'),
	'voice1-03.m4a': require('../../../assets/audio/voice1-03.m4a'),
	'voice1-04.m4a': require('../../../assets/audio/voice1-04.m4a'),
	'voice1-05.m4a': require('../../../assets/audio/voice1-05.m4a'),
	'voice1-06.m4a': require('../../../assets/audio/voice1-06.m4a'),
	'voice1-07.m4a': require('../../../assets/audio/voice1-07.m4a'),
	'voice1-08.m4a': require('../../../assets/audio/voice1-08.m4a'),
	'voice1-09.m4a': require('../../../assets/audio/voice1-09.m4a'),
	'voice1-10.m4a': require('../../../assets/audio/voice1-10.m4a'),
	'voice1-11.m4a': require('../../../assets/audio/voice1-11.m4a'),
	'voice1-12.m4a': require('../../../assets/audio/voice1-12.m4a'),
	'voice1-13.m4a': require('../../../assets/audio/voice1-13.m4a'),
};

export async function playAudio(uri: string): Promise<void> {
	if (!uri) return;
	try {
		if (currentPlayer) {
			currentPlayer.remove();
			currentPlayer = null;
		}

		const source = audioAssetMap[uri] ?? { uri };
		currentPlayer = createAudioPlayer(source);
		currentPlayer.play();
	} catch (error) {
		console.warn('Failed to play audio', error);
	}
}