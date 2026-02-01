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

const MAX_LIST_SPOTS = 60;
const MAX_MAP_SPOTS = 15;

export const HomeScreen = ({ navigation, route }: { navigation: HomeScreenNavigationProp, route: HomeScreenRouteProp }) => {
  const spots = getAllSpots();
  const { categories, lat, lng } = route.params || {};
  const { currentLocation } = useLocation();

  // Use route params if available (from SearchScreen), otherwise use currentLocation
  const searchLocation = lat && lng ? { coords: { latitude: lat, longitude: lng } } : currentLocation;

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
    if (!searchLocation) return displayedSpots;

    return [...displayedSpots].sort((a, b) => {
      try {
        // スポットにlocationプロパティがあるか確認
        if (!a.location || !b.location) {
          console.warn('Spot missing location property:', a.name, b.name);
          return 0;
        }
        
        const distanceA = calculateDistance(searchLocation.coords, a.location);
        const distanceB = calculateDistance(searchLocation.coords, b.location);
        return distanceA - distanceB;
      } catch (error) {
        console.error('Error calculating distance:', error);
        return 0;
      }
    });
  }, [displayedSpots, searchLocation]);

  const listSpots = useMemo(() => {
    if (sortedSpots.length <= MAX_LIST_SPOTS) return sortedSpots;
    return sortedSpots.slice(0, MAX_LIST_SPOTS);
  }, [sortedSpots]);

  const mapSpots = useMemo(() => {
    if (sortedSpots.length <= MAX_MAP_SPOTS) return sortedSpots;
    return sortedSpots.slice(0, MAX_MAP_SPOTS);
  }, [sortedSpots]);

  const renderItem = ({ item }: { item: Spot }) => {
    try {
      // ローカル画像またはURLから画像ソースを取得
      const imageSource = resolveImageSource((item as any)['thumbnail-img'] || item.thumbnailImg);

      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Detail', { spot: item })}
          activeOpacity={0.9}
        >
          <Image 
            source={imageSource} 
            style={styles.cardImage}
            onError={(error) => console.warn('Image load error:', item.name, error)}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardLocation} numberOfLines={1}>📍 {item.address}</Text>
          </View>
        </TouchableOpacity>
      );
    } catch (error) {
      console.error('Error rendering spot item:', item.name, error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapViewComponent spots={mapSpots} />
      </View>
      <FlatList
        data={listSpots}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name || String(index)} // Use name or index as key since id is missing
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews
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
