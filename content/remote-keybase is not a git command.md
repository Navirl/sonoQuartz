---
tags:
 - Info
---

daily:: [2022-10-28](Daily_Note/2022-10-28.md)
up:: [Termux](../Bar/App/Termux.md)
up:: [Keybase](../Bar/App/Keybase.md)
source:: [git: 'remote-keybase' is not a git command · Issue #15176 · keybase/client · GitHub](https://github.com/keybase/client/issues/15176)
source:: [android - How to use Keybase Git repository in Termux - Stack Overflow](https://stackoverflow.com/questions/59877301/how-to-use-keybase-git-repository-in-termux)
source:: [cli on Android: no external key store available · Issue #17203 · keybase/client · GitHub](https://github.com/keybase/client/issues/17203)

termuxで遭遇、全文は`git: 'remote-keybase' is not a git command`。
keybaseをインストールしてないから。termuxはターミナルのエミュレータなので、一つのデバイスとしてLinuxと同じようにCUIでの登録をする必要がある。

`pkg install keybase`、`keybase login`で進めていく。
たぶんこの関係でwindowsではkeybase開いてないとgitが動かない。

