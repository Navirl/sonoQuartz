---
date: 2025-01-01
tags:
  - Info
---

up:: [Tauri](<../Bar/Framework/Tauri.md>)

[Configuration | Tauri](https://v2.tauri.app/reference/config/)

ビルド対象によって別の構成ファイルが作れる。
また、tomlで設定することもできる。デフォルトはjson。

[Tauri コンフィグの JSON5 対応 JSON - Qiita](https://qiita.com/takavfx/items/124860034c20359fced7)

- app
    - Tauriの構成
    - [CSP](<./tauri security.md#Content Security Policy(CSP)>)もここ
- build
    - ビルドの構成
    - 短いからかappより先に書かれてる
- bundle
    - バンドルの構成
- plugins
    - プラグインの構成

あとproductNameとかversionとかあるけど、まあ。
なお必須はidentifierのみ。




