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
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AudioTriggerPlayer } from '../services/audio-trigger';
import * as State from '../services/audio-trigger/state';


export default function SettingsScreen() {
    const navigation = useNavigation();
    const [saving, setSaving] = useState(false);

    const onResetHistory = () => {
        State.resetPlayed();
    };

    return (
        <ScrollView className="flex-1 bg-white px-4 py-6">
            {/* debug: link all screens */}
            <View className="flex-row justify-between mb-6">
                <TouchableOpacity onPress={() => navigation.navigate('Search' as never)}>
                    <Text className="text-blue-500">Go to Search Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Map' as never)}>
                    <Text className="text-blue-500">Go to Map Screen</Text>
                </TouchableOpacity>
            </View>

            <View className="mb-6">
                <TouchableOpacity className="bg-red-500 py-3 rounded" onPress={onResetHistory}>
                    <Text className="text-white text-center">再生履歴をリセット</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
