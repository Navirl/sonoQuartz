---
date: 2025-07-13
time: 21:58
tags:
  - Project
---

up:: [ComfyUI](../Bar/App/ComfyUI.md)

ComfyUI-MultiGPUは現在の使用対象GPUの関数をパッチして使っている。
Distrifusionはもっと根を書き換えないといけないのでこれは使えない。

具体的には最小でAttention分割関数、それぞれのGPUのオーケストレーション関数、設定関数とそれらで作ったmodelをk samplerから呼び出せるように関数追加を行う。

