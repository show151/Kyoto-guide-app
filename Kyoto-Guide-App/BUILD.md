# 京都ガイドアプリ - ビルドガイド

## スタンドアロンアプリのビルド方法（PCサーバー不要）

### 初回セットアップ

1. **EAS CLIをインストール**
```bash
npm install -g eas-cli
```

2. **Expoアカウントでログイン**
```bash
eas login
```

3. **プロジェクトIDを取得**
```bash
eas build:configure
```
   - プロジェクトIDが自動的に app.json に追加されます

### ビルドコマンド

#### Android用APKビルド（推奨）
```bash
npm run build:android
```
または
```bash
eas build --platform android --profile production
```

- ビルド完了後、APKファイルのダウンロードリンクが表示されます
- Androidデバイスに直接インストール可能
- **京都の現地でPCなしで動作します**

#### iOS用ビルド
```bash
npm run build:ios
```
または
```bash
eas build --platform ios --profile production
```

- TestFlightまたはAd-hoc配布が必要
- Apple Developer Programアカウントが必要（年間$99）

#### プレビュービルド（テスト用）
```bash
npm run build:preview
```

- 両プラットフォームを同時にビルド
- 配布前のテストに最適

### ビルド後の使い方

1. **Androidの場合**
   - ビルド完了後、EASダッシュボードからAPKをダウンロード
   - APKファイルをAndroidデバイスに転送
   - インストールして実行
   - **インターネット接続不要（GPSは必要）**

2. **iOSの場合**
   - TestFlightを使用
   - または開発用証明書でAd-hoc配布

### 開発ビルド（デバッグ用）
```bash
npm run build:dev
```

- Hot Reloadが可能
- デバイスにインストール後、`npx expo start --dev-client` で開発サーバーに接続
- テスト段階で便利

## ビルドプロファイル

### production
- 本番用
- 最適化済み
- App Store / Google Play配信可能

### preview
- テスト用
- APK形式で配布可能
- ストア申請前の確認に最適

### development
- 開発用
- Hot Reload対応
- デバッグ機能有効

## 注意事項

- 初回ビルドは15-30分程度かかります
- Expoの無料プランで月30ビルドまで可能
- ビルドはクラウドで実行されるため、Xcode/Android Studioは不要
