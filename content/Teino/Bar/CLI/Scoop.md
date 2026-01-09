---
date: 2021-08-28
tags:
  - Bar
---

up:: [PowerShell\_and\_Command-Line](<./PowerShell_and_Command-Line.md>)

windowsのパッケージインストーラ。
中身はexeやzipをダウンロードして解凍、パスが必要な場所にはリンクを張るというだけのもの。

[Winget](<./winget.md>)

searchで全てのリポジトリから検索したいときはこれ。
[GitHub - zhoujin7/scoop-search](https://github.com/zhoujin7/scoop-search)

## VOICEVOX
cuda版は分割7zで圧縮されている。
毎回更新のたびに3つダウンロードして合成してとかやるくらいなら、本体更新したほうが軽そうなので止めた。

## ./shims/scoop-xupdate.ps1
```
# Summary: Update and Cleanup old version
scoop update $args[0]; scoop cleanup $args[0]; scoop cache remove
```

## ./shims/scoop-reinstall.ps1
```
# Summary: Uninstall and then install app
scoop uninstall $args[0]; scoop install $args[0]
```

## ./shims/scoop-change.ps1
```
# Summary: Change D Scoop
$env:SCOOP='D:\scoop'; [environment]::setEnvironmentVariable('SCOOP',$env:SCOOP,'User')
```