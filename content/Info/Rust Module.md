---
tags:
 - Info
---

daily:: [2023-03-12](/Daily_Note/2023-03-12.md)
up:: [Rust](../Bar/Program/Rust.md)

別ファイル読み込むやつ。
Modを付けて塊を作り、表現する。

```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}

fn main() {}
```

モジュールは親子構造を作ることが出来る。
全てのモジュールはcrateというモジュールの子になっている。
モジュールを呼び出す際は、この親子構造に従ったパスを使用して呼び出す。

```rust
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```

[モジュールを定義して、スコープとプライバシーを制御する - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch07-02-defining-modules-to-control-scope-and-privacy.html)

親モジュールからは子モジュールの非公開要素を見られないが、
子モジュールから祖先モジュールの要素を使うことは出来る。
子モジュールは自分の定義された文脈を見ることが出来るから。

## パス

最初のコードはそのままだと役に立たない。pubを付け、必要な部分だけ公開する必要がある。
相対パスは現在のモジュールから出発する。ファイルシステムで言う`.\`。明示したいときはselfを置く。

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    // 絶対パス
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    // 相対パス
    front_of_house::hosting::add_to_waitlist();
}

fn main() {}
```

Rustは標準だと全ての要素が非公開なので、モジュール内の関数要素を使うなら、モジュールと関数両方を公開する必要がある。

親モジュールから始まる相対パス、ファイルシステムで言う`..`はsuperで使える。
利点はもちろんポータブル性。

```rust
fn serve_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::serve_order();
    }

    fn cook_order() {}
}

fn main() {}
```

構造体やenumもpubで公開できる。
構造体も個々のフィールドには別でpubが必要。

enumはenumだけに付ければ使える。
全てのフィールドが公開されてないとenumはあんまり便利じゃないので。

[モジュールツリーの要素を示すためのパス - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html)

## use

`C#`のusingと同じく、`use パス`でパスを省略可能。
そのファイルで定義された関数じゃないことを示すため、一つ前で止めるのが慣例。

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting::add_to_waitlist;

pub fn eat_at_restaurant() {
    add_to_waitlist();
    add_to_waitlist();
    add_to_waitlist();
}

fn main() {}
```

ただし、構造体やenumはフルパスで指定するのが慣例。
特に理由ないけど……

もちろんasもある。

```rust

#![allow(unused)]
fn main() {
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // --snip--
    Ok(())
}

fn function2() -> IoResult<()> {
    // --snip--
    Ok(())
}
}
```

pub useで名前を再公開することで、他のコードがそのパスを使って関数を呼び出すこともできる。この機能は人によって物の見え方が違うときに有効。

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}

fn main() {}
```

外部パッケージを読み込むときは、Cargo.tomlに記述する。
標準ライブラリを使うときはここに書く必要はないが、useは必要。

パスが長いときは、共通部分を書いた後にパスをネストすれば一気に読み込める。
パスがそこで終わる時でもselfを使えば呼び出せる。

```rust
#![allow(unused)]
fn main() {
use std::io::{self, Write};
}
```

パス上の公開要素を全部読むときはglobを使う。
何が使える状態なのか、その名前はどこのモノか分かりにくくなるので注意。

```rust

#![allow(unused)]
fn main() {
use std::collections::*;
}
```

[useキーワードでパスをスコープに持ち込む - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch07-04-bringing-paths-into-scope-with-the-use-keyword.html)

## 分割

モジュールを分割することも簡単。
まずは分割されたファイルで、分割した**ファイルの名前**を読み込む。

```rust
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
```

modの後にブロックではなくセミコロンを置くと、同名のファイルやフォルダ内のファイルからその定義を読み込む。今回このコードはfront_of_houseモジュールではなくfront_of_houseフォルダとfront_of_house.rsを読みに行き、このコードに展開している。要はmodでファイル全体囲うようにした感じ。

もちろんさらに別ファイルに移すことも可能。同じようにmodで読ませればいい。こんどは公開してないとコンパイル通らないのでpubを付けることを忘れずに。

`ファイル名: src/front_of_house.rs`

```rust
pub mod hosting;
```

`ファイル名: src/front_of_house/hosting.rs`

```rust
#![allow(unused)]
fn main() {
pub fn add_to_waitlist() {}
}
```

[モジュールを複数のファイルに分割する - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch07-05-separating-modules-into-different-files.html)
