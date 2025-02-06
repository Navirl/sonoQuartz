---
tags:
 - Info
---

daily:: [2022-04-28](/Daily_Note/2022-04-28.md)
up:: [Shellscript](../Bar/Program/Shellscript.md)
up:: [Termux](<../../Teino/Bar/App/Termux.md>)

## Shebang
.shの一行目に書いてるコメントに酷似したこれ。
```bash
#!/bin/bash
```
ターミナルにも種類があるわけなのだが、こう書くと「/bin/ディレクトリに入っているbashで動かしてね」という意味になる。

**ただの注意書きではない。** たとえば
```bash
#!/bin/sh
```
こう書くと、bashで動かしていても「できるだけshっぽく動かしてね」という命令が出されるため、エラーを出したラインでスクリプトが停止したりする。
詳しく言うと、POSIXモードという昔の動作をエミュレートする機能がONになるらしい。

こだわりが無ければ`#!/bin/bash`にすべき。

[/bin/sh と /bin/bash の違い - 双六工場日誌](https://sechiro.hatenablog.com/entry/20120806/1344267619)

余談だが、termuxのshebangは`/data/data/com.termux/files/usr/bin`。
あまりにも長いので`$PREFIX/bin`と省略できる。

さらに`termux-fix-shebang`で`#!/bin/sh`を自動的にこれに変換して実行することもできる。便利。

[Termux-fix-shebang - Termux Wiki](https://wiki.termux.com/wiki/Termux-fix-shebang)
