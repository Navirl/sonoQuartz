---
date: 2022-10-07
tags:
 - Info
---

up:: [Git](<../Bar/App/Git.md>)
source:: [github - Unsupported URL protocol in git provider error - Stack Overflow](https://stackoverflow.com/questions/38602178/unsupported-url-protocol-in-git-provider-error)
source:: [Push to GitHub - Error "Unsupported URL protocol"](https://forum.welkinsuite.com/how-to-start-using-the-welkin-suite/push-to-github-error-unsupported-url-protocol/)

`cannot push non-fastforwardable reference`
libgitのバグ。 sshからfetchが正しく通らない。

`Unsupported URL protocol`
libgitのバグ。 sshに繋ごうとしたら出た。
解決探してもバージョンアップしか出ない。

`too many redirects or authentication replays`
Libgitの仕様。パスワードが間違っている。

`unexpected http status code: 503`
URLにパスとユーザー名仕込んだら出た。
Proxy関係がバグってるらしいので、たぶんlibgitというよりターミナルを模倣していることによるバグ。