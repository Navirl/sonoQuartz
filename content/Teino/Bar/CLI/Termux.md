---
date: 2022-04-22
tags:
  - Bar
---

up::

source:: [Termuxを素早く設定 - Qiita](https://qiita.com/kujirahand/items/8e34e05e7296134b55cd#%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E9%9F%B3%E6%A5%BD%E3%82%B5%E3%82%AF%E3%83%A9%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B-20200819-%E6%89%8B%E9%A0%86%E5%A4%89%E3%82%8F%E3%82%8A%E3%81%BE%E3%81%97%E3%81%9F)
source:: [MMLの基礎](http://oto.chu.jp/a.oto.chu.jp/doc/kouza/mml1.htm)

## Termux Setup
`termux-setup-storage`。
`$home`でアクセスできるtermuxのホームディレクトリ（アプリの内部ストレージ）に、`storage/emulated/0/`へのリンクが出来る。……そのリンクの作り方知りたいな？

必要なパッケージは`pkg`でインストール可能。中で動いてるのはalpineっぽい。

他にもクリップボードを同期したり、テキストを音楽に変換するアプリが使えたりするらしい。

##  テキストファイルを開く
vimをインストールしてもいいが、標準でnanoというエディタが入ってる。


## python使う
pyenvが入れられる。がちゃんと動かない。
ちなみに標準で入ってるシェルはbash。

pythonの古いバージョンは本来termuxでは提供されない。

https://wiki.termux.com/wiki/Python

tur-repo経由で入るらしい。
パッチバージョンまでは制御できない。
またpyton3.10がコマンドになる。

https://m.youtube.com/watch?v=UfLphYJ_xt4

## 中身
何かのdisrtributionのエミュではなく、Androidで動くようにすべてのパッケージをパッチしたもの。
動かすために標準linuxとファイルシステムが違い、そのためパッチが必要。

https://wiki.termux.com/wiki/Getting_started

## Failed to build installable wheels for some pyproject.toml based projects (gevent, pycryptodome)

nndownloadを入れようとしたら発生。
標準のpython3.11に対応してないからと3.10入れたが効果なし。

https://github.com/gevent/gevent/issues/1918

ビルドツールがtermuxのFSに対応してない。
`pkg i binutils`で解決する。

https://github.com/termux/termux-packages/issues/283
https://stackoverflow.com/questions/70964436/cant-install-gevent-on-termux-anyone-can-help-me

## 改行を消す
`sed`使用。
`sed 's/source/replace/' target.txt`のように使用する。
-eで正規表現、-zでNULL文字区切り(デフォ改行区切り)。-z使用時は-eが標準で使える。-iで直接ファイル書き換え。s///gですべての対象を置換する。


https://webbibouroku.com/Blog/Article/sed-crlf-lf

## grepと正規表現
`-E`でほとんど使える。肯定後読み(Look behind)を使用するなら`-P`。
前はextendedで後がperl sttyle。Perl Compatible Regular ExpressionsからPCREsと呼ばれる。
標準だと行が出力されるので、`-o`で文字を切る。

https://fabianlee.org/2021/01/09/bash-grep-with-lookbehind-and-lookahead-to-isolate-desired-text/

後読み内の文字は可変長にできない。
可変する場合は\Kで区切る方法を使う。(これより前の一致を消去する)
ただ\Kは微妙に仕様が異なるので注意。

https://www.rexegg.com/regex-lookarounds.php

先読みの場合は可変長可能。

## 文字列連結
`+=`も使えるが、`${}${}`でくっつけていくのが一番早い。

https://www.delftstack.com/ja/howto/linux/how-to-concatenate-strings-using-bash/

## '',"",\,``,$()
シングルクォートはそのまま文字列。

ダブルクォートは`\`,` `` `,`$()`のみ処理する。

バックスラッシュは直後の一文字にだけシングルクォートを適用(したかのように特別な意味を消す)。ちなみにshの改行に使うバックスラッシュも、実際は`\\n`で改行の意味を消している。

``はコマンド置換。単体で使うと改行などが分割→単一スペースになるだけのコマンド実行。なお他のコマンドに渡す際は分割前を渡す。`""`と合わせて文字列内で実行するのにだいたい使う。`\`,` `` `,`$()`を処理する。

$()はコマンド。``と違い、`\`,` `` `,`$()`を処理しない。

https://qiita.com/HAHOHIHOHU/items/6bbdef9b7474cea1622b

## 変数デフォルト
`${name:-default}`とするとデフォルト値を設定できる。
ちなみにコロン後につける記号でいろいろ他のこともできる。

## shebang
どのシェルで実行するか書くやつ。
普通デフォでBashだが、書かないと`$()`でsh扱いになって引っかかることがある？
(nndownloadのダウンロードが終わる前に次のコマンドに行ってしまった)

## niconicoをコメント付きでダウンロードしてass変換
```sh
filename=$(nndownload -c -l --session-cookie "${1:-/data/data/com.termux/files/home/nicocookie.txt}" "$2" | tee nnlog.txt | grep -Po -m 1 '(?<=\").*(?=\.(mp4|mkv)\")')
python /storage/emulated/0/Download/Flud/nicojson2xml/nicojson2xml.py "${filename}.comments.json"
python /storage/emulated/0/Download/Flud/nicodanmaku2ass/danmaku2ass.py -o "${filename}.ass" -a 0.8 "${filename}.comments.xml"
```

（2025/03/09）うまく動かない。grepで出力を拾ってしまうのが悪そう。

```sh
nndownload -c -l /storage/emulated/0/Movies/Flud/nnlog.txt --session-cookie "$1" "$2"
filename=$(tac nnlog.txt | grep -Po -m 1 '(?<=\").*(?=\.(mp4|mkv)\")')
python /storage/emulated/0/Movies/Flud/nicojson2xml/nicojson2xml.py "${filename}.comments.json"
python /storage/emulated/0/Movies/Flud/nicodanmaku2ass/danmaku2ass.py -o "${filename}.ass" -a 0.8 "${filename}.comments.xml"
```

愚直に改良した奴
ログのファイルを指定してそれを拾っている

オプションでページ内ニコニコ動画リンク一括コピーブックマークレット。
```javascript
javascript:(function(){var d=document.links.length,b=document.querySelectorAll("iframe"),c="";niconicoIdReg=/(?:sm|nm|so|ca|ax|yo|nl|ig|na|cw|z[a-e]|om|sk|yk)\d{1,14}\b/;for(var e=0;e<d;e++)if(url=document.links[e].href,/(nicovideo\.jp|nico\.ms)/.test(url)){var f=url.match(niconicoIdReg);null!==f&&(smLinkTxt="https://www.nicovideo.jp/watch/"+f[0],c+=smLinkTxt+"\r\n")}b.forEach(function(a){a=a.getAttribute("src");/(nicovideo\.jp|nico\.ms)/.test(a)&&(a=a.match(niconicoIdReg),null!==a&&(smLinkTxt="https://www.nicovideo.jp/watch/"+
a[0],c+=smLinkTxt+"\r\n"))});window.confirm(c)&&(d=new Blob([c],{type:"text/plan"}),b=document.createElement("a"),b.href=URL.createObjectURL(d),b.download=document.title+"_link.txt",b.click())})();
```
[ページ内のニコニコ動画リンクを一覧取得するブックマークレット - E-tum’s B-log](https://e-tum.hatenablog.com/entry/2024/01/07/005520?felosearch_translate=1)

## git
```sh
git add .
git commit -m 'c'
git switch main
git pull
git merge sub --commit
git push
git branch -d sub
git switch -c sub
```
入れたばかりだとユーザー名、メールアドレス、マージ戦略等で止められる。
都度git configコマンドで追加。

manager-coreが使えないので実質sshだけだが、都度`exec ssh-agent bash`と`ssh-add privatekeypath`が必要になる。

なんでないの……
[git-credential-manager · Issue #10420 · termux/termux-packages](https://github.com/termux/termux-packages/issues/10420)

gitui使用中。
[termuxで使う](<./Git.md#termuxで使う>)

## clipboard
`pkg instal termux-api`の後、
`termux-clipboard-set`と`termux-clipboard-get`が使えるようになる。

[Termux-clipboard-set - Termux Wiki](https://wiki.termux.com/wiki/Termux-clipboard-set)

## Vim
vimを使うとキーボードが消えて操作不能になる。（2024/12/01）
なのでviを使う。

## x11
いくつかのGUIアプリも使える。

termuxで動かしたサーバーをtermux-x11アプリに送信する形。
サーバーにはtermux-x11のリポジトリをサブモジュール付きでcloneしたものを使う。

[GitHub - termux/termux-x11: Termux X11 add-on application.](https://github.com/termux/termux-x11)

vscodeをつかうならこちら。codiumっぽいが。

[GitHub - PrashantRawatCoder/VS-Code-In-Termux-X11](https://github.com/PrashantRawatCoder/VS-Code-In-Termux-X11)

termuxのpkg用リポジトリはtermux-packagesにまとまっている。
code-ossは見つからない。apt側？

code-ossをcode-serverに替えるとvscodeになりそう。

[vscode或code-server支持! · termux/termux-packages · Discussion 9080 · GitHub](https://github.com/termux/termux-packages/discussions/9080)