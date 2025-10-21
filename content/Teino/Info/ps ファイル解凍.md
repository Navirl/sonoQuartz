---
date: 2022-09-14
tags:
 - Info
---

up:: [PowerShell\_and\_Command-Line](<../Bar/CLI/PowerShell_and_Command-Line.md>)
source:: [Expand-Archive (Microsoft.PowerShell.Archive) - PowerShell | Microsoft Docs](https://docs.microsoft.com/ja-jp/powershell/module/Microsoft.PowerShell.Archive/Expand-Archive?view=powershell-7.2)
source:: [PowerShell 5.0で2GB以上のファイルをzip圧縮する - Qiita](https://qiita.com/qtach1/items/667a2160e5e2a421fcd2)
source:: [7-Zipのコマンドライン操作 | CGBeginner たてはま](https://cgbeginner.net/7-zip/)

Expand-Archiveにファイルを渡せば解凍できる。
..…のだが、**UTF-8にしか対応していない**。Shift-JISを解凍するなら直接.Net Frameworkを呼び出すか、7zipでやる。

7zipでやる場合は書き方に注意。`x`ならフォルダ構造を保って解凍できる。
解凍場所は`-o`で指定できるが、このパスは`-o`からスペースを挟まず書くこと。じゃないとエラる。
