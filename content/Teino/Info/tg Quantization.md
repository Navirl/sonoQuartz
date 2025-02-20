---
date: 2024-04-03
tags:
  - Info
---

up:: [tgwebui](<../Bar/App/text-generation-webui.md>)

量子化。モデルを小さくしつつ精度を落とさない技術。

## GPTQ
最初期の量子化。

## QuIP
Quantization with Incoherence Processing。
GPTQの改良。今はQuIP#になりさらに効率化された。

## GGML
CPUでも実行できるようにしたフォーマット。

## GGUF
ggmlの後継。

## AQLM
Additive Quantization of Language Models。
加法を元にした量子化。QuIP#を凌ぐのが売り。

[Add AQLM support (experimental) by oobabooga · Pull Request 5466 · oobabooga/text-generation-webui · GitHub](https://github.com/oobabooga/text-generation-webui/pull/5466)
[Even more quantization types? · ggerganov/llama.cpp · Discussion 5063 · GitHub](https://github.com/ggerganov/llama.cpp/discussions/5063)

## exl2
量子化ではないが。
exllamav2で使うための圧縮。早い。

