---
date: 2024-03-12
tags:
  - Bar
aliases:
  - regex
---

up:: [Programming](<./Programming.md>)

正規表現。
ためすやつ
[regex101: build, test, and debug regex](https://regex101.com/)

[regex collection](<../../Info/regex collection.md>)

## 最短一致にする方法
文字の最後に?を付ける
[正規表現：最短一致でマッチさせる表現 | WWWクリエイターズ](https://www-creators.com/archives/1804)

## アスタリスクの意味

直前の文字が 0 回以上繰り返される場合
[疑問符（?）、プラス記号（+）、アスタリスク（*） - アナリティクス ヘルプ](https://support.google.com/analytics/answer/1034330?hl=ja&ref_topic=1034375)

任意回繰り返す場合は`{n,n}`という表記になる。
何回以上何回以下。省略可。

## 肯定先読み

あるパターンの直後に()内のregexがあることを示す
(?=regex)

[こんどこそわかる(肯|否)定(先|後)読み - Qiita](https://qiita.com/tohta/items/2ba7ecde5636b38ef1f6)

長さは固定でないといけない。

## 選択肢の中から任意の文字列
`(strings|strings)`。`[]`だと一文字しか入れられないが、キャプチャグループなら塊として認識する。
そこに論理和`|`を使う。

## キャプチャグループを使いたいが内容を覚えたくない
`(?:strings)`。この記法の為`[a|b|c]`は`(?:a|b|c)`と等価。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet