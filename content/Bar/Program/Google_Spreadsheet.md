---
tags:
  - Bar
---

daily:: [2024-03-15](Daily_Note/2024-03-15.md)
up:: [Programming](<./Programming.md>)

コピー時に簡略化できるように=を付けておく。

## クォーテーション
シングルはシート名をくくる時のみ。
ダブルは文字列になる。

## 行番号の変更で数値を変えない
数値前に`$`を付けるだけ。

## 一致しないこと の表現
`<>`。以上でも以下でもない。

## 一意の文字列だけ抜き出し
`=UNIQUE(Input!A:A)`

## あるセルから別のセルを相対位置で取得
[Excel 参照するセルの位置を数式で指定する、計算結果により参照するセルの位置を変更する | iPentec](https://www.ipentec.com/document/microsoft-excel-reference-cell-location-use-variable)
`=OFFSET((開始位置),縦、横)`

## 空白セルを数える
`=COUNTBLANK(A1:A614)`

## ある文字列が入っているセルを数える
`=COUNTIF(Input!A:A,D33)`

## 文字列が入っているセルを数える
`=COUNTA(A:A)`

## 列指定で関数を動かす
`=ArrayFormula(COUNTIF('原文'!A:A,A1:A50))`
**あらゆる関数が一行で済む。重要。**

## 指定範囲内で行列番号でコンテンツを返す
`=INDEX(B$2:B<>"")`
検索範囲、行、列。
本当はこの後に行列番号を付与する。行、列でそれぞれ切り出す感じ。つけないとそのまま返ってくる。

## 空行を含む列から空行を無くす
`=FILTER(UNIQUE('原文'!A3:A),UNIQUE('原文'!A3:A)<>"")`
一列しかないせいで気持ち悪い文になっている。
本来は一つ目に複数行を指定できる。

ちなみに、INDEXやLARGE、TFや0除算を使用した古典的な方法もある。
[【スプレッドシート関数】表の空白行を削除して上に詰める - swatanabe’s diary](https://swatanabe.hatenablog.com/entry/spreadsheets-function-03)

## 範囲内の相対位置を返す
`=match(“佐々木”,B3:B9,1)`
値、範囲、検索種類。
後ろについてるのは種類。
- 1か省略
  検索値以下の最大値(昇順前提)
- 0
  完全一致
- -1
  検索値以上の最小値(降順前提)

相対位置を返す関係上、無駄を省こうとして`B1:B20`から`B3:B20`とかにすると**2つ分ズレるので注意。**

## 最初に出る文字列の入っていない行番号を返す
`=ArrayFormula(match(0,len(A:A),0)`
これとINDIRECTを組み合わせれば何でもできるが、INDIRECTは変更時にめんどいので以下の空文字が使えるなら使ったほうが良い。

## 文字列の入っていない行が出るまでLEN実行
`=ArrayFormula(IF(B3:B<>"", LEN(B3:B), ""))`
文字列入ってないなら空文字にすればいいよね、という発想。

## セル内を文字列として扱う
`=LEN(B3:B&"")`
空文字列をくっつけることで文字列とする。

## あるデータを二列以上に分割して表示
`SPLIT`。分割後に行で表示したいなら`TRANSPOSE`、`FLATTEN`、[空行を含む列から空行を無くす](<#空行を含む列から空行を無くす>)を使えば出来るかも。

`SPLIT`は右のセルに分割して表記する。なので行データに使うなら`TRANSPOSE`。
セル内改行に直接`\n`でマッチするのは**出来ない**ので、先に`REGEXREPLACE`などを使い適当なマッチできる文字列に変更しておく。
`TRANSPOSE`は形状を正確に指定しないと転置出来ない。`A:A`の転置とかは無理。（一応できるけどデフォで列が足りない）
`FLATTEN`は空白を当然含む。`FILTER`を活用する。

[SPLIT - Google ドキュメント エディタ ヘルプ](https://support.google.com/docs/answer/3094136)
[TRANSPOSE - Google ドキュメント エディタ ヘルプ](https://support.google.com/docs/answer/3094262)
[FLATTEN - Google ドキュメント エディタ ヘルプ](https://support.google.com/docs/answer/10307761?hl=ja)
