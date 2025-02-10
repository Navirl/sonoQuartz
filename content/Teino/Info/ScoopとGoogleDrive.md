---
date: 2022-09-14
tags:
 - Info
---

up:: [Scoop](<../Bar/App/Scoop.md>)
source:: [Download big file from Google Drive with PowerShell · GitHub](https://gist.github.com/RGPaul/f1a306097d46a69a09c25ca34b79a804)
source:: [Trying to download Google Drive file in powershell using Invoke-webrequest just gets the HTML for the "we can't scan this for viruses" page. : PowerShell](https://www.reddit.com/r/PowerShell/comments/phkr76/trying_to_download_google_drive_file_in/)
source:: [App Manifests · ScoopInstaller/Scoop Wiki · GitHub](https://github.com/ScoopInstaller/Scoop/wiki/App-Manifests)
source:: [App Manifest Autoupdate · ScoopInstaller/Scoop Wiki · GitHub](https://github.com/ScoopInstaller/Scoop/wiki/App-Manifest-Autoupdate)

ファイルへの共有URLを適切な形に書き換えればインストールは可能。
例：`https://drive.google.com/uc?export=download&id=1nz8E211Rt26w9sg4YlCjg5D65UOtszmz&confirm=t&uuid=97c65704-1531-4ac7-8a4c-97d0a8305c91`
100MB以上だとウイルスチェックが入らないため、confirm以下が必要になる。
なおScoopでダウンロードすると、ucなど適当なファイル名になっているので注意。

また、ファイルの中身が変更されると当然URLのid部分は変更される。
つまりアップデート後のURLが予測不可能。そのためオートアップデートが困難。そうでなくてもGoogleって頻繁に仕様変更してる気がするしこの記事もいつまでもつか……

pre_installでダウンロードしたことにすれば何とかなるかもしれない。ただしこの要素はcacheをダウンロード→インストールの間に実行されるので、ダウンロードをミスると実行されないし、下手にpre_installでもダウンロードするとcacheファイルが二つになる。注意。