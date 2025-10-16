---
date: 2022-08-18
tags:
 - Info
---

up:: [Cpp](<../Bar/Program_lang/Cpp.md>)
source:: [怖いものなんてない！！: C++のコンストラクタにある「:(コロン)」について](https://kowaimononantenai.blogspot.com/2012/10/c.html)
source:: [コンストラクタで書かれるコロン「：」って何？ | C++　フリーでぷろぐらみんぐ](https://ameblo.jp/nana-2007-july/entry-10037680575.html)
source:: [コンストラクタでは、代入よりも初期化を使おう 12項 - higepon blog](https://higepon.hatenablog.com/entry/20051107/1131335521)

コンストラクタにくっついてるやつ。
コンストラクタついでにメンバ変数を初期化しているらしい。複数初期化するときは,でつなぐ。

```cpp
class testclass
{
private:
    int num_int;
    double num_dou;

public:
    testclass()
        :num_int( 0 )
        ,num_dou( 1.2 )
    {
    }
}
```

単純にコンストラクタ内で初期化するより、宣言を挟まないので早いらしい。