---
date: 2023-10-23
tags:
  - Info
---

up:: [Csharp](<../Bar/Program/Csharp.md>)

コードにメタデータを追加するもの。
インターフェースとは違う本物のタグ。
クラス上などに`[AttributeName]`という形式でくっつける。

この機能はAttribute基底クラスから派生したクラス。
そのため例えば`[Obsolete]`としたなら、この部分の名前はObsoleteAttributeとなり、省略せずに書くと`[ObsoleteAttribute]`となる。
標準だと`[Obsolete]`などしかない。

詳細な説明が欲しいなら文字列パラメータ。
`[Obsolete("ThisClass is obsolete. Use ThisClass2 instead.")]`というように渡す。
**ここで渡している対象はAttributeクラスのコンストラクタ**。

その他、boolやintやらとそれらの配列が渡せる。
**式や変数は渡せない**。


クラスであるため、拡張できる。
```cs
public class MySpecialAttribute : Attribute
{
}
```
このクラスは以下のように使用できる。
```cs
[MySpecial]
public class SomeOtherClass
{
}
```

罠として、式や変数はAttributeから渡せない仕様だが、拡張でそれらを持ったコンストラクタ付きクラスを作ると**コンパイルは通る**。

ただそうするとAttributeとして使えなくなる。注意。


Attributeを元にしてコード内で操作するには、コードを調べるコード、つまりリフレクションが必要。
以下のようにする。
```cs
TypeInfo typeInfo = typeof(MyClass).GetTypeInfo();
Console.WriteLine("The assembly qualified name of MyClass is " + typeInfo.AssemblyQualifiedName);
```

[チュートリアル: カスタム属性の定義と読み取り - C# | Microsoft Learn](https://learn.microsoft.com/ja-jp/dotnet/csharp/advanced-topics/reflection-and-attributes/attribute-tutorial)