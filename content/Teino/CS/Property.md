---
date: 2021-10-04 21:46:45
tags:
 - Program/CSharp
 - Fragment
---


## Property
Accesserを簡略化して書ける記法。一言で言うと変数を関数のように扱える機能。
**publicメンバを呼び出した時、及びそこへ書き込んだ時の動作を規定できる**。

```Csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoloLearn
{
    class Program
    {
        class Person
        {
            private string name;
            public string Name
            {
                get { return name; }
                set { name = value; }
            }
        }
        static void Main(string[] args)
        {
            Person p = new Person();
            p.Name = "Bob";
            Console.WriteLine(p.Name);
        }
    }
}
```

一見PersonクラスのNameに書き込んでいるように見えて、その実get{}を通りprivateメンバのnameに書き込んである。
逆説的に、**Nameを通らないとnameに書き込めない**ように出来るのがこの機能、というかAccesserの目玉。Encapsulationの体現。Propertyはそれを書きやすく見やすくしただけ。
(本来なら1つのprivateメンバにつきgetter用メンバとsetter用メンバを別々に定義しないといけない)


しかし、この書き方だと**Privateメンバいらなくね？** となる。
本当はいろいろと条件や処理を書き加えられるのだが、この例ではPersonクラスを使う側から見た時、ただのpublicのNameメンバを使っているのと使用感が何ら変わらない。機能だけを見るなら、public string Name; と書いたほうが行数が少なく済む。
それでもこの例が使われているなら、それは**今は処理が必要ないが、あとで思いついたら書き加えたい**という意味のメモである。Privateメンバはそのメモに必要なフォーマットとして書かれているだけなのだ。
じゃあ、フォーマットを変えれば短くできるな。この考えは正しい。実際、その為の書き方がある。

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoloLearn
{
    class Program
    {
        class Person
        {
            public string Name { get; set; }
        }
        static void Main(string[] args)
        {
            Person p = new Person();
            p.Name = "Bob";
            Console.WriteLine(p.Name);
        }
    }
}
```

このように書けば、書き加える意思を置いておける。
ちなみにこうしてもプロパティとしての役割はしっかり果たしており、**Nameを通らないとNameに書き込めない。** (というか、実は内部ではpublicではなく**アクセス機能が付いたprivate変数**として読み込まれてる)
普通はそんなの意識しないが、**Unity**では話が別。**Inspectorに映らなくなる。**(HideInInspectorとかSystem.NonSerializedでいいじゃんとは思う)

他に嬉しい点として、**クラス内の変更のみでメソッドを追加できる。** 後から処理を増やすときに、その値を使っている処理すべてにメソッドを書き加える、といった大規模な変更は必要ない。
**ただし、内部ではprivate変数になるので扱いが変化する。その反映のためにリコンパイルは必要。**

ちなみに、この中ではconst変数しか使えない。
そりゃプロパティ内じゃその変数が何かわからないからな。

[【C#】なぜpublicなメンバではなくプロパティを使うのか - Qiita](https://qiita.com/TomoProg/items/920e56ef5c3ae1fa9901)