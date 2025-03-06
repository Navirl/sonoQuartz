---
date: 2024-12-06
tags:
  - Bar
aliases:
  - AIt
---

up:: [AI\_local](<./AI_local.md>)
up:: [AI\_online](<./AI_online.md>)

llmって呼ぶとマルチモーダルモデルとかの説明が削られるので。
## local

### Instructモデル
以下のURL先のようにチャットに適したモデル。

[Chat Templates](https://huggingface.co/docs/transformers/main/en/chat_templating)

## online
### perplexity
検索サービスの先駆け。
ファイルを添付して調べられるのが強み。あとアプリがある。
文字がたくさん入る。
https://www.perplexity.ai

### Genspark
ウェブページにまとめてくれる。内容指定してウェブページ作成も可能。
ファクトチェックもできる。つよい。
ただしファクトチェックは事実一つずつかつクローズな問い（y/n）じゃないとちゃんと動かない。

[Genspark - 信頼できるAIの回答と偏りのない包括的な結果で検索を革新するAIエージェントエンジン。さまざまな研究やタスクのためにAIエージェントのチームで時間を節約しましょう。](https://www.genspark.ai)

データ検索等高度エージェントが使用可能になった。
無料版だと一日3回。


### Consensus
研究特化。流石に新しすぎる論文(2024, 2024/09/29)とかには言及してくれない。
[Consensus: AI-powered Academic Search Engine](https://consensus.app)

### Felo
マインドマップを作ってくれる。
スライドも作れる。

[Felo - 無料のAI検索エンジン](https://felo.ai/ja/search)
ぱぷれに似すぎだが、日本製らしい。
[日本発のAI検索エンジン「Felo」を使ってみたので、Feloの使い方とマインドマップ機能の活用方法を語ってみる｜斉藤 智彦(Tomohiko Saitoh)](https://note.com/saitohtm/n/n38a64fc01e96)

有能だが、文字数がぱぷれに劣る。
ファクトチェックなどはPerplexityで。

拡張機能を入れると、URL末尾に`?felosearch_translate=1`を入れることで文字の下に翻訳した文を入れてサイト表示できる。有能。

### Napkin AI
指定した画像を生成する。
PNGやSVGを出力できるのが強み。

パワポに合わせて出力するのが主目的？
[App - Napkin AI](https://app.napkin.ai/)

### v0
next.jsのvercelが贈る、UIプロトタイピングAI。
コードに詳しいわけではないので、細かい修正を頼んでも直さない。UIの機能は思いつくけどどんな見た目にするんだ、みたいなときに使う。

あくまで見た目だけ、なのでこれを元にFigmaで詰めるみたいな使い方が主流。

[v0 by Vercel](https://v0.dev/)

### bolt.new
フルスタックプログラムAI。
v0はフロントエンド限定だが、これはバックエンドも含めて作る。

[bolt.new](https://bolt.new)

### Replit Agent
boltと同じタイプ
[Replit Docs](https://docs.replit.com/replitai/agent)

### LibrAI
ファクトチェック。
米国をメインにしてるっぽい。日本の話にはちょっと弱い。

[LibrAI](https://aip.librai.tech/app/fact-check/new)

ローカルバージョンがある。
[GitHub - Libr-AI/OpenFactVerification: Loki: Open-source solution designed to automate the process of verifying factuality](https://github.com/Libr-AI/OpenFactVerification)
### tl;dv

会議の文字起こしとか共有とか行う。

[tl;dv - app](https://tldv.io/app/meetings)

### Gladia
文字起こし特化。
[Gladia](https://app.gladia.io)

### 天秤AI
ChatGPT、Gemini、Claudeの3つの出力を比較できる。その出力をまとめてより考えさせる壁打ち機能も搭載。
なぜかOpusや1.5 Proなども無料で使える。

[比較検索なら 天秤AI byGMO │ ChatGPT Claude Gemini等最新AIチャットボットが無料で試せる！](https://tenbin.ai/workspace)

### Gamma
スライドを制作する。
クレジットの回復方法は紹介とプランしかない。Freeで使い続けることは出来ない。
実力は割とある。コード投げ込むだけで大枠を捉えられる。

[AIを使ったプレゼンテーションとスライドデッキ｜Gamma (ガンマ)](https://gamma.app/ja)

### irusiru
日本人向けスライド制作。
真面目に文章を送ろうとすると1600文字しかない。

出力にPDF・PPTX形式があったり、自社テンプレートを使用できるのが強み。
Freeだと3個までしかドキュメントは作れない。

[Irusiru](https://app.irusiru.jp)

### Simplified
書く、動画作る、デザインするなど全て一つでこなす。

[Simplified: An Easy to Use All-In-One App For Modern Marketing Teams](https://simplified.com)

### ChatGPT
回答速度がいい。
コードも割とできる。
ちゃんとウェブ検索もしてくれる。必要だったら。

### Claude
人間っぽさが強み。
コードにも強いが、最近はChatGPTが追い上げてるかも。

### Gemini
分析に強いらしい。
APIがほぼタダ。

#### Gemini Deep Research
深めにサーチしてくれる奴。Gensparkのファクトチェックみたいな精度でリサーチするイメージ。
いまのとこ（2024/12/23）有料じゃないと使えなさそう。
[Gemini Deep Researchを使う方法とレビュー｜矢野 哲平@耳で学ぶAI](https://note.com/robothink/n/na14a59165fc2)

### PLaMO
日本のAI。
https://plamo.preferredai.jp/

### minimax
cohereのようなマルチAIプラットフォーム。
中国系。
https://www.minimaxi.com/en

### Markdown AI
マークダウンを書いてシンプルに公開する。
特徴はGPT-4oなどのモデルにアクセスできるテキストボックスを設置できること。
[MarkdownAI β](https://mdown.ai/file)
[生成AIを使いこなす！初心者向け導入手順とプロンプト作成のポイント(完全無料のMarkdown AI) MarkdownAI - Qiita](https://qiita.com/waka_m/items/c43a04739a6f5fdf139c)

AIへの指示は、7Rというのがいいらしい。（2024/11/16）
[【ChatGPT】野口竜司氏提示、7Rプロンプト ChatGPT - Qiita](https://qiita.com/kabumira/items/77bcfeac699673d99c09)

| 英単語             | 和単語                             |
| --------------- | ------------------------------- |
| Request         | 依頼                              |
| Role            | 役割                              |
| Regulation      | 形式                              |
| Rule            | ルール                             |
| Review & Refine | 評価・改善                           |
| Reference       | 参照知識・例                          |
| Run Scenario    | 実行シナリオ（実際のやり方、仕事の手順。定期的に質問しろなど） |


### groq
現在（2024/08/02）無料で使えるLLMAPI。
GPT-4相当とされているllama-3 405bを使えるはずだがレートリミットが激しい。

[GroqCloud](https://console.groq.com/settings/limit

## Reka
Gemini Proくらいの性能を持つマルチモーダルモデル。
外部ツールを積極的に使うっぽい？
動画の解説が欲しい時に。
[Site Unreachable](https://note.com/doerstokyo_kb/n/n8ecfdcafaea2)

## Perplexica
OSSのPerplexityクローン。
SearXNGというローカル検索アプリを使うのだが、これのセットアップが少し面倒。
なのでdocker使用が推奨。
[Perplexica](<./Perplexica.md>)

## Jan
とにかく簡単にggufや他検索が使えるアプリ。他のアプリが面倒ともいう。npmとかpythonとか。
簡単すぎてAPIやggufの配置場所選択などがない。(2025/02/13)

[GitHub - janhq/jan: Jan is an open source alternative to ChatGPT that runs 100% offline on your computer](https://github.com/janhq/jan)

## LMStudio
APIを公開してくれるアプリ。ollamaと同じくらいいろんなところが対応している。
vllmがいけそう？

https://lmstudio.ai

## open-webui
ウェブ検索をローカルアプリで出来る奴。
埋め込みモデルの選択なども簡単にできる。comfyuiとの接続も可能。音声通話もできる。
インストールもpythonのライブラリ一個入れるだけ。

ユーザーの概念がある。複数人で動かせる模様。

[日本語の高性能な文埋め込みモデルを試す｜ぬこぬこ](https://note.com/schroneko/n/n8e36e2b8cb10)
[【日本語LLM】Ollamaで利用可能な日本語対応embeddingモデル【Ruri】｜Catapp-Art3D](https://note.com/catap_art3d/n/n1ae2474509b7)
[GitHub - open-webui/open-webui: User-friendly AI Interface (Supports Ollama, OpenAI API, ...)](https://github.com/open-webui/open-webui?tab=readme-ov-file)

## [GitHub - reorproject/reor: Private & local AI personal knowledge management app for high entropy people.](https://github.com/reorproject/reor)
Obsidianのようにローカルマークダウンを管理し、そこにAIエージェント機能をくっつけた奴。
動かせてない。

## AnythingLLM
ダウンロードがJanレベルで楽なアプリ。
Docker版もある。

RAGが使えるため、ローカルで検索をしたい程度ならこれで充分。

[AnythingLLM \| The all-in-one AI application for everyone](https://anythingllm.com)
[GitHub - Mintplex-Labs/anything-llm: The all-in-one Desktop & Docker AI application with built-in RAG, AI agents, and more.](https://github.com/Mintplex-Labs/anything-llm)

## Morphic
ローカル検索機能だけに絞ったアプリ。
本当にローカル検索以外使わないならこれで充分。

[GitHub - miurla/morphic: An AI-powered search engine with a generative UI](https://github.com/miurla/morphic)