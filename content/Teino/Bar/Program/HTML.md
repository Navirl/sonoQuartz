---
date: 2025-01-03
tags:
  - Bar
---

up:: [Programming](<./Programming.md>)

ウェブページの構造を定義する言語。

[MarkSheet: a free HTML and CSS tutorial - Free tutorial to learn HTML and CSS](https://marksheet.io)

## クライアントとサーバー

インターネット接続は情報を求めるクライアントと、それを提供するサーバーで出来ている。

## IPアドレス

各コンピュータはIPアドレスで識別される。

## ドメイン

IPアドレスは読みやすくするため、ドメインに割り当てられている。
右から.ごとにトップレベルドメイン（TLD）、ドメインネーム、サブドメイン。
ドメインネームはスペースやドット禁止。サブは無くてもいい。

ドメインはTLDを管理する会社、ドメインレジストラからレンタルできる。

## プロトコル
コンピュータ同士の対話の決まり事。
FTPはファイル転送だったり、HTTPはWeb閲覧だったり。

## URL
Uniform Resource Locator。プロトコル、ドメイン、パスをひとまとめにした文字列。
たとえば`https://marksheet.io/internet.html`なら、`https://`がプロトコルで`marksheet.io`がドメインで`/internet.html`がパス。

---

## Web
Webページが共有されるインターネットの一部。

## Webページ
HTMLで記述されたドキュメント。

## Webサイト
同ドメインのWebページのコレクション。

## ブラウザで開く
クライアントとしてWebページを保管するサーバーに問い合わせる。
このとき、ファイルはコンピュータに保存されない。常に最新のファイルを取得するため。

---

## HTMLコード
Wordが視覚的に書式設定するのに対し、HTMLはあくまでテキストに意味を与えるのが目的。
tagで構造化する。tagで囲まれたそれぞれはtag含めelement、要素と呼ばれる。

`<p>`はparagraph、段落。
`<a>`はanchor。たいていhref属性を追加してリンクを作る。

## attribute
属性。HTMLの追加情報。
tag内に表記され、ブラウザには表示されない。

基本は16個あり、全てオプション。
css用の`class`、ツールチップ用の`title`など。

一部の要素では属性が必須。
画像の`img`は画像パスの`src`が必須、など。

## Comment
`<!-- comment -->`
手で書くドキュメントと言えばやっぱり必要なやつ。
ブラウザに表記されない。構造も持たない。人間用。

## Self-enclosing elements
自己囲み要素。
一部のtagは開始tagしかない。
改行の`<br>`、画像の`<img>`、入力の`<input>`など。
すると中身が無く何も含められない。代わりにたいていは属性で情報を付加して使う。

---

## 要素分類
要素はブロック要素とインライン要素に分けられる。
**のは昔の話で、HTML5以降はそれぞれblockやinlineを指定できる**


- ブロック
    - `<p>`
    - lists: unordered list (with bullet points)`<ul>` or ordered lists (with numbers)`<ol>`
    - 見出し(heading)`<h1>`~`<h6>`
    - 記事`<article>`
    - セクション`<section>`
    - 長い引用`<blockquote>`
- インライン
    - リンク（アンカー）`<a>`
    - 強調（emphasis）（斜体）`<em>`
    - 大切な言葉（太字）`<strong>`
    - 短い引用`<q>`
    - 略語（abbreviations）`<abbr>`

ブロック要素の目的はページ主要部分の構造化。
インライン要素の目的はテキストの一部区別。

ブロック要素は開始タグと終了タグ、openingとclosingを持つ。
なのでself-enclosing elementは分類上インライン要素。

ブロックやインラインに当てはまらない要素もある。
代表はlist`<li>`のリスト項目、`<table>`とその行やセルを示す`<tr>`や`<td>`の内部。

斜体や太字は見た目ではなく、その意味に基づいて選択する。

---

## Nesting
ブロック要素内に複数のブロックやインライン要素を含めたり、インライン要素に複数のインライン要素を含めたりできる。

この時、それぞれの要素間にはparent, child, sibling（兄弟）, decendant（子孫、子以下をすべて含む）, ancestor（祖先、親以上をすべて含む）などの家族関係が成り立つ。

この関係はCSSで使える。

子タグは親タグより先に閉じる。

---

## HTML Semantics
HTMLの目的は、[ドキュメントに意味を与えること](<#HTMLコード>)。どのように見えるかは気にしない。そこはCSSの仕事。

---

ざっくりどこに使うかという分類。

## Structure elements: ページ整理
構造要素。ページの主要部分。
これだけで完結は普通しない。

- `<header>`
    - ページの最初の要素、ロゴやキャッチフレーズ
- `<nav>`
    - 様々なページに移動するリンクのリスト
- `<h1>`
    - ページタイトル
- `<article>`
    - ページのメインコンテンツ。ブログ投稿。
- `<footer>`
    - ページの最後の要素。

## Text elements: コンテンツ定義
Text要素。コンテンツの目的を定義するためのテキスト要素。

- `<p>`
- `<ul>`
- `<ol>`
- `<li>`
    - 個々のリスト項目
- `<blockquote>`

## Inline elements: テキスト区別
- `<strong>`
- `<em>`
- `<a>`
- `<small>`
- `<abbr>`

## elements ex
```html
<article>
  <h1>Main title of the page</h1>
  <h2>A subtitle</h2>
  <p>
    Something something an other stuff and some <em>emphasis</em> and even <strong>important</strong> words.
  </p>
  <p>
    Another paragraph.
  </p>
  <ul>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  </ul>
  <blockquote>
    Once said
  </blockquote>
</article>
<aside>
  <h3>My latest posts</h3>
  <ul>
    <li><a href="#">One</a></li>
    <li><a href="#">One</a></li>
    <li><a href="#">One</a></li>
  </ul>
</aside>
```

## Generic elements
汎用要素。コンテンツに適したセマンティック要素が無い、けれど纏めたりCSS用にグループ化したい。そういう時に付ける。

- `<div>`
    - ブロック用
- `<span>`
    - インライン用

## Don't overthink semantics
他にも要素は沢山あるが、紹介した奴以上を使うのは困ってからでいい。

---

