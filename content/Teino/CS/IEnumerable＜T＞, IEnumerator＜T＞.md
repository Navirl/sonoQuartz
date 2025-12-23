---
date: 2021-10-04 21:52:18
tags:
 - Program/CSharp
 - Fragment
---

## IEnumerable\<T\>, IEnumerator\<T\>
**どっちもインターフェース**。ListやArrayやStackやらの元になっている。

### IEnumerable\<T\>
IEnumerableを実装すると**反復処理できるようになる。** foreachが使えるようになるのが一例。
あくまでそれだけであって、それがListやArrayのように**索引付けできることは保証しない**。
持っているメソッドは`IEnumerator GetEnumerator`のみ。これを呼び出すとIEnumeratorを得ることができる。それからCurrentを呼べば現在の値を得ることができる。

### IEnumerator\<T\>
IEnumeratorは実際に反復処理されるオブジェクトを定義する。
```csharp
bool MoveNext();
void Reset();
object Current;
```
この三つのメソッドを持っており、これらを組み合わせることでListやArrayは構成されている。

[違い - ienumerator c# - 解決方法](https://code.i-harness.com/ja-jp/q/884e0)
[c# - IEnumeratorとIEnumerableの違いは何ですか？ \[複製\] - 初心者向けチュートリアル](https://tutorialmore.com/questions-95061.htm)
[C# ジェネリック コレクションを操作する(IEnumerableインターフェース) - cammy](https://cammy.co.jp/technical/c_ienumerable/)
[C# IEnumeratorとIEnumerableを調べた - Qiita](https://qiita.com/vc_kusuha/items/2048391d821cb94fa489)