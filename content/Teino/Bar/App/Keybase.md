---
date: 2022-10-27
tags:
 - Bar
 - App
---

up:: [Git](<./Git.md>)

大体なんでも暗号化できるサービス。
ファイルストレージが何故か個人に無料で250GB配られる。

Gitも使える。
暗号化のためにhttpsでもsshでもない、keybaseプロトコルで通信している。クライアントによっては対応してないので注意。中身はgitの機能だけで実装してるので、gitが動くなら動く。

[Keybaseの暗号化 git を理解するためのポイント — Commerce Hack](https://tech.degica.com/ja/2017/10/06/keybase-git/)

2022/10/28現在、iOSではKeybaseプロトコルに対応したクライアントは無い。libgitは言わずもがな、ishも中身alpineなのでダメ。workingcopyすら未対応。

泥はtermuxあるから平気。

だからwindowsでkeybaseとgitlab両方やって、windowsとAndroidでkeybase、iOSでgitlab使うみたいな運用考えたが、まあ、うん、めんどい。keybaseを使う理由が暗号化なので、gitlabでも分散管理とかするならそもそも使わなくていいし。


