---
date: 2024-05-22
tags:
  - Info
---

up:: [py](<../Bar/Program_lang/Python.md>)
up:: [Rust](<../Bar/Program_lang/Rust.md>)

rust製のpythonのパッケージインストーラ。
10倍速いと謳っている。いつものpipの頭にuvを付けるだけで実行可能。
venvも作成可能。

[GitHub - astral-sh/uv: An extremely fast Python package installer and resolver, written in Rust.](https://github.com/astral-sh/uv)

仮想環境上での環境変数管理が出来ないが、[mise](<../Bar/CLI/mise.md>)に任せればいい。

[mise-en-placeとuvでPython環境をセットアップする 備忘録 - Qiita](https://qiita.com/jkawamoto/items/874bc0bb1bd5cf7aba5b)

## 仮想環境
`uv venv`

## オンデマンド仮想環境
pythonスクリプトを実行する際、必要なライブラリがインストール済みのオンデマンド仮想環境を作ってくれる`uv run --with library pythonfile.py`機能がある。
場所は`~/.cache/uv`。消すときは`uv cache clear`。

スクリプトにuv用にパッケージメタデータを追加することもできる。
`uv add --script example.py 'rich'`


## コマンド
rust製高速linterのruffや型チェックのmypyといったコマンド系を使うときは`uvx`。
これはコマンドが入ってないと自動でインストールしてくれる。バージョン指定も可能。

キャッシュにあるので`which`で拾えないが、`uv tool install`で恒久的にインストールすれば見える。
場所は`~/.local/bin`。

纏めてのアップグレードも可能。

## プロジェクト
`uv init`で簡単にプロジェクトが作れる。
削除は`uv remove`。
`uv build`でパッケージ化できる。
`uv publish`で直接パッケージ公開できる。


[Pythonのパッケージ管理ツール「uv」を試す](https://zenn.dev/kun432/scraps/6a16be7be8e53e)

## uv pip
uv上でpipの動作をエミュレートしてるらしい。
その関係で`-y`オプションが無い。

[Compatibility with pip | uv](https://docs.astral.sh/uv/pip/compatibility/#pip-check)

pyproject.tomlを使う場合はaddが使える。

## バージョン管理
一応できる。
[Installing Python | uv](https://docs.astral.sh/uv/guides/install-python/)

`uv python install pypy@3.12`などとしてインストール可能。
2024/10/28ではグローバルで使用できない。`uv run`か仮想環境が推奨されている。
そもそも仮想環境のインストール時にバージョンを指定できるので、あまり意識しない。

cpythonというのは公式の実装。C言語で実装されたpython。
公式が配布可能バイナリを公開していないからこうなってるらしい。

C++にコンパイルするCythonとは別。

pypyはCPythonから一部を切り出したRPython(サブセット)を用いて作られた高速なpython。
つまり余計なものを切って作り直した。実行時にコンパイル(JIT)を行うため早いらしい。元は行単位だがpypyは関数単位、モジュール単位でコンパイルする。
型推論もある。
なおどちらもptyhon3.13で実装予定。
[PyPyの基礎知識まとめ その1 Python - Qiita](https://qiita.com/ta_ta_ta_miya/items/33253e9bcbb7034f088d)

これで入れたpythonは外部環境となるため、pipを入れようとするとエラーが出る。

## pipやpoetryから移行
`uv tool install migrate-to-uv`
`uvx migrate-to-uv`

全部pyproject.tomlに書き込まれる。

[パッケージマネージャーuvへの移行ガイド](https://zenn.dev/diia/scraps/03b4d18a92f298)

## pyproject.tomlの内容をインストール
`uv sync`

