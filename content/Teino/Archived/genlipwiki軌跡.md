---
tags:
  - Info
---


daily:: [2023-12-31](/Daily_Note/2023-12-31.md)
up:: [Wiki](../Bar/Wiki.md)
up:: [JavaScript and TypeScript](../Bar/Program/JavaScript%20and%20TypeScript.md)

Notion
無料版だとゲスト10人
メンバーを追加すると有料プランに飛ばされる
有料プランの金はメンバーごとにかかる

@wiki
日本で人気
google spreadsheetを表示するプラグインがある
APIは提供されていない、非公式版はgetのみ
なのでローカルに情報を纏めることは出来ない
使うなら非公式APIでspreadsheetに情報を流すことになる

seesaawiki
フィルター可能
https://seesaawiki.jp/w/livedoor256789/d/%a5%C6%A1%bc%a5%D6%A5%eb%a4%CB%A5%D5%A5%a3%a5%EB%A5%BF%a1%bc%b5%a1%C7%BD%a4%f2%c4%C9%B2%C3%A4%b7%a4%DE%A4%b7%a4%bf
情報を読み取り更新なんてのは無いので、二度手間で書くことになる

wikiwiki
ゴミ

wikiru
公認wikiとして一定の評価
内部はぷきうぃき

wikidot
ゴミ

wiki.js
自己ホスティング
Heroku使ってぶっ建てましたという報告があるが、現在は使えない
https://zenn.dev/hellorusk/articles/79bb3fd8e59e18

fandom
wikipediaと同等のプラグインが使用可能
フィルタリングテーブルも使える
wikiが基本消せない




tagValue
Yamlタグ
existingTags
そのページにあるタグ、セット
tags
シャープタグ

スキルごとにタグを割り当てカードに反映すると混ざってしまう
防御アップと体力プラスを持つ奴が防御プラスで引っかかる、それはまずい
必ず防御orプラスのようなor検索になる

and検索のためには既にくっつけた後のandを用意すれば一応できる
防御プラスタグを用意すれば防御プラスは検索できるという話
ただそんなのタグ三つでも組み合わせで4つタグが増えることになる、めんどい
なのでnested tagを利用したい、防御/ステプラス/+100/Ⅰみたいな表記にすれば......体力関係で習得回復と一緒に使えなくなるけどしゃーないか。でもこうすると防御/＋100みたいな検索需要をまかなえない。

要は検索に対して、リンクされているファイルを跨いでの検索をしないでおきたい
二つ以上のタグは同じファイルにくっついている物のみ、ある意味and検索
春の息吹と霊撃力アップは両方 霊撃力 ステアップ でヒットさせたい

やっぱりスキル側から検索するしかなくない？



dataloom
一番notionに近い
nestタグは使えない、全て揃えて一つのタグ扱いになる
何かとエラー吐く
綺麗

make.md
ゴミ

sets
setsフォルダを設定して書く
なんかお堅い開発中、netedtagは非対応

db-folders
フィルタリングがしにくい

projects
どうやらローカルに何も情報を残さないらしい
netedtag対応
ださい



FileManager.processFrontMatter()
フロントマターを読む

src\main.ts
id: "add-column"
EventManager.getInstance().emit("add-column")でイベントを発火させる

src\react\loom-app\app\hooks\use-column-events.ts
EventManager.getInstance().on("add-column", handleColumnAddEvent);
でイベントを登録している
doCommand(new ColumnAddCommand());
で実際の関数登録

src\shared\loom-state\loom-state-factory.ts
createColumnで詰んだ
loomファイルに書きこむもの、loomを読み出すシステムがどこにあるか分からない

src\data\serialize-frontmatter.ts
たぶんこれ

CellTypeにOutgoing_Linkを追加する
内部処理はsrc\shared\loom-state\types\loom-state.tsと上ので済むが、外の表記になるreact内のCellTypeが何処か分からない


dataview
フィルタリングできる奴は書いた
スキル側からフィルタリングで割り出した後、ヒットしたbackリンクを被りなくして並べる


人によってフィルタリングは違うので動的コンテンツを作ることになる
spreadsheetに情報だけ流す

UNIQUE
指定した範囲でユニークにする

query
指定した範囲をwhereを使って絞れる


obsidian to notion


Notion API
titleしかない場合はNameが要らない
Tagsなど付けたいならNameが必要

[How to add new or existing multi-select tags when creating a page in Notion API? - Stack Overflow](https://stackoverflow.com/questions/75355011/how-to-add-new-or-existing-multi-select-tags-when-creating-a-page-in-notion-api)

metadataCacheはプライベートAPI、公式じゃないので変更される可能性がある
[Obsidian.d.ts misses \`metadataCache.getBacklinksForFile()\` definition · Issue #58 · obsidianmd/obsidian-api · GitHub](https://github.com/obsidianmd/obsidian-api/issues/58)
[How to get backlinks for a file? - Developers & API - Obsidian Forum](https://forum.obsidian.md/t/how-to-get-backlinks-for-a-file/45314)

自分用にカスタマイズして使う
[GitHub - Navirl/obsidian-to-notion: Share obsidian markdown file to notion and generate notion share link 同步obsdian文件到notion，并生成notion分享链接，可以方便的分享obsidian的文件。](https://github.com/Navirl/obsidian-to-notion)
metadataCacheからとれるのはObject。フロントマターのproperty typeを読めれば自動化できたが、そうじゃなかったので一つ一つ専用の処理書いた。Notionのrelationはファイル無いと繋げられず、繋げるのにPage IDが必要だったので断念してMulti＿Selectで代用。

Object.queriesの中でのKeyはstring。なのでmapで一発変換できる。

```ts
return Object.entries(app.metadataCache.getBacklinksForFile(file).data)
		.map(([key, _]) => key.match(/.*\/(.*)\.md/)[1]);
```

[[TypeScript]オブジェクト型を配列にする #TypeScript - Qiita](https://qiita.com/nori0__/items/0ef84350559cc5e93f4b)
[JavaScript で forEach を使うのは最終手段 #JavaScript - Qiita](https://qiita.com/diescake/items/70d9b0cbd4e3d5cc6fce)
[【Regex】後方からの最短一致 - Jaded Electric Sphere](https://mell0w-5phere.net/jaded5phere/2018/07/01/regex-minimum-from-back/)
[javascriptでの正規表現を用いて文字列を抽出する方法 #JavaScript - Qiita](https://qiita.com/kjgij/items/948448d83b57798b4374)

NotionAPIの簡単なJSONを読んで、2ファイルしかないObsidian to Notionを改修するだけで一日が終わった
最初からデータ構造を把握してればもっと早くなった、リファレンスはブロックごとに分けながらしっかり理解する


