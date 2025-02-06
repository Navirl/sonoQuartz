---
tags:
 - Bar
 - App
---

daily:: [2021-08-03](/Daily_Note/2021-08-03.md)
up:: [Programming](<../Program/Programming.md>)

[猫本](../猫本.md)
[MUN](../MUN.md)
[Exploring HTN Planners through Example](../Others/Exploring%20HTN%20Planners%20through%20Example.md)

[CyberAgent](../Others/CyberAgent.md)

## 公式リファレンスは目を通そう
その機能、公式にあります。ということが多発する。
Unityに限らず、何でもそうだけど。

## 複数人開発
頼む仕事に関する**関数とその仕様はしっかり伝える。**


## using UnityEngine.SceneManagement
シーン遷移を扱うなら必要な名前空間。

## GetComponent<>()
オブジェクトのコンポーネントを取得するメソッド。
collisionやGameObjectのメソッドとして呼べる。
たまに単体で書かれているのは、頭のthis.が省略されているから。
<>には欲しいコンポーネントの名前を指定する。\<Renderer\>など。Obsidianだと書けないからエスケープ入れてる。

[初心者向け UnityのGetComponentってなんやねん？ - Qiita](https://qiita.com/kurisaka_konabe/items/9d0250de8610666b9013)
[【Unity連載】GetComponentを具体例付きで解説](https://tech.pjin.jp/blog/2020/12/21/unity_csharp_getcomponent/)

ちなみに、これで取得する自分自身のクラスのコンポーネントとthisは同一。
まあクラスだし。

### GetComponentInChildren<>()
オブジェクト以下のコンポーネントを取得するメソッド。
そのままだと一個しか返してくれないので、配列で返してほしいときはCompornent**s**とする。

[スクリプトからコンポーネントを取得する方法 \| Uinty使い方ガイド](https://unity-guide.moon-bear.com/get-component/#toc3)


## フラグ管理とビット演算

[引き算を足し算にするやつ](../引き算を足し算にするやつ.md)
上記の内容をフラグ管理に発展させたもの。
1ビットずつのONOFFをフラグのONOFFとすることで、4桁の01の組み合わせ、すなわち4ビットでも2^4=16種類を表せる。

ただ、可読性は下がる。
早いには早いが、bool構造体を使ったほうが分かりやすい。

[複数のフラグを1つの変数のみで管理する - N煎ログブログ](https://isemito.hatenablog.com/entry/2017/06/20/173104)
[ビット演算 (bit 演算) の使い方を総特集！ 〜 マスクビットから bit DP まで 〜 - Qiita](https://qiita.com/drken/items/7c6ff2aa4d8fce1c9361)



## transform.position
各成分は直接書き換えることができない。
必ず、new Vector3(0,0,0)などVector3の塊で書き換える。

## 2D描画順
1. Sorting Layer
2. Order in Layer(小さい奴が画面奥、優先度)
3. カメラに近い順

の順で判定している。より詳しく設定したいときはTransparency Sort Modeをいじればいい。
[【Unity】スプライトの描画順を「下にある物を手前」にする - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2017/04/14/024945)

## transform.childCount
そのオブジェクト以下に入ってる子オブジェクトの数が入ってる。
子のオブジェクトを番号で取得できるtransform.GetChild()とfor文と組み合わせれば、子のオブジェクトをすべて取得できる。


## gameObject.SetActive()
boolを入れることでオブジェクトのアクティベートができるメソッド。
当然、これでアクティブにしても**親がアクティブでないなら見えない。**
[【Unity基礎】SetActiveを使ってゲームオブジェクトを表示・非表示にする方法 \| FREE SWORDER](https://freesworder.net/unity-setactive-true-false/)

## GameObject.activeInHierarchy
オブジェクトがアクティブかどうかをboolで返してくれる変数。
親が非アクティブ、自分がアクティブだと**Falseになる。**
[【Unity】GameObjectのactive状態を取得するときの注意点](https://tech.pjin.jp/blog/2017/06/19/unity_gameobject_active/)


## PrefabとInstance
[Object-Instantiate - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/Object.Instantiate.html)

Tagは引き継がず、nameは後ろに(Clone)がつく。
その辺はインスタンスといってもゲームオブジェクトなので、.tagや.nameをいじれば変えられる。

[異なるタグでプレハブをインスタンス化する-UnityAnswers](https://answers.unity.com/questions/686899/instantiate-prefab-with-different-tag.html)
[インスタンス化されたプレハブに複数の（クローン）が表示されるのはなぜですか？ -Unityフォーラム](https://forum.unity.com/threads/why-is-multiple-clone-appearing-in-my-instantiated-prefabs.426302/)
[ランタイムのプレハブのインスタンス化 - Unity マニュアル](https://docs.unity3d.com/ja/2018.4/Manual/InstantiatingPrefabs.html)


### 複数一気のプレハブ化
[UnityEditor上で複数のゲームオブジェクトをプレハブ化する方法 \| ⬢ Appirits spirits](https://spirits.appirits.com/doruby/9945/)
[【Unity】【エディタ拡張】複数のオブジェクトをまとめてPrefab化する - Qiita](https://qiita.com/twt_paul/items/7394b82e475366f89224)
ただし、何故かどちらも動作しないので、やりたいなら自分でいじること。

### インスタンスに加えた変更をPrefabに適用

右上のOverrideを使うか、Prefabの3ドットメニューからModeified Componetを使うか。

[Unityの短いヒント：シーンで行われた変更をプレハブに適用します-DotNetByExample-次世代](https://localjoost.github.io/Short-Unity-tip-apply-changes-made-in-the-scene-to-a-prefab/)

### Prefab Variant
オブジェクトの一部をPrefab設計図にする機能。
ステージによって基礎は同じにしたいが、中身は変えたいなってときに。

[プレハブバリアント - Unity マニュアル](https://docs.unity3d.com/ja/2018.4/Manual/PrefabVariants.html)

意外にもこれが導入されたのは2018.3から。

[Unity 新しいPrefab システム - kurihara-nの日記](https://kurihara-n.hatenablog.com/entry/2018/06/25/050035#Nested-%E3%81%A7%E3%81%AF%E7%84%A1%E3%81%84%E3%81%A8%E3%81%AF)

ちなみに、Transformは消せないのでVariantにできない。
Rect Transformも入れ替わるだけ。

## スクリプト実行順序
地味にめちゃくちゃ大事な奴。
[【Unity】狙った順に処理したい時はスクリプトの実行順を指定する │ エクスプラボ](https://ekulabo.com/execution-order)

## 子オブジェクト全取得
[Unityで子オブジェクトを全取得する方法 \| よしゆきゲーム制作スタジオ](https://sole-game-creater.com/unity-get-all-children/)
[【Unity】子オブジェクトを取得する４つの方法](https://zenn.dev/daichi_gamedev/articles/b901ca3a1b4391)
[【Unity】子要素のオブジェクトを取得する方法まとめ \| あっぷあっぷ開発基地](https://game-tukurouyo.com/unity-get-child/)

## 非アクティブオブジェクト取得
[C# - Unityで非アクティブのオブジェクトを取得する方法｜teratail](https://teratail.com/questions/183022)

## 乱数

何か理由があってusing System;としていると、C#標準のRandomと区別がつかずにコンパイルエラーになる。
その時は頭にどちらのRandomか明記すること。

[【Unity連載】ランダムな要素の作成には乱数を使おう \| TECH Projin](https://tech.pjin.jp/blog/2021/03/31/unity_howto_random/)

## Render Texture
[レンダーテクスチャ - Unity マニュアル](https://docs.unity3d.com/ja/2018.4/Manual/class-RenderTexture.html)

ゲーム内でカメラに映る光景を、動く写真としてゲーム内に再出力するような機能。
レーダーなんかに使うものだが、スクショにも使える。

[レンダーテクスチャを使ってカメラに映る映像をリアルタイムに描写する \| Unityを使った３Dゲームの作り方（かめくめ）](https://gametukurikata.com/camera/rendertexture)
[UnityでRenderTextureをファイルに保存 \| STYLY 開発者ブログ -STYLY Developer's Blog-](https://psychic-vr-lab.com/blog/unity/unity%E3%81%A7rendertexture%E3%82%92%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E4%BF%9D%E5%AD%98/)

ちなみにスクショだけならTexture2Dに映してbyte化し、File.WriteAllByte(filename, byte);で書き込むだけでいい。

[\[Unity\] 画面をキャプチャーしてPNGファイルへ出力する \[Not RenderTexture\] \| きききろく](http://kikikiroku.session.jp/unity-capture-display-output-png/)
[【Unity】スクリーンショットを保存する \| ねこじゃらシティ](https://nekojara.city/unity-screenshot)

## スプライトごみ問題
### 原因
複数のスプライトを一枚の絵にして描画を高速化する機能、スプライトアトラスにて、**隣の絵のピクセルを巻き込んで表示**してしまうことで起きる。
### 解決
余白を開ければいい。
それができないなら、いろんな方法を**纏めて**試さないといけない。
[【Unity】スプライト端の謎の線/ゴミ/ちらつきの修正方法 - エフアンダーバー](https://www.f-sp.com/entry/2016/11/24/152957#f-337b35f3)

ならpaddingを追加するだけで直りそうなもんだが、**PSDImporterにその機能はない。** 少なくとも2021年5月時点では。
[PSDインポーター？ \| ページ3-Unityフォーラム](https://forum.unity.com/threads/psd-importer.591532/page-3#post-7124774)

[Spriteをパックする新しい仕組み、SpriteAtlasを使ってみた【Unity】【SpriteAtlas】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/SpriteAtlas)

## 音
AudioSourceから鳴らしていく。

.Play、.Pause、.UnPauseを覚えればしばらく安泰。
[【Unity初心者】サウンドの基本を理解して再生や停止をしてみよう](https://yttm-work.jp/unity_beginner/unity_beginner_0011.html)

現在の再生時間は.timeから見える。
[サウンドを途中から再生する - Unity / VRゲーム開発日記＠長崎](https://icoc-dev.hatenablog.com/entry/2014/10/16/120842)


## 設計問題
**フレームワークと結婚するな**
設計が前に出てきて、その上にフレームワークが乗っかる感じ
端的に言うなら、**常にMonoBehaviorを継承する必要はない。**

[万能なアーキテクチャは存在しない　Unityのプロジェクトにあわせたアーキテクチャの“育て方” - ログミーTech](https://logmi.jp/tech/articles/324456)

## Fileの読み書き
C#機能。


## 非同期処理

[【Unity】一定時間後にスクリプトの処理を呼び出す方法まとめ - Qiita](https://qiita.com/toRisouP/items/e6d4f114d434ee588044)

デリゲートはいい。
が、Taskの機能を損なわない程度に。

### Coroutine
非同期的処理を行えるシステム。
この処理を待っている間に他のことをやっておきたい、というときに使える。
普通に時間を待つときにも使える。

**戻り値が返せない。** 欲しいならasyncで。
デリゲートを駆使すれば返せなくもないらしいが、async使え。

[【Unity】コルーチンってなんなのなの? って時に読む記事【解説】 │ エクスプラボ](https://ekulabo.com/whats-coroutine)
[【Unity】IEnumeratorを使って非同期処理を行う \| あのゲームの作り方＠わたぶろぐ](https://watablog.tech/2020/08/27/post-1872/)
[【Unity】コルーチンで処理を中断・再開・停止させる方法を学ぶ – XR-Hub](https://xr-hub.com/archives/20368)

ただ高速化したい、仕事のないコアに仕事割り振って並列的に処理したい、というときはC# Job Systemを使うといい。

止めたいときはStopAllCouroutineというものもある。
全て止める。

[Unity-スクリプトAPI：MonoBehaviour.StopAllCoroutines](https://docs.unity3d.com/ScriptReference/MonoBehaviour.StopAllCoroutines.html)

**コンポーネントとしてくっついてないと起動しない？**
おそらく、コンポーネントにしないとUpdateされないから。

[C# - UnityでStartCoroutineでNullReferenceExceptionをなんとかしたい｜teratail](https://teratail.com/questions/244897)
[c# - starting Coroutine gives null reference exception in unity - Stack Overflow](https://stackoverflow.com/questions/55141022/starting-coroutine-gives-null-reference-exception-in-unity)  
[unity - NullReferenceException in StartCoroutine method - Game Development Stack Exchange](https://gamedev.stackexchange.com/questions/133512/nullreferenceexception-in-startcoroutine-method)

一度に一つしかつかない可能性があったが、何かの間違いだと思う。

[【Unity】ScreenSpace OverlayなCanvas上に3Dモデルを表示する - げぇむぷろぐらみんぐ](https://siguma-sig.hatenablog.com/entry/2018/09/08/232654)

### Invoke
手軽なコルーチン。
第一引数に実行するメソッド名、第二引数に実行するまでの時間を渡せる。ほかにも断続的実行なんかのおまけもある。

[MonoBehaviour-Invoke - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/MonoBehaviour.Invoke.html)
[UnityのInvokeを使って一定時間後に処理をする \| Unityを使った３Dゲームの作り方（かめくめ）](https://gametukurikata.com/basic/invoke)

ただ**メソッドをStringでしか渡せない**のがネック。nameof(メソッド)とすれば一応メソッド名を使える。
これ実際使うのはaction?.Invoke()の時くらいじゃないか。  拡張メソッドを使えば使えるけど、そこまでするならCoroutineでいいし。

### async・await
UnityじゃなくC#。**非同期処理を待つための機能。**
上記二つはMonoBehaviourのメンバなので継承しないと使えないが、これは普通に使える。
ただしキャンセル周りがめんどくさいらしいのでUniTask・UniRx推奨。


awaitをつけると処理を待ってしまうので、非同期処理をするならawaitをつけずに実行する。Riderがこれに待ったをかけてくるのは、本来このasync・awaitが**マルチスレッド実行**のためのものであって非同期処理用じゃないから。

結局これが一番わかりやすい。
[C# での非同期プログラミング \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/csharp/programming-guide/concepts/async/)

[Deep Dive async/await in Unity with UniTask(UniRx.Async) \| Unity Learning Materials](https://learning.unity3d.jp/1493/)

C#の話。

[C# 今更ですが、await / async - Qiita](https://qiita.com/rawr/items/5d49960a4e4d3823722f)
[さては非同期だなオメー！async/await完全に理解しよう \| Unity Learning Materials](https://learning.unity3d.jp/275/)

#### async
このメソッド内にはawaitがあるよ、と通知する表記。

#### await
これが完了するまで待つよ、という表記。
これをそのまま実行すると、メインスレッドの動きを止めてしまう。そこで、一度処理を**Task型**に入れることで処理を進めててもらう。


### UniTask
UniTaskはUniRxから必要なものを抜き出したライブラリであり、現在はこちらの仕様が推奨されてるっぽい。UniRxも場合によっては使う。

また、UniTaskを使うとUniTaskTrackerというウィンドウがついてくる。
非同期処理の中身を見たい場合はお役立ち。

https://github.com/Cysharp/UniTask

[初心者向けコルーチンの代わり？UniTask(UniRx.async)を使い方 - Qiita](https://qiita.com/Yuzu_Unity/items/ca423be9c201ef9aa97e)  
[UniTask機能紹介 - Qiita](https://qiita.com/toRisouP/items/4445b6b9bf00e49eb147)
[【Unity】MonoBehaviourを継承していないクラスでコルーチンを使う（コールバックも） - はなちるのマイノート](https://www.hanachiru-blog.com/entry/2019/04/29/154957)
[UniTask入門 \| Unity Learning Materials](https://learning.unity3d.jp/2974/)
[UniTaskでレッツ非同期！](http://softmedia.sakura.ne.jp/advent-calendar/2019/12-1.html)

どちらを使うべきか。
[UniRx&UniTask とは何なのか - Qiita](https://qiita.com/toRisouP/items/3ced60a755ab297eb463#unirx%E3%81%A8unitask%E3%81%9D%E3%82%8C%E3%81%9E%E3%82%8C%E3%81%AE%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91)

#### キャンセル
**必須。ないとメモリリークしたりする。**
OperationCanceledExceptionという例外を投げて止めるという、結構乱暴な方法を取っている。
仕様上、これはtry-catchで拾えるのでキャンセル時に実行したい処理がある場合は拾う。

[【Unity】UniTask Coroutineとの違いとキャンセル処理の挙動 - Qiita](https://qiita.com/IShix/items/dcf86cb5ca1b587a88ad)
[【UniRx.Async】UniTaskのキャンセル覚書【Unity】 - Qiita](https://qiita.com/su10/items/ccb12742ad0be790b323)
[【超基礎】async/awaitを使う上でUniTaskのキャンセルは例外処理である件 - 渋谷ほととぎす通信](https://shibuya24.info/entry/async_await_cancel)

##### .SuppressCancellationThrow
例外処理は重い。そこで、キャンセルメソッドにこのメソッドをつけることで例外処理をスキップできる。
また、戻り値としてboolを返してくれる。

[【Unity】UniTaskのキャンセル処理まとめ・Taskとの比較 - LIGHT11](https://light11.hatenadiary.com/entry/2021/04/27/200610)
[【UniTask】SuppressCancellationThrowを使ってキャンセルを戻り値として取り出す - はなちるのマイノート](https://www.hanachiru-blog.com/entry/2021/07/01/222545)


#### なんか値が反映されない
処理スピードを上げるために別変数にシングルトンの値を入れているとき、Actionで別変数を渡したりすると、それをいくら変更しても**反映する処理が別の場所にあるせいで反映されない**ということがある。

#### waitの種類
いくつかある。普通はDelayFrameとかで事足りる。
[UniTask機能紹介 - Qiita](https://qiita.com/toRisouP/items/4445b6b9bf00e49eb147#%E6%8C%87%E5%AE%9A%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E6%95%B0%E5%BE%85%E3%81%A4)

##### スキップしたい
WaitUntilと合わせてWhenAnyで結合。
[UniTask.Delay にスキップ機能を追加する - GIGA CREATION Blog](https://blog.gigacreation.jp/entry/2019/11/08/141305)
## フレームを固定したい
QualityのVsyncを切り、Application.targetFrameRateを調整すればいい。
Application.targetFrameRate

## Debug.DrawRay
デバッグ用に可視化したレイが飛ばせるメソッド。
長さのほか、色や表示時間が変えられる。

[Debug-DrawRay - Unity スクリプトリファレンス](https://docs.unity3d.com/jp/current/ScriptReference/Debug.DrawRay.html)

## Physics.Raycast
レイを飛ばし、コライダーにヒットした点をRaycastHitに格納するメソッド。2Dで使うならそれぞれ2Dの表記が必要。
最大距離はともかく、ちょっと厄介なlayerMask指定がある。
これは単なるint数値指定ではなく、**どのビットがONなのかを見る**引数。だから狙ったレイヤーをONにするならビットシフトが必要になる。

[Physics-Raycast - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/Physics.Raycast.html)



## Mathf
sinやcosの計算ができる関数群……だけではなく、**線形補完**やある間の数値をStepで進んでいく**MoveTowards()**、数値の間を行ったり来たりする**PingPong()** などいろいろ揃っている。
特にApproximatelyはよく使う

[【Unity】便利な数学関数の Mathf クラスまとめ \| 夜中にUnity](https://www.midnightunity.net/unity-mathf/)
[数学系の処理を扱うMathfの全変数と全関数【Unity】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/Mathf#%E5%A4%89%E5%8C%96%E9%87%8F%E3%82%92%E6%8C%87%E5%AE%9A%E3%81%97%E3%81%A6%E5%A2%97%E6%B8%9B-MoveTowards-MoveTowardsAngle)
[全Unity使いはMathfのリファレンスを読め - Qiita](https://qiita.com/Hirai0827/items/c8bc643c0bcfe5ca9c17)



## Physics2D.OverlapCircle
接触判定をupdateで、かつ(自分の)colliderなしでできるメソッド。戻り値は一つのcolliderや、全てのcolliderのリストの数などが返せる。  GetContactsと同じく、引数にリストを設定すればそこに接触colliderリストを代入してくれるので、戻り値を常にもらう必要はない。
もしcolliderがついていた場合、**自分自身のcolliderも検知する。**

[Physics2D-OverlapCircle - Unity スクリプトリファレンス](http://docs.unity3d.com/ja/current/ScriptReference/Physics2D.OverlapCircle.html)
[Unity - 衝突判定の複数感知｜teratail](https://teratail.com/questions/40730)
[Unity 指定した座標がコライダー内部にあるか判定する - おねむゲーマーの備忘録](https://sleepygamersmemo.blogspot.com/2018/05/unity-point-inside-collider.html)

## ContactFilter

結果をフィルタリングするのに使う構造体。
試した限りでは普通にNormalAngleを使うことはできず、IsFilteringNormalAngleを使う羽目になった。
trigger colliderの時はNormalAngleが使えないとか書いてるけど、**IsFilteringNormalAngleでif分けする分には問題ない。**

[UnityEngine.ContactFilter2D - Unity スクリプトリファレンス](http://docs.unity3d.com/ja/current/ScriptReference/ContactFilter2D.html)
[ContactFilter2D-useTriggers - Unity スクリプトリファレンス](http://docs.unity3d.com/ja/current/ScriptReference/ContactFilter2D-useTriggers.html)

## LayerMask
あるレイヤーでしか反応しないようにしたいときに使う構造体。
GetMaskでレイヤー名を使用してフィルタリングする。レイヤー番号を名前に変換するLayerToNameもあるので、番号だけでもこの構造体は使える。
呼び出すときは暗黙的にintになっているので、実はビットシフトしたintで代用可能。そもそも、そのビット演算をやりたくないからこういうので代用してるんだけど……。

[UnityEngine.LayerMask - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/LayerMask.html)

## EditMode
通常play中にしかスクリプトは動かないが、Editor内でも動かす方法がいくつかある。

[【Unity】C#で点と扇形の内外判定の実装 (EditModeテスト付き) - Qiita](https://qiita.com/nkjzm/items/64539eb20de15a5d2f44)
[スクリプトを Edit モードで実行 - Qiita](https://qiita.com/okuhiiro/items/0121fc26c0b80a4673a0)

## Physics.SphereCast
ごんぶとレイキャスト。
じつはレイキャストにはいろいろな形があり、これはその一つ。

[【Unity】SphereCastやBoxcastで、球や箱のあたり判定が通過できるか判断する - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2016/02/25/025922)
[Physics-SphereCast - Unity スクリプトリファレンス](http://docs.unity3d.com/ja/current/ScriptReference/Physics.SphereCast.html)

## Rigidbody.Velocity
速度ベクトル。
ここに数値を入れると、非現実的に物体を飛ばせる。

[【Unity基礎】velocityを使用してオブジェクトを動かす方法 \| ネコプロ](https://nekopro99.com/move-object-velocity/)

## Rigidbody.AddForce()
物理的に物体を飛ばすときに使うほう。

[Rigidbody2D-AddForce - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/Rigidbody2D.AddForce.html)

## GetComponentとインターフェース
たとえばプレイヤーが何かにダメージを与えたいとき。
それが何で、ダメージを与える機能がついてて、とか見ていく必要はない。

ざっくり言うと、インターフェースを使えば「ダメージを与えられる」という機能を抽象化して与え、「ダメージを与えられるやつ」で全て呼び出せるようになる。

public変数が減るので便利。

[GetComponentを使うときはインターフェースを使おう](https://zenn.dev/akirakido/articles/81f208a569cb7f0a04fa)

## Application.isPlaying
現在アプリケーションが再生中かどうかを検知するブール。
if(!Application.isPlaying)とすれば、エディタの終了時に処理を挟める。

[【Unity】エディタが終了する直前に処理を行う - Qiita](https://qiita.com/shinobu_shiva/items/ca08b71259ca425b4edd)

## OnDrawGizmos()
デバッグ用にギズモを表示するためのメソッド。
スクリプトがゲームオブジェクトに設定されている間呼ばれる。

選択時に発動してほしいならOnDrawGizmosSelected()を使う。

[UnityのGizmosを使ってシーンビューで視覚的なデバッグの補助をする \| Unityを使った３Dゲームの作り方（かめくめ）](https://gametukurikata.com/customize/sceneview/gizmos)

これをプリプロセッサで囲めばそこのコメントアウトだけで消せるし、ブールで囲めば簡単に可視不可視を切り替えられる。

## Transform.SetParent
親を設定できるメソッド。
第二引数をtrueにすると、**見た目の大きさや位置を維持**して数値が書き換えられる。言い換えると**ワールド座標系における位置と大きさが維持される。**
反対にfalseにすると**数値が維持される。** ローカル座標系の維持。

[【Unity】Transform.SetParent の第2引数に渡す値によって何が変わるか - コガネブログ](https://baba-s.hatenablog.com/entry/2018/03/14/144800)

[Transform-SetParent - Unity スクリプトリファレンス](https://docs.unity3d.com/jp/current/ScriptReference/Transform.SetParent.html)



## Camera.orthographic
カメラが正投影ならtrue、パースならfalseになる変数。

[Camera-orthographic - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/2021.2/ScriptReference/Camera-orthographic.html)

## Vector3.one
(1,1,1)を取得できる変数。スケールに便利。
実は.NET自身にも同じような変数があったりする。

同じようにVector3.zeroとすれば(0,0,0)が取れる。位置取りに便利。

[Vector3-one - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/2018.4/ScriptReference/Vector3-one.html)
[Vector3-zero - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/2019.4/ScriptReference/Vector3-zero.html)

[Vector3.One プロパティ (System.Numerics) \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/api/system.numerics.vector3.one?view=net-5.0)

## Camera.orthographicSize

正投影カメラの**縦半分のUnit数**が入っている変数。
これを二倍して代入すれば、画面全体を覆う物体の縦スケール値が出る。横？　Camera.aspect掛ければ出る。

[Camera-orthographicSize - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/2019.4/ScriptReference/Camera-orthographicSize.html)
[OrthographicのSizeとは - おがみたは衰退しました](https://ogamita777.hatenablog.com/entry/2014/05/01/221715)

## Camera.aspect
アス比変数。幅÷高さ。

[Camera-aspect - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/2021.2/ScriptReference/Camera-aspect.html)

## Transform.InverseTransformPoint
ポジションをワールド空間からローカル空間に変換する。
Transform.TransformPointはローカルからワールド。
ここでいうローカルは親子関係を作った時の親からの相対座標のこと。

## Unityで透過動画を再生する
VP**8**で作ればkeep alphaをチェックするだけでいい。簡単。
ただし**ffmpegに入っていない**可能性があるので注意。
またVP9は何故か対応してないので注意。

[透過つきムービーをUnityのTimelineで再生する｜よーへん(バーチャル学芸員・バーチャルライブコーダ)｜note](https://note.com/361yohen/n/n3902fbfe3dd1)
[【Unity】Video Playerでアルファチャンネル付きムービーを使う - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2017/03/20/134727)
[UnityのVideo Playerで使えるアルファチャンネル付き動画をAdobe Premiereで書き出す方法 - Qiita](https://qiita.com/thorikawa/items/852a2fa33d81a7e072b2) 
[AfterEffectsから透過動画を書き出してUnityで再生する - Qiita](https://qiita.com/rarudonet/items/ed51ec4692498b37a694)  
[\[Unity \] 透過動画(WebM VP8)を作ったときのメモ - KYUCON*BLOG](https://www.kyucon.com/blog/2019/03/unity-webm-vp8.html)
[【Unity】UnityのVideoPlayerで透過の動画を再生する方法 - めーぷるのおもちゃばこ](https://www.wwwmaplesyrup-cs6.work/entry/2020/07/27/143900)

そのほか、シェーダーでα取って合成する方法もある。
Unityで透過処理することになるのでおそらくどんな動画も可能。ただ、それが調節できるかといわれると。
[アルファチャンネルでない動画をUnityでクロマキー処理して再生する \| パティオ](http://patio.work/archives/1208)

わりといけた。
[[../../../Others/CSandSR/CS Shader|../../../../../Others/CSandSR/CS Shader]]

シート一枚にまとめて静止画として再生する手もある。
これはおそらく仕事で描画負荷を減らす奴。
[【Unity】エフェクト制作に必要な要素・機能・組み込みのまとめ \| CGメソッド](https://www.cg-method.com/unity-effect-creation-necessary-functions/#index_id10)

## Motion Graphics
なんかモーションできる。

<iframe width="720" height="480" src="https://www.youtube.com/embed/X8RGC9t-Rec" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 物体を非表示したい
### アクティブ変更
`gameObject.SetActive(false);`
Updateも無効化される。
ただこの処理自体は他より重い。
### Renderer変更
`gameObject.GetComponent<\Renderer\>().enabled = false;`
ただ見えなくする。
### α0
`var color = gameObject.GetComponent<\Renderer\>().material.color`
`color = new Color(color.r, color.g, color.b, 0f);`
マテリアルを変えるために、途中でマテリアルが複製される。
### レイヤー替え
`gameObject.layer = LayerMask.NameToLayer("Hidden")`
事前にどのカメラからも映らないレイヤーを用意し、底にオブジェクトを入れる。
ちゃんとカメラのCulling Maskからチェックを外すこと。レイヤーが変わるので物理挙動も変えられる。
### スケール0
`transform.localScale = Vector3.zero`
シェーダ負荷がほぼ0になり、子要素も消滅する。アニメーションで消したいときにこれでごり推すことも。
ただしスケールで0除算が起きる可能性あり。

[Unityでモデルを非表示にする \| 生存日記](https://spphire9.wordpress.com/2020/12/29/unity%E3%81%A7%E3%83%A2%E3%83%87%E3%83%AB%E3%82%92%E9%9D%9E%E8%A1%A8%E7%A4%BA%E3%81%AB%E3%81%99%E3%82%8B/)


## 大きさをスクリプトから変更
`transform.localScale`。ワールドとか無く、これひとつ。

[Unityスクリプト: オブジェクトを拡大縮小する (Transform.localScale)｜まくろぐ](https://maku.blog/p/neuatgr/)

## 親の大きさに引っ張られる！
`transform.SetParent`から、worldPositionStaysをfalseにしておく。

[Transform-SetParent - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/Transform.SetParent.html)

[アセット読み込み](../アセット読み込み.md)


## \#region コメント
`#endregion`と一緒に使い、コードエディタ上で折りたたむ部分にコメントをつけられる機能。

後でメンバを追加するとき、合った場所を見つけるのがめんどくさくなるので気を付ける。

[regionを使わないほうがよい３つの理由と１つの例外 - Qiita](https://qiita.com/mono1729/items/f2a19724ff654b2556d8)

## スクリプトからシェーダに情報を渡す
どうもこれはできるらしい。Materialの変数にあるとかなんとか。反対？　たぶん無理。自分で考えろ。

[\[Unity\] C#プログラム側からシェーダに値を渡す - Qiita](https://qiita.com/edo_m18/items/0a65ab0c99325b24ec59)

## Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition + Vector3.back*Camera.main.transform.position.z));
2Dでマウスポジションを取るときに使う。
Vector3.backは(0,0,-1)なので、カメラのz位置と掛けてマウスポジションを足すと、zだけ0にしたマウスポジションを取れる。

## Sceneには映るのに、カメラに映らない！
十中八九カメラのCulling Maskです。
レイヤーを追加した後はちゃんと設定しましょう。

## action?.Invoke()
actionでdelegateやるときに、そのactionがnullじゃないなら実行するよ、という書き方。
C#6.0以前は自前でnullチェックが必要だった。

[null チェックをいちいち書かないで action を実行する方法 - Qiita](https://qiita.com/hogehoge_samba/items/f3677c1bb9022cb6add1)

nullチェックしないなら普通にaction()で呼び出せる。
なお、action?()は不可。



## タグ検索
[タグでシーン内のゲームオブジェクトを検索するエディタ拡張 - Qiita](https://qiita.com/satoya_123/items/77c831d20ffb40e4222c)

標準機能をくれ。

## TextMeshProが使えない
`using TMPro`
`TextMeshPro temp`
[TextMeshProの使い方 - Qiita](https://qiita.com/hinagawa/items/b606c6a2fd56d559a375)

[GUILayout](../GUILayout.md)



## タイマーの値が増えない
Time.deltatimeが小さすぎる？

## 初速度なら初速度じゃないの？
最低速度にしないと摩擦に負ける。

## C# Job System
[【Unity】C# Job Systemを自分なりに解説してみる - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2018/03/04/223804)

## ECS
ゲームオブジェクトの進化系。
ゲームオブジェクトをまとめて統括制御する。

[勉強会レポ : Unity ECS完全に理解した - Raspberlyのブログ](https://raspberly.hateblo.jp/entry/2018/10/22/235900)

## var
暗黙的型付け。
右側で型が決まるという意味であり、動的型付けを定義するDynamicとは違う。

[var（型推論）の利用指針について - Qiita](https://qiita.com/Nossa/items/e5e50d2fc1ae8b3e2389)

## Tile
エディタ上では有能なのに、スクリプト上では初見殺しまみれというくっそ面倒な奴。

[【Unity】タイルマップ - Tilemap クラスでよく使う関数 - コガネブログ](https://baba-s.hatenablog.com/entry/2018/04/08/131500)
[UnityのTilemapで心折れかけたことと解決のためのプレビュー拡張 - Qiita](https://qiita.com/keidroid/items/5d0e1bafc2c1d9a467e9)

### tilemapが使えない
`using UnityEngine.Tilemaps`が必要。
初学者にやさしくない。

[The type or namespace name "Tilemap" could not be found - Unity Forum](https://forum.unity.com/threads/the-type-or-namespace-name-tilemap-could-not-be-found.898625/)

### 一部のタイルを消したい
GetContactsでContactPoint2Dのリストを取得。
それを自分と破壊相手と両方で取得し、Intersectで積集合リストを取得。
その一つ一つのポイントに対しWorldToCell()でTilemap上の場所を特定し、SetTile()でnullを代入すれば消える。

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;
using System.Linq;


[RequireComponent(typeof(Rigidbody2D))]
public class PlayerCtrl : MonoBehaviour, IDamagable, IChangeScore, IInvincible
{
	private void OnCollisionEnter2D(Collision2D other)
    {
        if (!PlayerDeepData.Entity.stateBools[PlayerDeepData.StateKeys.jumpAttacking] &&
            !PlayerDeepData.Entity.stateBools[PlayerDeepData.StateKeys.dashAttacking]) return;
        if (!other.gameObject.CompareTag("BreakBlock")) return;
        var contactPointOther = new List<ContactPoint2D>();
        var contactPointPlayer = new List<ContactPoint2D>();
        var breakBlock = other.gameObject.GetComponent<IBreakable>();
        other.GetContacts(contactPointOther);
        rigid2D.GetContacts(contactPointPlayer);
        foreach (var v in contactPointOther.Intersect(contactPointPlayer))
        {
            breakBlock.breakThis(v);
        }
    }
	
	public void breakThis(ContactPoint2D c)
    {
        //Destroy(gameObject);
        var tilePos = tilemap.WorldToCell(c.point);
        tilemap.SetTile(tilePos, null);
    }
}
```

ほぼクリティカル。
[【Unity】TilemapでRayが衝突した場所のTileを消す - YAMADA TAISHI’s diary](https://orotiyamatano.hatenablog.com/entry/2019/11/07/TilemapRayDelete)

[タイルマップをゲーム中に書き換える処理【Unity,Tilemap】 \| あのゲームの作り方＠わたぶろぐ](https://watablog.tech/2021/02/16/post-1930/)
[Unity/Tilemapで、スクリプトから一部のtileを当たり判定含めて消してみた - Qiita](https://qiita.com/kako_vail/items/57c574629fcaf4d9787f)

検索してもExceptばっか出てきて大変だった。
最初から積集合って分かってればな。
[\[C#\] Linqの演算で和集合, 差集合, 積集合 を求める方法 │ Web備忘録](https://webbibouroku.com/Blog/Article/linq-set#outline__4)

[C# で 2つのリストを比較する \| Delft スタック](https://www.delftstack.com/ja/howto/csharp/compare-two-lists-in-csharp/)
[C# - C# List同士の比較｜teratail](https://teratail.com/questions/48925)

### このブラシでゲームオブジェクトも配置したい
できます。
[【2D Tilemap Extras】タイルマップにゲームオブジェクトをぺたぺた貼れるGameObject Brush【Unity】 \| ゲーム開発65535 Ver2](https://gamedev65535.com/entry/unity_tilemap_gameobjectbrush/)

### TileMap.GetInstantiatedObject
なんかnullばっか出るのは、**GameObjectがStart()の後の最初のフレームでインスタンス化される**から。
この仕様上、これを実行するのは**Start()のタイミングですら早すぎる。**  そのためboolを使ってUpdateにinitメソッドを作るのがいい。

……のだが、**2020.3ではそもそもこのメソッドが仕事しない。** 2019で仕事しないって話はあったけど、なんで2020でも動かないんだよ。

だからTileからはスプライトを拾って、別にゲームオブジェクトを作ったほうがよさそう。


[How to use TileMap.GetInstantiatedObject? - Unity Answers](https://answers.unity.com/questions/1591664/how-to-use-tilemapgetinstantiatedobject.html)
[\[TileMap\] How to get the Instantiated Object of all tiles ? - Unity Forum](https://forum.unity.com/threads/tilemap-how-to-get-the-instantiated-object-of-all-tiles.631639/)


### .GetTileData()にITilemapが欲しいのにどこにも
**.GetTileData()はUnityが使う機能。** というか、ITilemapが絡む関数は全部Unityが内部で使うものであって、ユーザーが触れるものではない。あとTileDataも。
もしかしてリファレンスってソースを読む人のためのものであって、メソッドを使う人のためじゃない……？

[How to Get ITilemap From Tilemap · Issue #44 · Unity-Technologies/2d-extras](https://github.com/Unity-Technologies/2d-extras/issues/44)
[How do I get iTilemap to pass by reference? - Unity Forum](https://forum.unity.com/threads/how-do-i-get-itilemap-to-pass-by-reference.767837/)
[さぁ、UnityのTilemapを始めよう！4/8 ~Tile について編~ - Qiita](https://qiita.com/RyotaMurohoshi/items/4f88763e620a8d329163)

### 歩いてるとクッソ引っかかる
Composite Colliderで合体する。
タイル破壊については場所を指定してnull代入してるので問題ない。
[あおぞらノート: 【Unity】TilemapCollider2Dの間に引っかかる件](https://zephyrstudio.blogspot.com/2019/11/unitytilemapcollider2d.html)

#### 壁に引っかかる
摩擦をゼロにしたphysicsを割り当てる。どうも**Noneとゼロ割り当ては別物らしい。**
片っぽに付ければ済むので、プレイヤーに。

[ステージ作成＆「引っかかり問題」の解決 \| Unityでゲームを作ろう！](https://unity.moon-bear.com/unitychan-2d-action/level-design/#toc2)

### Prefab Brushがない
何故かはわからないが、そういうScriptableObjectを作らないと使えない。
Create→2D→BrushesからPrefab Brushを選択するとSObjができ、Tilemap Editorで扱えるようになる。
たぶん、だいたいGameObject Brushで済むから隠したのだと思う。

[Prefab Brush Missing · Issue #252 · Unity-Technologies/2d-extras](https://github.com/Unity-Technologies/2d-extras/issues/252)
[visualizing prefab brush · Issue #315 · Unity-Technologies/2d-extras](https://github.com/Unity-Technologies/2d-extras/issues/315)
直接的な答えではないが、察することが出来る。

## Animation
### テキストアニメーション
TextMeshPro限定だが、こういうのがある。

[【Unity】TextMesh Proをアニメーションさせる～デザイナー編～ - コポうぇぶろぐ](https://coposuke.hateblo.jp/entry/2020/06/07/020235)

本当は専門のTypeface Animatorというのがあったのだが、なんか見つかんないので。
他のアニメーションがしたくなった時用に、プログラマ編も載せておく。


[【Unity】TextMesh Proをアニメーションさせる～プログラマ編～ - コポうぇぶろぐ](https://coposuke.hateblo.jp/entry/2020/06/07/020330)

### 2D ボーンアニメーション
sprite EditorとAnimation Editorを使うということさえ分かっていれば、何も難しくない。

[【Unity】2D Animationの基本的な使い方 psd(psb)ファイル読み込みからSkinning Editorまで - Unity(C#)初心者・入門者向けチュートリアル ひよこのたまご](https://hiyotama.hatenablog.com/entry/2021/03/31/222740)
[Anima2Dでキャラクターアニメーションを作ろう！編 - SEGA TECH Blog](https://techblog.sega.jp/entry/2018/03/26/100000)

#### スプライトエディタのボーンがシーンに出ないんだが
スプライトオブジェクトにsprite skinコンポーネントをつけてCreate Bonesをクリックする。
たったこれだけなのになぜか解説されないシリーズ。

[2D Sprite Editor bones aren't visible in scene - Unity Forum](https://forum.unity.com/threads/2d-sprite-editor-bones-arent-visible-in-scene.681337/)

### sprite animation
アニメーションパターンを**Sceneに**放り込めばAnimationとなる。
ClipのLoop設定は忘れず。

スプライトアニメーションは速度をClip内のSamplesで変えられる。

[Unity でスプライトアニメーションを作る - Qiita](https://qiita.com/ELIXIR/items/e58fa48680e0ebbde0ea)

ちなみにスプライトだけ入れ替えるならスクリプトが必要。
上の記事のリンク参照。

[UnityでSpriteアニメーションを画像差し替え可能な実装をする - QUEST LAB](https://questgames.hatenablog.com/entry/2019/03/08/171326)

### アニメーション謎項目
[UnityのAnimator ControllerのSpeed、Mirror、Foot IK項目 \| Unityを使った３Dゲームの作り方（かめくめ）](https://gametukurikata.com/animationanimator/statefootik)

### スプライト反転
Sprite Rendererの中のMirror。
他にもY軸で回す手法もあったり。
[How to flip sprite horizontally in Unity 2D? - Unity Answers](https://answers.unity.com/questions/952558/how-to-flip-sprite-horizontally-in-unity-2d.html)

### アニメーション遷移
アニメーターにフラグをつけ、スクリプトでAnimationをとり変更する。
実はidで入力したほうが早いらしい。

[【Unity】Animator.SetBool(int id, bool value)について \| TEAM ARASHIYAMA Blog](https://t-arashiyama.com/2021/02/18/%E3%80%90unity%E3%80%91animator-setboolint-id-bool-value%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/)

### State Machine Behaviour
Enter,Update,Exit,RootMotionとIK関係が実装できる。
アニメーションの切り替わりと何かを同期させたいときに。

[【Unity】State Machine Behaviour について - KAYAC engineers' blog](https://techblog.kayac.com/unity_advent_calendar_2016_15)

### Animation Event
アニメーション中に関数を実行できる。
アニメーション中に判定をつけたいときに。

[\[Unity\] Animation Eventを使いこなそう！ - Qiita](https://qiita.com/aimy-07/items/58e77d3396ded286affc)

### Avator Mask
アニメーションの一部ブレンド機能。
例えば上半身と下半身に別のアニメーションを付与し、複合アニメーションを作ることが出来る。
[【Unity】レイヤー・アバターマスクを用いてアニメーションを複数同時に再生する – XR-Hub](https://xr-hub.com/archives/16275)

### Any State
どんな時でも、条件が満たされた瞬間にそのアニメーションに遷移させるステート。たとえばゴールモーションなどに使う。
[UnityのAnimatorControllerをスクリプトで切り替える！Anystateからキー入力で切り替え \| 神部まゆみのブログ](https://knb-mayumi.com/unityanimatorcontroller-scrypt/#toc12)

### Layer Weight
アニメーションをレイヤーで上書きできる機能。
Anyのように元に戻す遷移を書かなくて済むので、2Dだと神機能。
上書きだけでなく加算もできる模様。

[UnityのAnimatorのレイヤーのSyncを使ってアニメーションを全て変更する | Unityを使った３Dゲームの作り方（かめくめ）](https://gametukurikata.com/program/changelayer)

### Trigger
一度だけ再生するアニメーションに対して設定する変数。
銃の発砲などにぴったり。

[unity - Animator Bool or Trigger? - Game Development Stack Exchange](https://gamedev.stackexchange.com/questions/137241/animator-bool-or-trigger)

### Auto Live Link
Animatorがくっついてるオブジェクトを選択していないと働かない。


### 2D アニメーションプレビュー
Prefabに入れてPrefabを選択していないとモデルが無くてプレビューできない。
[【Unity】2DのSprite Animationをプレビューする裏技 - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2017/11/14/233944)
### Write Defaults
起動時の位置やパラメータを覚えておき、アニメーションキーが設定されてないところでその値を使用する設定。
これが外れていると、アニメーションを止めた際に元の値に戻らなくなる。

これには罠があり、**GameObjectをアクティブにした瞬間の値がデフォルト値になる。** Animatorをつけたオブジェクトは不用意に非アクティブにしてはいけない。

これはUnity5の時代の話であることも留意。

[【Unity】知らないと面倒くさい事になるかもしれないAnimatorの「Write Defaults」の動作について - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2017/01/15/233000)

### アニメーションとスクリプト、両方移動
AnimationControllerにrotationやpositionを動かすカーブがあると、他のアニメーション再生時にも**それらを初期値に戻すアニメーションが設定される。** つまりAnimationでしか設定できなくなる。

対策として、値を常に代入式で突っ込めばいい。
回転の場合はちょっとめんどくさいが。

これはUnity5の時代の話であることも留意。

[【Unity】Animatorで動かすオブジェクトをスクリプトでも動かす際の注意 - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2016/08/08/235900)

### 停止する
普通に`animator.speed = 0f`とかやると、Animator配下のアニメーションが全部止まる。
ので、Multiplierを設定してSetFloatで掛け算調整する。
[UnityのMecanimで個別のAnimationを一時停止する - Qiita](https://qiita.com/thorikawa/items/924d38f7eea0f71c5856)
### フレームレート変更
ドットメニューからサンプルレートを表示してやれば変更可能になる。
[[解決済み]アニメーションフレームレートの設定-Unityフォーラム](https://forum.unity.com/threads/resolved-setting-animation-frame-rate.801936/)
## DOTween
ちょっとしたアニメーションが簡単に書ける。
アニメーションを連続させて繋げたりするときなんかに有用。

[Unity DOTween 入門 - Qiita](https://qiita.com/broken55/items/df152c061da759ad1471)
[DOTween - Documentation](http://dotween.demigiant.com/documentation.php)

### SetEase
TweenerおよびSequenceのアニメーションカーブを設定できる。
デフォルトはLinearで等速直線。

UnsetとLinearは別物。
普通のアニメーションカーブも指定できる。
[DOTween-ドキュメント](http://dotween.demigiant.com/documentation.php#creatingSequence)
[Easing Functions Cheat Sheet](https://easings.net/)

### TimeLine上でプレビュー
できなくはない。
TimeLineのキーで普段アニメーションをつけているなら、ぜひ。

[DOTweenのアニメーションをTimeLineでプレビューする - PG日誌](https://takap-tech.com/entry/2020/02/02/234819)

### カウントダウン・カウントアップ
普通にDoTween.Toで実装してもいいが、Textに直接アクセスするコードがある。

[DOTweenでカウントダウン・カウントアップのアニメーション - Qiita](https://qiita.com/RyotaMurohoshi/items/f7312e802f7698e42cd0)

### SequenceのPlay
%%**Sequenceは一つしかない。**
多重に定義することはできない。%%

### DOTween.To
値だけを純粋に変更するtween。
何でもできる。

### DOVirtual
何が仮想なのかというと、たぶん値を先に設定してること。

#### DOVirtual.DelayedCall
関数実行にディレイをかけるだけのtween。
UniTaskもCoroutineもいらないのでおそらく最も手軽。

#### DoVirtual.Float
DoTween.Toでfloat使うのと大体同じことが出来るtween。
使う値ごとに別のメソッドを使うのがめんどくさいが、ラムダ式が一つで済むのでシンプルに書ける。

[【Unity】unity1week「回」で使った小技集｜ピクジン｜note](https://note.com/piku_model/n/n9a622bc3c229)

### 進行中のアニメーションにAppend
出来ないらしい。
どうしてもするなら、AnimationQueieを使う。

[すでに再生中のシーケンスに追加・Issue＃132・Demigiant / dotween](https://github.com/Demigiant/dotween/issues/132)

## 拡張エディタ
[【Unity】エディタ拡張の際によく使用する、基本的なクラスや関数まとめメモ \| Bard は楽して暮らしたい](https://bardaxel.jp/archives/521)  
Enumの名称替えは使えそう。

[【Unity】UnityEditor で利用できる Field 一覧 - うにてぃブログ](https://hacchi-man.hatenablog.com/entry/2020/01/26/220000)

### 大前提
拡張エディタまで来ると、データの保存方法が問題になることがある。保存したつもりが保存されてなかったりする。

これはおそらく、SerializeObjectのせい。Unity内ではSerializeされたものはすべてこの型に入れて管理されている。inspectorを通せばそのSerializeObjectを通して値が変更されるので、**値が変更されたことをUnityが検知して**セーブできる。
しかしシーン上でのデータを使ってクラス内からSerialize値をいじると、Unityはその値が変更されたことを検知できない。よって再生時などに前の値に戻ってしまうことになる。

[Editor拡張 - Windowを作ろう - Qiita](https://qiita.com/messhi/items/f24fa0464563c1a48da2) 
[【Unity】EditorUtility.SetDirtyのなく頃に - 徳島ゲーム開発ごっこ 技術ブログ](https://www.urablog.xyz/entry/2017/10/17/231233#%E4%BA%8B%E4%BB%B6%E3%82%92%E5%86%8D%E7%8F%BE%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B)

じゃあどうすんだというと、クラス内からもSerializeObjectを通せばいい。ちなみに上記のシステム上、SerializeObjectを通すとSerializeした値にしかアクセスできない。private変数をセーブしたいときは\[SerializeField, HideInspector\]という属性を使う。お前使い道あったのかい。

さらに値の変更前に`serializedObject.Update()`を呼ばないと、前回の値のままで更新されない。変更後は`serializedObject.ApplyModifiedProperties()`を呼ばないとセーブできない。

`serializedObject.ApplyModifiedProperties()`の効果により、Serialize値をそのままいじったものはいじる前の値でセーブされたりするので、これを使う場合は全てSerializeObjectを通すのがデフォになる。

[インスペクター拡張の基礎｜UnityでコードからGUIを作る](https://zenn.dev/kumas/books/325ed71592f6f5/viewer/0f1174) 
[Editor拡張 - SeriazliedObjectに迫る - Qiita](https://qiita.com/messhi/items/85f878453639352d7667)

個別にセーブもできるらしいが。

[Unity 意外と楽しいエディター拡張　～シリアライズって何？編～ - おねむゲーマーの備忘録](https://sleepygamersmemo.blogspot.com/2017/12/unity-custom-editors-serialized-property.html)



### 色
テキストとかならGUI.Colorを書き換えればいいが、ボタンならGUI.backgroundColorを変える。
**変更するとその後の記述全てに影響する**ので注意。

[How do I change the color of a GUILayout button? : Unity3D](https://www.reddit.com/r/Unity3D/comments/88zt5f/how_do_i_change_the_color_of_a_guilayout_button/dwod99h/)

### Foldout
折り畳み。実装できる。
開閉状態も取れる。

[エディタ拡張でクラスの折り畳み等を再現する - Qiita](https://qiita.com/Gok/items/0d403d6ebd18abab9e06)
### データリスト
しっかりしたものも作れる。
[【Unity：エディタ拡張】エディタでデータリスト表示をしてみよう - Qiita](https://qiita.com/shirasaya0201/items/61638013aff22feee15e)
## Scene View Camera
SceneView.currentDrawingSceneViewで、SceneViewというScene関係のクラスが取れる。それに.cameraをつければScene Cameraが取れる……筈なのだが、うまくいかず。

[Resolved - How to draw certain gizmos only in Scene view, but not in Game view - Unity Forum](https://forum.unity.com/threads/how-to-draw-certain-gizmos-only-in-scene-view-but-not-in-game-view.1127174/)

それにこれだとGameViewを開いた瞬間にObject not setが出るので、.lastActiveSceneViewを使うことに。

[Moving scene view camera from editor script-- - Unity Forum](https://forum.unity.com/threads/moving-scene-view-camera-from-editor-script.64920/)

[Unity - Scripting API: SceneView](https://docs.unity3d.com/ScriptReference/SceneView.html)

### エディタでボタン押したときに情報を拾って、プレイ時に処理する

[エディタを実行していない時にSceneView上でクリックした座標を取得する【Unity】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/ClickPositionOnSceneGetter)
[Inspectorにメソッドを実行するボタンを追加する【Unity】【エディタ拡張】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/CustomEditor_Button)
[【Unity】エディタ拡張でエディタを自由にカスタマイズしよう！～インスペクタビュー編～ – XR-Hub](https://xr-hub.com/archives/16957)  
[【Unity：エディタ拡張】Unityでエディタ拡張を始めよう - Qiita](https://qiita.com/shirasaya0201/items/ee32f35ad3caac428368)
[How to get mouseposition in scene view? - Unity Forum](https://forum.unity.com/threads/how-to-get-mouseposition-in-scene-view.208911/)
[UnityのGizmosを使ってシーンビューで視覚的なデバッグの補助をする \| Unityを使った３Dゲームの作り方（かめくめ）](https://gametukurikata.com/customize/sceneview/gizmos)

この辺から生成。

```csharp
	public void fallBlock(ContactPoint2D c)
    {
        foreach (var i in gd)
        {
            var tileIntPos = Vector3Int.CeilToInt(i.Key);
            if (tilemap.HasTile(tileIntPos))
            {
                tilemap.SetTile(tileIntPos, null);
            }
            var gObj = Instantiate(spResource);
            gObj.transform.position = i.Key + new Vector3(0.5f, 0.5f, 0);
            var spTemp = gObj.GetComponent<SpriteRenderer>();
            spTemp.sprite = i.Value;
        }
    }
	
#if UNITY_EDITOR
    private void OnDrawGizmos()
    {
        if (first)
        {
            gd = new GenericDictionary();
            first = false;
        }
        if (!toggle) return;
        Vector3 mousePosition = Event.current.mousePosition;
        mousePosition.y = UnityEditor.SceneView.lastActiveSceneView.camera.pixelHeight - mousePosition.y;
        mousePosition = UnityEditor.SceneView.lastActiveSceneView.camera.ScreenToWorldPoint(mousePosition);
        var tilePos = stattilemap.WorldToCell(mousePosition);
        if (Event.current.type is EventType.MouseUp)
        {
            Debug.Log("座標：" + tilePos.x.ToString("F2") + " , " + tilePos.y.ToString("F2"));
            if (!gd.ContainsKey(tilePos))
            {
                gd.Add(tilePos,stattilemap.GetSprite(tilePos));
            }
        }
        Gizmos.color = new Color(1f, 0, 0, 0.3f);
        foreach (var i in gd)
        {
            Gizmos.DrawWireCube(i.Key + new Vector3(0.5f,0.5f,0), new Vector3(1, 1, 1));
        }
    }
#endif
}



[CustomEditor(typeof(Piller))]
public class PillerSwitch : Editor
{
    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();
        GUI.backgroundColor = Piller.toggle ? Color.blue : Color.red;
        if (!GUILayout.Button("Select Tile")) return;
        Piller.toggle = !Piller.toggle;
        Debug.Log(Piller.toggle);
    }
}
```

見ると何のことは無く、割と簡単に実装できる。

### EditorGUILayout.Popup
シリアライズしたenum変数のように、文字列配列をプルダウンメニューにする関数。
**OnInspectorGUIなどで** **呼び出した瞬間に** シリアライズされ表示される。つまりこの関数内で戻り値を返す処理とシリアライズ処理が同時に走っている。
引数にとるintは文字列配列に渡すindex。なので、固定値を渡すとその値の文字列にしかならなくなる。たとえば3を渡せば配列の\[3\]を返し、他に変えようとしても変わらない。
戻り値はintで、ここにプルダウンで変更した値が入る。
つまり、**戻り値を引数と揃えないと正しくプルダウンにならない**。初見殺しじゃけえ……

[EditorGUILayout-Popup - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/EditorGUILayout.Popup.html)
[【Unity】択一選択式プルダウンメニューを動的に変化させる【エディター拡張】 - Tsuの雑記¯\_(ツ)_/¯](https://tsu-games.hatenablog.com/entry/dynamic-popup)
[【Unity】UnityEditor で利用できる Field 一覧 - うにてぃブログ](https://hacchi-man.hatenablog.com/entry/2020/01/26/220000#EditorGUILayoutPopup)
[【Unity(C#)】文字列リストをEnumっぽく使うエディタ拡張 - Qiita](https://qiita.com/OKsaiyowa/items/16ee37256173344b7b8b)

## 複数の型を含んだシリアライズ変数
### 辞書型
昔からシリアライズ辞書の需要は強く、いろんな人がいろんな方法で作ってきた。
[\[Solved\]How to serialize Dictionary with Unity Serialization System - Unity Answers](https://answers.unity.com/questions/460727/how-to-serialize-dictionary-with-unity-serializati.html)

#### SerializedDictionary
URPプロジェクトでだけ使える、Unity純正のシリアライズ可能な辞書型。
正確にはUnityEngine.Renderingに入っている。
なお、テスト版なのかUIが重なっているし**2020.3ではInspectorから数値を変えると辞書サイズまで変更される**のでもう諦めていいんじゃないかな。

[Finally, a serializable dictionary for Unity! (extracted from System.Collections.Generic) \| Page 3 - Unity Forum](https://forum.unity.com/threads/finally-a-serializable-dictionary-for-unity-extracted-from-system-collections-generic.335797/page-3)

使い方は簡単、using UnityEngine.Rendering;してからdictonaryをこれに変えるだけ。

#### Serialized Dictionary Lite
現在のプロジェクト、Destroに使ってるやつ。
実際はvalueに構造体を指定している。

[Serialized Dictionary Lite \| ユーティリティ ツール \| Unity Asset Store](https://assetstore.unity.com/packages/tools/utilities/serialized-dictionary-lite-110992)

### 構造体
クラスをシリアライズする際と同じく、\[Serializable\]を`using System`と一緒に付ければ宣言時にシリアライズされる。
なにかと構造体はめんどくさいので、[Csharp Cheat Sheet](CS_and_SR/Csharp%20Cheat%20Sheet.md)の構造体を読み込んでおくこと。

[【Unity】Inspector上で構造体のパラメーターを設定可能にする \| りつかのゲーム開発雑記ブログ](https://ritsuka.dev/struct-on-inspector)

## 二次元配列のシリアライズ
手としてはリストをクラスに入れ、そのクラスをリスト化するというのが一般的っぽい。

[多次元のListをInspectorに表示する【Unity】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/ValueListList)

凝りたいなら海外フォーラムを探す。

[Serialize custom multidimensional array from Inspector - Unity Answers](https://answers.unity.com/questions/1485842/serialize-custom-multidimensional-array-from-inspe.html)
[Showcase - How I serialize multidimensional arrays - Unity Forum](https://forum.unity.com/threads/how-i-serialize-multidimensional-arrays.988704/)
[Is there any way to view 2d arrays in the inspector? - Unity Answers](https://answers.unity.com/questions/231715/is-there-any-way-to-view-2d-arrays-in-the-inspecto.html)


## Dictionaryのforeach
keyvaluepair型というものを使う。
.keyや.valueとすればそれぞれ読める。

[C#でKeyValuePairを使用する - プログラムを書こう！](https://www.paveway.info/entry/2019/10/27/csharp_keyvaluepair)

## 0除算
物理演算とタイミングが合わず、完璧に止まったタイミングで早さの割り算が開始され0へ。

## FuncとAction
戻り値があればFunc。なければAction。
Funcは16個まで引数を持てる。

定義済みの関数を入れる際は名前だけで()は使わない。

[C#のActionの使い方。Funcとの違いやデリゲートの解説 \| .NETコラム](https://www.fenet.jp/dotnet/column/language/5375/)



## SVG
[マスターのvector-graphics-samples / vectorgraphics.md・Unity-Technologies / vector-graphics-samples](https://github.com/Unity-Technologies/vector-graphics-samples/blob/master/Documentation/vectorgraphics.md)
[Class VectorUtils \| Vector Graphics \| 2.0.0-preview.18](https://docs.unity3d.com/Packages/com.unity.vectorgraphics@2.0/api/Unity.VectorGraphics.VectorUtils.html)

### UIにしたら見えなくなった
preview18で修正されてるらしい。
それでもだめなら、右クリック→SVG Imageから自分で設定すれば見れるかも。
[Unity UI SVG support script \| Page 3 - Unity Forum](https://forum.unity.com/threads/unity-ui-svg-support-script.551254/page-3)

### 扇形が欲しい
ないので作れ。

[Unity-ベクターグラフィックプレビューパッケージ\| 20ページ-Unityフォーラム](https://forum.unity.com/threads/vector-graphics-preview-package.529845/page-20)


## TryGetComponent
GetComして存在しないならばfalseを返すメソッド。
取れたコンポーネントはoutを使って渡した引数内に渡される。

[TryGetComponentとout、out var のお話 - Qiita](https://qiita.com/divideby_zero/items/c976160a7457a2b0f1e6)

## Cinemachine
カメラにブレインを仕込み、それを通してvirtualカメラの映す情報を次々切り替えるシステム。
キャラクタを追わせたり、パスに沿わせたりできる。

[【Unity】Cinemachine入門！スクリプトなしでカッコいいカメラワークを作る - LIGHT11](https://light11.hatenadiary.com/entry/2019/07/23/210040)
[ユニティちゃんを撮影するカメラをCinemachineで制御する｜npaka｜note](https://note.com/npaka/n/nce404b947b2c#DPieR)

### Dolly Camera
2Dで扱う場合、トラックパスは**カメラより手前にないと正常に動かない。**

[【Unity】【Cinemachine】Virtual CameraのTracked Dollyでパスに沿ってカメラを動かす - LIGHT11](https://light11.hatenadiary.com/entry/2019/07/16/210124)
[【Unity】Cinemachine Mixing Cameraで複数カメラをブレンドする \| ねこじゃらシティ](https://nekojara.city/unity-cinemachine-mixing-camera#%E5%AD%90%E3%83%90%E3%83%BC%E3%83%81%E3%83%A3%E3%83%AB%E3%82%AB%E3%83%A1%E3%83%A9%E3%81%AE%E3%82%A6%E3%82%A7%E3%82%A4%E3%83%88%E5%80%A4%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B)
[Class CinemachineTrackedDolly \| Package Manager UI website](https://docs.unity3d.com/Packages/com.unity.cinemachine@2.1/api/Cinemachine.CinemachineTrackedDolly.html#fields)

### Mixing Camera
カメラを切り替えるのに使うカメラ。
最大8個。

[【Unity】【Cinemachine】最大8個のカメラを一度にブレンドできるMixing Camera - LIGHT11](https://light11.hatenadiary.com/entry/2019/08/02/214237)

### Transposer
基本の目玉機能。
Followにとりあえず指定しておけば、対象を追うカメラは作れる。
当然だが、動く対象を指定すること。オブジェクトを纏めてるだけのオブジェクトを指定しても動かない。

[【Unity】【Cinemachine】Virtual CameraのTransposerで対象を追いかけるカメラを作る - LIGHT11](https://light11.hatenadiary.com/entry/2019/07/15/223354)

### Extension
#### Extension欄がない
たぶんNullReferenceが出てるので、プロジェクトを二バイト文字が含まれない場所に移す。
#### Confiner
カメラを制限する空間を指定する。

ぶっちゃけこの記事だけで事足りる。
[Unity 2Dアクションを作ろう【カメラをプレイヤーに追従】 \| ゲームの作り方！](https://dkrevel.com/makegame-beginner/make-2d-action-move-camera/)

## Game CI
Unityゲームをリポジトリにプッシュするだけでビルドしてくれる機能を提供する。

[GameCI](https://game.ci/docs)

公式チュートリアルはまず説明から入っており、貼り付けるだけで動くやつは一番下にある。ちゃんと読め。

当たり前だが、やる前に**一度ローカルでビルドしてエラーは消しておく。**

[GameCI で Unity の CI 環境を GitHub Actions で構築する](https://zenn.dev/nikaera/articles/unity-gameci-github-actions)

### 流れ
activationのキーをもらいHubにアップロード、TestRunnerをunityVersionだけ追記して実行、builderでversion追記、webglだけにしてJamesIves/github-pages-deploy-actionを使いbuild/WebGL/WebGLを出力、gh-pagesを設定から公開。

lab版ならvariablesのUNITY_VERSIONを修正する。公開はpagesアクションのonlyをmainに修正すれば動く。

### ulf
中身をテキストとして開いて貼り付ける。

### unityVersion
ProjectSettingsから読み込んでくれるはずなのに、たいていうまくいかないので必須のオプション。

### projectPath
.とか/.とか出てくるが、同じ階層にあるならそもそも要らないらしい。

[Setting path for CI/CD in Github - Unity Answers](https://answers.unity.com/questions/1870794/setting-path-for-cicd-in-github.html)

### exit code 1
検索するとたまに出てくる、`customParameters: "-nographics"`は古い対処法。
いまは要らないので消しておく。

[Docker exit code 1 · Issue #182 · game-ci/unity-builder](https://github.com/game-ci/unity-builder/issues/182)

### exit code 103
WebGLで発生。ローカルでカラースペースやGraphics APIなどのグラフィックス設定を修正すると直った。

### Unable to parse Build/\[File Name\].framework.js.br
WebGLの成果物である.brファイルをサーバーが読めないときのエラー。
サーバーの管理者なら設定すればいいが、そうでないならPlayer→Publishing SettingsからDecompression Fallbackにチェックを入れる。
こうすることで、デコンパイラを同梱してくれるため読めるようになる。パフォーマンスは落ちるらしいが。

[ヘルプ募集-\[解決済み\] WebGLビルドエラー-「ビルド/ \[ファイル名\] .framework.js.brを解析できません」-Unityフォーラム](https://forum.unity.com/threads/solved-webgl-build-error-unable-to-parse-build-file-name-framework-js-br.1102759/)

### Create Artifact Container failed: Artifact storage quota has been hit. Unable to upload any new artifacts
Artifact、つまりビルドの生成物はどんどんたまっていく。そして無料アカウントだと月500MBしか溜められない。
対策としては、ビルドの後にその生成物を消去するアクションを入れるなど。

[GitHub Actionsのストレージ容量 - みーのぺーじ](https://pc.atsuhiro-me.net/entry/2021/02/05/095605)

## 衝突モード選択
物をすり抜けてほしくないときに設定する項目。


[最適な衝突判定を即選択。Collision Detection 早見表【Unity 2018.3 以降】 \| VirtualCast Blog](https://virtualcast.jp/blog/2020/05/collisiondetectionchart/)

## Collision

### collision
OnCollisionEnterとかにくっついてくる、**ぶつかった物体の情報が格納される変数**。これに.gameObjectをつければぶつかったGameObjectを取ることが出来る。

[UnityEngine.Collision - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/Collision.html)

### Body Typeを変える
Rigidbody2D.bodyTypeに入ってるので、RigidbodyType2D.任意 で代入書き換え。

[RigidbodyType2D - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/2019.4/ScriptReference/RigidbodyType2D.html)

### OnTrigger/OnCollisionExitのタイミング
普通に出ていったときはもちろん、**対象のレイヤーを変えて衝突させなくしたときも反応する。**

### 特定のものだけぶつからせない
レイヤーを切り替える方法が一般ぽい。
リンクでは拡張機能を使ってるが、LayerMask.NameToLayer()で名前をレイヤー値に変えるのは可能。

[特定オブジェクト同士の当たり判定を一時的に無くす【Unity】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/ChangeLayer)

また、その特定にしかぶつからないならトリガーを消すという方法もあることを書いておく。

### ぶつかった時に物理的に跳ね返す
Dynamicじゃないと跳ねませんよ。
そのうえ、Dynamicじゃないと**OnCollisionEnterも動かない。**

### 子オブジェクトの衝突まで検知するんだが
親にRigidbodyがついてると子オブジェクトの衝突を検知する。

[【Unity】 子オブジェクトの衝突が検知される条件 - Qiita](https://qiita.com/t_Kaku_7/items/1c7177007ddd711a754c)

### CollisionとTriggerの違い
ざっくり言うと、**どっちも動くならCollision。それ以外ならTrigger。**
Collisionは**どちらか片方にRigidbodyがないと動かない。**
また、子のCollisionは親にRigidbodyくっつけてると反応する。
分けたいなら子にもRigidbodyをくっつけてると子の反応だけになる。

子ごとに判定を分けたいなら親に処理を書いて、子のOntriggerから`transform.root.gameObject.GetComponent<hogehoge>().BodyHit();`などで読み込むスクリプトを変えればいい。

[\[Unity\] Unityにおける衝突判定まとめ - Qiita](https://qiita.com/nutti/items/1a284c4bf8c79386aca7)
[OnTriggerEnterとOnCollisionEnterの違い / 衝突判定 - Unityメモ](https://nullkun0803.hateblo.jp/entry/2018/04/10/173612)
[【Unity】子オブジェクトにRigidbodyをアタッチして親オブジェクトを移動させたときの動作 - のりかつおの備忘録ブログ](https://norikatuo.hatenablog.com/entry/2021/01/26/015211)
[【Unity】当たり判定が反応しない原因 - ユニツール](https://uni-tools.hatenablog.com/entry/2018/12/16/191223)

### 衝突点判定

[【Unity】物理演算を(なるべく)行わずにオブジェクトの衝突位置を取得する方法 \| ゴマちゃんフロンティア](https://gomafrontier.com/unity/2213)
[衝突判定を行う方法 (Collider / Collision Detection) \[Unity\] – Site-Builder.wiki](https://site-builder.wiki/posts/36142)

#### Physics.GetContacts()

colliderに触れている全てのcollider・rigidbodyの配列・リストや、その接触点の配列・リストが取れるメソッド。
戻り値はintで配列・リスト数を返してくれる。もちろん、もらわなくてもいい。
istouching

[Unity - Scripting API: Physics2D.GetContacts](https://docs.unity3d.com/ScriptReference/Physics2D.GetContacts.html)
[【Unity】Raycastを使わず地面に接触しているか判定する - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2018/04/07/234028)

注意点として、**Collisionを引数にとった場合と、Collider、Rigidbodyを引数にとった場合では取れる値が違う。** Collisionが一番詳細に取れる。(Rigidbody Dynamicしか試してない)

Collider、Collision、Rigidbodyにも同名の関数があるが、この値関係も同じ。それぞれの値はPhysicsで取る場合と等価。
**接触点を返すものであり、OnTriggerEnterを完全に互換はしない。**

また、最大の罠として**Triggerだと使えない。** お願いだからそういうことは書いとけよ[書いてたわ。](https://docs.unity3d.com/ScriptReference/Physics2D.GetContacts.html)

[Unity - OnTriggerEnter2Dでの接触場所取得の方法｜teratail](https://teratail.com/questions/145701)

#### Collider.ColosestPoint(Vector3)
指定した場所に対して、コライダー内で最も近い点を返す関数。
数少ないTriggerで接触点を取れる可能性だが、Tile相手ではそもそもその指定した場所が欲しいので意味がない。

[Collider-ClosestPoint - Unity スクリプトリファレンス](https://docs.unity3d.com/jp/current/ScriptReference/Collider.ClosestPoint.html)
[c＃-トリガーから連絡先を取得するにはどうすればよいですか？ - スタックオーバーフロー](https://stackoverflow.com/questions/31641522/how-to-get-contact-points-from-a-trigger)
[Unity 指定した座標がコライダー内部にあるか判定する - おねむゲーマーの備忘録](https://sleepygamersmemo.blogspot.com/2018/05/unity-point-inside-collider.html)

[【Unity】物理演算を(なるべく)行わずにオブジェクトの衝突位置を取得する方法 \| ゴマちゃんフロンティア](https://gomafrontier.com/unity/2213)

#### KinematicとStaticの衝突判定
設定から少し変えれば衝突を拾ってくれるようになるらしい。
ただ、そもそもKinematicで衝突させるには**Rigidbody.MovePosition**で物体を移動させるなどのひと工夫が必要。いつも通りtransform.positionでやるとすり抜けてしまう。**なおtransform.positionは別の話。**

[キネマティックリジッドボディにリジッドボディのないコライダーとの衝突を検出させる-UnityAnswers](https://answers.unity.com/questions/209656/having-a-kinematic-rigidbody-detect-collision-with.html)
[Physic Manager> Contact PairsModeは変更を加えていないようです\[2018.1.9f2\] -Unityフォーラム](https://forum.unity.com/threads/physic-manager-contact-pairs-mode-doesnt-seem-to-make-any-change-2018-1-9f2.562231/)
[\[Unity初心者Tips\]どれが良いかわかる！ものを動かす方法はこうして決める - Qiita](https://qiita.com/JunShimura/items/ab243cbd29e63e4f27c5)
[Unityでプレイヤーを移動させるときは、本当にAddForceが良いのか - Qiita](https://qiita.com/yuki2006/items/a60fc92e033dddcb3a83)
[Rigidbody-MovePosition - Unity スクリプトリファレンス](https://docs.unity3d.com/jp/current/ScriptReference/Rigidbody.MovePosition.html)

ただ、どうやら今はチェックを入れる場所が違うっぽい。
KinematicにしたRigidbody2Dの設定項目にuse FullKinematicContactというのがあり、これをONにすれば使える。
[Unity-マニュアル：Rigidbody 2D](https://docs.unity3d.com/Manual/class-Rigidbody2D.html#UseFullKinematicContactsProperty)

ちなみに、当然だが**Kinematicなのですり抜ける。**
止めたいならDynamic一択。

### Freeze Position
スクリプトによる操作も受け付けなくなる。

## public static な Scriptable
このクラスが持つフィールドもすべてstaticにすることになる。
すると、そのオブジェクトが存在していようがいまいが常にメモリに残り続けることになる。メモリ圧迫になるので止めろ。

## 重み付きランダム
  ```csharp
float Choose (float[] probs) {

	float total = 0;

	//渡されたfloat配列をすべてtotalに足す
	foreach (float elem in probs) {
    	total += elem;
	}
	//ランダムな値とtotalをかける
	//これは全確率に対してランダムにダーツを投げたのと同じ
	float randomPoint = Random.value * total;

	//float配列の数だけ繰り返す
	for (int i= 0; i < probs.Length; i++) {
    	//もしランダム値とトータルの掛け算が現在のfloat配列に当たるなら、floatを返す
    	if (randomPoint < probs[i]) {
        	return i;
    	//存在しないなら、現在のfloat配列ぶんランダム値を引く
    	else {
        	randomPoint -= probs[i];
    	}
	}
		
	//どこにも存在しないなら、float配列の最後の値を返す
	return probs.Length - 1;
}
```

確率の値を用意し、そのすべてを足し合わせ、0からその合計まででランダムな値を出す。
そしてランダムな値より確率の値が大きいとき、その確率の値を返す。小さいならランダムな値から確率の値を引く。イメージはテープをどんどん切ってく感じ。

この方法だと、確率は**合計が100でなくてもいい。**
全体に対する双対的な大きさが重要になる。

[ランダムなゲームプレイ要素の追加 - Unity マニュアル](https://docs.unity3d.com/ja/2018.1/Manual/RandomNumbers.html)
[【Unity】UnityのRandomを使って重み付き抽選を実装するサンプル │ エクスプラボ](https://ekulabo.com/random-with-weight)

ただ、これは離散確率変数なので、10-100の間でランダム値、さらに重みづけ、とかしたいときにできない。（連続確率変数）
それをやるならAnimationCurveを使う。

[【Unity】なんとカーブと乱数を使って確率を決められるらしいぞ! │ エクスプラボ](https://ekulabo.com/random-in-curve)

## 辞書から最大値や最小値を検索
[【C#】Dictionary から最大値や最小値を持つ要素を検索する方法 - コガネブログ](https://baba-s.hatenablog.com/entry/2019/09/09/215900)
[【LINQ】FirstOrDefaultでリストの最初の要素を取得する \| さんさめのC＃ブログ](https://threeshark3.com/linq-firstordefault/)

## Post Process
そのエフェクトをかけるカメラにPost-process Layerをつけ、エフェクトをかけるレイヤーを指定する。カメラとレイヤーの二つの制限をここでかける。
Triggerはしらん。ここで指定したオブジェクトがEnableになったらエフェクトをかけるようにする、とかだろうか。

次に、適当なオブジェクトにPost-process Volumeをつける。Canvasにじかに付けてもいいし、管理用に別オブジェクトに付けても構わない。ただしLayerで指定したレイヤーのオブジェクトじゃないと機能しない以上、これをつけたオブジェクトには必ずエフェクトがかかることには注意。

[【Unity】ポストプロセシング(Post-Processing)を使ってプロ級の画面に │ エクスプラボ](https://ekulabo.com/post-processing)

### Bloom
光らせるための処理じゃなく、**粉塵を飛ばして光を目立たせる**ような処理であることは留意する。HDRカラーで眩しさを設定しないと光らない。

## カメラの表示をレイヤー的に重ねたい
Depth調整。そしてDepth Onlyにすれば透ける。
[Unity3Dで、カメラを複数使ってレイヤー表示みたいにする方法 \| ssdkfk](https://ssdkfk.wordpress.com/2014/01/16/unity3d%E3%81%A7%E3%80%81%E3%82%AB%E3%83%A1%E3%83%A9%E3%82%92%E8%A4%87%E6%95%B0%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%AC%E3%82%A4%E3%83%A4%E3%83%BC%E8%A1%A8%E7%A4%BA%E3%81%BF%E3%81%9F%E3%81%84%E3%81%AB/)

## 動画を光らせたうえでクロマキーしてαを調整したい
1. RenderTextureをCreateしておく
2. Unity公式ページから、自分のバージョンのUnityのビルトインシェーダーをダウンロードする
3. UI-Default.shaderをプロジェクトに導入し、編集する。シェーダーの名前、PropertyにHDRのColor変数、float3の同名変数を設定して、OUT.color.rgbに変数を+=で足し合わせればいい。
4. できたシェーダーをアタッチしたMaterialを用意

一旦ここまで。次は実際にUnity世界を光らす。

5. PostProcessingをPackageManagerからインストール。（光らす用のパッケージ）
6. カメラにPost-process Layerを取り付け、Layerにエフェクトが影響するレイヤーを設定
7. Canvasを追加（RenderTextureはUI要素なので、Canvasがないと表示されない）
8. Canvasの子にRawImageオブジェクトを追加
9. CanvasとRawImageのLayerをさっきPost-process Layerで指定したレイヤーに変更
10. 適当なオブジェクト（Canvasでもいい）にPost-process Volumeを取り付ける
11. Profile→New、Add Effect→Unity→Bloomで光る

	ここまででBloomのIntensityを上げてみて、画面全体が光ればOK。
	ここから光を動画だけにまとめる。

12. RawImageオブジェクト内にVideoPlayerを取り付ける
13. VideoPlayerのVideoClipに動画を設定
14. RenderModeをRenderTextureに（動画を加工できるよう、RenderTextureを介してRawImageに表示する）
15. TargetTextureに予めCreateしておいたRenderTextureを設定
16. RawImageのTextureに同じRenderTextureを設定
17. RawImageのMaterialに、初めに作ったMaterialを設定

ここまでで、シェーダー内に用意した値をInspectorからいじれば光具合が調整できるようになる。
最後にクロマキーとαシェーダーをこのシェーダーに追加。以下のコードをうまいこと追加する。

```shader
Shader "UI/Glow"
{
	Properties
    {
        _KeyColor("Key Color", Color) = (0,1,0)
        _Near("Near", Range(0, 2)) = 0.2
        _Opacity("Opacity", Range(0, 1)) = 0.0
    }
	
	SubShader
	{
		Pass
        {
		CGPROGRAM
		
			struct v2f
            {
                float4 vertex   : SV_POSITION;
                fixed4 color    : COLOR;
                float2 texcoord  : TEXCOORD0;
                float4 worldPosition : TEXCOORD1;
                half4  mask : TEXCOORD2;
                UNITY_VERTEX_OUTPUT_STEREO
            };
		
			half _Opacity;
            fixed3 _KeyColor;
            fixed _Near;

            fixed4 frag(v2f IN) : SV_Target
            {
                half4 color = (tex2D(_MainTex, IN.texcoord) + _TextureSampleAdd) * IN.color;

                fixed4 c = tex2D(_MainTex,IN.texcoord);
                clip(distance(_KeyColor, c) - _Near);
                color.a = c.a;
                color.a = _Opacity;
              
                #ifdef UNITY_UI_CLIP_RECT
                half2 m = saturate((_ClipRect.zw - _ClipRect.xy - abs(IN.mask.xy)) * IN.mask.zw);
                color.a *= m.x * m.y;
                #endif

                #ifdef UNITY_UI_ALPHACLIP
                clip (color.a - 0.001);
                #endif

                return color;
            }
        ENDCG
		}
    }
}
```

keycolor, near, opacityを置いた後、clipで作った画像でα抜き、return予定のcolor変数のα値である.aに.aを追加する。その後改めて透明度を追加。
元コードがsurfaceに対してこちらではfragmentを使うため、uv_テクスチャ名が使えない。代わりにv2f構造体に入ってるTEXCOORD0を使用する。

ここまでできれば、抜け具合をkey-colorとnear、透明度をopacity、光をEmissionとPost-process VolumeのBloomで調整できるシェーダーが完成する。ﾅｶﾞｶｯﾀ

[\[Unity\]uGUIをBloomを使って光らせ、EmissionColorも設定できるようにする - Qiita](https://qiita.com/flankids/items/eae9d28fc96ca2bd39c4)
[アルファチャンネルでない動画をUnityでクロマキー処理して再生する \| パティオ](http://patio.work/archives/1208)
uvどこだよってなった時に見つけた
[サーフェスシェーダーでfloat4uvを有効にする方法は？ -Unityフォーラム](https://forum.unity.com/threads/how-to-enable-float4-uv-in-surface-shader.490908/)

けっきょくいらなかった、スクリプトでα制御する奴
[Unity画面にウェブカメラの画像を半透明で重ねて表示 \| STYLY 開発者ブログ -STYLY Developer's Blog-](https://psychic-vr-lab.com/blog/unity/unity%e7%94%bb%e9%9d%a2%e3%81%ab%e3%82%a6%e3%82%a7%e3%83%96%e3%82%ab%e3%83%a1%e3%83%a9%e3%81%ae%e7%94%bb%e5%83%8f%e3%82%92%e5%8d%8a%e9%80%8f%e6%98%8e%e3%81%a7%e9%87%8d%e3%81%ad%e3%81%a6%e8%a1%a8/)

他の光らす方法
[unity3d - Opacity in Unity Shader - Stack Overflow](https://stackoverflow.com/questions/46478191/opacity-in-unity-shader)
[【Unity】目やパーツの一部を光らせる - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2015/09/10/233000)
[【Unity】Fragment ShaderにEmissionを適用する - Qiita](https://qiita.com/broken55/items/eba5f80accd7da35d24a)


## ボタンでシーン読み込み
オブジェクトに読みたいメソッドを書いたクラスを貼り付け、ボタンのOnClickに登録すればいい。
貼り付ける以上、**MonoBehaiviourは必要。**

[【Unity】ボタンを押したら任意のシーン（scene）を読み込みようにする方法 \| Unishar-ユニシャー](https://miyagame.net/button-read-scene/)

## typeof()とGetType()
### typeof
言語機能。**コンパイル時に決まっている型しか取れない。**

### GetType()
たぶんメソッド。**内部でリフレクションを使うので遅い。**

## RunTimeType
Typeに対してGetType()を実行すると取れる、Typeの具象クラス。
しかし**GetComponent\<\>()したものにGetTypeを実行**しても取れる。まあ確かに中身はクラスだ。
そしてこのRunTimeType、Type型に入るくせに**変数に入れていてもセーブされない。** 普通に困る。

なので、「オブジェクトにくっついてるクラスを別オブジェクトに持っていきたい」ときは、MonoBehaviour型にでも入れておこう。

[GetComponent.\<T\> () and System Type.GetType() - Unity Forum](https://forum.unity.com/threads/getcomponent-t-and-system-type-gettype.184667/)

stringからクラス名にする手もある。
[c# - How to convert string to any type - Stack Overflow](https://stackoverflow.com/questions/2922855/how-to-convert-string-to-any-type)
[【Unity】クラス名からTypeを取得する - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2016/11/25/235315)

[リフレクション-C＃のSystem.TypeとSystem.RuntimeTypeの違いは何ですか？ - スタックオーバーフロー](https://stackoverflow.com/questions/5737840/whats-the-difference-between-system-type-and-system-runtimetype-in-c)

[c# - Test if Convert.ChangeType will work between two types - Stack Overflow](https://stackoverflow.com/questions/1399273/test-if-convert-changetype-will-work-between-two-types/4102028#4102028)
[Convert.ChangeType メソッド (System) \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/api/system.convert.changetype?view=net-6.0)
[TypeConverter クラス (System.ComponentModel) \| Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/api/system.componentmodel.typeconverter?view=net-6.0)
## Light2D
2D世界でlightを使うシステム。
URPで使える。

使うにはURPのグラフィック設定を上書きする必要がある。
Create -> Rendering -> Universal Render Pipeline -> Pipeline Assetで出来たScriptableObjectにCreate->Rendering->URP-> 2D Renderをデフォルトとして割り当て、Edit->Project Setting->Graphics->Scriptable RP SettingsにPipelineを割り当てる。

[Can't use URP 2D Lights - Unity Answers](https://answers.unity.com/questions/1719967/cant-use-urp-2d-lights.html)
[I can't use 2D lights - Unity Answers](https://answers.unity.com/questions/1763451/i-cant-use-2d-lights.html)
[2D Lights greyed out, only have experimental 2D renderer in create menu : Unity3D](https://www.reddit.com/r/Unity3D/comments/fc54t2/2d_lights_greyed_out_only_have_experimental_2d/)
[初めてのライト操作!初心者のためのURP導入 Unity2D \| workpress](https://walkable-2020.com/unity/urp-unity2d/#toc9)

### 古いウィンドウズみたいにスプライトが重なる
画面更新されてないのが問題なので、背景を設置する。


## Addressable
[Resourceフォルダはアプリが重くなったり追加ロードできなかったり](../アセット読み込み.md)で非推奨なので、AssetBundleが使いたい。けど使うのがめんどくさい。
そこで、Resourceに代わる新たなアセット読み込み方法として出てきた技術。2018.3以降。

[【Unity】僕はそろそろResourcesフォルダを卒業しようと思う - LIGHT11](https://light11.hatenadiary.com/entry/2020/07/29/202755)
[Addressable Assets Systemを完全に理解する - Qiita](https://qiita.com/k7a/items/b4fd298bcb64dc968ad1#%E3%83%97%E3%83%AD%E3%83%95%E3%82%A1%E3%82%A4%E3%83%A9%E3%81%A7%E3%83%AD%E3%83%BC%E3%83%89%E7%8A%B6%E6%B3%81%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)
[ResourcesのシンプルさとAssetBundleの自由度を実現したAddressable Assetsとは【Unity】【Addressable Assets】【Unite 2018 Tokyo】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/Addressable_Assets)
[ResourcesのシンプルさとAssetBundleの自由度を実現したAddressable Assetsとは(脱Preview記念リライト)【Unity】【Addressable Assets】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/Addressable_Assets_Rewrite)
[Addressable Assets Systemをちゃんと導入するための技術検証まとめ – てっくぼっと！](https://blog.applibot.co.jp/2020/06/15/introduce-addressable-assets-system/)

名前を変えてもパスで同じくアクセスできたり、プロファイラがあったり、サーバとローカルの読込先をカンタンに変えられたりするのが強み。
**読み込みが非同期**であることと、アセットの登録と**ビルド**が必要であることに注意。
アセット登録は結構手作業なので、短縮したいならEZAddresserを使う。
ちなみに右クリックでSimplifyできる。

[Haruma-K/EZAddresser: Automatic addressing system for Unity Addressable Asset System.](https://github.com/Haruma-K/EZAddresser)
[\[Unity\] Resources.Loadの代わりにAddressable Asset Systemを使ってみる - Qiita](https://qiita.com/Temo_Yamada/items/92e041fc3eb4965675e3#%E3%83%AD%E3%83%BC%E3%83%89%E3%81%97%E3%81%9F%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%92%E8%A7%A3%E6%94%BE%E3%81%99%E3%82%8B%E8%A8%98%E8%BF%B0)

1.17以降なら同期ロードもできる。しかし一つの処理に同期ロード指定しても、**全てのロードが終わるまで待機する**仕様があるので使うならよくよく考える。  
表記には三行必要なので、短縮したいならAddlerを入れる。

[【Unity】Addressableアセットシステムで同期ロードが公式サポート、Resources.Loadを置き換え可能に - LIGHT11](https://light11.hatenadiary.com/entry/2021/04/13/194929)

[Haruma-K/Addler: Preloading, Pooling, Lifetime Management for Unity Addressable Asset System.](https://github.com/Haruma-K/Addler)

また0.6.6で大きく仕様が変わったらしく、調べても新しい名称が出ないことがある。
ざっくりとした名称はこちら。
[めんどくささから解放！AddressableAssetSystemの最新情報と使える小技！ - Qiita](https://qiita.com/rabbitbooster/items/f7ae7f4b781ffc24aac9#addressablespreloaddependencies%E3%81%AE%E5%90%8D%E5%89%8D%E3%81%AE%E5%A4%89%E6%9B%B4066%E4%BB%A5%E9%99%8D)

### 流れ
Addressableにアセットを登録し、パスを編集してスクリプトから非同期で読みだす。
オブジェクト破棄時など、Releaseを忘れず。
### 非同期操作
そのままだと読み込みが終わらないうちに処理が進んでしまうので、.Completedコールバックを使うか、awaitで.taskを待つか、コルーチンを使うか。
ちなみに**WebGLはマルチスレッドが使えないのでawaitできない。**

[非同期操作の処理\| アドレス可能\| 1.5.1](https://docs.unity3d.com/Packages/com.unity.addressables@1.5/manual/AddressableAssetsAsyncOperationHandle.html)
[【Unity】Addressableアセットシステムで同期ロードが公式サポート、Resources.Loadを置き換え可能に - LIGHT11](https://light11.hatenadiary.com/entry/2021/04/13/194929)
[アドレス可能なアセットの読み込み\| アドレス可能\| 1.18.19](https://docs.unity3d.com/Packages/com.unity.addressables@1.18/manual/LoadingAddressableAssets.html)

### Group
#### Content Update Restriction
アプリを更新しないと更新できないリソースかどうか設定する項目。
これをCannotにすると、リソースビルド時にNew Buildにしないと更新されない。

この設定はダウンロードコンテンツ用にある。詳細はこちら。
[【Unity】【Addressable】Addressableアセットシステムにおけるコンテンツ更新ワークフローまとめ - LIGHT11](https://light11.hatenadiary.com/entry/2021/01/13/203111)

### LoadAssetAsync
LoadAssetの新記述。たぶん、非同期であることをより明確に示すために変わった。
**アドレスとラベルは区別されない**。key指定にはどちらも入る。そのため、アドレスとラベルが被ると**意図しない読み込みが発生する。**

### LoadAssetsAsync
複数版。必ずコールバックを渡す必要がある。要らないならnull。
本当に"s"を追加しただけであり、非同期なせいでどれが最初のオブジェクトになるかわからない。

[【Unity】Addressablesのラベル機能を使ってアドレスをグループ化する - LIGHT11](https://light11.hatenadiary.com/entry/2020/01/09/215543#%E3%83%A9%E3%83%99%E3%83%AB)
[Addressableでラベルを使って複数のアセットバンドルを一括で読み込みたい - ロバメモ - 素人のUnity覚書と奮闘記](https://robamemo.hatenablog.com/entry/2021/01/09/102629)

### アセットの登録関係
バンドルをまたいで依存関係がある場合は、自動的に一緒にロードしてくれる。

### DownloadDependenciesAsync
旧名PreloadDependenciesAsync。**こっちで検索しないと出ない情報もある。** 0.6.6以降で変わる。
アセットをプリロードして、実際にロードする時間を短くする機能。第一引数にはアドレスかラベル、第二引数はプリロードしたものを直後にアンロードするかどうかのboolを渡す。

[Addressable Assetsで事前ロードしたい :: Kuro Tech Blog — 調べたもの置き場](https://kurokuru.github.io/posts/20191029_01/)
[【Unity】Addressable Asset System で事前ダウンロードする方法 - コガネブログ](https://baba-s.hatenablog.com/entry/2020/03/19/042000_1)

内部的には一度LoadAssetAsyncしてReleaseしてるだけらしい。
ソースを見たが
```csharp
else
{
    var handle = LoadAssetsAsync<IAssetBundleResource>(GatherDependenciesFromLocations(locations), null, true);
    if (autoReleaseHandle)
        handle.Completed += op => Release(op);
    return handle;
}
```
こんな感じなのでたぶんマジ。
なら何の意味があるのかという話だが、これはDLCの更新時に必要。DLCだけ更新しても、リクエストが出されるまでローカルの情報は更新されない。
このメソッドを実行すれば、ローカルにキャッシュが残るので次からDLする必要が無くなり速くなる。

[【Unity】【Addressable】Addressableアセットシステムにおけるコンテンツ更新ワークフローまとめ - LIGHT11](https://light11.hatenadiary.com/entry/2021/01/13/203111)

### AssetReference
読み込むアセットをInspectorから指定できるようにするとき、シリアライズする型。
ポップアップから選べる。

### AssetReferenceT
AssetReferenceTypeRestrictionの代替。
膨大なアセットをAssetReferenceから選ぶのは（検索機能があっても）非現実的なので、元はAssetReferenceTypeRestrictionで型を指定していた。
しかし0.6.6で廃止されたので、代わりにこれを使う。

といってもこれはメソッドではなく、ジェネリッククラス。Unityでは**ジェネリックを使用したクラスはシリアライズできない**ので、これを継承したクラスをつくりAssetReferenceの代わりに使う。

[【Unity】AddressableAssetSystemのAssetReferenceで、一覧表示するアセットを任意の型に制限したい - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2019/04/02/233528)

ここにも書いてるが、AssetReferenceLabelRestrictionも廃止された。こちらは今はAssetReferenceUILabelRestrictionとしてアクセスできる。

### ClearDependencyCacheAsync
指定されたキーとその依存関係において、キャッシュされたAssetBundleを消す。アプリの容量をコントロールするメソッド。
注意点として、**現在のコンテンツカタログ**で動くので、コンテンツカタログを更新してしまうとうまく消去できない。その場合は期限切れになるまでキャッシュが残り続ける。

## PrefabUtility.GetPrefabInstanceHandle
そのオブジェクトが何のPrefabから生成されているかを返してくれるメソッド。
すごい役に立つかと思いきや、**PrefabUtilityがUnityEditorのクラスであること**、**Prefab自体は返さないのでInstantiateできないこと**、**一番親のPrefabのデータを返すこと**が相まってあまり使えない。
元の用途は二つのオブジェクト同士で実行し、戻り値を比較することで同じPrefabかどうか調べるもの。

[Unity - Scripting API: PrefabUtility.GetPrefabInstanceHandle](https://docs.unity3d.com/ScriptReference/PrefabUtility.GetPrefabInstanceHandle.html)
[c＃-プレハブとGameObjectを比較するにはどうすればよいですか？ - スタックオーバーフロー](https://stackoverflow.com/questions/52106661/how-can-i-compare-a-prefab-and-gameobject)
## MatCap
別にUnityに限った話じゃないが。
ライティングの結果を**テクスチャから受け取る**手法。光の加減に関係なく陰影をつけることが出来る。

注意点として、ライトの影響を基本受けないこと、視点に寄らずライトの方向が一定になることなどがある。
それでも極めれば肌すら作れる、結構すごい技術。

[【Unity】Matcap、事前に用意した綺麗な光表現を利用する - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2016/06/30/073000)

## Assembly Difinitions
別々のアセンブリにモジュールを分割、管理できる機能。

[Unity Assembly Definition 完全に理解した - Qiita](https://qiita.com/toRisouP/items/d206af3029c7d80326ed)
[【Unity】Assembly Definition Filesという神機能 - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2018/01/18/212834)

### 初めに
差分ビルドでコンパイルが早くなること、特定のプラットフォームでのみコードを有効化できること、ライブラリ干渉を最小限にできることなどが利点。最後のは**名前空間やクラス名が被っても問題なくなる。**

adfを使い始めると、従来のアセンブリは全てAssembly-CSharpという一つのdllにまとめられる。adfはこれを分割していく。

adfでは個々のアセンブリに関して参照関係を設定する必要がある。
設定した参照関係に対して**逆方向の参照や、参照からの参照は不可。** 常に明示的に設定しないと参照できない。

また、Assembly-CSharpからは**全てのアセンブリを参照できる**が、**全てのアセンブリから参照できない。**

### 使い方
分割したいファイルが入っているディレクトリ内に、adfファイルを置くだけ。
### 設定
#### Auto Referencced
チェックが入っているとAssembly-CSharpから参照されるため、常にコンパイルされる。

#### Define Constrains
Player Settingsでビルドするかどうか決められる。


ちなみにこの技術が入ったことにより、なかなか[やばいこと](CS_and_SR/Csharp%20Cheat%20Sheet.md###internal)ができるようになっていたりする。よっぽど突っ込んだことやらないと関係ないけど。
## SerializableクラスのSerializeField Color変数が保存されない
newするからじゃないですかね。
newするとクラスから新たなインスタンスが作られる。
つまり**クラス内に存在しない、Unityで用意したデータは使われない**ということになる。
だからsingletonとかScriptableObjectとかJsonとかいろいろ使って**最初に読み込むし**、MonoBehaviourつけたやつはNewするなって怒られる（SerializeFieldがついてたら初期化してしまうから）んですね。

実際、Serializableクラスを書いて、その変数をSerializeFieldにするだけでnewをしていないと初期化はされない。
intでもstringでも問題ない。

対処法はクラス外に書くか、staticにするか、ScriptableObjectやJSON使うか、コンストラクタで初期化するくらいだろうか。

Colorがシリアライズできないという、2014年くらいの問題は全く関係ない。今のUnityは普通にシリアライズできる。

[Colorをシリアル化できません。 --Unity Answers](https://answers.unity.com/questions/772235/cannot-serialize-color.html)
## SceneLoad時に読み込む関数のデリゲート
Unity側ですでに用意されている。
SceneManager.sceneLoadedに関数を追加してやればいい。

アンロード時ならSceneManager.unSceneLoaded、
ロードとアンロード両方ならactiveSceneChanged。

[【Unity】シーンの切り替えを検出するイベント | TECH PROjin](https://tech.pjin.jp/blog/2018/10/24/unity_scene-manager_event/) 
[自分用Unityメモ：シーンロード時に処理を行う - かさたな日記](https://kasatanet.hatenablog.com/entry/2017/05/27/134721)
## DOVirtual.DelayedCall
Invokeみたいなやつ。
ラムダ式で指定するので引数も使える。
## URP世代のBloom
**URPそのものにPost Processing機能が含まれている。**
使い方は簡単、Volumeを用意しAdd OverrideからBloomを選ぶだけ。

従来のポスプロとは**互換性は無い**。こちらを使うのみ。
なお、一部だけ光らす場合はThresholdをHDRに合わせるしかないっぽい。ボリュームマスクを合わせれば行けるという話もあるが？

[URPの後処理ボリュームは特定のレイヤーで機能しますか？ --Unity Answers](https://answers.unity.com/questions/1678506/can-postprocessing-volume-in-urp-work-on-specific.html)

[【Unity】PostProcessingStackのBloomで「特定の物体だけ」を光らせる方法 - のたぐすブログ](https://notargs.hateblo.jp/entry/how_to_bloom) 
[【Unity】URPでポストプロセス(Post-processing)を使う手順 - はなちるのマイノート](https://www.hanachiru-blog.com/entry/2020/05/09/180000#%E4%BD%BF%E3%81%84%E6%96%B9)
[ひかりものを表現する | hassakulab.com](https://hassakulab.com/knowledges/unity-bloom/)
[Unity URP のポストプロセッシング｜npaka｜note](https://note.com/npaka/n/n82d906257509)

今までのも使えないわけじゃないらしいが、互換性機能。

[【Unity】UniversalRPでカスタムポストプロセスを作る【ZoomBlur】 - Qiita](https://qiita.com/t-matsunaga/items/09343ae7c683269374c4)
## Vector3Int.FloorToInt
Vector3をVector3Intに変えるメソッド。
名前の通りこれは切り捨て。切り上げや銀行家の丸めが使いたいときはそれぞれCeilToIntやRoundToIntが存在する。

[Vector3からVector3Intおよびその逆-UnityAnswers](https://answers.unity.com/questions/1751499/vector3-to-vector3int-and-vice-versa.html) 
[【Unity】Mathfの切り上げ、切り捨て、偶数丸め。使い分けが大事よね │ エクスプラボ](https://ekulabo.com/mathf-round)

## オブジェクトプール
別にUnityに限らないが、ゲームあるある。
オブジェクトの生成と破壊はコストが高いため、先に非アクティブの弾を用意。使用時だけアクティブにして使う。
加えて、画面外に入った弾は非アクティブにして使いまわそうという案。**2021から標準機能で実装された。**

[[Unity]簡単にオブジェクトプールを作る - Qiita](https://qiita.com/NekoCan/items/e3908b8e4e91b95d726a) 
[Unity 2021から利用できるUnity標準のオブジェクトプールについて | Yucchiy's Note](https://blog.yucchiy.com/2021/04/objectpool-in-unity-2021/)

## 現在のシーン名
SceneManager.GetActiveScene().name。
[【unity入門】現在のScene名を取得する方法 | もぎブログ](https://mogi0506.com/unity-scene-name/)
## Transform.localPosition
親がいるときに子の座標で移動したい、ってときにつかうやつ。
これを使う前はいちいち親ポジションから自分の場所を計算していたので、移動スピードが間に合わず親が先にぶつかることがあった。
## GameObject.FindWithTag().GetComponent\<\>();
**FindWithTagがnullだとそのままエラーになる。**
エラーを防ぐために、いったんFindWithTagで拾ったものを変数に入れてnullチェックしておくといい。
## イベントドリブン
何かの処理が起きた時、同時に処理を走らせるもの。
仕組みは単純。
1. Actionに関数を入れる
2. 処理の最後にAction?.Invokeを入れる
これで関数を実行した際にActionが一緒に実行される。
計算コストが抑えられるが、**後から状態だけ変更した際なんかに監視できずうまくいかなかったりする。**
## Object .FindObjectOfType
普通のFindよりも広く、初めに見つけたアクティブなTypeを返す関数。
言うまでもなく超遅いので、

[Object-FindObjectOfType - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/Object.FindObjectOfType.html)

## RigidBodyの固定変更
`rigidbody.constraints`にEnum型であるRigidBodyConstraintsを代入すればいい。
ただし、これらだけだと「X軸と回転」の固定などに対応できない。その辺の複合Freezeは**|を使いOR演算で生成する。**

[Unity で rigidbody の位置,回転の固定をスクリプトから変更する | Lonely Mobiler](https://loumo.jp/archives/6404)

## Camera Stacking
オーバーレイカメラをどのカメラに重ねるか選べるURP機能。
**複数のカメラに同じオーバーレイカメラを設定することもできる。**

[Camera Stacking | Universal RP | 7.2.1](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@7.2/manual/camera-stacking.html)

## 壁越しのUI
普通にカメラスタッキングを利用して別カメラに映したものをオーバーレイする。

[Unity UI設定：RenderModeについて Screen Space Overlay , Screen Space Camera , Screen Space World - Qiita](https://qiita.com/flyaway2525/items/3b8414808fc1c50f683e)

Render Textureを使う方法もあるが、重い。

[【Unity】ScreenSpace OverlayなCanvas上に3Dモデルを表示する - げぇむぷろぐらみんぐ](https://siguma-sig.hatenablog.com/entry/2018/09/08/232654)

## Input.anyKey
あらゆるキーに対して押されているかどうかを確認する。

[Input-anyKey - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/2018.4/ScriptReference/Input-anyKey.html)

## Awake Start OnEnable
オブジェクトが無効だと呼ばれない。
### Awake
- スクリプトを無効にしても呼ばれる。一度だけ。
- Instantiateした時点で関数処理に割り込んで呼ばれる。

### Start
- Awake、OnEnableが終わった後、最初の画面更新が行われる前に呼ばれる。

### OnEnable
- アクティブ化した時点で関数処理に割り込んで呼ばれる。何度でも。
- Instantiateした時点で関数処理に割り込んで呼ばれる。

[UnityのAwakeとStartとOnEnableの違いを検証 | ゲームの作り方！](https://dkrevel.com/unity-explain/how-to-call-start-awake-onenable/)