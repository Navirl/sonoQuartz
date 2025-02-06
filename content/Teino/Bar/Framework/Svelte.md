---
tags:
  - Bar
---

daily:: [2024-12-31](<../../Daily_Note/2024-12-31.md>)
up::
same:: [React](<../Library/React.md>)

Javascriptのフロントエンドフレームワーク。

これまでは仮想DOMというのが主流だった。
HTML構造をJavascriptでオブジェクト化複製、都度Diff取ってHTMLに反映していた。React等。

Svelteは事前コンパイルでDOMの変更があった部分のみを変更するコードを作成し適用する。今までが実行時解釈だったのに対し、これはビルド時に解釈して変換する。

またコンポーネントをJSXでなくHTML、CSS、jsの記法で書くのも特徴。
Reactから来てJSX使いたいならSolid.jsへ。

[フレームワーク「Svelte」「Solid」が話題。画期的だった仮想DOMと脱仮想DOMへの流れ | レバテックラボ（レバテックLAB）](https://levtech.jp/media/article/column/detail_411/?felosearch_translate=1)

## 基礎
.svelteという見慣れないファイルがあるが、中身はほぼHTML。
これにJSの変数とか簡単に使えるようにしたのがsvelte。
（この説明だとほとんどのフレームワークそうだな）

たいていは`<script>`,`<body>`,`<style>`で出来てるっぽい。

### 中括弧
scriptタグ内にJSを書ける。

HTML中で中括弧を使うと、JSで公開されている変数を使うことができる。
中括弧内はJSコードとして解釈されているので、メソッドも使える。

```html
<script lang="ts">
	let name = 'Svelte';
</script>

<h1>Hello {name.toUpperCase()}!</h1>

```

中括弧はテキストだけでなく要素属性でも使用可能。

svelteはアクセシビリティ関係のエラーを出す。
例えばimgは読み上げ用のaltがないとエラーが出る。

`src={src}`のように、属性名と値の変数が一致する場合は省略できる。

```html
<script>
	let src = '/tutorial/image.gif';
	let name = 'John';
</script>

<img {src} alt='{name} dances.'/>

```

### スタイリング
`<style>`タグ内ではコンポーネントにCSSを適用できる。
試しにpタグに直接適用する。

```html
<p>This is a paragraph.</p>

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

```

これはここにあるpタグのみに適用される。
**他からインポートしたりしたpタグには影響しない。**

## Nested Components
svelteは実質htmlなので、ネストできる。
イメージはsvelteファイル一つでレンダリングしたhtmlを入れ子にする感じ。

といっても外面はhtmlでなくsvelteコンポーネントなので、まずはJSらしく`<script>`でimportする。
それをJSXのように`<name />`で入れる、という流れ。

```html
<script lang="ts">
	import Nested from './Nested.svelte'
</script>

<p>This is a paragraph.</p>
<Nested />

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>
```

### HTML tags
変数内の文字列などは、通常プレーンテキストとして挿入される。
しかし場合によっては、文字列をコンポーネントとしてレンダリングしてほしい時がある。
このような場合、中括弧の文字列展開にタグをつける。

```html
<script>
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>

```

@htmlを挿入することで、HTMLとして挿入可能。