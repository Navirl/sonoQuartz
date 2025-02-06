---
tags:
 - Bar
 - App
---

daily:: [2023-04-27](Daily_Note/2023-04-27.md)
up::

Microsoft社謹製のパッケージインストーラ。マニフェストは主にプルリクで増やす。

基本アプデにだけ使ったほうがよさそう。
android-studioをインストールしようとしたら適当なリンクしか無くて本体なかった。

Cドライブに入るのが普通だが、元々ポータブルな例えばzipで配布されてたりするような奴は`--location`フラグでインストール場所を変えられる。

`msstore`と、githubでプルリク出してマニフェスト登録できる`winget`という二つのソースがデフォルトで入っている。
[winget source コマンド \| Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/package-manager/winget/source)
[GitHub - microsoft/winget-pkgs: The Microsoft community Windows Package Manager manifest repository](https://github.com/microsoft/winget-pkgs)

デフォルトソースが無い場合は`winget source reset --force`。
[Cant add winget source · Issue #2669 · microsoft/winget-cli](https://github.com/microsoft/winget-cli/issues/2669)