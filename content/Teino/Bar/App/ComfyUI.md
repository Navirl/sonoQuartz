---
date: 2024-04-16
tags:
  - Bar
---

up:: [AI\_image](<../AI/AI_image.md>)
same:: [sdwebui](<./stable-diffusion-webui.md>)

[GitHub - comfyanonymous/ComfyUI: The most powerful and modular stable diffusion GUI, api and backend with a graph/nodes interface.](https://github.com/comfyanonymous/ComfyUI)

高速で動く[sdwebui](<./stable-diffusion-webui.md>)対抗。起動も早い。
ノードベース。
webuiよりバックエンドとして優秀。普通に使っても軽い。

起動引数。
[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/15jxydu/comfyui_command_line_arguments_informational/)

pluginまとめ
[GitHub - WASasquatch/comfyui-plugins: Extensions, Custom Nodes, and other plugins for ComfyUI](https://github.com/WASasquatch/comfyui-plugins)

[sd サンプラー](<../../Info/sd サンプラー.md>)

[comfy Custom Nodes](<../../Info/comfy Custom Nodes.md>)

--cpuでcpu起動できる。

## a1111からの移行ガイド
[ComfyUI migration guide FAQ for a1111 webui users | Andrés Zsögön](https://www.andreszsogon.com/automatic1111-to-comfyui-migration-guide/)

## ノード共有
jsonを使用して共有できる。画像に埋め込むことも可能。
生成した画像には一緒に埋め込まれるのでA1111より共有は楽。

## モデル更新
Refreshボタンを押す。
rキーがショートカット。

[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/18gjwhr/refresh_model_list_without_restarting_comfyui/)

## ノードの所属パッケージ
ComfyUI ManagerでBadgeを設定する。

[ComfyUIのノードの所属パッケージ名を知る｜sho](https://note.com/closer0502/n/n3740b61e9179)

## ControlNet
ほとんどは以下のauxをインストールすれば使える。
[GitHub - Fannovel16/comfyui\_controlnet\_aux: ComfyUI's ControlNet Auxiliary Preprocessors](https://github.com/Fannovel16/comfyui_controlnet_aux)

auxの使い方例。
[【ComfyUI基礎シリーズ6】ControlNetノードの組み方 | 謎の技術研究部](https://www.ultra-noob.com/blog/2023/45/)

### IP-Adapter
[ComfyUI で IPAdapter + ControlNet を試す｜npaka](https://note.com/npaka/n/n804128301d1d
[ComfyUI IPAdapter Plusの詳細チュートリアル](https://www.runcomfy.com/ja/tutorials/comfyui-ipadapter-plus-deep-dive-tutorial)

### OpenPose
[ComfyUIでSDXLのControlNetの使い方：Canny＆OpenPose  |  鷹の目週末プログラマー](https://happy-shibusawake.com/comfyui_sdxl_controlnet/2624/)
[【ComfyUI】AnimagineXLでOpenPoseを使う【SDXL】｜ウチダマサトシ](https://note.com/uchidama/n/nbf0b060af1b4)
[【ComfyUI】OpenPose Editor for ComfyUI の使い方｜ウチダマサトシ](https://note.com/uchidama/n/n687aff58694d)
[GitHub - space-nuko/ComfyUI-3D-OpenPose-Editor](https://github.com/space-nuko/ComfyUI-3D-OpenPose-Editor)
[GitHub - space-nuko/ComfyUI-OpenPose-Editor](https://github.com/space-nuko/ComfyUI-OpenPose-Editor)



bbox_detectorは物体検出。
smlはサイズ
[GitHub - Megvii-BaseDetection/YOLOX: YOLOX is a high-performance anchor-free YOLO, exceeding yolov3\~v5 with MegEngine, ONNX, TensorRT, ncnn, and OpenVINO supported. Documentation: https://yolox.readthedocs.io/](https://github.com/Megvii-BaseDetection/YOLOX)

基本的にyolox_l.onnxとdw-ll_ucococ_384.onnxを使えばOK。

書きだすと一番上に`[]`があるせいでエディタで反応しない。
手動で消す。

[Openpose Editor](https://huchenlei.github.io/sd-webui-openpose-editor/)
## resize and fill
paddingを使い、inpaintとしてnavierで埋める。
その後blurをかける方法もあるらしい。

[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/15k6y8q/outpainting_or_stretch_and_fill/)

もしくはoutpaintを使用、増やした分のマスクにset latent noise maskを使用してoutpaintの画像と合体させる。
[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/162m1vf/how_to_onestep_txt2image_resize_and_fill_using/)

![how-to-one-step-txt2image-resize-and-fill-using-controlnet-v0-dxt6n3z51xkb1.jpg](https://preview.redd.it/how-to-one-step-txt2image-resize-and-fill-using-controlnet-v0-dxt6n3z51xkb1.jpg?width=1862&format=pjpg&auto=webp&s=749864b85a03439aecd05f0f864e5f3419297db7)
## ngrok
標準でついてないので自前で。
とはいえカスタムノードを使用した直接起動がある。これを配置してinit.py開いて書き換え。

[GitHub - pkpkTech/ComfyUI-ngrok](https://github.com/pkpkTech/ComfyUI-ngrok)

zrokを使う方法も。

[sd Tunnel](<../../Info/sd Tunnel.md>)

## SDXL OpenPose代わり
OpenPoseが使えるSD1.5で絵の大まかな方向を決定。
その絵から線画を抽出し、SDXLに入れる。
    Hed Softedgeとcontrollliteのsoftedge
    sargeztのsoftedgeは見た目はいいが2gbのせいで落ちる
細部がちょっと雑になるので、SD1.5でrefineして仕上げる。ip-adapterもここ。

[SDXLでControlNetのScribble/Sketchモデルを使用する - Stable Diffusion Tips | iPentec](https://www.ipentec.com/document/software-stable-diffusion-controlnet-using-scribble-sketch-model)
[SDXL RefinerをComfyUIで使おう｜なかむらしっぽ/中邑七宝](https://note.com/nakamurashippo/n/nde55d3e27801)

lineartじゃないのは修正がめんどそうだから。

[SDXLでControlNetのLineartモデルを使用する - Stable Diffusion Tips | iPentec](https://www.ipentec.com/document/software-stable-diffusion-controlnet-using-lineart-model)
[ControlNet(v1.1)のLineartを極める！他機能との違いも！【Stable Diffusion】 | 謎の技術研究部](https://www.ultra-noob.com/blog/2023/24/)

同じ用途のX-Adapterというのがある。
仕組みは同じ。

背景
[簡単！StableDiffusionWebuiで画像合成　背景・人物どっちも雰囲気大切編｜ぐふとくく＠gufutokuku](https://note.com/gufutokuku/n/n095be2adb9b6)

## PatchModelAddDownscale
Kohya Deep Shrinkとも。
大きい画像を生成したときに人間などが二重になる現象を回避できるアップスケーラー。
modelに挟む。

ちなみに仕組みは原因部分の時だけLatentを縮小するものらしい。

[Deep Shrink Hires.fix - work4ai](https://scrapbox.io/work4ai/Deep_Shrink_Hires.fix)
[【ComfyUI+SDXL】描き込み強化を重視したHires.fixを組み込んだワークフロー｜mogami](https://note.com/mogami_aiillust/n/n76f13b63aa39)

そもそも大きな画像出力用の定めとして当然出力時間は伸びるので、構図を先に決めたい場合はi2i用画像の生成フローを一緒に組み込むといいよという話。

同じ用途のHiDiffusionというのがある。

## raise RuntimeError(f'{self is bound to a different event loop')
comfyui-profilerのバグ。
代わりにdev-utilを使う。

[random crashes since last update · Issue 2999 · comfyanonymous/ComfyUI · GitHub](https://github.com/comfyanonymous/ComfyUI/issues/2999)
[Error after KSampler execution. · Issue 2 · tzwm/comfyui-profiler · GitHub](https://github.com/tzwm/comfyui-profiler/issues/2)
[GitHub - ty0x2333/ComfyUI-Dev-Utils: Execution Time Analysis, Reroute Enhancement, Remote Python Logs, For ComfyUI developers.](https://github.com/ty0x2333/ComfyUI-Dev-Utils)

## バッチの最後のイメージを取り出す
selectorをインストール。

[GitHub - SLAPaper/ComfyUI-Image-Selector: Select one or some of images from a batch](https://github.com/SLAPaper/ComfyUI-Image-Selector)

## BREAK
conditioning concat。

[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/15dmden/how_do_i_replicate_the_break_prompt_feature_of/)

## Inpaint Sketch
Inpaintはその部分だけをマスクしてi2iを掛ける機能。
Sketchは書き足して全体にi2iを掛ける機能。
なのでComfyuiでやるなら、たぶん書き足した画像とそこにかかるマスク画像を用意し、inpaintよろしくMask Encodingすれば出来るはず。

[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/13h20kx/how_is_inpaint_sketch_used/)

## soft inpaint
InpaintModelConditioning。
[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/1aulgmx/soft_inpainting_a1111_new_feature_is_there_any/)

## Manga
Mask from colorを使用することにより、自動で一つずつ処理させる。

[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/1clxiu5/manga_creation_tutorial/)

## Xe Graphics
Intel内蔵GPUも一応サポートしている。
Pytorchを専用の物に差し替える必要がある。

[Intel Arc Graphics Thread · comfyanonymous/ComfyUI · Discussion 476 · GitHub](https://github.com/comfyanonymous/ComfyUI/discussions/476)

## Inpaint
画像右クリックでmask editorが使える。
しかしsdwebuiの標準機能以下なので、Segment Anythingなどを使い自動で認識させるほうが良い。

## Empty Image
色をRGBの16進数で選べる。
が、本当に16進数を入力するとエラーになるので10進数として使用する。
例えば赤はff0000にすればいいので16711680。

## i2i
Ksamplerのdenoiseはステップ数の後ろから何割を適用するかという設定。
KsamplerAdvancedでいうStep25Start0End12みたいな、初めから何割みたいなのはKsamplerだと作れない。

[KSamplerAdvanced で denoise 量を指定する方法 - ComfyUI 解説 (wiki ではない)](https://comfyui.creamlab.net/guides/f_KSamplerAdvanced_denoise)
適当な色パターンをぶち込んでもいい感じの絵が出る。

[【ComfyUI】ランダムなカラーパターンからイラストを作る方法](https://sorenuts.jp/8627/)

## 背景削除
BRIA AIとMarigoldの二値化が使える。
~~BRIAはなんか中身iopaintのrembgっぽい？~~別物っぽい。

[ComfyUIで背景を削除できるノード【BRIA AIとMarigold】](https://sorenuts.jp/11480/)

他、CartoonSegやAnimesegも使える。
今ならbirefnetが最強化。
## Tips
ヒストリ消さないと重くなるらしい。
Latentを途中保存することで軽くなる。

## Latent Composite
ノイズを残したlatentを合成し、全体に薄くSamplerを掛ける。
キャラごとの特徴を残しにくいが手は繋げる。

[Noisy Latent Composition Examples | ComfyUI\_examples](https://comfyanonymous.github.io/ComfyUI_examples/noisy_latent_composition/)

## ConditioningSetArea & ConditioningSetMask
Areaはサンプラーの範囲で縛る。MaskはConditioningの範囲を縛る。
Maskもサンプラー範囲を使用することは可能。

[ConditioningSetArea ノード - ComfyUI 解説 (wiki ではない)](https://comfyui.creamlab.net/nodes/ConditioningSetArea)
[ConditioningSetArea の動作詳細 - ComfyUI 解説 (wiki ではない)](https://comfyui.creamlab.net/guides/f_ConditioningSetArea)
[ConditioningSetMask ノード - ComfyUI 解説 (wiki ではない)](https://comfyui.creamlab.net/nodes/ConditioningSetMask)

## 日付
`%date:yyyyMMddhhmmss%`という形式で日付を入力できる。
[Save File Formatting - ComfyUI Community Manual](https://blenderneko.github.io/ComfyUI-docs/Interface/SaveFileFormatting/#date-time-strings)

## ノード名保存
`%node_name.widget_name%`という形式でノード内の情報を得られる。
ここで言うノード名はPropertiesで変更できるNode name for S&R。先にこちらを読み、無ければTitleを使う。

widget_nameの方はconvert widget to inputできるやつ。

[SaveImage ノード - ComfyUI 解説 (wiki ではない)](https://comfyui.creamlab.net/nodes/SaveImage)

## 画像差を浮き上がらせる
image blendというノードがあるので、これでf1.0、differenceを掛ける。

## Regional prompt
SolidMaskで作り、Conditioning (Set Mask)でconditioningを作り、Combineで結合するだけ。
CombineはImpactに複数の奴がある。

## CFG++
低くても崩壊しないCFG。
[GitHub - CFGpp-diffusion/CFGpp: Official repository for "CFG++: manifold-constrained classifier free guidance for diffusion models"](https://github.com/CFGpp-diffusion/CFGpp)

というか滑らかに変換できるCFGっぽい。
[CFG++ - work4ai](https://scrapbox.io/work4ai/CFG++)

## ディテール減らし
[KSamplerAdvancedでディテールを減らす - work4ai](https://scrapbox.io/work4ai/KSamplerAdvancedでディテールを減らす)

add_noiseをdisableにして除去を掛けるとディテールが減る
正しくノイズ除去

## MaskEditor
Load Imageを右クリックでマスク指定できる。
Ctrlで拡大縮小移動。
右クリックかAltで消去。

ComfyUIは**透過（アルファ）画像を処理できず、透過はマスクとして処理される**。
なので透過画像を読み込むと、**透過部分は最初からマスクがついている物**として読み込まれる。
要らない場合はMaskEditorに入りClearをクリックすれば消せる。

[ComfyUI 画像の合成についての検証｜YGPuzzleGTANT](https://note.com/213414/n/n707671e4c8a6)

[comfyui-lama-remover](<../../Info/comfy Custom Nodes.md#comfyui-lama-remover>)を使用する際、これを知らないとうまくマスクできないので注意。

なお、保存はマスクを等価として扱うためうまくいく。

いらすとやの場合、編集途中で消してpngで隠したと思われる部分が見える画像がある。
二枚読み込み、周辺切り取りマスクと編集マスクに分け、image with alphaで作ればOK。

## save nodeのfile_prefixの記法を他でも使いたい
primitiveを使用し、run widget replace on valuesを右クリックのpropertiesからONにすると、同じく変換してくれるようになる。
[Custom node breaks Save File Formatting · Issue 191 · pythongosssss/ComfyUI-Custom-Scripts · GitHub](https://github.com/pythongosssss/ComfyUI-Custom-Scripts/issues/191)

ただしjsonから読み込んだ時に名前を変換してしまう。

日付だけならwasのtext parse tokenが使える。
`%Y%m%d%H%M%S`でZettelkastenIDが振れる。
[GitHub - WASasquatch/was-node-suite-comfyui: An extensive node suite for ComfyUI with over 210 new nodes](https://github.com/WASasquatch/was-node-suite-comfyui?tab=readme-ov-file#built-in-tokens)

thedyzeのsave imageはこの問題を解決してるらしいが、こいつはwebp形式へ変換してくれない。
[Default ComfyUI syntax naming support · Issue 18 · thedyze/save-image-extended-comfyui · GitHub](https://github.com/thedyze/save-image-extended-comfyui/issues/18)

KJNodesにWidget To Stringというウィジェットから直接文字列を出してくれる奴がある。
これでいく。

画像をセーブしたいだけなら[save-image-extended-comfyui](<../../Info/comfy Custom Nodes.md#save-image-extended-comfyui>)でいい。

## カスタムノードを作る
[A Basic Guide to Creating ComfyUI Custom Nodes | Civitai](https://civitai.com/articles/4934/a-basic-guide-to-creating-comfyui-custom-nodes)

## 画像に透明度を足したい
Join Image With Alpha。
Blendとかと混同して忘れがち。

## マスク
白が切り、黒が残り。他のほとんどのマスクと反対。
Depth Proなど外部マップは白手前、黒奥になっている。

## AI感
アウトラインを付けるとAI感は薄れる。

## 画質UP
DiTのみ。
[CFG-Zero* - work4ai](https://scrapbox.io/work4ai/CFG-Zero*)
[SkipLayerGuidance - work4ai](https://scrapbox.io/work4ai/SkipLayerGuidance)

## 速度UP
DiTのみ。
[TeaCache - work4ai](https://scrapbox.io/work4ai/TeaCache)

## Compatibility with CMake < 3.5 has been removed from CMake.
cmakeのバージョンが3.5以下じゃないとsentencepieceで止められる。
先に`pip install cmake==3.27.0`。

[Client Challenge](https://pypi.org/project/cmake/#history)

ちなみにuvだと普通に通る。なんで？


## Create Custom Node
NODE_CLASS_MAPPINGSというclassと名前をまとめたdictを、`__init__.py`で`__all__`に渡す。

classではINPUT_TYPE関数の戻り値jsonでノードの入力、RETURN_TYPESタプルで出力ピン、RETURN_NAMESタプルで出力ピンの名前、CATEGORY stringsでカテゴリの設定などが出来る。

一番大事なノードの中身は、FUNCTION stringで関数名を指定。class内の同名の関数を実行する。

## remove alpha
essentialノードの中にある。

