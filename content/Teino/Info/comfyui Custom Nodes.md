---
date: 2024-05-22
tags:
  - Info
---

up:: [ComfyUI](<../Bar/App/ComfyUI.md>)

## Custom Nodes
デフォルトで用意されているノードでは出来ないことがいくつかある。
そういう時にこれを使って機能を拡張していく。プラグイン枠。
Managerを使ったほうが早い。
[GitHub - ltdrdata/ComfyUI-Manager](https://github.com/ltdrdata/ComfyUI-Manager)

検索は別に分けて用意されている。
[ComfyUI Nodes Info](https://ltdrdata.github.io/)

## comfyui_controlnet_aux
ControlNetを追加する。
とりあえず入れとけ枠。
依存関係の追加が必要なので忘れず。

地味にGeneration Resolutionという画像からサイズを抽出する機能がある。

[GitHub - Fannovel16/comfyui\_controlnet\_aux: ComfyUI's ControlNet Auxiliary Preprocessors](https://github.com/Fannovel16/comfyui_controlnet_aux)

### module 'cv2' has no attribute 'INTER_AREA'
opencv-python及びopencv-python-headlessのバージョンを下げる。
requirements.txtを見ると`opencv-python>=4.7.0.72`なので4.7.0.72だと確実。

## ComfyUI-layerdiffuse
背景削除。forgeにもあったやつ。
依存関係の追加が必要なので忘れず。
使う場合は生成結果が**64の倍数**である必要がある。

[GitHub - huchenlei/ComfyUI-layerdiffuse: Layer Diffuse custom nodes](https://github.com/huchenlei/ComfyUI-layerdiffuse?tab=readme-ov-file)

- 前景の作成
- 前景マスクの取得
- 前景に背景追加(layer diffuse cond apply)
- 背景に前景追加
- ブレンドと背景から前景だけ取り出す(layer diffuse diff apply)
- ブレンドと前景から背景だけ取り出す(品質低)
    - 後半stepだけ適用するi2iで違和感を低減できる
- 背景に前景を追加し前景だけ切抜き
    - 組合せ
- 背景を指定し前景とブレンドを生成(layer diffuse joint apply)(SD1.5のみ)
- 前景を指定し背景とブレンドを生成
- 前景・背景・ブレンドを生成

複数枚生成するものはLatentバッチもその数送る必要がある。

sub batch sizeはたぶんtileみたいに、イメージを複数のバッチに分けて処理するやつ。VRAM縮小。

画像入力はほぼ不可能。ControlNet、Reference、IP-Adapterは全滅。

IPはできなくもないっぽい？
[Does this work with IPAdapter node? · Issue 31 · huchenlei/ComfyUI-layerdiffuse · GitHub](https://github.com/huchenlei/ComfyUI-layerdiffuse/issues/31)

IPAdapterと同じ手法を用いているため、上手く動かないらしい。
どうしてもという場合は背景透過画像をIPに適用する。

## ComfyUI-Custom-Scripts
オートコンプリート、スナップなどUIを改善。
とりあえず入れとけ。

[GitHub - pythongosssss/ComfyUI-Custom-Scripts: Enhancements & experiments for ComfyUI, mostly focusing on UI features](https://github.com/pythongosssss/ComfyUI-Custom-Scripts)

モデルやLoraのプレビューが出来るローダーを追加。
生成した画像を右クリックすることでComfyUI上からプレビューをセットすることもできる。

ノードのデフォルト値の設定。
設定のwidget defaultで設定可能。

modelやloraのview info。
右クリックでアクセス。Civitaiの情報を取る。推奨プロンプトとかさっと確認できる。

Preset Text。ノード上から編集可能。
任意の文字列に名前を付けて管理できる。この値はブラウザのlocalstorageにあるらしい。

[Can i backup the entries from Preset Text node? · Issue 181 · pythongosssss/ComfyUI-Custom-Scripts · GitHub](https://github.com/pythongosssss/ComfyUI-Custom-Scripts/issues/181)

テキストファイルとして保存したいなら別の拡張機能を使う。

[GitHub - noembryo/ComfyUI-noEmbryo: Some useful nodes for ComyUI](https://github.com/noembryo/ComfyUI-noEmbryo)

System Notification。
通知を飛ばせる。


## ControlNet-LLLite-ComfyUI
lllite系のControlNetを読み込むためのやつ。
Sagemakerではそのまま使えた。
ローカルだと`--force-fp32`を付けないと精度云々で止められる。

[GitHub - kohya-ss/ControlNet-LLLite-ComfyUI](https://github.com/kohya-ss/ControlNet-LLLite-ComfyUI?tab=readme-ov-file)

OOMしやすい。Modelにかけてるからかと思ったが、LoRAもその形式だし違いそう。

## comfyui-fitsize
リサイズするやつ。
画像に合わせたり片側サイズ指定だけでリサイズできたりする。
一応auxのリサイズとget resolution、customのmathを使えば出来なくはないが冗長なので。

[GitHub - bronkula/comfyui-fitsize: A simple set of nodes for making an image fit within a bounding box in comfyui](https://github.com/bronkula/comfyui-fitsize)

## ComfyUI_IPAdapter_plus
IP-Adapterつかうやつ。
facedetailerにmodelを足すと落ちる？

[GitHub - cubiq/ComfyUI\_IPAdapter\_plus](https://github.com/cubiq/ComfyUI_IPAdapter_plus)
[ostris/ip-composition-adapter · Hugging Face](https://huggingface.co/ostris/ip-composition-adapter)

faceidはCUDAを選べるが、公式はVRAM節約のためCPU推奨。


予想以上にいろいろ出来る。



## ComfyUI-Allor
文字入れとかできるらしい。
αチャンネルを弄ったり、画像を回転させたり、単純な図形を描画したりできる。

[GitHub - Nourepide/ComfyUI-Allor: ComfyUI plugin for image processing and work with alpha chanel.](https://github.com/Nourepide/ComfyUI-Allor)

## ComfyUI-Impact-Pack
facedetailerなど、一部分の修正を可能にする。
他にも機能(ImpactIntとか)あるけど一番大事なのはそれ。

[GitHub - ltdrdata/ComfyUI-Impact-Pack](https://github.com/ltdrdata/ComfyUI-Impact-Pack)

hand

![hands-fix-meshgraphormer-impactpack-v0-5rpsm52k06ec1.png](https://preview.redd.it/hands-fix-meshgraphormer-impactpack-v0-5rpsm52k06ec1.png?width=3420&format=png&auto=webp&s=b4bb9819b0d6879b9ffb89e3819028acc1e9de92)

[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/19dlbp2/hands_fix_meshgraphormer_impactpack/)

mesh graphormer hand refiner(aux)に入れると自動で手を認識するらしい。
それをControlNetで形取った後、SEGSDetailerで元の画像と合成する。
SEGSPreviewで生成したものを見比べ、その後Pickerで選んでPasteで張り付ける。

ただこれ3dにしか効果ない？

と思ったが、sdwebuiのdepth-hand-refinerの元が同じっぽいので使えるかも。
もちろん完全にぐちゃぐちゃの手には使えない。60-80点の手を95点にするもの。

facedetailerも大体同様。
普通のKSamplerにfacemodelを追加する感じ。

[【Impact Pack ＃2】顔を再描画！Face Detailerの使い方【ComfyUI】 | 謎の技術研究部](https://www.ultra-noob.com/blog/2024/10/)

[ComfyUI-Impact-Pack/README.md · crystantine/COMFYUI-CUSTOM-NODES at main](https://huggingface.co/datasets/crystantine/COMFYUI-CUSTOM-NODES/blob/main/ComfyUI-Impact-Pack/README.md)

facedetailerで顔も手も出来る。
専用のモデルを選択し顔や手を認識させ、そのまま修正。
[ComfyUI-extension-tutorials/ComfyUI-Impact-Pack/tutorial/detectors.md at Main · ltdrdata/ComfyUI-extension-tutorials · GitHub](https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/detectors.md)

マスクだけ欲しいならsimple detailerに放り込めばいい。

シンプルなdetailerを使う場合は、BBOX Detectorで別にSEGSをつくってから入力する。

MediaPipe FaceMesh to SEGSで顔の一部だけマスクできる。

Reginal prompt機能がある。
マスクでどの部分にどのプロンプトを作用させるか決められる機能。

noiseinjection機能があるが、これはステップごとに別のノイズを注入する機能。
カムカムの代わりにはならない。

[顔だけLoRAやモデルを変えて再生成できる神機能【ComfyUI】](https://sorenuts.jp/9973/)

iterative upscaleという、スケールをステップで分割して徐々に拡大することで崩れにくいアップスケールを行うノードがある。
denoise、cfgを徐々に変更するフックを入力できる。

custom wildcards以下に入れたdynamic promptを解釈できる。
しかもテキスト出力付き。
[ComfyUI-extension-tutorials/ComfyUI-Impact-Pack/tutorial/ImpactWildcard.md at Main · ltdrdata/ComfyUI-extension-tutorials · GitHub](https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/ImpactWildcard.md)

それでもmagic promptとかfeeling luckyはないはずなのでdynamic promptノードはいる。


イメージを右クリックすることでSAM Detectorが使える。
左でマスク、右で除外マスク。

## ComfyUI_Cutoff
要素とそれがかかる対象のセットを切り分ける。
プロンプトを一回Baseに入れた後、Setで一つずつ分解していく。

[GitHub - BlenderNeko/ComfyUI\_Cutoff: cutoff implementation for ComfyUI](https://github.com/BlenderNeko/ComfyUI_Cutoff)

仕組みはほぼBREAK。
対象の単語の後に75トークンになるまで隙間を入れる。

[GitHub - hnmr293/sd-webui-cutoff: Cutoff - Cutting Off Prompt Effect](https://github.com/hnmr293/sd-webui-cutoff?tab=readme-ov-file#how-it-works)

仕組み上修飾語である理由はない。二キャラ出すときに二つregionを用意して全カットすれば問題ないが、それするなら全部concat conditioningでいいのでは？

[Does it still work? · Issue 14 · BlenderNeko/ComfyUI\_Cutoff · GitHub](https://github.com/BlenderNeko/ComfyUI_Cutoff/issues/14)

対象範囲をregion textとして分離した後、target textでその分解したregion text内だけ効かせたいプロンプトをregion textから選択する。
つまりtarget textで領域内に制限したいプロンプトを選択する。
target textにregion textにない単語を入れるとどうなるかは分からないが、マッチング失敗として飛ばされると思う。

target textで複数指定する場合はスペースで区切る。
一連の単語を使用したいならアンダースコアを使う。
アンダースコアを含む単語を使用するなら\\でエスケープする。

embeddingも指定可能。
もちろんアンダースコアはエスケープする。

Cutoff Regions To Conditioning。
strict maskを0にすると指定領域にかからず外側にのみ影響する。
つまり0のときに効果が反転する。

## ComfyUI_FizzNodes
時間(自由に設定できる数値)の経過とともにワークフロー内の値を変更できる。
incrementalを使ったり、currentとmaxを指定できるものがあったり。
また、特定の値の時だけ別の値を設定できるValue Scheduleもある。

これを使用してフレームごとにプロンプトを変更し、結合することでアニメになる。

[GitHub - FizzleDorf/ComfyUI\_FizzNodes: Custom Nodes for Comfyui](https://github.com/FizzleDorf/ComfyUI_FizzNodes)

frameは単純にincrementされるprimitive。
他と連携しやすい、string出力のstring schedulerがある。

バッククオートで囲んだ部分はnumexprでの計算式扱いになる。
[NumExpr 2.0 User Guide — numexpr 2.8.5.dev1 documentation](https://numexpr.readthedocs.io/en/latest/user_guide.html#supported-operators)

変数は以下のものが使える。
現在フレームの`t`は必須。
[Prompt Schedules · FizzleDorf/ComfyUI\_FizzNodes Wiki · GitHub](https://github.com/FizzleDorf/ComfyUI_FizzNodes/wiki/Prompt-Schedules#variables-and-expressions)

## ComfyUI_essentials
マスクプレビューなど、何故かないノードを追加する。
mask previewはいったん画像に変換、画像サイズはresolutionなんたらで足りるので要らない。
マスクのスムースくらいは使うか。

[GitHub - cubiq/ComfyUI\_essentials](https://github.com/cubiq/ComfyUI_essentials)

Simple Mathがついてくる。
[ComfyUI-Custom-Scripts](<#ComfyUI-Custom-Scripts>)のでかいノードが邪魔ならこれがいい。

## ComfyUI-Crystools
リソースモニター、プログレスバー、メタデータ抽出、サイズ抽出、パイプ、プリミティブ、文字列リスト、スイッチなどを追加する。
primitiveは便利だが、設定にintをvalueに入れるみたいなのがあるので、それを弄れば普通のprimitiveで事足りる。

[GitHub - crystian/ComfyUI-Crystools: A powerful set of tools for ComfyUI](https://github.com/crystian/ComfyUI-Crystools)

## ComfyUI-Inspire-Pack
ディレクトリからバッチ読み込みなどの機能を追加する。
それさえ代替できたらImpactで済むのに。

[GitHub - ltdrdata/ComfyUI-Inspire-Pack: This repository offers various extension nodes for ComfyUI. Nodes here have different characteristics compared to those in the ComfyUI Impact Pack. The Impact Pack has become too large now...](https://github.com/ltdrdata/ComfyUI-Inspire-Pack)

## comfyui-reactor-node
顔スワップ。videohelperノードが無いと厄介。
動画のイメージが強いが画像にも使える。
元々128pxの顔を作って引き伸ばすというシステム上、顔がプラスチックになる。

当然だが余りデカい動画をぶっこむとOOMする。VRAM6GBだと縦512の16:9で怒られる。厳しい。

[GitHub - Gourieff/comfyui-reactor-node: Fast and Simple Face Swap Extension Node for ComfyUI](https://github.com/Gourieff/comfyui-reactor-node)

requirements.txtにinsightfaceとonnxが入っている。

標準のonnxruntimeがcuda11.8対象らしく、12.1で動かそうとすると怒られる。
一応12用のonnxruntimeをインストールすれば動く。

["CUDA\_PATH is set but CUDA wasn't able to be loaded" · Issue 119 · Gourieff/comfyui-reactor-node · GitHub](https://github.com/Gourieff/comfyui-reactor-node/issues/119)
[Install ONNX Runtime | onnxruntime](https://onnxruntime.ai/docs/install/#python-installs)

元にする画像は当然ながら前髪とかがあるとうまく認識できない。
なのでInstantIDを使用し、一度スキンヘッドにしてから読み込ませるというハックがある。
AIで生成した顔の方がよく読み込むらしいし。

[ReActor用のポートレートをInstantIDで作る - work4ai](https://scrapbox.io/work4ai/ReActor%E7%94%A8%E3%81%AE%E3%83%9D%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%88%E3%82%92InstantID%E3%81%A7%E4%BD%9C%E3%82%8B)
![32022cf5ebb4d000f79390bc5c3af711.png (5856×2219) (gyazo.com)](https://i.gyazo.com/32022cf5ebb4d000f79390bc5c3af711.png)

## ComfyUI_InstantID
顔を使用した画像の生成。アニメ対象ではないらしい。
SDXLのみ。
IP-Adapterと同様、modelのフローに挟んでそれに近い顔を作る。

全然記載がないが、専用のIP-AdapterモデルとControlNetモデルとInsightFaceモデルを配置する必要がある。
IP-Adapterモデルはinstantidディレクトリに置く。無ければ作る。ControlNetモデルはControlNetディレクトリでいいけど、モデルに名前が無いのでフォルダに入れとくと便利。
[ComfyUI InstantID - work4ai](https://scrapbox.io/work4ai/ComfyUI_InstantID)

元画像と顔パーツ位置を揃えられてしまうので、kps画像は必須。
FaceKeypointsPreprocessorで作れる。

リファレンスとして複数画像を入力することが可能。
その場合でも一枚になる。

[GitHub - cubiq/ComfyUI\_InstantID](https://github.com/cubiq/ComfyUI_InstantID)

## ComfyUI-AnimateDiff-Evolved
アニメーションを作る。
ControlNetが効くので、やろうと思えばOpenposeでストーリー作ってアニメが作れる。

[GitHub - Kosinkadink/ComfyUI-AnimateDiff-Evolved: Improved AnimateDiff for ComfyUI and Advanced Sampling Support](https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved)

たまにw/ noise selectというノードが使われているが、大した意味はない。

[Checkpoint Loader W/ Noise Select & Upscaling · Kosinkadink/ComfyUI-AnimateDiff-Evolved · Discussion 278 · GitHub](https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved/discussions/278)

## rgthree-comfy
Enable,Mute,Bypassの一括管理。
ほかにもあらゆる出力の可視化(Display Any)、一部だけ書き換えられる纏めノードなどデバッグ的なもの。
LoRAを重ねてロードできる機能がある。
ブックマークというキャンバスの各地点にショートカットで飛べるノードが作れる。
地味に右クリックで対象ノードだけを実行する機能がついてくる。結構必須級。

[GitHub - rgthree/rgthree-comfy: Making ComfyUI more comfortable!](https://github.com/rgthree/rgthree-comfy?tab=readme-ov-file)

## ComfyUI-d2-size-selector
編集可能なプリセットのサイズでlatentを作成できる。
presetがcustom以外だとwidthとheightは無視。
スケールしたいならprescale、upscaleはただ後で使う数値用。

[GitHub - da2el-ai/ComfyUI-d2-size-selector](https://github.com/da2el-ai/ComfyUI-d2-size-selector)

## ComfyUI-yaResolutionSelector
プリセット、もしくはその場で作成した比率で数値を出力する。
基本は縦。縦横の入れ替えはoverextend。
constant_resolutionを使うと、出来るだけSDXLの解像度で出力するようになる。
baseは128刻み。一応constantを使うとそれ以外の値も出る。

[GitHub - Tropfchen/ComfyUI-yaResolutionSelector: Yet Another flexible Resolution Selector node for ComfyUI](https://github.com/Tropfchen/ComfyUI-yaResolutionSelector)

## comfyui-profiler
ノードごとにかかった時間を表示する。

[GitHub - tzwm/comfyui-profiler: Calculate the execution time of all nodes.](https://github.com/tzwm/comfyui-profiler)

different event loopエラーがでる問題があるらしい。
解決するまではDev utilを使う。
[Error after KSampler execution. · Issue 2 · tzwm/comfyui-profiler · GitHub](https://github.com/tzwm/comfyui-profiler/issues/2)

## comfy-plasma
ホワイトノイズやピンクノイズ、詳細設定付きランダムノイズが作れる。
カムカム法やcustom samplerに。

[GitHub - Jordach/comfy-plasma: A simple plasma noise generator for ComfyUI](https://github.com/Jordach/comfy-plasma)

## PowerNoiseSuite
プーリンノイズが作れる。

[GitHub - WASasquatch/PowerNoiseSuite: Power Noise Suite for ComfyUI is a latent noise oriented custom\_node for variation in your generations](https://github.com/WASasquatch/PowerNoiseSuite)

## ComfyUI-Saveaswebp
webpで保存できる。
save as webpというノードを追加する。

[GitHub - Kaharos94/ComfyUI-Saveaswebp: Save a picture as Webp file in Comfy + Workflow loading](https://github.com/Kaharos94/ComfyUI-Saveaswebp?tab=readme-ov-file)

## ComfyUI_Noise
かけるノイズを抽出したり注入したり、同じサンプラーに掛けると同じ画像になるUnsamplerというのがある。

[GitHub - BlenderNeko/ComfyUI\_Noise: 6 nodes for ComfyUI that allows for more control and flexibility over noise to do e.g. variations or "un-sampling"](https://github.com/BlenderNeko/ComfyUI_Noise)

sdwebuiでTiledDiffusionにくっついてる機能がNoise Inversion。
それに値する機能がこのUnsamplerっぽい。
使うと戻ってから元に戻す、つまり詳細を少しだけ下げられる機能？

[Latent Noise Control with Unsampler in ComfyUI Explained](https://learn.runcomfy.com/unsampler-latent-noise-control-in-comfyui-explained)
[\[StableDiffusion\] TiledDiffusionのNoiseInversionを比較する（追記：Tile比較）｜だにえる](https://note.com/da2el_ai/n/n6b74955a416a)
[高解像度画像の出し方BD編｜BD｜pixivFANBOX](https://br-d.fanbox.cc/posts/5673372)
[Noise invertion · Issue 12 · shiimizu/ComfyUI-TiledDiffusion · GitHub](https://github.com/shiimizu/ComfyUI-TiledDiffusion/issues/12)

[🦊Unsampler - work4ai](https://scrapbox.io/work4ai/🦊Unsampler)
## ComfyUI-Anyline
新たなプリプロセッサ、AnyLineを適用できるようにする。
近々統合する噂。

[GitHub - TheMistoAI/ComfyUI-Anyline: Anyline: A Fast, Accurate, and Detailed Line Detection Preprocessor](https://github.com/TheMistoAI/ComfyUI-Anyline)

## SD-Latent-Interposer
latentをSDXLとSD1.5とcascadeとで使いまわせる。

[GitHub - city96/SD-Latent-Interposer: A small neural network to provide interoperability between the latents generated by the different Stable Diffusion models.](https://github.com/city96/SD-Latent-Interposer)

## ComfyUI-ELLA
プロンプト追従度を上げる技術、ELLAに対応するためのノード。

[GitHub - TencentQQGYLab/ComfyUI-ELLA: ELLA nodes for ComfyUI](https://github.com/TencentQQGYLab/ComfyUI-ELLA)
[ComfyUI-ELLA＆AYSが出来る件について：ComfyUIでSDXL＆AYSをする｜shiba\*2](https://note.com/gentle_murre488/n/n3c2a306d03e0)
[ComfyUI-ELLAを試してみた｜shiba\*2](https://note.com/gentle_murre488/n/n107c3fe088bc)

同じく追従度を上げるAYSスケジューラーもついてくる。
AYSを使用する場合はHyperは使わないほうが良い。
そんな大きく変わらないという話も。

[Align Your Steps: How-to guide and review - Stable Diffusion Art](https://stable-diffusion-art.com/align-your-steps/)

1つ問題があり、現在(2024/05/29)SD1.5のみ。
あとNSFWには反応が悪いらしい。
ただし他言語対応にもなるという噂。

[ELLA + CLIP in ComfyUI. Yet Another Gamechanger! | Civitai](https://civitai.com/articles/4899/ella-clip-in-comfyui-yet-another-gamechanger)

XLに対応する気はない。

[similar to LaVi-Bridge, any connection? · Issue 13 · TencentQQGYLab/ELLA · GitHub](https://github.com/TencentQQGYLab/ELLA/issues/13)

Lavi-Bridgeというよく似たものがある。

[GitHub - kijai/ComfyUI-LaVi-Bridge-Wrapper: ComfyUI wrapper node to test Lavi-Bridge](https://github.com/kijai/ComfyUI-LaVi-Bridge-Wrapper)

違いはこちらがT5を使用しLLMとUNetのコネクタに作用するのに対し、あちらはLLaMAを使う。その分RAMは上がる。
こちらはSDXLやる気あるよと言っている。
[LLM+ComfyUIの「LaVi-Bridge」 vs 「ELLA diffusion」 vs 「通常生成」を比較する｜shiba\*2](https://note.com/gentle_murre488/n/n5c2dccf049a1)
[sdxl support?  · Issue 1 · ShihaoZhaoZSH/LaVi-Bridge · GitHub](https://github.com/ShihaoZhaoZSH/LaVi-Bridge/issues/1)
LLMアプローチには似たものとして[ComfyUI\_omost](<#ComfyUI_omost>)がある。

## cg-image-picker
一回プレビューで止め、好きな画像を選んで再開する。

[GitHub - chrisgoringe/cg-image-picker](https://github.com/chrisgoringe/cg-image-picker?tab=readme-ov-file)

ずっと使ってるとワークフロー部分がフリーズするバグがある。フローティングウィンドウは無事。対象のノードを視界に入れた瞬間フリーズする。（2024/06/16）

## comfyui_jankhidiffusion
HiDiffusionが使えるようになる。

[GitHub - blepping/comfyui\_jankhidiffusion: Janky implementation of HiDiffusion for ComfyUI](https://github.com/blepping/comfyui_jankhidiffusion/tree/main)

先にできた。

[Does ComfyUI support? · Issue 1 · megvii-research/HiDiffusion · GitHub](https://github.com/megvii-research/HiDiffusion/issues/1)

`ApplyMSWMSAAttention`、`ApplyRAUNet`を追加する。
まずはsimpleバージョンを使う。

64の倍数でないと使えないっぽい。PatchModelAddDownscaleはここ選ばないのでディスアド。

[Error: Sizes of tensors must match except in dimension 1. Expected size 26 but got size 25 for tensor number 1 in the list. · Issue 2 · blepping/comfyui\_jankhidiffusion · GitHub](https://github.com/blepping/comfyui_jankhidiffusion/issues/2)

PatchModelAddDownscaleより完全に良くなるほどではないが、なんとなく塗りが厚みを増してる気がする。

SD1.5だとHyperとの相性が悪く、Stepが足りない色や崩れが出た。
SDXLだと結構いける。Hyper合わせてもかなりの小ささでも顔をちゃんと描ける。
モデル相性かもだが。



## ComfyUI-HiDiffusion
HiDiffusionが使えるようになる。

[GitHub - florestefano1975/ComfyUI-HiDiffusion](https://github.com/florestefano1975/ComfyUI-HiDiffusion)

Load CheckpointやKsamplerと合体しており、直接画像を生成する。


## comfyui-lama-remover
lamaが使える。
[comfyui-inpaint-nodes](<#comfyui-inpaint-nodes>)があればいらない。

[GitHub - Layer-norm/comfyui-lama-remover: a simple lama remover](https://github.com/Layer-norm/comfyui-lama-remover)

## ComfyUI_fabric
画像に対してYesNoで答えることで、望の画像を作る。一種のrlhf。
sdwebui版もある。
残念ながらComfyUIではループさせるような設定は出来ない。プリセットもない。
なので本格的にやるならsdwebui版を使う。

[GitHub - ssitu/ComfyUI\_fabric: ComfyUI nodes based on the paper "FABRIC: Personalizing Diffusion Models with Iterative Feedback" (Feedback via Attention-Based Reference Image Conditioning)](https://github.com/ssitu/ComfyUI_fabric)

## ComfyUI-Diffusers
ComfyUIでDiffuserを使用する。
主にStreamDiffusion、リアルタイム生成用。

[GitHub - Limitex/ComfyUI-Diffusers: This repository is a custom node in ComfyUI. This is a program that allows you to use Huggingface Diffusers module with ComfyUI. Additionally, Stream Diffusion is also available.](https://github.com/Limitex/ComfyUI-Diffusers)

## comfyui-prompt-reader-node
A1111で読める形式のプロンプトを保存する。(save prompt saver)
まともに読めてしかも早いものとなるとこれしか選択肢がない。
逆に読みだすことも可能。

サブモジュールがあるせいか、depth 1だとうまく動かなかった。**というかよく見たら--recursive推奨だった。**
managerからだと動いた。managerは適切なライブラリを一緒に入れてくれるらしい。

[GitHub - receyuki/comfyui-prompt-reader-node: The ultimate solution for managing image metadata and multi-tool compatibility. ComfyUI node version of the SD Prompt Reader](https://github.com/receyuki/comfyui-prompt-reader-node)

別のビューワーのサブプロジェクトであり、そちらで扱える画像の形式は全て扱える。

webpで保存するとワークフローが消えるが、これはwebpはa1111互換のメタデータと二者択一になっているせいらしい。
(ExifTool:Exif:UserComment)

[\[BUG\] - jpg and webp formats don't store the ComfyUI workflow · Issue 57 · receyuki/comfyui-prompt-reader-node · GitHub](https://github.com/receyuki/comfyui-prompt-reader-node/issues/57)

schedulerなどの外部設定ノードが欲しい時はprimitiveを使う。

ハッシュ計算はcivitaiなどで上がっているモデル名と自動リンクさせるための設定。

仕方ないが、a1111のサンプラーとcomfyuiのサンプラーの名称は違うので、PNG Infoに読み込んで直接作ろうとするとNoneTypeエラーが出る。


## comfyui-browser
ワークフローや画像を管理するためのブラウザを追加する。
XYZ Plotがついている。Select Node Inputsで対象を選択し、XYZ Plotで文字列変更。;区切りで値を変えられる。

内部的にinput_typesのreturnのうちint,float,string,bool,list,のものを読んでる。

[GitHub - talesofai/comfyui-browser: An image/video/workflow browser and manager for ComfyUI.](https://github.com/talesofai/comfyui-browser)

## ComfyUI-TCD
TCDサンプラーを追加する。
TCDやhyperなど一部の高速化手法で推奨。
TCDはスケジューラーもあるっぽいが、よくわからない。

[GitHub - JettHu/ComfyUI-TCD: ComfyUI TCD implementation](https://github.com/JettHu/ComfyUI-TCD)

TCDはetaというパラメータをもつ。
これは確率パラメータ(a stochastic parameter)と呼ばれるもので、上げるほど確率論的になるらしい。下げるほど決定論。
つまり下げるほど書き込みが増える。

[Hyper-SD and Hyper-SDXL fast models - Stable Diffusion Art](https://stable-diffusion-art.com/hyper-sdxl/#Hyper-SDXL_1-step_LoRA)

## ultools-comfyui
webpで保存しつつ、A1111互換の情報を入れられる。（saveimgadv）
がA1111互換は信用してはいけない。
他にプロンプトのトークン数、Openposeのキャラ認識マスクなどが出来る。
saveaswebpの改良版。
保存が早い。

[GitHub - jkrauss82/ultools-comfyui: Set of nodes for ComfyUI](https://github.com/jkrauss82/ultools-comfyui?tab=readme-ov-file)

workflowが入らず、a1111互換もなぜかpositiveが入らない。
webpで保存するだけなら圧縮率が選べて楽。
一応EXIF:Image Description(Prompt)とMake(workflow)にワークフローが入っているので復元は可能。

## comfyui-saveimage-plus
ワークフロー付きでwebpを保存できる。
ただし圧縮率は90固定。
ノード名はsave image plus。

[GitHub - Goktug/comfyui-saveimage-plus: Save Image with more file formats for ComfyUI](https://github.com/Goktug/comfyui-saveimage-plus)

## ComfyUI-N-Nodes
Video-helperに比べframerateの半減機能や、簡易的なframeInterpolatorが付いてくる。
GPTとCLIPエンコ合体版もついてくる。
動画を勝手に再生しない機能が付いている。
動画リサイズで512以下にできない。

[GitHub - Nuked88/ComfyUI-N-Nodes: A suite of custom nodes for ConfyUI that includes GPT text-prompt generation, LoadVideo, SaveVideo, LoadFramesFromFolder and FrameInterpolator](https://github.com/Nuked88/ComfyUI-N-Nodes)

## ComfyUI-Frame-Interpolation
フレーム補完。
N-Nodeに使われているのはRIFE。

[GitHub - Fannovel16/ComfyUI-Frame-Interpolation: A custom node set for Video Frame Interpolation in ComfyUI.](https://github.com/Fannovel16/ComfyUI-Frame-Interpolation)

## ComfyUI-VideoHelperSuite
動画読み込み。
select_every_nthは何fに一つ読むかという設定なので、半減させるなら2にする。

[GitHub - Kosinkadink/ComfyUI-VideoHelperSuite: Nodes related to video workflows](https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite)

## ComfyUI-DARE-LoRA-Merge
LoRAを別の混ぜ方する。

[GitHub - ntc-ai/ComfyUI-DARE-LoRA-Merge: Uses DARE to merge LoRA stacks as a ComfyUI node](https://github.com/ntc-ai/ComfyUI-DARE-LoRA-Merge)

## ComfyUI-ToonCrafter
二枚のアニメ画像の間を埋める。他にも複数枚のスケッチを合わせることでその移動を綺麗にしたり、スケッチの動画があるならそれに一枚絵の色を乗せたりできる。

[GitHub - AIGODLIKE/ComfyUI-ToonCrafter: This project is used to enable ToonCrafter to be used in ComfyUI.](https://github.com/AIGODLIKE/ComfyUI-ToonCrafter)

2024/06/04
cuda12環境でrequrements.txtをインストールするとtorchがGPU非対応になる。
一応torchをインストールし直せば動く。

2024/06/05
xformersのインストールによるためかいろいろ壊れて動かなくなった。

元々はDynamicrafterという動画をプロンプトで生成するモデル。
なおそちらは1024を出せるモデルがあるが、10.4GB。

使用には追加のモデルのDLが必要。
公式からDLできるが、そちらは10.5GBであり読み込みようが無いのでfp16版(5.22GB)を使う。

[Doubiiu/ToonCrafter at main](https://huggingface.co/Doubiiu/ToonCrafter/tree/main)
[Kijai/DynamiCrafter\_pruned · Hugging Face](https://huggingface.co/Kijai/DynamiCrafter_pruned)

モデルは2秒でFPS8、つまり16フレームを生成するようにできている。

どうあがいても`'NoneType' object has no attribute 'to'`とか`Sizes of tensors must match except in dimension 1. Expected size 768 but got size 1024 for tensor number 1 in the list.`とか出てきて動かなかった。
何処調べても17GB消し飛ぶとか書いてるので、VRAM15GBだと厳しいとは思うが、何かそれっぽいエラーじゃなくて謎。

replicateで動かしたものがあるのでこれを使う。

[fofr/tooncrafter – Run with an API on Replicate](https://replicate.com/fofr/tooncrafter)

https://fate.5ch.net/test/read.cgi/liveuranus/1720079634/269
269: 警備員[Lv.31] (ﾜｯﾁｮｲ 3bfe-47Gb)  2024/07/05(金) 05:54:24.42 ID:dVRDQvM80 
ここにおっぱいがあるじゃろ？
https://files.catbox.moe/6nq9rt.webp
これを背景抜いて左右反転させて…
https://files.catbox.moe/0s96st.webp
二枚をToonCrafterで動画化して…
https://files.catbox.moe/y1mt6l.mp4
animatediffのv2vで清書して…こうじゃ！
https://files.catbox.moe/9qpa18.mp4

## ComfyUI-DynamiCrafterWrapper
Dynamicrafterというtxt(img)2vidを使う。
実はToonCrafterにも対応している。

[GitHub - kijai/ComfyUI-DynamiCrafterWrapper: Wrapper to use DynamiCrafter models in ComfyUI](https://github.com/kijai/ComfyUI-DynamiCrafterWrapper)

モデルがどれも10.2GBと重く、消費VRAMも12GBなどと非常に重い。[Dynamicrafter](<./sd animation.md#Dynamicrafter>)も参照。
interpモデルは軽いfp16版があるが、名前の通り補完モデルなので注意。
ループも作れる。

## ComfyUI_omost
omost,LLMとの対話でcanvasという独自言語のコードを生成して使用。4090で一回5分と書いてあるので現状使用不可。
LLMを挟むため日本語も使える。が、生成するのは結局SDなので英語で纏めるように指定したほうが良い。

Fooocusの類。

[GitHub - huchenlei/ComfyUI\_omost: ComfyUI implementation of Omost](https://github.com/huchenlei/ComfyUI_omost)

ちなみに大本はcolabで規制されていないのでcolabで使える。

[GitHub - lllyasviel/Omost: Your image is almost there!](https://github.com/lllyasviel/Omost?tab=readme-ov-file)

HFで気軽に使えるので、タグを抜き出すための機械として使うのもよし。
あくまで文章指定だが。

[Omost - a Hugging Face Space by lllyasviel](https://huggingface.co/spaces/lllyasviel/Omost)

重い。kaggleで2分かかる。

## ComfyUI-seamless-tiling
継ぎ目のない画像を生成する。
sdwebuiだと標準でついてた気もしなくはない。
VAEにも作用させなければならないので忘れずに。

[GitHub - spinagon/ComfyUI-seamless-tiling: Seamless tiling for ComfyUI](https://github.com/spinagon/ComfyUI-seamless-tiling)

## comfy-image-saver
webp+a1111互換保存。
[ultools-comfyui](<#ultools-comfyui>)よりシンプルだが、一つ一つ手動で入力することになるので面倒。
ノード名がw/Metadataと特徴的。

[GitHub - giriss/comfy-image-saver: All the tools you need to save images with their generation metadata on ComfyUI. Compatible with Civitai & Prompthero geninfo auto-detection. Works with png, jpeg and webp.](https://github.com/giriss/comfy-image-saver?tab=readme-ov-file)

なぜか保存にやたら時間がかかる。1分以上。
SD Prompt Readerでさえ二度目の保存は軽いのに。


## ComfyUI-Advanced-ControlNet
ControlNetを期間指定したり、マスクしたりしながらかける。
LLLite、Referenceなども対応している。カムカムとかLayerDiffuseとかしたいなら。

[GitHub - Kosinkadink/ComfyUI-Advanced-ControlNet: ControlNet scheduling and masking nodes with sliding context support](https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet)

## comfyui-animatediff
モデル読んで注入して結合するだけのシンプルなanimatediff。
アップスケール時は二十でAnimatediffかけるのが推奨らしい。

[GitHub - ArtVentureX/comfyui-animatediff: AnimateDiff for ComfyUI](https://github.com/ArtVentureX/comfyui-animatediff?tab=readme-ov-file#gif-has-wartermark-especially-when-using-mm_sd_v15)

モデル配置は`comfyui-animatediff/models/`。

slideing option。たぶん戻すほうのアニメーション。

## ComfyUI-AnimateDiff-Evolved
Animatediffが使える。
上のものと比べ、サンプリングオプションや動きの量を設定できるscale_multival、モーションモデルの強さを変更できるeffect_mutlivalなどがある。

[GitHub - Kosinkadink/ComfyUI-AnimateDiff-Evolved: Improved AnimateDiff for ComfyUI and Advanced Sampling Support](https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved)

キーフレームを設定できるのはよき。
start_percentでそのキーフレームが挿入されるタイミング、guarantee_stepsで挿入する最小のステップを指定する。

16フレームなどの制限を超えるため、context optionとview optionというのがある。
contextはコンテキスト、ControlNetなどを一緒に処理する。
viewはモーションモデルによって見えるLatentを分割する。
それぞれのオプションには方式があり、別々に設定できる。

サンプル設定。

## ComfyUI_UltimateSDUpscale
タイル分割、アップスケール、SD再処理を行う。

[GitHub - ssitu/ComfyUI\_UltimateSDUpscale: ComfyUI nodes for the Ultimate Stable Diffusion Upscale script by Coyote-A.](https://github.com/ssitu/ComfyUI_UltimateSDUpscale)

仕組み解説。

[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/166qbiy/thoughts_on_upscayl_vs_ultimate_sd_upscaler/)

## ComfyUI_Dave_CustomNode
画像の一部分だけにプロンプトを効かせる。
本家は開発停止してるのでforkのほう。
LatentCouple

[GitHub - fsdymy1024/ComfyUI\_Dave\_CustomNode: MultiAreaConditioning.js:183  fix bug](https://github.com/fsdymy1024/ComfyUI_Dave_CustomNode)

## comfyui-clip-with-break
a1111と同じくbreakを使えるCLIPEncodeノードを追加する。
地味だが必要。ちなみに手動でやる場合はconcat conditioningで繋げればbreak相当になる。combineはただ繋ぐだけなので別。

concatをBREAKのものと繋ぐ場合、BREAKでちぎれた数を合わせないと繋がらない。

[ComfyUI\_smZNodes](<#ComfyUI_smZNodes>)の方が高機能なので要らない。

[GitHub - dfl/comfyui-clip-with-break: Clip text encoder with BREAK formatting like A1111 (uses conditioning concat)](https://github.com/dfl/comfyui-clip-with-break)

## ComfyUI-TiledDiffusion

[GitHub - shiimizu/ComfyUI-TiledDiffusion: Tiled Diffusion, MultiDiffusion, Mixture of Diffusers, and optimized VAE](https://github.com/shiimizu/ComfyUI-TiledDiffusion)

## AnyNode
OpenAI、ローカル、Geminiに接続できる。
イメージフィルターを言葉だけでかけるのが主な用途っぽい。

[GitHub - lks-ai/anynode: A Node for ComfyUI that does what you ask it to do](https://github.com/lks-ai/anynode)

## cgem156-ComfyUI
個人の詰め込みノード。
ComfyCoupleの元ネタがあるので、ComfyCoupleが動かないならこれを使うことになる。

[GitHub - laksjdjf/cgem156-ComfyUI: 色々なカスタムノードを詰め込んだ。](https://github.com/laksjdjf/cgem156-ComfyUI)

そのままだとAttention CoupleにConditionを入れるところが無いので、右クリック→add inputで増やす。

[No additional inputs in Attention Couple node · Issue 1 · laksjdjf/cgem156-ComfyUI · GitHub](https://github.com/laksjdjf/cgem156-ComfyUI/issues/1)

## ComfyUI-ComfyCouple
マスクを使用し一部にプロンプトを効かせられる。
forge coupleと同一。
マスクはSolid Maskで生成、Mask Compositeで引き算できる。

[GitHub - Danand/ComfyUI-ComfyCouple: Attention Couple made easier for ComfyUI.](https://github.com/Danand/ComfyUI-ComfyCouple)

## cd-tuner_negpip-ComfyUI
cd tunerとNegPipを実装する。
Colorは未実装。

[GitHub - laksjdjf/cd-tuner\_negpip-ComfyUI: cd-tunerとnegpipのComfyUI拡張](https://github.com/laksjdjf/cd-tuner_negpip-ComfyUI)

negpipはperp-negとして標準実装されているかもしれない。
ちなみにwebuiのNegpipを見る限り概念の引き算がLECOレベルで強いっぽい。

[GitHub - hako-mikan/sd-webui-negpip: Extension for Stable Diffusion web-ui enables negative prompt in prompt](https://github.com/hako-mikan/sd-webui-negpip)

impactnegは論理演算用。

[Testing new PAG and Perp-Neg nodes in ComfyUI | myByways](https://www.mybyways.com/blog/testing-new-pag-and-perp-neg-nodes-in-comfyui)
[Re-imagine the Negative Prompt Algorithm: Transform 2D Diffusion into 3D, alleviate Janus problem and Beyond.](https://perp-neg.github.io/)

## ComfyUI-string-util
文字列弄る奴。splitとか。

[GitHub - kale4eat/ComfyUI-string-util: String utility for ComfyUI](https://github.com/kale4eat/ComfyUI-string-util)

## ComfyUI-TextUtils
文字列弄る奴。ちょっとだけ更新が頻繁。

[GitHub - wutipong/ComfyUI-TextUtils](https://github.com/wutipong/ComfyUI-TextUtils)

## ComfyUI-CLIPSeg
segmentを文字列で指定できる。
ComfyUI Manager上で探して出てくるのはfork。

[GitHub - biegert/ComfyUI-CLIPSeg: ComfyUI CLIPSeg](https://github.com/biegert/ComfyUI-CLIPSeg?tab=readme-ov-file)

使われているのはGroundDino？
[ComfyUI-Impact-Pack](<#ComfyUI-Impact-Pack>)にもCLIPSegDetectorProviderというのがある。
あっちはこれのラッパー。この拡張機能が無いと動かない。




## masquerade-nodes-comfyui
マスク関係のノードを追加する。
マスクで画像を切り取れるCut By Mask、貼り付けられるPaste By Maskが便利。

[GitHub - BadCafeCode/masquerade-nodes-comfyui: A powerful set of mask-related nodes for ComfyUI](https://github.com/BadCafeCode/masquerade-nodes-comfyui)

Cut By Maskはついでにトリミングすることに注意。

マスク取ってブラーかけて切り抜いて生成してpasteで戻せば、a1111のinpaintっぽいのが出来る。
Detailer使うほうが早い説もある。
あとそこまでやっても何故かinpaintはa1111のほうが上手い。

## ComfyUI_ADV_CLIP_emb
a1111のクリップ認識方式を使える。
[comfyui-clip-with-break](<#comfyui-clip-with-break>)が上位互換になるので要らない。

ちなみにa1111は強化したときに周りを弱体化させるが、ComfyUIは自分だけ強化されるらしい。

[GitHub - BlenderNeko/ComfyUI\_ADV\_CLIP\_emb: ComfyUI node that let you pick the way in which prompt weights are interpreted](https://github.com/BlenderNeko/ComfyUI_ADV_CLIP_emb)

## ComfyUI-Video-Matting
動画を切り抜ける。

[GitHub - Fannovel16/ComfyUI-Video-Matting: A minimalistic implementation of Robust Video Matting (RVM) and BRAIAI-RVMBG v1.4 in ComfyUI](https://github.com/Fannovel16/ComfyUI-Video-Matting)

## ComfyUI_Custom_Nodes_AlekPet
Textを訳せる。
なぜか簡易的なペインターノードがついてくる。bitmapじゃなくvector方式。
直にscribbleだとたぶん形をとりすぎる。直でVAEEncodeするのもいいか。

[GitHub - AlekPet/ComfyUI\_Custom\_Nodes\_AlekPet: Custom nodes that extend the capabilities of Comfyui](https://github.com/AlekPet/ComfyUI_Custom_Nodes_AlekPet)

## ComfyUI-AnimateAnyone-Evolved
Moore-AnimateAnyoneを使用する。
VRAM12で12フレームに7分くらい。

画像を動かすものなので、モデルがどうこうはあまり関係ないはず。
ここではsd1.5のUNETを使用している。

[GitHub - MrForExample/ComfyUI-AnimateAnyone-Evolved: Improved AnimateAnyone implementation that allows you to use the opse image sequence and reference image to generate stylized video](https://github.com/MrForExample/ComfyUI-AnimateAnyone-Evolved)

## ComfyUI-ExLlama-Nodes
ExLlamaV2が使える。理想的だが、全部GPUに突っ込むためVRAM強者のみ。

[GitHub - Zuellni/ComfyUI-ExLlama-Nodes: ExLlamaV2 nodes for ComfyUI.](https://github.com/Zuellni/ComfyUI-ExLlama-Nodes)

ExLlamaV2：GPUに全部のせで高速推論
Ollama：llama cppを使用したhttpサーバー
llama-cpp-python：llama cppのpythonバインディング

[Reddit - Dive into anything](https://www.reddit.com/r/LocalLLaMA/comments/1aezi29/difference_between_the_different_python_libraries/)

## comfyui_LLM_party
API、ローカル、RAG、ローカルナレッジベース、コードインタプリタ、オンラインクエリなど、言うなればLangchainみたいになんでも繋げてくれる奴。

[GitHub - heshengtao/comfyui\_LLM\_party: Dify in comfyui. Compatible with Omost. Adapted to all models with an interface similar to OpenAI’s, such as: Tongyi Qianwen/qwen, Zhipu Qingyan/GLM, Deepseek, Kimi/Moonshot.（comfyui中的Dify，已兼容Omost，适配了所有具有类似openai接口的模型，例如：通义千问/qwen、智谱清言/GLM、deepseek、kimi/moonshot。）](https://github.com/heshengtao/comfyui_LLM_party)

## ComfyUI-LLaVA-Captioner
画像に対してllavaに訊くだけのやつ。
バックエンドはllama-cpp-python。

起動にはpython install.pyの実行が必要。

[GitHub - ceruleandeep/ComfyUI-LLaVA-Captioner: A ComfyUI extension for chatting with your images with LLaVA. Runs locally, no external services, no filter.](https://github.com/ceruleandeep/ComfyUI-LLaVA-Captioner)

## comfyui-ollama
ollamaに画像を読ませる・チャットできる。

[GitHub - stavsap/comfyui-ollama](https://github.com/stavsap/comfyui-ollama)

## ComfyUI_VLM_nodes
llama-cpp-python使用。

[GitHub - gokayfem/ComfyUI\_VLM\_nodes: Custom ComfyUI nodes for Vision Language Models, Large Language Models, Image to Music, Text to Music, Consistent and Random Creative Prompt Generation](https://github.com/gokayfem/ComfyUI_VLM_nodes)

LLaVaが使える。そのモデルを使用したプロンプト化やサジェストノードがある。
画像をテキスト化→キーワード抜き→プロンプト化→サジェストで複数の自然言語プロンプトを作成できる。

llmが使える。

UForm-Gen2 Qwenが使える。
比較的高速で軽量（5GB）なVLM。視覚の質問応答ならできるらしい。

InternLM-XComposer2-VLという10GB級モデルが使える。
もちろん一番いい結果が出る。

joytagという画像タグ専門ビジョンモデルも使える。
WDより出るタグの数が多い。

[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/1ak17in/edit_the_tags_interrogated_by_joytag_using_mllm/)

joytagだけでいいならそれだけのノードがある。

[GitHub - StartHua/Comfyui\_joytag: JoyTag is a state of the art AI vision model for tagging images, with a focus on sex positivity and inclusivity. It uses the Danbooru tagging schema, but works across a wide range of images, from hand drawn to photographic.](https://github.com/StartHua/Comfyui_joytag)

画像から音楽を作れる機能がある。

## ComfyUI-IF_AI_tools
キャプション付与と音声生成。
OababoogaやWhisperSpeechなどと連携する。
Ollama、OpenAIなども使用できる。

[GitHub - if-ai/ComfyUI-IF\_AI\_tools: ComfyUI-IF\_AI\_tools is a set of custom nodes for ComfyUI that allows you to generate prompts using a local Large Language Model (LLM) via Ollama. This tool enables you to enhance your image generation workflow by leveraging the power of language models.](https://github.com/if-ai/ComfyUI-IF_AI_tools)

Ponyタグ特化っぽいProteus-RunDiffusionが使える。
これ自体はただのVLMとして他でも使えそうではある。
[dataautogpt3/Proteus-RunDiffusion at main](https://huggingface.co/dataautogpt3/Proteus-RunDiffusion/tree/main)

## comfyui-dynamicprompts
ワイルドカードで指定し、その中からランダムに単語を組み合わせるダイナミックプロンプトが使用可能になる。いろいろな状況が欲しい時に。
指定の物の組み合わせ、Feeling Lucky、別モデルを使用し単語を修飾するMagic Promptなどがある。

[GitHub - adieyal/comfyui-dynamicprompts: ComfyUI custom nodes for Dynamic Prompts](https://github.com/adieyal/comfyui-dynamicprompts)

ワイルドカードは既に構築されたものがある。以下以外にも散らばってる。
[Decided to build upon the already established wildcard lists a little and may have gotten slightl...](https://rentry.org/NAIwildcards)

もっと動的の確率とかを弄りたいときのJinja2テンプレートにも対応。
ほぼただのPython。

## ComfyUI_smZNodes
a1111と同じ方式で生成する。
Ancestral、SDEはdeterministicではない時があるので注意。
unipcは構成が変わる。

[GitHub - shiimizu/ComfyUI\_smZNodes: Custom nodes for ComfyUI such as CLIP Text Encode++](https://github.com/shiimizu/ComfyUI_smZNodes)
[ComfyUIでAutomatic1111と同じ画像を作る方法【smZNodes】](https://sorenuts.jp/7893/)

## ComfyUI_DanTagGen
[sd prompt](<./sd prompt.md>)でも解説している、自然言語をDantagに変えるDantaggenをComfyUI上で使うノード。

[GitHub - huchenlei/ComfyUI\_DanTagGen: ComfyUI node of DTG](https://github.com/huchenlei/ComfyUI_DanTagGen)

## comfyui-prompt-control
a1111でいうprompt editingが使える。

[GitHub - asagi4/comfyui-prompt-control: ComfyUI nodes for prompt editing and LoRA control](https://github.com/asagi4/comfyui-prompt-control)

### 基本
まずはa1111のprompt editingから。
`[from:to:when]`が基本。fromとtoが任意テキスト、whenがどこでfromからtoに切り替えるかを決める数値。
whenを`0.0~1.0`で指定すると割合。整数だと切り替えを行うステップ数。

加えて、`[to:when]`とするとwhenの数値が終わった後に`to`が入る。
`[from::when]`とするとwhenの数値が終わった後に`from`を削除する。

[Features · AUTOMATIC1111/stable-diffusion-webui Wiki · GitHub](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#prompt-editing)

このノードでも大体同じだが、ステップには小数しか使えない。(全体ステップの情報なんて得られるわけないし当たり前)




### LoRA
またよりa1111に近づけるために、LoRAをテキストから読む機能も付いている。
`<lora:name:1>`と`name.safetensors`の両方に対応(サブディレクトリは自動検索)している上に同じコロンを使うせいで読みにくい。
一応サブディレクトリを指定して検索も可能。
見つからないとスペースをアンダースコアにして再検索するらしい。

### Alternating Words
パイプで区切ると交互に適用する。

### シーケンス
`[SEQ:a:N1:b:N2:c:N3]`は、`[a:[b:[c::N3]:N2]:N1]`のショートハンド。
指定ポイントでa→b→c→Nothingに切り替わる。

### タグ
FilterScheduleノードを使用すると、特定の単語(タグ)がある場合とない場合でプロンプトを置き換えられる。
例えば、`a [black:blue:X] [cat:dog:Y] [walking:running:Z] in space`と打ってタグにx,zがあると`a blue cat running in space`が返る。

プロンプト上のタグは大文字のA-Zとアンダースコアのみ。
タグを認識させるときは大文字と小文字を区別しない。

### プロンプト補間
`a red [INT:dog:cat:0.2,0.8:0.05]`とすることで、指定範囲の間で`a red dog`と`a red cat`を0.05刻みで補間する。

### embedding
embeddingはLoRAと同じく`<emb:xyz>`という表記になる。
書式がぶつからないようにするためのやつ。

### BREAK
このノード中ではBREAKが使える。
一部使えないものもある。(SDXL関連)

### 関数
いくつかの関数をサポートしている。
関数()単語という形式で使用可能。

SHUFFLE
`SHUFFLE(seed=0,separator=,,joiner=,)`
要素をseedを元にランダムにする。

SHIFT
`SHIFT(steps=0, separator=,, joiner=,)`
要素を段階的に左に移動する。
SHUFFLE共々、BREAKやANDの後。なのでそれらが動くことは無い。
separator分割jointer結合。
もしもseparatorが括弧の中にあると強調が壊れる。

`SHIFT(1) cat, dog, tiger, mouse`だと`dog, tiger, mouse, cat`になる。
separatorやjointerに空白を用いることは可能。

NOISE
`NOISE(weight, seed)`でプロンプトにノイズがかかる。
weightは0から1。

MASK, IMASK and AREA
`MASK(x1 x2, y1 y2, weight, op)`
region mask。特定の場所にだけプロンプトを掛けない。
xyには絶対ピクセルと0-1のパーセンテージが使える。
1はピクセルではなくパーセントとして扱われる。

`AREA(x1 x2, y1 y2, weight)`
特定の場所にプロンプトを掛ける。
ComfyUI標準のいCompositionAreaと同じ。

`IMASK(index, weight, op)`
PromptScheduleAddMasksで作った特定のマスクを使用する。indexの始まりは0。
indexが無い場合は入力を無視。
PromptScheduleAddMasksは複数回使うとその分マスクを蓄積する。上書きしない。

マスクを複数指定すると、MaskCompositeノードで合成する。`op`はその時の合体手法。
`MASKW(weight)`で合体の重みを指定できる。

マスクは512x512を想定している。変えたい場合はPCScheduleSettings。
プロンプト内でも`MASK_SIZE(width, height)`で変更できる。

マスクはANDの付いたプロンプトごとに適用される。
例えば`prompt1 AND MASK(...) prompt2`とある場合prompt2にしか効かない。

マスクの初期値は`MASK(0 1, 0 1, 1)`。表記のない部分はこれで埋められる。
ただしこれはパーセンテージの話であり、ピクセルが一つでも交じっているとエラーになる。

マスクはLoRA Schedulingには効かない。

FEATHER
`FEATHER(left top right bottom)`
マスクをフワッとさせる奴。FeatherMaskと同等。デフォは0。
マスクが複数ある場合は合成前に適用される。順番はプロンプト順。残りは合成後のマスクに適用される。
合成中に`FEATHER()`を挟むことでフェザリングをスキップできる。

例えば`MASK(1) MASK(2) MASK(3) FEATHER(1) FEATHER() FEATHER(3) weirdmask FEATHER(4)`とある場合、1でフェザ→3でフェザ→マスク三つを合成→合成後に4でフェザ。
多分。

MASKとFETHERは順不同。

### Schedule LoRAs
ScheduleToModelではLoRAをステップ間で変えられる。
CLIPとunet(モデル)に別々に適用できる。

LoRAのスワップは--highvramでない限りCPUとGPUの間で行われるため遅くなる。
スワップ中にVRAMを使い果たすとhighvramでもCPUオフロードを有効にする。これはComfyUIが再起動するまで永続。

### LoRA Block Weight
[ComfyUI-Inspire-Pack](<#ComfyUI-Inspire-Pack>)があるとできる。

### Advanced CLIP Encoding
`STYLE()`でプロンプト解釈の変更が可能。
AND区分ごとに別々にできる。ただし最初にあると全体にかかる。
perp以外は[Advanced CLIP Encoding](<#Advanced CLIP Encoding>)がないと使えない。

### Cutoff
[ComfyUI\_Cutoff](<#ComfyUI_Cutoff>)があるとできる。
SEQと同じく`[CUT:region_text:target_text]`で使う。
`[CUT:region_text:target_text:weight;strict_mask:start_from_masked:padding_token]`も可能。
padding_tokenは全部にかかるっぽい？

```
a group of animals, [CUT:white cat:white], [CUT:brown dog:brown:0.5:1.0:1.0:_]
```

### Stable-Fast
ScheduleToModelの前にApply StableFast Unetを使用すると、再コンパイルされず上手くいくらしい。

### 例
```
[Set weight style to A1111. SDXL and CLIP_L get ignored if an SDXL model is not in use. This text gets effectively ignored because the schedule starts at 1. Check the README for all the details:1]
STYLE(A1111) SDXL(width height, target_width target_height, crop_w crop_h)
CLIP_L(artistic, cartoon)

[basics. LoRA and prompt scheduling:1]
[<lora:vector_revanimated:0.5>::0.5] summer, outdoors, ([by ilya kuvshinov:by akira toriyama:0.5]:1.1) BREAK

[tag selection with the HR tag for the second pass:1]
a [multicolored:red, retro,:0.2,0.7] [(pastel cartoon:1.2):ultra realistic, hdr, 8k:HR], woman, cowboy shot, [smile::0.15] 

[More advanced features. NOISE adds some randomness to the prompt which can have interesting effects:1]
[NOISE(0.3)::0.15]
[AND MASK(0 1,0 0.5, 1):,:0.5] sunbeam AND MASK(0 1, 0.5 1, 1.2) t-shirt, logo on shirt,
```

## AIGODLIKE-ComfyUI-Translation
日本語化。
[GitHub - AIGODLIKE/AIGODLIKE-ComfyUI-Translation: A plugin for multilingual translation of ComfyUI，This plugin implements translation of resident menu bar/search bar/right-click context menu/node, etc](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION)

## ComfyUI-post-processing-nodes
HSV調整、ブラー、pixelizeなどが可能。
Asciiはなんか動かなかった。

[GitHub - EllangoK/ComfyUI-post-processing-nodes: A collection of Post Processing Nodes for ComfyUI, which enable a variety of cool image effects](https://github.com/EllangoK/ComfyUI-post-processing-nodes)

## A8R8_ComfyUI_nodes
A8R8という独立したフロントエンドを扱うための奴。
ここのAttentionCoupleが[ComfyUI-ComfyCouple](<#ComfyUI-ComfyCouple>)よりも使いやすくておすすめ。
concatのように迷うことも無し。

[GitHub - ramyma/A8R8\_ComfyUI\_nodes: A8R8 (https://github.com/ramyma/a8r8) supporting nodes to integrate with ComfyUI](https://github.com/ramyma/A8R8_ComfyUI_nodes)

## ComfyUI-LivePortraitKJ
ポートレートをVtuberのように動かす。
2Dの動作報告があるが動かないこともあるらしい。


[GitHub - kijai/ComfyUI-LivePortraitKJ: ComfyUI nodes for LivePortrait](https://github.com/kijai/ComfyUI-LivePortraitKJ)

知らない間にリアルタイムが可能になって最強になってた。

insightfaceを用いる場合は商用不可。
Mediapipeを使用すること。一応そっちの方が早い。

live2dよろしく数値で編集もできる。
[GitHub - PowerHouseMan/ComfyUI-AdvancedLivePortrait](https://github.com/PowerHouseMan/ComfyUI-AdvancedLivePortrait)

## comfyui-tooling-nodes
マスクを組み合わせてのリージョナルプロンプトと、翻訳機能。タイル機能もある。
BASE64をsocketから受けることもできる。
これらにAPIからアクセスできる。

[GitHub - Acly/comfyui-tooling-nodes: Nodes for using ComfyUI as a backend for external tools. Send and receive images directly without filesystem upload/download.](https://github.com/Acly/comfyui-tooling-nodes)

## comfyui-inpaint-nodes
Fooocusの上手いインペイントが使える。
ついでにlamaがついてくる。MATもついてくる。
MATはlamaよりアーティファクトが少なくフォトリアリスティックらしい。

[GitHub - Acly/comfyui-inpaint-nodes: Nodes for better inpainting with ComfyUI: Fooocus inpaint model for SDXL, LaMa, MAT, and various other tools for pre-filling inpaint & outpaint areas.](https://github.com/Acly/comfyui-inpaint-nodes)
[GitHub - fenglinglwb/MAT: MAT: Mask-Aware Transformer for Large Hole Image Inpainting](https://github.com/fenglinglwb/MAT)

## ComfyUI_densediffusion
[Densepose](<./sd controlnet.mdDensepose>)みたいな分け方を[Regional prompt](<../Bar/App/ComfyUI.md#Regional prompt>)のような画面分割に使える。
標準のregionalより強いらしい。
**IPAdapterが効かない。**

[GitHub - huchenlei/ComfyUI\_densediffusion: DenseDiffusion custom node for ComfyUI](https://github.com/huchenlei/ComfyUI_densediffusion)

情報。
[GitHub - huchenlei/ComfyUI\_omost: ComfyUI implementation of Omost](https://github.com/huchenlei/ComfyUI_omost#method-2-attention-decomposition)

## EasyAnimate
Ditベースi2v

[EasyAnimate - work4ai](https://scrapbox.io/work4ai/EasyAnimate)
[EasyAnimate/comfyui/README.md at main · aigc-apps/EasyAnimate · GitHub](https://github.com/aigc-apps/EasyAnimate/blob/main/comfyui/README.md)

## Follow-Your-Emoji
拡散ベースtaking head

[Follow-Your-Emoji - work4ai](https://scrapbox.io/work4ai/Follow-Your-Emoji)
[GitHub - kijai/ComfyUI-FollowYourEmojiWrapper: Diffusers wrapper for FollowYourEmoji](https://github.com/kijai/ComfyUI-FollowYourEmojiWrapper)

拡散ベースなのでダイナミックな動きが出来るっぽい？
リアルタイムは無理。
[Follow-Your-Emoji: Freestyle Portrait Animation](https://follow-your-emoji.github.io/)

## ComfyUI_EchoMimic
音声駆動taking head

[GitHub - smthemex/ComfyUI\_EchoMimic: You can using EchoMimic in ComfyUI](https://github.com/smthemex/ComfyUI_EchoMimic)

## ComfyUI-BiRefNet
オブジェクトセグメント。
画像の切抜き、背景削除などに。

[GitHub - viperyl/ComfyUI-BiRefNet](https://github.com/viperyl/ComfyUI-BiRefNet)

公式を見ると結構性能高い。
Rembg、BRIA AIはちゃんと超えている。

[GitHub - ZhengPeng7/BiRefNet: \[CAAI AIR'24\] Bilateral Reference for High-Resolution Dichotomous Image Segmentation](https://github.com/ZhengPeng7/BiRefNet?tab=readme-ov-file#third-party-creations)


## ComfyUI_CartoonSegmentation
Rembg, Animesegと同じく背景を切抜きする。
3d Kenburnsというズーム機能もついてくる。

[GitHub - Nlar/ComfyUI\_CartoonSegmentation: Front end ComfyUI nodes for CartoonSegmentation](https://github.com/Nlar/ComfyUI_CartoonSegmentation)

Animesegと比べ切りすぎる傾向があるらしい。
iopaintには現在（2024/08/10）ない。

[ホロメン背景切り抜き比較 | Anime-seg vs Cartoon-seg – 流山おおたかの森Techブログ](https://elosove.com/?p=768)

## comfyui-anime-seg
comfyuiでAnimeseg。

[GitHub - LyazS/comfyui-anime-seg](https://github.com/LyazS/comfyui-anime-seg)

## ComfyUI-Florence2
MS謹製、VisionモデルFlorence2が使える。
YOLOと同じく物体検出できる。YOLOのように事前学習は要らないが少し不正確。

[GitHub - kijai/ComfyUI-Florence2: Inference Microsoft Florence2 VLM](https://github.com/kijai/ComfyUI-Florence2)

[Using Florence2 with ComfyUI 　「Florence2で物体検出と画像解析」-BLOG MITTIMI](https://mittimi.blogspot.com/2024/08/using-florence2-with-comfyui-florence2.html)

[動画も高精度に！ComfyUIとSegment Anything Model 2（SAM 2）でセグメンテーションをマスターしよう｜AICU media](https://note.com/aicu/n/n9426cd3355f6)

## ComfyUI-segment-anything-2

セグメントモデルSAMの後継SAM2を使う。

[ComfyUI-segment-anything-2](https://github.com/kijai/ComfyUI-segment-anything-2)

normalizeがかかってるとうまくカットできない。

individual objectは一度に多数のオブジェクトを認識する機能。
個々の精度は落ちる。

[Introducing SAM 2: The next generation of Meta Segment Anything Model for videos and images](https://ai.meta.com/blog/segment-anything-2/)

## was-node-suite-comfyui

200超の便利ノードを追加する大型カスタムノード。
あまり活発に開発されていない。

[GitHub - WASasquatch/was-node-suite-comfyui: An extensive node suite for ComfyUI with over 210 new nodes](https://github.com/WASasquatch/was-node-suite-comfyui)

Text Parse Tokenというノードがあり、ファイル名を自動設定できる。
が、ここで読んでくれるのはtime()という時間を表示する関数のみ。widget nameを読んでくれるわけではないのでやっぱり使いにくい。
[was-node-suite-comfyui/WAS\_Node\_Suite.py at main · WASasquatch/was-node-suite-comfyui · GitHub](https://github.com/WASasquatch/was-node-suite-comfyui/blob/main/WAS_Node_Suite.py#L864)

関数の指定はsave-image-extended-comfyuiと同じ。
[GitHub - audioscavenger/save-image-extended-comfyui: Save as AVIF, WebP, JPEG, customize the folder, sub-folders, and filenames of your images!](https://github.com/audioscavenger/save-image-extended-comfyui?tab=readme-ov-file)
[date(1) - Linux manual page](https://www.man7.org/linux/man-pages/man1/date.1.html)


現在(2024/10/05)これのimage saveノードが唯一webpからノードを読める。
読み込み処理まで作ってるのかもしれないが。

save-image-extended-comfyuiでも行けるようになってた。(2024/10/16)
ComfyUI本体側の不具合？


## ComfyUI-KJNodes
kijaiのSAM2を使うときに必要なノード。
意外と便利系が多い。

Widget to Stringというノード上の入力文字から文字列を出力してくれる奴がある。
ファイル名とか取り出すときに。

[GitHub - kijai/ComfyUI-KJNodes: Various custom nodes for ComfyUI](https://github.com/kijai/ComfyUI-KJNodes)

Colur Matcherがあるので別々の画像を色合わせとかにも使える？

HunyuanVideoを少し長くするRIFLExが使える。
GGUFと合わせれば行ける？

[RifleX Workflow Example? · Issue #415 · kijai/ComfyUI-HunyuanVideoWrapper](https://github.com/kijai/ComfyUI-HunyuanVideoWrapper/issues/415)

[How do you use the new Apply RifleXRoPE HunuyanVideo? · Issue #205 · kijai/ComfyUI-KJNodes](https://github.com/kijai/ComfyUI-KJNodes/issues/205)
[HunyuanVideo Image-to-Video GGUF・FP8およびComfyUI Nativeワークフロー完全ガイドと実例 \| ComfyUI Wiki](https://comfyui-wiki.com/ja/tutorial/advanced/hunyuan-image-to-video-workflow-guide-and-example)
## ComfyUI-Depth-Pro
軽く正確にメートル単位で深度を取るデプスマップ。
Marigold、Anything V2より強い。
髭も取れるらしい。

メートルで取れるため、0-1クランプが必要。
Metric Depth to Relativeで0-1にできる。

[GitHub - spacepxl/ComfyUI-Depth-Pro: https://github.com/apple/ml-depth-pro](https://github.com/spacepxl/ComfyUI-Depth-Pro)

FP32じゃないとまともに動かない。（2024/10/17）
Depth Anythingのような解像度指定もなく、直接画像を深度に変換するのでノードがシンプル。

平面的な絵にめっぽう弱い。つまりイラストに弱い。
そういう使い方するからだが。

強みは速さ。

## ComfyUI-Lotus
depthとnormalを高精度で取れる。
軽いのが強み。
イラストに強い。

[GitHub - kijai/ComfyUI-Lotus: ComfyUI nodes for Lotus depth/normal prediction](https://github.com/kijai/ComfyUI-Lotus)

モデル位置は`ComfyUI/models/diffusion_models`。
StabilityMatrixでは`UNet`に位置する。

SD15のVAEを使用するほか、順当に組むと色が反転した状態（白奥、黒背景）になる。

Depth-pro同様fp32でないと動かなかった。（2024/10/17）
環境が悪そう。

形をとる能力は随一。
空間には弱い。
おそらくほぼ画像生成なので遅い。Depth Pro60sに対し220s。
もちろんVRAMロードが終わってれば20sくらいで終わる。

変に色移りすることがある。どうせ使用時に二値化するからどうでもいいというのはそう。

画像生成を挟む関係上、サイズが4の倍数になる。
気になるならリサイズを組む。

## save-image-extended-comfyui
柔軟な記法とオプションでワークフローつきwebpを保存できる。
現時点(2024/10/16)で有力候補。

[GitHub - audioscavenger/save-image-extended-comfyui: Save as AVIF, WebP, JPEG, customize the folder, sub-folders, and filenames of your images!](https://github.com/audioscavenger/save-image-extended-comfyui?tab=readme-ov-file)

Zettelkasten IDを振るなら`%Y%m%d%H%M%S`。

## ComfyUI-GGUF
DiT系モデルで使える圧縮方式、GGUFをロードする。
ggufは`unet`、clipは`clip`にそれぞれ手動でDLすることになる。

[GitHub - city96/ComfyUI-GGUF: GGUF Quantization support for native ComfyUI models](https://github.com/city96/ComfyUI-GGUF)
[comfyuiblog/OpenFLUX.1\_gguf at main](https://huggingface.co/comfyuiblog/OpenFLUX.1_gguf/tree/main)
[ostris/OpenFLUX.1 at main](https://huggingface.co/ostris/OpenFLUX.1/tree/main)

## ComfyUI_LayerStyle
Photoshopのようなフィルタを掛けられる。

[GitHub - chflame163/ComfyUI\_LayerStyle: A set of nodes for ComfyUI that can composite layer and mask to achieve Photoshop like functionality.](https://github.com/chflame163/ComfyUI_LayerStyle?tab=readme-ov-file)

チャネル分割、自動切抜き、自動キャプション、キャプション装飾など無駄に機能が多い。
あまり使いたいものではない。

## comfyui-image-blender
画像合成。88のブレンドモードをサポートする。

[GitHub - vault-developer/comfyui-image-blender: ComfyuiImageBlender is a custom node for ComfyUI. It may be used to blend two images together using a specified blending mode.](https://github.com/vault-developer/comfyui-image-blender)

## z-tipo-extension
タグ又はキャプションから詳細なプロンプトを生成するために作られたLLM、TIPO(Text to Image with text presampling for Prompt Optimization)を使う。

[GitHub - KohakuBlueleaf/z-tipo-extension: A sd-webui extension for utilizing DanTagGen to "upsample prompts".](https://github.com/KohakuBlueleaf/z-tipo-extension?tab=readme-ov-file)

元はLlama。

ノードはTIPO。

出力形式を指定することができる。
入力されたタグは大体`<|general|>`に入る。`<|extended|>`はNL inputの単語に続けてプロンプトを入力する。

omostと合わせたいけど、1024文字のプロンプト制限が厄介。

## ComfyUI-Geowizard
屋内、屋外、オブジェクトの三つの深度を取得できる。

[GitHub - kijai/ComfyUI-Geowizard: Wrapper node to use Geowizard in ComfyUI](https://github.com/kijai/ComfyUI-Geowizard)

結構正確だが、重い？
[DepthPro、Lotus、Metric3D、Depth Anything V2等深度图生成效果大比较\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1Hn2fY4Eyv/?vd_source=e369db939e8e2c3ade8acc8fb0f4f340)

## ComfyUI-HunyuanVideoWrapper
HunyuanVideoを使うためのノード。
今はデフォで対応しているので基本必要ない。

[GitHub - kijai/ComfyUI-HunyuanVideoWrapper](https://github.com/kijai/ComfyUI-HunyuanVideoWrapper)

## ComfyUI-MVAdapter
一枚の画像から多面的に見た画像を生成する。
3D制作のお供的な奴。T-Poseにする処理はない。
[GitHub - huanngzh/ComfyUI-MVAdapter: Custom nodes for using MV-Adapter in ComfyUI.](https://github.com/huanngzh/ComfyUI-MVAdapter)

## ComfyUI-Distill-Any-Depth
深度推定。Lotusよりデータ少な目で動いたという。
実使用上ではLotusの方が精度上な場面もある。marigoldやDepthAnythingv2よりは上らしいのでいいかも。
3D専門のGeowizardも超えられるらしい。
[GitHub - ZHO-ZHO-ZHO/ComfyUI-Distill-Any-Depth](https://github.com/ZHO-ZHO-ZHO/ComfyUI-Distill-Any-Depth)

試せる。
[Distill Any Depth - a Hugging Face Space by xingyang1](https://huggingface.co/spaces/xingyang1/Distill-Any-Depth)

## ComfyUI-ShadowR
被写体から陰影を取る。いわゆるdelight。

[GitHub - Easymode-ai/ComfyUI-ShadowR: ComfyUI ShadowR Wrapper](https://github.com/Easymode-ai/ComfyUI-ShadowR?tab=readme-ov-file)

3D系じゃないと効果がない。2Dならこの辺をどうにか。
光と影を含めたレイヤー分
[mattyamonaca/layerdivider: A tool to divide a single illustration into a layered structure.](https://github.com/mattyamonaca/layerdivider)
線画の下塗り
[mattyamonaca/auto_undercoat: Automatic generation of picture undercoat from line drawings](https://github.com/mattyamonaca/auto_undercoat)
線画維持完全塗り
[GitHub - mattyamonaca/starline: Strict coloring machine for line drawings.](https://github.com/mattyamonaca/starline)

今回は線画を維持する必要はない。線画作るのにlineartを噛ませるため。

入力線画画像、出力下塗り。
＋入力元画像。最頻値取得。もし画像が入力されていれば、最頻値を取得して塗る。
入力線画が線画じゃなく色ついてたら、その時点でsegmentかけてループ。

## ComfyUI-LayerDivider
画像をレイヤー分する奴のcomfyui版。

[GitHub - jtydhr88/ComfyUI-LayerDivider: ComfyUI LayerDivider is custom nodes that generating layered psd files inside ComfyUI](https://github.com/jtydhr88/ComfyUI-LayerDivider)

[mattyamonaca/layerdivider: A tool to divide a single illustration into a layered structure.](https://github.com/mattyamonaca/layerdivider)

auto-undercoatだと線画作る時に光と影の線が入りそうなのでこれがいいか。
しかしcudaの要求が厳しい。onnxを使っているのは一か所なので、そこの修正を試みる。

anime-segを使用しているもよう。
該当はbg_remover.pyのget_mask。さらにこれがget_foregroundで使われ、Id_processor.pyのget_baseで使われる。
現代だと前面抜きなんて珍しくもないので、これを入力に頼ればいい。しかしget_baseが求めているのはdf_list。`[fg_df, bg_df]`が内部。

その内部を探る前に、dfについて。これはId_converter.pyのrgb2dfでimgから作成された値集合。
……imgから作られてるなら、ここに渡せば終わりでは？

下から、rgb2df->get_foreground->get_base->color_base_divide。
color_base_divideがおそらくノードなので、ここにforgroundイメージを入れて下まで流せばOK。

layer_divider_node.pyのLayerDividerDivideLayerを修正。

そこはたぶん行けたんだけど、pytoshopが引っかかって上手く動かない。

pytoshop.enumのBlendModeがlayer_divider_node.py->generate_layers, class LayerDividerDivideLayer->execute, 
main.py->segment_divide, color_base_divide

Id_utils.pyではlayersがadd_psd,save_psd,
pytoshopがsave_psdで使われている。多すぎる。

よく見るとBlendModeはsave_psdの引数に使っている。
save_psdではlayersをadd_psdに渡している。

generate_layersは宣言されているだけで使ってない。
LayerDividerDivideLayerはノードの一つの値として、このノードはcomfyuiに追加される唯一のノード。

segment_divideはmain.pyのdivide_layerに使われている。color_base_divideも同様。
divide_layerはmain.pyのon_ui_tabsにある。
on_ui_tabsはたぶん使われてない。

add_psdはsave_psdでしか使ってない。
save_psdはmain.pyのsegment_divide, color_base_divide, layer_divider_node.py->generate_layers, class LayerDividerDIvideLayer->executeで使っている。

しかし前述のとおりsegment_divideとcolor_base_divideは大本のon_ui_tabsを使ってない、
generate_layersは宣言されてるだけ、
LayerDividerDivideLayerはノードの一設定なので、これを除けば何も問題は無くなる。

認識が違った。NODE_CLASS_MAPPINGSというenumみたいなのがlayer_divider_node.pyで宣言されており、`__init__.py`でimportして使われている。
このNODE_CLASS_MAPPINGSが追加するノードを指定している。つまり一設定ではなくノードそのもの。

LayerDividerDivideLayerを除くわけにはいかなくなった。
するとsave_psdが必須になり、add_psdも復活する。

save_psdを使っているのは、filenameという変数のため。
これがpsdへのファイルパス。なのでこれを除けばいいはず。


綺麗に影だけ消えるわけではない……
いやまあ当然だが。やっぱり下塗りしなきゃだめだこれ。

## ComfyUI-RMBG
comfyuiの背景削除系セット。
birefnetやsamなど多彩。
[GitHub - 1038lab/ComfyUI-RMBG: A ComfyUI custom node designed for advanced image background removal and object, face, clothes, and fashion segmentation, utilizing multiple models including RMBG-2.0, INSPYRENET, BEN, BEN2, BiRefNet models,...](https://github.com/1038lab/ComfyUI-RMBG/tree/main)

## ComfyUI-StableXWrapper
normal取る奴とshadow消す奴をセットにしたもの。

[GitHub - kijai/ComfyUI-StableXWrapper: ComfyUI wrapper for StableX normal/delight models](https://github.com/kijai/ComfyUI-StableXWrapper?tab=readme-ov-file)

## ComfyUI_StableDelight_ll
光沢を消す。

[GitHub - lldacing/ComfyUI\_StableDelight\_ll](https://github.com/lldacing/ComfyUI_StableDelight_ll)

## ComfyUI_auto_undercoat
[StableDiffusion＆ControlNet＆SegmentAnythingを使って線画の自動下塗り＆レイヤー分けツールを作った話](https://zenn.dev/aics/articles/d5a504d2f2a763)
[GitHub - mattyamonaca/auto\_undercoat: Automatic generation of picture undercoat from line drawings](https://github.com/mattyamonaca/auto_undercoat)
app.pyでやってる。
入力は線画であることに注意。

class webuiのundercoatが本体のはず。
まずresize_image,cv2のデータにした後特定のピクセルだけ黒に。
generate,processで本処理を行い、後は全部saveとPILのalpha_compositeなどの処理。

generateではdiffusersを通してanimagine、controlnetにlineartxlとline出力用のline2line,flat塗りを行うloraを使うパイプラインが組まれている。
このパイプラインを一回変数に入れ、その変数に引数を渡すとパイプラインが動くっぽい。色付け。

どうやら最新バージョンだとsamを使用していない模様。
領域分けをして塗るまでもなく、flat loraを使用すれば下塗りっぽく塗れるためか。その上に線画を合わせればそれだけでいいという判断として話を進める。

## ComfyUI-GGUF
[GitHub - Mattabyte/ComfyUI-GGUF: GGUF Quantization support for native ComfyUI models](https://github.com/Mattabyte/ComfyUI-GGUF)

ggufモデルを使えるようにする。
checkpointモデルの置き場はunetになるので注意。

## ComfyUI-InstantCharacter
[GitHub - jax-explorer/ComfyUI-InstantCharacter](https://github.com/jax-explorer/ComfyUI-InstantCharacter)

キャラの一貫性を保ちつつ画像生成。要はIP-Adapter上位互換。
ライセンスに商用利用は不可とある。

offloadかけてVRAMは24GB必要。きっつ。

## kaytool 
[GitHub - kk8bit/kaytool: 一个为 ComfyUI 开发的自定义节点实用工具包 A custom node utility package developed for ComfyUI](https://github.com/kk8bit/KayTool)

ノード全体のスクリーンショット、displayany, 一部ノード実行、マスクプレビュー、画像とマスクの合成、背景削除などの機能を追加。
他のノードでもできるしgluluが邪魔なので却下。ノード配置整理やリソースモニターはちょっと気になる。

## ComfyUI-WanVideoWrapper
[GitHub - kijai/ComfyUI-WanVideoWrapper](https://github.com/kijai/ComfyUI-WanVideoWrapper)

wanで動画生成。ほとんどは標準対応してるのでgguf使えないこのノードの出番はない。
vaceやskyreels-Aの編集、dfモデルが使いたいなら。

たまに画像の縦数値を16で割れるようにしないと動かないノードがある。
[SkyReels V2 DF 540p Diffusion Forcing Sampler · Issue #511 · kijai/ComfyUI-WanVideoWrapper](https://github.com/kijai/ComfyUI-WanVideoWrapper/issues/511)

## ComfyUI-MultiGPU
[GitHub - neuratech-ai/ComfyUI-MultiGPU: Rudimentary support for using multiple GPUs in a ComfyUI workflow](https://github.com/neuratech-ai/ComfyUI-MultiGPU)

モデルを何処にロードするか選べるようにする。
T4x2は本来30GB使えるはずなので、重要

## Comfyui-FlowChain
[GitHub - numz/Comfyui-FlowChain: Convert your workflows into nodes and chain them together](https://github.com/numz/Comfyui-FlowChain)

ワークフローをノードに変換。
グループノードに変換する機能はデフォであるが、入出力順序などを調整したいなら。

## ComfyUI-LBMWrapper
[GitHub - kijai/ComfyUI-LBMWrapper](https://github.com/kijai/ComfyUI-LBMWrapper?tab=readme-ov-file)

latent bridge matchingを使う。
背景に合わせて前景をライト調整する。

BY-NCなので注意。

LBMは他にも単眼深度推定モデルなどを作ってるらしい。
[ComfyUI-LBMWrapper - work4ai](https://scrapbox.io/work4ai/ComfyUI-LBMWrapper)

## ComfyUI-BiRefNet-Hugo
[GitHub - MoonHugo/ComfyUI-BiRefNet-Hugo: 本仓库将BiRefNet最新模型封装为ComfyUI节点来使用，相较于旧模型来说，最新模型的抠图精度更高更好。This repository wraps the latest BiRefNet model as ComfyUI nodes. Compared to the previous model, the latest model offers higher and better matting accuracy.](https://github.com/MoonHugo/ComfyUI-BiRefNet-Hugo)

birefnetしか使えないノード。
RMBGはインストール重いしこれで済むならいいんじゃないか。