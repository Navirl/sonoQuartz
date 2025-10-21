---
date: 2022-11-12
tags:
 - Info
---

up:: [PowerShell\_and\_Command-Line](<../Bar/CLI/PowerShell_and_Command-Line.md>)
up:: [Scoop](<../Bar/CLI/Scoop.md>)
up:: [font](<./font.md>)

意味が分からないのだが、ダブルクリックじゃなく設定からフォントインストールしないと読み込んでくれないソフトがある。
インストール場所はどっちにしても`ユーザーフォルダ\AppData\Local\Microsoft\Windows\Fonts`。シンボリックリンクでも張ってるのか。

とか思ってたら再起動で全部消えた。ファイル位置は変わっていない。意味が分からない。
ちゃんと全ユーザー向けにインストールしてしまおう。`C:\\Windows\Fonts`に入るらしい。

