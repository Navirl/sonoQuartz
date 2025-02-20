---
date: 2024-11-16
tags:
  - Bar
---

up:: 

[Obsidian](<./Obsidian.md>)と同じく個人ナレッジ管理ツール。（Personal Knowledge Management、PKM）

知識の整理、発見、活用に重点を置いている。あとOSS。
Self Contained Vaultを使用することで、Vaultを壊さずに持ち運べる。


## publish
dendron-cliを使用して、`.next/out/`に公開用の静的HTMLを生成できる。
プレビューも可能。

[Publishing Quickstart](https://wiki.dendron.so/notes/e5st4LFLtIwwbQmC6JBaF/)
[CLI](https://wiki.dendron.so/notes/RjBkTbGuKCXJNuE4dyV6G/#setup)

使う場合はまずinitialize workspaceを実行し、一番上にdendron.ymlがあることを確認する。

[Commands](https://wiki.dendron.so/notes/eea2b078-1acc-4071-a14e-18299fc28f47/#initialize-workspace)

ここでいうWorkspaceは1つ以上のVaultのコレクション。
日本語訳だとVaultは金庫とコンテナーの二つの訳がある。

WorkspaceにはNativeとcodeの二種がある。
Nativeは既存のWorkspace内でDendronを使用するときに。
Codeはプログラムに特化した物。dendron.code-workspaceという特殊なファイルが入っている。コードごとにナレッジベースが欲しい時に。
[Workspace](https://wiki.dendron.so/notes/c4cf5519-f7c2-4a23-b93b-1c9a02880f6b/)
[Native Workspaces](https://wiki.dendron.so/notes/lamzybrD6SgQlJ9BpwkQk/#setup)


プレビューを手動で起動したい場合はローカルサーバーを実行する。

[Localhost](https://wiki.dendron.so/notes/svoot2ea4v5imu6rdrwuwmu/)

Diagrams.netのSVGを追加することもできる。
追加のinstallとコマンドが必要。

[Diagrams.net (Draw.io)](https://wiki.dendron.so/notes/dqN52V9aJE5o3ttJykChH/)

GitHub Pages用に作成する場合は、そのPagesのURLが必要。
exportコマンドがちょっと変わるので注意。

[GitHub Pages](https://wiki.dendron.so/notes/yg3EL1x9fEe4NMqxUC3jP/)

Actions経由でPagesを使用する場合は、pagesブランチを作りワークフローを設定することになる。

[GitHub Pages with GitHub Actions](https://wiki.dendron.so/notes/FnK2ws6w1uaS1YzBUY3BR/)

Netlifyも可能。

[Netlify](https://wiki.dendron.so/notes/yetuum6o9wZi6eVJQBbQb/)

Pagesで指定したpublishingは他にも機能がある。
siteHierarchiesを指定しておくと特定の子階層のみを公開できる。
親ファイルになるsiteIndexも指定すること。

[Publish with Custom Hierarchies](https://wiki.dendron.so/notes/3tfsmrjs2ku0jj9i943f65z/)


日本語タイトルとか上手くいかない。

## スキーマ
ディレクトリ以外のファイル同士の階層構造メタデータを記述した特定のファイル。
このスキーマの記述に合致したファイルには、自動でテンプレートを入れることができる。
デイリーノートなどに便利。

`name.schema.yml`などとすることでスキーマファイルが作れる。

内部でのファイル一致にはグロブパターンを使用することもできる。



[Schemas](https://wiki.dendron.so/notes/c5e5adde-5459-409b-b34d-a0d75cbb1052/#schema-templates)


## 機能の成熟
germ,seed,sprout,tree,forestの5種。
[Product Stages](https://wiki.dendron.so/notes/8uJ7IsjD8hrQydMZoOSso/)

## 検索高速化
SQLiteを使う方法がある。germ。
[SQLite](https://wiki.dendron.so/notes/r6e3yl55oa3bpvyhjq3wkt2/)

## common_server_1.DConfig.getRaw is not a function
dendron publishのコマンドで発生。
なんか循環参照してるらしい。
dendron-cliのバージョンを0.119.0に下げるとうまくいく。

[Latest version of dendron-cli \`0.124.2\` breaks when running \`npx dendron publish init\`  · Issue 3981 · dendronhq/dendron · GitHub](https://github.com/dendronhq/dendron/issues/3981)