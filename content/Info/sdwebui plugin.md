---
tags:
  - Info
aliases:
  - sdwebui extension
---

daily:: [2024-03-11](/Daily_Note/2024-03-11.md)
up:: [sdwebui](../Bar/App/stable-diffusion-webui.md)

# Plugin
並べる。
おすすめ

- layerdiffusion
- controlnet
- adetailer

## プロンプト系

### a1111-sd-webui-tagcomplete
[DominikDoom/a1111-sd-webui-tagcomplete: Booru style tag autocompletion for AUTOMATIC1111's Stable Diffusion web UI](https://github.com/DominikDoom/a1111-sd-webui-tagcomplete)

タグ補完。

### sdweb-easy-prompt-selector
[GitHub - blue-pen5805/sdweb-easy-prompt-selector](https://github.com/blue-pen5805/sdweb-easy-prompt-selector)

ボタンを押していくことでプロンプトを生成する。

[【Web UI】AIイラストのプロンプト入力を楽にする方法【AUTOMATIC1111】 | しぐにゃもブログ](https://signyamo.blog/web-ui_prompt/)

### clip-interrogator
[GitHub - pharmapsychotic/clip-interrogator-ext: Stable Diffusion WebUI extension for CLIP Interrogator](https://github.com/pharmapsychotic/clip-interrogator-ext)

画像をプロンプトに変換する。
pythonライブラリあり。

[GitHub - pharmapsychotic/clip-interrogator: Image to prompt with BLIP and CLIP](https://github.com/pharmapsychotic/clip-interrogator)

もしかしたら今は公式で対応しているかもしれない。

BLIPで初期情報、CLIPで情報の洗練を行う。
[Clip Interrogator - App, Demo, Working, Models Explained](https://clipinterrogator.org/)
ちなみにそれぞれBootstrapped Language Image Pretraining、Contrastive Language–Image Pre-trainingの略。

ViT-L-14-openaiがSD1.5用。
ViT-bigがSDXL用。
SDXLではLとGが使われている。

LとGではGの方が新しく自然言語的で大きい。
たぶんここがSDXLでDanbooruタグが動きにくい理由。
[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/15ggn9w/sdxl_mini_study_clip_g_vs_clip_l_best_prompting/)
[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/197sqc7/how_does_sdxl_use_vitg_and_which_version/)

### PromptGallery-stable-diffusion-webui
[GitHub - dr413677671/PromptGallery-stable-diffusion-webui: A prompt cookbook worked as stable-diffusion-webui extenstions.](https://github.com/dr413677671/PromptGallery-stable-diffusion-webui)

プロンプトを画像付きで保存できる。
yamlを直接弄らないとプロンプトは保存できない。

### extensionEditor
[GitHub - tasrr/extensionEditor](https://github.com/tasrr/extensionEditor)

プロンプトエディタ。

### stable-diffusion-webui-two-shot
[GitHub - opparco/stable-diffusion-webui-two-shot: Latent Couple extension (two shot diffusion port)](https://github.com/opparco/stable-diffusion-webui-two-shot)

プロンプトが効く範囲を指定する。

### sd-webui-regional-prompter
[GitHub - hako-mikan/sd-webui-regional-prompter: set prompt to divided region](https://github.com/hako-mikan/sd-webui-regional-prompter)

プロンプトが効く範囲を指定する。
多分上のより高機能。

[GitHub - cololy/sd-webui-regional-prompter: set prompt to divided region](https://github.com/cololy/sd-webui-regional-prompter)
フォーク版。
diffrepromというプロンプト指定で領域決めて変更する機能がある。

### sd-webui-cutoff
[GitHub - hnmr293/sd-webui-cutoff: Cutoff - Cutting Off Prompt Effect](https://github.com/hnmr293/sd-webui-cutoff)

タグ順序によって起きるタグがうまく機能しない問題を解決する。

### stable-diffusion-prompt-reader
[GitHub - receyuki/stable-diffusion-prompt-reader: A simple standalone viewer for reading prompts from Stable Diffusion generated image outside the webui.](https://github.com/receyuki/stable-diffusion-prompt-reader)

画像メタデータのプロンプトを表示する。

### stable-diffusion-webui-daam
[GitHub - kousw/stable-diffusion-webui-daam: DAAM for Stable Diffusion Web UI](https://github.com/kousw/stable-diffusion-webui-daam)

プロンプトが画像のどこに効いているのかをヒートマップで可視化する。
SD1.5で使うのがメインっぽい。

[AUTOMATIC1111 の便利な機能](http://dskjal.com/deeplearning/automatic1111.html#daam)
[【Web UI】AIイラストのプロンプトの影響範囲を見る方法【AUTOMATIC1111】 | しぐにゃもブログ](https://signyamo.blog/web-ui_prompt_volume/)

### stable-diffusion-webui-visualize-cross-attention-extension
[GitHub - benkyoujouzu/stable-diffusion-webui-visualize-cross-attention-extension](https://github.com/benkyoujouzu/stable-diffusion-webui-visualize-cross-attention-extension)

作成した画像に対して行うプロンプト影響可視化。
一つずつ、しかも面倒な方法でしかトークン指定できない。ただし機能上AI生成でなくてもプロンプトを可視化できる。

[AUTOMATIC1111 の便利な機能](http://dskjal.com/deeplearning/automatic1111.html#visualize-cross-attention)

### unprompted
[GitHub - ThereforeGames/unprompted: Templating language written for Stable Diffusion workflows. Available as an extension for the Automatic1111 WebUI.](https://github.com/ThereforeGames/unprompted)

ワイルドカードとif文により、実行するたびに特定の文を切り替えて生成することが出来る。

### sd-dynamic-prompts
[GitHub - adieyal/sd-dynamic-prompts: A custom script for AUTOMATIC1111/stable-diffusion-webui to implement a tiny template language for random prompt generation](https://github.com/adieyal/sd-dynamic-prompts)

ワイルドカードを使う。[unprompted](<#unprompted>)よりメンテされてる。

### stable-diffusion-NPW
[GitHub - muerrilla/stable-diffusion-NPW: Negative Prompt Weight: Extension for Stable Diffusion Web UI](https://github.com/muerrilla/stable-diffusion-NPW)

ネガティブプロンプトのかかり方をスライダーで調整できる。

## sd-danbooru-tags-upsampler
プロンプトをアップスケール出来る。

[GitHub - p1atdev/sd-danbooru-tags-upsampler: Makes the prompts for generating anime images more detailed by upsampling Danbooru tags.](https://github.com/p1atdev/sd-danbooru-tags-upsampler?tab=readme-ov-file)


---

## 画面構成系

### sd-webui-3d-open-pose-editor
[GitHub - nonnonstop/sd-webui-3d-open-pose-editor: 3d openpose editor for stable diffusion and controlnet](https://github.com/nonnonstop/sd-webui-3d-open-pose-editor)

3D上でOpenPoseを編集できるエディタ。
ここのウェブサイトに飛んでるので、webuiを立ち上げなくても作成できる。

[GitHub - ZhUyU1997/open-pose-editor: online 3d openpose editor for stable diffusion and controlnet](https://github.com/ZhUyU1997/open-pose-editor)

### stable-diffusion-webui-depthmap-script
[GitHub - thygate/stable-diffusion-webui-depthmap-script: High Resolution Depth Maps for Stable Diffusion WebUI](https://github.com/thygate/stable-diffusion-webui-depthmap-script)

深度マップを取り出す。

### sd-3dmodel-loader
[GitHub - jtydhr88/sd-3dmodel-loader: A custom extension for stable diffusion webui to load local 3D model/animation](https://github.com/jtydhr88/sd-3dmodel-loader)

objモデルなどをロードしポーズを付けられる。
アニメーションを読み込むこともできる。

### posex
[GitHub - hnmr293/posex: Posex - Estimated Image Generator for Pose2Image](https://github.com/hnmr293/posex)

Pose2Imageを使用しキャラクターのポーズを決める。

### sd-webui-llul
[GitHub - hnmr293/sd-webui-llul: LLuL - Local Latent upscaLer](https://github.com/hnmr293/sd-webui-llul)

四角で囲った場所にディティールを追加する。
ちなみにLocal Latent upscaLerの略。

[指定部分にディテールを追加する拡張機能「LLuL」の紹介【Stable Diffusion web UI】 | くろくまそふと](https://kurokumasoft.com/2023/03/10/stable-diffusion-llul/)

### multidiffusion-upscaler-for-automatic1111
[GitHub - pkuliyi2015/multidiffusion-upscaler-for-automatic1111: Tiled Diffusion and VAE optimize, licensed under CC BY-NC-SA 4.0](https://github.com/pkuliyi2015/multidiffusion-upscaler-for-automatic1111)

タイルで一部ずつ作ることでVRAM抑えてアップスケールしたり、領域分けて生成したりできる。
forgeには最初から搭載されている。

### sd-forge-layerdiffuse
[GitHub - layerdiffusion/sd-forge-layerdiffuse: \[WIP\] Layer Diffusion for WebUI (via Forge)](https://github.com/layerdiffusion/sd-forge-layerdiffuse)

背景透過。
forge版でしか使えない。

### sd-webui-regional-prompter
[GitHub - hako-mikan/sd-webui-regional-prompter: set prompt to divided region](https://github.com/hako-mikan/sd-webui-regional-prompter)
[｢Regional Prompter｣による描画領域の分割【Stable Diffusion web UI】](https://koneko3.com/how-to-use-regional-prompter/)

画面の部分ごとにプロンプトを効かせられる。

### LoRA Block Weight
[顔だけLoRA！誰でも理解できるLoRA Block Weightのすぐに使える簡単解説](https://sorenuts.jp/751/)
[Tips：LoRA Block Weightの使い方（Anything-v4.0）｜YAMADA｜pixivFANBOX](https://yamadacolor.fanbox.cc/posts/5532765)
[【Stable Diffusion】階層別に重さを設定できるLoRA Block Weightの使い方 | 動画編集ロードマップ動画編集ロードマップ](https://freeblog-video.com/stable-diffusion_lora-block-weight/)

顔だけなどにLoRAを効かせられる。
LoRAは17の層で出来ており、そのそれぞれが様々な場所に影響を及ぼす。しかし層ごとにどこにおもに影響を与えるかは違う。
この拡張機能は層ごとにLoRAをOnOffして変化を絞るというもの。
モデルごとに効き方は違うので沼。ちなみにSDXLなどだと層数が変わる。

---

## その他

### sd_civitai_extension
[GitHub - civitai/sd\_civitai\_extension: All of the Civitai models inside Automatic 1111 Stable Diffusion Web UI](https://github.com/civitai/sd_civitai_extension)

civitaiに直接アクセスする。試した限りではうまくいかなかった。それどころか追加したpipパッケージが、extensionを消した後もcivitaiにアクセスしようとしてくる。

### sd-webui-bilingual-localization
[journey-ad/sd-webui-bilingual-localization: Stable Diffusion web UI bilingual localization extensions. SD WebUI双语对照翻译插件](https://github.com/journey-ad/sd-webui-bilingual-localization#usage)

英語と翻訳を両方表示する。

### stable-diffusion-webui-localization-ja_JP
[GitHub - Katsuyuki-Karasawa/stable-diffusion-webui-localization-ja\_JP: sd.webui(AUTOMATIC1111版)の日本語化](https://github.com/Katsuyuki-Karasawa/stable-diffusion-webui-localization-ja_JP)

日本語化ファイル。


### ABG_extension
[GitHub - KutsuyaYuki/ABG\_extension](https://github.com/KutsuyaYuki/ABG_extension)

背景削除。

### stable-diffusion-webui-state
[GitHub - ilian6806/stable-diffusion-webui-state: Stable Diffusion extension that preserves ui state](https://github.com/ilian6806/stable-diffusion-webui-state)

リロード時、スライダーとかの位置を保持する。



### PBRemTools
[GitHub - mattyamonaca/PBRemTools: Precise background remover](https://github.com/mattyamonaca/PBRemTools)

背景削除。[ABG\_extension](<#ABG_extension>)の派生。
設定すればテキストで物体を指定して切抜きもできる。



### sd-canvas-editor
[GitHub - jtydhr88/sd-canvas-editor: A custom extension for sd-webui that integrated a full capability canvas editor which you can use layer, text, image, elements, etc](https://github.com/jtydhr88/sd-canvas-editor)

画像エディタの追加。背景切抜きやレイヤー分も可能。

### sd_save_intermediate_images
[GitHub - AlUlkesh/sd\_save\_intermediate\_images: Save intermediate images during the sampling process](https://github.com/AlUlkesh/sd_save_intermediate_images)

中間画像(ノイズを除いている最中)を保存できる。


### stable-diffusion-webui-auto-tls-https
[GitHub - papuSpartan/stable-diffusion-webui-auto-tls-https: An extension for AUTOMATIC1111's Stable Diffusion Web-UI that enables easy or zero-conf TLS for HTTPS](https://github.com/papuSpartan/stable-diffusion-webui-auto-tls-https)

HTTPSでwebuiと通信する。

### db-storage1111
[GitHub - takoyaro/db-storage1111: automatic1111's stable-diffusion-webui extension for storing images to a database](https://github.com/takoyaro/db-storage1111)

データベースに画像を保存する。

### sd-webui-panorama-viewer
[GitHub - GeorgLegato/sd-webui-panorama-viewer: Sends rendered SD\_auto1111 images quickly to this panorama (hdri, equirectangular) viewer](https://github.com/GeorgLegato/sd-webui-panorama-viewer)

Equirectangular と Cubemaps (Polyhedron net)の画像を表示するためのビューア。相互変換も可能。

### openOutpaint-webUI-extension
[GitHub - zero01101/openOutpaint-webUI-extension: direct A1111 webUI extension for openOutpaint](https://github.com/zero01101/openOutpaint-webUI-extension)

Outpaintにより画像の外側を作成できる。
やった時は黒になりがちだった。

### sdweb-eagle-pnginfo
[GitHub - bbc-mc/sdweb-eagle-pnginfo: Send your creation image to Eagle with PNGinfo. Extension for Stable Diffusion UI by AUTOMATIC1111](https://github.com/bbc-mc/sdweb-eagle-pnginfo)

画像整理ソフトEagleに画像を送信する。

### multi-subject-render
[GitHub - Extraltodeus/multi-subject-render: Generate multiple complex subjects all at once!](https://github.com/Extraltodeus/multi-subject-render)

背景と物体を雑コラする。
恐らく単体ではミームしか作れない。


### a1111-sd-webui-locon
[GitHub - KohakuBlueleaf/a1111-sd-webui-locon: A extension for loading LyCORIS model in sd-webui](https://github.com/KohakuBlueleaf/a1111-sd-webui-locon)

新しいLoRA亜種をロードするための拡張機能。
今は新しくなってる。

[【Stable Diffusion】LyCORIS（LoHa・LoCon）をWebUIで使用する方法を紹介！【LoRA亜種】 | 悠々ログ](https://yuuyuublog.org/sd_lycoris/)

[GitHub - KohakuBlueleaf/a1111-sd-webui-lycoris: An extension for stable-diffusion-webui to load lycoris models.](https://github.com/KohakuBlueleaf/a1111-sd-webui-lycoris)

[【Stable Diffusion】全種類のLyCORISを導入できるようになる拡張機能「a1111-sd-webui-lycoris」の紹介！ | 悠々ログ](https://yuuyuublog.org/a1111-sd-webui-lycoris/)

### stable-diffusion-webui-images-browser
[yfszzx/stable-diffusion-webui-images-browser: an images browse for stable-diffusion-webui](https://github.com/yfszzx/stable-diffusion-webui-images-browser)

生成画像ブラウザ。
プロンプト含め確認可能。

[【Web UI】AIイラストのプロンプト入力を楽にする方法【AUTOMATIC1111】 | しぐにゃもブログ](https://signyamo.blog/web-ui_prompt/)

### sd-webui-train-tools
[GitHub - liasece/sd-webui-train-tools: The stable diffusion webui training aid extension helps you quickly and visually train models such as Lora.](https://github.com/liasece/sd-webui-train-tools)

webui上でLoRAをトレーニングする。

[遂に登場！！待望のWebUI上でLoRA学習可能な拡張機能を使いトレーニングする方法 | 経済的生活日誌](https://economylife.net/train-lora-on-webui/)

### stable-diffusion-webui-Layer-Divider
[GitHub - jhj0517/stable-diffusion-webui-Layer-Divider: Layer-Divider, an extension for stable-diffusion-webui using the segment-anything model (SAM)](https://github.com/jhj0517/stable-diffusion-webui-Layer-Divider)
生成画像をレイヤー分する。
色分けメインっぽい。

[「layerdivider」で画像を色ごとに異なるレイヤーに分ける方法とWindowsへの導入法 | 経済的生活日誌](https://economylife.net/layerdivider-how-to-use-windows/)

### stable-diffusion-webui-model-toolkit
[GitHub - arenasys/stable-diffusion-webui-model-toolkit: A Multipurpose toolkit for managing, editing and creating models.](https://github.com/arenasys/stable-diffusion-webui-model-toolkit)

モデルを軽くする。

[【Stable Diffusion】モデルデータを軽量化してくれる拡張機能「model-toolkit」の使い方を紹介！【ストレージ節約】 | 悠々ログ](https://yuuyuublog.org/modeltoolkit/)

### seed_travel
[GitHub - yownas/seed\_travel: Small script for AUTOMATIC1111/stable-diffusion-webui to create images between two seeds](https://github.com/yownas/seed_travel)

近傍シードを探索してくれる。

### SadTalker
[GitHub - OpenTalker/SadTalker: \[CVPR 2023\] SadTalker：Learning Realistic 3D Motion Coefficients for Stylized Audio-Driven Single Image Talking Face Animation](https://github.com/OpenTalker/SadTalker)
[SadTalkerで遊んでみよう！｜BD｜pixivFANBOX](https://br-d.fanbox.cc/posts/5685086)
音声に合わせて口パク動画を作る。
リアル調がメインでアニメ調はそもそも変換失敗することが多い模様。

また、導入が面倒。いくつかのモデルファイルを(windowsは)自分で配置することになる。

別ツールとして動作させることもできるが、その場合のpythonバージョンが3.8でありsdwebuiの3.10とは別。

`AttributeError: 'Row' object has no attribute 'style'`
これが出た場合はgradioのバージョンを落とす。
```
pip uninstall gradio
pip install gradio==3.41.2
```

### ADetailer
[GitHub - Bing-su/adetailer: Auto detecting, masking and inpainting with detection model.](https://github.com/Bing-su/adetailer)

顔、体、手を自動で検出し拡大して書き直し、縮小してなじませる。

[ADetailerインストールと5つの使い方(顔、手、体の崩れを補正…)と仕組みを徹底解説 - 禁断のAI](https://kindanai.com/manual-adetailer/)

# 外部ツール
## DeepDanbooru
[Deep Danbooru](http://dev.kanotype.net:8003/deepdanbooru/)

画像からタグを類推する。
AUTOMATIC1111はローカルでこれを実行する機能がある。

## sd-tagging-helper
[GitHub - arenasys/sd-tagging-helper: A GUI to help with manual tagging and cropping](https://github.com/arenasys/sd-tagging-helper)

タグ付けエディタ。


## StabilityMatrix
全ての環境で同じModelを使えるように環境を整えてくれる。
Comfy UIなどとも共有可能。
ただしwebui-user.batからは起動できなくなる。

[StabilityMatrix の設定や注意点｜だにえる](https://note.com/da2el_ai/n/n09ad7dddb879)


[sd iopaint](<./sd iopaint.md>)

## Talking Head Anime
[GitHub - pkhungurn/talking-head-anime-4-demo: Demo Programs for the "Talking Head(?) Anime from a Single Image 4: Improved Models and Its Distillation" Project](https://github.com/pkhungurn/talking-head-anime-4-demo?tab=readme-ov-file)
[GitHub - pkhungurn/talking-head-anime-3-demo: Demo Programs for the "Talking Head(?) Anime from a Single Image 3: Now the Body Too" Project](https://github.com/pkhungurn/talking-head-anime-3-demo)

2Dアニメキャラをリアルタイムで動かす。
4を使う場合はpoetryのインストール、手動のモデルDLが必要。Googleからface_landmarkerをDLしface_landmarker_v2_with_blendshapes.taskに名前を変え配置する必要もある。

音声ファイルで動かす予定はない。が、フォークで作られている。

[WIll be there support for audio driven lips animation? · Issue #9 · pkhungurn/talking-head-anime-3-demo · GitHub](https://github.com/pkhungurn/talking-head-anime-3-demo/issues/9)

## sd-webui-infinite-image-browsing
画像の管理。
SDなしで動く奴もあるが、そちらはpythonをコンパイルしているNutikaの関係でウイルスブロックされる。どうも悪意ある奴にとってpythonが高速に動くのは魅力的らしい。

[GitHub - zanllp/sd-webui-infinite-image-browsing: A fast and powerful image/video browser for Stable Diffusion webui / ComfyUI / Fooocus / NovelAI, featuring infinite scrolling and advanced search capabilities using image parameters. It also supports standalone operation.](https://github.com/zanllp/sd-webui-infinite-image-browsing)

## sd-webui-detail-daemon
ある部分でノイズをさらに追加することでdetailを追加する。

[GitHub - muerrilla/sd-webui-detail-daemon: Extension for A1111's Stable Diffusion Webui. Controls amount of detail.](https://github.com/muerrilla/sd-webui-detail-daemon?tab=readme-ov-file#but-in-practice)

発想はほぼカムカム法。
本来考えていた途中からノイズを入力する手法。

[【イラストAI】ノイズやテクスチャを使って描き込み量をめちゃくちゃに増やそう！1/4｜御月望未（みつきのぞみ）](https://note.com/mitsukinozomi/n/n500c7a9ea195)

## sd-webui-cd-tuner
ColorとDetailが調節できる。
作成中のノイズに干渉する機能。ほぼカムカム。

[GitHub - hako-mikan/sd-webui-cd-tuner: Color/Detail control for Stable Diffusion web-ui](https://github.com/hako-mikan/sd-webui-cd-tuner)

## sd-forge-couple
regional prompterの進化版。
改行で分けるだけの簡単操作。改行以外も指定できる。

[GitHub - Haoming02/sd-forge-couple: An Extension for Forge Webui that implements Attention Couple](https://github.com/Haoming02/sd-forge-couple)

ドラッグで領域を設定することも可能。

構図が分かっているなら、一人一人生成する方法もある。
[複数キャラ画像の生成 · Zuntan03/EasySdxlWebUi Wiki](https://github.com/Zuntan03/EasySdxlWebUi/wiki/%E8%A4%87%E6%95%B0%E3%82%AD%E3%83%A3%E3%83%A9%E7%94%BB%E5%83%8F%E3%81%AE%E7%94%9F%E6%88%90)

## sd-webui-enable-checker
拡張機能が今機能してるかどうか可視化するチェッカー。

[GitHub - shirayu/sd-webui-enable-checker: Checker of "enable" statuses in SD Web UI](https://github.com/shirayu/sd-webui-enable-checker)