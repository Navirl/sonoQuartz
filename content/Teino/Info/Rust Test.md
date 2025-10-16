---
date: 2023-03-12
tags:
 - Info
---

up:: [Rust](<../Bar/Program_lang/Rust.md>)

Rustでは関数がコンパイル通るかどうかをテストする機能がある。フィルタリング可能。
使いたい関数の宣言の上に`#[test]`と書き、`cargo test`。いつもは``はコメントだが、`[]`を付けることでコメントから属性というものに変わる。

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

fn main() {}

```

とんでもないことに、ドキュメントに書かれたコードもこれでテストできる。

テストを意図的に失敗させる場合は、`panic!()`マクロを実行すればいい。
中の評価値がfalseなら`panic!()`を呼び出す`assert!()`マクロもある。

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn exploration() {
        assert_eq!(2 + 2, 4);
    }

    #[test]
    fn another() {
        //このテストを失敗させる
        panic!("Make this test fail");
    }
}

fn main() {}
```

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(larger.can_hold(&smaller));
    }
}

fn main() {}
```

二つ引数を取り等価かどうか調べる`assert_eq!()`。失敗した際はその二つの値の出力もしてくれる。反対の`assert_ne!()`もある。内部で＝＝と！＝を使っているので、比較対象は比較用の`PartialEq`と出力用の`Debug`トレイトを実装しておくこと。大体は`#[derive(PartialEq, Debug)]`でいい。


```rust
pub fn add_two(a: i32) -> i32 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_adds_two() {
        assert_eq!(4, add_two(2));
    }
}

fn main() {}
```

この二つの引数が等価かどうかを調べ、アサーションを行う関数の引数はそれぞれ`expected`と`actual`と呼ぶ。言語によっては入れる順序が重要になるが、Rustでは問題ない。

アサーション系マクロは引数を追加することでカスタム失敗メッセージを追加できる。コードにそのテストの意味を乗せたいときに。

```rust
pub fn greeting(name: &str) -> String {
    String::from("Hello!")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(
            result.contains("Carol"),
            //挨拶(greeting)は名前を含んでいません。その値は`{}`でした
            "Greeting did not contain name, value was `{}`",
            result
        );
    }
}
```

`should_panic`という属性値も役立つ。これは関数内のコードがパニックしたらテストを通過させる。`panic!()`があるコードで有用。ただしそのままだと想定してるパニック以外のパニックでも通る。ある失敗だけ捕捉したいなら`expected`引数を使えば失敗メッセージにそのテキストが含まれてるか調べてくれる。`expected`引数以外のパニックを起こすとちゃんと止めてくれる。

```rust
pub struct Guess {
    value: i32,
}

// --snip--
impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!(
                //予想値は1以上でなければなりませんが、{}でした。
                "Guess value must be greater than or equal to 1, got {}.",
                value
            );
        } else if value > 100 {
            panic!(
                //予想値は100以下でなければなりませんが、{}でした。
                "Guess value must be less than or equal to 100, got {}.",
                value
            );
        }

        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    //予想値は100以下でなければなりません
    #[should_panic(expected = "Guess value must be less than or equal to 100")]
    fn greater_than_100() {
        Guess::new(200);
    }
}

fn main() {}
```

他、`Result<T, E>`型をtest属性関数で返して使うこともできる。
これは`Ok()`と`Err()`という二つの列挙子を扱う型。Errの時は()内にエラーメッセージを書ける。trycatchみたいなの。if文でテストを評価し適切な方を返す。`assert!()`のように使える。
違いとして、`?`をテストで使えるようになる。また失敗したいならErrだけ返せばいいので、`#[should_panic]`は使えない。

[テストの記述法 - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch11-01-writing-tests.html)

## テスト実行制御

テストは並行実行される文を複数指定するたまにミスる。
その場合はスレッド数を1に制限してやればタイミングが被らない。もしくは一つずつテストしろ。

```rust
$ cargo test -- --test-threads=1
```

テストを実行すると、標準出力はみんなエラー文に入れるためにキャプチャされ表示されない。
表示したいなら`--nocapture`を使う。

