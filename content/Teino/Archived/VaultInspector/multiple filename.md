名称重複ファイル
```dataviewjs
let all_page = dv.array(dv.pages().file.sort(v => v.name, "asc"));
let all_page_name = dv.array(all_page.name);
let result = [];
for (let index = 1; index < all_page_name.length; index++) {
    if (all_page_name[index - 1] == all_page_name[index]) {
        result.push(all_page[index - 1]);
        if(all_page_name[index] == all_page_name.last || all_page_name[index] != all_page_name[index + 1]){
            result.push(all_page[index]);
        };
    }
}
dv.table(["Path","Link"],dv.array(result).map(d => [d.path,d.link]));
```

[DataviewJS Snippet Showcase - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/dataviewjs-snippet-showcase/17847/12)

dv.pages()で返ってくるのはDataArrayという専用の奴。
ここのメソッドが使える。DataArray作るならdv.array()に配列なり突っ込めばいい。
[Data Arrays - Dataview](https://blacksmithgu.github.io/obsidian-dataview/api/data-array/)

dataviewではconsole.logが使える。
ctrl+shift+iでdevtoolを開けば確認可能。