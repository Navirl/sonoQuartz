---
date: 2025-09-25
time: 16:26
tags:
 - Info
---

up:: [ST](<../Bar/GUI/Sillytavern.md>)

[World Info Encyclopedia](https://rentry.co/world-info-encyclopedia)

キャラクターの伝承を収めたもの。リンクされている特定のキャラクターに適用される。

よく似たWorld Infoはグローバル環境ファイルであり、こちらは全てのキャラクターに適用される。
ただし構造はLorebookとほぼ同じ。なのでLorebookの中身のことを指してWorld Infoと呼ぶこともある。

## 基本
キーと値のペアのセット。
ペアの作成方法はEnvironmentとLoreの二つ。

EnvironmentはシンプルなPList。
LoreはPListとAli:Chatの組み合わせ。

### Environment
値には場所、建物、ランドマーク、家屋などのエリアやオブジェクトを記述。

`[Mossford(The town of Moss): town, mossy buildings, moss used for(magic, power), has(tavern, bank, inn, castle), kind people, wealthy]`

キーには関連する情報を記述する。この場合は`Mossford,town,moss`など。

ただ町とだけしたい場合は、完全なPListでなくても`Mossford(town)`などとしてトークンを節約してOK。

### Lore
`[slime: enemy, slimeball, made of gelatin, bounces to move, annoyance]`

```
{{user}}: Slime?
{{char}}: "Oh... Those things." She looks down and slightly blushes in embarrassment. "I remember first fighting those things. They're so quick that it's hard to get a good strike on them." Shizuru brushes away the memory. "Anyways, let's keep going. There's more places to explore."
```

PListでオブジェクトとその説明になるエントリを作成し、Ali:Chatでエントリについてどう考えているか記述する。
キーを言及した際にこれらの情報が注入されるイメージ。

Ali:Chatは必須ではない。言及する必要があるもののみ。

キーは`slime,slimes`になる。PListとAli:Chatのどちらも同じキーになるが、必要に応じてどちらかにだけ追加してもいい。

ここに記述すれば、その場合のみ衣装を変更することもできる。
## Specificity
主キーと副キーを設定し、その両方が提示されない限り注入しないという設定が可能。キャラの家に対し主に`home`、副に`name`など。

## Replacing the Author's Note
Author's NoteにキャラクターのPListを追加する代わりにLorebookを使用することができる。
こうするとAuthor's Noteを本来の用途でメモにできる。

まずキャラクター用にLorebookを作成。
新しいエントリでキャラクターのPListを追加。
エントリをConstant、常に参照に追加。
At Depthで深さを4に指定。
キャラクターカードにLorebookを関連付け。

この状態でカードをエクスポートすると、Lorebookが埋め込まれた状態で出せる。インポート時にそのまま使えるため便利。

## Recursive Scan
値に別のキーを追加することにより、一つの値から二つの値を順々に注入できる。

## Recursion scalability
毎回いろんな値が再帰的に注入されるとコンテキストを圧迫するので、再帰では共起されないように`Non-Recursable`設定値が存在する。

## Lorebook stacking
あるLorebookをコアとし、そのバリエーションを作ることができる。Auxillary Lorebook。
あるキャラクターについてNSFWを作る時などに使う。

## Character filter
World Infoは誰に読めるようにするかを制御するフィルター機能がある。filter to character(s)。










