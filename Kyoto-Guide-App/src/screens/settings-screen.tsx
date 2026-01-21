/**
 * settings-screen.tsx
 *
 * 設定画面
 * - 音声ON/OFF
 * - 再生履歴リセット など
 *
 * 注意:
 * - 設定値の保存は services/storage.ts を使用
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings</Text>
			<Text>設定画面 (未実装)</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
});
