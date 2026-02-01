import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Spot } from '../types/spot';
import { RootStackParamList } from '../app';
import { resolveImageSource } from '../services/image-loader';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export const DetailScreen = ({ route }: { route: DetailScreenRouteProp }) => {
  const { spot } = route.params;

  // ローカル画像またはURLから画像ソースを取得
  const imageSource = resolveImageSource((spot as any)['thumbnail-img'] || spot.thumbnailImg);

  return (
    <ScrollView style={styles.container}>
      <Image source={imageSource} style={styles.detailImage} />
      <View style={styles.detailContent}>
        <Text style={styles.detailTitle}>{spot.name}</Text>
        <Text style={styles.detailLocation}>📍 {spot.address}</Text>

        {/* カテゴリ表示 */}
        <View style={styles.categoriesContainer}>
          {(spot as any).category?.map((cat: string, index: number) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </View>

        <View style={styles.separator} />
        
        <Text style={styles.sectionTitle}>概要</Text>
        <Text style={styles.detailDescription}>{spot.description}</Text>

        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>詳細情報</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>営業時間</Text>
          <Text style={styles.infoValue}>{(spot as any).opening_hours || '不明'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>料金</Text>
          <Text style={styles.infoValue}>{(spot as any).entrance_fee || '無料'}</Text>
        </View>

        {/* 関連情報があれば表示 */}
        {(spot as any).references && (spot as any).references.length > 0 && (
          <>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>関連情報</Text>
            {(spot as any).references.map((ref: any, index: number) => {
              const urls = (ref.url || '').replace(/^\[|\]$/g, '').split(',').map((u: string) => u.trim()).filter((u: string) => u.length > 0);
              return (
                <View key={index} style={styles.referenceItem}>
                  <Text style={styles.referenceTitle}>{ref.title}</Text>
                  {urls.map((url: string, i: number) => (
                    <TouchableOpacity key={i} onPress={() => Linking.openURL(url)}>
                      <Text style={styles.linkText}>🔗 {url}</Text>
                    </TouchableOpacity>
                  ))}
                  <Text style={styles.referenceNote}>{ref.note}</Text>
                </View>
              );
            })}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    detailImage: {
      width: '100%',
      height: 250,
      resizeMode: 'cover',
    },
    detailContent: {
      padding: 20,
      backgroundColor: 'white',
      flex: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: -20,
    },
    detailTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    detailLocation: {
      fontSize: 16,
      color: '#8E354A',
      marginBottom: 16,
    },
    separator: {
      height: 1,
      backgroundColor: '#eee',
      marginVertical: 16,
    },
    detailDescription: {
      fontSize: 16,
      lineHeight: 24,
      color: '#444',
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    categoryTag: {
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      marginRight: 8,
      marginBottom: 8,
    },
    categoryText: {
      fontSize: 12,
      color: '#555',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    infoLabel: {
      fontWeight: 'bold',
      width: 80,
      color: '#555',
    },
    infoValue: {
      flex: 1,
      color: '#333',
    },
    referenceItem: {
      marginBottom: 10,
    },
    referenceTitle: {
      fontSize: 14,
      color: '#333',
      fontWeight: '500',
      marginBottom: 4,
    },
    linkText: {
      fontSize: 14,
      color: '#007AFF',
      textDecorationLine: 'underline',
      marginBottom: 4,
    },
    referenceNote: {
      fontSize: 12,
      color: '#888',
    },
});

export default DetailScreen;
