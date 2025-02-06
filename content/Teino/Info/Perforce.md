---
tags:
 - Info
---

daily:: [2022-07-16](Daily_Note/2022-07-16.md)
up:: [Git](<../Bar/App/Git.md>)
source:: [Helix Coreサーバユーザガイド (2020.1)](https://kb.toyo.co.jp/docs/core/r20.1/manuals/p4guide/Content/P4Guide/Home-p4guide.html#%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6_Helix_Core%E3%82%B5%E3%83%BC%E3%83%90%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%AC%E3%82%A4%E3%83%89)
source:: [Helix Core P4コマンドリファレンス (2020.1)](https://kb.toyo.co.jp/docs/core/r20.1/manuals/cmdref/Content/CmdRef/p4_revert.html)
source:: [Helix_Core_Manual](https://kb.toyo.co.jp/wiki/display/KBTOP/Helix_Core_Manual)

## What's this
バージョン管理システム。
SVNと同じく集中型をメインにしているが、Gitのように分散型を**一部**使用することが出来るという利点がある。

## 特徴
オンプレのみ。AzureやAWSに作るのが正規っぽい。
集中型。ブランチ切ってチェックアウトして、アップデートしてマージで戻す。
2022年7月16日現在、無料は5名まで。

source:: [Perforce Helixを用いた 分散バージョン管理環境（DVCS）の構築手順](https://www.toyo.co.jp/files/user/img/product/ss/files/perforce/dvcs/dvcs_startguide.pdf)
フォルダ単位の一部コピーを行い、そこだけGitで管理して後でSVNに戻すという手がある。
フォルダ単位なのでSVN特有のクソ重ブランチカットが無く軽い。サーバーにも優しい。

source:: [SVNな現場で自分だけGitを使う方法 - Qiita](https://qiita.com/suzuq/items/f236672bbad7e3b354b2)
なお、別にPerforceでなくてもSVNにGitを噛ませることは出来る。

## Error
source:: [(1-2) アクセス許可で禁じられた・・・Apacheが起動しない！？ | Re:ゼロから始めるサイト構築](https://money-affairs.com/webserver-02/)
localhost:1666にサーバーを開けなかった。
適当に代わりに8080に開いた。Hyper-V関係という話もあったが、無効化しても相変わらず開かなかったので謎。

