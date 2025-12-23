---
date: 2022-03-27 23:23:03
tags:
 - Program/CSharp
 - Fragment
---
※この文章は古くなっています。ver2をご覧ください。
[Covariance, Contravariance, Invariance -ver2](<Covariance, Contravariance, Invariance -ver2.md>)

## Covariance, Contravariance, Invariance
それぞれ継承した派生クラス、基底クラス、関係のない別クラスとの関係性のこと。
日本語だと共変性、反変性、不変性と訳される。

### 概念
ダウンキャストの際、派生クラスのインスタンスを基底クラス内に生成可能だった。
それならメソッドの引数が基底クラス定義のとき、派生クラス型の引数を渡したり、派生クラス型の戻り値を基底クラス内に入れても問題ないということになる。
（ちょっとややこしいが、基底クラスが入れ物で派生クラスが内容物であることは変わりない）

### デリゲート
例えばデリゲート相手の場合、基底クラスを戻り値とするデリゲートに、派生クラスを戻り値とするメソッドを代入できる。これがCovariance。
派生クラスを引数とするデリゲートに、基底クラスを引数とするデリゲートを代入するとContravariance。

[デリゲート - C# によるプログラミング入門 \| ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/sp_delegate.html?sec=co-contra#co-contra)

### ジェネリクス
さて本題。ジェネリクスのどこに戻り値や引数にあたるものがあるか。
結論から言うと、getとsetがそれにあたる。

元々、ジェネリクスではこういうことはできない。
```
List<string> strings = {"aa", "bb", "cc"};
List<object> objs = strings;
```
なぜなら、こうすると`objs[0] = 5`という風に別の型に置き換えられてしまう。置き換えられると後でstring変数に入れられなくなってしまう。

もしgetしかないなら、置き換えは禁止されstringであることが保証される。Covariance。

また、こういうこともできない。
```
Action<object> objAction = x => { Console.Write(x); };
Action<string> strAction = objAction;
// objAction("string"); ってやっても問題ないんだから、
// strAction に objAction を代入しても OK。
```

もしsetしかないなら、objectがAction<>のstringを書き換える形で入るので問題ない。Contravariance。

これを実現するのがin/out修飾子。変性注釈、variance annotationという名前がある。
前述のgetにしかならないものにはoutをつける。実際、.NET Framework4.0では、IEnumeratorの型引数にoutがついている。これで共変性が認められる。

反対に、setにしかならないものはinがつく。例としてIComparerの型引数にはinがある。反変性。

なお、現在でも**値型はinもoutも使えず不変-invariance。**

[ジェネリクスの共変性・反変性 - C# によるプログラミング入門 \| ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/sp4_variance.html)

[ジェネリックの共変性と反変性 \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/standard/generics/covariance-and-contravariance)

