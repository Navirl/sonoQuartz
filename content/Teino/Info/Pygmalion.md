---
tags:
 - Info
---

daily:: [2023-05-03](/Daily_Note/2023-05-03.md)
up:: [text-generation-webui](../Bar/App/text-generation-webui.md)


テキストモデル。
いくつかある小説特化型テキストモデルの中でも有力候補。検閲無しでNSFW含め何でも出せる。
今はredditを始め、AIにキャラクターを持たせて話す研究の場としてどんどん成長した。一応歴史としては、2023年1月12日にHaggingFaceに公式モデルがアップされ、1月17日にreddit開設。

ここでは[Tavern](../Bar/App/Tavern.md)などを使いAIキャラクターを生成して会話できるモデルとして扱う。

関連リンクがまとめられている。
[Helpful Links](https://rentry.co/PygmalionLinks)

ちなみに内部のプロンプトはこんな感じ。
```
[CHARACTER]'s Persona: [A few sentences about the character you want the model to play]
<START>
[DIALOGUE HISTORY]
You: [Your input message here]
[CHARACTER]:
```


## キャラクターカード
キャラクターは小さめの画像に、jsonファイルを埋め込んで作られている。
Tavernとかで読みこめる。

中が気になるだけならこれで見える。
[AI Character Editor](https://zoltanai.github.io/character-editor/)

以下、掲載サイト。
素のjsonファイルを掲載しているところもある。
[Touhou Project – BotPrompts.net](https://botprompts.net/touhou/)
[Character Hub](https://www.characterhub.org/)
[+pygmalion](https://booru.plus/+pygmalion)



## キャラクター講座
[Pygmalion_Character](Pygmalion_Character.md)

ちょっとひねれば世界を説明するのにも使える。

## 会話講座
[Pygmalion_Communication](Pygmalion_Communication.md)

## ソフトプロンプト
[Soft Prompt Guide](https://rentry.org/shiso-softprompt-quickstart)
LoRAみたいなやつ。元々はNovelAIのmoduleという機能。

ある作品群で学習して生成した、特定の数値データレイヤーをコンテキストの先頭に差し込み、書き方の傾向をその作品群へと偏らせるというもの。レイヤーが別なので2048トークン制限を突破できるが、あくまで書き方なので設定とかはなんも引き継がない。

現在は混同を防ぐためキャラクターバイアスと呼ばれている。


## おまけ
その他こういうタイプのモデルをもっと知りたいなら、ここで見つけられる。
[ai-guide/README.md at main · Crataco/ai-guide · GitHub](https://github.com/Crataco/ai-guide/blob/main/README.md)