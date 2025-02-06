Daily_Noteフォルダのバックリンクが無いファイル
```dataviewjs
const ex = dv.pages('"Daily_Note"')
	.where(b => b.file.inlinks.length == 0)
	.map(b => [b.file.link,b.file.path]);

dv.table(["link","path"],ex);
```
