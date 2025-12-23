---
date: 2021-10-04 21:48:46
tags:
 - Program/CSharp
 - Fragment
---

## foreachにおけるインデックス取得法
なんやかんや必要になりがちなインデックス。三種類の方法がある。
1. LINQのSelect拡張メソッドを使う
2. value tupleを使う
3. 別に変数を作ってforが終わるたびに足してく
なお、**最速は3.**。corei7で1万回回して1ミリ秒とかそんな差だから普段は気にしなくていいけど。
### LINQ - Select
```csharp
using System.Collections.Generic;
using System.Linq;
……省略……
IEnumerable<string> collection = ……省略……
foreach (var item in collection.Select((Value, Index) =>
	new { Value, Index }))
{
  string value = item.Value; // コレクションの要素
  int index = item.Index; // ループのインデックス
  // ……valueとindexを使った処理を書く……
}
```

こう書くとValueに値、Indexにインデックスが入る。
LINQのSelectメソッドでは、コレクションの各要素に対し、ラムダ式で示した処理を加えることができる。
これを利用し、ラムダ式で新たな変数Value、Indexにそれぞれを代入している。

### LINQ - Select - tuple
C# > 7.0ならばこちらのほうが楽。

```csharp
IEnumerable<string> collection = ……省略……
// C# 7の新機能を使う
foreach (var (value, index) in collection.Select((v, i) => (v, i)))
  WriteLine($"{index}：{value}");

```

Selectで各要素をtupleに変換している。

### 変数に足していく
```csharp
IEnumerable<string> collection = ……省略……
int index = -1; // カウンター変数
foreach (var value in collection)
{
  index++;
  WriteLine($"{index}：{value}");
}
```
古典的だが、早さを求めるならこれ。

[foreachループで現在の繰り返し回数を使うには？［C#／VB］：.NET TIPS - ＠IT](https://www.atmarkit.co.jp/ait/articles/1702/22/news019.html)
[【C#入門】LINQのSelect、Whereでコレクションを操作する方法 \| 侍エンジニアブログ](https://www.sejuku.net/blog/47172)
[C#のforeach文でインデックスを取得する小技 - Yuta.NET](https://yutacore.com/csharp/foreach001.html)