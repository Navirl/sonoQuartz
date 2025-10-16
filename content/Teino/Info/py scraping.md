---
date: 2024-05-25
tags:
  - Info
---

up:: [Python](<../Bar/Program_lang/Python.md>)

静的コンテンツならばrequestsでアクセス、BeautifulSoupで解析すればいい。
動的コンテンツならpyppetter、playwright、seleniumが使える。
seleniumのほうが多重にタスクを管理したりできるが、playwrightなどのほうがシンプル。

waitは秒数指定だけではない。
[Playwrightで秒数指定wait処理を避けてスマートにする テスト自動化 - Qiita](https://qiita.com/yurinzflet/items/f9b67106f2aa462b214c)

colabで動かすのも可能。
[Google Colab上からplaywright-pythonを実行](https://zenn.dev/terukizm/articles/f89cd8639abb9a)



## 場所指定
### outerHTML
HTML要素の操作。

HTMLの外部HTMLを取得する。
要素の文字列を返す。
### Selector
特定DOM要素の操作。

CSSセレクタやJSのドキュメントオブジェクトモデルのメソッドを通り、特定のDOM要素を選択する。
CSSセレクタはページ内の特定の要素を返せる。
JSのDOMメソッドは要素を検索して返せる。
### JS Path
コード内の値や操作。

JSにおける変数や関数の参照を返す。
コード内での値や操作のアクセス方法を定義する。
スコープ、名前空間、構造などに影響を受ける。
### スタイル
ウェブページの見た目の制御。

CSS。
### XPath
XML文書の特定の要素。

XML Path Languageの略。要素や属性を選択するための言語。
特定のノードや属性に強く、スクレイピングやテストは大体これ。

`//div[@class='example']`の場合、exampleクラスを持つdiv要素を選択する。

### Full XPath
文書のルートから始まり、選択した要素までの全ての階層を指定する。
構造が分かりやすいが長い。


## Playwright
### Browser
playwright.chromium.launch()でまずBrowserオブジェクトを取得する。
このオブジェクトは複数のContextを持つ。

### Context
Contextはセッションを表し、ユーザーやプロファイルに関連付けられたページを状態を保持する。
複数のページを持ち、各ページは独立したタブやウィンドウとして扱う。
このオブジェクトは複数のPageを持つ。

### Page
Pageはウェブページを表す。ここを通じて内容を操作したりネットワーク通信を監視したりできる。

.locator()に文字列で任意のセレクタを指定すると、elementが取得できる。

### locator
[Locators | Playwright Python](https://playwright.dev/python/docs/locators)

`get_by_role()`,`get_by_text()`,`get_by_label()`,`get_by_placeholder()`,`get_by_alt_text()`,`get_by_title()`,`get_by_test_id()`などでページを検索出来る。
より重要なものを指定すると変更されにくい。

role
役割。inputのtype属性やbutton属性などが取れる。
それがかかっている名前も`(hoge, name=fuga)`などの形式で渡す必要がある。
人間が探すのと近いので推奨。なお、これは重ねて適用できる。

label
ラベル。ラベル属性の内部を検索する。

placeholder
フォームに既にある値、placeholderで検索できる。
ラベルのないフォームに。

text
テキスト。部分(デフォ)、完全(,exact=True)、正規表現(re.compile(,))が使える。
divやspanなど非インタラクティブ要素に。

alt_text
画像用。

title
title属性。

test_id
テストID。ユーザー向けではない。
ちなみに基本のdata-id以外の形式を使う場合は最初に設定しておく。

CSSまたはXPath
page.locator("css=hoge")、("xpath=fuga")などで使える。
ただし長いし変更されやすいので非推奨。

その他
- リストを直接検索する.to_have_text()というメソッドがある。
- 親要素をフィルターで取得できる。
- ReactやVueで検索できる。
- **divのclassはlocator(.class)で取得できる**
    - [これだけはおさえておきたいPlaywrightコマンド集 CSS - Qiita](https://qiita.com/oh_rusty_nail/items/d955e3273994214a0afa)
    - locatorを直接使うことはDOM要素の指定と同じらしい
        - [Page | Playwright Python](https://playwright.dev/python/docs/api/class-page#page-locator)
    - このドット記法はdiv.classの省略形、CSSセレクタ―
      二つ以上ある場合はdiv:class1.class2のようにチェイン出来る

