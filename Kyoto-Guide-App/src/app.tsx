/**
 * app.tsx
 *
 * アプリのエントリーポイント & ナビゲーション設定
 */
import React from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Spot } from './types/spot';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import MapScreen from './screens/map-screen';
import SettingsScreen from './screens/settings-screen';
import '../global.css';

export type RootStackParamList = {
  Home:
    | {
        categories: string[];
        lat: number;
        lng: number;
      }
    | undefined;
  Detail: { spot: Spot };
  Search: undefined;
  Map: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator
          initialRouteName="Search"
          screenOptions={{
            headerStyle: { backgroundColor: '#8E354A' }, // 京都らしい伝統色（京緋色風）
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen 
            name="Search" 
            component={SearchScreen} 
            options={({ navigation }) => ({
              title: 'スポットを探す',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>設定</Text>
                </TouchableOpacity>
              ),
            })} 
          />
          <Stack.Screen 
            name="Map" 
            component={MapScreen} 
            options={({ navigation }) => ({
              title: '地図',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>設定</Text>
                </TouchableOpacity>
              ),
            })} 
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ title: '設定' }} 
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={({ navigation }) => ({
              title: '検索結果',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>設定</Text>
                </TouchableOpacity>
              ),
            })} 
          />
          <Stack.Screen 
            name="Detail" 
            component={DetailScreen} 
            options={({ route, navigation }) => ({
              title: route.params.spot.name,
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>設定</Text>
                </TouchableOpacity>
              ),
            })} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
