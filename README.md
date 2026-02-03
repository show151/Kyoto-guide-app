# Kyoto Guide App 🏯

京都の観光スポットを音声ガイド付きで巡ることができるモバイルアプリケーションです。

## 概要

このアプリは、京都駅周辺の観光スポットを、位置情報と連動した音声ガイドで案内するReact Nativeアプリです。ユーザーが特定のスポットに近づくと、自動的に音声による説明が再生されます。

**対象エリア**: 京都駅周辺（六孫王神社、新熊野神社など）  
**主な用途**: 観光客向けの自動音声ガイドアプリ  
**動作環境**: Android/iOS（オフライン対応）

## 主な機能

### 🔍 スポット検索
- カテゴリー別にスポットを検索
- 現在地からの距離順に表示
- 歴史・自然・グルメなど複数カテゴリーに対応

### 🗺️ マップ表示
- インタラクティブなマップビュー
- スポットの位置をマーカーで表示
- 現在地とスポットの位置関係を視覚的に確認

### 🎧 自動音声ガイド
- スポットに近づくと自動的に音声が再生
- 各スポットごとに専用の音声説明
- 再生済みスポットの管理機能

### 📱 オフライン対応
- ビルド済みAPKでインターネット不要
- 現地でPCサーバーなしで動作
- 位置情報のみで完全動作

### 📍 詳細情報表示
- スポットの詳細説明
- 営業時間・入場料金
- 住所・アクセス情報
- 画像ギャラリー

## 技術スタック

### フレームワーク
- **React Native** (0.81.5)
- **Expo** (~54.0.33)
- **TypeScript** (~5.9.2)

### ナビゲーション
- React Navigation (Native Stack Navigator)

### 主要ライブラリ
- **expo-location**: 位置情報取得
- **expo-audio**: 音声再生
- **react-native-maps**: マップ表示（Google Maps使用）
- **nativewind**: Tailwindベースのスタイリング

### 外部API
- **Google Maps API**: Android向けマップ表示に使用（要APIキー）

### スタイリング
- NativeWind (TailwindCSS for React Native)
- カスタムコンポーネント

## プロジェクト構造

```
Kyoto-Guide-App/
├── src/
│   ├── app.tsx                 # アプリエントリーポイント
│   ├── screens/                # 各画面コンポーネント
│   │   ├── SearchScreen.tsx    # 検索画面（カテゴリー選択）
│   │   ├── HomeScreen.tsx      # ホーム・リスト画面（距離順ソート）
│   │   ├── DetailScreen.tsx    # 詳細画面（スポット情報）
│   │   ├── map-screen.tsx      # マップ画面（全体地図）
│   │   └── settings-screen.tsx # 設定画面
│   ├── components/             # 再利用可能コンポーネント
│   │   └── map/                # マップ関連コンポーネント
│   │       ├── MapView.tsx     # マップビューコンポーネント
│   │       └── spot-marker.tsx # スポットマーカー
│   ├── navigation/             # ナビゲーション設定
│   │   └── app-navigator.tsx   # ルート定義
│   ├── services/               # ビジネスロジック層
│   │   ├── spots.ts            # スポットデータ管理
│   │   ├── distance.ts         # 距離計算（Haversine formula）
│   │   ├── image-loader.ts     # 画像ローディング処理
│   │   └── audio-trigger/      # 音声トリガーシステム
│   │       ├── index.ts        # 公開API（外部インターフェース）
│   │       ├── trigger.ts      # トリガーロジック（位置判定）
│   │       ├── player.ts       # 音声再生機能
│   │       └── state.ts        # 再生状態管理（重複防止）
│   ├── hooks/                  # カスタムフック
│   │   └── use-location.ts     # 位置情報監視フック
│   └── types/                  # TypeScript型定義
│       └── spot.ts             # Spot型定義
├── assets/
│   ├── data/
│   │   └── spots.json          # スポットデータ（JSON）
│   ├── audio/                  # 音声ファイル（.m4a）
│   └── images/                 # 画像ファイル
│       └── spots/              # スポット画像
├── app.json                    # Expo設定
├── package.json                # 依存関係
├── tsconfig.json               # TypeScript設定
└── BUILD.md                    # ビルド手順書

```

