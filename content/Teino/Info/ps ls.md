---
date: 2022-10-30
tags:
 - Info
---

up:: [PowerShell\_and\_Command-Line](<../Bar/CLI/PowerShell_and_Command-Line.md>)
source:: [コマンドプロンプトとPowerSHellによるファイルとディレクトリの検索 - Qiita](https://qiita.com/gtom7156/items/cb72e5517ca16dc480c1)
source:: [PowerShellで文字列検索してみよう](http://excel.wp.xdomain.jp/?p=88)

[PowerShellでlsの結果をgrepのように絞り込みたい。 | 迷惑堂本舗](https://maywork.net/computer/powershell-ls-grep/)

Get-Childitem。まあlsやdirでも動くが。
オプションを見たいときは`-?`で出力できる。

絞り込みは`-filter`、もしくは普通にファイル名付けて実行。`*`と`?`が使える。
パイプで渡して変数に入れれば正規表現が使える。

Include・Excludeで文字含む・含まないの検索が効く。
複数セットするときは`,`で区切る。


grepだけやりたいなら`Select-String ""`でできる。

