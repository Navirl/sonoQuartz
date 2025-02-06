---
tags:
  - Bar
aliases:
  - md
---

daily:: [2021-08-06](/Daily_Note/2021-08-06.md)
up:: [Programming](Programming.md)


上にYAML Front-Matterを挿入

しれっとHugoでは一つの改行が効かない。Notionと同じくブロック単位で管理している模様。



## エスケープ
\でエスケープできる。
適宜解説で使う。

## 改行
\<br>で改行できる。
後ろに二つ以上のスペースや、
円記号を入れる方法なんかもある。\
互換性を考えるなら\<br>かダブルスペース。

<br>

## コメント
\<!--この中に書いたことはレンダリングされない。-->

\<!--このまま
改行もできる。-->

\[](ただ上記はHTMLの記法なので、Markdownでやるならこんな感じの空リンクを作るのが一番。)

\[](
	無論こっちも改行可。
)

\%%obsidianなら、このようにパーセントで囲むことでエスケープできるっぽい\%%

やっぱり独自記法だけど。


<ちなみに、うっかりやりやすいこととして、このカッコに英字だけ入力するとhtmlタグとして認識され、レンダリングされなくなる。>

\<konoyouni>

<br>

## Code - コードブロック
```python:test.py
print("バッククォート三つで囲うことでコードブロックが作れる")
print("始めのクォートの方に言語名、その後ろにコロンを挟むとファイル名が足せる")
```
`インラインコード`もできる
```markdown
ちなみにマークダウンも一言語なので
**こういうこと**ができる。
```

Qiitaでは`rgb(255,0,0)`とかカラーコードとかで色が出るらしい。
また、mathを言語指定することでLaTeX記法の数式が書けるがObsidianは非対応。
LaTeXが使いたいなら\$$で囲う。

[LaTeX](LaTeX.md)


	ちなみに、行頭にタブを入れるとコードブロックになる。
	これはどこで使うんだ。

<br>

## Format Text - テキストの装飾

### Headers - 見出し

```markdown
# シャープと半角スペースを置くと見出しが作れる
## 実用はH3まで
### H3はほとんど太字と変わらない
```

また、\==や--を見出しにしたい文字の下に置くことでも作れる。

```markdown
こんな風に。
==

=はh1で、-はh2。
--

記号は二つ以上必要。
```

ちゃんと上下に空行を作ること。

<br>

### Emphasis - 強調

*アスタリスクかアンダーラインで囲って強調*

_ひとつだとitalicになる（Obsidianだと英文だけっぽい？）_

**太字はどちらも問題ない**

__前後空白が必要な場合もあるもよう__

主流はアスタリスク。

### Strikethrough - 打ち消し線
~~波線二つで囲めば打ち消せる~~


### Details - 折り畳み
<details><summary>detailsタグで囲むことで、折り畳み文章が作れる。</summary>その中でsummaryタグに囲まれた文章は、折り畳みの要約になる。</details>

<details><summary>折り畳みの中では、基本的に**マークダウンが使えない。**</summary><div>
```
ただしdivタグと前後空白or改行で囲めば……Obsidianでは無理っぽい。残念。
```
</div></details>

また、Hugoだとこういうタグ系は **見えなくなる** 。
そらそうよ、これhtmlの記法であってMarkdownじゃないもん。

<br>

## Lists - リスト

### Disc型
* 文頭にアスタリスクか
+ プラスか
- マイナス、それに半角スペースを置くとDisc型リストになる
	- 手前にインデントを入れるとネストできる
- マイナスというかハイフン推奨。

### Decimal型
1. 数字とピリオドと半スぺでDecimal型リスト
2. 1.1.1.と振り、あとから要素を挿入するときの手動振りなおしを避けるテクニックがある
3. Obsidianは途中で改行を挿入しても全部数字を振りなおしてくれるので安心
4. **行頭にタブがあると数字を振ってくれない**

