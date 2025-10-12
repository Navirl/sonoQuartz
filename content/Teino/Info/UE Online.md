---
date: 2022-07-09
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/GUI/UE5.0.2.md>)
source:: [UE4でマルチプレイヤーゲームを作ろう](https://www.slideshare.net/EpicGamesJapan/ue4howtocreatemultiplayergame)
source:: [ゆるゆるUE4ネットワーク入門](https://www.slideshare.net/ssuser221848/ue4-107622315)
source:: [UE4のネットワークハンズオン (Replicate、RPC) - Qiita](https://qiita.com/Shibash/items/2408b653abe0549abe37)
source:: [UE4 マルチプレイでの所有権とRPC｜株式会社ヒストリア](https://historia.co.jp/archives/12823/)

- Replicationフラグがあればサーバーtoクライアント同期される
	- CharacterとPawnはデフォでついてるかも
	- というか、何度か触ったところ**プレイヤーの操作はCharacterじゃないと同期されない**
		- どこかで見たけど、操作法に依ってReplicationされるかどうか決まってる？
		- とりあえずCharacterの移動は確定で同期される
- Playで人数、あとListen Server(サーバー兼任)かDediacated Server(専任)かを決めてPlayで動く
- 動きを複製するにはReplicate Movementフラグ

- カスタムイベントにはレプリケート機能がある
	- サーバーにやったことを送信するなら、**カスタムイベントしかない**
		- つまり非同期のみ
	- MultiCastならサーバークライアント両方で発生
	- Run On Serverならサーバーのみで発生
		- クライアント側でそのイベントを起こしても、結果はサーバーにしかない
		- この時、起きた結果にReplicationフラグがついていれば、それはサーバーからクライアントに同期され現れる。
	- Run On Owning Clientならクライアントのみで発生

- Switch Has Authority
	- 権限によって分けるSwitch文、Authorityなら大体サーバ側
	- これでサーバ側でRun On Owning Clientのイベントを発生させ、変更した変数を変数自体の設定Replicatedでクライアント側に同期させてるのが例

- Listen Server
	- [UE4 - Multiplayer Listen Server - 4.26 - YouTube](https://www.youtube.com/watch?v=wvbFdSIPCHA)
	- 大体これで何とかなる
	- 細かな数値とかも変わってるので、見落とさないこと
	- だからってサーバーの最大人数見落とすことある？
- 流れ
	- Create Sessionでサーバーを開き、?listenでレベルを開いて準備
	- そこにFind Session→Join Sessionで入る
	- Ipのほうはアドレスを直接コマンドで開いて入る
	- Session系のコマンドは最大数がデフォルト0で使えないので変更必須

- キャラクター自体が増えている以上、変数でReplicateされるのは増えたほうのキャラクターの変数。
	- CharaというPlayer Pawnが存在するとする。CharaはReplicateⅾ設定の変数αを持つ。
	- CharaはClient1、Client2がそれぞれインスタンス化してプレイヤーキャラクターとしている。Client1のCharaをCharaA、Client2のCharaをCharaBとする。
	- ServerにあるCharaAをCharaA_1とする。同様にClient1ではCharaA_2、Client2ではCharaA_3とする。
	- ここでCharaAに変数αを変更するイベントをServerでのみ実行させる。つまりCharaA_1で実行。するとCharaA_1の持つ変数αからデータがReplicationされ、CharaA_2、CharaA_3に流れていく。
	- この一連の流れをClient2から見る。Client2におけるCharaA、つまりCharaA_3の変数αがServerからのReplicationで変更される。
		- が、**Client2のプレイヤーキャラクターはCharaB**。Charaからインスタンス化しているので同じく変数αを持つが、今Replicationされているのは**CharaAの変数α**でありCharaBの変数αは変更されない。
		- Charaからのインスタンス化による複製と、サーバーおよびクライアントによる複製をごっちゃにしていた。全然違う。
	- 結局そこを同期する場合は、Originに持たせた方が手っ取り早そう。
- 変数をReplicationする場合は、ServerからClientへの一方通行。
- マルチキャストイベントは、サーバーが実行したときだけクライアント全員に実行させる。
	- クライアントが実行すると普通にクライアント内で完結する。

[UE Online 2](<./UE Online 2.md>)