---
tags:
 - Info
aliases: virtual
---

daily:: [2022-08-01](Daily_Note/2022-08-01.md)
up:: [Programming](../Bar/Program/Programming.md)
source:: [連載：C#入門　第4回 継承とインターフェイス（2/3） - ＠IT](https://www.atmarkit.co.jp/fdotnet/csharp_abc/csharp_abc_004/csharp_abc02.html)

### virtualとoverride

```csharp
 namespace ConsoleApplication5
 {
   using System;

   public class Person
   {
     public virtual string getName()
     {
       return "私には名前がありません。";
     }
   }

   public class Taro : Person
   {
     public override string getName()
     {
       return "私の名前は太郎です。";
     }
   }

   public class Class1
   {
     public static int Main(string[] args)
     {
       Person person = new Person();
       Console.WriteLine( person.getName() );
       Taro taro = new Taro();
       Console.WriteLine( taro.getName() );
       Person someone = new Taro();
       Console.WriteLine( someone.getName() );
       return 0;
     }
   }
 }
 ```
置き換えたいメソッドにあらかじめvirtualとつけて、置き換えるメソッドにはoverrideをつける。virtualがついた関数は[仮想関数](%E4%BB%AE%E6%83%B3%E9%96%A2%E6%95%B0.md)と呼ばれる。
これにより、どのデータ型に入っていても中のインスタンスによってメソッドを置き換えられる。

ただこれ、コンパイラにとって「このメソッドが何をするかわからない」という状況に陥るため遅くなる。

それに「どうせ書き換えるなら中身いらねぇよ」ってときも良くある。
そんなときに便利なのが[抽象クラス](%E6%8A%BD%E8%B1%A1%E3%82%AF%E3%83%A9%E3%82%B9.md)と[インターフェース](%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9.md)。

