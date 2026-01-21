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
import React from 'react';
import MapViewComponent from '../components/map/MapView';
import { ScrollView, Text, View } from "react-native";
import { getAllSpots } from '../services/spots';

interface LocationItem {
    id: number;
    name: string;
    distance: string;
}

export default function Result() {
    const locationItems: LocationItem[] = [
        { id: 1, name: "〇〇商店", distance: "現在地から：〇〇m" },
        { id: 2, name: "〇〇神社", distance: "現在地から：〇〇m" },
        { id: 3, name: "〇〇寺", distance: "現在地から：〇〇m" },
        { id: 4, name: "〇〇公園", distance: "現在地から：〇〇m" },
        { id: 5, name: "〇〇公園", distance: "現在地から：〇〇m" },
    ];

    return (
        <ScrollView className="bg-[#f9f7f1] flex-1 flex-col p-4">
            <View className="h-[250px] bg-[#8b5e3c] justify-center items-center mb-4">
                <Text className="text-white text-[64px] font-normal text-center">
                    アプリ名
                </Text>
            </View>

            <View className="h-[166px] bg-white border border-[#c84c24] mb-4" >    
            <MapViewComponent spots={getAllSpots()} />
            </View>

            {locationItems.map((item, index) => (
                <View
                    key={item.id}
                    className={`${index === 0 ? "mt-4" : "mt-2"} flex-1`}
                >
                    <View
                        className={`h-[166px] relative ${index === 0 ? "bg-stone-50" : "bg-white"} border border-[#c84c24]`}
                    >
                        <Text className="absolute top-0 left-[166px] w-[200px] h-[102px] text-black text-[40px] text-center justify-center items-center">
                            {item.name}
                        </Text>

                        <Text className="absolute top-[102px] left-[166px] w-[200px] h-[67px] text-[#6b6b6b] text-[26px] text-center justify-center items-center">
                            {item.distance}
                        </Text>

                        <View className="absolute top-0 left-0 w-[166px] h-[166px] bg-[#00000080] justify-center items-center">
                            <Text className="text-white text-[32px] text-center">
                                image
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}
