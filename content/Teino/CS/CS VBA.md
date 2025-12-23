---
date: 2021-10-16 19:04:06
tags:
 - Program/VBA
 - CheatSheet
---

## 変数と配列
`Dim 名前 as 型`
これが基本形。

`Dim 名前(個数) as 型`
こうすると静的配列になる。
For Eachに押し込みたいときはVariant型を使う。

`Dim 名前(個数 to 個数) as 型` 
こうするとインデックスの最小値を決められる。
ExcelだとCellに合わせて分かりやすくするためにここを変えることがあるとか。

```
Dim 名前() as 型
ReDim 名前(個数)
```
こうすると動的配列になる。
は？　数決めてるじゃん となるが、これはアドレスの個数指定。
**決めていないと要素を格納できない。**

また、Redimはそのまま実行すると**配列内のデータをすべて削除する。** データを残してサイズを変えたいなら`Redim Preserve 名前(個数)`とする。

[【VBA入門】配列の初期化(ReDim、Preserve、Array、Erase) \| 侍エンジニアブログ](https://www.sejuku.net/blog/29274)
[Excel VBAの静的配列と動的配列の宣言：Dim, Redim, Redim Preserve \| UX MILK](https://uxmilk.jp/48990)

## If
```VB
If 条件文 Then
	処理
End If
```
EndやThenの付け忘れに注意。

## For
```VB
For 変数設定 To 数値最終
	処理
Next
```

For Each文やWhileに当たるDo Loopなどもある。

[VBA For 文](https://www.tipsfound.com/vba/03002)


## コンソール出力
`Debug.Print 出力`
""で幸い文字列として打ち込める。文字列を結合するときはJoin()か&。Joinのほうがはるかに速い。

## コメント
頭に'(シングルクォーテーションマーク)をつける。

[【VBA入門】コメントアウトの書き方とセルへのコメント追加 \| 侍エンジニアブログ](https://www.sejuku.net/blog/33307)

## UBoundとLBound
UBoundは**配列内で使用できる最も大きいインデックス番号を返す。**
LBoundは**配列内で使用できる最も小さいインデックス番号を返す。**

VBAでは配列の初期値が違うことがあるので、配列数は**UBound - LBound + 1**で求められる。

[【VBA入門】UBound、LBound関数で配列の要素数を取得 \| 侍エンジニアブログ](https://www.sejuku.net/blog/29317)

## Exit
breakに当たるもの。
`Exit 対象`
基本文はこう。Forなら`Exit For`、Doなら`Exit Do`と入れないと動かない。

[Excel VBAでFor文を途中で抜ける：Exit \| UX MILK](https://uxmilk.jp/48591)

## IsEmpty
そのセルが空白かどうか調べるもの。
……なのだが、意外と奥が深いらしい。

[空白セルを正しく判定する方法2｜VBA技術解説](https://excel-ubara.com/excelvba4/EXCEL276.html)