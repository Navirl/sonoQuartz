---
date: 2024-08-16
tags:
  - Info
---

up:: [Daicer](<../Novels/programs/Daicer.md>)



Gradioを使うとタブの動的変更とかできなさそう
なのでC#かReactということになる
KritaはCpp
ComfyUIはpythonとjava(litegraph)
C#が楽ではあるが、いろんな機能追加が非常に面倒
ライブラリがない
Pythonでプラグインシステムを付ければいいが

PyWebview
pythonでhtml動かす
あとまわし

[Pywebview + Vite + React でデスクトップアプリを作成する #Python - Qiita](https://qiita.com/ShijiMi-Soup/items/1f5e2b542884ca4a279f)

gridstack.js
画面のアイテムを大きさ変更しつつ配置できる
あとまわし

muuri
ソートやフィルタリング可能な配置ライブラリ
大きさ変更があるか分からないので仮置き

comfyuiではテストライブラリはjestとpytestの王道

Gherkinのファイルはtest/feature以下に

必要な物
プラグイン書きたい時、すげー簡単に書ける
    実装が適宜公開されている


フロントとComfyUI処理は分けたい（あとで拡張するため）
フロントにReact Nativeかけて、残りをtypescriptするなら別に

モバイルアプリ開発を優先するわけではないので、React Nativeはしない
Electronでクロスプラットフォーム
Reactで画面
typescriptでバックエンド



[Perplexity](https://www.perplexity.ai/search/electronnokai-fa-wakuhuronitui-rGY6LoNITDWc1Lu3aiGrBg)


Reactを使いたい、豊富なコミュニティサポート

Viteは最初のロード遅い
Next.jsはSSGできるので早い
    けど静的コンテンツを作りに来てない
Remixは面白そうだが新しすぎる、Tauriの推奨にない

[フロントエンドをViteからNext.jsに書き換えた話 〜パフォーマンス編〜 - 株式会社ヘンリー エンジニアブログ](https://dev.henry.jp/entry/replace-vite-with-nextjs)

ElectronはデカすぎなのでTauri
色々制約はあるが楽
[【JavaScript】ここがしんどかったよTauri開発【Rust】 #Windows - Qiita](https://qiita.com/kurokky/items/79017c7a867a6e8122f8)

Tauri
React
Vite

live-server
react-split-grid
mui
dnd-kit