## セットアップ

### 必要な環境
- Node.js (LTS版推奨)
- npm または yarn
- Expo CLI
- **Google Maps API キー**（Android用マップ表示に必要）

### Google Maps API の設定

このアプリは `react-native-maps` を使用してマップを表示しますが、Android では Google Maps API キーが必要です。

1. **Google Cloud Console でAPIキーを取得**
   - [Google Cloud Console](https://console.cloud.google.com/) にアクセス
   - 新しいプロジェクトを作成または既存のプロジェクトを選択
   - 「APIとサービス」→「認証情報」からAPIキーを作成
   - 「Maps SDK for Android」を有効化

2. **環境変数ファイルを作成**
   
   プロジェクトルートに `.env.local` ファイルを作成し、取得したAPIキーを記載：
   
   ```bash
   API_KEY="YOUR_GOOGLE_MAPS_API_KEY_HERE"
   ```

   ⚠️ **注意**: `.env.local` は `.gitignore` に含まれているため、Gitにコミットされません。

3. **app.config.js での設定**
   
   `app.config.js` で環境変数からAPIキーを読み込む設定が既に含まれています：
   
   ```javascript
   android: {
     config: {
       googleMaps: {
         apiKey: process.env.GOOGLE_MAPS_API_KEY,
       },
     },
   },
   ```

### インストール

```bash
cd Kyoto-Guide-App
npm install
```

### 開発サーバーの起動

```bash
npm start
```

Expo Goアプリまたはエミュレーターで実行できます。

### プラットフォーム別起動

```bash
# Android
npm run android

# iOS
npm run ios
```

## ビルド（スタンドアロンアプリ）

詳細は [BUILD.md](Kyoto-Guide-App/BUILD.md) を参照してください。

### Android APKビルド

```bash
npm run build:android
```

このコマンドでスタンドアロンAPKが生成され、PCサーバーなしで動作します。

## アプリの使い方

1. **検索画面**: アプリ起動時、カテゴリーを選択してスポットを検索
2. **ホーム画面**: 現在地から近い順にスポットが表示されます
3. **マップビュー**: タブでマップ表示に切り替え可能
4. **詳細画面**: スポットをタップすると詳細情報を表示
5. **自動音声**: スポットに近づくと自動的に音声ガイドが再生されます

## 音声トリガーシステム

位置情報に基づいて自動的に音声を再生するシステムを搭載：

- スポットの設定範囲（radius）内に入ると自動再生
- 同じスポットは一度だけ再生（重複防止）
- バックグラウンド処理で位置情報を監視
- 再生状態の永続化

## データ構造

スポット情報は JSON 形式で管理されています：

```json
{
  "name": "スポット名",
  "location": {
    "latitude": 34.98528,
    "longitude": 135.74489
  },
  "description": "説明文",
  "address": "住所",
  "category": ["歴史を感じられる", "自然"],
  "radius": 50,
  "opening_hours": "営業時間",
  "entrance_fee": "入場料",
  "thumbnail-img": "画像ファイル名",
  "audioFile": "音声ファイル名"
}
```

## ライセンス

Private

## 開発者向けメモ

- スポットデータ: `assets/data/spots.json`
- 音声ファイル: `assets/audio/`
- 画像ファイル: `assets/images/spots/`
- 型定義変更時は `src/types/spot.ts` を必ず確認
- **APIキー管理**: `.env.local` ファイルは Git にコミットしないこと
- Google Maps API の使用には課金が発生する可能性があります（無料枠あり）

### トラブルシューティング

**マップが表示されない場合**
1. `.env.local` に正しいAPIキーが設定されているか確認
2. Google Cloud Console で「Maps SDK for Android」が有効化されているか確認
3. APIキーに適切な制限が設定されているか確認（開発中は制限なしでテスト推奨）

---

Made with ❤️ for Kyoto travelers