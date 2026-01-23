/**
 * app-navigator.tsx
 *
 * 画面遷移を管理するファイル
 * - MapScreen / SettingsScreen などの登録
 * - 各 Screen の中身には立ち入らない
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/map-screen';
import SettingsScreen from '../screens/settings-screen';
import SearchScreen from '../screens/search-screen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Settings"
				screenOptions={{ gestureEnabled: true}}
			>
				<Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
				<Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}