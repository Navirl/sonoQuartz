---
tags:
 - Info
---

daily:: [2022-08-07](Daily_Note/2022-08-07.md)
up:: [Cpp](../Bar/Program/Cpp.md)
source:: [C++ const【機能拡張された利用方法をシーン毎に解説】](https://monozukuri-c.com/langcpp-funclist-const/)
source:: [c++ constメンバ関数まとめ - Qiita](https://qiita.com/Cassin01/items/e44c384561ca159d6411)


付けた対象の変更を禁止する修飾子。大体参照型とセットになって引数にいる。参照とセットの場合は参照**先**の変更が禁止される。
不用意な値の変更が減る（コンパイラ検知的にも、書き換えない意思表示的にも）ので、**基本的に付けられるなら付ける**。[rvalueも入るようになる](Info/ダブルアンパサンド.md)し。

```cpp
class POS
{
private:
    int x;
    int y;

public:
    POS() {
        x = 0;
        y = 0;
    }

    //  コピーコンストラクタ
    POS(const POS& pos)
    {
        x = pos.x;
        y = pos.y;
    }
};
```

これは変数だけでなく、**メンバ関数にも付く**。
この場合は**オブジェクト上のメンバ変数に対する変更を禁止**する。代入初期化も不可。

```cpp
#include "POS.h"

int POS::getX() const
{
	return x;
}

int POS::getY() const
{
	return y;
}

void POS::setX(int x)
{
	this->x = x;
}

void POS::setY(int y)
{
	this->y = y;
}
```

そしてメンバ関数につくと、そこから呼び出せる関数は**const付き関数のみになる**。まあ値は変更できないわけだから当然と言えば当然。

他にも、クラスを定義する際にメンバ変数に付けることもできる。
これはコンストラクタでの初期化が必須になる。


参照周りだとまだ楽だが、ポインタが絡むとつける場所によって元値とポインタ変数のどちらをconstにするか変わってくる。
その辺はこちら。
まあスマートポインタ使えって話だが。

source:: [実践C++入門講座 第32回目 ちょっとイライラするconst。でも、実は頼もしい奴です。 | Theolizer®](https://theolizer.com/cpp-school1/cpp-school1-32/)
source:: [C/C++ の const 修飾子の位置で混乱しないために](https://annpin.com/posts/18/03/27/c-cpp-const/)