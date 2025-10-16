---
date: 2025-02-21
time: 21:56
tags:
 - Info
---

up:: [Rust](<../Bar/Program_lang/Rust.md>)
up:: [Cpp](<../Bar/Program_lang/Cpp.md>)

Rustでdll作りたいときのアトリビュート。
`--crate-type=cdylib`とするか、`"[crate_type = "cdylib"]`とするとその部分がdynamic system library、dllになる。dylibでもdllは作れるが、これはrust用に依存関係が出来るので少し重くなるらしい。

[RustでDLLを作って、Cで呼び出す - Qiita](https://qiita.com/Galvalume29/items/6bbbefa65da60ef33a79)
[Linkage - The Rust Reference](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/reference/linkage.html?felosearch_translate=1)
[Felo（フェロー）- 無料のAI検索エンジン](https://felo.ai/ja/search/i4nNeHSR7cnkNBsKggJdQF)
