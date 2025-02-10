---
date: 2023-04-22
tags:
  - Bar
aliases:
  - AIl
---


広範な概念だが、Transformerみたいな今までの経験から次を予測するAIをメインにする。

ざっくり言うと、transformerやRNNを使って作った適当に重みをもつニューラルネットワークに、データセットの重みを適用することでジェネレーティブAIになる。

binファイルは単なる重み。
safetensorsはそれを読み込めるモデルに変換したもの。
pickleはsafetensorsの古い奴。

## Codegen
コードを類推して生成するテキストモデル。
重みしかないので、使うならpythonから呼び出すのがいい。

[CodeGen](https://huggingface.co/docs/transformers/main/en/model_doc/codegen#transformers.CodeGenForCausalLM)
[Sharing custom models](https://huggingface.co/docs/transformers/main/en/custom_models#using-a-model-with-custom-code)
[GitHub - salesforce/CodeGen2: CodeGen2 models for program synthesis](https://github.com/salesforce/CodeGen2)

専用解説サイトっぽいとこのHowtoと、transformerのカスタムモデル読み込み(`trust_remote_code=True`)を読んで動かした。
モデルは全てRAM上に展開されるっぽく、350Mでも2GBくらい持ってかれる。




## Aider
チャットでAIにプログラムを組ませる。
GeminiかGroq。

[GitHub - paul-gauthier/aider: aider is AI pair programming in your terminal](https://github.com/paul-gauthier/aider)
[Cursorよさらば!これからはAIderで対話しながらプログラムを作る時代だ! ｜shi3z](https://note.com/shi3zblog/n/n7fa9f36e694c)





## LocalAI
OpenAIのAPIでローカルのモデルを動かせるやつ。




## CogVLM
動画を認識できるオープンソースモデル。

[GitHub - THUDM/CogVLM2: GPT4V-level open-source multi-modal model based on Llama3-8B](https://github.com/THUDM/CogVLM2)