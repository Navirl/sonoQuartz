---
date: 2021-07-29 09:55:40
tags:
  - Program_lang/CSharp
  - CheatSheet
aliases:
  - CCSheet
---


[../../Teino/CS Unity](../../Teino/CS%20Unity.md)
[用語](<../Others/CSandSR/用語.md>)
[メソッド置き換え](../Teino/メソッド置き換え.md)
[値型と参照型](<../Others/CSandSR/値型と参照型.md>)
[boxing](<../Others/CSandSR/boxing.md>)
[Property](<../Others/CSandSR/Property.md>)
[privateとstatic](../Teino/privateとstatic.md)
[Indexer](<../Others/CSandSR/Indexer.md>)
[foreachにおけるインデックス取得法](<../Others/CSandSR/foreachにおけるインデックス取得法.md>)
[配列の要素数](<../Others/CSandSR/配列の要素数.md>)
[LINQ](<../Others/CSandSR/LINQ.md>)
[IEnumerable＜T＞, IEnumerator＜T＞](<../Others/CSandSR/IEnumerable＜T＞, IEnumerator＜T＞.md>)
[IndexOf](<../Others/CSandSR/IndexOf.md>)
[？：](<../Others/CSandSR/？：.md>)
[プリプロセッサ](<../Others/CSandSR/プリプロセッサ.md>)
[配列、リスト、辞書型速度](<../Others/CSandSR/配列、リスト、辞書型速度.md>)
[キャストとas](<../Others/CSandSR/キャストとas.md>)
[Csharp List](<../Others/CSandSR/Csharp List.md>)
[Covariance, Contravariance, Invariance -ver1](CS_and_SR/Covariance,%20Contravariance,%20Invariance%20-ver1.md)

