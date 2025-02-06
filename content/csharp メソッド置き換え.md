---
tags:
 - Info
---

daily:: [2021-10-04](Daily_Note/2021-10-04.md)
up:: [Csharp](../Bar/Program/Csharp.md)
up:: [Programming](../Bar/Program/Programming.md)

## メソッド置き換え
### new
C#ではnewはインスタンスを作るだけのものではない。 
newを使って **メソッドを置き換えられる。** ただし......
```csharp
namespace Consoleapp5
{
	using System;
	public class Person
	{
		public string getName()
		{
			return "私には名前がありません。"
		}
	}
	
	public class Taro : Person
	{
		public new string getName()
		{
			return "私の名前は太郎です。"
		}
	}
	
	public class Class1
	{
		public static int main(string args[])
		{
			Person person = new Person();
			Console.Writeline(person.getName());
			//私には名前がありません。
			
			Taro taro = new Taro();
			Console.WriteLine(taro.getName());
			//私の名前は太郎です。
			
			Person someone = new Taro();
			Console.WriteLine(someone.getName());
			//私には名前がありません。
			
			return 0;
		}
	}
}
```

Taroで**メソッドの型を決める前にnewを書き、** 同名のメソッドを定義してPersonのメソッドを置き換えている。というか書かないと置き換えられない。そのため、Taro型のtaroではしっかり置き換えられている。 

しかし、**Person型**のsomeoneに**Taroのインスタンス**を突っ込むと、**TaroではなくPersonのメソッドを参照してしまう。**

つまり、newによる置き換えは**データ型に依存する。** 
だから早いんだけど。 

それでもクラスによって置き換えたいメソッドがある場合は、**virtual**と**override**を使う。

![virtualとoverride](<./virtualとoverride.md>)

![抽象クラス](<./抽象クラス.md>)

![インターフェース](<../../Teino/Info/インターフェース.md>)


### まとめ

|                    | 抽象クラス               | インターフェース                                              |
| ------------------ | ------------------------ | ------------------------------------------------------------- |
| 抽象メソッド       | サブクラスで必ず実装     | 抽象メソッドのみ記述 (自動でpublic abstract)                  |
| 実装を持つメソッド | **実装可能**                 | 実装不可(抽象メソッドのみ) (Java8以降、defaultを使って実装可) |
| メンバ変数         | クラスのメンバ変数と同じ | 必ず定数(自動でpublic static final)                           |
| 多重継承           | 不可(単一継承のみ)       | **可能**                                                          |


### 応用
インターフェースでほしいメソッドを定める。 
抽象クラスでインターフェースのメソッドを作り、そこに渡す引数が持つメソッドを抽象メソッドとして定める。 
これを継承することで、インターフェースが欲したメソッドの中身をある程度まで抽象クラスで作りこみ、それに必要な部品は抽象クラスを継承した子クラスの抽象メソッドの中身を詰めることで作れる。 
早い話が、**共通部分を抽象クラス内で共通化できる。**

ちなみにインターフェースのインスタンスを手動で作ると、インターフェースに紐づいている子クラスの持つメソッドを一気に呼び出せたりもする。


[インターフェースと抽象クラスの使い分け、活用方法 - Qiita](https://qiita.com/igayamaguchi/items/e1d35db0a14a84bda452) 
[【納得Java】抽象クラス(abstract)を使うメリット | 侍エンジニアブログ](https://www.sejuku.net/blog/22689) 
↑"Java"なので注意 
[【C#】インターフェースって何？基礎からしっかり解説してみた！ | 侍エンジニアブログ](https://www.sejuku.net/blog/87543)
[【詳解】抽象クラスとインタフェースを使いこなそう！！ - Qiita](https://qiita.com/yoshinori_hisakawa/items/cc094bef1caa011cb739)
