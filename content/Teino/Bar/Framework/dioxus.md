---
date: 2025-02-14
time: 13:38
tags:
  - Bar
---

up:: [Rust](<../Program/Rust.md>)
same:: [Tauri](<./Tauri.md>)

tauriと同じくクロスプラットフォームでアプリが作れる。
違いはフロントエンドもrustが使えること。rsxという記法を使う。

仮想DOMで都度書き換えしている模様。React。
コンパイル時点でDOMの変更コードを作成するSvelte方式ではない。Percyがそれにあたる？

[GitHub - chinedufn/percy: Build frontend browser apps with Rust + WebAssembly. Supports server side rendering.](https://github.com/chinedufn/percy)



## Cannot install dioxus-cli 0.6.0 on Windows due to aws-lc-sys
エラーメッセージをよく見る。たいていcmakeかnasmが足りずコンパイルが失敗している。

[Cannot install dioxus-cli 0.6.0 on Windows due to \`aws-lc-sys v0.23.1\` · Issue 3309 · DioxusLabs/dioxus](https://github.com/DioxusLabs/dioxus/issues/3309)

[dioxus 基礎](<../../Info/dioxus 基礎.md>)