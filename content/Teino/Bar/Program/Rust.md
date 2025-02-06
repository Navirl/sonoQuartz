---
tags:
  - Bar
aliases:
  - rs
---

daily:: [2023-03-07](Daily_Note/2023-03-07.md)
up:: [Programming](Programming.md)

C++を元に作られた、低級言語の操作を簡略化安全化しつつC++並みのスピードを実現したやべー言語。Webページまで書けるらしい。
この言語特有の概念がいくつかある。ライフタイムやtraitなど。

[The Rust Programming Language - The Rust Programming Language](https://doc.rust-lang.org/stable/book/title-page.html)
[The Rust Programming Language 日本語版 - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/title-page.html)
[GoとRustの比較まとめ](https://zenn.dev/miyataka/articles/program_langs_go_vs_rust)

## 並行プログラミング
Rustは言語レベルで対応しているのでぜひ覚えよう。
単語はスレッド、チャネル、共有メモリ、同期トレイト

### スレッド
プログラムを実行してくれる処理単位。
`std::thread::spawn`関数でスレッドを開始し、**名前を付けられる**。スレッド間の通信にはチャネルや共有メモリが使われる。

### チャネル
メッセージパッシング型。一方向のデータ送受信を提供。
`std::sync::mpsc`モジュールが規定している。
それぞれの端点はSenderとReceiverで表される。

mpscはmultiple producer, single consumerの略。複数の送信者と1つの受信者。

### 共有メモリ
スレッド間で同じメモリ領域にアクセスする。
`std::sync`モジュールが規定。

スレッドセーフが保証された型であればこれで**所有権を**共有できる。

#### Arc
Cloneトレイトを使うことで、ヒープ上の値の場所への参照ポインタを作成しつつ、参照カウンタを増やす。
値をドロップするタイミングは最後の参照ポインタが消滅したとき。参照ポインタが消滅するのは参照カウンタが0になった時。参照カウンタはスレッドが終了したときから少しずつ減っていく。

### 同期トレイト
SendとSyncという二つの特殊トレイト。
Sendはその型は別のスレッドに送ることが安全であることを示す。チャネルのSender構造体が持つトレイト。チャネル使うならこれが必要。
Syncはその型は複数スレッドで共有することが安全であることを示す。[共有メモリ](#共有メモリ)で話してた型にスレッドセーフを保証するためのトレイト。共有メモリはsendも必要だが。

ある程度は実装しなくても自動的に実装してくれる。プリミティブ型とかは既にSyncを持っている。場合によってはこの実装を否定して外すことも可能。auto_traitsフィーチャーゲートというものが必要になるが。

```rust
#![feature(auto_traits, negative_impls)]

struct Foo;

impl !Sync for Foo {}

```