---
date: 2024-04-04
tags:
  - Info
aliases:
  - sd 高速化
---

up:: [Stable Diffusion](<../Bar/Stable Diffusion.md>)

ステップ数を下げる奴は早いうちに方向性を決定する+プロンプトを指定できない→方向性が決まっており多様性が失われがち。

SDXLでも超高速になるので、大体の方向性を決めるのには丁度良さそう。

cfgを下げるとネガティブが効きにくくなる？

## LCM
ステップ数の減少。一番最初の高速化。
専用のサンプラーを使用することになる。
Eular aやDPM2で何とかなることも。

LoRAあり。

忘れずにCFGを下げる。

OpenRail++。


使用してみたが、LCM samplerに対応できていないモデルもあるっぽい。
abyssは駄目だったがmeinaは行けた。というかabyssだと解像度変えたら崩壊したりなんか挙動が怪しい。
元のモデル、stablediffusion1.5に似てるモデルほどうまくいくらしい。

stepは8でないと使いにくい。
ただ8でふわふわな絵を出すくらいならlcmなし10で充分絵は出る。
……が、そんなことが出来るのはabyssくらいのものなので。

Meinaだと許容範囲内の絵が出る。

Bluepencilだとギリギリ実用できそう。

ShiratakiMixだと20無いと出せないので有用。

Hires.fixを使ったり横長縦長画像を出力する際に威力を発揮する。

