---
date: 2024-12-17
tags:
  - Info
---

up:: [remark](<./remark.md>)

treeとfileを引数に持つfunctionをexport defaultしとけばいい。
任意でoptionを引数に持てる。

treeは[remark](<./remark.md>)で解説した木構造？
これを引数に持ち、いろいろ解析できる便利な関数がmdastやunifiedやunistにあるっぽい。

frontmatterのobsidian nested tagsを自動処理させたかったが、remarkはエラーは出せても自動修正をしてくれない。
できてるプラグインはあるので何か方法はあるんだろうけど分からない。

markdownlint-cli2はfrontmatterをサポートしてないせいでなんかうまくいかない。

もう手動でやれと思ったが、nested tag使用のノート300くらいあって困ってる。今はもうほとんど使ってないのに。