### Definition型
用語を書き、
: コロンとスペースを二行目以降に入れて定義を書くとDefinition型リスト……
: なのだが、割と一部でしか対応してない。ObsidianもNotionも非対応。
まあ、単純に太字にすればいいもんな。

```Markdown
余談だけど
**strong** = <strong>strong</strong>
_italic_ = <em>italic</em>
`code` = <code>code</code>
でも
[link](test) ≠ <a href="test">link</a>

Obsidianだと左はローカルファイルのリンクになれるが、右は必ず外部宛てのURLになる。
右はhtmlだし当たり前ではある。
```

### Checkbox型
- [ ] Disc型の後ろに[ ]を入れるとチェックボックスになる
- [x] [x]にするとチェック入りになる、前後スペースを忘れずに

<br>

## Blockquotes - 引用

>文頭に>を置くだけ。
>>二つ書けばネスト。

>Obsidianだと前後空行は要らない。
>**マークダウンが効く。**

<br>

## Horizontal rules - 水平線

***
___
---

アスタリスク、アンダーライン、ハイフンのいずれかを三つ並べると水平線になる。
前後空行推奨。

<br>

## Links - リンク
`[link](URL "title")`
title付きのリンクを設定できる。
titleはマウスホバーで確認可。
ObsidianではURL部分が<u>リンクするマークダウンファイルのタイトル</u>になる。

スペースがあると誤検知するので、大体はパーセントエンコーディングを挟む。これがまた忘れやすい。

