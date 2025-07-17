---
date: 2025-07-13
time: 21:58
tags:
  - Project
---

up:: [ComfyUI](<../Bar/App/ComfyUI.md>)

ComfyUI-MultiGPUは現在の使用対象GPUの関数をパッチして使っている。
Distrifusionはもっと根を書き換えないといけないのでこれは使えない。

具体的には最小でAttention分割関数、それぞれのGPUのオーケストレーション関数、設定関数とそれらで作ったmodelをk samplerから呼び出せるように関数追加を行う。

普通にやると本当に複雑なので、一回comfyui-diffusersで使えるようにしてからの方が良さげ。

[GitHub - Limitex/ComfyUI-Diffusers: This repository is a custom node in ComfyUI. This is a program that allows you to use Huggingface Diffusers module with ComfyUI. Additionally, Stream Diffusion is also available.](https://github.com/Limitex/ComfyUI-Diffusers?tab=readme-ov-file)

あっ……これはモデルをロードした**後の推論計算の分散**。
つまりモデルの分割ではない。頓挫。

cuda cppはunified memoryでCPUとGPUのメモリを一つにして扱えるらしい。

xditならいけるか？　comfyui統合が無いが。

[ComfyUI-xDiT](<./ComfyUI-xDiT.md>)