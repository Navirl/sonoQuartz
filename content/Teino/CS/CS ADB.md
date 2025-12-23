---
date: 2021-10-22 20:05:20
tags:
 - App/ADB
 - CheatSheet
---
[よく使うadbのコマンド - Qiita](https://qiita.com/t2low/items/cb37cec5f864c4748e14)

## 接続
普通にUSBでつなげば`adb devices`で見える。
あとは`adb shell`で中に入ればいい。

[Android端末をWi-Fi経由でadb接続する方法！ - ShopDD](https://shopdd.jp/e/android-wi-fi-adb-connection)

shellで入れないときは、`adb devices`で使わないほうを`adb disconnect`してやればいい。

[デバイスを1つしか接続していないのにerror: more than one device/emulatorが出る](https://clrmemory.com/pc-mobile/android/device-one-error/)

### WSL for Android
ローカルサーバーのAndroidにネットワーク接続することになる。IPとって`adb connect 172~`。

[Android用のWindows11サブシステムを使用すると、アプリをサイドロードできます-方法は次のとおりです](https://www.bleepingcomputer.com/news/microsoft/windows-11-subsystem-for-android-lets-you-sideload-apps-heres-how/)


## xapkのinstall
ばらしたうえで`adb multiple-install 1.apk 2.apk`みたいな感じで全部指定してインストールする。
そのままだとアプリ名が不明になるので`adb push Android\obb\com.application.name`で名前を変更しておく。

[How to install xapk, apks, or multiple-apks via adb? - Android Enthusiasts Stack Exchange](https://android.stackexchange.com/questions/221204/how-to-install-xapk-apks-or-multiple-apks-via-adb)

ただ、そもそもAndroid自身にやらせればいいという考えもある。だいたいxapkの入手元であるAPKPureには公式アプリがあり、これをインストールしてやれば普通にインストールできる。

SAIとかAPKMirrorとかほかにもxapkをインストールできるアプリはある。

[Android TVでアプリをサイドロードする方法：APKインストールとADBサイドロードの方法の説明](https://www.xda-developers.com/how-to-sideload-apps-android-tv/)

## uninstall
パッケージ名(com.とかで始まるやつ)を`adb uninstall`に渡せばOK。
パッケージ名は`pm list packages`で名前の一部を渡せば検索できる。

[Androidの不要アプリをadbコマンドからアンインストールしてみたメモ - Qiita](https://qiita.com/tpuroguramu/items/0424e3f84c8db93cea6d)