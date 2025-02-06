---
tags:
  - Info
aliases:
  - sd blender
---

daily:: [2024-05-24](/Daily_Note/2024-05-24.md)
up:: [Stable Diffusion](../Bar/Stable%20Diffusion.md)
up:: [sd ControlNet](<./sd controlnet.md>)
up:: [Blender](<../Bar/App/Blender.md>)

オープンポーズ等をblenderから自由度高く出力するblendファイル。
そこそこ手間がかかるので事前にSD1.5Scribble出力するなどしてイメージは固めておく。

[Character bones that look like Openpose for blender \_ Ver\_96  Depth+Canny+Landmark+MediaPipeFace+finger](https://toyxyz.gumroad.com/l/ciojz)

[3D Openpose Editor](https://zhuyu1997.github.io/open-pose-editor/)と違うのは、手の調整に色々仕込まれていることとNormalなども出力できること、体格を調整できること。
逆に言うとそのへん必要ないなら前者でいい。

まずはOutlinerから色々非表示にしたり、Pose Modeに移行したりする。

チェックがビューレイヤー除外。
矢印がセレクト除外。
目がビューポート表示除外。
カメラがレンダー除外。

2人に増やしたい場合は一度View LayerではなくSceneに移し、それからopenposeBone_grpとそれ以下をすべて選択し、ViewPort(Object Mode)のObject→Duplicate Objects。

[Openpose For Blender v9.3の使い方紹介 - YouTube](https://www.youtube.com/watch?v=PeoYgYNIKcQ)

## リグの値を見たい
PropertiesからBone Properties（骨のマーク）



## Poseを保存したい
Asset Browserを開き、リグを全選択してAsset→Create Pose Asset。

## 各種サイズ調整
肩幅
胸の四角形(c_spline_02)をスケール。

首
頭(c_head.x)の移動。もしくは首(c_neck.x)の移動。
細くなるのは首(c_neck.x)をスケール。
頭のhead_freeをONにすると首に合わせて頭が大きくなる。

頭
ヘイロー(c_head.x)をスケール。

腰幅
股間の丸(c_root.x)をスケール。

手
手の箱(c_hand_ik)をスケール。
ここにはik_fk_switchというものが仕込まれており、ikとfkを切り替えられる。
一度1にしてしまうとOutlinerからik選んで数値を戻さないと戻らなくなるので注意。

握る
手の上の雲マークみたいなの(c_fist)をスケール。
他にも小指近くの長丸(c_pinky1_base)で一緒に薬指動く奴、親指付け根の小さい丸(c_thumb1_base)で親指動かすなど。


腕
c_hand_ikのstretch_lengthと、肘の丸(c_stretch_arm)で調整。
auto_streatchがあるとc_hand_ikの位置に応じて伸びる。

肘の優先度はかなり高いので最後に調整したほうが良い。

fkモードならc_hand_fkのstretch_lengthでいい感じに縮む。

脚
腕と同様。
加えて股間の円(c_root.x)の移動で大分長さを変えられる。

胸
覆っている部分(c_breast_01)が先。矢印(c_breast_02)がその周りの膨らみ。
それぞれのスケールで自由に大きさを変えられる。

顔
口は顎下の四角(c_jawbone.x)で開けられる。
細かいとこは口周りの球。舌を出すこともできる。

目は上下の長丸で閉められる(c_eyeid)。

頬は円(c_cheek_inflate)と矢印(c_cheek_smile)がある。
円はスケールでこけた頬やふくれ面が作れる。矢印はいまいち使いどころが分からない。

眉は曲がった長方形(c_eyeblow_full)。
眉の上の四点はほとんど直接点を弄る。

鼻は胸と同じく二段構成。


その他
胸(c_spline)と腰(c_root_master)と肩(c_sholder)の大きい四角は回転のみにするべき。末端が伸びる。

## 初期化
一個選択→Aで全選択→clear user Transforms。
あくまでTransformsでありik_fk_switchは戻らない。

## 左右対称
右上のPose OptionsからX-Axis。
途中からONにしてもどっちか触れば対称になる。

## 欠損
Openpose_bodyやOpenpose_handなどは、Object Modeで触るとPropertiesのModifierにHide_○○が出てくる。
チェックを入れると消せる。その下のWireModeは存在の意味が分からない。

## レンダー
左上、ViewからViewport→Cameraと進み設定。
解像度はPropertiesのOutputで設定。

ビューポート操作でカメラを動かす場合はビューポート右メニューからView→View Lock→Camera to ViewportをONにする。重い。

決まったら左上、RenderからRender Image。
.blendと同じ場所にMultiControlnetというフォルダが作成され、そこに16枚吐き出される。


## その他
ほかの
[Riggify model for StableDiffusion ControlNet posable rig](https://3dcinetv.gumroad.com/l/osezw)

フェイシャルマッピングもある
[GitHub - nkeeline/OpenPose-to-Blender-Facial-Capture-Transfer: This blender Python Script maps an OpenPose Facial Capture to a blender facial Rig](https://github.com/nkeeline/OpenPose-to-Blender-Facial-Capture-Transfer)

情報
[OpenPose(棒人間)を作成したり入手する - eightban's memo](http://memo.eightban.com/stable-diffusion/openpose)

一番手軽な奴
[3D Openpose Editor](https://zhuyu1997.github.io/open-pose-editor/)