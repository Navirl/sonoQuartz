---
date: 2025-07-17
time: 07:54
tags:
  - Project
---

up:: [ComfyUI](<../Bar/App/ComfyUI.md>)

まずはxDiT。

ラッパーアプローチ。diffusersのクラスを登録してラッピングするデコレータを使用している。
各モデル、conv2d,embeddinf,linear,schedulerをラップ。これらはコンポーネントと呼ばれる。これらは全てpipelinebaseを継承しており、このクラスが並列化に必要な機能を提供する。
新しいモデルが必要なら対応する基底クラスを継承する。自前で必要なのはたいていfrom_pretrainedと__call__のみ。

各コンポーネントの変更。
Transformer。PipeFusionの操作関連。内部レイヤーの並列化。
Scheduler。並列化。
Layers。PipeFusionやSequence Parallelのため、Attention Layerを主に変更。

Runtime。
parallel_state.pyが分散環境とアクセス。
group_coordinator.pyが通信パターンのカプセル化。
runtime_state.pyが通信以外のランタイムメタデータ。

並列化手法。
Sequence Parallelism / USP。シーケンス並列。その手法がUSP。入力テンソルを分割してGPUに割り当て。通信必須。
PipeFusion。パイプラインを並列化。入力の冗長を使って通信量削減。画像を分割、DiTを分割。
Data Parallel。複数のプロンプト処理や複数画像の並列。
CFG並列。CFG関連で入力テンソルの分割とマージ。他に比べ通信オーバーヘッドが小さい。
上の並列は組み合わせ可能。
VAE並列。並列VAEデコード。

計算加速。
カーネル加速。最適化ライブラリやコンパイル加速。
キャッシュ加速。異なるステップ間の冗長性を使用してキャッシュ。TeaCacheのやつ。
DiTFastAttn。よくわからん。データ並列か単一FPUじゃないと使えない。USPやPipeFusionでは使えない。空間冗長、ステップ間類似、冗長計算を削るらしい。


そもそもComfyUIは起動時に単一のGPUしか占有しない。それを防ぐためGPUの数だけComfyUIを起動する。これは分散並列学習用コマンドラインツールtorchrunもやってる。