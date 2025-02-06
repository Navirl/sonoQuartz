---
tags:
 - Info
---

daily:: [2022-10-30](Daily_Note/2022-10-30.md)
up:: [PowerShell_and_Command-Line](../Bar/App/PowerShell_and_Command-Line.md)
source:: [それ PowerShell でできるよ - Qiita](https://qiita.com/cd01/items/da9a36582372e7d0a7f6#xargs)
source:: [PowerShell/UNIX系コマンド群との対応/xargs - yanor.net/wiki](https://yanor.net/wiki/?PowerShell/UNIX%E7%B3%BB%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E7%BE%A4%E3%81%A8%E3%81%AE%E5%AF%BE%E5%BF%9C/xargs)

`%{$_}`で展開する。これはfor-each object。
さらに文字列を編集したいなら+でくっつければOK。

linuxの話だが、xargsはかなり古いコマンドであり、本来開発者向け+適当に詰め込まれたオプションにより仕様が複雑。
同じく展開として$()が使えるので、使わないのが吉。

https://qiita.com/ko1nksm/items/34cd96d39c2c5cd80eb4