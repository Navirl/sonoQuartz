---
tags:
 - Info
---

daily:: [2023-04-26](Daily_Note/2023-04-26.md)
up:: [Docker](../App/Docker.md)

[buildpacksとは何なのか？ - Qiita](https://qiita.com/souhei-etou/items/5aab1bb02cdded065d05)
[コンテナ化のメソッドの比較: Buildpacks、Jib、Dockerfile | Google Cloud 公式ブログ](https://cloud.google.com/blog/ja/products/containers-kubernetes/comparing-containerization-methods-buildpacks-jib-and-dockerfile?hl=ja)

## buildpacks
ソースコードからベストプラクティスのイメージを直接生成する。別にコンテナが最小になるとは限らない。裏でdocker使ってるので注意。
ライブラリやフレームワークを読んでいるらしい。
Dockerfileを出力することもできる。

Googleが作ったオープンソース。GCPではデフォで使える。

## buildpack
ソースコードを検査し、ビルド計画をするための作業単位

必要なファイルはメタデータになる`buildpack.toml`、
実行可否を検証する`/bin/detect`、
ロジックになる`bin/build`。

ビルド方式は言語やフレームワークごとに別。Herokuからその時々に合わせたbuildpackの入手環境が整えられているのでそれを使う。

## lifecycle
複数のbuildpackを連携させる

buildpackのグループを探索するDetection、
BuildとExportの最適化に使うファイルを見つける？Analysis、
ソースコードを変換し実行可能にするBuild、
最終的なOCI imageを作るExport。

## stack
lifecycleを提供する。


---

## Jib
Javaのイメージコンパイラ。Dockerデーモンすら必要無しで複数レイヤーに分け、変更に応じて迅速にイメージを構築するという特徴を持つ。