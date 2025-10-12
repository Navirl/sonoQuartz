---
date: 2023-04-15
tags:
 - Info
---

up:: [Docker](<../Bar/GUI/Docker.md>)

これ見ながら書いてる。
[stable-diffusion-webui-docker/Dockerfile.Stable at main · camenduru/stable-diffusion-webui-docker · GitHub](https://github.com/camenduru/stable-diffusion-webui-docker/blob/main/Dockerfile.Stable)


公式はこれ。
[Dockerfile reference | Docker Documentation](https://docs.docker.com/engine/reference/builder/)

基本
[Dockerfile を書くベスト・プラクティス — Docker-docs-ja 17.06.Beta ドキュメント](https://docs.docker.jp/engine/userguide/eng-image/dockerfile_best-practice.html)

## ＃
コメント。

## FROM
もとにするイメージファイルを設定する。
一番最初に書くべき内容。

## ENV
環境変数。`ENV DEBIAN_FRONTEND noninteractive`が有名。
これは入力待ちやエラーを消して自動インストールしやすくするやつ。

[DEBIAN\_FRONTEND=noninteractive ってなんだ - Qiita](https://qiita.com/udzura/items/576c2c782adb241070bc)

## RUN
shコマンドを実行する。bashと同じく&&で連結して次々実行できるので活用する。
chmodはchownの使用も考える。これはユーザーを指定してファイル及びフォルダの所有権を与えることが出来る。普段chmodで見る数字はそれぞれ所有者、グループ、他のユーザーに対する権限をそれぞれ表している。


## WORKDIR
ディレクトリ移動。
`cd`に似ているが、存在しないディレクトリは自動的に作成することに注意。

## USER
ユーザー名やUIDでユーザーとしてログインしなおす。
rootを指定すればrootに戻れる。

ユーザーが存在しないとエラー吐くので、事前に`RUN useradd username`で追加しておく。
ディストリビューションによってはより高レベルなコマンド、`adduser`を使うことでパスワード無しに（--disabled-password）したり、ユーザー所属やフルネームといった情報、GECOSフィールドを直接指定してユーザー追加したりできる。というかそのまま実行するとGECOS聞いてくるので`--gecos ''`を付けたほうがいい。直でユーザー切り替えるときはsuコマンド。

## ADD
ファイルを追加する。ローカルなどからファイルをコピーするだけならCOPYコマンドがあるのでそれを使う。これを使うのはtarを展開する場合。
ローカルの他、githubのファイルへの直接URLをそのままコピーすることもできる。
`--chown`オプションがあり、最初から所有者を設定することが出来る。

## CMD
起動時に実行するコマンドを指定する。イメージにつき一回。
シェルコマンドの他、実行可能ファイルを引数付きで実行したりできる。
`docker run`にくっつける引数として入る。改めて`docker run`に引数を付けることで上書き可能。
CMDの一部だけ上書きしたい、みたいなときは上書き不可で実行可能ファイルだけ指定する`ENTRYPOINT`という命令がある。
