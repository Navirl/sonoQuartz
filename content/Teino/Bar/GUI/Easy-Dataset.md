---
date: 2025-11-20
time: 10:00
tags:
  - Bar
---

up:: [AIt](../AI/AI_text.md)
up:: [AIi](../AI/AI_image.md)

LLMでLLM用のデータセットを作る奴。
ローカルファイルから情報抽出、問題と返答を自動生成できる。
元データが少なくてもGenre-Audienceを生成して増やすことが可能。

single-turn、multi-turn、imageQAのデータセットが作成可能。
デフォルトだと生成結果は英語で出されるので、プロンプトの設定が必要。

## LLM
こういう系なら当然だが、たぶん生成物が正しくjsonになってないとfailedになる。
なので必要なのはIF。データセットで学習するモデルは好きにすればいいが、データセット生成にはそれなりのLLMが必要。少なくとも3BJambaは無理だった。

また、コンテキストも必要。テストで5000トークン程度要求される。なので4096は候補から外れる。
Reasoningは邪魔そうだけど、どうだろう。質問からの回答生成にはCOT欄があるので、Reasoningもたぶん対応してる。ただし質問自体の生成は難しい、ような。

## multi-turn
若干設定が分かりにくい。

### System Prompt
会話の最初に入るプロンプト。

### Conversation Scenario
会話の状況のコンテキストを入れる。

### Number of Rounds
会話回数。

### Role A
参加者A。質問者。
Questionはこの人物からの疑問として全文入力される。
つまり`System Prompt -> Question(Role Aの発言) -> Role B`の順。

### Role B
参加者B。回答者。
こいつは普通持ってないだろみたいな知識も質問次第でボンボン出る。
それぞれにLoRAを適用みたいなことはまだできない。（2025/11/20）

## 事件を元に、キャラクター返答選択肢を作成し、選択を行うには
マークダウン取り込み->LLMが質問文作成->LLMが選択肢作成->人間が選択肢を選定->選定結果を保存（選ばれないものはネガティブとして保存） というフロー。easy-datasetだとLLMの複数選択肢作成が出来ない。

labelboxはUnitを気にする必要があるので。Argillaはpythonでデータを管理する必要があり面倒。なのでLabelStudioを使ってみる。こいつもpythonで生成部分を触る必要があるので面倒ではある。easy-datasetを修正したほうが早いのでは？どのみちjsonで複数回答をどうデータ構造にまとめるかという問題は出てくるし。どう学習させるかも合わせて調べたほうがよさそう。その辺固められるならいっそArgillaで良くないかとも思うが。

qloraとunslothで結構削れそう。
でもunslothの低レベル最適化はどう見てもlinuxのソレ。winだと厳しい。
……動作要件にWSLのインストールが必要になりそう。

だから現実的には3Bがギリギリか。
データ形式はunslothが何とかしてくれそう。シングルターンのマルチターン化も。
ネガティブプロンプト的なことも出来そう。だったら適当にまとめて、いい奴と悪い奴はunsloth前で分けるようにするべきか。
[Chat Templates \| Unsloth Documentation](https://docs.unsloth.ai/basics/chat-templates#multi-turn-conversations)
[Gemini - direct access to Google AI](https://gemini.google.com/share/a84fbb014d92)

非構造ファイルをよしなに分割がeasy-datasetしかできない。
やっぱりこれのコードちょっと描き直すのが一番だ。質問を一つに限定して回答生成を連打する方法もあるけど。これでtemperature上げれば良いか？ Top-p上げると質問と関係ない答えが返ってきそうだが。

