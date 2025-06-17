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

![[../image/AIで執筆 2025-06-16 23.52.24.excalidraw]]

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