---
date: 2023-09-30
tags:
  - Bar
  - App
---

up:: [Python](<../Program/Python.md>)

## 基本
modifierはオブジェクト選んでスパナマークから。
適用はmodifierのxの横、vの中。C-aのメッシュ化でもOK。

[【Blender】モディファイアの適用方法（確定方法）方法とミラーでの編集 | らくがきクリエイトmononoco](https://mononoco.com/creative/blender/modifiers-apply)

頂点を纏める場合は選択してmesh->merge。mからでも。

[【Blender4.2】重なった頂点を結合する（マージする）方法 | AY3の6畳細長部屋](https://www.ay3s-room.com/entry/blender-merge-duplicate-points)

メッシュの切り離しは選択からp。

[Felo（フェロー）- 無料のAI検索エンジン](https://felo.ai/ja/search/he2nVCpUZHadyXNUdmBeJx)

## カメラが重い
Preference->Navigation->Orbit Around selection, Auto Depth。

[r/blender - Reddit](https://www.reddit.com/r/blender/comments/10mjcy9/im_new_on_blender_why_this_keep_happening_to_me/)

## 穴が開いてる部分の検出
select->all by trait->non manifold

## 頂点削減
decimate。

collapse(束ねる)は頂点マージ。ratioは元を１としてどれだけ減らすか。頂点グループだけに掛けられる。
un-subdivideはsubdivision surfaceの逆。綺麗に減らせる。
planerは平面を残す。いかにもローポリになる。

[【Blender3.1】面/頂点を削減：デシメートモディファイアー | CGbox](https://cgbox.jp/2022/04/16/blender-decimate/)

## 面張り
選択してEでExtrude。
頂点吸着はマグネットアイコンとN->Tool->Auto Merge。
他、頂点選択してFで面が張れる。

## メッシュ頂点数
ステータスバー右クリック、stat.
Editで選択したら個別オブジェクトの頂点も出せる。

[Blenderでシーン内の頂点・面の数を表示しておく設定 | BlenderBox](https://blender.atom-box.net/setting_scene_stas/)

## 選択ブラシ
select circleがその枠。

[Selecting - Blender 4.4 Manual](https://docs.blender.org/manual/en/latest/interface/selecting.html)

## ショトカ
123でそれぞれ頂点、辺、面


sculpt
fで大きさ、Fで強さ

[blenderモデリング 便利なショートカットキー まとめ](https://zenn.dev/lisras/articles/577ef3f2d4f401#%F0%9F%9B%A0-%E3%82%B9%E3%82%AB%E3%83%AB%E3%83%97%E3%83%88%E3%83%A2%E3%83%BC%E3%83%89)

## テクスチャ転写
Cyclesでベイクできる。
シェーダーエディタで選んでいる画像テクスチャノードが出力先。

[blenderモデリング 便利なショートカットキー まとめ](https://zenn.dev/lisras/articles/577ef3f2d4f401#%F0%9F%9B%A0-%E3%82%B9%E3%82%AB%E3%83%AB%E3%83%97%E3%83%88%E3%83%A2%E3%83%BC%E3%83%89)

## Quandratify
QRemeshifyというアドオンを使用。
[ksami/QRemeshify: 高品質な四角形トポロジーを出力する、使いやすいリメッシャーのBlender拡張機能](https://github.com/ksami/QRemeshify)

