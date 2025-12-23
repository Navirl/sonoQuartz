---
date: 2022-04-22 09:33:30
tags:
 - #CheatSheet
---

## MIUI
### 標準ファイルマネージャー
Miのファイルマネージャーを使い、それでは権限が足りない場所を開こうとすると標準ファイルマネージャーを勧めてくる。

## Android
### data/data内のフォルダが足りない
大抵のファイルマネージャーでは権限が足りず見つけることもできない。

ここはアプリからの内部ストレージが集まる場所らしく、アプリをアンインストールすると消去されるデータが入っている。各種セーブとかキャッシュ。ただし容量には限界あり。そりゃな。

[アプリ固有のファイルにアクセスする  |  Android デベロッパー  |  Android Developers](https://developer.android.com/training/data-storage/app-specific?hl=ja)
[[Android] アプリ固有の内部ストレージにファイルを保存する](https://akira-watson.com/android/fileoutputstream.html)

## Bat
### コメント
::。
:一個でもカウントされない文字列にはなるらしいが、Goto文の対象に取られてしまうらしい。
なので::と二つ付ける。

ちなみに正式なコメントアウトはrem。

[バッチファイルでコメントを使用する](https://jj-blues.com/cms/wantto-usecommentout/)