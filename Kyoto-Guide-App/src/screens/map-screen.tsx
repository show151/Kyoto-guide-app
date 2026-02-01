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
import { ScrollView, Text, View, StyleSheet } from "react-native";
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
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    アプリ名
                </Text>
            </View>

            <View style={styles.mapContainer}>
                <MapViewComponent spots={getAllSpots()} />
            </View>

            {locationItems.map((item, index) => (
                <View
                    key={item.id}
                    style={[styles.itemWrapper, index === 0 ? styles.itemWrapperFirst : null]}
                >
                    <View
                        style={[styles.itemCard, index === 0 ? styles.itemCardAlt : styles.itemCardDefault]}
                    >
                        <Text style={styles.itemTitle}>
                            {item.name}
                        </Text>

                        <Text style={styles.itemDistance}>
                            {item.distance}
                        </Text>

                        <View style={styles.itemImage}>
                            <Text style={styles.itemImageText}>
                                image
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f1',
        padding: 16,
    },
    header: {
        height: 250,
        backgroundColor: '#8b5e3c',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        color: 'white',
        fontSize: 64,
        fontWeight: '400',
        textAlign: 'center',
    },
    mapContainer: {
        height: 166,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#c84c24',
        marginBottom: 16,
    },
    itemWrapper: {
        flex: 1,
        marginTop: 8,
    },
    itemWrapperFirst: {
        marginTop: 16,
    },
    itemCard: {
        height: 166,
        borderWidth: 1,
        borderColor: '#c84c24',
        position: 'relative',
    },
    itemCardAlt: {
        backgroundColor: '#f5f5f4',
    },
    itemCardDefault: {
        backgroundColor: 'white',
    },
    itemTitle: {
        position: 'absolute',
        top: 0,
        left: 166,
        width: 200,
        height: 102,
        color: 'black',
        fontSize: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    itemDistance: {
        position: 'absolute',
        top: 102,
        left: 166,
        width: 200,
        height: 67,
        color: '#6b6b6b',
        fontSize: 26,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    itemImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 166,
        height: 166,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImageText: {
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
    },
});
