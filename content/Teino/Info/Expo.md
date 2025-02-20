---
date: 2024-03-03
tags:
  - Info
---

up:: [React Native](<../Bar/Framework/React Native.md>)

[Develop an app with Expo - Expo Documentation](https://docs.expo.dev/workflow/overview/)

たまにexpo-cliをインストして使うコードが出るが、今は`npx expo`でexpoは使える。

[The New Expo CLI. In Expo SDK 46 we introduced a new… | by Evan Bacon | Exposition](https://blog.expo.dev/the-new-expo-cli-f4250d8e3421)


[ReactNative Expoでアプリ開発入門してみる Part1 reactnative - Qiita](https://qiita.com/RuruCun/items/4e7ffdfb071c8cee26eb)

## Quick Start
init
`npx create-expo-app name`

typescriptを使用する場合は`-t`。
`yarn tsc`が使える。
[Use TypeScript - Expo Documentation](https://docs.expo.dev/guides/typescript/)

tabsだと初めからいくつか画面が用意されている。

Start server
`npx expo start --dev-client`

Build
`npx expo run:android`
[The New Expo CLI. In Expo SDK 46 we introduced a new… | by Evan Bacon | Exposition](https://blog.expo.dev/the-new-expo-cli-f4250d8e3421)

developmentバージョンとexpo goバージョンは別っぽい。
端末上でテストするだけならexpo goでいい。
## Expoアプリ
「Expoツールを使用したReact Nativeアプリ」の短縮。

## Expo Application Services

ExpoはReact Nativeアプリの構築と保証を支援するOSP。
Expo CLI、Expo Router、Expo SDKなどを含む。MIT。

Expo Application Services(EAS)はホスト型サービスのスイート。主に以下を担当する。
- アプリのビルド、送信、更新、自動化
- チームと協力

EASはサーバーやCDNの負担を軽減する。

## Development Build
`Expo-dev-client`を含むデバッグビルド。

## Android及びiOSのNative Project
javascriptと各プラットフォーム対応用Native Project(Android用、iOS用等)で構成される。
Native Projectは`npx create-expo-app`では表示されない。`npx expo prebuild`で表示される。

## Continuous Native Generation
CNG。
package.json -> node_moduleの生成と同様、
app.json, package.json -> Native Projectをオンデマンドで生成する。
`npx expo prebuild`で生成できる。

いつでもNative Projectを作り直せるという強み。

一応作った後にAndroid StudioかXcodeで編集できるが、もう一度prebuildを行うとその変更は上書きされる。
その場合は`npx expo run`で成果物を生成する。

再生成は`npx expo prebuild --clean`。

## テスト、配布
EAS Buildを通し、ベータ配布を待たずに直接ブラウザからテスト用アプリをインストールできる。
iOSの方は有料。
[Internal distribution - Expo Documentation](https://docs.expo.dev/build/internal-distribution/)

EAS Submit。リリース迄を自動化することが出来る。
[EAS Submit - Expo Documentation](https://docs.expo.dev/submit/introduction/)

Sentry。エラーを検出しクラッシュレポートを提出できる。
[Use Sentry - Expo Documentation](https://docs.expo.dev/guides/using-sentry/)

各種AnalyticsをExpoに接続できる。
[Use Analytics - Expo Documentation](https://docs.expo.dev/guides/using-analytics/)

`expo-updates`。production app(実稼働アプリ)をプログラムからアップデートできる。
EAS Update。CDNを使用したりできる。

## アプリ構成
`app.json`、`app.config.js`、`app.config.ts`の三種がある。
これらはpackage.jsonと同じ階層に置く必要がある。

ここに機密情報を含めてはいけない。なぜなら`Constants.expoConfig`を通してコード中から読むことが出来るから。

[Configure with app config - Expo Documentation](https://docs.expo.dev/workflow/configuration/)

## ローカルアプリのコンパイル
`npx expo run:android`。iosとすればiosも作れる。
prebuildで出来るNativeディレクトリが無い場合は一緒に生成する。

`--device`でデバイス選択。
`--variant release`でpruduction build。
(iosは`--configuration Release`)

プロジェクトの構成又はネイティブコードに変更があった場合は`npx expo prebuild`で再ビルド。
これは上書き。全部ビルドしなおすなら`--clean`をくっつける。

## EAS build
`eas login`
`eas build:configure`
`npx expo install expo-dev-client`
`eas build --profile development --platform android`

[Create your first build - Expo Documentation](https://docs.expo.dev/build/setup/)
[Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/)

Releaseビルドは

## テスト
[JestでReact（TypeScript）のテストしてみた React - Qiita](https://qiita.com/piguchi/items/08bdb18a931d1fc78457)
[Detox](https://wix.github.io/Detox/)