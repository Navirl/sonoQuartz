---
date: 2025-01-07
tags:
  - Info
---

up:: [Elm](<../Bar/Program_lang/Elm.md>)


[Beginning Elm: a gentle introduction to Elm programming language - Beginning Elm](https://elmprogramming.com)

elmは構文とセマンティクスの2つで説明する。
構文はプログラムの文法構造、セマンティクスはその意味。

## Elmコンパイラ
elmプログラムはelmコンパイラを通り、1つのjsファイルにコンパイルされる。
別途用意したjsを合わせて使用することも可能。

elmはサーバーアプリを作成できない。

## Elmアーキテクチャ
プログラム内のデータフローを管理するための
パターンと言語機能のセット。

高度なインタラクティブアプリだと、データは多くのコンポーネントを介して流れる。
この時の複雑性を軽減するのがElmアーキテクチャ。

アプリ用のフレームワークは無い。
なぜならこのアーキテクチャがElmそのものに組み込まれてるから。
その意味ではReactの代替にもなる。

エッジケース用のパッケージ機能はある。

## Elmランタイム
Elmは十数行からでも数千行のjsをコンパイルする。
他のelmパッケージ、elmランタイムのコードも含むため。
elmランタイムはelmプログラムの実行をサポートするように設計されたシステム。

## elm make
elm makeはelmプロジェクトを構築するためのツール。
以下のようにするとjsだけ出力する。

```elm
elm make src/HomePage.elm --output elm.js
```

`--output`を外すとindex.htmlも含めて作成する。
ただベスプラは`--output`。あとからjsなどをインポートしやすい。
テスト容易、コード構成、再利用性の観点からもよし。

---


