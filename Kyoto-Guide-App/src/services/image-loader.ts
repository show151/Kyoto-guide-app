/**
 * image-loader.ts
 *
 * ローカル画像をrequireで読み込むユーティリティ
 * - React Native での画像参照用
 * - JSONのファイル名から画像をstaticなmappingで取得
 * - Metro bundlerは動的require()をサポートしないため、事前に全画像をmapping
 */

// 静的な画像ファイル名マッピング
const spotImageMap: Record<string, any> = {
  'rokuson.jpg': require('../../assets/images/spots/rokuson.jpg'),
  'imakumano.jpg': require('../../assets/images/spots/imakumano.jpg'),
  'ayakotenmangu.jpg': require('../../assets/images/spots/ayakotenmangu.jpg'),
  'reimeijinja.jpg': require('../../assets/images/spots/reimeijinja.jpg'),
  'manzokuinari.jpg': require('../../assets/images/spots/manzokuinari.jpg'),
  'himukai.jpg': require('../../assets/images/spots/himukai.jpg'),
  'itohkyuemon.jpg': require('../../assets/images/spots/itohkyuemon.jpg'),
  'kyohaku.jpg': require('../../assets/images/spots/kyohaku.jpg'),
  'hinodeyu.jpg': require('../../assets/images/spots/hinodeyu.jpg'),
  'kyoto-denim.jpg': require('../../assets/images/spots/kyoto-denim.jpg'),
  'yanagiharaginko.jpg': require('../../assets/images/spots/yanagiharaginko.jpg'),
  'soryu-gama.jpg': require('../../assets/images/spots/soryu-gama.jpg'),
  'kyoto-bunpaku.jpg': require('../../assets/images/spots/kyoto-bunpaku.jpg'),
};

// デフォルトプレースホルダー画像（オフライン対応 - spotsフォルダの画像を使用）
const placeholderImage = require('../../assets/images/photo.png');

/**
 * スポット画像をファイル名から取得する
 * @param filename - JSONで指定されたファイル名（例: "rokuson.jpg"）
 * @returns 画像ソース（require()の戻り値）
 */
export function getSpotImage(filename: string) {
  if (!filename) {
    return placeholderImage;
  }

  // mappingから取得
  const image = spotImageMap[filename];
  if (image) {
    return image;
  }

  // 見つからない場合はプレースホルダーを返す（オフライン対応）
  console.warn(`Image not found in mapping: ${filename}`);
  return placeholderImage;
}

/**
 * URL形式か、ローカルファイル名かを判定
 * @param imageSource - JSONの画像フィールド値
 * @returns { uri: string } または require()の戻り値
 */
export function resolveImageSource(imageSource: string | undefined) {
  try {
    if (!imageSource) {
      return placeholderImage;
    }

    // URLの場合はそのまま返す
    if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
      return { uri: imageSource };
    }

    // ローカルファイル名の場合
    return getSpotImage(imageSource);
  } catch (error) {
    console.error('Error resolving image source:', error);
    return placeholderImage;
  }
}
