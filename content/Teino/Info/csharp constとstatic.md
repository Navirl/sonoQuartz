---
tags:
 - Info
---

daily:: [2021-08-07](Daily_Note/2021-08-07.md)
up:: [Csharp](<../Bar/Program/Csharp.md>)
source:: [【C#の定数】const と readonly、static readonly の使い分け - Qiita](https://qiita.com/tanakaworld/items/eda69da263e24adfa07d)
source:: [【C#】const、static、readonlyの違いと使い方 \| Engineers Method](https://bigpowermind.com/c-const-static-readonly/)
source:: [constとreadonlyとstatic readonly、それぞれの特徴と使い分け方 - Qiita](https://qiita.com/4_mio_11/items/203c88eb5299e4a45f31)

[csharp privateとstatic](<./csharp privateとstatic.md>)

## const
このプログラムの中では**変更しない**、だから監視しといてねという修飾子。
変数のように扱える**定数**。特性上、宣言時にのみ初期化できる。また、暗黙的にstaticになる。
これをいくつも並べた物がenum、列挙型。

内部ではコンパイル時に値を埋め込んでいる。なので実行ファイルは大きくなる。かわりに**高速。**

バージョニング問題というものがある。public constで別アセンブリから参照している場合、参照される側の定数を変更しても**参照する側をコンパイルしなおさない限り更新されない。** 名称はバージョンアップ時の挙動が怪しくなることから。

内部ではリテラルを直接書いたのと同じになる。
つまり、メソッド実行を伴う値の代入は不可。


## static
このプログラムの中で**常にメモリに置いといてね**、という修飾子。
そのため、普段は「インスタンスにつき一つ」である変数や関数を **「クラスに一つ」** に限定できる。つまりこれをつけるだけでシングルトンみたいになる。(というと混乱のもとだけど)

[わい、static変数とstaticメソッドについて熱く語る - Qiita](https://qiita.com/Nekonecode/items/19f3a261a8391853ddec)
大体既知だったけど、staticメソッドではthisが使えないのは初耳。
C#でそうなのかはわからない。

## readonly
読み取り専用、代入不可の**変数**。
宣言時と、コンストラクタ内で初期化可能。

switch文、デフォルト因数には使えず、newしたインスタンスを割り当てられる。

つけない場合よりも少し遅くなる？

ちなみに、実質値が変わらない場合は**定数としてコンパイルされる。**

## static readonly
constの代用。
値をコンパイル時に計算できなかったりするとき使う。

代用とはいえ、**基本的にはこちらが推奨。**
constを使うのは**高いパフォーマンスが求められ、将来にわたって変更されない値のみ。**
