---
date: 2024-05-31
tags:
  - Bar
aliases:
  - sd
---

up:: 

安定拡散モデル。
ノイズを取り払っていくことで画像を生成する。
本当はこのタグの上にt2iみたいなのを入れるべきなんだけど、sdが圧倒してるので。
hunyuanとかpixArtが台頭したら考える。

## 1.5とXL
1.5モデル（の有名な奴）はDanbooruタグによって調整されている。そのためDanbooruタグを使えば狙った絵が出せる。いわゆる呪文。
ControlNetなどの効きもいい。

512x512を元に学習されており、それより大きいものを作ろうとすると不具合が出る。
i2iで描き直す場合は割と平気。

XLは完全に描き直されている。自然言語での指定をサポートするCheckpointもある。
PonyDiffusionのようにe621タグを使用するものもある。

1024x1024で学習されている。逆にそれより小さい画像を作ろうとするとおかしくなりがち。

## 絵がうまくなる
これは表現の本を読んだからでは？

[ひたすらAI絵をやってたら絵が描けるようになってた話｜賢木イオ @studiomasakaki](https://note.com/studiomasakaki/n/n1732db6116df)

## Nagative Embedding
よく使うネガティブプロンプトを一つの言葉にまとめて適用させる。
プロンプトではなく埋め込みとして読み込ませるので75トークン制限に引っかからない。
SDXLかSD1.5かで使うモデルが違う。留意。

[Stable Diffusion よく使われる Embeddings / Negative Embeddings / Negative TI | iPentec](https://www.ipentec.com/document/software-stable-diffusion-negative-embedding)


## step数の仕組み
[Increasing sampling steps to a high number decreases quality per step drastically. · Issue 1113 · AUTOMATIC1111/stable-diffusion-webui · GitHub](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/1113#issuecomment-1258446573)
[Allow saving intermediate Steps to separate image files during generation · Issue 1026 · AUTOMATIC1111/stable-diffusion-webui · GitHub](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/1026)
[Hyper-SD and Hyper-SDXL fast models - Stable Diffusion Art](https://stable-diffusion-art.com/hyper-sdxl/#Hyper-SDXL_1-step_LoRA)

完成体までのノイズ除去をいくつ分割して適用するかというもの。
乱暴に言うと、100stepなら完成体までの1%分だけ適用する。

この仕組み上、40stepの10と100stepの10は別物。

[sdwebui resize](<../Info/sdwebui resize.md>)

## HuggingFace -   fatal: could not read Username for '[https://huggingface.co](https://huggingface.co/)': No such device or address

`git clone https://<user_name>:<token>@huggingface.co/<repo_path>`。あとからremoteとset-url originで変えることもできる。

## クラウドGPU

[【完全無料】低スペックPCでもStableDiffusionWebUIを動かす方法【SageMaker】｜これすご-AIクリエイティブ-](https://note.com/koresugo/n/n11e3260e0249)

kaggleとSagemaker Studio Labで何とかなる。
Kaggleは一応NSFW禁止みたいなので注意。

## ノイズ法、カムカム法
SDはノイズを潰して絵にするため、のっぺりになりがち。
そこでノイズを追加しまくることで書き込みを増やす。

色彩感覚の破壊と書き込みの増加で出来ている。
プロンプトも大事。

書き込みの増加の方向は読ませるノイズによって大体決まる。
なので欲しいものが大体決まっているなら、それっぽいテクスチャをプリプロかけて通常通りLineartに入れ書き込みを増やし、同じ画像で色彩を破壊するといい。

サンプラーはDDIM系以外。CFGは低め。ステップは気持ち多め。
CN強度は書き込み側(Lineart、Anime)は強度0.5、startendは0.1~0.6
色彩(tile)は強度1.0、startend0.0~0.1

[【イラストAI】ノイズやテクスチャを使って描き込み量をめちゃくちゃに増やそう！1/4｜御月望未（みつきのぞみ）](https://note.com/mitsukinozomi/n/n500c7a9ea195)


テクスチャを作る。
プロンプト使うなり、Scribble使うなり。
フォトバッシュっぽくまとめ、カムカム法とtiling機能を掛けるとテクスチャを作れる。

[【イラストAI】テクスチャを作って使おう！【テクスチャ法】｜御月望未（みつきのぞみ）](https://note.com/mitsukinozomi/n/ne735cc59afd1)

黒で塗りつぶして暗い画像を作ることもできる。

[ControlNetを使ってめちゃくちゃダークな絵を描いてもらおう！｜御月望未（みつきのぞみ）](https://note.com/mitsukinozomi/n/nc002a1f0f77b)


SDXLでやってみたが、llliteのLineartとtileでは上手くいかなかった。
先駆者によるとt2i-adapterの奴がいいっぽい。

[【ComfyUI+SDXL】描き込み強化を重視したHires.fixを組み込んだワークフロー｜mogami](https://note.com/mogami_aiillust/n/n76f13b63aa39)

## SD3
Have you really been far even as decided to use even go want to do look more like. Have you ever had a dream that you, um, you had, your, you, you could, you'll do, you, you wants, you, you could do so, you , you'll do, you could, you, you want, you want them, to do you so much, you could do anything

![](<../images/stable-diffusion-3-v0-qudt231wgjqc1.webp>)

[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/1bnjm3i/stable_diffusion_3/)

ちょっと前にライセンスが更新され、1億円売上までは無料になった。

[Community License — Stability AI](https://stability.ai/news/license-update)

## SD以外のモデル
- TerDiT
    - [GitHub - Lucky-Lance/TerDiT: TerDiT: Ternary Diffusion Models with Transformers](https://github.com/Lucky-Lance/TerDiT)
- PixArt
    - [GitHub - PixArt-alpha/PixArt-sigma: PixArt-Σ: Weak-to-Strong Training of Diffusion Transformer for 4K Text-to-Image Generation](https://github.com/PixArt-alpha/PixArt-sigma)
    - [PixArt-alpha/PixArt-Sigma · Hugging Face](https://huggingface.co/PixArt-alpha/PixArt-Sigma)
    - イラストとしてはこれが有望かも
    - αが1.5、ΣがXLに当たる
    - プロンプト遵守なものの、その為にT5テキストエンコーダを実行する必要がありかなり重いらしい。
    - 使用するのはCPUのRAMなので、要件自体は軽い
    - [Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/1clf240/a_couple_of_amazing_images_with_pixart_sigma_its/)
    - なお同じくらいの遵守を実現するだけならELLAで可能
    - [Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/1cfacll/pixart_sigma_is_the_first_model_with_complete/)
    - トレーニング代が1.5の10%くらいらしい
    - 唯一画質が微妙
- Lumina
    - 詳細不明
- kwai-kolors
    - 文字が綺麗に出るフォトリアリスティック
    - 中国語もサポート
- Hunyuan

## 書き込み増加
[sd-webui-supermerger/README\_ja.md at main · hako-mikan/sd-webui-supermerger · GitHub](https://github.com/hako-mikan/sd-webui-supermerger/blob/main/README_ja.md#adjust)

マージすることなく結果を出力するsupermerger。
実はCDTunerのような書き込み増加機能が付いており、直接書き込みの多いモデルへの変更を行うことができる。

制作者ははこみかん。またお前か。

## AI Reviewer
[AI Reviewers](https://ai-reviewers.onrender.com/)
裏でClaude Sonnetを使用しているらしい。なのでNSFWはNG。

## CyberHarem
データセット付でLoRAを上げているユーザー。
LoRAの学習用。

## Waifuc
画像を学習用にダウンロードできる奴。
[GitHub - deepghs/waifuc: Efficient Train Data Collector for Anime Waifu](https://github.com/deepghs/waifuc)

その先のパイプラインもある。
[GitHub - deepghs/cyberharem: Cyber Harem of All the Waifus in Games, Mua\~](https://github.com/deepghs/cyberharem)

## B-LoRA
コンテンツとスタイルを分離できるLoRA。
[GitHub - yardenfren1996/B-LoRA: Implicit Style-Content Separation using B-LoRA](https://github.com/yardenfren1996/B-LoRA)

## StableDelight
光の反射を消せる。
IC-Lightなどと合わせるといい。
[GitHub - Stable-X/StableDelight: StableDelight: Revealing Hidden Textures by Removing Specular Reflections](https://github.com/Stable-X/StableDelight)
[StableDelight - work4ai](https://scrapbox.io/work4ai/StableDelight)

## DiLightNet
ライティング。
HDRI画像が使えるっぽい。
また、Stable Diffusion2.1を使う。
[DiLightNet - work4ai](https://scrapbox.io/work4ai/DiLightNet)
[GitHub - iamNCJ/DiLightNet: Official Code Release for \[SIGGRAPH 2024\] DilightNet: Fine-grained Lighting Control for Diffusion-based Image Generation](https://github.com/iamNCJ/DiLightNet)
[GitHub - logtd/ComfyUI-DiLightNet: ComfyUI nodes to use DiLightNet](https://github.com/logtd/ComfyUI-DiLightNet)

## Concept Sliders
概念をスライダーで変えられるスライダーLoRAを作る。
LECOとは違い視点も終点も自由に決められるらしい。
Fixing Handsに使う。
[Concept Sliders - work4ai](https://scrapbox.io/work4ai/Concept_Sliders)

