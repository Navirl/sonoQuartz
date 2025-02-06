---
tags:
  - Info
---

daily:: [2025-01-22](../Daily_Note/2025-01-22.md)
up:: [Go](<../Bar/Program/Go.md>)

[クラスとオブジェクトの関係性（Go 言語編） #オブジェクト指向 - Qiita](https://qiita.com/spiegel-im-spiegel/items/2da5e5902aa2cb6d9e30)
[Go - メソッドとレシーバ #プログラミング - Qiita](https://qiita.com/Yuuki557/items/e9f5bdfbbfe92973a05e)

goには他言語でいうクラス(データと振る舞いを一纏めにしてカプセル化するやつ)がない。
代わりに構造体(データ)とそれに付与されたメソッド(振る舞い)がある。

構造体はtype句を使って名付けする。

メソッドは関数に「どの構造体に付与するか」の情報がついたもの。
この情報はレシーバと呼ばれ、func句のすぐ後にくっつく。

```go
package main

import (
  "fmt"
)

type Square struct {
  width  float64
  height float64
}

func (s Square) Area() float64 {
  return s.width * s.height
}

func main() {
  square := Square{3.0, 4.0}
  fmt.Println(square.Area())
  // output: 12
}
```

さらにレシーバにはポインタを使うことができる。ポインタレシーバ。
まず先程のレシーバは値レシーバ。コピーされるためもとの値を書き換えない。
ポインタレシーバは直接元の値を書き換える。その分コピーコストがかからず軽い。