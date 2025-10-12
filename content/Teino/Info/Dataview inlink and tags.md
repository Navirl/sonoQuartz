---
date: 2022-07-01
tags:
 - Info
---

up:: [Obsidian](<../Bar/GUI/Obsidian.md>)
source:: [Queries - Dataview](https://blacksmithgu.github.io/obsidian-dataview/query/queries/#from)
source:: [Sources - Dataview](https://blacksmithgu.github.io/obsidian-dataview/query/sources/)
source:: [[Bug] file.inlinks not working correctly · Issue 196 · blacksmithgu/obsidian-dataview · GitHub](https://github.com/blacksmithgu/obsidian-dataview/issues/196)

```dv
dv.list(dv.pages("#Info").file.link)
```

```dv
let inlink = dv.current().file.inlinks;
let info = dv.pages("#Info").file.link;
let sets = new Set();

for(let All of inlink){
	dv.list(dv.page(All));
}
//dv.list(dv.pages().file.tags.where(t => t.startsWith("#Info"));

dv.list(info);
dv.list(inlink);
//dv.list(info.tags.where(t => t.startsWith("#Info"));
```

```dv
for(let inlink of [[dv.current().file.inlinks]]){
	dv.pages(inlink)
}
//dv.list(dv.current().file.inlinks)
//dv.list([[dv.current().file.inlinks]])
```



dv.current().file.inlinks.array()
現在のファイルにリンクされてるファイルの配列はある。
ここから、Infoタグが付いてるファイルの配列を見つける。

bookタグの付いたページに、さらにgenreセクションだけをgroup名義で回す。
dv.tableはヘッダーリストと2D配列が必要。
2D配列はファイルの持つそれぞれの要素を.mapでマッピングしてやればできる。

FLATTENは分割。
あるファイルが複数のフィールドを持っていた場合に、列を分割して表示する。

inlinksで出てくる奴からなんとかpages情報を抜けないか？

```dv
//現在のファイルのパス
let page = dv.current().file.path;
//セット
let pages = new Set();

//現在のファイルパスを入れた配列
let stack = [page];
//ファイルパス配列が1つ以上なら
while (stack.length > 0) {
	//elem変数にファイルパスをポップ
    let elem = stack.pop();
    //ファイルパスの情報をmeta変数に
    let meta = dv.page(elem);
    //もしmeta変数が空でないなら
    if (!meta) continue;

	//inlink変数用意
	//meta変数からファイルのinlinks情報を抜き、outlinks情報と結合し、配列化して回す
    for (let inlink of meta.file.inlinks.concat(meta.file.outlinks).array()) {
        //ログにinlink変数の中身を出力
        console.log(inlink);
        //もしセット変数にinlinkされてるファイルのパスが存在すれば、さっさと次のforへ
        if (pages.has(inlink.path)) continue;
        //セット変数にinlinkのパスを加える
        pages.add(inlink.path);
        //ファイルパス変数にinlinkのパスを加える
        stack.push(inlink.path);
    }
}

// Data is now the file metadata for every page that directly OR indirectly links to the current page.
let data = dv.array(Array.from(pages)).map(p => dv.page(p));
dv.list(data.file.link);
```

結局、最終的にはjsではなく普通のクエリを使うことで解決。
