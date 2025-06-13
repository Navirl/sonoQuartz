---
date: 2021-10-20
tags:
 - Bar
aliases: py
---

up:: [Programming](<./Programming.md>)

[py pyenv](<../../Info/py pyenv.md>)

## 実行時間計測
処理前後でtime.time()を測る方法があるが、これは1秒以下の精度が良くない。
なのでtime.perf_counter()を使うのが正攻法。

[Python 実行時間計測メモ - Qiita](https://qiita.com/BlueSilverCat/items/1eddab6db0b726df21c9)

あまりに短くて正確に測れないなら、timeit.repeat()を使う手がある。
grobals=grobals()としないとグローバル変数を呼んでくれないので注意。

[Pythonのtimeitモジュールで処理時間を計測 \| note.nkmk.me](https://note.nkmk.me/python-timeit-measure/)

なお、上記記事にもあるがjupyterなら`%%timeit`だけでセル全体を測れる。

## メモリ消費計測
psutilを使う。

[【Python】メモリ・CPUの使用率を取得する（psutil） \| 鎖プログラム](https://pg-chain.com/python-psutil)

より詳しく調べるmemory_profilerというのもある。普通はコマンドラインから実行する必要があるのでjupyterだと難しい。記事下部のマジックコマンド%mprumを使い関数に対して掛けるのが正攻法になる。

[Pythonスクリプトのパフォーマンス計測ガイド | Yakst](https://yakst.com/ja/posts/42)

## Youtube-Data-API
### やりたいこと
各Youtuberの最初のコメントを感情比較

## デコレータ
関数やクラスの定義拡張。元の要素を呼び出すときに名前の前に`@`を付ける。

例えば`@kb.add(Keys.Tab)`の場合、事前に用意したkb.add関数を利用して、kb関数にkb.tab関数を追加している。

[py 辞書逆検索](<../../Info/py 辞書逆検索.md>)

[py numpy二次元配列内に一次元配列が完全に存在するか](<../../Info/py numpy二次元配列内に一次元配列が完全に存在するか.md>)

## ストアが開く

[Windows で Python 実行時に Microsoft Store が起動する問題の対処方法  |  Lonely Mobiler](https://loumo.jp/archives/26344)

ゴミ機能。アプリ実行エイリアスからしっかりkill。

## 仮想環境
他にもあるけど割愛。
- pyenv
  インタプリタごと変えられる。つまり好きなバージョンのpythonが使える。
- venv
  完全に切り離してpythonローカル環境を作れる。
  python公式が作った。virtualenvはこれが出る前にあった非公式版。
- pipenv
  パッケージリストに詳しい情報を書き込める。
  pipコマンドを全てpipenvコマンドに書き換える必要があり面倒。
- pipx
  「仮想環境ごとで共通しているパッケージ」を管理できる。
- poetry
  依存関係、パッケージ、仮想環境、プロジェクト設定、ビルド、公開などを管理できる。
  仮想環境はプロジェクトごとに自動的に作成される。
  さらにpipenvのようにpipenvしか使えなくなったりはしない。
  
[pyenv、pyenv-virtualenv、venv、Anaconda、Pipenv。私はPipenvを使う。 Python - Qiita](https://qiita.com/KRiver1/items/c1788e616b77a9bad4dd)
[Python環境構築(pyenv+poetry+pipx) Python - Qiita](https://qiita.com/yano404/items/85f21897e417f03236c9)
[pyenvとPoetryでPythonの開発環境を整える](https://zenn.dev/ytksato/articles/0e4d035a30273a#3.-poetry)

## JIT
pythonをコンパイルして早くするやつ。

## 変数のattributeやmethodを調べる
`dir()`。デバッガー使えるならそれで調べたほうが早い。

## cannot import name 'notf' from 'tensorboard.compat'

tensorboard, tensorflow, numpy, jaxなどのエラー。
`pip install numpy==1.19.0`はpython3.9までのサポートなので使えない。
