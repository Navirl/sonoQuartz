---
date: 2021-07-28
tags:
 - Bar
---

up:: [Programming](<./Programming.md>)
same:: [PlantUML](<./PlantUML.md>)

[About Mermaid | Mermaid](https://mermaid.js.org/intro/)

ライブエディタ。
[Online FlowChart & Diagrams Editor - Mermaid Live Editor](https://mermaid.live/edit#pako:eNpVjk1rhEAMhv9KyKmF9Q94KHS13ctCC92b4yFodIY6H4wZlkX97x3rpc0p4XnelyzY-Z6xxGHy905TFLjVykGe16bS0cxiaW6hKF7WCwtY7_ixwvnp4mHWPgTjxufDP-8SVMt11xhEG_e9Haj6zX84XqFurhTEh_Yvud39Cm-N-dS5_j_RkXPqvRmoHKjoKEJFscUTWo6WTJ9fX_aAQtFsWWGZ154HSpMoVG7LKiXxXw_XYSkx8QmjT6PG3DfN-UqhJ-Ha0BjJHsr2A4ifWns)

## フローチャート
処理の流れを記述する。

## シーケンス図
プロセスが互いにどのような順序で動作するか。



## クラス図
classDiagramでクラスが描ける。多分一番使う。

```mermaid
classDiagram
      Animal <|-- Duck
      Animal <|-- Fish
      Animal <|-- Zebra
      Animal : +int age
      Animal : +String gender
      Animal: +isMammal()
      Animal: +mate()
      class Duck{
          +String beakColor
          +swim()
          +quack()
      }
      class Fish{
          -int sizeInFeet
          -canEat()
      }
      class Zebra{
          +bool is_wild
          +run()
      }
```

### クラス
```mermaid
classDiagram
    class BankAccount
    BankAccount : +String owner
    BankAccount : +Bigdecimal balance
    BankAccount : +deposit(amount)
    BankAccount : +withdrawl(amount)
```
基本的にはこのように呼び出す。始め大文字推奨。
クラスの上段にはクラスの名前が入る。
中央にはAttributeが入る。(クラスの持つメンバのこと)
下段にはメソッドが入る。この二つは小文字推奨。

### クラス定義
`class hoge`としたらクラスになるのは当然として、実は`hoge <|-- huga`などの**関係定義の時点で既に宣言したことになる。**
また、クラス名に使える文字は英数字とアンダースコアのみ。

### メンバー定義
2種類ある。
```mermaid
classDiagram
	class BankAccount
	BankAccount : +String owner
```
こちらはクラス名の後ろにコロンを挟んでメンバー名とする書き方。
1つずつ定義できる。

```mermaid
classDiagram
	class BankAccount{
	+String owner
	}
```
対してカーリーブラケットを使い一度に複数定義するやり方。

### リターンタイプ
クラスの持つメソッドには戻り値を指定できる。
```mermaid
classDiagram
	class BankAccount{
	owner(stick) bool
	}
```
このように、メソッドの後ろに戻り値タイプを書いておく。

### ジェネリック型
```mermaid
classDiagram
	class BankAccount{
	+owner(stick) List~int~
	}
```
波線で囲うことで[ジェネリック型](CS_and_SR/Csharp%20Cheat%20Sheet.md)、複数種類の値型に同じ操作を行える型を定義できる。ListとかDictとか。

### Visibility
アクセス修飾子は手前に記号を付けることで表現する。
-   `+` Public
-   `-` Private
-   `#` Protected
-   `~` Package/Internal

> note you can also include additional classifiers:

> -   `*` Abstract e.g.: `someAbstractMethod()*`
> -   `$` Static e.g.: `someStaticMethod()$`

### 関係の定義
矢印の書き方。クラスとクラスの間に書く。
その後ろにコロンを挟んでラベルがつけられる。
**大体の関係は子のほうから繋ぐ。** なぜなら、継承元は誰に継承されているか認知していないから。

```mermaid
classDiagram
classI -- classJ : Association(関連)
classG --> classH : Association(関連)
classE --o classF : Aggregation(集約)
classC --* classD : Composition(構成)
classK ..> classL : Dependency(依存)
classA --|> classB : Inheritance(継承)
classM ..|> classN : Realization(実現)

classO .. classP : Link(Dashed)(破線)
```

#### 関連
操作を呼び出したり、データを属性として保持している関係。

#### 集約
全体と部分の関係。

#### 構成
全体が部分の生成や削除を担っている関係。
全体インスタンスが削除されると基本的に部分インスタンスも削除される。

#### 依存
弱い関連。
例えば一度だけあるクラスを生成するだけ、といった関係。
依存元が変更されたら、依存先は変更する。

---

以上四つはプログラムをクラス図に落とし込む場合、明確な変換が決まっていない。

---

#### 継承
いつもの。汎化とも。
型を継承して具体化する関係。**伸ばすのは子クラスから親クラス。**

#### 実現
インターフェースとサブクラスの関係。継承の一種。

[クラス図の書き方とは。初心者にもわかりやすく解説 | Cacooブログ](https://cacoo.com/ja/blog/how-to-write-class-diagram/)
[クラス図とは？書くために必要な知識を初心者にもわかりやすく解説 - WEBCAMP MEDIA (web-camp.io)](https://web-camp.io/magazine/archives/79668)
[UMLのクラス図における関係の考察 - Crieit](https://crieit.net/posts/UML)

### Cardinality/関係の多様性
あるクラスのインスタンスが他のクラスの1つのインスタンスにリンクされている数。
端的に言うと、**あるインスタンスはどれだけそのインスタンスを含んでいるのか**を書いておける。もちろん、あるインスタンスは複数でもいい。
-   `1`1のみ
-   `0..1`ゼロまたはワン
-   `1..*`1つ以上
-   `*`たくさんの
-   `n`n {ここでn> 1}
-   `0..n`ゼロからn {ここでn> 1}
-   `1..n`1からn {ここでn> 1}

これをどこに書くのかというと、ここ。矢印前後にダブルクォーテーションで囲って追加で書く。
```mermaid
classDiagram
    Customer "1" --> "*" Ticket
    Student "1" --> "1..*" Course
    Galaxy --> "many" Star : Contains
```

### クラスの注釈
クラスにメタデータをつけられる機能。一般にはこういったものをつける。
-   `<<Interface>>`インターフェイスクラスを表すには
-   `<<abstract>>`抽象クラスを表すには
-   `<<Service>>`サービスクラスを表すには
-   `<<enumeration>>`列挙型を表すには

<<>>で囲って書くだけ。クラスの書き方によって二通りの書き方がある。
```mermaid
classDiagram
class Shape
<<interface>> Shape

%%クラスを宣言した後、もう一度宣言するように書く

class Color{
	ROT
    <<enumeration>>
    RED
    BLUE
    GREEN
    WHITE
    BLACK
}

%%クラスの定義の一番初めに書く
%%べつに一番初めでなくてもいいけど、分かりやすいように

```

### コメント
\%\%。パーセント二個。
URLエンコードの文字として予約されてるせいか、Obsidianで普通に書くとその後の文字が消滅する。
**パブリック変数の位置にないとコメントにならない。**
コメントの次の行のテキストはクラス含めコメントになる。

### Interaction
主にhtmlでmermaidを使うときに使う機能。
**クラスにURLやツールチップを設定できる。**

```
action className "reference" "tooltip"
click className call callback() "tooltip"
click className href "url" "tooltip"
```

三通りの書き方がある。URLが欲しいときは、上のactionをlinkに書き換えるか、下のhrefを使う。
ツールチップが要らないなら空白にすればいい。

```mermaid
classDiagram
class Shape
link Shape "http://www.github.com" ""
class Shape2
click Shape2 href "http://www.github.com" "This is a tooltip for a link"
```

ツールチップだけが欲しいときは上のactionをcallbackに変えるか中段のcallを使う。上のcallbackはreference部分が関数名になる。
関数のcallback()は名前何でもいい。何かjavascript側で調整したいときだけその名前を使うので、調整が要らないならスペースでも動く。

```mermaid
classDiagram
class Shape
callback Shape " " "This is a tooltip for a callback"
class Shape2
click Shape2 call callbackFunction() "This is a tooltip for a callback"
```

### スタイリング
html上でmermaidの文字色とか変えたくなったときに使う機能。
今はいいや。CSSわかんないし。

[クラス図](https://mermaid-js.github.io/mermaid/#/classDiagram)

## 状態図
システムの動作を記述する。
プログラムに起こせるフローチャートより粒度が大きい。

英語のState Diagramの直訳。
状態遷移図の方が日本語の情報は多い。

フローチャートが手順の順序を重視するのに対し、これはそれぞれの状態がどういうものかを重視する。
なのでプロセス全体より、一つのオブジェクトの状態変化を表すのに使う。あとはイベントとトリガー関係とか。

| 項目          | フローチャート      | 状態遷移図                |
| ----------- | ------------ | -------------------- |
| **焦点**      | 手順や制御フロー     | 状態の変化とイベントへの反応       |
| **要素**      | 処理、分岐、矢印     | 状態、遷移、イベント、アクション     |
| **使用例**     | アルゴリズム、業務フロー | システムの状態管理（例: ロボット制御） |
| **時間/イベント** | 時間の概念はない     | イベントが状態遷移をトリガー       |
| **表現範囲**    | プロセス全体       | 1つのオブジェクトの状態変化       |

[しばらくお待ちください...](https://chat.deepseek.com/a/chat/s/3bda3b83-1572-40ea-8cfc-d3e08da6394e)

### 基礎
stateDiagram-v2で書き始める。
`[*]`で最初と最後。`-->`でつなぐ。
繋ぐ対象をState(状態)、繋ぐ矢印をTransition(遷移)という。

```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]
```

### 説明

`state "Discription" as ID`で状態の説明（表示）とIDを切り離せる。state句は必須。
`ID : Discription`も同じことができる。こっちのが楽。
説明は後からでも付加できる。

```mermaid
stateDiagram-v2
    state "This is a state description" as s2
    s2 : This is a state description
```

遷移に説明を付ける場合、一文の最後にコロンを付け、その後に続ける。
`ID --> ID2 : Discription`

```mermaid
stateDiagram-v2
    s1 --> s2: A transition

```

### 複合状態
Composite。`state ID {}`で複合状態を作れる。
`{}`の中に同じように書けば複合状態に状態を入れられる。

IDは普通の状態と同じように扱える。
複合状態同士での接続も可能。

```mermaid
stateDiagram-v2
    [*] --> First
    state First {
        [*] --> second
        second --> [*]
    }

    [*] --> NamedComposite
    NamedComposite: Another Composite
    state NamedComposite {
        [*] --> namedSimple
        namedSimple --> [*]
        namedSimple: Another simple
    }

```

### 選択
choice。選択をモデル化する場合、`state ID <<choice>>`とする。
IDから同じように引けばいいが、そのままだと何の選択か分からないので遷移に説明必須。

```mermaid
stateDiagram-v2
    state if_state <<choice>>
    [*] --> IsPositive
    IsPositive --> if_state
    if_state --> False: if n < 0
    if_state --> True : if n >= 0
```

### フォーク
`state ID <<fork>>`, `state ID <<join>>`でフォークをモデリングできる。
選択と同じ。

```mermaid
   stateDiagram-v2
    state fork_state <<fork>>
      [*] --> fork_state
      fork_state --> State2
      fork_state --> State3

      state join_state <<join>>
      State2 --> join_state
      State3 --> join_state
      join_state --> State4
      State4 --> [*]

```

### メモ
説明が長い場合、ポストイットとして説明を付加できる。
`note Direction of ID`。メモ本体は`    noteMain`のように次の行にタブを足して追記するか、説明と同じく`note Direction of ID : Discription`とする。

```mermaid
    stateDiagram-v2
        State1: The state with a note
        note right of State1
            Important information! You can write
            notes.
        end note
        State1 --> State2
        note left of State2 : This is the note to the left.

```

### 並行性
concurrency。複合状態内で`--`を使うことにより、並行プロセスを記述可能。
フォークとは違いプロセスを統合したり、1つの状態から開始する必要はない。代わりに複合状態内のみ。

```mermaid
stateDiagram-v2
    [*] --> Active

    state Active {
        [*] --> NumLockOff
        NumLockOff --> NumLockOn : EvNumLockPressed
        NumLockOn --> NumLockOff : EvNumLockPressed
        --
        [*] --> CapsLockOff
        CapsLockOff --> CapsLockOn : EvCapsLockPressed
        CapsLockOn --> CapsLockOff : EvCapsLockPressed
        --
        [*] --> ScrollLockOff
        ScrollLockOff --> ScrollLockOn : EvScrollLockPressed
        ScrollLockOn --> ScrollLockOff : EvScrollLockPressed
    }

```

### ダイアグラムの方向
最初に`direction LR`と書くと左から右になる。
複合状態内だけ別方向にすることもできる。

### コメント
行頭`%%`。

### スタイリング
classDefという物が使える。他のフローチャートとかと同様。
CSSで状態を飾れる。複合状態と最初と最後は飾れない。

まず`classDef ClassName CSS:CSS:...`でCSSクラスを宣言。
その後`class ID ClassName`をどっかに書くか、`ID:::ClassName`を書くことで適用できる。



[State diagrams | Mermaid](https://mermaid.js.org/syntax/stateDiagram.html)

## 実体関連図
相互に関心のある事柄を記述する。ER。
クラス図には振る舞いがあり、ER図には外部キーがある。

[オブジェクト指向設計とクラス図 ER図 - Qiita](https://qiita.com/_kurihara/items/23bce54519b9dd1d88fa)

外部キーは参照用。

クラス図はメソッドを整理する。C#。
ER図はデータを整理できる。SQL。

[SQLにおけるER図のキー: 主キー、外部キー、候補キーの識別方法 | IT trip](https://ittrip.xyz/sql/identify-keys-in-erd)

## ユーザージャーニー
タスクを完了するためにユーザーが実行する手順。ワークフロー。
## Gantt
```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title       Adding GANTT diagram functionality to mermaid
    excludes    weekends
    %% (`excludes` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)

    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2              :         des4, after des3, 5d

    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :1d
    Functionality added                 :milestone, done, 2014-01-25, 10d

    section Documentation
    Describe gantt syntax               :active, a1, after des1, 3d
    Add gantt diagram to demo page      :after a1  , 20h
    Add another diagram to demo page    :doc1, after a1  , 48h

    section Last section
    Describe gantt syntax               :after doc1, 3d
    Add gantt diagram to demo page      :20h
    Add another diagram to demo page    :48h

```


section セクション名

セクション内にタスクを纏めておく


タスク名 :(特定タグ), (タグ), (開始位置), 終了位置or期間

特定タグはcrit, done, active, milestoneが使える
重要タスクはcrit、終わったタスクはdone、手を付けてるタスクはactive
milestoneはごく短い時間を表現できる、その時までに達成すべき目標など
併用可能

タグはタスクに付ける短い名前
開始位置として使うことが出来る

開始位置は期日、もしくはafter タグ
省略する場合は終了位置は使えない、期間のみ
afterを使うがbeforeが使えるわけじゃない
dateFormatで形式指定可能

終了位置or期間
milestoneの場合でも0dなど適当な指定が必要
axisFormatで形式指定可能

[Gantt diagrams | Mermaid](https://mermaid.js.org/syntax/gantt.html#comments)


## 円グラフ

## 象限チャート
4つの領域に分かれたデータ。Quadrant Chart。
## 要件図
requirementDiagramで要件図が書ける。
```mermaid
    requirementDiagram

    Physicalrequirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
    }

    element test_entity {
    type: simulation
    }

    test_entity - satisfies -> test_req
```

| Keyword           | Options                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Type              | requirement, functionalRequirement, interfaceRequirement, performanceRequirement, physicalRequirement, designConstraint |
| Risk              | Low, Medium, High                                                                                                       |
| VerifcationMethod | Analysis, Inspection, Test, Demonstration                                                                               |

例についてるプロパティは必須のもの。
また例にあるように、両要素を矢印でつなぐことで関係を示せる。

## Gitグラフ
## C4 Diagram
クラス図やアクティビティ図なんかを一つの記述方式で書くための新しいDiagram。Mermaid内でC4がラップされてるっぽく、PlantUMLでの記法と同じ。
PlantUMLやMermaidが矛盾した(互いに継承したクラスなど)ものも描ける描画ツールだったのに対し、C4はソフトウェアの構造を反映した抽象化優先アプローチらしい。

C4はContext, Container, Component, Codeの略。この順で変更度が増えていく。そのためComponentやCodeのDiagramはあまり手動作成が推奨されてないっぽい。

新しいが優れているとは言っていない。単純な静的モデルに特化しているため、例えばステートマシン図などを書きたいならUMLのほうがいいって開発者が言ってる。

[The C4 model for visualising software architecture](https://c4model.com)
[ソフトウェアアーキテクチャのためのC4モデル](https://www.infoq.com/jp/articles/C4-architecture-model/)
[C4-PlantUML/README.md at master · plantuml-stdlib/C4-PlantUML · GitHub](https://github.com/plantuml-stdlib/C4-PlantUML/blob/master/README.md)
[Visualising software architecture with the C4 model - Simon Brown, Agile on the Beach 2019 - YouTube](https://www.youtube.com/watch?v=x2-rSnhpw0g&t=575s)
[mermaid - Markdownish syntax for generating flowcharts, sequence diagrams, class diagrams, gantt charts and git graphs.](https://mermaid-js.github.io/mermaid/#/c4c)
## MindMaps
## Timeline
## ZenUML
標準より詳しいシーケンス図が書ける。
C4と同じく別記法。
## Sankey
ある値セットから別の値セットへのフローを表す。
## XYチャート
バーと折れ線。
## ブロック図
ブロックの配置場所を制御できる。関係に余計な文言を加えられない。