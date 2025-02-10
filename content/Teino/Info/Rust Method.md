---
date: 2023-03-11
tags:
 - Info
---

up:: [Rust](<../Bar/Program/Rust.md>)

構造体に紐づけたメソッドのこと。
implをつけ構造体と同じ名前で定義する。

複数作っても問題ない。
implブロック内に関数は複数入れられるので、単純に分割することに意味はないものの、Traitを使うときに効果を発揮する。

[Rust Traits](<./Rust Traits.md>)

```rust

#![allow(unused)]
fn main() {
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
}

```

メソッドから構造体にアクセスする場合は、`&self`を引数に追加して受け取る。

[メソッド記法 - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch05-03-method-syntax.html)
