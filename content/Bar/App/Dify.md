---
tags:
  - Bar
  - App
---

daily:: [2024-07-12](/Daily_Note/2024-07-12.md)
up:: [AI_local](../AI/AI_local.md)
up:: [AI_online](../AI/AI_online.md)

[GitHub - langgenius/dify: Dify is an open-source LLM app development platform. Dify's intuitive interface combines AI workflow, RAG pipeline, agent capabilities, model management, observability features and more, letting you quickly go from prototype to production.](https://github.com/langgenius/dify)

LLMに色々チェインさせることができるwebアプリ。LangchainのGUI版的な。
Docker動作もできる。

最近（2024/07/12）ワークフロー機能が追加されたらしく、全体を見通しながら機能を実装できる。

[Dify 各サービス解説](../../Info/Dify%20各サービス解説.md)

現在（2024/07/19）GraphRAGには対応していない。
[Can Microsoft's Graph RAG be added to the new version? · Issue #6019 · langgenius/dify · GitHub](https://github.com/langgenius/dify/issues/6019)

その他、役立つ情報
[DifyをAPI使って利用する](https://zenn.dev/417/scraps/5a3143618f614f)
[Perplexity](https://www.perplexity.ai/search/difynostreamingresuhonsuwoshou-AIBd2c7oT.KzFt2P91oG1Q)
[Dify x Pythonでネット掲示板を自動要約! ～SNSの情報収集から考察まで完全自動化 生成AIで賢く情報収集～｜Rcat999](https://note.com/rcat999/n/n1d17d77b9ab0)

## コードブロックへのライブラリ追加
サブモジュールが絡むと途端にダメになる。
[After importing a third-party library into the Python sandbox container, the execution results are inconsistent between the container and the web interface · Issue #4463 · langgenius/dify · GitHub](https://github.com/langgenius/dify/issues/4463)

トップレベルだけでいいなら、`\docker\volumes\sandbox\dependencies\python-requirements.txt`に追記して高度な依存関係に追加すれば使えるようになる。

## dict
Dify内の`Array[String]`は、pythonコードブロックではdictとして処理されている。
（Dify内の変数名がキーとして登録されている）

## str
文字列長が80000までで制限されていて、検索結果をそのまま入れようとするとパンクする？

## Jinja
テンプレートエンジン。
変数の読出しなどをしつつ、欲しい文字列を簡潔な記法で生成することができる。
正規表現が絞り込みなのに対し、こちらは0→1の生成。
マクロ機能もあるのでほぼプログラミング言語。

[Jinjaテンプレートの書き方をがっつり調べてまとめてみた。 #Python - Qiita](https://qiita.com/simonritchie/items/cc2021ac6860e92de25d)

オンラインテスト。

[TTL255 J2Live - Live Jinja2 Parser](https://j2live.ttl255.com)



## チュートリアル
[Dify x Gemini x PythonでオリジナルAIを作る ～Gemini1.0で文章振り分け～ API使用｜Rcat999](https://note.com/rcat999/n/nf527a0cad538)

Difyは外からAPIで触れる。
その前提なら、全部作れるワークフローより、テキストを加工できるだけのテキストジェネレーターの方がいいこともある。

プログラムで触るなら、形状は一定にしたほうが良い。
なので温度を下げて創造性を下げ出力を安定、TOP Pを下げてランダム性を下げ同じ出力にする。

APIはBearerでキー指定。
Bodyでinputs,response_mode(逐一かブロック)、userを指定。
結果はJSONで返る。返答はanswerにある。


今回のざっくり流れ

Google Trendsを入手
検索かけて情報を入手
全部繋げてHTML化、一枚のPDF化
[Google Colab](https://colab.research.google.com/github/Tanu-N-Prabhu/Python/blob/master/Google_Trends_API.ipynb#scrollTo=8vqkob1NnQqK)
普通にJinaで情報を採れるのだが、リンクまみれで全然綺麗じゃないのでLLMで類似を探す場所が必要。

つまり

ローカル

Google Trendsを入手

Dify移行

JinaでTrendsをサーチ
結果をLLMに噛ませ、Trendsに似た部分を要約して出力

ローカル移行

HTML化、PDF化

となる。

トレンドはpytrendsで取得できるが、[rss](https://trends.google.co.jp/trends/trendingsearches/daily/rss?geo=JP)のように日付データが取れるわけではない。
リアルタイムトレンドはRSSにない。

1時間ごと程度でpytrendsを起動し、リアルタイムトレンドを取得。
前と被っているかどうかを保管しているデータを検索。単語だからRerankなしでデータだけで取れるはず。


Github Actionsかなんかでpytrendsを起動。
RTトレンドを取得。
RTTでいっこずつ保管データを検索。無ければDify（or 通常）流し＆追加。
（Colabで試せる）

RTTでJina Search。
得た情報を元に、RTTと被る場所があるかをLLMチェック＆形式整え。

情報を元にローカル戻してPDF化。

NolangにPDF投げる。
puppeteerで自動的にPDFを読み込ます。



いまつまってるとこ
Jinaを使ってサーチは出来るが、欲しいのはリアルタイムのニュース欄
それ自体はduckduckgo_searchで拾えるので、URLをまとめて


トレンド取る
ddgsearchでそれぞれURL取る
充分な文字列長をDify側で段落で設定し、URLとトレンドワードをイテレーション処理
イテレ内
トレンドワードからのサーチ
URLのそれぞれサーチ
それらを統合、コードに戻してPDFに

ワード1
    URL1
    2
    3
2
3

この形状なので、段落でぶん投げることもできるが切り分けて投げたほうがよさそう
`[ワード1、URL1、URL2...]`のような形で投げ、Dify側で`[0]`をワードとして抜く
戻りは要約だけ返す、要約をワード1.pdfに投げてまとめる

pdf処理中に非同期処理で投げたいが、それは後で

```code
トレンドワードゲット
ワードからニュースURL
ワードとニュースURLを投げる処理
pdfにする

```

```dify
文字列受け取り
文字列リスト化
イテレ
    [0]ならワードとしてサーチ
    それ以降ならURLとしてサーチ
    結果を変数まとめ
イテレまとめをLLMで整形
戻す
```


二重になってたり、続きを読む場合はリンククリックだったりで、普通にデータを取得できないサイトが多い。
perplexityを使いたいところだが有料

Jina Search, Brave Search、Tavily、Google

jinaだと5万文字くらいつかうので、Tavilyを採用
[【Fate・東方ネタで学ぶ】日本語版Tavily APIの完全ガイド - Sun wood AI labs.2](https://hamaruki.com/a-complete-guide-to-the-japanese-tavily-api/)
Tavilyは5文字以上じゃないとエラーが出る。
4文字以下の時には適当に空白を入れる。

## fact check LLM
# 役割
ファクトチェックの専門家

# 要件
以下の内容は、検索結果をもとにまとめたものです。要約が正確かどうか、検索結果と比較して確認してください。内容が異なる場合は、検索結果に基づいて日本語で修正してください。

# 条件
- 4000文字以内
- Markdown形式
- 注釈は付与しない
- 元の文体を維持する
- ハルシネーションしてはいけない

# 内容

# 検索結果