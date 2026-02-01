
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// Note: You might need to create a type for the navigation prop
// if you're using TypeScript with specific stack navigators.

// Import hooks and services from the existing native app structure
import * as Location from 'expo-location';
import { RootStackParamList } from '../app';

// Import images - paths need to be relative to this file's location
const attractions = require('../../assets/images/attractions.png');
const book4 = require('../../assets/images/book_4.png');
const forest = require('../../assets/images/forest.png');
const forkSpoon = require('../../assets/images/fork_spoon.png');
const searchIcon = require('../../assets/images/search.png');
const shoppingCart = require('../../assets/images/shopping_cart.png');
const starShine = require('../../assets/images/star_shine.png');

const categories = [
    { id: "グルメ", icon: forkSpoon, label: "グルメ・カフェ" },
    { id: "自然", icon: forest, label: "自然・公園" },
    { id: "歴史を感じられる", icon: book4, label: "歴史・文化" },
    { id: "ショッピング", icon: shoppingCart, label: "ショッピング" },
    { id: "体験", icon: attractions, label: "体験" },
    { id: "その他", icon: starShine, label: "その他" },
];

export function SearchScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Search'>>();
    const [currentAddress, setCurrentAddress] = useState<string>("現在地を取得中...");
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const geocodingAttempted = React.useRef(false);
    const addressCache = React.useRef<Map<string, string>>(new Map()); // リバースジオコーディングキャッシュ

    useEffect(() => {
        if (geocodingAttempted.current) {
            return;
        }
        geocodingAttempted.current = true;

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setCurrentAddress('位置情報の権限がありません');
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setCoords({ latitude, longitude });

                // キャッシュキーを生成（小数点2桁で丸める）
                const cacheKey = `${latitude.toFixed(2)},${longitude.toFixed(2)}`;
                
                // キャッシュから取得
                if (addressCache.current.has(cacheKey)) {
                    setCurrentAddress(addressCache.current.get(cacheKey)!);
                    return;
                }

                try {
                    let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
                    if (addressResponse.length > 0) {
                        const { city, region } = addressResponse[0];
                        const address = `${city ?? region ?? '不明な地域'}周辺`;
                        setCurrentAddress(address);
                        // キャッシュに保存
                        addressCache.current.set(cacheKey, address);
                    } else {
                        setCurrentAddress('住所が取得できませんでした');
                    }
                } catch (geoError) {
                    console.warn("Geocoding failed (likely rate limit):", geoError);
                    setCurrentAddress("現在地");
                }
            } catch (error) {
                console.error("Location error", error);
                setCurrentAddress("位置情報の取得に失敗しました");
            }
        })();
    }, []);
    
    const handleSearch = () => {
        if (coords) {
            navigation.navigate('Home', {
                categories: selectedCategories,
                lat: coords.latitude,
                lng: coords.longitude,
            });
        } else {
            console.log("Cannot search without coordinates");
        }
    };

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>京都穴場探訪</Text>
            </View>

            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>現在地：{currentAddress}</Text>
            </View>

            <View style={styles.categoryGrid}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            selectedCategories.includes(category.id) && styles.categoryButtonSelected
                        ]}
                        onPress={() => toggleCategory(category.id)}
                    >
                        <Image source={category.icon} style={styles.categoryIcon} />
                        <Text style={[
                            styles.categoryLabel,
                            selectedCategories.includes(category.id) && styles.categoryLabelSelected
                        ]}>
                            {category.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Image source={searchIcon} style={styles.searchButtonIcon} />
                <Text style={styles.searchButtonText}>検索</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f1',
    },
    header: {
        height: 100,
        backgroundColor: '#e94709',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    locationContainer: {
        margin: 20,
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#8f2e14',
        borderRadius: 5,
        alignItems: 'center',
    },
    locationText: {
        fontSize: 18,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
    categoryButton: {
        width: '45%',
        height: 150,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#8f2e14',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    categoryButtonSelected: {
        backgroundColor: '#a3a3a2',
    },
    categoryIcon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    categoryLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    categoryLabelSelected: {
        color: 'white',
    },
    searchButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#8f2e14',
        borderRadius: 10,
        margin: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
    },
    searchButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default SearchScreen;
