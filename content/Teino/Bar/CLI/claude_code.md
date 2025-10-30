---
date: 2025-10-21
time: 19:41
tags:
  - Bar
---

up:: [pwsh](<./PowerShell_and_Command-Line.md>)

claudeをCLIで使えるやつ。
いろんなエディタで使える。
[Claude Code を初めて使う人向けの実践ガイド](https://zenn.dev/hokuto_tech/articles/86d1edb33da61a#serena)
## Claude以外を使う
Claude Code Routerというのがあり、そこからgemini-cliを呼び出せる。
設定はREADME、そこから修正。

.claude-code-router\plugins\gemini-cli.jsを配置しないと動かない。
これは外部ファイル。

[GeminiCLITransformer · GitHub](https://gist.github.com/musistudio/1c13a65f35916a7ab690649d3df8d1cd)

.geminiにoauth_creds.jsonが無いとgemini-cli.jsが動かない。
geminiであらかじめブラウザからログイン。

transformersは修正が必要。
pathは絶対パスで、projectはAPIのproject ID。

403が出る場合、GCPプロジェクトにGemini for Google Cloud APIが入ってない可能性がある。
プロジェクト管理ページから入れる。


起動が早くなるのが利点。
設定も使いまわせるはず。
こういうのをそのままフローに入れられる。
[Claude Codeを「第二の自分」にする、Obsidianを脳として。 - Qiita](https://qiita.com/zazen_inu/items/be6accceb5f808d52bc8)

本当はqwen-cliも同じように呼べるはずだがtoken has expiredと言われる。何度かqwen-cliは付け直して動くのも確認してるからそんな一瞬で切れるわけないのに。

## AGENTS.mdに対応させる
CLAUDE.mdに書くようになっている。対応予定はない。（2025/10/29）

シンボリックリンクを張るか、フックでコンテキストにぶち込む方法がある。
ただフック読みは通常と違う読み方なので後から読み方が変わった時困る。シンボリックリンクが無難。

[Claude Code の AGENTS.md 対応](https://suzumiyaaoba.com/blog/post/2025-09-16-agents-md/)

## serena
mcp。LSPを用いてコードベースを理解する。
大きいリポジトリならコンテキストを圧縮できたりする。
公式にもあるが、小さいとあまり意味がない。

[GitHub - oraios/serena: A powerful coding agent toolkit providing semantic retrieval and editing capabilities (MCP server & other integrations)](https://github.com/oraios/serena)
[【Claude Code】Serenaの導入でAI活用を加速！](https://zenn.dev/hacobell_dev/articles/claude-code-serena-mcp-experience)

## ultracite
ツール。保存時にtypecriptのコードを型安全を考慮しつつリントフォーマットする。

[GitHub - haydenbleasel/ultracite: A highly opinionated, zero-configuration linter and formatter.](https://github.com/haydenbleasel/ultracite)
[Vibe codingによって生成されたコードの品質を担保するためにUltraciteを使ってみた](https://zenn.dev/bita/articles/df3e289155005d)

## knip
ツール。余計なtypescriptコードを削除する。

[GitHub - webpro-nl/knip: ✂️ Find unused files, dependencies and exports in your JavaScript and TypeScript projects. Knip it before you ship it!](https://github.com/webpro-nl/knip)