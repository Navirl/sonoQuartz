---
tags:
 - Info
---

daily:: [2022-10-06](Daily_Note/2022-10-06.md)
up:: [Termux](<../Bar/App/Termux.md>)
up:: [Git](<../Bar/App/Git.md>)
source:: [Error: Permission denied (publickey) - GitHub Docs](https://docs.github.com/ja/authentication/troubleshooting-ssh/error-permission-denied-publickey)
source:: [SSHでgit cloneする（gitlab） - Qiita](https://qiita.com/altblanc/items/2ddcfa68ece7a68aff3d)
source:: [何度、SSH keysを設定してもPermission denied (publickey)される問題 - Qiita](https://qiita.com/hi_erica_/items/17b5ee7432af9862347b)
source:: [GitHubでプルしようとしたらfatal: Could not read from remote repositoryになった話 - Qiita](https://qiita.com/jamjamjam/items/3a5311df5cf464c069a5)
source:: [Permission denied (publickey) の 対処方法はだいたいこれ | ORM ねこの遊び庭](https://ormcat.net/blog/20210509_github-denied-publickey/)

公開鍵つきssh接続がうまくいかないときのエラー。

まずは`ssh -vT git@github.com`で接続に使っているIdentityFileを確認する。そこに無ければ`.ssh/config`に追記。ホスト名は適当でいいので、使うカギをIdentityFileで指定する。

なお、鍵名をid_typeにして.ssh下に置けば簡単に直る。
接続確認で見た通り絶対に使うIdentityFile名なので。
