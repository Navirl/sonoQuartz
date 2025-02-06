---
tags:
 - Info
aliases: Rust 参照と借用
---

daily:: [2023-03-09](/Daily_Note/2023-03-09.md)
up:: [Rust](../Bar/Program/Rust.md)

[Rust Ownership](Rust%20Ownership.md)

値のアドレスを参照する変数。
参照はアドレスを渡すものなのでムーブされない。この参照渡しのことを**借用**と呼ぶ。

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    // '{}'の長さは、{}です
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

なお、普通にやると参照した値を内部で変更することは出来ない。
mutが無い限り変数は標準で不変であることと同様に、参照は不変。

変更したい場合はmutを付けて可変な参照を作る必要がある。

## 可変参照

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```
可変参照はある特定のスコープである特定のデータに対しては、一つしか持てない。
こうするとエラーになる。

```rust
    let mut s = String::from("hello");

    let r1 = &mut s;
    let r2 = &mut s;

    println!("{}, {}", r1, r2);
```

この制限によりコンパイル時にデータを同時に編集する、いわゆるデータ競合を防ぐことが出来る。
二つ作りたいなら片方をスコープで括る。可変参照も変数なので、スコープを抜ければ消える。

```rust
#![allow(unused)]
fn main() {
let mut s = String::from("hello");

{
    let r1 = &mut s;

} // r1はここでスコープを抜けるので、問題なく新しい参照を作ることができる

let r2 = &mut s;
}
```

また、可変参照と不変参照を組み合わせてもエラーになる。
不変なのに中の値が変わったらおかしいからな。

```rust
let mut s = String::from("hello");

let r1 = &s; // 問題なし
let r2 = &s; // 問題なし
let r3 = &mut s; // 大問題！
```

二つ以上作ると不味いのは可変参照であり、不変参照はいくつ作ってもいい。

## ダングリングポインタ
他人に渡されてしまった可能性のあるメモリを指すポインタのことをダングリングポインタという。ポインタを保持している間にメモリを開放すると発生する。ぬるぽ。

人為的に作るなら、関数内で定義した変数の参照を返り値に設定すればいい。
スコープを抜けた後変数の値が消えるのでダング化する。

Rustではデータ参照があればスコープを抜けるまでデータがスコープを抜けないように確認する＝ちゃんとコンパイラがエラー返すので、これは起きない。

