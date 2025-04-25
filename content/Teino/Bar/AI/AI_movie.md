---
date: 2025-01-30
tags:
  - Bar
aliases:
  - AIm
---

up::

## HunyuanVideo
中国系。Tencent。
VRAMメモリを抑えるGP系がある。最低10GBから使える。

[GitHub - Tencent/HunyuanVideo: HunyuanVideo: A Systematic Framework For Large Video Generation Model](https://github.com/Tencent/HunyuanVideo)
[GitHub - deepbeepmeep/HunyuanVideoGP: HunyuanVideo GP: Large Video Generation Model - GPU Poor version](https://github.com/deepbeepmeep/HunyuanVideoGP/)

以下GPの話。

大きく原作から変わっているのはfp8とmultigpu対応くらいで、あとはライブラリのバージョン合わせ程度。

pinokioが使えるなら簡単だが、jupyterからが辛そうなので他の方法。

リポクローン、torchインスト、requirementsインストで使える。
使用時は`python gradio_server.py`。7860に開く。
i2vは`--i2v`スイッチが必要。

tritonとsageattentionが使えるなら、`--fast`で早くなる。
何度も生成するなら`--fastest`でコンパイルし早くできる。これは初回2分程度のコンパイルが必要。

GPUの使用量によって5つのプロファイルが選択できる。
ここ、GPサポートって謳うRIFLExだと選べなさそうなんだけどどうするんだろう。


RIFLExを使ってまで長い動画を生成しようとすると、VRAMが足りない。Q3以下はいかにも量子化しました見たいな崩れ方をするので使えたもんじゃない。