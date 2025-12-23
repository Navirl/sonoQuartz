---
date: 2021-11-09 12:19:39
tags:
 - Program/CSharp
 - Fragment
---

## キャストとas
asのほうがはるかに速い。ただし、asが使えるのは参照型のみ。
遅くなるのは**例外を返すから**なので、事前にisを使いクラスを判定してからキャストすると幾分かましにはなる。

[as演算子とキャストの違いは？：.NET TIPS - ＠IT](https://www.atmarkit.co.jp/ait/articles/0304/04/news004.html)