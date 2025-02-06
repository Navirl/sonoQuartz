---
tags:
 - Info
---

daily:: [2023-03-02](/Daily_Note/2023-03-02.md)
up:: [Cpp](../Bar/Program/Cpp.md)

こんなもん書かなくていいけど整理できない……

[コンストラクタ(C++) - 超初心者向けプログラミング入門](https://programming.pc-note.net/cpp/constructor.html)

## コンストラクタ

```cpp
class SimpleClass
{
private:
    int number;
    std::string name;

public:
    //コンストラクタ
    SimpleClass()
    {
        number = 0;
    }

};
```
戻り値無し、クラスと同じ名前の関数。
呼出しタイミングはインスタンス生成時。
書かない場合はコンパイラが何もしないコンストラクタを自動で追加する。

## メンバイニシャライザ
こういう書き方の初期化。

```cpp
class SimpleClass
{
private:
    int number;
    std::string name;

public:
    //メンバイニシャライザ
    SimpleClass() : number(0), name("no name")
    {
        //メンバ変数は既に初期化されているので
        //コンストラクタ内では何もしない
    }
	//アクセサ省略
};
```

利点はconstも初期化できることと早いこと。
基本これ。

### 仕組み
何故早くなるのか。
コンストラクタはクラスだけでなく変数……というかintやfloatなんかの各データ型にも存在する。
なので`int value = 10`でも`int value(10)`でも10が入ったvalueが出来る。

ここで変数入りのクラスのコンストラクタを実行すると、
1. クラスコンストラクタが呼び出される
2. 各メンバ変数のコンストラクタが呼び出される
3. クラスコンストラクタを実行する
の順で動く。

従来通りクラスコンストラクタで値を代入するのは、3.のところでメンバ変数に値を代入するということ。
2.ですでに初期化されてるのにもう一回値を入れることになる。ここが処理の無駄。

なので2.で値を入れてしまいましょうというのがメンバイニシャライザの発想。

このシステム上、メンバイニシャライザではconstを初期化することもできる。


### 応用
派生クラスの場合、メンバイニシャライザで基底クラスのコンストラクタを実行することも可能。

```cpp
class ObjBase
{
public:
	ObjBase()
	{
		Hp = 5;
		Mp = 5;
	}

	ObjBase(int hp, int mp) : 
			Hp(hp), 
			Mp(mp) 
	{
	}

protected:
	int Hp;
	int Mp;
};

class Player : public ObjBase
{
public:
	Player(int hp, int mp, int money) : 
			ObjBase(hp, mp), // デフォルトコンストラクタの場合は書かなくてもいい
			Money(money)
	{
	}

	Player(int money) :
			ObjBase(),
			Money(money)
	{
	}

	void Print()
	{
		printf("Hp = %d\n", Hp);
		printf("Mp = %d\n", Mp);
		printf("Money = %d\n", Money);
	}

private:
	int Money;
};

int main()
{
	Player pl01(100, 10, 20000);
	Player pl02(10000);
	pl01.Print();
	printf("\n");
	pl02.Print();

	return 0;
}
```

また、自身のコンストラクタを呼び出すことにより、コンストラクタをオーバーロードするときの書く量を減らすことが出来る。
これは委譲コンストラクタと呼ばれる。

```cpp
class SimpleClass
{
private:
    int number;
    std::string name;

public:
    SimpleClass() : SimpleClass(0, "no name")
    {
        //引数付きコンストラクタに処理を任せるので
        //ここでは何もしない
    }

    SimpleClass(int n, char *s) : 
        number(n), name(s)
    {
        //メンバイニシャライザで初期化するので
        //ここでは何もしない
    }
};
```



### 注意
メンバイニシャライザの初期化は**変数を宣言した順**で行われる。
なのでこうすると`Mp * 100`の値が不明になりエラーになる。

```cpp
class Test
{
public:
	Test() : Mp(10), Hp(Mp * 100)
	{
	}

	void Print()
	{
		printf("Hp = %d\nMp = %d\n", Hp, Mp);
	}
private:
	int Hp;
	int Mp;
};

int main()
{
	Test t;
	t.Print();
}
```

この関係上？　派生クラスのメンバイニシャライザで基底メンバイニシャライザを実行する場合でも、書く順に関わらず常に派生メンバイニシャライザに書いてある基底メンバイニシャライザが先に実行される。

基底メンバイニシャライザ→派生クラス変数（宣言順）という感じ。

[【C++】イニシャライザ](https://yttm-work.jp/lang/cpp/cpp_0011.html)

## 宣言と同時に初期化
コンストラクタやメンバイニシャライザより早い初期化。あとからそれらで上書きも可能。
ただしstaticには使えない。

```cpp
class SimpleClass
{
private:
    //宣言と同時に初期化
    int number = 0;
    std::string name = "no name";

public:
    SimpleClass()
    {
        //メンバ変数は既に初期化されているので
        //コンストラクタ内では何もしない
    }
};
```