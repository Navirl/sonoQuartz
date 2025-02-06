---
tags:
 - Info
---

daily:: [2023-05-03](/Daily_Note/2023-05-03.md)
up:: [Pygmalion](Pygmalion.md)


[AIt Custom character](AIt%20Custom%20character.md)

これ以降のはPygmalionで使うための奴。
[JSON character creator](https://oobabooga.github.io/character-creator.html)

```json
{
  "char_name": "Name",
  "char_persona": "Body(Fit)\nPersonality(Annoying + Overly friendly)\nLikes(Things that he likes)\nLoves(Things that he likes just written in a different way.)\nFetish(If you want to)\nDislikes(Things he dislikes)\nHatesThigns he dislikes just written in a different way.\nFeatures(Physical appearance that doesn't go in body)\nDescription(Everything else that makes him unique)",
  "char_greeting": "\"This greeting is going to determine how my first few messages should look in writing style!\"\n*He takes a sip of his mint tea, raising the cup up to you*\n\"It's a shame it won't matter as we continue, but it was nice while it lasted.\"",
  "world_scenario": "You are meeting Name for the first time. Name does not know you, but he is open to new friendships. He has a head injury. Clothing(Bowtie)",
  "example_dialogue": "<START>\n{{user}}: Who are you?\n{{char}}: I am a character! Here are some things I will tell you, and some things I will not tell you when introducing myself won't be in this message!\n<START>\n{{char}}: Note that you don't need the 'User' part of a chat example. It doesn't seem to matter. But always put <START> at the beginning of your individual chat examples.\n"
}
```

基本的にはこの形式に従っとけばOK。
けど詳しく書きたいときのため。

[How to make a character](https://rentry.co/create-a-character-for-fucking-idiots)
[Pygmalion Tips](https://rentry.co/PygTips)

## char_name
まんま。
`"Moondrop, the sadistic animatronic"`のように、ここにバイアスを突っ込むテクニックがある。
ラストネームを入れると名前ではなく種とカウントされることがあるので、ファーストネームだけにすることが推奨されている。

## char_persona

BoostyleとW++の二つの書式がある。
Boostyleは特徴を+でつなぎ合わせていくだけの書式。文を+でつないでもいい。一番書くの楽でトークン少なめ。
[i'm really confused about boostyle, w++, and everything : r/PygmalionAI](https://www.reddit.com/r/PygmalionAI/comments/11bdrhf/im_really_confused_about_boostyle_w_and_everything/)

W++はいくつか属性を決め、その中にBoostyle形式を入れる形式。pygmalionは大体これ。なので解説もこっちに偏る。
[W++ Examples](https://rentry.co/f3a52)
```
[character("Valetta")  
{  
Age("13 years old" + "13" + "Immortal")  
Species("Vampire")  
Mind("Crazed" + "Desperate" + "Hungry" + "Starving" + "Vampire")  
Personality("Crazed" + "Desperate" + "Hungry" + "Starving" + "Vampire")  
Loves("Blood" + "Drinking Blood")  
Sexual Orientation("Bi-Sexual" + "Bi Sexual")  
Description("Valetta is a vampire low on blood." + "She will do anything for blood." + "If Valetta does not get any blood she will die" + "Valetta gets orgasmic pleasure from drinking blood")  
}]
```

エディタもある。
[https://nolialsea.github.io/Wpp/](https://nolialsea.github.io/Wpp/)

書き込む言葉は大体何でもいいが、特に「それっぽく」なる言葉はいくつか存在する。

[Pro Tips · KoboldAI/KoboldAI-Client Wiki · GitHub](https://github.com/KoboldAI/KoboldAI-Client/wiki/Pro-Tips)
これのUseful character traitsのとこ。


いずれにせよ順序はどうでもいい。というか書式自体どうでもよくて、自然な文で書きたいなら書いてしまえばいい。ただし文法が間違ってると読んでくれない。

[キャラクター書式](キャラクター書式.md)

やってはいけないことがある場合は、hateやHates()を使ってその対象を生理的に無理なレベルにしておくのがいい。

### Personality/Mind

**確実に必要**。さらにPersonalityかMindのどちらかではなく、両方書いておくのが望ましい。

もともとこういうノベルモデルはMindを使うのが一般的だったが、pygmalionがPersonalityを追加したらしい。
[Pygmalion Tips](https://rentry.co/PygTips)

その上方々で出てくるキャラクターエディタではchar_personaの意味でPersonalityという記述項目が存在する。惑わされるな。
[AI Character Editor](https://zoltanai.github.io/character-editor/)

出来るだけ正確にするため、類義語を大量に書いておく方がいい。

#### ちょっとした注意
頻度や状況に関する状態はここじゃなくDescriptionに。
ただし開幕で攻撃的にさせたいなら、「Physically aggressive」なんかを追加する。

#### 記述が効かない
Temperatureが高いとキャラクターがキャラ崩壊しやすくなる。0.6~1.0がちょうどいいらしい。

#### 推論特性
直接的に何かを好きになる記述を書かなくても、「昆虫学者」で昆虫好きにしたりできる。

### Feature
**衣服を除く**外見的特徴を書く。
衣類は状況に入るのでscenarioに書くのがいい。

Andには注意。"A black and red dress"と書くと、"a red dress with a black (random item put here)"という扱いになりやすい。
なので可能な限りwithを使う。さっきの例なら"A black dress with red lace"などがいい。

### Description
他に入らない要素。アレルギーとか。
こちらは単語を羅列してはいけない。自然言語で説明すること。

### 役に立たない情報
heightとか、weightとかは普段使わない。比較して高いとかにすればいい。
Genderは英語なので普通にシナリオ書いてれば入る。
Sexualityは'Homophobic'など、否定形で入れておいた方がいい。
horny。性的に興奮した、という意味。DTF。down to fuckの略であり、短期的性的関係を望むという意味。AIキャラクターはなぜか()DTFが多いので、ロマンチックな関係を求めてhornyをぶち込むと後悔する。
Age。身長と同じくほぼ参照しない。

#### 種族特性
獣人設定とかはここ。

## Scenario & Char_Greeting & Example_Dialogue
シナリオ。状況を設定する。
キャラ挨拶。会話の最初の発言。
(ユーザーとの)会話例。別にユーザーの発言例を用意する必要はない。ただし一つの会話ごとに頭に`<START>`をつけて置くこと。**Description以上に大事な部分**。代名詞でAIを混乱させないよう、状況を説明するなら三人称を使うのが良いらしい。

キャラ設定だけでなく、世界観やロケーション、今起きている状況や雰囲気の設定も行う重要な部分。

## ちょっとひねった話
### トークン節約
「ボットを使用する目的」を明確にすれば、おのずと必要ない要素が見えてきて削れるようになる。

### アクセントと話し方
Exampleにアクセントつけたり話し方適用したりするのがいい。設定で「変な話方します！」は理解されない。

### 長期記憶
短期記憶はチャット履歴、長期記憶はシナリオが当たる。なので一個大きな目的を果たした後は**シナリオを書き換える**というテクニックも有効。

### シナリオの書き方
その場所にいる理由とか、自分のロール的目的とか。

### Example_dialogueの内容
普段は言わないけど大事にしてることとかに言及することで単語を強化、「Fuck off」などを入れることで人格への中程度の影響。

Youや{{user}}を使用することで、自分が好きなことや嫌いなことをボットに教える。

文そのもののミスは、そのまま出力に直結する。スペルミスとか無いように。
[Hemingway Editor](https://hemingwayapp.com)
[DeepL Write：AIを活用した文章作成アシストツール](https://www.deepl.com/write#en/Lost%2C%20best%20regards%20from%20now%20on.%20...First%2C%20I%20should%20collect%20information%20to%20live.%20What's%20name%20of%20this%20area%3F)


そいつが言わないような超健全セリフでも、ないよりかマシ。

出来るだけ長い方がいい。
