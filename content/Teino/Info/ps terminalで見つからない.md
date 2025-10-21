---
date: 2025-01-31
tags:
  - Info
---

up:: [ps](<../Bar/CLI/PowerShell_and_Command-Line.md>)
up:: [Scoop](<../Bar/CLI/Scoop.md>)

psというかscoopとwindows terminalの問題。

scoopからpwshを入れるとterminalが見つけてくれない。
なぜならハードコーディングされてるscoop位置とは違う場所にscoopをインストールしたから。（globalで入れた）

対処は簡単、ジャンクション。

[「Scoop + pwsh + Windows Terminal」にカスタムディレクトリ設定を混ぜたら詰まった話 - くらめの暗くないブログ](https://kurame-yotsuba.hatenablog.jp/entry/2020/11/14/021606)

ただまあ、そもそもscoopじゃなくwingetで入れろというのが強い。
アップデートもアンインストールも上手くいかないし。

[Scoop fails to update pwsh · Issue 3572 · ScoopInstaller/Main](https://github.com/ScoopInstaller/Main/issues/3572)

terminalが一緒にpwshを起動しちゃうからという可能性はある。
一応古い方のpowershellを管理者権限で起動するとterminal関係なく起動できるので、ここで`scoop update -g pwsh`でいける。