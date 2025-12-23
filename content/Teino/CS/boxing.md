---
date: 2021-10-04 21:46:18
tags:
 - Program/CSharp
 - Fragment
---


## boxing
参照型に値型を代入できる機能。
実際に代入しようとすると、自動で値型を包むclass(参照型)を定義して代入する。

内部的に値型のデータをコピーしたものを参照しているため、**後から値を書き換えても元データは変わらない。**

[連載：C#入門　第5回 C#のデータ型（3/3） - ＠IT](https://www.atmarkit.co.jp/fdotnet/csharp_abc/csharp_abc_005/csharp_abc03.html)
