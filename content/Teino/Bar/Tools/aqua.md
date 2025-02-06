---
tags:
  - Bar
---

daily:: [2024-12-10](Daily_Note/2024-12-10.md)
up::

ツール管理が主軸なら全部aquaでよくないか。Go製。
scoopと比べてバージョン管理できるのが強み。CLIのみ。
[Quick Start | aqua](https://aquaproj.github.io/docs/tutorial/

分かりにくいが`aqua generate`で検索できる。`aqua g`でもOK。
これは設定を書き込むコマンド。`-i`を付けることで設定が`aqua.yaml`に書かれる。
ないならそのディレクトリに行って`aqua init`で作れる。

`aqua list | sls`でもよさそう……fuzzyじゃないが。

といってもグローバルツールが主軸だと思うので、`-g`でグローバルインストールする方法。
まず環境変数`AQUA_GLOBAL_CONFIG`にaqua.yamlへの絶対パスを指定。`aqua -i -g`で設定したパスのaqua.yamlに書き込みが行われる。

書き込み終えたら`aqua i -a`。

globalからインストールしたものは`"~\AppData\Local\aquaproj-aqua\"`に入る。`AQUA_ROOT_DIR`で変更可能。`aqua info`で確認。
cliしかないのでそんな重くはない。

これだけだと動かないので、PATHを通す。
`AQUA_ROOT_DIR\bin`にハードリンクがある。ここへの絶対パスを書く。
ハードリンクだからかここ以下のexeはeverythingに引っかからない。

uvやdenoはある。rustはなぜかPRが二年放置されている。
[feat: add rust-lang/rust by suzuki-shunsuke · Pull Request #13012 · aquaproj/aqua-registry · GitHub](https://github.com/aquaproj/aqua-registry/pull/13012)

aqua.yamlを書き換えることでツールバージョンを変更できる。

インストールされたパッケージは`aqua list -installed`

`aqua i -l`とするとシンボリックリンクだけが作られ、ツールコマンドを打ってそれが無かった時に初めてインストールするようになる。

[CLI バージョンマネージャー aqua のススメ - Retty Tech Blog](https://engineer.retty.me/entry/2022/12/14/130000)

アンインストールは`aqua rm -m pl -g <packaage name>`。バージョンまでは指定しなくていい。
パッケージとリンクを削除するだけなので構成ファイルには残る。編集で消す。
`nvim $env:AQUQ_GLOBAL_CONFIG`など。

[Uninstall Packages | aqua](https://aquaproj.github.io/docs/guides/uninstall-packages)

## ripgrep
ファイル全文検索。`rg`。
ファイルの中身を見ることになるのでそんなに使わない。
obsidianが起動してなくても使える利点はあるが、インデックスを作らないらしく一文字間違えるとまた検索の手間がかかる。

## fd
ファイル名検索。everythingと同等。
indexを作ったり管理者権限で動かしたりが無いので楽。
[GitHub - sharkdp/fd: A simple, fast and user-friendly alternative to 'find'](https://github.com/sharkdp/fd)
### 特定のパス以下
二番目の引数として与える。

### 特定の拡張子
`-e`

### 高速サブフォルダ以下ls
`fd . /`

### 隠しファイル込み
`--hidden`, `-H`

### .gitignore込み
`--no-ignore`, `-I`

### -Hと-Iを両方
`-u`,`--unrestricted`

### シンボリックリンク込み
`-L`, `--follow`

### ファイル名を完全一致
`-g`

### コマンド実行
`-x`。rmと組み合わせるなど。
`-i`を付けると都度確認できる。

### 除外
`-E`

### fzfに投げる
結果をパイプで投げるだけ。
[GitHub - junegunn/fzf: :cherry\_blossom: A command-line fuzzy finder](https://github.com/junegunn/fzf?tab=readme-ov-file#usage)
