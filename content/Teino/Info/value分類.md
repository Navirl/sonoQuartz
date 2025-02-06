---
tags:
 - Info
aliases: lvalueとrvalue
---

daily:: [2022-08-04](Daily_Note/2022-08-04.md)
up:: [Cpp](../Bar/Program/Cpp.md)
source:: [右辺値参照・ムーブセマンティクス - cpprefjp C++日本語リファレンス](https://cpprefjp.github.io/lang/cpp11/rvalue_ref_and_move_semantics.html)
source:: [Value categories - cppreference.com](https://en.cppreference.com/w/cpp/language/value_category)

expression（値を伴う演算子、文、変数名とか）は大きく二つ、`glvalue`と`rvalue`に分類される。さらに`glvalue`は`lvalue`と`xvalue`、`rvalue`は`prvalue`と`xvalue`に分類される。lとrとxでいいじゃん……

なお、そもそも**明快な基準によって2つに分けることが難しい**らしい。
下のは一応厳密な分類。

## glvalue
lvalueとxvalueの総称。generalized lvalue。

### lvalue
関数またはオブジェクト。
大体こっち。

## rvalue
prvalueとxvalueの総称。
一時オブジェクトやリテラル値など。

### prvalue
rvalueでxvalueじゃないやつ。

## xvalue
オブジェクト。expiring value。
その寿命が近いか、寿命に関心のないことの表現。
一部の式の結果や、右辺値参照への明示的キャストなどが来るらしい。
