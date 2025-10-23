---
date: 2025-10-21
time: 19:41
tags:
  - Bar
---

up:: [pwsh](<./PowerShell_and_Command-Line.md>)

claudeをCLIで使えるやつ。
いろんなエディタで使える。

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