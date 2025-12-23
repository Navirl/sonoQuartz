---
date: 2021-10-04 21:48:01
tags:
 - Program/CSharp
 - Fragment
---

## Indexer
大体property。メンバではなく、インデックスを通したときの動作を規定できる。
これにより、**あたかもクラスを配列化したかのように内部のメンバを扱える。** 利点は……記述量の減少？

```CSharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoloLearn
{
    class Program
    {
        class Clients {
            private string[] names = new string[10];
            public string this[int index] {
                get {
                    return names[index];
                }
                set {
                    names[index] = value;
                }
            }
        }
        static void Main(string[] args)
        {
            Clients c = new Clients();
            c[0] = "Dave";
            c[1] = "Bob";
          
            Console.WriteLine(c[1]);
        }
    }
}
```

メンバ名はthisでないと動かない。また、インデックスの数字を代入する変数も定義すること。