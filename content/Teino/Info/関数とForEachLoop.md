---
date: 2022-07-15
tags:
 - Info
---

up:: [Unreal\_Engine](<../Bar/GUI/Unreal_Engine.md>)
source:: [UE4 配列要素の処理をForEachLoopなしで行う - Let's Enjoy Unreal Engine](https://unrealengine.hatenablog.com/entry/2017/01/14/133301)

Pure関数を引数にしてForEachLoopに突っ込むのはご法度。[Pure Function](<./Pure Function.md>)
一方、すでにある配列は関数の単変数の引数としてそのまま突っ込むと**普通に内部で自動でForEachLoopしてくれる**。小さいが最適化になる。