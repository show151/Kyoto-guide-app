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
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resetPlayed } from '../services/audio-trigger/state';
import { RootStackParamList } from '../app';


export default function SettingsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Settings'>>();
    const [saving, setSaving] = useState(false);

    const onResetHistory = () => {
        resetPlayed();
    };

    return (
        <ScrollView style={styles.container}>
            {/* debug: link all screens */}
            <View style={styles.section}>
                <TouchableOpacity style={styles.resetButton} onPress={onResetHistory}>
                    <Text style={styles.resetButtonText}>再生履歴をリセット</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    section: {
        marginBottom: 24,
    },
    resetButton: {
        backgroundColor: '#ef4444',
        paddingVertical: 12,
        borderRadius: 8,
    },
    resetButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});
