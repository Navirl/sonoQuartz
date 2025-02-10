---
date: 2024-08-04
tags:
  - Bar
---

up:: [Linux](<./Linux.md>)

別のマシンのターミナルに繋ぎたいときの超基本処理。

## keygen
`ssh-keygen -C "comment" -t ed25519 -f filename`
type

## vscodeをlinuxに繋ぐ
[Visual Studio Code の Remote SSH で Linux 上のファイルを直接編集する #VSCode - Qiita](https://qiita.com/m-tmatma/items/f3cc666c2e667adab784)

## 一般ssh
- キー作ってクライアントとサーバーの特定フォルダに入れる
- サーバー
    - サーバーにログイン用のユーザーを作る
        - [ユーザー追加](<./Linux.md#ユーザー追加>)
    - ファイアウォールでssh用のtcpを許可
        - 後述するコンフィグで開けるポートのtcp
        
```
sudo firewall-cmd --add-port 25565/tcp
```
永続化する場合は`--permanent`付けて実行後`--reload`でリロードする。
- 
    - sshサーバーの設定
        - `/etc/ssh/sshd_config`を編集、`PermitRootLogin`など
    - sshサーバーを起動
        - `systemctl start sshd`
- クライアント
    - コンフィグを書く
        - 間違えやすいポイント
```
Host #適当な名前
	HostName #IPアドレスかURL
	User #linuxのユーザー
	Port #ポート、sshのデフォは22
	IdentityFile #秘密鍵のパス、パス区切りは/ ~使用可能
	IdentitiesOnly yes #IdentityFileが必要ならyes
```
- 
    - コンフィグファイルの権限を自分だけに設定
        - windows特有の問題
    - ssh接続
        - パスワードを訊かれなければOK
        - 訊かれる場合はサーバーで`PasswordAuthentication:no`や`PubkeyAuthentication yes`を設定する

[初心者がSSHについて学ぶ(´･ω･\`) #Network - Qiita](https://qiita.com/shobooon/items/70cc74cd20c8b5b4fe15)
[最低限のセキュアなSSH接続 #初心者 - Qiita](https://qiita.com/yuk046/items/13e933936e2ceb40444f)
[Windows に何もインストールせずに SSH を使う #OpenSSH - Qiita](https://qiita.com/hanohrs/items/1ceb7b64b861533a6e5b)
powershellのプロファイルとして設定しておくと、すぐに繋げられるようになるらしい。

[.ssh/configファイルでSSH接続を管理する #Linux - Qiita](https://qiita.com/0084ken/items/2e4e9ae44ec5e01328f1)

## Permission denied (publickey)
キーが見つからないとなる奴。
自分の解決策とか意地張ってないで、サーバー側で`/etc/ssh/sshd_config`で`LogLevel DEBUG`を張って`systemctl restart sshd`をかけ、繋ぎ直して`journalctl -u sshd -n 100`をかける。

今回は接続対象のユーザーのホームディレクトリに`~/.ssh/authorized_keys`が無かった。

……それと作ったディレクトリ所有者がrootだったので、対象のユーザーに変更した。chown。

[デバッグ sshやscpで接続できないときに確認する内容（debug）](https://you-1.tokyo/contents-to-check-when-connection-can-not-be-made-with-debug-ssh-or-scp-debug/#toc2)
[arch linux - Where are my sshd logs? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/114189/where-are-my-sshd-logs)
[【chown】Linuxでファイルやディレクトリの所有者やグループ変更するコマンド \| UX MILK](https://uxmilk.jp/50509)
## scp
ファイルをコピーしたい場合、このsshを通したscpコマンドが使える。
`scp target path`で動き、リモートマシンは`user@hostname:path`で指定できる。

[【備忘録】リモートホスト⇔ローカルホスト　ファイルの転送 #Linux - Qiita](https://qiita.com/otetsu8/items/772d2b0f62a0a254a79b)
[【scp】Linuxでリモート・ローカル間でファイルを転送するコマンド \| UX MILK](https://uxmilk.jp/50946)

## sudo権
sudoは`/etc/sudoers`で管理されている。
ここに書いてあるグループにユーザーを追加すればOK。

ubuntuとかだとsudoグループらしいが、endeavourosだとrootか、includeされている`/etc/sudoers.d/10.installer`のwheel。
wheelが推奨されてるはず。

[Sudo - ArchWiki](https://wiki.archlinux.jp/index.php/Sudo)
[Permission to execute sudo commands without password rules being overwritten by another file - General system / Newbie - EndeavourOS](https://forum.endeavouros.com/t/permission-to-execute-sudo-commands-without-password-rules-being-overwritten-by-another-file/26556)