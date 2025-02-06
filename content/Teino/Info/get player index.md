---
tags:
 - Info
---

daily:: [2022-10-14](Daily_Note/2022-10-14.md)
up:: [UE5.0.2](../Bar/App/UE5.0.2.md)
source:: [Get correct Player Controller ID for Multiplayer? : unrealengine](https://www.reddit.com/r/unrealengine/comments/6zken1/get_correct_player_controller_id_for_multiplayer/)
source:: [How to get player index? - Programming & Scripting / Multiplayer & Networking - Unreal Engine Forums](https://forums.unrealengine.com/t/how-to-get-player-index/380404)

全てのインスタンス上において、基本的にPlayer Indexは**0しかない**。
なぜならPlayerは複製され、それぞれのインスタンスに一つずつしかないから。Player Indexで指定するのはインスタンス上のPlayerであり、サーバー・クライアント全体のPlayerではない。

なのでこのIndexを変更するのは同じ画面を二人で操作するときくらい。