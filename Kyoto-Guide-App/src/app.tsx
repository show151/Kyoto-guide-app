/**
 * app.tsx
 *
 * アプリのエントリーポイント
 * - Navigation を読み込むだけ
 * - ビジネスロジックは書かない
 * - 状態管理も基本的に書かない
 */
import React from 'react';
import AppNavigator from './navigation/app-navigator';

export default function App() {
	return <AppNavigator />;
}
