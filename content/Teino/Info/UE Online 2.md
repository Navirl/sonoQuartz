---
date: 2022-07-09
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/App/UE5.0.2.md>)
source:: [Unreal Engine での RPC について | Unreal Engine 5.0 ドキュメント](https://docs.unrealengine.com/5.0/ja/rpcs-in-unreal-engine/)

何か分かんなくなってきた。
ソースの文言はたぶんこう対応してる。

| C++            | Blueprint            |
| -------------- | -------------------- |
| Not replicated | Not Replicated       |
| NetMulticast   | Multicast            |
| Server         | Run On Server        |
| Client         | Run On Owning Client |

そのうえで、最初からあるアクタは大体サーバー所有、プレイヤー自体はプレイヤー所有、所有権は普通スポーンさせたやつが持っているということを抑えれば読める。

それとは別に、Replicateは基本Server→Clientであり、Clientからサーバーに干渉するならPlayerControllerなどを通すしかないことに留意。

source:: [UE4 ネットワークマルチプレイヤーゲームを作る時の役割について - Let's Enjoy Unreal Engine](https://unrealengine.hatenablog.com/entry/2021/02/23/232048)
source:: [【UE4/UE5ゲーム制作講座】GameInstanceとかGameModeとかGameStateとかPlayerStateとか良く分かんないという人のための動画 - YouTube](https://www.youtube.com/watch?v=15jTIs35YDk)
source:: [【UE4】GameMode、GameState、PlayerState、PlayerControllerの関連を確認してみる - main() blog](https://www.main-function.com/entry/2017/11/22/220527)

GameModeはサーバーにしかない。
サーバーしか知る必要のない情報を管理。クライアント情報とか。

GameStateはサーバーからクライアントに同期されている。
ゲーム進行管理、全体スコア管理など、サバクラどっちからも頻繁に読み取り変更される値を入れる。
Beginはプレイヤースポーンより早いので注意。

GameInstance。ゲームを点けてからずっと全てのサーバーとクライアントに個別に存在する。
それぞれで絶対に値を共有しない。アカウント情報やエラーを入れるのにちょうどいい。

PlayerControllerはクライアントの固有情報。サーバーには全部のコントローラーが存在するが、クライアントには自分のコントローラーしか表示されない。
サーバーとやり取りするときは大体ここを通す。

PlayerStateはクライアント状態管理。
PlayerControllerとは違いサーバーにも、他のクライアントにも存在するので簡単に他と共有できる。

UMGは各クライアントのみにある情報。
サーバーから直接は触れないので、内部値だけPlayerControllerやPlayerStateに入れて読み出したり、作成時はPlayerControllerからRun on Owning Clientしたりと結構ややこしい奴。



source:: [Game Mode と Game State | Unreal Engine ドキュメント](https://docs.unrealengine.com/4.27/ja/InteractiveExperiences/Framework/GameMode/)

BaseではないGameMode、GameStateには対戦に特化したシステムがいくつかある。
MatchStateはその一つで、GameMode.cppで定義されているマッチそのもののステートが入る型。GameStateに変数として付属している。
それぞれのステートに変わるタイミングはデフォルトで決まっている。変更タイミングはGameModeのOnSetMatchState関数をオーバーライドすることで拾える。

もちろん新たなStateを追加することもできるらしいが、おそらく直接Cppを書いたり書き換えたりする必要がある。


source:: [UE4 Game ModeとGame Mode Baseの違いについて - Let's Enjoy Unreal Engine](https://unrealengine.hatenablog.com/entry/2017/01/30/220000)

GameMode,GameStateがBaseになったのは軽量化のため。
特に問題なければBaseのほうがいい。
ただUEはデフォルトでBaseを使っているので、後から入った人間は何が問題なのかもわからずBaseを使い続けるだろこれ。

元の奴は対戦ゲームを想定しており、大勢が同じ場所で戦ったり観戦したりする、FPSでいう「マッチ」の概念があるっぽい。
作るゲームにマッチがあるならBaseなしを使うといいかも。

GameModeだとRestart Gameが使える。
	なお、Restart PlayerならBaseでも使える
GameStateだとElapsedTimeが使える。
MatchStateも使える。

source:: [GameModeとGameStateの、Baseとの違い - 妹でもわかるUnrealEngine4](https://imoue.hatenablog.com/entry/2016/11/18/235302)
source:: [AGameMode | Unreal Engine Documentation](https://docs.unrealengine.com/5.1/en-US/API/Runtime/Engine/GameFramework/AGameMode/)
source:: [AGameModeBase | Unreal Engine Documentation](https://docs.unrealengine.com/5.1/en-US/API/Runtime/Engine/GameFramework/AGameModeBase/)
source:: [AGameState | Unreal Engine Documentation](https://docs.unrealengine.com/5.1/en-US/API/Runtime/Engine/GameFramework/AGameState/)
source:: [AGameStateBase | Unreal Engine Documentation](https://docs.unrealengine.com/5.1/en-US/API/Runtime/Engine/GameFramework/AGameStateBase/)

BaseとBaseじゃない奴はセット運用が前提。
ModeはStateと、ModeBaseはStateBaseと組ませないとうまく動かない。


