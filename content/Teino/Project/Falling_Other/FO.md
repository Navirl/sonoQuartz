機械の背景、夕景、キャラクタ
機械背景、キャラクタ前景
機械背景はループとブラー、キャラクタ前景は髪揺らし
ある点で機械背景途切れ、夕景背景に入れ替え
夕景背景は少しずつカメラ下ろし、キャラクタ前景は髪揺らしはそのまま夕景に合わせ影動かし

機械背景
ループ画像と、ループ途切れ部分持ち画像（上下）
OutPaintで伸ばすだけ

夕景背景

カメラ下ろし
デプスと合わせてVertical視差を作る
[GitHub - akatz-ai/ComfyUI-Depthflow-Nodes: An implementation of Depthflow in ComfyUI](https://github.com/akatz-ai/ComfyUI-Depthflow-Nodes)
太陽の光
出てきた瞬間IC-Light
ただこれリアル調っぽい……もう少し情報を集めよう
[GitHub - kijai/ComfyUI-IC-Light: Using IC-LIght models in ComfyUI](https://github.com/kijai/ComfyUI-IC-Light)

やっぱりというか、環境光しか出せない。

仮にIC無しで光を作る場合
hunyuanで動画
始点、中間、終了Fをdepanyv2でdepth取って、2値化で切り合成
再度動画化

![](<../../image/FO-1746540655395.webp>)

反射立体にdepth使って影づくり。
白の背景に反射ハイトマップdepthぼかし、二値化でアニメ影化、色調補正で薄め、色反転してからUnmultで黒を透過して再度色反転で影を戻す。
Unmultが無いならキーイングや加算合成になるが、白飛びとかするらしいので
あと周りに影が結構はみ出るので結局birefnetマスクで削除グループ合成が必要。

そこそこいい絵だが、顔への落ち影が酷い
顔だけsegmentして別に取る工夫が必要

結局craig-martinが一番うまく下塗りできる。

hsv
cscfill
flat_color

どの手も微妙だった。
やっぱりcraigがナンバーワン。

ただし色指定が出来ない。animagin単体は髪の色だけは外さないが、ウェイト落とさないと髪すら色がずれる。
あとこの色で作品を成立させるためかやたらギラギラする。

色ならLayerDividerで何とかなるかと思ったが、分けた後にその色がどこの物だったのか説明できない。

i2iでけっこう上手くいった。
craigは色分け雑なので、切抜きとかと合わせて背景を消しつつ……i2i程度で行けるならILで(flat color:1.5)もありか。
あとはこれに顔落ち影対策、framepackで落下を作る。

なのでまずは落下中の一枚絵を生成する。
最初の絵を背景切抜きIP-Adapter、プロンプトでfalling, sky, squatting?, sitting?, from_side?を追加。落下姿勢を取らせる。

librasよさげ。
ntr,sudachiは動かすのに向いて無さそう。
nnailousはいまいち制御できない。
obsessionは絵柄はいいがしゃがみ具合が。V-predictionでも微妙。
novaflatあり。animeクソ。



キャラクタ前景
落ちながら髪を揺らすだけ
framepackで可能不可能を見る

fpは30GBくらい使うらしい
sdxlの使用容量を考えるとギリギリなので、これは単体で動かしたほうが良さげ

Framepackのモデルはbf16でエンコされてる。bf16が使えるRTX30XX系じゃないと使えない。Oh......

compute capabilityというのが8以降じゃないとbf16が使えないらしい。
t4は7.5でp100は6。
[NVIDIA CUDA GPU Compute Capability](https://developer.nvidia.com/cuda-gpus)

kijaiのwrapperなら動くかもという報告。
f1用のもあるしいけるか？

t4 shader model 6.8
[NVIDIA Tesla T4 Specs](https://www.techpowerup.com/gpu-specs/tesla-t4.c3316)
p100 sm6.0
[NVIDIA Tesla P100 PCIe 16 GB Specs](https://www.techpowerup.com/gpu-specs/tesla-p100-pcie-16-gb.c2888)

sage-attentionを使用するにはSM8が要る。
[triton + sageattention error: RuntimeError: PassManager::run failed · Issue #6228 · comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI/issues/6228)

flash-attnはコンパイルが終わらない。
xformersはカツカツな容量からはみ出る。

```
!pip cache purge
!conda clean -a -y
```

これでキャッシュを消してもxformersは足りない。
しゃあないのでsdpa。

fp8じゃないとkaggleの50GBに入らない。
bf16を元にfp8_e4m3fnにしたよという設定にしないと黒の画像が出力される。
load_deviceはoffloadでCPUに出す。それでもCPU27.6GPU13。
VAEもbfじゃなくfpを使用。

縦640だと30step5秒で5700秒。1.58時間。
teacacheを使うと2回目以降が無理。

HYは適切な解像度がある。大きすぎると遅くOOM、小さすぎても。
[Update framepack\_hv\_example.json by Crimsonfart · Pull Request #1 · kijai/ComfyUI-FramePackWrapper](https://github.com/kijai/ComfyUI-FramePackWrapper/pull/1)

![](<../../image/framepack.json>)

![AnimateDiff\_00002](<../../image/AnimateDiff_00002.mp4>)

動くには動く。


model
- sudachixl
    - [すだち XL (イラストリアス) - v1 | イラストリアスチェックポイント | Civitai](https://civitai.com/models/1288125?modelVersionId=1453425)
- obsession
    - [Obsession (Illustrious-XL) - v-pred_v1.1 | Illustrious Checkpoint | Civitai](https://civitai.com/models/820208/obsession-illustrious-xl)

