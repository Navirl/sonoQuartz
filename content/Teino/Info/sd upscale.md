---
date: 2024-06-08
tags:
  - Info
aliases:
  - sd 高画質
  - sd highres
---

up:: [sd](<./Stable Diffusion.md>)

[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/13pa2uh/a_simple_comparison_of_4_latest_image_upscaling/)
非常に詳しい投稿。2023年。
要するにTiledDiffusion+StableSR(Upscaler)がいいらしい。元の画像を保って鮮明になる。継ぎ目が目立ちにくく単色背景でも綺麗。
ただしクソ重く、最速の2.5倍かかる。

CNのTileを使用するとディティールが増えるが乱雑。

Ultimate SD Upscalerを使用するときは継ぎ目が目立つのでseam fix設定を使いたいが、それするとTD+SSRより遅くなる。

>[! tips]
>よってVRAMがあり、内容を変更したくないならTD+SSR。
>変更を許可するならTD+CNTileかUSDU。
>時間に余裕があり、適切に詳細を入れたいならTD+Noise Inversion＋CNTile。
>
>それならTD+CNTileが基本になりそう。



Tiled VAEはVRAM消費を抑えるだけ。結果には作用しない。
TDを使うならないとクラッシュする。あとAMDサポートしてない（1年前）

StableSRはoverlapが大きいと時間だけ伸びて結果が変わらない。4~8で充分。

USDUはAMDでも使えて習得が楽。一つずつ処理するのでTiled VAEも要らない。

## Ultimate SD Upscaler
[ComfyUI\_UltimateSDUpscale](<./comfyui Custom Nodes.md#ComfyUI_UltimateSDUpscale>)

## Tiled Diffusion
[GitHub - shiimizu/ComfyUI-TiledDiffusion: Tiled Diffusion, MultiDiffusion, Mixture of Diffusers, and optimized VAE](https://github.com/shiimizu/ComfyUI-TiledDiffusion)

- mixture-of-diffusers
- MultiDiffusion

この二つの手法を使用できるようにするノード。
sdwebui版だとDemodiffusionというのも追加されてるけど、これはVRAM18GB以上いるので却下。

タイルは64の倍数が推奨されている。overlapは上げるほど早く終わるが性能応相談。

## CN Tile
ローカル（たぶんタイル）の詳細がプロンプトと一致しないとき、プロンプトを無視してローカルに詳細を追加する……らしい。

denoiseの値を上げるとディティールがさらに追加できる。
上げ過ぎると余計なのが出る。

ダウンサンプリングレートというのがあり、値を増やすと画像がぼやける。
ぼやけた分モデルがより細部に自由な構成を入れられる。
下げ過ぎると余計なのが出る。

[3 methods to upscale images in Stable Diffusion (ControlNet tile upscale, SD upscale, AI upscale) - Stable Diffusion Art](https://stable-diffusion-art.com/controlnet-upscale/#Method_3_ControlNet_tile_upscale)

## 普通のアップスケーラー
SDかけずに専用モデルだけでUpscaleする。
比較
[\[UPDATED\] Comparing 4 popular upscalers in the SD Upscale | Civitai](https://civitai.com/articles/50/updated-comparing-4-popular-upscalers-in-the-sd-upscale)
サービス
[GitHub - upscayl/upscayl: 🆙 Upscayl - 1 Free and Open Source AI Image Upscaler for Linux, MacOS and Windows.](https://github.com/upscayl/upscayl)

モデル
[OpenModelDB](https://openmodeldb.info)
読めない文字を読めるようにできるレベルのものまである。

[4x DWTP DS dat2 v3 2 - OpenModelDB](https://openmodeldb.info/models/4x-DWTP-DS-dat2-v3-2)

## TileKsampler
タイルをランダムで選び継ぎ目を隠す。
もしくはタイルの中心部分だけ書き直し、コンテキストを取る。
ふつうのタイリングも可能。

[GitHub - BlenderNeko/ComfyUI\_TiledKSampler: Tiled samplers for ComfyUI](https://github.com/BlenderNeko/ComfyUI_TiledKSampler)

一応Impact Packにもある。strategyも同じなので入れる必要ないかも。

継ぎ目が気になるときに使うものであって、高画質になるものではないと予想。
