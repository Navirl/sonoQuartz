---
date: 2022-01-30 16:18:16
tags:
 - App/Minecraft
 - CheatSheet
---

## 事前知識
Minecraftはゲーム本体と別にデータフォルダが存在する。プロファイルともいう。
そしてプロファイルにセーブデータ、Mod、Shader、ResourcePackなどがまとめられている。ゲームは必要に応じてプロファイルからデータを読みだしている。

プロファイルには基底となるプロファイルと、派生するプロファイルがある。どちらもプロファイルは複数作れる。Minecraftをデフォルト状態でインストールしたなら、基底プロファイルは`%APPDATA%/.minecraft`にある。派生プロファイルはMinecraft Launcherから自由に作れる。

違いは、派生するプロファイルは必要に応じて基底プロファイルからデータを貰うこと。親子関係といっていい。
といっても直接的な繋がりは薄く、確認してるのは基底プロファイルにインストールしたModのデータを読み出すことだけ。そのほかは派生プロファイルが独立して保有してるので、**派生プロファイルに何が起きてもその他のプロファイルへの影響はない。**

### Modとplugin
Modは新たな要素を追加するもの。java限定。
pluginは既存の要素をもとに新たな機能を構築するもの。どちらでも動く。

### jarの実行
javaにはいくつかバージョンがあるが、単純に新しいものがいいとはならない。
javaはしばしば標的にされがちで、攻撃されないよう常にアップデートする必要がある。
しかし、アップデートにはサポート期限があり、これが切れるとアップデートが降りてこなくなるため、出来るだけサポート期限の長いものを選ぶ必要がある。
その一つの目安がLTS。LongTimeSupportの略であり、これがついてるjavaはサポート期間が長め。
長めといっても5年もすれば切れるが。

[Java Downloads | Oracle](https://www.oracle.com/java/technologies/downloads/#jdk17-windows)
[Oracle Java SE Supportロードマップ | Oracle 日本](https://www.oracle.com/jp/java/technologies/java-se-support-roadmap.html)

#### javaについて
OpenJDKが全ての基本。JavaのコミュニティとOracleが管理している。
これを各社がビルドしたものに独自の名前を付けてるのが各々のJDK。

OracleがビルドしたOpenJDKはOracleJDKと呼ばれる。
MicrosoftがビルドしたOpenJDKはMicrosoft Build of OpenJDKと呼ばれる。

ちなみにややこしいことに、現在OpenJDKと呼ばれるビルド済みバイナリもOracleがビルドしている。
OracleJDKと違いLTSは無く、言うなればアーリーアクセス版という感じ。

昔はOracleJDKが有償で明確に差別化してたが、今は普通に無償で使えるためOpenJDKとOracleJDKの差はわかりにくくなっている。

[JDK、Oracle JDK、OpenJDK、Java SEってなに？ - Qiita](https://qiita.com/nowokay/items/c1de127354cd1b0ddc5e)

## Forge
### 概要
Modを統括管理するMod。

### 利点
通常Modをアンインストールしたい場合、saveフォルダだけ残して基底プロファイル全消去が必要。

Forgeがあると、Modのjarを配置するだけでインストール、jarを消すだけでアンインストールが可能になり楽になる。

具体的には複数Modを入れた際に不具合が起きた時、不具合の原因になったModだけ取り除くことが出来たり。
新しいModを手軽に始めて、合わなかったらアンインストールというサイクルが簡単になる。

### インストール
公式サイトからMinecraftのバージョンに合ったものを選び、自分の基底Minecraftプロファイルにインストールする。

インストールしたら、Minecraft Launcherから派生プロファイルを作る。
セーブデータ保護のため、別にプロファイルを作ることを推奨。

後は起動するだけで、Forge入りMinecraftをプレイできる。
ネットを探すと元のMinecraftを起動しろとか書いてるが、これは**基底プロファイルを作るための操作なので、Forgeが対応するバージョンのMinecraftを立ち上げる必要はない。**

### 公式リンク
[Downloads for Minecraft Forge for Minecraft 1.18.1](https://files.minecraftforge.net/net/minecraftforge/forge/)

### wikiリンク
[Minecraft Forge | Minecraft Universe Wiki | Fandom](https://minecraftuniverse.fandom.com/wiki/Minecraft_Forge)

### 備考
以下、全てForgeにインストールするものとする。
今回作った派生プロファイル内にはModsフォルダがあり、この中にModのjarファイルを置くだけで、Forgeの派生プロファイルで起動する際に自動で読み込んでくれる。

## サーバー構築
### 基本
[テンプレートを使ってバニラサーバーを触ってみよう｜ConoHa VPSサポート](https://support.conoha.jp/v/hellovps-m-01/?btn_id=v-hellovps-m-03-sidebar_v-hellovps-m-01)
これを見てやっていけば基本何とかなるが、いくつか詰むポイントアリ。

### 注意
#### javaが古い
2時間目の4:OpenJDKをインストールする にて、実行しているコマンドをよく見るとjava-1.8.0-openjdkをインストールしている。
これはjava 8の最新版。javaの理念上はどんなjavaでも開けるとは思うが、それでも古いjavaであるのは間違いない。サポート的にもちょっと不安。
java-17-openjdkでも入れてやる。

これに気づかないと`Could not find or load main class @user_jvm_args.txt`に延々振り回される。

[Problems with making a Forge 1.17.1 server - Support & Bug Reports - Forge Forums](https://forums.minecraftforge.net/topic/102844-problems-with-making-a-forge-1171-server/)

#### init.dがない
3時間目、1:起動スクリプトのダウンロード。
新しいCentOSを使うとあるある。ちなみに、CentOS StreamというのはRHELのアーリーアクセス版らしい。
`/etc/init.d/`は`/etc/rc.d/init.d/`にシンボリックリンクでつないでるだけなので、代わりに`/etc/rc.d/init.d/`に入れる。

[/etc/rc.d/init.d/と/etc/init.d/の違いって・・・ – ADACHIN SERVER LABO](https://blog.adachin.me/archives/1684)

#### forge-バージョン.jarがない
3時間目、2:Minecraft Forgeのインストール。
forgeの仕様が変わったらしく、サーバーインストールした後はrun.shを起動することでサーバーを起動するようになっている。

```sh
#!/usr/bin/env sh
# Forge requires a configured set of both JVM and program arguments.
# Add custom JVM arguments to the user_jvm_args.txt
# Add custom program arguments {such as nogui} to this file in the next line before the "$@" or
#  pass them to this script directly
java @user_jvm_args.txt @libraries/net/minecraftforge/forge/1.17.1-37.1.1/unix_args.txt "$@"
```

見ての通り、user_jvm_args.txtとunix_args.txtをつなげてjavaを実行している。
なので`vi user_jvm_args.txt`で編集して起動する。

user_jvm_args.txtに書くのはメモリの量のみ。
ファイル内部にコメントとして書いてあるので、それに従う。

#### Preparing spawn area: 0%
初回起動は時間がかかる。

#### mismatched mod channel list
optionフォルダとmodsフォルダのどちらかが一致しない。
クライアント側のフォルダで上書きする。

#### 全部完璧なのに起動しない
サーバーを再起動する。

