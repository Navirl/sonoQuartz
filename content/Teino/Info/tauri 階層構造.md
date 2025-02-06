---
tags:
  - Info
---

daily:: [2024-12-31](<../Daily_Note/2024-12-31.md>)
up:: [Tauri](<../Bar/Framework/Tauri.md>)

[Tauri v2 x Svelte 5 で、アプリケーション開発をはじめる！ #Rust - Qiita](https://qiita.com/takavfx/items/248250daacde5d400bd9)

- src
    - フロントエンドのソースコード
    - routes
        - ルーティング対象
        - [ルーティング](<./ルーティング.md>)
- src-tauri
    - tauriの実装
    - src
        - バックエンドコード
        - lib.rs
            - ライブラリエントリーポイント
            - ここの関数はcargo.tomlで名付けられ、main.rsで読まれる
    - target
        - ビルドの書き出し先
        - この二つはRustと同じ
    - capabilities
        - default.json
            - セキュリティ定義
            - [tauri security](<./tauri security.md>)
- static
    - svelteの画像など静的リソース







