---
date: 2025-09-25
time: 14:46
tags:
 - Info
---

up:: [ST](<../Bar/App/Sillytavern.md>)
same:: [ST Lorebook](<./ST Lorebook.md>)

Ali:ChatとPListの組み合わせが主流。
[Introduction \| PygmalionAI Wiki](https://wikia.schneedc.com/bot-creation/trappu/introduction)

## Ali:Chat
AliCatが開発したキャラクター記述フォーマット手法。

キャラクターの特徴を、会話例を通して強化する。
ユーザーとのインタビュー形式でも、単なる他キャラクターとのやり取りでもいい。
初心者にはインタビューが簡単なのでおすすめ。

基本はそれだけしか決まっていない。超柔軟。返答もセリフだけでなく、実際と同じく地の文を書き加えることを許可する。返答外の地の文もOK。

**そのキャラクターについて知っておくべきことが分かるならそれでいい。** 性格特性、服装、身体的特徴、癖、話し方等。

別キャラクターとの会話例を追加すると、一度に二人以上のキャラクターを作成できる。

```
-Narration-
{{user}}: "Describe yourself."
Name: -Narration- "-desctioption-"
```

よくあるミスとして、{{user}}の行動を記述してしまうというものがある。
これをやると{{user}}を先回りしてしまいいろいろ困る。

`"dialogue" action`か`dialogue *action*`がおすすめ。`"dialogue" *action*`は非推奨。

## PList
キャラクター特性をリスト化する最もトークン効率の高い方法。
強化したい特性が多い場合、Ali:Chatだけでは効率が悪い。そういう時に。

ちなみに元はPython Listで、Pはその名残。
SBF（Square Bracket Format）という呼び名もある。

`[Thing: trait, trait(desciptor);\n Thing: trait...`
改行は必須ではない。

```
[ Name's apparance: hair(long,fiery), eyes(golden);
Tags: fantasy, slice of life;
Name's persona: loves(singing, perfoming) ]
```

可能な限りトークンを抑えながら特徴を伝える記法。
なので省略できるところは省略する。

```
- **If one thing has one unique descriptor:**
    - thing(descriptor)  
        hair(red), eyes(amber)
- **If one thing has a few unique descriptors:**
    - thing(descriptor, descriptor)  
        Physique(elegant, voluptuous, tall), hobbies(reading, assassination, videogames)
- **If many things have one or many descriptors in common:**
    - thing/thing/thing(descriptor, descriptor)  
        earrings/necklace/rings(golden, expensive), hair/dress(scarlet)
- **If many things can be assigned to a single word, such as "loves", "hates", "wants", etc...:**
    - thing descriptor/descriptor/descriptor  
        loves wine/singing/performing, hates Fauna/W++/saplings, wants candy/girlfriend
```

タグは一般的でなくていい。文でもよい。ヒントともいえる。
一応一覧はある。
[GPT-J (Sigurd) - Tag Database (NSFW)](https://docs.google.com/spreadsheets/d/1Jfxf10C_s8n4dcWYQ-kW_X1lVZEkz_ORSuEs-F3-v1U/edit?gid=1099421859#gid=1099421859)


---

[Character writing guide \| PygmalionAI Wiki](https://wikia.schneedc.com/bot-creation/trappu/creation)

## Name
名前そのものにあるバイアスに注意。「Caera Denoir」だけで貴族出身の女性扱いをしてくる。
同じように、人気キャラクターの名前を取るとそのバイアスを受ける。

## Description
説明。上で説明したAli:ChatとPListをいれるとこ。

キャラクターカードの要素は永続と一時がある。
永続は常に監視される。
一時は会話が続きコンテキストをはみ出ると無視される。

Descriptionは永続トークン。

コンテキストは下であるほどモデルの出力に大きな影響を与える。
なのでDescriptionは最下部にPList、その上に重要な会話例、その上に重要でない会話例というのが通例。

### 会話前半
Descriptionより下にChat historyが入るため、最終的には順序は問題なくなる。順序が大切なのはチャット初期。

```
順序:
Description
Chat history（includes the Greeting Message, temporary）
Author's Note(insertion Depth @ 4 = placed right above the 4th message counting from the bottom, permanent)
Chat history(3)
```

Author's Noteの仕様上、PListはAuthor's Note内の方がより良い。
が最近はLorebookを使うことができるらしい。
[Replacing the Author's Note](<./ST Lorebook.md#Replacing the Author's Note>)

### 会話後半
チャット履歴が長くなると、会話の重要度に応じてfirst, second, thirdに分類される。これはmemory basketと呼ばれる。

firstは直近のチャット履歴。及びAuthor's Note。
secondは会話に関連するが反応に大きな影響を与えないメッセージ。
thirdは文脈のみが重要なメッセージ。

### Ali:ChatやPListとの関係
memory basketがあるため、頑張ってAli:ChatやPListを書いてもthirdへ押しやられキャラ性格が変わってしまう。

ここでAuthor's NoteにPListを書いていれば、firstとしてそれを常に読み込んでくれるだけでなく、PListに強く関連するAli:Chatも呼び出してくれる。こうすればコンテキスト関係なくキャラクターの一貫性を保てる。

---

## Author's Note
前述のようにPListを入れるほか、`[ Instruction: {{char}}'s next response must include narration and dialogues. Be creative and make the scenario engaging ]`などとしてフォーマットを指定できる。これは深度0がおすすめ。

## Greeting Message
`[ Scene: Pardofelis is robbing {{user}}'s house; Tags: robbery, chase, fantasy, betrayal, drama; Instruction: Your response must bla bla bla bla. ]`などを書き込み、キャラクター自身にシナリオを考えてもらうことができる。