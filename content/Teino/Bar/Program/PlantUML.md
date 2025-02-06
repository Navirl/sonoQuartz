---
tags:
 - Bar
---

daily:: [2021-10-31](/Daily_Note/2021-10-31.md)
up:: [Programming](<./Programming.md>)
same:: [Mermaid](<./Mermaid.md>)

Javaのためにできてる。
Mermaidの方を先に書いたのでいくつか説明を端折ってる。

UML以外も変換できるので、今は`@startuml`じゃなく`@start任意文字列`になってるらしい。
`@start`でもいい。

使う場合は常に成果物を何に使うのかを明確にすること。
書かなくていいなら書かなくていいし、大規模な物（要素20超えが一つの目安）をわざわざこれにしても最新の状態に保つのが大変だったり。
たぶんこれは作りたいものを明確にするためのモノ。


## シーケンス図
## ユースケース図
## クラス図
[PlantUML クラス図](<../../Info/PlantUML クラス図.md>)
## オブジェクト図
## アクティビティ図（古い文法はこちら）
## コンポーネント図
## 配置図
## 状態遷移図（ステートマシン図）
## タイミング図
## JSON data
## YAML data
## Network diagram (nwdiag)
## ワイヤーフレームによるグラフィカルインターフェース、UIモックアップ（salt）
テキストボックスとかチェックボックスとか、よく見る奴を変換可能。
source:: [SaltによるGUIのモックアップを描きます](https://plantuml.com/ja/salt)
## アーキテクチャ図
## 仕様及び記述言語 (SDL)
アクティビティ図に同じ。
## Ditaa
AAみたいな図を変換できる。

## ガントチャート
## マインドマップ
## WBS図(作業分解図)
## AsciiMath や JLaTeXMath による、数学的記法
## ER図
データを管理するときに使うらしい。
表記はIDEF1XとIEの二つがあるが、PlantUMLで使うのはIE。俗に烏の足表記法とも。

PlantUML上ではほぼクラス図。だが違う点もある。
- `class`の代わりに`entity`を使う
- 関係線に細工してそのentityがいくつあるか表現できる
- 必須の情報は`*`をつけて表現できる

source:: [ER図の文法と機能](https://plantuml.com/ja/ie-diagram)

source:: [ER図とは？書き方やテクニックをわかりやすく解説](https://products.sint.co.jp/ober/blog/create-er-diagram)

entityは二つに分けられる。
- Resource entity
	- システム基本データの管理
	- ショップとか顧客とか、実際にデータ持ってるやつ
	- マスタテーブルってのになるらしい
- Event entity
	- システム業務データの管理
	- 受注とか出荷とか、Resource entityを操作するやつ
	- トランザクションテーブルってのになるらしい



## Obsidian
plantuml-svgでSVGが作れるが、VSCode側が対応してない。

source:: [joethei/obsidian-plantuml: Generate PlantUML Diagrams inside Obsidian.md](https://github.com/joethei/obsidian-plantuml)