また、頭に!をつけることで展開された状態でリンクを張れる。
これを応用して画像を貼ったり別ファイルを丸々引用したりできる。
更に二重化することでローカルファイルにリンクを張れるみたいだけど、それはObsidianだと正しく表記されない。
[![片翼女神さま](片翼女神さま.jpg "いいね")](https://www.markdownguide.org/basic-syntax)
リンクを最短にすることによってフォルダー移動したとしてもリンク維持することができる。
Wikilinks使えばいいんですけど。
### alias
```markdown
[this][alias]
[alias][]
[alias]:[URL]
```
URLのエイリアスを設定できる。
二行目はエイリアスを直接リンクとしたいときに。
<font color='#F6C0C0'>でもObsidianだと機能しない。</font>

Obsidianで機能させるには、<u>リンクしたいMarkdownファイル</u>のFront matterブロック（Markdownファイルの一番最初に置くハイフン三つで囲んだブロック）に
```markdown
---
aliases:[alias1, alias2]
---
```
と書く。
こうすればwikilinksで`[[alias1]]`と書こうが`[[alias2]]`と書こうが同じファイルに行きつく。
リンクされてる側から書かなきゃなんで使い勝手違うけど。


あったわ。`[[Title|URL]]`

<br>

## 注釈
これが注釈。[^1]

[^1]:\[^ [^ty] key]で始めると注釈.。注釈の中身は \[^key]: を頭に付けて書く。keyは何でもいい。ただスペースやタブは不可。
[^ty]:サーカムフレックス（英）またはアクサンシルコンフレックス（仏）。キャレット（‸）は厳密には別の記号。そっちは文字挿入に使うらしい。

<br>

## Table記法

| Left align | Right align | Center align |
|:---------- | -----------:|:------------:|
| This       |        This |     This     |
| column     |      column |    column    |
| will       |        will |     will     |
| be         |          be |      be      |
| left       |       right |    center    |
| aligned    |     aligned |   aligned    |

ハイフンと縦棒で書くやつ。コロンでalignを決める。
ふつうは入力補完を頼る。 
align決めてる部分は別にハイフンの数を合わせる必要はない。見栄え。
ただし書かなくていいわけではない。
**真上に見出しなどではない文字があると無効化される。**
Hugoだと真下に文字があると無効化されるっぽい。もう上下改行すれば安定じゃないかな。

<br>

## その他
==イコール二つで囲むことでハイライトができる。==
割と物による。

> [!warning]
> `> [! name]`でいろいろなAnnotateが出せる。ObsidianではCall outという名前。使えるのは以下の通り。

>[! note]

>[! abstract]
>summary, tldr

>[! info]
>todo

>[! tip]
>hint, important

>[! success]
>check, done

>[! question]
>help, faq

>[! warning]
>caution, attention

>[! failure]
>fail, missing

>[! danger]
>error

>[! bug]

>[! example]

>[! quote]
>cite

## Mermaid
[Mermaid](../../Teino/Bar/Mermaid.md)

	
[基本構文| マークダウンガイド](https://www.markdownguide.org/basic-syntax#headings)
[拡張構文| マークダウンガイド](https://www.markdownguide.org/extended-syntax/#heading-ids)
[ObsidianMarkdownリファレンス| マークダウンガイド](https://www.markdownguide.org/tools/obsidian/)
	

## PDF変換
記法じゃないが、NotebookLMを使うのに欲しかったので。
Obsidianのノート全体をPDF化。

まずは一つのノートにまとめる。

```powershell
Get-ChildItem -Path "D:\Dropbox\Sonolart\Teino\Novels" -Include *.md -Recurse | Get-Content | Set-Content combinedFile.txt
```

そのあとPandocやMarpやmistuneで変換するのだが、クッソ長いのを直接やると失敗する。
なのでHTMLに変換してからブラウザ印刷機能でPDFにするのが良い。

## lint
### remark

remark-frontmatterを入れないとfrontmatterに対応できない。
->frontmatterに変なformat掛けないだけで、別にfrontmatterにlintかけられるわけではなかった。

frontmatterの抽出だけなら以下。
[Remark プラグインを使って Markdown から Front Matter を抽出する - Neo's World](https://neos21.net/blog/2020/11/12-01.html)

remark-cliを入れないとcliから手軽に使えない。

remark-cliの設定はjson,yaml,js,package.jsonへの直書きなどが可能。
[remark/packages/remark-cli at main · remarkjs/remark · GitHub](https://github.com/remarkjs/remark/tree/main/packages/remark-cli#example-config-files-json-yaml-js)

だいたいはjs,tsで設定を書いてる。
jsonへ変換するには、まずtype Optionsを見る。
例えばremark-frontmatterならこのように変換する。
```ts
type: string
```

```json
"remarkConfig": {
    "plugins": [
        [
            "remark-frontmatter",
            {
                "type": "string"
            }
        ]
    ]
}
```
[GitHub - remarkjs/remark: markdown processor powered by plugins part of the @unifiedjs collective](https://github.com/remarkjs/remark?tab=readme-ov-file)
[GitHub - remarkjs/remark-frontmatter: remark plugin to support frontmatter (YAML, TOML, and more)](https://github.com/remarkjs/remark-frontmatter?tab=readme-ov-file#options)

APIとCLIの二種がある。
cliで使う場合はremarkConfigに書くか、--useオプションで指定する。
[remark-cli を試す](https://zenn.dev/hankei6km/scraps/7fae1422b8ad4c)

remark-lintとその拡張ルールで警告を出してるのは分かったが、どこでどうやって修正してるのかは分からない。


### markdownlint
markdownlintは使うのが簡単だが新しいルールを追加するのは難しそう。
調べていくとmarkdownlintでも独自ルールを追加できそう。
標準だとfrontmatterは無視するオプションで無視が一番らしい。
[frontmatter handling · Issue #442 · markdownlint/markdownlint · GitHub](https://github.com/markdownlint/markdownlint/issues/442)

## mdx
markdown中でjsxを使うような記法。
コンポーネントとして使いまわすことができ、よりリッチな表現ができる。

[試してみよう、MDX | 第1回 MDXの主要な機能の概要](https://www.codegrid.net/articles/2022-mdx-1/)
