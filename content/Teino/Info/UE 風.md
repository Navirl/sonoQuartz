---
date: 2022-11-08
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/GUI/UE5.0.2.md>)

## WindDirectionalSource
source:: [【UE5】Wind Directional Source を使ってクロスを揺らす - トンコツ開発ブログ](https://shuntaendo.hatenablog.com/entry/2022/04/29/210000)
source:: [Wind | Unreal Engine Documentation](https://docs.unrealengine.com/5.0/en-US/BlueprintAPI/Wind/)

風は風だが、Chaos ClothやSpeed Treeといった物体に影響を与える物らしい。

使う場合はPlaceActorsから出せる。
コンポーネントとして存在するはずなのになぜか出ない。

## Physics Fields
パーティクルに対するモノっぽい。
コンポーネントとして存在するがパラメータが全然ない。

## Chaos Field
source:: [UE5 Chaos 初次使用小技巧整理分享 - 知乎](https://zhuanlan.zhihu.com/p/490566279)
source:: [UE5 最速Chaos使い方入門！※サンプルプロジェクト配布あり - Let's Enjoy Unreal Engine](https://unrealengine.hatenablog.com/entry/2021/12/18/000000)

Chaos Systemで破壊されたものに対する。



結局Box CollisionでBeginEndでSetに出し入れして力をかけ続けるのが早い気がする。