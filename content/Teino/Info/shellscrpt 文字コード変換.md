---
tags:
 - Info
---

daily:: [2023-03-23](/Daily_Note/2023-03-23.md)
up:: [Shellscript](../Bar/Program/Shellscript.md)

iconvで可能。文字コードを自動判別したいならfileかnkf。  
nkfはtermuxだとパッケージ無いのでビルドからになる。

今回完成した一例。
`find . -iname *.csv -or -iname *.erb -print0 | xargs -0 -I {} nkf -w --overwrite {}`

eraは大文字小文字が混在してるので注意。

なぜかutf-8をutf-8にすると全角￥が半角\になって帰ってきてバグる。
なのでもう一例。
`nkf -g *.csv | xargs -I {} [ '{}' = 'Shift_JIS' ] && (nkf -w --overwrite 顔.csv) || (:)`

……うん無理。空白が切れたり切れなかったり難しすぎ。
(xargsの仕様)
https://qiita.com/ko1nksm/items/34cd96d39c2c5cd80eb4

というわけでbingの力を借りて出来たのがこれ。
```bash
#!/bin/bash

find . -type f -iname "*.csv" -or -iname "*.erb" | while read file; do
    encoding=$(nkf -g "$file")
    if [ "$encoding" = "Shift_JIS" ]; then
        nkf -w --overwrite "$file"
    fi
done
```

検索結果をwhile readで一行ずつ入れ、予期しないバグを防ぐ。
nkf -gにはちゃんと文字列として渡す。

それどころかワンライナーまで出しやがった。マジで人間要らねぇ……


>はい、`if`文を使用せずに、`find`コマンドと`xargs`コマンドを組み合わせて、以下のようなシェルスクリプトに書き換えることができます。

```sh
#!/bin/bash

find . -type f -name "*.csv" -print0 | xargs -0 nkf --guess | grep "Shift_JIS" | cut -d ":" -f1 | xargs -I{} nkf -w --overwrite "{}"
```
> このスクリプトは、カレントディレクトリから再帰的にcsvファイルを検索し、`xargs`コマンドを使用して`nkf`コマンドの`--guess`オプションに渡します。その後、`grep`コマンドを使用してShift_JISエンコーディングのファイルのみを抽出し、`cut`コマンドを使用してファイル名のみを取り出します。最後に、再度`xargs`コマンドを使用して、取り出したファイル名に対して、`nkf`コマンドの`-w`オプションと`--overwrite`オプションを使用してutf-8に変換し、元のファイルを上書き保存します。



## 一括変換
findで拾ってパイプしてiconvかnkf。
xargsは標準入力を引数に変える。

[一括iconv（文字コード変換） – Linux memo](https://www.softel.co.jp/blogs/linux/archives/88)
[Linux ファイルの文字コード確認・変換 - Qiita](https://qiita.com/H_Neco/items/48fa2eaaa0d9af2e45fe)

ただ単純にxargsだと一つのコマンドでしか-iの引数を使えない。結局はbash -cで実行を挟むことになる。

[xargsでリダイレクト> を使う方法 - それマグで！](https://takuya-1st.hatenablog.jp/entry/2018/01/16/025556)

iconvだと読み込みが自動じゃないので、うっかりutf-8をshift-jisで読んで惨事になりそう。if文で弾けば少しは楽。ただそれだとワンライナー難しい。三項演算子を使えばワンライナー簡単。

[One Line if-else Condition in Linux Shell Scripting | Baeldung on Linux](https://www.baeldung.com/linux/one-line-if-else-condition)

nkfを使う場合は、自動で読めるので全部一気にutf-8にしてしまえばいい。

## 判別
[Linux/UNIXでファイルの文字コード(UTF-8 or Shift\_JIS or EUC-JP…)を確認する | 俺的備忘録 〜なんかいろいろ〜](https://orebibou.com/ja/home/201606/20160615_001/)


## **iconv**

その文字コードで無効な文字が含まれてる場合は`-c`で無視できる。まあそれってつまり読む文字コード間違えてるってことだろうけど。

[linux - Why iconv cannot convert from utf-8 to iso-8859-1 - Stack Overflow](https://stackoverflow.com/questions/29922866/why-iconv-cannot-convert-from-utf-8-to-iso-8859-1#29923074)

## xargs
標準入力を引数に変える。
`-I`で任意の文字列に標準入力を代入。デフォルトは`{}`。よく似た`-i`は**非推奨**なので注意。
ちなみにパイプは標準出力を標準入力に変える。

[find -exec と find | xargs との違い | だえうホームページ](https://daeudaeu.com/exec-xargs/)
[パイプ  |  について解説（ |  と  | xargs  の違いも理解できる！） | だえうホームページ](https://daeudaeu.com/pipe-xargs/)
[https://atmarkit.itmedia.co.jp/ait/articles/1801/19/news014.html](https://atmarkit.itmedia.co.jp/ait/spv/1801/19/news014.html)
[find と xargs を組み合わせてコマンド実行 - いろいろ備忘録日記](https://devlights.hatenablog.com/entry/2020/12/01/193227)

## bash
bashを実行する。
-cが何を意味するのかはピンとこなかった。find -execみたいなもんなんだろうけど。

[shellの-cオプションについてUbuntuのsh(dash)、bash、zshはそれぞれ違う挙動をする - Qiita](https://qiita.com/ukinau/items/410f56b6d777ad1e4e90)

## find
andやor検索がある。
inameにすれば大文字小文字を区別しない。

[findのAND検索・OR検索  論理演算子  NOT検索（特定のファイルを含まない）  ex1-lab](https://ex1.m-yabe.com/archives/1563?amp=1)
[findコマンドとは？Linuxコマンドでファイルやディレクトリを検索する方法をご紹介 | GMOクラウドアカデミー](https://academy.gmocloud.com/lesson/20191213/8268)

## nkf
ちゃんとconfig.hでコメントアウトを外してdefault localeを決めておかないとビルドできない。
また、chmodで権限を与えるのも忘れずに。

[Site Unreachable](https://zau2and.blogspot.com/2017/11/termux.html?m=1)
https://atmarkit.itmedia.co.jp/ait/spv/1609/29/news016.html
[Termuxでnkfを使う - 資料室B3F](https://blog.goo.ne.jp/akasyuri/e/2bb20bf9a9934ffb2d85e8ce52aa0429)

## file
-iで文字コードが出る。
でも扱いにくそう。

[Linuxコマンド【 file 】ファイルの種類を調べる - Linux入門 - Webkaru](https://webkaru.net/linux/file-command/)

## which
コマンドが入ってるフォルダを教えてくれるっぽい？
makeしたコマンド置く場所を調べるのに。


