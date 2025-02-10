---
date: 2022-10-06
tags:
 - Info
---

up:: [Termux](<../Bar/App/Termux.md>)
source:: [AndroidにTermuxを入れてSSHで入ってLinux環境を作る【まとめ版】 | 楽しい活字中毒](https://tanokatu.com/2021/06/22/linux-android-linux-2/)
source:: [termuxでSSHサーバを動かす - Smart Home](https://scrapbox.io/smart-home/termux%E3%81%A7SSH%E3%82%B5%E3%83%BC%E3%83%90%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)

`sshd`でサーバーが立つので、`ssh -p port name@ip`で接続してやればいい。
sshdが無いなら`pkg install openssh`で入れる。

portは8022固定、nameは`id`の`u0_axxx`部分、ipは本体設定から確認してもいいが、`ifconfig`で[確認](<./ipアドレスが知りたい.md>)することも可能。
パスワードが欲しいときは`passwd`で設定。ssh接続時に訊かれる。何も設定してないときに訊かれたら何を入力しても大丈夫。

サーバーを切りたいときは`pkill sshd`。

サーバーを切りたいときは`pkill sshd`。

公開鍵認証を行うときはサーバークライアントそれぞれに設定する。
クライアント側は公開鍵を貰い、`.ssh/config`に設定を記述。

```sh
Host termux
     HostName 192.168.?.?
     User u0_axxxxx
     Port 8022
     IdentityFile ~/.ssh/termux
     ServerAliveInterval 60
```

以上は一例なので、場合に合わせて変更。
Hostは任意の名前。
IdentityFileは公開鍵を置いてある場所を指定。
ちなみにUserとServerAliveIntervalは無くても動く。

サーバー側では`.ssh/authorized_keys`に公開鍵を追加。`cat 公開鍵 >> .ssh/authorized_keys`で直接書き込むと間違いない。
そしてフォルダとファイルにそれぞれ適切な権限を割り当て。`chmod 700 ~/.ssh`、`chmod 600 ~/.ssh/authorized_keys`。

ここまで来たら`ssh Host`でつながるようになっている。
Hostはconfigに記述した名前。


ちなみにsshで繋げると、moshでも繋がるようになる。

source:: [第220回　Ubuntuでモバイルシェル「Mosh」を使う | gihyo.jp](https://gihyo.jp/admin/serial/01/ubuntu-recipe/0220

