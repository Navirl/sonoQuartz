---
tags:
 - Info
aliases: Rust 所有権
---

daily:: [2023-03-09](/Daily_Note/2023-03-09.md)
up:: [Rust](../Bar/Program/Rust.md)

日本語では所有権。
Rustは値を所有者と呼ばれる変数一つと紐づけている。所有者であることを所有権を持つという。
所有者がスコープから外れると値は破棄される。
	ちなみにこの要素の生存期間の終了地点でリソースを開放する手法は、C++だとRAII、Resource Aquisition Is Initializationと呼ばれる。

解説にはスタックとヒープの概念が要る。
スタックは上から固定サイズデータを積んでいく。高速。
ヒープはメモリから適当に空き場所見つけてアドレスを返す。低速。
所有権はこのヒープを最小化したり適切なタイミングで掃除したりするのに使う。

ついでに文字列リテラルとString。文字列リテラルは`""`で表現され不変で高速。Stringは`String::from()`で主に扱われ、ヒープで管理されるのでサイズ可変。なのでこちらは（mutに入れてれば）文字を追加したりできる。

所有権は何もしないとすぐ移動する。例えば変数に変数を入れると(ヒープの場合は)所有権が新しい変数に移り、古い変数からは値にアクセスできなくなる。
所有権を移すときは、値を残したままアドレスだけ渡している。このアドレスだけ移す手法は**ムーブ**と呼ばれる。アドレスだけでなく値もコピー、すなわちDeep Copyしたいなら変数の`.clone()`関数を呼べばいい。

変数だけでなく、関数に入れても値はムーブされる。

```rust
fn main() {
    let s1 = gives_ownership();         // gives_ownershipは、戻り値をs1に
                                        // ムーブする

    let s2 = String::from("hello");     // s2がスコープに入る

    let s3 = takes_and_gives_back(s2);  // s2はtakes_and_gives_backにムーブされ
                                        // 戻り値もs3にムーブされる
} // ここで、s3はスコープを抜け、ドロップされる。s2もスコープを抜けるが、ムーブされているので、
  // 何も起きない。s1もスコープを抜け、ドロップされる。

fn gives_ownership() -> String {             // gives_ownershipは、戻り値を
                                             // 呼び出した関数にムーブする

    let some_string = String::from("hello"); // some_stringがスコープに入る

    some_string                              // some_stringが返され、呼び出し元関数に
                                             // ムーブされる
}

// takes_and_gives_backは、Stringを一つ受け取り、返す。
fn takes_and_gives_back(a_string: String) -> String { // a_stringがスコープに入る。

    a_string  // a_stringが返され、呼び出し元関数にムーブされる
}

```

何もしないと、引数に取った時点でムーブされる。
ムーブしたくないときは**参照**で渡せばいい。

[Rust Reference and Borrowing](Rust%20Reference%20and%20Borrowing.md)