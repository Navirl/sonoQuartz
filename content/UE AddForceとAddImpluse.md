---
tags:
 - Info
---

daily:: [2022-11-06](Daily_Note/2022-11-06.md)
up:: [UE](../Bar/App/Unreal_Engine.md)
source:: [第一次 Add Force / Add Impulse 戦争 - UnrealYoshidaのUE4講座](https://ikagamedev.hatenablog.com/entry/2017/02/01/204221)

AddForceは毎フレーム力を与える感じ。つまり1秒で指定量の力が入る？
AddImpluseは実行の瞬間に力を集中させる。

どちらにせよ、標準質量100kgに対しては10万単位で力を与えないと動かないので注意。
質量無視直接加速度のVel Changeにチェックが入っているならその限りでない。