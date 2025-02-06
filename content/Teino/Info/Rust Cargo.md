---
tags:
 - Info
---

daily:: [2023-03-07](/Daily_Note/2023-03-07.md)
up:: [Rust](<../Bar/Program/Rust.md>)

パッケージマネージャ―。依存関係をtomlファイルにまとめることで簡単に解決してくれる。
ついでにビルドシステムでもある。
`cargo new`で新しくプロジェクトを作れる。
`cargo build`とすればプログラムをコンパイルしてくれる。
`cargo run`でコンパイル後の実行までしてくれる。
`cargo check`でビルドせずにプログラムをチェックしてくれる。

[Hello, Cargo! - The Rust Programming Language](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

`cargo install`でパッケージを追加できる。
この時常にビルドしてしまうっぽいので、既にバイナリが用意されている場合は面倒。
その場合はcargo-binstallが使える。
[GitHub - cargo-bins/cargo-binstall: Binary installation for rust projects](https://github.com/cargo-bins/cargo-binstall)

installされているバイナリは`cargo install --help`で確認できる。

[rust - How do I list all of the packages I've installed globally with cargo install? - Stack Overflow](https://stackoverflow.com/questions/60857222/how-do-i-list-all-of-the-packages-ive-installed-globally-with-cargo-install)