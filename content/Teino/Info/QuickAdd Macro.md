---
tags:
 - Info
---

daily:: [2023-03-19](/Daily_Note/2023-03-19.md)
up:: [Obsidian](../Bar/App/Obsidian.md)

dataviewで取ったリストを上から読み取り、.trashに送る
贈る前に確認でリストを表示

dataviewの値を外からとることは難しそう。APIのほとんどが非公開でありObsidian上から触れない。データも外に出せない。まあDataviewはjs実行できるんで、下手に公開するとセキュリティホールになるんだろうけど。
といってquickaddのAPIはほとんどモーダルのモノであり何もできん。

となると一旦CSVにしてから読み込むのがいいのか。

[Export Dataview as CSV - Help - Obsidian Forum](https://forum.obsidian.md/t/export-dataview-as-csv/37719/2)

`module.exports`でentryに入れた名前の関数が実行される。
settingsを定義すると、オプションから値を手動で決定できる。
めんどければ、async functionをそのまま突っ込めば直接実行してくれる。
無名関数を突っ込んでもいい。

引数は第一引数paramsが入力、第二引数settingsが設定。
paramsはapp構造体、obsidianメソッド、quickAddApiメソッド、variables基本関数の四つが入っている。
必要なものだけ`const {}`で受け取っておけばスマート。

[ecmascript 6 - JavaScript (ES6) const with curly braces - Stack Overflow](https://stackoverflow.com/questions/33798717/javascript-es6-const-with-curly-braces)

[Vault | Obsidian Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/reference/typescript/classes/Vault#getallloadedfiles)
[obsidian-dataview/plugin-api.ts at 5b052421b90d6653da29542316f5f26501821f5b · blacksmithgu/obsidian-dataview · GitHub](https://github.com/blacksmithgu/obsidian-dataview/blob/5b052421b90d6653da29542316f5f26501821f5b/src/api/plugin-api.ts)
[Zotero Import Script · chhoumann/quickadd · Discussion #421 · GitHub](https://github.com/chhoumann/quickadd/discussions/421)
[Macro: Move notes with a tag to a folder | QuickAdd](https://quickadd.obsidian.guide/docs/Examples/Macro_MoveNotesWithATagToAFolder)
