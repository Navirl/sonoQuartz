---
date: 2025-02-13
time: 16:17
tags:
  - Bar
---

up:: [AIt](<../AI/AI_text.md>)

LLMを実行できるバックエンドアプリ。大体のアプリと接続できる。
`ollama pull hf.co/作者/モデル:量子化タグ`でHuggingfaceのモデルをダウンロードできる。

起動時は`ollama ls`でモデル名を調べて`ollama run モデル名`。
名前の書き換えはymlを弄る必要がある？

## **[gollama](https://github.com/sammcj/gollama)**
ollamaを使いやすくするTUI。
ollama -> LM Studioへのモデルリンク機能がある。LM Studioも使いたいなら。
逆もあるけど単純に複製してる？ ハードリンク？
[main: add reverse linking (LM Studio -\> ollama) by erg · Pull Request 156 · sammcj/gollama · GitHub](https://github.com/sammcj/gollama/pull/156)

`-lm-dir`を付けてlmstudioのモデルフォルダを指定しないと動かないかも。

