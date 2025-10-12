---
date: 2024-04-03
tags:
  - Info
---

up:: [AI\_local](<../Bar/AI/AI_local.md>)
up:: [AIt](<../Bar/AI/AI_text.md>)

(2023)

GGML
旧手法。Cで書かれており、サードパーティに依存せず、量子化をサポートする。
あとWebAssemblyサポートとか。

GGUF
Llama以外もllama.cppで使えるようになる新フォーマット。
プロンプトフォーマットを内部に設定しておける。

GPTQ
推論速度の高速化。

ExllamaとかがLlama専用でこの圧縮を行っていたが、AutoGPTQによりTransformerモデル全てで圧縮できるようになった。
量子化した後量子化そのものを学習し、元モデルとの誤差を縮めている。

AWQ
最近出てきたGPTQの上位版量子化。

---

(2024)

[GGML/GGUF/GPTQの違い](https://zenn.dev/kun432/scraps/6fc012752afa62)

up:: [tgwebui](<../Bar/GUI/text-generation-webui.md>)

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