```rust

#![allow(unused)]
fn main() {
fn prints_and_returns_10(a: i32) -> i32 {
    //{}という値を得た
    println!("I got the value {}", a);
    10
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn this_test_will_pass() {
        let value = prints_and_returns_10(4);
        assert_eq!(10, value);
    }

    #[test]
    fn this_test_will_fail() {
        let value = prints_and_returns_10(8);
        assert_eq!(5, value);
    }
}
}
```

## ホワイトリスト

複数テストのうち一つを実行したい場合、つまりテストのホワイトリストを使用したい場合は、引数に関数名を入れる。

```rust

#![allow(unused)]
fn main() {
pub fn add_two(a: i32) -> i32 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_two_and_two() {
        assert_eq!(4, add_two(2));
    }

    #[test]
    fn add_three_and_two() {
        assert_eq!(5, add_two(3));
    }

    #[test]
    fn one_hundred() {
        assert_eq!(102, add_two(100));
    }
}
}
```

```rust
$ cargo test one_hundred
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running target/debug/deps/adder-06a75b4a1f2515e9

running 1 test
test tests::one_hundred ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 2 filtered out
```

```rust
$ cargo test add
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running target/debug/deps/adder-06a75b4a1f2515e9

running 2 tests
test tests::add_two_and_two ... ok
test tests::add_three_and_two ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 1 filtered out
```

この時対象の文字列に取るのはモジュール単位なので、例えば`cargo test tests`なんかにすると今回testsモジュールに入ってる全ての関数が実行される。

## ブラックリスト
こちらは関数に`#[ignore]`を付けないといけない。

```rust

#![allow(unused)]
fn main() {
#[test]
fn it_works() {
    assert_eq!(2 + 2, 4);
}

#[test]
#[ignore]
fn expensive_test() {
    // 実行に1時間かかるコード
    // code that takes an hour to run
}
}
```

```rust
$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished dev [unoptimized + debuginfo] target(s) in 0.24 secs
     Running target/debug/deps/adder-ce99bcc2479f4607

running 2 tests
test expensive_test ... ignored
test it_works ... ok

test result: ok. 1 passed; 0 failed; 1 ignored; 0 measured; 0 filtered out
```

ignoreされているテストだけ実行するときは、`--ignored`を付けて実行。

```rust
$ cargo test -- --ignored
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running target/debug/deps/adder-ce99bcc2479f4607

running 1 test
test expensive_test ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 1 filtered out
```

```rust
```
## テストの体系化
Rustでとらえるテストには単体テストと結合テストがある。

単体テストは他のコードから切り離して各単位のコードをテストする。

モジュールに`#[cfg(test)]`を付けると、そのコードはbuildでビルドされず、testの時だけコンパイルするようになる。()内はその設定オプションを付けた時に含むという意味。

Rustではテストの際非公開関数を直接呼び出すことが出来る。

結合テストではまず専用のtestsディレクトリを作る。
そういう名前で結合テスト用ファイルを検索して個別のライブラリにしてるので絶対tests。

```rust
extern crate adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

externは外部のライブラリインポート。
普通のファイルとtests内のファイルは別のクレート扱いなので、こうしないと読めない。


単体テスト、結合テスト、ドック(ドキュメント)テストは全て`cargo test`で動く。
結合テストのホワイトリストはファイル単位。`--test ファイル名`で指定する。

```rust
$ cargo test --test integration_test
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running target/debug/integration_test-952a27e0126bb565

running 1 test
test it_adds_two ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

結合テストでテストされるのはtests直下のファイルのみ。
例えばテスト内で使うヘルパー関数などは、そのまま置くとテスト時に一緒にコンパイルされてしまう。
それを防ぐなら、適当にフォルダ作って入れておく。こうすればモジュールシステムにより、直下ファイルからモジュールとして読みにいかない限りコンパイルされない。


`cargo test`を行うとき、`src/lib.rs`が存在しないと、結合テストやextern crateが使えない。cargoからプロジェクト作ればついてくるので問題ない。
これはRustそのものが`src/main.rs`で`src/lib.rs`のロジックを呼んでるから。結合テストはここを利用してテストしている。