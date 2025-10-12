---
date: 2023-04-08
tags:
 - Info
---

up:: [WSL](<../Bar/CLI/wsl.md>)

いろいろ情報があるが、今はwslをシャットダウンしてからwindowsのアプリ設定で移動すればいいだけ。redditの二個目の返答がそのまま使える。

[Ubuntu(WSL2)をCドライブからDドライブへ引越す](https://zenn.dev/shittoku_xxx/articles/066cfd072d87a1)
[WSL2環境をDドライブに移動する。 - programwiz.org](https://programwiz.org/2021/06/26/how-to-move-wsl2-d-drive-from-c/)
[windows 10 - Is there any way to install WSL on non-C drive? - Super User](https://superuser.com/questions/1572834/is-there-any-way-to-install-wsl-on-non-c-drive)

`wsl --export <Distribution Name> <FileName>`
`wsl --unregister <Distribution Name>`
`wsl --import <Distribution Name> <InstallLocation> <FileName>`
`/etc/wsl.conf`
```
[user]
default=user-name
```
