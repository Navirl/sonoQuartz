---
date: 2024-05-06
tags:
  - Info
---

up:: [sdwebui](<../Bar/App/stable-diffusion-webui.md>)
up:: [ComfyUI](<../Bar/App/ComfyUI.md>)
up:: [Stable Diffusion](<../Bar/Stable Diffusion.md>)

[controlnet](<./sd controlnet.md>)を使用する。
古いのだとReferenceを使うが、これは構図も持ってかれるのでなし。

メインはIP-Adapterになるが、これでもあくまで顔を似せるだけであって他の要素、例えば髪などは変わる。
なのでやはりプロンプトを凝るのが重要。

insightFaceを使う場合はinsightFaceをインストール。ちょっとややこしい。
[Fix: Control-Net; ImportError; Undefined; pydantic; insightface · Issue #15564 · AUTOMATIC1111/stable-diffusion-webui · GitHub](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/15564)

InsightFaceはたぶん顔を切り取るため。なので、あらかじめ顔だけ切り出したファイルをアップロードすればfaceでもいいかもしれない。

anyorangesdxlは服の情報を書かないと本当になにも描かない。
sd1.5だとbluepencilが一番近い。時点でanything。
ただまあ、

faceじゃないほうは比率を合わせたほうがよさそう。

SDXLにip-adapterとopenposeXL2を組み合わせると高確率で落ちる。
さすがにliteじゃないと辛そう。

Plus Faceを使うのが一番早いが、服も巻き込んでしまう。
Referenceはバチクソ重くて使えない。

---

SD1.5で身体を作成
キャラだけ抜く
Cannyで象る
余計なものを削除
SDXLでCannyで作成
SD1.5でアップスケール

SD1.5

controlnetをsd1.5で反映させる
	diffusionで背景抜いたマスク用意
		いや完全に形が一致するわけないしマスクいらん
softedgeでSDXLに形を反映させる
	IP-Adapterで顔を反映
	FaceDetailerで手を反映
細部をsd1.5で追加する

なのでほとんどはSDXLに任せる形
キャラ以外の画面構成も

sd1.5で完成からfacedetailer→IP-Adapter顔変更とかありそうだけどどうだろう。



Refiner作戦。
前のモデルのノイズがイメージに残ってると使えない。
llliteは`--force-fp32`じゃないと使えないが、それで15とXL両方使うと落ちる。

---

15pose, 15depthAcanny,XLi2i作戦。

[3D Openpose Editor](https://zhuyu1997.github.io/open-pose-editor/)でポーズを作り、poseとdepthとcannyをDL。

最初はOpenposeのみ。念のためextra optionとlatentのbatchで複数枚。
全体はいいけど手が駄目なのを選び次へ。あとで背景を作らない場合はここで作る。

depthとcanny。元画像をアップスケールしてキャンバスを大きくし、それぞれ弱めにかける。depthは少し強め。
完成形にはhand detailerもかけ、完全な手を作る。

XLi2i。step50くらいで、元絵の特徴を残しつつ完全にXLの画風になるように。
完成してもいくつか修正が残るはずなので、lamaとinpaintで後処理。完成。
ここはforgeのほうが良いかも。
と思ったが、元絵からCannyとdepthを再度取ってEmpty Latentにかければ何とかなるか。ここまで背景無しならここで書き込むこともできるし。
それぞれはdiffuserのControlNetモデル。強度は0.6。DepthはMiDaS。

背景を別に点けたいが、それらControlNetを使用した状態で透過しようとすると色とかおかしくなる。公式認識済み。
正直シルエットは同じはずなのでSD15の時点でマスクを作って抜けば何とかなりそう。

最後にXLをかける都合上LoRAはXLの物になる。
注意としてキャラの身長なども反映されるので最初のOpenposeはきちんと身長測ったものをつかう。


---

業務に使う場合は時間的に割に合わない。
