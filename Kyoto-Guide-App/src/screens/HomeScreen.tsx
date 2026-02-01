import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { getAllSpots } from '../services/spots';
import { Spot } from '../types/spot';
import { RootStackParamList } from '../app';
import MapViewComponent from '../components/map/MapView';
import { useLocation } from '../hooks/use-location';
import { calculateDistance } from '../services/distance';
import { resolveImageSource } from '../services/image-loader';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation, route }: { navigation: HomeScreenNavigationProp, route: HomeScreenRouteProp }) => {
  const spots = getAllSpots();
  const { categories } = route.params || {};
  const { currentLocation } = useLocation();

  // Filter spots based on selected categories
  const displayedSpots = useMemo(() => {
    if (!categories || categories.length === 0) {
      return spots;
    }
    return spots.filter(spot => 
      spot.category && spot.category.some(cat => categories.includes(cat))
    );
  }, [spots, categories]);

  const sortedSpots = useMemo(() => {
    if (!currentLocation) return displayedSpots;

    return [...displayedSpots].sort((a, b) => {
      const distanceA = calculateDistance(currentLocation.coords, a.location);
      const distanceB = calculateDistance(currentLocation.coords, b.location);
      return distanceA - distanceB;
    });
  }, [displayedSpots, currentLocation]);

  const renderItem = ({ item }: { item: Spot }) => {
    // ローカル画像またはURLから画像ソースを取得
    const imageSource = resolveImageSource((item as any)['thumbnail-img'] || item.thumbnailImg);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { spot: item })}
        activeOpacity={0.9}
      >
        <Image source={imageSource} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardLocation} numberOfLines={1}>📍 {item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapViewComponent spots={sortedSpots} />
      </View>
      <FlatList
        data={sortedSpots}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name || String(index)} // Use name or index as key since id is missing
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    mapContainer: {
      height: 220,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderColor: '#e0e0e0',
    },
    listContent: {
      padding: 16,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardImage: {
      width: '100%',
      height: 180,
      resizeMode: 'cover',
    },
    cardContent: {
      padding: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
    },
    cardLocation: {
      fontSize: 14,
      color: '#666',
    },
});

export default HomeScreen;
