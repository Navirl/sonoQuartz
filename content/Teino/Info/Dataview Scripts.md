---
tags:
 - Info
---

daily:: [2022-09-03](Daily_Note/2022-09-03.md)
up:: [Obsidian](../Bar/App/Obsidian.md)
up:: [Dataview inlink and tags](Dataview%20inlink%20and%20tags.md)
source:: [Dataview](https://blacksmithgu.github.io/obsidian-dataview/)


```dataviewjs
dv.table(["link","inlink","num"],
	dv.pages('"Daily_Note"')
		.sort(b => b.ctime)
		.map(b => [b.file.link, b.file.inlinks,(b.file.inlinks).length]))
```
