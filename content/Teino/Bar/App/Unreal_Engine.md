---
date: 2022-07-14
tags:
 - Bar
 - App
aliases: UE
---

up:: [UE5.0.2](<./UE5.0.2.md>)





[[../../Others/CSandSR/CS C++]]

[[../../Others/CSandSR/Hope Unreal Engine]]
[[../../Info/UE Errors]]

[Reroute Node](<../../Info/Reroute Node.md>)


[UE 別のトリガーを検知用に設定する方法](<../../Info/UE 別のトリガーを検知用に設定する方法.md>)

[Actor移動系](<../../Info/Actor移動系.md>)


[UEプロジェクトが開けないとき](<../../Info/UEプロジェクトが開けないとき.md>)

[unityのprefabに当たるもの](<../../Info/unityのprefabに当たるもの.md>)

## 自前で押す処理
なんか物理制御だけじゃうまくいかないなってとき。
単純に移動ベクトル取って触れた物をその方向に移動させてるだけ。

[Smoothly push character with moving object. - UE4 AnswerHub](https://answers.unrealengine.com/questions/572656/smoothly-push-character-with-moving-object.html)



## Cannot override 'messageInterface_C::Recv Message' at  Event Recv Message  which was declared in a parent with a different signature
インターフェースを書き換えつつ、子クラスで新しいインターフェースをイベントとして呼び出した際に発生。Recv Messageがインターフェース名。
親クラスのインターフェース依存イベントを呼び出し直すと直った。たぶん、更新されてなかった。


## レベルを読みたい
OpenLevelかLoadStreamLevel。普段は前者を使う。
後者は次のレベルの先読み用。

[UE4 レベルのロードディング画面 - Suutaの秘密基地](https://suuta-blog.hatenablog.com/entry/2019/12/06/033228)

## 別レベルのアクタ参照
全部読んでタグで絞る。

[\[UE4\] 別レベルに置かれたActorの参照を取得する(TimerやBillboardComponentの使い方もあるよ)｜株式会社ヒストリア](https://historia.co.jp/archives/504/)

[コリジョンの細かな設定](<../../Info/コリジョンの細かな設定.md>)


[基本的プループリント](<../../Info/基本的プループリント.md>)

[UE コンストラクションスクリプト](<../../Info/UE コンストラクションスクリプト.md>)


## 物体を回転させたい
大前提として、UE4上ではVector(姿勢)とRotation(回転)は別物。
なのでRotation独自の規定や関数がたくさんある。

Pitchさえ回さなければ、GetActorRotation、ピン分解して回したい奴に数値を+、Make Rotatorに突っ込む、SetActorRotationに入れるだけでできる。

![SetActorRotation.png (1363×321)](https://historia.co.jp/wp/wp-content/uploads/2015/04/SetActorRotation.png)
![SetActorRotation.png (1363×321)](https://historia.co.jp/wp/wp-content/uploads/2015/04/SetActorRotation.png)
しかしこれだとPitchを回す際、**90度回した瞬間に全く回らなくなる。** おそらくジンバルロック回避。

これを回避するために、数値+にCombineRotatorsを使う。これはRotationを足し合わせる処理。Rotationじゃないといけないので、先にMake Rotatorした後にGetActorRotationと足す。

![Combinerotatorsevent.png (1113×365)](https://historia.co.jp/wp/wp-content/uploads/2015/04/Combinerotatorsevent.png)

[\[UE4\] BlueprintのRotatorノードまとめ｜株式会社ヒストリア](https://historia.co.jp/archives/1820/)


## Bind Eventでカスタムイベントが出てこない
Bind側から引っ張ると出てくるかもしれない。

[UE4 Bind Event to ノードでカスタムイベントをデリゲートで接続することができない時の対応（Bind Event to、Custom Event） 凛(kagring)のUE4/UE5とUnityとQt勉強中のゲーム制作ブログ](http://kagring.blog.fc2.com/blog-entry-449.html)

## UE小技集
ビューポート右クリックからのPlay From Here、
Detailパネルを選択で変更しないロック、
プレイ中の変更を保存するKeep Simulation Changes、
半透明を選択しないAllow Translucent Selection、
デフォルトから変わった数値だけ表示するShow Only Modify Properties、
現在選択中のActorと同じTypeのLevel上のActorを全選択するSelect All Actors With Same Class、
選択したアセット全てのパラメータを一括変更するプロパティマトリックス、
PIE実行時のフォーカスをゲームに持たせるGame Gets Mouse Control、
BeginPlayやTickを生成しないSpawn Default Blueprint Nodesなどなど。

[若手レベルデザイナーのよく使うUE4小技集 - Qiita](https://qiita.com/YuyaShiotani/items/9225e27230f6148ff24d#eject)

## レベルブループリントの変数をクラスブループリントから読みたい
レベル依存はあまりよろしくないが、方法はある。

[レベルブループリントの変数を参照＆更新したい - UE4 AnswerHub](https://answers.unrealengine.com/questions/843550/index.html)

[Asset Manager](<../../Info/Asset Manager.md>)

## object has wrapping uvs
ライティングビルドで発生するエラー。メッシュエディタでUVを確認する。
ライティング用のUVがはみ出てたりするのが問題なので、可能なら3D編集ソフトから書きだす時点で修正する。

めんどいならLightMap Coodinate Indexをいじればいけたりする。

![N2qjpx.png (1919×1010)](https://i.hizliresim.com/N2qjpx.png)

[オブジェクトにはラッピングuvssorunuがあります](http://www.unrealengineturkiye.com/object-has-wrapping-uvs-sorunu-konusu.html)

## Spawn Actor from Class
UnityでいうInstantiate。
クラスからアクタを生成できる。

[UE4 アクター(Actor)をブループリントから生成する（Spawn Actor from Class） 凛(kagring)のUE5/UE4とゲーム制作と雑記ブログ](http://kagring.blog.fc2.com/blog-entry-217.html)

[ピボット位置変更](<../../Info/ピボット位置変更.md>)

## Debug Line
デバッグ用にワイヤーフレームなどを表示できる。
Draw Debug～のノードを繋ぐだけ。

[UE4 BPで3D空間上に図形をデバッグ表示する（Draw Debug Arrow、Draw Debug Box、Draw Debug Capsule、Draw Debug Circle、Draw Debug Cone、Draw Debug Cylinder、Draw Debug Line、Draw Debug Sphere） 凛(kagring)のUE5/UE4とゲーム制作と雑記ブログ](http://kagring.blog.fc2.com/blog-entry-571.html)

## static mesh editor の Navigation
たぶんナビゲーションメッシュ用の設定。
複数の当たり判定を持たせたいならメッシュを分けろ。

[[Unreal Engine]UE4便利機能で開発を簡単にする「Navigation Mesh」編 | ORENDA](https://orenda.co.jp/blog/1824/)

## Sweep, Teleport, CCD
### Sweep
移動中に壁にぶつかった時、移動を取りやめたいならSweep。この時**Collisionは発生しない**。

### Teleport
UE4では行きたい場所を設定すると暗黙の速度でそこへ向かう。
その慣性を切って移動したいときに使うのがTeleport。
ついでに壁を抜ける。移動は瞬時ではないっぽい？

### CCD
壁を抜けたくないときに使うのがCCD。常時当たり判定。

[物理オブジェクトの移動](https://www.unrealengine.com/ja/blog/moving-physical-objects)

## AttachTo: '/Game/Test2/Level/UEDPIE_0_Test3.Test3:PersistentLevel.ConeRed_Blueprint.ConeRed_28' is not static  (in blueprint "ConeRed_Blueprint"), cannot attach '/Game/Test2/Level/UEDPIE_0_Test3.Test3:PersistentLevel.ConeRed_28_GEN_VARIABLE_StaticMeshActor_CAT_29.StaticMeshComponent0' which is static to it. Aborting.
よくわからないが、Basic内にあるStatic Meshは動かせない。
また、MovableにするとStatic Meshは消えてしまう。

Movableにした後、その子供に改めてStatic Meshを割り当てると問題なく動く。まあ、最終的に取り換えるし今はこれで。

## タイマー処理
まんまSet Timerという関数があるので使う。
関数名バージョンとイベントバージョンがある。
[【UE4】一定時間毎に関数やカスタムイベントを呼び出すSet Timeノードの名称変更について - SAT04 CREATIVE SPACE](https://satcreative.hatenablog.com/entry/2016/12/04/225755)

## Playerに憑依したい
Possess関数。

[ポーンを所有する | Unreal Engine ドキュメント](https://docs.unrealengine.com/4.27/ja/InteractiveExperiences/HowTo/PossessPawns/)

## Projectile
spawnした際、初速をもって飛ばせるクラス。
クラス内に初速や弾力の設定がある。

[UE4 Projectileコンポーネントで弾を作る - Let's Enjoy Unreal Engine](https://unrealengine.hatenablog.com/entry/2014/11/18/222516)

## Montage Play

## UとF
[なぜなにFProperty - 対応方法と改善点 -](https://www.slideshare.net/EpicGamesJapan/ue4-f-property)
UはUObjectの系譜。

始めに、クラスの構成要素、変数を定義しているプロパティというものがあった。
プロパティはリフレクションによって定義された。リフレクションとは、本来機械語翻訳で捨てられるはずの関数・変数名を使い、処理を挟むための処理である。
このためにプロパティは余分なメモリスペースや破壊コストがかかり、UEのパフォーマンスを落としていた。

そこで生み出されたのがFPropertyである。
プロパティが減るのに加え、C++標準の生成と破壊が容易になった。

[マクロか関数か](<../../Info/マクロか関数か.md>)