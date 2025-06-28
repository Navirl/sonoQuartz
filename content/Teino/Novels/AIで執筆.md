[Character\_Sheet](<../Bar/Novel/Sheet/Character_Sheet.md>)

概念の追加システム。
Nolaを参考にキャラ、世界観、組織などごとに概念を追加する。

話を作るならキャラ、ペルソナ、関係性、現状、目的、イベント（フラグ込み）、こまごまとした組織や能力やアイテムがあれば最低限可能
まとめて全部を指す言葉……Sonnetに訊いた。ピースで。

それぞれは関連させることも、個別に作ることもできる
Relationみたいな欄で選択できるように

出力設定数、デフォ5つくらい
よくあるのはTemperatureでランダム性、Top-Kで上位絞り、Top-Pで合計確率絞り

気に入った概念をピースにぶち込む

概念は足し引き分解可能
分解は履歴も残る、子ピース
分解から足し引きを行うのがよくある使い方、足し引きすると親ピースは変更候補を提示して変更される

概念単語ガチャ
ピース種類に応じた制限
プレースホルダ―を使用した制限管理

obsidianのプラグインを想定

![[../Excalidraw/AIで執筆 2025-06-16 23.52.24.excalidraw]]

タイプもそうなんだが、身長や体重などを作成した際にそれを一緒にプロンプトに入れて考慮する機能が欲しい
ピースを作成してください、以下のことを考慮してください（箇条書き）で突っ込むか。

小説の設定で使用する設定を生成しようとしています。生成するのはキャラクターです。以下の制限を考慮しながら、このキャラクターにあてはまる設定をマークダウンlist形式で7個作成してください。

「{{str}}」この文を概念単位で3文に分割してください。

```
小説の設定で使用する設定を生成しようとしています。生成するのは{{type}}です。この{{type}}にあてはまる設定を{{num}}個作成してください。

## 制限

## 書式
{{char_json}}
```
まずはMCP経由でgroqを呼び出せるようにする。
structure outputs対応ってどうやって確認するんだ。
groq的にはllama4,qwen,dp,gemmaは対応してるらしい。

