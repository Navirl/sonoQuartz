---
date: 2023-03-30
tags:
 - Info
---

up:: [Programming](<../Bar/Program/Programming.md>)

設計は仕様変更に対して変更箇所を定めるための道具である。

[【ゲーム開発】Unity設計完全に理解した！ 〜 設計の役割・性質・コスト【C#】 - Qiita](https://qiita.com/su10/items/6f3f5475b779974f51d0)

レアケースだろうとテストしやすい形を作るための設計思想。
いくつかの変遷を経て、クリーンアーキテクチャが最新版。

古い方から順に追うとむしろわからなくなるという罠がある。そりゃ当時と状況違うし。ヘキサゴナルから触っていった方が無難。

全てにおいて、外側レイヤーの型を参照してはいけないという制限事項がある。




## レイヤードアーキテクチャ
ドメイン駆動設計で出た奴。
UI、Application、Domain、Infrastractureを用意し、上から下にだけ依存する。

ドメイン駆動設計はアーキテクチャではなく、ドメインが大事だからちゃんと育てろと言うことを語る設計思想。レイヤードアーキテクチャは最初にちらっと映る。
ちなみにレイヤードアーキテクチャは前からあり、ドメイン駆動設計の奴はその改良版。

Infrastractureにdomainが依存してるという問題あり。これだとライブラリが変更されたりデータベース切り替えたりしたときにロジック変更が増える。

[なぜDDD初心者はググり出してすぐに心がくじけてしまうのか - little hands' lab](https://little-hands.hatenablog.com/entry/2017/09/24/005903)
[ドメイン駆動設計の定義についてEric Evansはなんと言っているのか[DDD] - little hands' lab](https://little-hands.hatenablog.com/entry/2017/09/27/014403)
[モデルでドメイン知識を表現するとは何か[DDD] - little hands' lab](https://little-hands.hatenablog.com/entry/2017/10/04/201201)

## ヘキサゴナルアーキテクチャ
ドメイン駆動設計のアーキテクチャの洗練版。
ユーザーもしくはテストコード、アプリケーションコア、データベースがそれぞれのアダプタで接続されている。ユーザとデータが直接くっつくことはない。アダプタは何個あってもいい。

[ヘキサゴナルアーキテクチャ(ポートアンドアダプター)とは何か - Qiita](https://qiita.com/cocoa-maemae/items/b08c4cf95d47e314e2dc)

## オニオンアーキテクチャ
ヘキサゴナルを直感的にわかりやすくしたやつ。
UI、Infrastracture、Testsを第一層。Application Serviceを第二層、Domain Serviceを第三層、Domain Modelを第四層とし、上から下にだけ依存する。

UIやテストから入っていき、App、Service、Modelを通り、またModel、Service、Appを通ってInfrastractureから出る。ヘキサゴナルと同じ。


[オニオンアーキテクチャとは何か - Qiita](https://qiita.com/cocoa-maemae/items/e3f2eabbe0877c2af8d0)
[[DDD]ドメイン駆動 + オニオンアーキテクチャ概略 - Qiita](https://qiita.com/little_hand_s/items/2040fba15d90b93fc124)

## クリーンアーキテクチャ
今一番流行ってる設計思想。いろいろ名称が設定された。
一層目はUI、Infrastracture、Testsなんかを纏めてFrameworks & Drivers、二層目はInterface Adapters、三層目はApplication Business Rules、四層目はEnterprise Business Rules。

Enterprise Business Rulesはビジネスロジック。エンティティが入る。ソフトウェアが無くても存在するアクション。
Application Business Rulesはソフトウェアに何が出来るか。interfaceであり、ユースケースが入る。ソフトウェアがあって初めて存在するアクション。
Interface Adaptersは入力、永続化、表示。インフラはここ。入力は上のFrameworks & Drivers層からApplication Business Rulesに伝えるためのController。永続化はデータを保存するためのRepository=Gateway。表示は入力の反対で情報を表示するためのPresenter。
Frameworks & Driversはフレームワーク動かしたりデータベース操作したり、その時々で変わるギーク部分。

同心円には書いてないが、Application Business Rulesのinterfaceが指す実クラスはEnterprise Business Rules**ではなく**、Interactorというものを指す。これはあくまでEntityの調整を行う。

書いてないものはもう一個ある。それがUseCase、Repository、Presenter、Controllerの実クラスを定義する部分。ここはDIContainerを用意して、プログラミング起動時やクラス使用時にどのクラスを使うのか決めておく。

最後にView。Presenterで整形した情報、ViewModelを表示するだけの部分。
ここはフロントエンドの都合で良く実装が変わるのでご自由に。

最低限重要なのは、四層ビジネスロジックが二層インフラに依存しないこと。
そして二層プレゼンテーション層のコードが四層ビジネスロジックに混じらないようにすること。
これでビジネスロジックを独立させ、モジュール化して使いまわせる知識にするのが目的。テストが容易になるのはその副産物だけど職場的には大体後者が有りがたい。

[実装クリーンアーキテクチャ - Qiita](https://qiita.com/nrslib/items/a5f902c4defc83bd46b8#%E7%9F%A2%E5%8D%B0%E3%81%AE%E6%96%B9%E5%90%91)

ついでにドメイン駆動設計の話になるが、引数は必ず見て分かるもの、構造体など名前の付いたものを受け取ること。