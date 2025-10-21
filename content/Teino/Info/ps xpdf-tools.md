---
date: 2022-09-14
tags:
 - Info
---

up:: [PowerShell\_and\_Command-Line](<../Bar/CLI/PowerShell_and_Command-Line.md>)

## xpdf-tools
### scoopからダウンロードしたけど起動しない
xpdfは複数のファイルの集合体。
scoop catで読むと分かるが、そのファイルにそれぞれパスが通されている。よって打ち込むべきはそのファイル名。.exe部分は要らない。
### 日本語が変換できない
設定が必要。
lsp（language support）を入れ、日本語設定ファイルをダウンロード。
中の`add-to-xpdfrc`をxpdfの使うファイルと同じ階層に入れ、名前を`xpdffrc`に変更。
`xpdffrc`を開き、内部のリンクを絶対パスで修正。ぶっちゃけUTF-8しか使わないだろうしCMapだけ設定しとけばいい気もする。

あとは`-enc Shift-JIS`などとして変換すれば行ける。
utf-8でも`-enc UTF-8`としないと変換してくれない。

[PDFからテキストを抽出する - ふなWiki](https://blue-red.ddo.jp/~ao/wiki/wiki.cgi?page=PDF%A4%AB%A4%E9%A5%C6%A5%AD%A5%B9%A5%C8%A4%F2%C3%EA%BD%D0%A4%B9%A4%EB)
[Xpdf：コマンドラインのPDFツール | PDF](http://pdf-file.nnn2.com/?p=858)
[xpdfrc(5)](http://www.xpdfreader.com/xpdfrc-man.html)
[XpdfReaderでPDFから日本語を抽出する方法（さくらのレンタルサーバ） - Qiita](https://qiita.com/zembutsu/items/b9b6cde59c0c005ec063)

### うまく改行しない
知らん。
windowsなら`-eol dos`で多少ましになる。
