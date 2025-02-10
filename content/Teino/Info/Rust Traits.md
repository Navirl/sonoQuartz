---
date: 2023-03-11
tags:
 - Info
---

up:: [Rust](<../Bar/Program/Rust.md>)

[interface](<./インターフェース.md>)

インターフェースみたいなやつ。
違いはインターフェースが生産性や表現力を目的にして導入された一方、traitsは**安全性と並行性**を目的に導入している。だからデフォルトで実装を置いておけるし、


というわけでデフォルト実装。引数として受け付ける場合は`item: &impl summary`などimplを付けて作成しないといけないこと。

`impl 実装名 for traits`ごとに一つのtraitsしか実装できない。交じるのを回避してるんだろう。

ちなみにimpl Trait構文は糖衣構文。
以下二つの構文は同意。

```Rust
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

```rust
pub fn notify<T: Summary>(item: &T) {
    // 速報！ {}
    println!("Breaking news! {}", item.summarize());
}

```

下の構文はトレイト境界と呼ばれる。ジェネリックを使いつつ、そのジェネリック型をTraitで制限するというもの。
基本的に上のでいいが、下は書き方が違う分ちょっと幅が広がる。
以下は微妙に違う文。

```rust
pub fn notify(item1: &impl Summary, item2: &impl Summary) {
```

```rust
pub fn notify<T: Summary>(item1: &T, item2: &T) {
```

上はSummaryさえ実装していれば二つの引数が違っていても受け付けるが、下は二つが違っているとエラーになる。

複数のトレイトを実装している型を求めるなら、`+`でくっつける。

```rust
pub fn notify(item: &(impl Summary + Display)) {
```

```rust
pub fn notify<T: Summary + Display>(item: &T) {
```

あまりにトレイト実装の文が長くなる場合は、`where`で纏めて書ける。

```rust
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {
```

```rust
fn some_function<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{
```

戻り値でトレイトを返すときも、impl Traitで返せる。
ただしその方法で返せるのは一種類の型のみ。トレイト実装しているからと二つの型を同時に返そうとするとエラーになる。一応やり方はあるらしいが。

implブロックを複数用意し、別のトレイト境界を与えれば、構造体を使うときに入れる型によって実装を条件分けできる。

```rust

#![allow(unused)]
fn main() {
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
}

```
他にも、あるトレイトを実装するあらゆる型に対してトレイト実装を条件分けすることもできる。これはブランケット実装呼ばれ、以下のように書かれる。

```rust
impl<T: Display> ToString for T {
    // --snip--
}
```

```rust
```
```rust
```