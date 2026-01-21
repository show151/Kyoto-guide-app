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
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const attractions = require("../../assets/images/attractions.png");
const book4 = require("../../assets/images/book_4.png");
const forest = require("../../assets/images/forest.png");
const forkSpoon = require("../../assets/images/fork_spoon.png");
const searchIcon = require("../../assets/images/search.png");
const shoppingCart = require("../../assets/images/shopping_cart.png");
const starShine = require("../../assets/images/star_shine.png");

export default function Settings(){
    const categories = [
        {
            id: 1,
            icon: forkSpoon,
            label: "グルメ・カフェ",
            alt: "Fork spoon",
        },
        {
            id: 2,
            icon: forest,
            label: "自然・公園",
            alt: "Forest",
        },
        {
            id: 3,
            icon: book4,
            label: "歴史・文化",
            alt: "Book",
        },
        {
            id: 4,
            icon: shoppingCart,
            label: "ショッピング",
            alt: "Shopping cart",
        },
        {
            id: 5,
            icon: attractions,
            label: "体験",
            alt: "Attractions",
        },
        {
            id: 6,
            icon: starShine,
            label: "その他",
            alt: "Star shine",
        },
    ];

    const navigation = useNavigation<any>();

    return (
        <ScrollView className="bg-[#f9f7f1] flex-1 p-4">
            <View className="h-[250px] bg-[#8b5e3c] justify-center items-center mb-4">
                <Text className="text-white text-[64px] font-normal text-center">
                    アプリ名
                </Text>
            </View>

            <View className="bg-white border border-[#c84c24] p-4 mb-4" accessible accessibilityLabel="現在地情報">
                <Text className="text-black text-[32px] text-center mb-2">
                    現在地：〇〇
                </Text>
                <Text className="text-black text-[32px] text-center">
                    説明文
                </Text>
            </View>

            <View className="flex-col gap-4" accessible accessibilityLabel="カテゴリー">
                <View className="flex-row gap-4 justify-center">
                    {categories.slice(0, 2).map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            className="flex-1 h-[250px] flex-col gap-4 bg-stone-50 border border-[#c84c24] items-center justify-center"
                            accessible
                            accessibilityLabel={category.label}
                            onPress={() => navigation.navigate('Map')}
                        >
                            <Image
                                source={category.icon}
                                className="w-40 h-40"
                                resizeMode="contain"
                            />
                            <Text className="text-black text-[40px] text-center">
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row gap-4 justify-center">
                    {categories.slice(2, 4).map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            className="flex-1 h-[250px] flex-col gap-4 bg-white border border-[#c84c24] items-center justify-center"
                            accessible
                            accessibilityLabel={category.label}
                            onPress={() => navigation.navigate('Map')}
                        >
                            <Image
                                source={category.icon}
                                className="w-40 h-40"
                                resizeMode="contain"
                            />
                            <Text className="text-black text-[40px] text-center">
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row gap-4 justify-center">
                    {categories.slice(4, 6).map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            className="flex-1 h-[250px] flex-col gap-4 bg-white border border-[#c84c24] items-center justify-center"
                            accessible
                            accessibilityLabel={category.label}
                            onPress={() => navigation.navigate('Map')}
                        >
                            <Image
                                source={category.icon}
                                className="w-40 h-40"
                                resizeMode="contain"
                            />
                            <Text className="text-black text-[40px] text-center">
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity
                className="h-40 bg-white border border-[#c84c24] items-center justify-center mt-4"
                accessible
                accessibilityLabel="検索"
                onPress={() => navigation.navigate('Map')}
            >
                <View className="flex-row items-center">
                    <Image
                        source={searchIcon}
                        className="w-[82px] h-[82px] mr-4"
                        resizeMode="contain"
                    />
                    <Text className="text-black text-[64px]">
                        検索
                    </Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}
