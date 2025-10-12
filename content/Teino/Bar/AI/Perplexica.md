---
date: 2025-02-05
tags:
 - Bar
---

up:: [AIt](<./AI_text.md>)

ローカルでLLMに検索させる奴。Perplexityのクローン。
結構前からある。

バックはollama。

普通に使うのはsearXNGの設定が必要になり結構重い。
なのでdocker composeを使う。以下を参考に進めていけばいい。
[Perplexica と Ollama で LLM を利用した検索エンジンを試す LLM - Qiita](https://qiita.com/orca13/items/ca0d54c0b5aefa5c56d4)

ollamaもdockerで起動すること前提の設定（http://host.docker.internal:11434）。モデルのダウンロードもこのollamaで行う。
なので一回ollamaのコンテナに接続する。
[docker exec](<../GUI/Docker.md#docker exec>)

その後、ollama runで好きなモデルを取ってくる。
[Ollama で Hugging Face Hub の GGUF をそのまま使ってみる｜ぬこぬこ](https://note.com/schroneko/n/n6a7c34f0a50c)

いちおうモデルファイルを自前で用意できればhuggingfaceでなくてもいけそう？
[OllamaでローカルLLMを稼働させAPIサーバ化する](https://zenn.dev/oyashiro846/articles/797312443fb506)
[GGUFファイルで保存されたLLMをOllamaで読み込んで使う方法を調べてみました。 - CCCMKホールディングス TECH LABの Tech Blog](https://techblog.cccmkhd.co.jp/entry/2024/07/23/100000)