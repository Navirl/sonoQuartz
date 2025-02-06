---
tags:
  - Info
---

daily:: [2023-11-07](/Daily_Note/2023-11-07.md)
up:: [AI\_local](<../Bar/AI/AI_local.md>)
up:: [AIt](<../Bar/AI/AI_text.md>)

LLaMA2のマルチモーダル化。
今のところ画像解析のみ。

[README.md](https://github.com/haotian-liu/LLaVA/blob/main/README.md)

## LoRA
コントローラを起動する。たぶんバックエンド。
gradioサーバーを起動する。フロントエンド。
モデルワーカーを起動する。バックエンドのモデル読み込み部分。

その後いつも通りのLoRAかQLoRAのトレーニングを行う。
DeepSpeed構成らしい。

[LoRA.md](https://github.com/haotian-liu/LLaVA/blob/main/docs/LoRA.md)
[How to fine-tune the LLaVA-7b model ? · Issue #138 · haotian-liu/LLaVA · GitHub](https://github.com/haotian-liu/LLaVA/issues/138)

QLoRAは4bit NormalFloatという新たなデータ型を用いたLoRA。

[QLoRA（Quantized Low-Rank Adaptation）解説：ニューラルネットワークのメモリ効率を高める革新的な手法 | Reinforz Insight](https://reinforz.co.jp/bizmedia/13018/)

トークナイザーも別のものを使うことになる。
なおこれによると7bでもColabのT4のVRAM12GBでは出来ないっぽい。

[calm2-7b-chatをファインチューニング（QLoRA）してキャラBOTを作る。｜滝](https://note.com/taki321/n/na8b23ee365ed)

## GGUF

[mys/ggml\_llava-v1.5-7b at main](https://huggingface.co/mys/ggml_llava-v1.5-7b/tree/main)

## 流れ
llava-v1.5-7bを調整する。`scripts/v1_5/finetune_task_lora.sh`を元にqloraに変更、カスタムデータセットを用意して調整を行い、出来たモデルをさらにggufに圧縮する。

[liuhaotian/llava-v1.5-7b at main](https://huggingface.co/liuhaotian/llava-v1.5-7b/tree/main)
[finetune\_task\_lora.sh](https://github.com/haotian-liu/LLaVA/blob/main/scripts/v1_5/finetune_task_lora.sh)
[LoRA.md](https://github.com/haotian-liu/LLaVA/blob/main/docs/LoRA.md)
[MODEL\_ZOO.md](https://github.com/haotian-liu/LLaVA/blob/main/docs/MODEL_ZOO.md)
[Finetune\_Custom\_Data.md](https://github.com/haotian-liu/LLaVA/blob/main/docs/Finetune_Custom_Data.md)
[Tutorial: How to convert HuggingFace model to GGUF format · ggerganov/llama.cpp · Discussion #2948 · GitHub](https://github.com/ggerganov/llama.cpp/discussions/2948)

