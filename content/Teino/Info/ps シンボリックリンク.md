---
tags:
 - Info
aliases: Symbolic_Link
---

daily:: [2022-09-14](Daily_Note/2022-09-14.md)
up:: [PowerShell\_and\_Command-Line](<../Bar/App/PowerShell_and_Command-Line.md>)

cmd:`mklink /D path target`
pwd:`New-Item -ItemType SymbolicLink -Path path -Target target`

**管理者権限が必要。**
targetのものをpathのフォルダーに転写する。
pathは存在しないフォルダじゃないと怒られる。
絶対リンクを使うこと。

ハードリンク
`New-Item -Value '../a.txt' -Path './hard_link_a.txt' -ItemType HardLink`

TargetがValueのエイリアス。

[Powershellによるファイル操作のまとめ - Qiita](https://qiita.com/mima_ita/items/ae31f3a19389e69b307f)
[New-Item (Microsoft.PowerShell.Management) - PowerShell \| Microsoft Learn](https://learn.microsoft.com/ja-jp/powershell/module/microsoft.powershell.management/new-item?view=powershell-7.4)

SymbolicLinkとJunctionの違い。
- SymbolicLink
    - 管理者権限が必要
    - ファイルにも張れる
    - 相対パスで指定できる
    - ネットワーク共有フォルダにも張れる

これらを除いて簡素なものがJunction。古いからな。管理者権限がいらない点が良く重宝する。

[Windowsのシンボリックリンクとジャンクションとハードリンクの違い：Tech TIPS - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/1306/07/news111.html)

古いアプリでSymbolicLinkを使うと、正常にパスを表示してくれないことがある。
限定的だが、そういう時はJunction。

[シンボリックリンクの使い方と落とし穴 #Windows - Qiita](https://qiita.com/go_astrayer/items/ab993cdc420d4f7f50d4)