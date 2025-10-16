---
date: 2024-10-14
tags:
  - Bar
---

up:: [py](<../Program_lang/Python.md>)
up:: [Rust](<../Program_lang/Rust.md>)
up:: [js](<../Program_lang/JavaScript and TypeScript.md>)

読み方は`meez`。
`pyenv`のようなランタイムバージョン管理は他の言語にもあるのだが、それらをまとめて管理するもの。
また、ディレクトリごとの環境変数も管理できる。他にも必要ツールのインストールとか、タスクランナーとか全部これで出来る。

ちなみにrust製。

シンプル解説。
[asdf, direnvをやめてmiseに移行する](https://blog.sh1ma.dev/articles/20240108_from_asdf_to_mise)

導入。windowsならgithubから入れろとあるが、cargoで入れられるのでそっちの方が早いかも。ビルドからになるが。
最近scoopに対応しはじめた。
[mise ではじめる開発環境構築](https://zenn.dev/takamura/articles/dev-started-with-mise)

そこまで一気にやるならdockerでいいじゃんというのはあるが、docker外で管理したいものを管理するときに使える。

今のところ(2024/10/28)windowsのサポートは最小限。


ディレクトリごと環境変数を使わず言語の管理ツールまとめとして使うくらいなら、言語ごとの最適な管理ツールを使ったほうが早い気がする。なので普段使ってない。
Windowsからだとcargoかnpmが一番早いが、結局Rustかnodejsを入れることになり、それらはScoopで入れると考えると、scoop -> rust -> cargo -> mise -> uv -> python みたいな大分長いチェーンが予想される。面倒。
- scoopがサポートされ始めたので、ここは克服され使い始めた

powershellやgitなど、いくつかの開発ツールも管理可能。
でもツールまとめならScoopとかwingetとかあるし……開発ツールだけmiseに分けたいかと言われると。
- 厳格なバージョン管理が強み
    - そのせいで若干問題が出る

外部ツールはasdfのものが使えるから何でもできるのだが、miseはそもそもそういうプラグインに厳格らしい。
あとURL指定より必要になった時に自動で用意するLazy Install方式が推奨。
そうでなければaqua使えというのが今（2024/12/06）のスタンス。
[mise-plugins · GitHub](https://github.com/mise-plugins/)

[aqua](<./aqua.md>)

なんかaqua使用、miseから直接いけるっぽい。
ならええか。

[Aqua Backend | mise-en-place](https://mise.jdx.dev/dev-tools/backends/aqua.html)

結局厳格なバージョン管理が必要な時にしか必要じゃない。
今はjavaくらいにしか使ってない。pythonは仮想環境がほぼ必須な関係上uvでだいたい何とかなる。


## plugins
開発に使えるものをpluginsとしてインストールできる。
cmakeとか。goなどのバージョン管理もpluginsとして扱う。

pluginsはインストール用とバージョン確認用のシェルスクリプトがセットになったもの。
ツールそのものではない。

どういうpluginsがあるかは`mise plugins ls-remote`。
既に手元にあるpluginsの確認は`mise ls`。
バージョン確認は`mise ls-remote プラグイン名`。
インストールは`mise install プラグイン名`。バージョン指定は`プラグイン名@バージョン`。指定が無いと直下の`mise.toml`が優先される。

その他、標準でリストに無いpluginsは`mise registry`で確認。
ここにも載っていないpluginsとしてasdfのpluginsも使える。

## use
toolをインストールしconfig.tomlに書き込む。
`-g`を指定するとグローバルにインストール可能。`~.config\mise\config.toml`。`mise config ls`でパス確認。

toolの検索は`mise registry`。
toolバージョン検索は`mise ls-remote`。
インストールしたtoolは`mise ls`。
gツールの実体は`~\AppData\Local\mise\installs`。各パスは`mise bin-paths`で確認。

実体の位置を変更したい場合は環境変数`MISE_DATA_DIR`を変更。
反映には再起動するのが早そう。

[Configuration | mise-en-place](https://mise.jdx.dev/configuration.html#environment-variables)

rustは` is not compatible with the version of Windows`というのが出たのでちょっと待つ。

uninstallするとconfig.tomlに残ってたりしがち。
pruneで消せる？

アンストは`mise use --remove tool名`でコンフィグファイルから消してから`mise uninstall tool名`。uninstallだけだとmiseの次回起動時に一気に再インストールされてしまう。
また、removeは複数tool指定が出来ない？　一個一個やらないと認識されなかった。

いろんなバックエンドからインストール用の設定ファイルを読んでいる。
一覧を見たいなら`mise backend ls`。

## install
ツールをインストールし`~/.local/share/mise/installs/<PLUGIN>/<VERSION>`に入れる。
PATHを追加しないためそのままでは使えない。あとmise.tomlに書き込まない。そうしたいならuseを使う。
miseは同じ起動コマンドの別バージョンをインストールすることもあり、useだとインストールした別バージョンを起動コマンドに接続するまでやってしまう。
そういうときのコマンドだろうか。わからん。

## exec
ツールをコンフィグファイルに書き込むことなく実行する。
別アプリから呼べないときなど、`mise exec -- アプリ名`でよく応急処置する。

## 環境変数に出ない
`reshim`でshimを作り、手動で登録。上手くいかないならもう一回`reshim`。
たいていは上手くいくが別のアプリから呼び出そうとするとよくエラーになる。