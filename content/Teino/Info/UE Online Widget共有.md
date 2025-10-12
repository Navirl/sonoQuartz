---
date: 2022-10-09
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/GUI/UE5.0.2.md>)
source:: [Ue4 accessed none trying to read property callfunc create return value widget - Unreal Engine / Programming & Scripting - Unreal Engine Forums](https://forums.unrealengine.com/t/ue4-accessed-none-trying-to-read-property-callfunc-create-return-value-widget/460649)
source:: [Multiplayer Widgets On One Or All Screens | Replication - Unreal Engine Tutorial - YouTube](https://www.youtube.com/watch?v=2GYicrkCElA)
source:: [Is Server | Unreal Engine Documentation](https://docs.unrealengine.com/4.26/en-US/BlueprintAPI/Networking_1/IsServer/)

**専用サーバーはWidgetを持てない**ので一工夫必要。
クライアントだけWidgetを持ち、情報の受け渡しはサーバーに任せる。

まず普通にRun On Serverでイベント実行。そのイベントを**すぐさまMulticastイベントの実行に繋ぐ**。Multicastはサーバーから実行したときのみ、サーバーと全てのクライアントにイベント実行を要請するRep Type。

そこからIs Serverを使い、サーバーからの実行だけ弾けば、クライアントでのみ実行が可能になる。これですべてのクライアントに同じWidgetを配置。

情報はイベントをバインド、そのイベントを今度はRun On Serverイベントに接続。これでサーバー上で変数を変更する。
