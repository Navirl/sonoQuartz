---
date: 2022-09-03
tags:
 - Info
---

up:: [Obsidian](<../Bar/GUI/Obsidian.md>)
up:: [Dataview inlink and tags](<./Dataview inlink and tags.md>)
source:: [Dataview](https://blacksmithgu.github.io/obsidian-dataview/)


```dataviewjs
dv.table(["link","inlink","num"],
	dv.pages('"Daily_Note"')
		.sort(b => b.ctime)
		.map(b => [b.file.link, b.file.inlinks,(b.file.inlinks).length]))
```