[Introduction to Tool Use - GroqDocs](https://console.groq.com/docs/tool-use)

一応ollamaもツール的には可能。モデルは知らない。

groq->concept->md。
yamlタグでピースかつ何のtypeなのか
内容内にgraph editor的な概念エディタがほしい
infinite craft風

一番近いのはsudowrite
[Sudowrite \| Documentation](https://docs.sudowrite.com)

AIを使用し、ブレインダンプ、概要、キャラクター、世界などをサポート。

![[../Excalidraw/AIで執筆 2025-06-17 11.40.49.excalidraw]]

peaceが得たconceptを、peaceがどう調理するのかの説明を書きたいので、conceptをyamlに入れたくはない。
が、yamlにないとグラフエディター風の表示でconceptを表示するのがとんでもなく手間になりそうな予感があるので、やっぱyaml行き。

というか、infinite craftのクローンでinfinite character作ればいいだけでは……?

![[../Excalidraw/AIで執筆 2025-06-17 12.51.41.excalidraw]]

単純にconcept同士を突き合わせただけでは、目的のものを作りにくいかもしれない（外見作りたいのに、内面が出来てしまう）
のでmode機能をゆくゆくは実装。

ビッグファイブ理論に基づき、外向性・調和性・誠実性・神経症的傾向・経験への開放性を配置。ゆくゆくは比率を弄りたい。
この辺は全部personality_traits。

[ビッグファイブ理論とは？心理学での性格は５因子で説明できる](https://mitsucari.com/blog/big5/)

これらを元にcraftする。5個ぐらい弾け出るので注意。
出来た奴は必ず以下のどれかのはずなので、所属(belong)付きでconceptとして作成。
最終的にFileに集める。

appearance
personality_traits
background
special_abilities
role
unique_trait
objective

ファイルに集めるのはいいんだけど、そのあとその情報を抜き出すのが簡単じゃないんだよなぁ。深くネストされたデータをファイルに持たせる方法が分からない。今のところはスラッシュタグを使用しておく。

キャラ用


```
[
  {
    "name": "",
    "age": ,
    "appearance": [""],
    "personality_traits": [""],
    "background": [""],
    "special_abilities": [""],
    "role": [""],
    "unique_trait": [""],
    "objective": [""]
  }
]
```

objective追加。

世界用
```
 [
  {
    "name": "",
    "description": "",
    "geography": "",
    "society": "",
    "technology": "",
    "conflicts": "",
    "key_locations": [""]
  }
]
```

関係性用
組織用
アイテム用
イベント用


これで作成した設定群を、nameとage以外全部抜いてランダム出力。
文になった場合は、splitterで分割。

splitter

「{{str}}」この文から日本語を用いて概念を{{num}}単語抽出し、jsonリスト形式で出力してください。意味を拡張・解釈・欠落しても構いません。

## 書式
{
"",
""
}


![[../Excalidraw/AIで執筆 2025-06-17 12.51.41.excalidraw]]

 ファイルにまとめたい。それはたぶんtextからedgeをfileにさしてListから実行で行ける。行先はcanvasexフェンス。
 ただファイルから取り出すのがむずい。ヒストリから出すのは行けるので、パネルタブに一回ファイルの詳細情報を出力して、それから書き出せばたぶん行ける。

![[../Excalidraw/AIで執筆 2025-06-26 23.36.36.excalidraw]]

frontmatterに書き込むと、canvas上で確認するのに一回一回クリックしてプロパティタブを確認しなきゃいけない。でもこっちの方が構造化されてて使いやすいんだよなあ。いずれフェンスとfrontmatterを同期するような設定を作るべきか。いずれ。

fileカードから出せねぇじゃねぇか。propertyは出せるのに。
しょうがないのでノードリストからにする。

text/planeだからD&Dは通る。これそもそもObserverもListenerも何も関係ない元からの仕様。
なのでこのイベントを検知することは出来ない。

ではどうやってD&D時にyamlを消そうか……
canvasに追記があるのでそれを検知する方法があるが、ファイルからのD&D以外でも当然canvasは追記されるのでそれと区別しなければならない。
ファイルを読み取って追記時に比較検討？いや、履歴にも同じものがある可能性がある。appearance: Eがファイルと履歴にあり、履歴からappearance: Eを別に使おうとドロップしたらファイルのEが消滅。シャレにならない。
IDがあれば早いが、ファイルのどこにそのIDを追記しろというのか。ファイル側で普通に追記するのもあるからIDなしの要素が出来て終わる可能性はある。File Propsで開いたときにIDなしがあったら自動追記するか？どこに？形式合わせてyamlで同じく制御するとしてもクソ邪魔。text/planeしか受け付けずそれをイベントとして受け取れないなら、そもそもIDを比較する処理も挟めない。一回追加させてから内部処理しようにも、text/planeなせいでIDをcanvasにスライドさせるにはID含めてtext/planeに入れなければならない。text/planeにどこからの文字列なのかなんて情報は無いので必然全てのtext/planeに対してIDがあるかないかで読み取りをかけることになる。何が問題かというと、全然関係ない文字列に対してIDとして反応しそうというところ。いやID: XXみたいな形式を尻尾に付けるならいけるか……？
cexからだけbelong: text ID: XXとして投げ、canvasの追記textのIDと一致したら消去。いやそうか、cexからのIDは適当でいい。canvasのtextIDにそれを入れた後、それが一致するか調べればいいだけだ。ならfileにIDを追加しなくていい。

cexからのだけIDを持たなければならないのだが、どこに置いとけばいいんだ。もうこれcexフラグを付けたほうがよくないか？cexからの奴だけ{{flag: cex}}を付け、これ見つけたら一致する文字列をfile propsから検索して削除。

canvas

[[./AIで執筆-log.md]]