---
date: 2021-11-09 12:19:39
tags:
 - Program/CSharp
 - Fragment
---

## Csharp List
別リストと被らずに合体するUnionは何かに使えそう。
[【C#入門】Add、RemoveでListの要素を追加、削除する方法 \| 侍エンジニアブログ](https://www.sejuku.net/blog/41093)
[\[C#\] リスト（List）の使い方まとめ](https://yaspage.com/prog/csharp/cs-list/#toc12)

### 配列リスト変換
Array.ToList()で変換できる。
ただし、using System.Linq;が必要。

Linqナシなら、new List\<Type\>(Array)。Listのコンストラクタにarrayを渡せばいい。

List.AddRange(array)で放り込むのも手だが、この場合Listは事前にnewしないといけない。

[C# で配列をリストに変換する \| Delft スタック](https://www.delftstack.com/ja/howto/csharp/array-to-list-in-csharp/)
[c＃-System.Arrayからリストへの変換-スタックオーバーフロー](https://stackoverflow.com/questions/1603170/conversion-of-system-array-to-list)

### List.Foreach(array, Action)
配列を繰り返せるメソッド。
ただ繰り返すだけでなく、それに対する何らかの操作を突っ込まないと動かない。(まあ、ただ繰り返したいだけとか無いし)
Listの数値を使いたいときはc => Debug.Log(c)などのようにラムダ式で追加する。

そもそもこれを拡張するという手もある。
[【C#】Array.ForEachを拡張メソッドでスマートに書く - コガネブログ](https://baba-s.hatenablog.com/entry/2014/03/19/195402)

ちなみに、LINQだともっと自由に返せる。
[Listの各要素を処理するには？［C#／VB］：.NET TIPS - ＠IT](https://www.atmarkit.co.jp/ait/articles/1703/08/news027.html)