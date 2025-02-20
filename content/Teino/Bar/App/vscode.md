---
date: 2024-08-17
tags:
  - Bar
---

up:: 

## ファイル名変更でライブラリ名変更する奴
`Update Imports On File Move`。MarkdownにもImportsではなくLinksで同様の設定がある。

## insert numbersで連番を挿入するためのマルチカーソル
検索もしくは選択後、`ctrl+shift+L`で検索位置にカーソルを挿入できる。
cursorだとチャットに割り当たってるコマンドなので`Select All Ocurrences Of Field Match`で手動選択。

ちなみにinsert numbersでよくある数字変更後にデフォ数値がついてくる問題だが、それだけを直した拡張機能がある。
[Insert Numbers Fix - Visual Studio Marketplace](https://marketplace.cursorapi.com/items?itemName=alpsmonaco.insertnumbersfix)

## shell変更
settings.jsonでterminal.integrated.profiles.windowsに追加。
後はコマンドパレットからterminal profileで選択できる。

## 正規表現で複数行マッチ
`[\s\S\n]*`。空白、空白以外、改行にマッチ。
`\s`は`[\t\r\n\f]`と等価らしい。\fは改ページ。

[VS Codeで複数行に渡って正規表現を利用する VSCode - Qiita](https://qiita.com/birdwatcher/items/dee34a11619b11e1fe81)