[LCM LoRA の概要｜npaka](https://note.com/npaka/n/n6ac683fa77b8)
[【Stable Diffusion】LCM/LCM LoRAの使い方！画像生成を高速化  |  イクログ](https://ikuriblog.com/how-to-use-lcm-lcm-lora/)
[LCM-LoRAマージモデル blue\_pencil-XL-LCMを試してみた【Stable Diffusion イラスト系モデル紹介】  |  IT技術者のDTM奮闘記](https://itdtm.com/sdmodel-bluepenxl-lcm/)


LoRA重み0.3、cfg2、ステップ8、lcm、normal。
高速で収束していくため、i2iで二度掛けするといい感じになる。

普通にやるなら5~6ステップ。Euler使うなら8~10。
重みは0.5。
[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/19ajgns/question_about_lcm_models/)

## Turbo
ステップ数の減少。Stability aiから出た。
1ステップ可能。

技術スタックはAdversarial Diffusion Distillation, ADD。

[Stable Diffusion WebUIでSDXL Turbo-LoRAを使用する方法  |  IT技術者のDTM奮闘記](https://itdtm.com/sdxl-turbo-lora/)

## Lightning
ステップ数の減少。TikTok。
ステップごとのモデルが発表されている。
いちおうLCMよりいいという報告がある。

サンプラーがEuler、スケジューラーがsgm_uniformが推奨。
ないならEuler aでもいい。

LoRAあり。
[ByteDance/SDXL-Lightning at main](https://huggingface.co/ByteDance/SDXL-Lightning/tree/main)

忘れずにCFGを下げる。

OpenRail++。



[blue\_pencil-XL / LCM, Lightning - v5.0.0-lightning | Stable Diffusion Checkpoint | Civitai](https://civitai.com/models/202108/bluepencil-xl-lcm-lightning)
このモデルではDPM++2M SGMが一番よく働いた。
8ステップで扱うが、20ステップとか必要になるのを考えると早い。

[【高速生成】Stable Diffusionに「SDXL Lightning Lora」を導入すれば、生成時間が半減に！？  |  IT技術者のDTM奮闘記](https://itdtm.com/sdxl-lightning-lora/)


SDXLで使用。LoRA1.0、cfg2、ステップ8、Euler、sgm_uniform。
……さすがに最終出力用ではない。あとi2iに使うモノでもない。

## Hyper-SD
LCMやLightningより絵柄の変化が少ないらしい。
ResAdapterと合わせて使用しているが、確かにCFGが低くても問題ない感じ。
Preserve CFGというのもあるけどあまり効果は無かった。

人物画像ならアプスケ時にかけっぱなしにしてもどうにかなる。

SD1.5でも使用可能。

CFGは通常で0.6~1.2、preserveで5~8。

[ByteDance/Hyper-SD · Hugging Face](https://huggingface.co/ByteDance/Hyper-SD)
[Hyper-SD and Hyper-SDXL fast models - Stable Diffusion Art](https://stable-diffusion-art.com/hyper-sdxl/)

推奨サンプラーはTCD。

仕組み。
答えから逆算するLCMとは違い、ちゃんとステップを取る。

[Hyper-SD and Hyper-SDXL fast models - Stable Diffusion Art](https://stable-diffusion-art.com/hyper-sdxl/#Hyper-SDXL_1-step_LoRA)

1は流石に使えないが、4ぐらいだと使える。
TCD合わせるといい。下のは間違って1stepと4stepLoRAを両方かけた奴。

![](<../images/ComfyUI_temp_vljxu_00002_.png>)

## SDXS
ワンステップ。
[IDKiro/SDXS-512-DreamShaper-Anime · Hugging Face](https://huggingface.co/IDKiro/SDXS-512-DreamShaper-Anime)

## TCD
Trajectory Consistency Distillation。
蒸留。Hyperと源流が同じ。というかこっちが源流。
推奨サンプラーはTCD。書き込みが増える。

[h1t/TCD-SD15-LoRA · Hugging Face](https://huggingface.co/h1t/TCD-SD15-LoRA)
[h1t/TCD-SDXL-LoRA · Hugging Face](https://huggingface.co/h1t/TCD-SDXL-LoRA)

## SSD-1B
小型化、高速化モデル。
そもそもモデルを差し替えることになる。

[segmind/SSD-1B · Hugging Face](https://huggingface.co/segmind/SSD-1B)

一応アニメモデルがあるため、多少は使える。

[furusu/SSD-1B-anime · Hugging Face](https://huggingface.co/furusu/SSD-1B-anime)

## small-sd
SD1.5時代のSSD-1B。

[segmind/small-sd · Hugging Face](https://huggingface.co/segmind/small-sd)

## CFG 1

cfgを1にするとネガティブ側の計算がカットされ早くなるらしい。

[SDXLの軽量版モデルからアニメモデルをつくる｜gcem156](https://note.com/gcem156/n/n66caaf56d5a4)
[生成速度を2倍にするLoRA｜gcem156](https://note.com/gcem156/n/n972b7a6afbc6)


## LCM,TCD,Hyperの比較
[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/1cewdw1/3_model_acceleration_techniques_lcmtcdhyper_sd15/)




## ResAdapter
サポートしてない解像度の画像を出力させるLoRA。
SDXLの1024制限を突破して512で作れば早くなる。ControlNetやLCMの併用も可能な模様。
ファイルが二つあるがpytorch_loraの方。

[jiaxiangc/res-adapter · Hugging Face](https://huggingface.co/jiaxiangc/res-adapter)
[ComfyUI-ResAdapter/\_\_init\_\_.py at main · jiaxiangc/ComfyUI-ResAdapter · GitHub](https://github.com/jiaxiangc/ComfyUI-ResAdapter/blob/main/__init__.py)

大きい解像度も出せるはずだが、なんかうまくいかない。
普通にHiDiffusionを使ったほうが良いと思う。

## TensorRT
モデルの最適化。RTXでないと使えない。
自前でモデルの変換を行う。

絵が変わらない。ただしサイズは固定でVRAM12GB。
ContrlNetが使えない(2024年4月4日)

3倍程度。
[stable-diffusion-webui の TensorRT 拡張(まさかのNVIDIA公式)を使うと早い！！！ので使い方など｜ぶるぺん/blue.pen5805](https://note.com/blue_pen5805/n/n08c087967e0c)

## StreamDiffusion
手法じゃないが、LCMなどを使って1秒以下爆速画像生成を行う専門ソフト。

## Cascade
文字列用モデル。いちおう10~20%早い。

StageA,B,Cに分かれて動作する。
Aでメインの画像生成、Bで高解像度、CでContrlNetやLoRAによる微調整が入る。
AとBは相互に行き来する。

[Stable Cascade Workflow · GitHub](https://gist.github.com/comfyanonymous/0f09119a342d0dd825bb2d99d19b781c)

ComfyUIだとAはVAE扱い。
aはmodels/VAE、b,cはmodels/unetに入れる必要がある。
またCLIPモデルとしてtext_encoderのmodel.safetensorsがmodels/clipに必要。



非商用。

[Stable Diffusionの第３世代、Stable Cascade を詳細解説❗最高峰の画像生成が瞬足で可能に❗｜葉加瀬あい🎈あいラボの詳細はプロフィール欄まで🎈\_\_ᗢᘏᓗ](https://note.com/ai_hakase/n/n0314f8ce2304)
[Windows上のComfyUIでStable Cascadeを試す（推奨VRAM 8GB）｜まゆひら](https://note.com/mayu_hiraizumi/n/n20cda703c65a)

bだけliteにするのも可能。

## HyperTile
tileを応用した高速化。画像をタイルごとに分割し、それぞれ作成して繋ぐ。
Tile sizeが小さければ小さいほど高速化するが、画質が落ちる。またそれに伴って使用RAMが増加する。

[HyperTile/README.md at main · aria1th/HyperTile · GitHub](https://github.com/aria1th/HyperTile/blob/main/README.md)
[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/1br58nq/hypertile_degrades_image_quality/)

## stable-fast
[GitHub - chengzeyi/stable-fast: Best inference performance optimization framework for HuggingFace Diffusers on NVIDIA GPUs.](https://github.com/chengzeyi/stable-fast)
[ComfyUI+stable-fastで倍速生成](https://zenn.dev/aics/articles/14ce486c13c2a5)
[GitHub - gameltb/ComfyUI\_stable\_fast: Experimental usage of stable-fast and TensorRT.](https://github.com/gameltb/ComfyUI_stable_fast?tab=readme-ov-file)
[Stable Fast - work4ai](https://scrapbox.io/work4ai/Stable_Fast)

既存のPytorchに乗せて使える高速化。
comfyuiでのみ対応している。
sdwebuiも裏でdiffuserを動かしているのでいけるらしい。

やっぱりtritonで引っかかったので保留。

TensorRTの亜種...?
主にdiffuser向け。

WSL2とLinuxで安定動作。

stable-fastはv1.0.1がいいらしい。
[stable-fast version 1.0.0 does not support Windows system？ · Issue 14 · gameltb/ComfyUI\_stable\_fast · GitHub](https://github.com/gameltb/ComfyUI_stable_fast/issues/14)

