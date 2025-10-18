---
date: 2025-07-24
time: 11:38
tags:
  - Bar
---

up:: [AIt](<../AI/AI_text.md>)

geminiをcliから使える奴。
なので書いてることはほぼgeminiのことだけど、今のところここ以外でgeminiを使わないので。

- 5000文字を超えるくらいの話を書かせようとすると、読点を増やしてくる
    - 4000文字程度でも繰り返し生成すると読点が増えるので、一回の出力文字数ではなさそう
    - 減らせと言えば減るが、極端に減りがち
- すでにある話を読ませて同じようなものを、と指定するのは可能
    - しかし沢山読ませるとその話の流れまで学習してしまう、なのでファイルは1枚程度でボトムアップで寄せ直すほうが良い
    - もっともっと多くあれば違うかも
- ネタ帳からネタを選定する方法は、何故かランダムと指定しても10枚程度の同じようなファイルに偏りがち
    - 自動で前のコンテキストを読むせいか
    - 話の流れを無視してファイル名だけ使ってる感がある、かといって全部直接読ませるとコンテキストが流石に足りない
    - 手動でランダムして読ませた方が早いかも
- 「何も知らない状態の貴方が同じように書き始められるように、ここまでの設定を新規マークダウンファイルにまとめてください」戦略
    - claudeには効くが、効きすぎて話の幅が狭まる

- claudeは純文学、geminiはよりライト
    - 

## Claude Codeで使う
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