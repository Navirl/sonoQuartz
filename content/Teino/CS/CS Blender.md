---
date: 2021-10-16 18:52:10
tags:
 - App/Blender
 - CheatSheet
---

## Cloth Sewing
Add→Gridとctrl+Dの複製などで布を二枚用意。少し離して置いて、ctrl+Jで一つのオブジェクトにする。
Tab→2キーで辺選択、shiftで複数、altで一直線上。つなげたい辺同士を選択してctrl+E→Bridge Edge loopでつなぐ。すかさずx→Only Faceで面を消し、辺だけでつながった状態に。
あとは物理演算タブでcollision→self collisionをON、shape→sewingで調節。**オブジェクトモードで**アニメーションを再生すると布になる。

## オブジェクトの結合・分離
shift+Gで複数選択してctrl+J（Join）。
分離はface選択とかしてp（seParate）からselection。

## Curve
Editモード時、横のツールボックスから自由に書ける。
Eで伸ばせるし、Wで両点を選んでいれば間にポイント追加もできる。
Vでハンドルのタイプを切り替えられる。

## 見た目切り替え
Zで切り替えできる。
テンキーの.でものにフォーカスできる。

## 物体移動
shiftSでカーソル位置をいろんな場所に移動できる。
物体をいろんな位置に配置することもできる。
そこからshiftTabでスナップを有効化すればグリッドスナップになる。
shiftctrlaltC、またはObject→set originで原点を移動できる。

## 面貼り
頂点を選択してF。
その後エッジを選択すると、Fでどんどん張れる。