## もれなくダブりなく抜き出す
この記事のRemoveをRemoveAtに変えればより直感的。
[【アルゴリズム】C# 配列要素を漏れ・ダブりなくランダムに取得する方法 - usefuledge](https://usefuledge.com/get-random-array-item.html)
[\[C#\] 指定したListからランダムで要素を取得](http://l-s-d.sakura.ne.jp/2016/03/random_get_from_list/)

## File
主にFileクラスを使う。
.ReadAllTextで読み込み。
.WriteAllTextで書き込み。
.AppendAllTextで追記。
.ReadAllBytesでバイナリデータ読み込み。
.WriteAllBytesでバイナリデータ書き込み。
他にも移動、存在確認、削除などがある。

[File クラス (System.IO) \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/api/system.io.file?view=net-5.0)
[【Unity】ファイルの読み込みと書き込み方法３選 - おもちゃラボ](https://nn-hokuson.hatenablog.com/entry/2020/10/27/151858)
[【C#】C#でファイルを読み書きする方法まとめ - LIGHT11](https://light11.hatenadiary.com/entry/2019/06/29/152002)

バッファー用意したり非同期で読んだり、そういうガチなことをやる場合はFileStreamを使う。Fileクラスはこれの簡易版。こっちはDispose()によるリソース開放が必要。
[FileStream クラス (System.IO) \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/api/system.io.filestream?view=net-5.0)

### パス
書き込むためにはファイルパスが必要だが、Application.dataPathやApplication.persistentDataPathで簡単に取得できる。

.datapathはAndroidだとAPK直下、Windowsだとexeのあるフォルダを指す。iOSだと**読み取り専用の場所**を返されてしまうので、データを保存したいなら後者の.persistentDataPathのほうがいい。

.persistentDataPathはデータを永続的に保管できる。Androidだとpackagename/files、WindowsだとAppdata/Local/Packages以下略。
**ユーザーが直接消去できる位置。**

↓ここではリソース開放してるけど、公式リファレンスとかを見る限り要らないっぽい？
[C#でフォルダ、ファイルの作成、移動、削除をする \| Unityを使った３Dゲームの作り方（かめくめ）](https://gametukurikata.com/csharp/makefolderfile)
[UnityEngine.Application - Unity スクリプトリファレンス](https://docs.unity3d.com/jp/current/ScriptReference/Application.html)
[Application-dataPath - Unity スクリプトリファレンス](https://docs.unity3d.com/jp/current/ScriptReference/Application-dataPath.html)
[Application-persistentDataPath - Unity スクリプトリファレンス](https://docs.unity3d.com/jp/current/ScriptReference/Application-persistentDataPath.html)

[ジェネリックメソッド](../../Teino/Info/ジェネリックメソッド.md)

## 名前付き引数
```csharp
Ray2D ray2D = new Ray2D(origin: transform.position, direction: -transform.right);
```
こんな風に`名前:引数`とすることで、順序を気にすることなく引数を渡せる。
また、オーバーロードされている関数に正しく引数を渡すのにも役立つ。

[名前付き引数と省略可能な引数 - C# プログラミング ガイド \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/csharp/programming-guide/classes-and-structs/named-and-optional-arguments)

## ドキュメントコメント
クラスの説明をツールチップとして表示できる機能。読みやすく使いやすくなるので積極的に。
使い方はクラス頭に///**（三本）** または/\*\* \*/のあと、xml構文をくっつければいい。主に使うのはこの4つ。

| タグ名 | 意味 |
|:---:| --- |
| summary | クラス メソッドの上に書いて、説明するときに使われる |
| param | コンストラクタ メソッドの引数を説明するときに使う |
| remarks | summaryタグの補足で使われる |
| returns | メソッドの戻り値を説明するときに使われる |

[【C#】ドキュメントコメントの使い方を解説します - ゲーマーときどきエンジニア](https://www.tairax.com/entry/Csharp/Document-Comment)

他にはこういうのも。
改行なら末尾に\<br/\>か\<para/\>、もしくは\<para\>\<para/\>で囲む。Riderなら入力補完が効く\<para\>\<para/\>を常に使うのがよさそう。
単体の\<para/\>のみ扱いが違い、二回改行されるので注意。
\<br/\>で改行する手法は新しい物らしい。ソフトの仕様によるものなので新しいといってもVisual Studio 2019以降という意味だが。

[クラスとそのメンバー用として推奨される XML ドキュメント タグ \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/csharp/language-reference/xmldoc/recommended-tags)
[c# — C＃.NETドキュメントで改行を追加する方法](https://www.webdevqa.jp.net/ja/c%23/c%EF%BC%83net%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88%E3%81%A7%E6%94%B9%E8%A1%8C%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/940407464/)


| タグ名 | 意味 | 備考 |
| --- | --- | --- |
| c | テキストをコードとして扱う | summary内などで使う |
| code | 複数行のコードを記述する |  |
| example | コード例を記述する(主にcodeを使う) |  |
| *exception | 例外について説明する |  |
| *include | 別のファイル内のコメントを取り込む |  |
| para | テキストに構造を追加する(段落) | summary内などで使う |
| *param | そのメソッドのパラメータ(引数)について説明する |  |
| paramref | summaryなどの中でパラメータ(引数)を参照するさいに使う |  |
| *typeparam | パラメータの型などを説明する |  |
| typeparamref | summaryなどの中で型パラメータを参照するさいにつかう |  |
| value | プロパティについて説明する |  |
| list | リスト・テーブルを説明する |  |
| *permission | メンバーへのアクセスのパーミッションを記述する |  |
| *see | 他のメンバやフィールドを参照するさいに使う |  |
| *seealso | seeの他に参照が必要なものを記述する |  |

**「\*」のついているタグはコンパイラのチェックが入る。**

[初心者必見！C#のコメント・ドキュメントコメントまとめ \| 侍エンジニアブログ](https://www.sejuku.net/blog/103080)


## 拡張メソッド
`public static 値型 メソッド名(**this 拡張したい値型** 変数名, 引数1, 引数2......){挟みたい処理、戻り値}`
こんな感じで定義する。一つ目の引数定義を、拡張したい値型の指定に使うイメージ。使用時には**二つ目以降の引数が引数として使われる。**

別のnamespaceで使うときはusingで指定しておく必要がある。

```csharp
 namespace MyExtensions
 {
  static class StringExtensions
  {
  /// ＜summary＞
  /// 引数の文字列を連結する。
  /// </summary>
  /// ＜param name="str"＞連結文字列＜/param＞
  /// ＜param name="addStr"＞連結文字列＜/param＞
  /// ＜returns＞連結結果＜/returns＞
  public static string AddString(this string str, string addStr)
  {
  return str + addStr;
  }
  }
 }
```


[C#の拡張メソッドとは？引用thisやサンプルをご紹介 \| .NETコラム](https://www.fenet.jp/dotnet/column/language/3989/)

## 親クラス 変数 = new 子クラス（）；
これは**アップキャスト**と呼ばれる操作。子クラスのインスタンスを親クラスのインスタンスとして扱える。
利点はもちろん親クラスと同じく扱えること。欠点は子クラスのインスタンスながら、**親クラスのメソッドしか使えないこと**。子クラス内で定義されたメソッドは、親クラスという「窓」には映らない。

ちなみに、逆の操作であるダウンキャストというのもある。これは**見えてはいけないメモリ領域が見えてしまう**ので避けるべき。

[なぜアップキャストは安全で、ダウンキャストは危険なのか - Qiita](https://qiita.com/RYO-4947123/items/eaeb48b6fcf97c02710f)
[親クラス変数=new子クラス（）；と実行する利点は何ですか？子クラス... - Yahoo!知恵袋](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1429137994)

## private staticっている？
いる。staticをつけることで、このprivate staticが入っているクラスが複製された際でも、private staticはただ一つが保証される。

[constとstatic](../Teino/constとstatic.md)
[private static という変数の修飾 -お世話になります。private static - Java \| 教えて!goo](https://oshiete.goo.ne.jp/qa/2467796.html)
[【Java】private static final とは何ぞやという話 - 16bit!](https://sakuramochi702.hatenablog.com/entry/2013/07/10/143255)

## 列挙型
数値指定しかできない辞書型みたいなもの。
逆に言うとそれだけなので、要素の追加が容易。

```csharp
enum DayOfWeek
{
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

static void Main(string[] args)
{
    ShowDayOfWeek(DayOfWeek.Sunday);
    ShowDayOfWeek(DayOfWeek.Wednesday);

    Console.ReadLine();
}

static void ShowDayOfWeek(DayOfWeek dayOfWeek)
{
    switch(dayOfWeek)
    {
        case DayOfWeek.Sunday:
            Console.WriteLine("今日は日曜日です");
            break;
        case DayOfWeek.Monday:
            Console.WriteLine("今日は月曜日です");
            break;
        case DayOfWeek.Tuesday:
            Console.WriteLine("今日は火曜日です");
            break;
        case DayOfWeek.Wednesday:
            Console.WriteLine("今日は水曜日です");
            break;
        case DayOfWeek.Thursday:
            Console.WriteLine("今日は木曜日です");
            break;
        case DayOfWeek.Friday:
            Console.WriteLine("今日は金曜日です");
            break;
        case DayOfWeek.Saturday:
            Console.WriteLine("今日は土曜日です");
            break;
        default:
            Console.WriteLine("曜日が不明です");
            break;
    }
}
```

返り値指定の代わりにenumを置いて作る。
内部では0，1，2……と振られていってる。
代入すれば**そこから連番**でまた振り直される。
途中から代入しても振り直されるのは**代入より後ろの要素**。
ちなみに値重複も許されるが、意味はあまりない。

0を外すことも当然可能だが、既定値は0なので基本置いといたほうがいい。ちなみに既定値が無い状態でdefault(enumの型)を使い既定値を出すと、0になる。ただし型はintではなくenumのもの。
また、データ長が足りないなら`enum 列挙型名 : データ型名`とすることでbyteやlongを使える。そうそう足りなくなることはないが、**ビットフィールド**やるなら必要。

[【C#入門】enum(列挙型)の使い方総まとめ(文字列/int/foreach) \| 侍エンジニアブログ](https://www.sejuku.net/blog/50547)
[c# - What is the default value for enum variable? - Stack Overflow](https://stackoverflow.com/questions/4967656/what-is-the-default-value-for-enum-variable)

### 数値を得る
`(int)列挙型.変数` でキャスト。
### 文字列を得る
`列挙型.変数.ToString`。**switch文よりかなり遅いらしい**。
Enum.ToString()ならそれも大丈夫という話があるが。

[EnumオブジェクトのToStringメソッドはswitch文の100倍以上遅いのでILGeneratorで動的にswitch文を生成＆コンパイルして高速化する方法 - Qiita](https://qiita.com/higty/items/513296536d3b26fbd033)
[enumのToStringが遅いって本当ですか？【C#】【Unity】【拡張メソッド】【最適化】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/Enum_ToString_Speed)
### 数値を配列でもらう
`Enum.GetValues(typeof(列挙型))`。typeofはクラスの情報が入っているTypeクラスを呼ぶための演算子。
ForEachで使う場合は、ちゃんとintに入れないとobject型を返されてキャストが必要になる。
### 文字列を配列でもらう
`Enum.GetNames(typeof(列挙型))`。こちらはvar(型推論)でも大丈夫。
### 数値→列挙型
`(列挙型)数値`。そのままだと**列挙型にない数値もキャスト可能。** 数値がそのまま返され、エラーは出ない。
#### キャスト可能の判定
`Enum.IsDefined(typeof(列挙型), 数値)`。戻りはbool。
### 項目数
`Enum.GetValues(typeof(列挙型)).Length`。Namesの方でもいいけど戻り値サイズが違うのでこっちがいいかも。

[列挙型(C#) - 超初心者向けプログラミング入門](https://programming.pc-note.net/csharp/enum.html)

### ビットフィールド
enumにビット演算を足すことで、フラグ管理をしやすくする。フラグ管理の別名がビットフィールド。

```csharp
enum DayOfWeekFlags
{
    Sunday      = 1,    //0000_0001
    Monday      = 2,    //0000_0010
    Tuesday     = 4,    //0000_0100
    Wednesday   = 8,    //0000_1000
    Thursday    = 16,   //0001_0000
    Friday      = 32,   //0010_0000
    Saturday    = 64    //0100_0000
}
```

デフォルトのintは32ビットなので、32個までこの方法で格納できる。
最長はulongの実質128個だが、まあそれは数値を打つのも大変だし。

[整数数値型 - C# リファレンス \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/csharp/language-reference/builtin-types/integral-numeric-types)

#### 操作
| 式     | 用途                 | 備考                                                                      |
|--------|----------------------|---------------------------------------------------------------------------|
| a & b  | フラグの状態を調べる | 結果が0以外ならオン (調べるビットと同値ならオン)                          |
| a \| b | フラグを立てる       | 目的のフラグがすでにオンでも問題ない                                      |
| a & ~b | フラグを削除         | 目的のフラグがすでにオフでも問題ない なお「11111110」は「00000001」の反転 |
| a ^ b  | フラグを反転         | 目的のフラグがオンならオフ、オフならオン                                  |

#### FlagsAttribute
```csharp
[Flags]
enum DayOfWeekFlags
{
    Sunday      = 1,    //0000_0001
    Monday      = 2,    //0000_0010
    Tuesday     = 4,    //0000_0100
    Wednesday   = 8,    //0000_1000
    Thursday    = 16,   //0001_0000
    Friday      = 32,   //0010_0000
    Saturday    = 64    //0100_0000
}
```
ビットフィールドを使う際に付けることが推奨されている属性。`[Flags]`と書く。ビットフィールドの明示にもなる。
これがあると、数値→文字列変換した際に**組み合わせ文字列**になって出てくる。`A,B`とか。

#### HasFlag
前述のとおり&でフラグ状態は把握できるが、.NET Framework4以降なら`列挙型.変数.HasFlag(列挙型.変数)`で読める。
ちなみに、\|を使うとフラグが両方立った状態を調べられる。

[ビットフィールド(C#) - 超初心者向けプログラミング入門](https://programming.pc-note.net/csharp/bit2.html)

## コンストラクタ
```csharp
class A
{
	public A() : this(10){
	}
	
	public A(int a){
		Value = a;
	}
}

var inst = new A(); // <- OK
var inst2 = new A(10); // <- OK

```

忘れがち。public クラス名()。staticつけると初めて使われるタイミングで自動的に実行される。
privateをつけたコンストラクタは**あるだけで他のクラスからインスタンスを生成できなくさせられる。** staticメンバしか持たないクラスに最適。

[UnityC# クラスとインスタンスの作り方・コンストラクタの使い方 \| Unity入門の森　ゲームの作り方](https://3dunity.org/unity-introduction/unity-csharp-programming/class-constructor/#toc3)

## partial
巨大なクラスを見た目上分けて表示したいときに、classの前に付けるキーワード。内部では同じとみなされるので、変数も共有できる。
当然だが、クラス名はそれぞれで一致させること。

[コードの分割(C#) - 超初心者向けプログラミング入門](https://programming.pc-note.net/csharp/partial.html)

## デリゲート
関数を変数のように扱うためのデータ型を作る機能。
非同期処理になる。

基本的に引数で使うっぽい。

[【C#】デリゲートとは？実はとっても簡単な話。 \| ファンタジー好きのゲ制ブログ](https://doogms.com/463-2/)

これの嬉しいところは、**引数にすることで自分が書くべきでないコードを書かずに処理を進められる**ということ。このメソッドを他人に呼ばしたいな、でもここは向こうの仕様を知ってないと書けないな、というときに役立つ。
あと関数をまたぐ処理を纏められる。

## staticの落とし穴
というより考えたらわかるが、**staticの中からそのクラスのフィールドを使うことはできない。** だってまだ数値決まってねーもん。

## struct
classと比べて機能が制限されるが、小さなデータの処理に対しては早かったりするデータ構造。
大体**16バイト以下**が小さいという判定になるらしい。あと**継承は不可**なのでそこだけ気を付ける。

[構造体 - C# によるプログラミング入門 \| ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/resource/rm_struct/#new-or-default)

初期化方法
[C# - クラス配列の初期化｜teratail](https://teratail.com/questions/71423)

### 既定値
既定値を変えたい場合は、**コンストラクタ**をくっつけないと変えられない。この中でnew()に渡した引数を受け取って初期化する。

new()の代わりにdefault()で呼ぶと、全ての値が0やfalseなどの既定値の状態で呼べる。といっても、引数無しコンストラクタ(`int x = 10`みたいなの)が使えないため、実際はdefault()は引数無しnew()と同じものが返される。

C#10.0では引数無しコンストラクタ、すなわち`int x = 10`みたいなのが書けるようになったため、new()とdefault()が区別されるようになった。これをnew()で呼ぶと10になるが、default()で呼ぶと0になる。

[構造体の初期化: C#　プログラミング　再入門](http://dotnetcsharptips.seesaa.net/article/428850842.html)

### nullチェック
そもそもnullは(普通)そのポインタが指すものがないという意味であり、値型であるstructに**その概念はない。**
nullableを使えばできなくもないらしいが、そこまでするならclassを使えよ。

ただ、nullチェックをするというのはその構造体がちゃんとnewされているかを確認するという意味なので、**構造体のdefault値と比較する**という手法で疑似チェックはできる。
なおその場合、.equalsを使う。\=\=はstructに定義されてないっぽい。新しいC#なら定義されてるかも。

そのままdefault値と比較すると、全てが0やfalseになってる構造体と区別がつかない。
そのため、コンストラクタでtrueになるフラグを追加しておくと安全性が増す。……もうclassでいいのでは？

[c＃-構造体がインスタンス化されているかどうかを確認するにはどうすればよいですか？ - スタックオーバーフロー](https://stackoverflow.com/questions/12673440/how-can-i-check-whether-a-struct-has-been-instantiated)

### structの落とし穴
#### structとclassの基本
structはスタック(値型)、classはヒープ(参照型)メモリに作られる。
二つの違いはスタックが整理された積みで、ヒープが山積み。つまりスタックは一番上以外にアクセスするのがめんどくさく、ヒープはどこにでもアクセスできる。

で、structは=でコピーされる。関数を抜けると消える。classはアドレスが書き込まれる。関数を抜けてもメモリ上には存在する。

| / | struct | class |
| --- | --- | --- |
| メモリ | スタック(値型) | ヒープ(参照型) |
| = | コピーされる | 参照する |
| 関数を抜ける | 消える | メモリ上に残る(アクセスはできない) |

[値型と参照型](<../Others/CSandSR/値型と参照型.md>)

#### 実際

```csharp
struct T{ int _x; };

void Foo()
{
    var a = Bar(); # 1. Tのインスタンスをスタックに作成、名前はa
				   # 4. bのコピーをaに代入
}

T Bar()
{
    var b = new T(); # 2. Tのインスタンスをスタックに作成、名前はb
    return b; # 3. bのコピーをスタックに作成、名前なし
}
```

```csharp
class T{ int _x; };

void Foo()
{
    var a = Bar(); # 1. aという名前だけ用意
}				   # 3. アクセス名bをaに代入し、アクセス名aでもbの指すインスタンスにアクセスできるようになる

T Bar()
{
    var b = new T(); # 2. Tのインスタンスをヒープに作成、アクセス名はb
    return b;
}
```

classの=は「左辺が右辺の指すものを指すようになる」という挙動。

#### structと変更メソッド
それが何だというと。
structをstaticにし、returnで返そうとするときに**コンパイルが通らなくなる。** これは**C#では「関数の返す名前のないコピー」が変更不可**なため。ちゃんと代入して名前を付けると（正確には名前の付いたコピーを返すと）変更できる。`GetV().x = 3f`みたいなのが通らないという話。

コンパイル通らないなら安全じゃん、と思いきやstruct自体に変更メソッドがついてると、名前無しでも**それによる変更のコンパイルは通る。** しかもたちが悪いことに**実際の値は変更されない。**

#### structとプロパティ
じゃあ常に代入すれば安全かと思いきや、そうでもない。

struct内部にstructがあり、その内部structに変更メソッドがあった場合を考える。この時、ちゃんと代入すれば変更メソッドによる変更が通る。

ところがstruct内部に**プロパティstruct**が入ってると、これは**代入しても変更メソッドで変更できない。** なぜなら、プロパティは変数の振りをした**関数**だから。
関数なのでstructはコピーを返してしまう。そのため、それを代入して変更メソッドを使おうとも、コピーのほうが変更されるばかり、という状況になる。

#### じゃあどうすんだよ
そもそも**structに中身を変更する関数をつけるな。**
structの変数はコンストラクタが終わったら書き換え不能にするか、書き換えるならpublicにすればいい。可能なら前者。

#### structと配列
内部にstructを持ったstructを配列化し、そのうちの一つの要素を変数に代入したとする。この時、代入された変数から内部structを書き換えても配列の要素は変更されない。

それは当然だが、例えば内部structが四つくらいあると、いちいち要素を書くのは面倒くさいからと短い文字に代入してしまうことがある。もちろん何も変わらない。

対策としては内部struct変更用のメソッドを用意するという手があるが、先述したとおりやってはいけない。そこで**コンストラクタで指定してしまう**という手を使うことになる。短い。

だが、物によってはその四つのstructのうち一つだけ変更したくなることもあるわけで。このときはpublicを使うことになるが、コードは当然長くなる。

#### 長いのやだ
**じゃあstruct使うな。** 仕様上、structは長くなってしまう。
また、classと運用が変わるので考えることが増える。その面でもstructは使いにくい。structはclass内にprivateで定義するくらいがいいのかもしれない。

どうしても使う場合でも、**structを返すプロパティは実装しないこと。** Vector3とかもstructなので気を付けよう。


#### なぜstructはあるのか
**structはメモリ確保が高速。** ただし、コピーが少なめな時でないと実際の処理は早くならない。変数10個とか持ったstructだと一度のコピーでごっそり容量を食うので、止めといたほうがいいかも。

それでも使うならrefやoutを研究しておくこと。

#### 実際の速度について
structをkeyにして1000 * 1000回Dictionaryを使ってみる。
するとこれ、Add()でもTryGetValue()でもRemove()でもインスタンスを作る。Add()でなくともDictionaryはハッシュなので、ハッシュ値を計算（GetHashCode()）したり等しいか確認（Equals()）したりしなければならない。
で、この関数たちが使うのはstructではなく**class**。なので内部で自動的にstructがclassに変換されるのだが、この時にclassがnewされて遅くなる。6.63秒。

##### どうすんの
**System.IEquatable\<T\>** を実装。publicのEquals()を置くことで、内部で使われているEquals()を置き換えることが出来る。
えっ、実際のEqualsに何書くか？　コンストラクタでもらった値を確保してる変数の比較とか？ 4.37秒。

ちなみに、structはInterfaceしか継承できない。

GetHashCode()のほうはというと、`public override int GetHashCode(){return _x;}`みたいにオーバーライドするだけ。3.05秒。
..…だが、下手な値を返すとバグる。GetHashCode()は**等しいとみなされるものは同じ値を返さねばならない**(異なるものが同じ値を返すのはかまわない)ので、classで同じように書いてはいけない。なぜなら、classのGetHashCode()は**インスタンスが違うと値が違う**から。別にこれ一つなら問題ないけど、Equals()の実装と食い違うと問題になる。

##### ところでclassとくらべると
**3.28秒。** オーバーライドを使ってギリギリ抜けるとかいう。
なおメモリはstruct189MB→108MB→51.4MBに対して**129MB**。1000 * 1000やってこの差。

##### EX
SortedDictionaryやArray.Sort()とかだとまたほかの処理が要る。
このへんはまぁ、いいか。

newでヒープにインスタンスを作る処理はGC Allocと呼ばれる。
この処理、インスタンスを消す**GC Collectとセットである。** つまりいっぱいインスタンスが出来たら……

#### まとめ
structは中身を変更するメソッドをつけてはいけない。もう基本readonlyでは？
プロパティで呼んではいけない。
変更するならコンストラクタで。
それが嫌ならclassを使う。

[GC allocとは - Qiita](https://qiita.com/Syy12345-Unity/items/8c6351aaeca59b03d300)

[C#に潜むstructの罠 - KAYAC engineers' blog](https://techblog.kayac.com/trap-around-struct-in-csharp)


### Struct Design
**Microsoftの公式情報。**
C#に限った話じゃない。
#### 引数無しコンストラクタを使わない
C#は認めてない。
#### ミュータブル（変更可能）な値型を定義しない
それを渡したとして、開発者が変更を加えても、値型である以上元のデータに変更は加わらない。
それくらい知っとけよとなるかもしれないが、structとclassはソースを見るまでどちらか分からないし、人間はやらかすものなので、初めから定義しないのが吉。
#### 全てのデータがゼロ、false、nullなどであっても動くようにする
structのデフォルト値がそれなので。何かしらでstructがこれを出しても大丈夫なように作る。
#### IEquatable\<T\>を定義する
値型のデフォルトEqualsメソッドはObjectから継承しており、Objectは**参照型**なので[boxing](CS_and_SR/boxing.md)を起こす。また内部ではリフレクションを使用しているため遅い。
なので書き換えてやるのが推奨されている。
#### 値型（ValueType）を暗黙的に拡張しない
struct自体がValueTypeなんだから変なことすんなよ。
C#なら一応できるが、多くの言語では禁止されてる。
#### まとめ
小さく、単一で、変更不可な値群を纏めることにだけstructを使う。

[Struct Design - Framework Design Guidelines \| Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/struct)
### ref構造体
一部を書き換えられるメソッドをつけられる構造体。
というかこれよりもSpan\<T\>について調べたほうが早い。普段これを使うようなものはそう作らないが、よほど速度を詰めるときには必要になる。通信とか。

[Span\<T\>を使うべき5つの理由 - Qiita](https://qiita.com/aka-nse/items/cea3c6f91413c3582b5f)

## ref out in
### ref
**参照渡し**。

C#では**全ての引数は値として渡される。** つまりコピー。
それは引数を変更しても元の値には変更が反映されないことを意味する。

なのでrefをつけることにより、元の値を変更することが出来る。**構造体のコピーも作られない。**
これを使う場合は呼び出し側も関数の引数側もrefをつける必要があるので注意。

```csharp
private void FrmInRefOut_Load(object sender, EventArgs e)
{
    //値設定
    string str = "デフォルトの値";

    //関数呼び出し
    CallMsgRef(ref str);

    //メッセージボックス呼び出し
    MessageBox.Show(str);
}

private void CallMsgRef(ref string msg)
{
    msg = "refによる参照渡し";
}
```

[C# で参照によってオブジェクトを渡す \| Delft スタック](https://www.delftstack.com/ja/howto/csharp/pass-objects-by-reference-in-csharp/)

**ラムダ式内で使えないという罠がある。**
たぶんrefの保持範囲が一つの関数内でしかなく、ラムダなどを通って別関数を呼ぶとrefが消滅するため。
解決法は見つからないので、素直にフィールドに書こう。
[c# - Is there some trick to use 'out' parameters inside lambda function? - Stack Overflow](https://stackoverflow.com/questions/5539659/is-there-some-trick-to-use-out-parameters-inside-lambda-function)

**asyncでも使えない。** 罠多すぎぃ！
だがこちらは解決法がある。getterとsetterをFuncで引数にすれ……**結局ラムダでそれ定義するじゃん！**

[c# - ref and out arguments in async method - Stack Overflow](https://stackoverflow.com/questions/20868103/ref-and-out-arguments-in-async-method)
[c# - Ref in async Task - Stack Overflow](https://stackoverflow.com/questions/16664823/ref-in-async-task)

[コードインスペクション: 変更されたキャプチャー変数へのアクセス \| ReSharper](https://pleiades.io/help/resharper/AccessToModifiedClosure.html)
[Code Inspection: Access to modified captured variable \| ReSharper](https://www.jetbrains.com/help/resharper/AccessToModifiedClosure.html)
[クロージャ-C＃のループでキャプチャされた変数-スタックオーバーフロー](https://stackoverflow.com/questions/271440/captured-variable-in-a-loop-in-c-sharp)

C#7以降では、引数だけでなく様々なところでrefが使える。
C++でいうポインタ渡しみたいな感じ。
[参照渡し - C# によるプログラミング入門 | ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/sp_ref.html?p=2#ref-readonly)


### out
大体refで足りるのだが、outを使うときもある。
これは**まだ値が設定されていない変数を引数として取り、変更する時**に使う。

```csharp
private void FrmInRefOut_Load(object sender, EventArgs e)
{
    //値設定
    string str;

    //関数呼び出し
    CallMsgOut(out str);

    //メッセージボックス呼び出し
    MessageBox.Show(str);
}

private void CallMsgOut(out string msg)
{
    msg = "outによる参照渡し";
}
```

### in
引数を**参照渡し、かつ読み取り専用**にする。 意味合い的にはref readonly。[readonly](<#readonly>)
もともとコピーを渡してるわけだし、読み取り専用の目的である元の値が変更されないっていうのはもう既に達成されてない？　inって要らなくない？　という疑問。

しかしinの目的は読み取り専用であることを**明示する**こと。ソースコード上でこの値は変更しないよ、という情報を伝えるためにある。
また、refである以上**構造体を引数に取ってもコピーされなくなる**というのがあったりする。構造体を使うなら考えておくこと。


```csharp
private void FrmInRefOut_Load(object sender, EventArgs e)
{
    //値設定
    string str = "デフォルトの値";

    //関数呼び出し
    CallMsgIn(in str);

    //メッセージボックス呼び出し
    MessageBox.Show(str);
}

private void CallMsgIn(in string msg)
{
    msg = "inによる参照渡し";
}
```

[C# 参照渡し in ref out 違い \| ひろにもブログ](https://www.hironimo.com/prog/c-sharp/c-in-ref-out/)

## 関数内変数
初期値が要る。

## switch文
普段使ってるのはswitchステートメント。
switch文を使えば**単純な分岐は**スマートに書ける。C#8.0。

```csharp

//switchステートメント

private static void PrintDayOld(DayOfWeek day)
{
    string text;

    switch (day)
    {
        case DayOfWeek.Sunday:
            text = "休日";
            break;
        case DayOfWeek.Saturday:
            text = "だいたい休日";
            break;
        default:
            text = "まれに休日";
            break;
    }

    Console.WriteLine(text);
}
```

```csharp

//switch文

private static void PrintDayNew(DayOfWeek day)
{
    var text = day switch
    {
        DayOfWeek.Sunday => "休日",
        DayOfWeek.Saturday => "だいたい休日",
        _ => "まれに休日"
    };

    Console.WriteLine(text);
}
```

中身でメソッド実行したりするならステートメント。
文でやろうとしてみたけどうまくいかんかった。

[C# 8.0のswitch式 \| BOYISH KINGDOM](https://boyi.sh/2021/05/08/switch-expression-in-csharp-8/)
[is、switch の拡張 (型スイッチ) - C# によるプログラミング入門 | ++C++; // 未確認飛行 C (ufcpp.net)](https://ufcpp.net/study/csharp/datatype/typeswitch/?p=5#switch-expression)
[C# 8.0のswitch式が書きやすくなるコードスニペット - Qiita](https://qiita.com/soi/items/18f2e35f5672fde44a6f)
[条件分岐 - C# によるプログラミング入門 \| ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/st_branch.html)

## パターンマッチング
条件式の別の書き方。
ifの中でintとobjectを比較できたり、case文にケースガード無しで条件を追加できたりする。

[C# 9.0 で条件式が革命を起こす - Qiita](https://qiita.com/Zuishin/items/aac9f0dea33f96c265ac)
[パターン マッチング - C# によるプログラミング入門 \| ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/datatype/patterns/)
[選択ステートメント - C# リファレンス \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/csharp/language-reference/statements/selection-statements#the-switch-statement)
[Unity プロジェクトに C# 8.0, 9.0 を導入してみた](https://zenn.dev/tenonno/articles/bb36ee25e75669)

## レコード
クラスとよく似たC#9.0新機能。
嬉しいのは**違うインスタンス同士を比べてもtrueを返す**、**一部だけ値の違うコピーが作れる**。クラスと構造体のいいとこどりをしてくれる。

[【C# 9.0 新機能】レコード（record）型はクラスと比べて何がオトクなのか - Qiita](https://qiita.com/shimamura_io/items/80982b11ce41eca03e10)

さらにInitセッターを自動でつける機能も。プライマリコンストラクターといって、型宣言時にセッターを自動実装する。

欠点はクラスにその辺の機能を纏めて書いてあるので、その辺の機能を使わないならただの重いクラスであること。

[レコード型 - C# によるプログラミング入門 \| ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/datatype/record/)

C#10.0ではrecord structという謎機能も入った。
中身は値型だが一部だけ値の違うコピーを作れる。


## 可視性修飾子
| 修飾子              | 意味                                                         |
| ------------------- | ------------------------------------------------------------ |
| public (デフォルト) | プログラムのどこからでもアクセス可能                         |
| private             | そのクラスの内側からのみアクセス可能                         |
| protected           | そのクラスか、そのクラスを継承するクラスからのみアクセス可能 |
| internal            | 同じアセンブリの内側からのみアクセス可能                     |

[[Kotlin]クラスに可視性修飾子を設定する方法 | Output 0.1](https://pouhon.net/kotlin-cupsule/1500/)
kotlinのやつだけど、まあ大体どこも一緒だろう(慢心)

[アクセシビリティ レベル - C# リファレンス \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/csharp/language-reference/keywords/accessibility-levels)

また、structだとpublic, internal, privateしか使えない。そりゃ継承できないしな。

### internal
ちょっとわかりにくいので。
**同一アセンブリ内ならアクセス可能。** 外から見るとprivateだが、同一アセンブリ内からはpublic。Assembly-CSharpにまとめられるUnityでは、adf設定しないと使う意味がない。

Unityのライブラリを作る際にコンストラクタにくっつけたりすると、利用者が直接インスタンスを作ったりできなくなるので有用。
ただそうすると、テストが難しくなってしまうのでとあるコードをくっつけることでそれを介してアクセスする。
[【Unity】 Assembly Definition Files を使った上でinternalにアクセスする方法 - Qiita](https://qiita.com/toRisouP/items/156eb91dfe7e4a848dc3)

ちなみにリフレクションを活用しても可能。
ほぼ情報のない`InternalsVisibleToAttribute`というものを使う手もある。
もっと突っ込んだ`IgnoresAccessChecksToAttribute`では、**privateにすらアクセスできる。**

### protected internal
合わせ技。
中身はor。

### private protected
こちらはand。
internalじゃないが、**同一アセンブリのクラス内かつ派生クラスからのみアクセスできる。** C# 7.2以降。

## Timespan
秒数を




## sealed
**継承を禁じる機能。**
クラスに付けると継承できなくなる。
メソッドに付けると、継承するがoverrideされなくなる。そもそもvirtualがついてないとoverrideできないので、このsealedを使うのはサブクラスのサブクラス内でのみ。

[抽象クラスとシール クラス、およびクラス メンバー - C# プログラミング ガイド \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/csharp/programming-guide/classes-and-structs/abstract-and-sealed-classes-and-class-members)

仮想メンバー→virtualメンバ

## タプル型
一つの値の中に複数の数値を入れられる機能。C#7.0。
これをリストにすると、**複数の型が扱える**リストが作れる。が、シリアライズ非対応。

[タプル型 - C# リファレンス \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/csharp/language-reference/builtin-types/value-tuples#tuples-vs-systemtuple)
[C#7のタプルの使いどころ - デーコムラボ](https://www.dcom-web.co.jp/lab/cs/how_to_use_cs7_tuple)

## Dictionary
### keyが無いときにデフォルトを返す拡張
[keyが存在しない場合はデフォルト値を返すDictionaryの拡張 - Qiita](https://qiita.com/divideby_zero/items/cd6f0c901a434bc891be)

### Dictionaryの最初の要素を取り出す
FirstOrDefaultを使う。
これは指定したものを\[0\]から見ていって最初に一致したものを取り出すメソッド。
後ろからやるLastOrDefaultもある。
[【C#】Dictionary の最初の要素を取得する方法 - コガネブログ](https://baba-s.hatenablog.com/entry/2019/09/09/214800)
[Enumerable.LastOrDefault メソッド (System.Linq) \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/api/system.linq.enumerable.lastordefault?view=net-6.0#System_Linq_Enumerable_LastOrDefault__1_System_Collections_Generic_IEnumerable___0__)

### 逆引き
`Dict.FirstOrDefault(x => x.Value.Equals(t)).key`で全検索。Dictは任意のDictionary。
これを一般化するとこうなる。
```csharp
//Dictionaryとvalueを設定し、Dictionaryを最初から逆引きして最初にヒットしたものを返す
private K reverseDictSearch<K, V, Dict>(Dict d, V t) where Dict : SerializableDictionaryBase<K, V>
{
 return d.FirstOrDefault(x => x.Value.Equals(t)).Key;
}
```

where DictがないとFirstOrDefaultが使えない。
呼出し側がすごく長くなるが、短くしたいならもっと検索して。

```charp
haveItem = reverseDictSearch<ItemNamesEnum, GameObject,
 SerializableDictionaryBase<ItemNamesEnum, GameObject>>(itemNamesDict, i);
```

[\[C#\] Dictionaryの逆引き \| ftvlog](https://ftvoid.com/blog/post/760)

## 例外
方針
[C# の例外メモ - Qiita](https://qiita.com/inabe49/items/1af782f2a44a86c72e4e)

## 文字列連結
+、String.Concat、StringBuilder.Append、Sring.Joinの四通りが使える。
高速なのはStringBuilder.Append、Sring.Join。
StringBuilderはあくまで編集領域。
String.Joinは文字列配列を連結するためのもの。

[【C#入門】文字列を連結する方法まとめ(+演算子/Concat/Append/Join) \| 侍エンジニアブログ](https://www.sejuku.net/blog/50133)
[意外と知られてないStringBuilderに関する初歩的なTips【Java・C#】 - Qiita](https://qiita.com/sugaryo/items/109927292eda6410137b)


## リストにしたクラスのContainsが一致しない
クラスは参照型なので、別インスタンスは値が同じであっても別とみなされる。
structを使う。

[C# で二つのオブジェクトを比較する - Qiita](https://qiita.com/Zuishin/items/62c5b726bfa589b3fb9b)
[\=\=演算子とEqualsメソッドの違いとは？［C#］：.NET TIPS - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/1802/28/news028.html)
## using
使い方が4つある。
### usingディレクティブ
いつもの。
`using 名前空間`とすれば、名前空間の指定なしでクラスを呼び出せる。
### usingエイリアスディレクティブ
派生。
`using エイリアス = 名前空間`とすることで、エイリアスでクラスを出せる。
### using静的ディレクティブ
C#6.0。
`using static 名前空間.クラス`とすることで、クラスの呼出しすら省略して静的メソッドを呼び出せる。
また、これは列挙型にも適用可能。
### usingステートメント
ちょっと毛色の違う使い方。
GCを自前でやる、つまりアンマネージドリソース（ファイルなど）を扱う際、いつもはtry-catch-finallyで開け閉めを書く必要があった。
（じゃないと気まぐれなGCがメモリを破棄するまでアンマネージドリソースにアクセスできなくなる。よくファイルにアクセスできなくなるのはこのせい）

ここで、開く処理をusingで囲う。するとこの時点で**自動的にリソース破棄用のILが定義される。**
ただしこれはIDisposableを実装していないと使えない。

```csharp
class TestProgram
{
    static void Main(string[] args)
    {
        using (FileStream fs = new FileStream("hoge.txt", FileMode.Open, FileAccess.Read, FileShare.None))
        {
            Console.WriteLine(fs.Length);
        }
    }
}
```

なおC#8.0からは、代入する変数にusingをつけるだけで使える。楽。
```csharp
class TestProgram
{
    static void Main(string[] args)
    {
        using var fs = new FileStream("hoge.txt", FileMode.Open, FileAccess.Read, FileShare.None);
        Console.WriteLine(fs.Length); 
    }
}
```
だが下のusing変数には罠があり、**変数のスコープに基づいてメモリ解放タイミングが決まっている。** たとえばMain関数内でファイルを開くと、Main関数が終わるまでメモリが解放されずファイルが開けない。

その対策として、**ファイルを開く処理だけ関数を切り出す**という手が推奨されている。
```csharp
using System;
using System.IO;
using System.Threading;

class Program
{
    static void Main()
    {
        var content = ReadToEnd("sample.txt");

        // すごく長い処理。ここでは Sleep で代用。
        Thread.Sleep(5000);

        Console.WriteLine(content);
    }

    private static string ReadToEnd(string path)
    {
        using var s = new StreamReader(path);
        return s.ReadToEnd();
        // s.Dispose はここで呼ばれる。
    }
}
```

[【C#】usingの色々な使い方 - Qiita](https://qiita.com/4_mio_11/items/145c658078a7fe5f36a7)
[C# Tips －usingを使え、使えったら使え(^^)－](https://divakk.co.jp/aoyagi/csharp_tips_using.html)
[リソースの破棄 - C# によるプログラミング入門 \| ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/oo_dispose.html#using-declaration)

## implicit, explicit
自作クラスに既存クラスとの型変換を実装する際につかうやつ。

[暗黙的・明示的型変換を実現するimplicitとexplicitの特徴と使用方法 - Qiita](https://qiita.com/4_mio_11/items/e8da0527772dd907c3fd)
## ??
null合体演算子。もし左側がnullのとき、右側を返す。
C#8.0以降だと、??=が使える。代入するものがnullの時だけ代入する。
ちなみに、二つ以上並べると**右側が優先される。**

```csharp
public class HogePiyo : MonoBehaviour
{

    // 現在存在しているオブジェクト実体の記憶領域
    static HogePiyo _instance = null;

    // オブジェクト実体の参照（初期参照時、実体の登録も行う）
	//nullの時、全てのオブジェクトからこのクラスを探す
	//それでも存在しないときだけnull
    static HogePiyo instance
    {
        get{ return _instance ?? (_instance = FindObjectOfType<HogePiyo>()); }
    }

    void Awake()
    {

        // ※オブジェクトが重複していたらここで破棄される

        // 自身がインスタンスでなければ自滅

		//自分がインスタンスでないなら、FindObjectOfTypeにより自分と別のインスタンスがinstanceに入る
        if (this != instance)
        {
            Destroy(gameObject);
            return;
        }

        // 以降破棄しない
        DontDestroyOnLoad(gameObject);
    }

    void OnDestroy()
    {

        // ※破棄時に、登録した実体の解除を行なっている

        // 自身がインスタンスなら登録を解除
        if (this == instance) _instance = null;

    }

}
```

[?? および ??= 演算子 - C# リファレンス | Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/csharp/language-reference/operators/null-coalescing-operator)
[[Unity]DontDestroyOnLoadでオブジェクトが増えていく - Qiita](https://qiita.com/weakboar/items/cfc922392542c66db43a)
## readonly
付けた**変数**を読み取り専用にする……のだが、参照型に付けても値型に付けても落とし穴を持つトラブルメーカー。
でもよく見たら当然の帰結なので、分かってしまえば問題はない。
(クラス型のインスタンスは変数。混乱しないように)

C#7.2以降では、変数に加えstructにも付くようになった。
なんで？　というのは対値型を見れば納得する。

ちなみに、お仲間に付けた**引数**を参照、かつ読み取り専用にするin修飾子というものがある。
これはこちらを参照。
[in](<#in>)

[readonly の注意点 - C# によるプログラミング入門 | ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/resource/readonlyness/#readonly-struct)

### 対参照型
**内部フィールドまではreadonlyにならない。** readonlyは再帰的につかない。

readonlyで参照型のインスタンスを作ると、そのインスタンス**自体**は変更不可になる。
しかし、参照型の持つフィールドについてはreadonlyにはならない。具体的には、例えばクラスのインスタンスをreadonlyで作ると、**そのreadonlyインスタンス内のフィールドは書き換え可能**。直接、プロパティ、書き換えメソッド全て通る。

```csharp
// 書き換え可能なクラス
class MutableClass
{
    // フィールドを直接公開
    public int X;

    // 書き換え可能なプロパティ
    public int Y { get; set; }

    // フィールドの値を書き換えるメソッド
    public void M(int value) => X = value;
}

class Program
{
    static readonly MutableClass c = new MutableClass();

    static void Main()
    {
        // これは許されない。c は readonly なので、c 自体の書き換えはできない
        c = new MutableClass();

        // けども、c の中身までは保証してない
        // 書き換え放題
        c.X = 1;
        c.Y = 2;
        c.M(3);
    }
}
```

対策としては、内部フィールドにもreadonlyを付けるか、プロパティの場合はget-onlyにするか。

### 対値型
####  基本
**書き換えメソッドはコンパイルが通るが書き換えられない。**

データを直接持つため、インスタンス作成時に付けるだけで**内部フィールドまでreadonlyになる**。インスタンスとフィールドの直接書き換えは不可。

ただし、書き換えメソッドには注意。書き換えメソッドを呼び出す記述は**コンパイルが通る。**
なのに**実際はコピーした値を書き換えているだけなので、改めて値を呼び出しても変更されていない。** これはreadonlyであることを保証しつつメソッドを呼び出せるようにするための仕様であり、**防衛的コピー(defensive copy)** あるいは **隠れたコピー(hidden copy)** と呼ばれる。隠れてるので`c.X`で見つけることは出来ない。

変更してるのに変更されてないというのは問題だが、実はこの隠れたコピーもまた問題。
こちらの問題のトリガーは**通常の構造体のreadonlyインスタンスのメソッドを呼ぶこと**なので、別に値書き換えでなくとも**メソッドを呼び出した時点でコピーが起きる。**
仕様上仕方ないが、コピーが出来てるのは確かなので、大きい構造体相手などコピーを作るとまずい奴でこれをやらかすとメモリ的に問題になる。いっそメソッドではなくフィールドを直接書き換えたほうがいいとき迄ある。

ちなみにこのインスタンスを変数に代入すると、当然コピーが作成される。
そちらで改めて書き換えメソッドを呼び出すと、そのコピーの値は変更されている。
……すでにコピーされてると再度コピーはされないのか？

```csharp
using System;

// 書き換え可能なクラス
struct MutableStruct
{
    // フィールドを直接公開
    public int X;

    // フィールドの値を書き換えるメソッド
    public void M(int value) => X = value;
}

class Program
{
    static readonly  MutableStruct c = new MutableStruct();

    static void Main() => Allowed();

    private static void NotAllowed()
    {
        // これはもちろん許されない。c は readonly なので、c 自体の書き換えはできない
        c = new  MutableStruct();

        // 構造体の場合、フィールドに関しては readonly な性質を引き継ぐ
        c.X = 1;
    }

    private static void Allowed()
    {
        // でも、メソッドは呼べてしまう
        c.M(3); // X を 3 で上書きしているはず？

        Console.WriteLine(c.X); // でも、X は 0 のまま

        //↑のコードは、実はコピーが発生している
        // 以下のコードと同じ意味になる

        var local = c;
        local.M(3);

        Console.WriteLine(c.X); // 書き換わってるのは local (コピー)の方なので、c は書き換わらない(0)

        Console.WriteLine(local.X); // もちろんこっちは書き換わってる(3)
    }
}
```

[structの落とし穴](<#structの落とし穴>)

対策はそもそも構造体に書き換えメソッドを実装しないのが無難。
C#7.2以降で使えるなら後述のreadonly structを使ったほうがいい。防衛的コピーも発生しない。
C#8.0以降ならstructでもメンバーにreadonlyを付けられる。

その目的で使うにはめんどいが、ref structを使っても防衛的コピーは発生しないらしい。

[【C#】構造体の防衛的コピーについて - 滅入るんるん](https://blog.meilcli.net/2018/08/c.html)

#### ハッキーな問題点
readonlyで書き換えメソッドは機能しないのにエラーにならない、という理解で概ね正しい。
だが、一応**書き換えメソッドを機能させることは出来る。** ただし、これをやると**readonlyのフィールドも変更できてしまう**ので実用性は無い。

また、**readonly structではこの問題は起こせない。**
thisもreadonlyになるので。

```csharp
using System;

struct Point
{
    // フィールドに readonly を付けているものの…
    public readonly int X;
    public readonly int Y;

    public Point(int x, int y) => (X, Y) = (x, y);

    // this の書き換えができてしまうので、実は X, Y の書き換えが可能
    public void Set(int x, int y)
    {
        // X = x; Y = y; とは書けない
        // でも、this 自体は書き換えられる
        this = new Point(x, y);
    }
}

class Program
{
    static void Main()
    {
        var p = new Point(1, 2);

        // p.X = 0; とは書けない。これはちゃんとコンパイル エラーになる

        // でも、このメソッドは呼べるし、X, Y が書き換わる
        p.Set(3, 4);

        Console.WriteLine(p.X); // 3
        Console.WriteLine(p.Y); // 4
    }
}
```

構造体内部ではthisで自分を呼び出せるので、thisに再度コンストラクタを通したものを代入し自分を書き換えるという荒業。
やらなければ問題はないが、意図的に問題を起こせるということは押さえる。


ちなみにこの問題を起こせないだけで、readonly structでもメソッドを通して変更する方法は存在する。

```csharp
    static class ReadOnlyValueExtension
    {
        public static void Method(ref this ReadOnlyValue<int> value)
        {
            value = new ReadOnlyValue<int>(10);
        }
    }
```

拡張メソッドを参照渡しで定義し、外部からメソッドを直接書き加えればいい。
やっぱり実用性は無い。

[【C#】readonly structの値をメンバーメソッドを呼んで変更しているように見せる方法 - 滅入るんるん](https://blog.meilcli.net/2018/09/creadonly-struct.html)

#### readonly struct
structにreadonlyがついたもの。特徴がいくつかある。
1. **フィールドにreadonlyを付けることを強制する。**
	- ただしget-onlyプロパティは内部のフィールドがreadonlyなので問題ない。
2. thisがreadonlyになる。
	- 前述のthis書き換えを封じる。
3. **防衛的コピーが発生しない**。

```csharp
using System;

// 構造体自体に readonly を付ける
readonly struct Point
{
    // フィールドには readonly が必須
    public readonly int X;
    public readonly int Y;

    public Point(int x, int y) => (X, Y) = (x, y);

    // readonly を付けない場合と違って、以下のような this 書き換えも不可
    //public void Set(int x, int y) => this = new Point(x, y);
}

class Program
{
    static void Main()
    {
        var p = new Point(1, 2);

        // p.X = 0; とは書けない。これはちゃんとコンパイル エラーになる
        // p.Set(3, 4); みたいなのもダメ

        Console.WriteLine(p.X); // 1 しかありえない
        Console.WriteLine(p.Y); // 2 しかありえない
    }
}
```

##### readonly structでの防衛的コピー回避
呼出し自体は相変わらず通るが、**値のコピーはされなくなる**。

```csharp
using System;

// 作りとしては readonly を意図しているので、何も書き換えしない
// でも、struct 自体には readonly が付いていない
struct NoReadOnly
{
    public readonly int X;
    public void M() { }
}

// NoReadOnly と作りは同じ
// ちゃんと readonly struct
readonly struct ReadOnly
{
    public readonly int X;
    public void M() { }
}

class Program
{
    static readonly NoReadOnly nro;
    static readonly ReadOnly ro;

    static void Main()
    {
        // readonly を付けなかった場合
        // フィールド参照(読み取り)は問題ない
        Console.WriteLine(nro.X);

        // メソッド呼び出しが問題。ここでコピー発生
        // (呼び出し側では、「M の中で特に何も書き換えていない」というのを知るすべがないので、防衛的にコピーが発生)
        nro.M();

        // readonly を付けた場合
        // これなら、M をそのまま呼んでも何も書き換わらない保証があるので、コピーは起きない
        ro.M();
    }

    // これも問題あり(コピー発生)
    // in を付けたので readonly 扱い → M を呼ぶ際にコピー発生
    static void F(in NoReadOnly x) => x.M();

    // こちらも、readonly struct であれば問題なし(コピー回避)
    static void F(in ReadOnly x) => x.M();
}
```

#### readonly≒immutable
対参照型でもやったが、readonlyで読み取り専用になるのはあくまで**readonlyがついた変数**。
そのため、例えば変数をin引数として渡したとき、その実行中に元の変数が書き換わるとreadonlyだろうと変更される。

```csharp
using System;

class Program
{
    static void Main()
    {
        _value = 0;
        ByVal(_value); // 0, 0

        _value = 0;
        ByRef(_value); // 0, 1
    }

    // 書き換えできるフィールド
    static int _value;

    // 値渡し = コピー なので、 _value 書き換えの影響は受けない
    static void ByVal(int value)
    {
        Console.WriteLine(value);
        _value++;
        Console.WriteLine(value);
    }

    // 参照渡しなので、 _value 書き換えの影響を受ける
    // in (ref readonly) であっても、immutable ではない
    // value を通して書き換えない保証があるだけで、別経路で書き換わることに対しては無力
    static void ByRef(in int value)
    {
        Console.WriteLine(value);
        _value++;
        Console.WriteLine(value);
    }
}
```

#### readonly関数メンバー
C#8.0。クラスのと同じ。
構造体全体を読み取り専用にしたくない、フィールドは直接書き換えられるようにしたいがプロパティでは書き換えたくない、そんなときに使う。
**書き換えないことを明示できる**ほか、**防衛的コピーの抑止**にもなる。積極的に使おう。

```csharp
// 構造体自体は readonly にしない。
// フィールドは書き換えたい
struct NonReadOnly
{
    public float X;
    public float Y;

    // でも、このプロパティ内ではフィールドを書き換えない
    public float LengthSquared => X * X + Y * Y;
}

// NonReadOnly との差は LengthSquared の readonly の有無だけ
struct ReadOnly
{
    public float X;
    public float Y;

    // readonly 修飾でフィールドを書き換えないことを明示
    public readonly float LengthSquared => X * X + Y * Y;
}

class Program
{
    // こっちは、LengthSquared 内での X, Y の書き換えを恐れて隠れたコピーが発生する。
    static float M(in NonReadOnly x) => x.LengthSquared;

    // こっちは、LengthSquared に readonly が付いているのでコピー発生しない。
    static float M(in ReadOnly x) => x.LengthSquared;

    static void Main(string[] args)
    {
        M(new NonReadOnly { X = 1, Y = 2 });
        M(new ReadOnly { X = 1, Y = 2 });
    }
}
```


#### 防衛的コピーパターン
今まではreadonlyインスタンスから非readonlyメソッドを呼ぶときに防衛的コピーを起こしていた。その抑止のために、構造体をreadonlyにしたりreadonlyメソッドにしたりしていた。

つまりとりあえず中身にreadonlyを付けておけば防衛的コピーが起きない、とはいかず。
実は、加えて**readonlyメソッドから非readonly構造体の非readonlyメソッド**を呼んでもコピーが作られる。

たとえreadonlyでも、中でreadonlyではない構造体を使うときは気を付ける。


```csharp
using System;

struct A
{
    public int Value;
    public void Increment() => Value++;
}

struct B
{
    public A A;

    // A の非 readonly メンバーを呼ぶ。
    public void Mutable() => A.Increment();

    // Mutable との差は readonly 修飾が付いてるだけ。
    // this が書き換わらないように、A のコピーが作られる。A 自体には変化が起きない。
    public readonly void Immutable() => A.Increment();
}

class Program
{
    static void Main()
    {
        var b = new B();
        Console.WriteLine(b.A.Value); // 初期状態: 0

        b.Mutable();
        Console.WriteLine(b.A.Value); // 意図通りの書き換え: 1

        b.Immutable();
        Console.WriteLine(b.A.Value); // 書き換わらない: 1 (Immutable の中で A のコピーが発生)
    }
}
```

#### ref readonlyとreadonly関数メンバー
ref readonly => 返り値は読み取り専用の参照。
readonly ref=> 内部で扱うフィールドは書き換えない。防衛的コピーを発生させない。返り値は参照。**なので返り値が外部で書き換わってても問題ないことを主張する。**
readonly ref readonly => 内部で扱うフィールドは書き換えない。防衛的コピーを発生させない。返り値は読み取り専用の参照。

```csharp
struct S
{
    public int[] _value;

    // これは、読み取り専用参照を返すという意味。
    // _value 配列の中身が書き換わってもらっては困る。
    public ref readonly int X => ref _value[0];

    // これは、S 内のフィールド(この場合 _value) を書き換えないという意味。
    // _value 配列の中身が書き換わろうと知ったことではない。
    public readonly ref int Y => ref _value[0];

    // これは、上記2つの両方の意味。
    // _value 自体も書き換わらないし、_value の中身を書き換えてもらっても困るとき用。
    public readonly ref readonly int Z => ref _value[0];
}
```

## 可変長引数
配列を渡す際、paramsをくっつければ、**わざわざ配列にしなくても値を渡した時点で内部で配列にしてくれる**機能。
記述量が減る。

定義側の例：`int Sum(params int[] args) { ... }`
利用側の例：`Sum(1, 2, 3, 4, 5);`… これで、`Sum(new int[] { 1, 2, 3, 4, 5 });`と同じ意味。

[可変長引数 - C# によるプログラミング入門 | ++C++; // 未確認飛行 C](https://ufcpp.net/study/csharp/sp_params.html)

## 抽象クラス
別にここだけじゃないが。
多くのクラスに共通する点を記述する、インスタンス化不能のクラス。Abstract classとも。
共通するというのはその点の名前だけでもいい。というか、それを共通化して記述できるのが抽象クラスの本領。残りはただのクラスなので、ここに記述したものはこれを継承したものすべてに同じ記述が入る。タグで一括管理するのに似ている。