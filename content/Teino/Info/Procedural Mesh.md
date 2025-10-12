---
date: 2022-07-17
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/GUI/UE5.0.2.md>)
source:: [ProceduralMeshComponentを使ってみる - もんしょの巣穴ブログ Ver2.0](https://monsho.hatenablog.com/entry/2015/06/20/010747)

動的にメッシュ・ポリゴンが作れるコンポーネント。
ブループリントにこのコンポーネントをアタッチし、そこに入れる形でメッシュ生成する。

source:: [Create Mesh Section | Unreal Engine Documentation](https://docs.unrealengine.com/5.0/en-US/BlueprintAPI/Components/ProceduralMesh/CreateMeshSection/)
生成はこれ。
source:: [Get Section from Procedural Mesh | Unreal Engine Documentation](https://docs.unrealengine.com/5.0/en-US/BlueprintAPI/Components/ProceduralMesh/GetSectionfromProceduralMesh/)
逆分解も可能。

source:: [なぜ座標には右手系と左手系があるのか｜Ninagawa123｜note](https://note.com/ninagawa123/n/ne24fcf08c36f)
source:: [【UE4】角度追尾をしよう！【C++】 - Qiita](https://qiita.com/mt_khmer/items/2b617ed8ca24ad05a84d)
ちなみに、これの裏表は**右手系**だが、UEは**左手系**なので注意。
外積で表裏修正するときは左手系を意識する。

source:: [UE4: ProceduralMeshComponent 入門 - C++ ときどき ごはん、わりとてぃーぶれいく☆](https://usagi.hatenablog.jp/entry/2017/05/27/000800)
C++でやる場合はこちら。
始めのBuild.csへの追加を忘れず。
表裏修正だけなら数字弄る関数置くだけでこれはいらないのでは？