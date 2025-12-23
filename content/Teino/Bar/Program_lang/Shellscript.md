---
date: 2021-10-16
tags:
 - Bar
---

up:: [Programming](<./Programming.md>)

総合
[Bashの便利な構文だがよく忘れてしまうものの備忘録 - Qiita](https://qiita.com/Ping/items/57fd75465dfada76e633)

## `[`
**コマンド**。`]`は引数。
test文と同じく条件を評価する。

[Bashの括弧のノウハウ（まとめ） - Qiita](https://qiita.com/Ping/items/f9b5175085026462b082)

## ls
ディレクトリ内のファイルを表示する。
-Fを使うことでファイルとディレクトリを見分けられるようになる。
[lsコマンドの使い方と覚えたい15のオプション【Linuxコマンド集】](https://eng-entrance.com/linux_command_ls)
[ls command output to variable in script](https://www.unix.com/unix-for-dummies-questions-and-answers/56447-ls-command-output-variable-script.html)
## echoで標準入力
サブシェル起動してcat。

[echo コマンドで標準入力を受け取る - Qiita](https://qiita.com/kkdd/items/4484c421e3540eadd39d)

## if
角かっこを使い条件式、thenとfiがいることだけ注意
条件式はコマンドオプションで表現する
ファイル・ディレクトリの見分けもつけられる

[シェルスクリプトのif文まるわかり！条件分岐のすべて | IT・ものづくりエンジニアの転職・派遣求人情報なら【パソナテック】](https://www.pasonatech.co.jp/workstyle/column/detail.html?p=7450)
[linux - Check if argument is a file or directory - Stack Overflow](https://stackoverflow.com/questions/14656080/check-if-argument-is-a-file-or-directory)




## ファイル名一括変換
lsからsedしてmvでいける。
なお一番楽なのはrenameを使うこと。gitbashにはいないけど。

他にもfordodoneで回す方法もある。

[Linuxでファイル名の一括変換を行う方法: 小粋空間](http://www.koikikukan.com/archives/2014/03/26-015555.php)

空白のある名前を扱う場合は、""で括ってmvコマンドに入れるときだけ適切に展開させる。

[linux - mv a file that contains spaces from a shell script - Stack Overflow](https://stackoverflow.com/questions/15800389/mv-a-file-that-contains-spaces-from-a-shell-script)

## 変数展開
shellscriptにも当然変数があるのだが、実は**変数の開き方がいっぱいある。**
ググりにくいので多用は禁物。
また、正規表現は使えない。やりたいならechoしてsedに渡す。

[【シェル芸人への道】Bashの変数展開と真摯に向き合う - Qiita](https://qiita.com/t_nakayama0714/items/80b4c94de43643f4be51)
[bashで変数を正規表現で置換して変数に代入する方法: 小粋空間](https://www.koikikukan.com/archives/2013/06/04-000300.php)

## sed
文字列置換。**\dといったメタ文字は使えない。**
使いたいなら[0-9]などで代用する。

[sedの正規表現で「\w」「\d」「\s」を実現する方法: 小粋空間](http://www.koikikukan.com/archives/2014/12/05-011111.php)

## スクリプトの置かれてる場所を拾う
[シェルスクリプトが置かれている絶対パスを取得する. スクリプトの配置場所を意識しないですむので便利。 | ITを使っていこう](https://it-ojisan.tokyo/sh-get-path/)


![../../Info/Shebang](<../../Info/Shebang.md>)

## 標準入出力の繋ぎ変えとパイプ
### 出力
bashでは入出力に数字が振られている。

| ファイル・ディスクリプター番号 |   出力先   |
| :-------------: | :-----: |
|        0        |  標準入力   |
|        1        |  標準出力   |
|        2        | 標準エラー出力 |
|        n        | 任意の入出力先 |

(ディスクリプタは出力先の意)
出力先を変更することを **出力のリダイレクト** という。
この出力先をファイルに指定すると、出力結果を記したファイルが作れる。
ディスクリプタ番号と\>で指定する。

```bash
echo "Hello" 1> file1
#標準出力をfile1に書き出す。
#この場合「Hello」と書かれたfile1が生成される。

basename 2> file2
#標準エラー出力をfile2に書き出す。
#この場合以下が出力される。

#basename: missing operand
#Try 'basename --help' for more information.
```

数字をつけないと「1」をつけたのと同じ扱いになる。

### 追記
`>`の代わりに`>>`を使うと追記となる。
ちょっとひねったものとして、`1>`と`2>>`を続けて書くことで標準出力と標準エラー出力を同じファイルに出力できる。

### 複製
出力番号、>、 **&** 、出力先番号 で**その時点での出力先番号に設定されている出力先を複製して設定する**。出口を出力先にくっつける。この書き方なのに出力の変更が入力に反映される形になっているので注意。

```bash
aa > file1 2>&1
cat file1

#./test.sh: line 1: aa: command not found
```

`2>&1`を呼び出した時点で、1番に設定されているのはfile1。
なので2番の出力先に標準出力が複製されて設定される。

| ディスクリプタ | 出力先(当初)        | 1> file1 適用後   | 2>&1適用後 |
| ------- | -------------- | -------------- | ------- |
| 1       | 標準出力（ターミナル）    | file1          | file1   |
| 2       | 標準エラー出力（ターミナル） | 標準エラー出力（ターミナル） | file1   |

そのため、文の順番を逆にすると意味が変わる。

```bash
aa 2>&1 >file1
cat file1

#
```

| ディスクリプタ | 出力先(当初)                 | 2>&1適用後             | 1> file1 適用後        |
|----------------|------------------------------|------------------------|------------------------|
| 1              | 標準出力（ターミナル）       | 標準出力（ターミナル） | file1                  |
| 2              | 標準エラー出力（ターミナル） | 標準出力（ターミナル） | 標準出力（ターミナル） |

[bash: 標準出力、標準エラー出力をファイル、画面それぞれに出力する方法 - Qiita](https://qiita.com/laikuaut/items/e1cc312ffc7ec2c872fc)
[用語集:リダイレクト: UNIX/Linuxの部屋](http://x68000.q-e-d.net/~68user/unix/pickup?%A5%EA%A5%C0%A5%A4%A5%EC%A5%AF%A5%C8)

### >&と&>
ややこしいとこ。正しいのは **>&。**
例えば`echo '7' 2&>1`は`&`と`>`が別々に解釈され、**echoに2という引数を渡すことになる**。当然2というファイルは存在しないため、echoは標準エラー出力（２）にエラーを吐く。それを**1というファイルに出力する**という意味になってしまう。

……この言い方だと&が余るのだが。
ちなみに、コマンド**末尾**に&をくっつけるとバックグラウンドで実行される。
でもここでは真ん中に&があるわけで……よくわからない。

[＞&と&＞、古い情報](<../../CS/＞&と&＞、古い情報.md>)
[リダイレクトとして 2&>1 を使うと何が起きるのか? - Qiita](https://qiita.com/tsubasaogawa/items/9495ad6e903998c4d1ac)
[Linuxコマンド(Bash)でバックグラウンド実行する方法のまとめメモ - Qiita](https://qiita.com/inosy22/items/341cfc589494b8211844)

### /dev/null
 **/dev/null を繋ぐことで出力を破棄したり新規ファイルを作ったりファイルの中身を消したりできる。**
 まあ後ろ二つは普通に上書きすればいいんだけど。
 エラー抑制には役立つかも。

```bash
myscript.sh >/dev/null 2>&1   # 標準出力と標準エラー出力を破棄する （crontable でよく用いられる使い方）
somecommand 2>/dev/null        # エラー出力だけ破棄する
cat /dev/null > myfile.txt     # サイズ0のファイルを作る
cp /dev/null > myfile.log      # （参考）既存のファイルのサイズを0にする（新規であれば上の例に同じ新規作成）
```

余談。powershellで同じようなことをしたい場合は、変数$nullに投げるか、パイプでOut-Nullに入れるか。

[PowerShell/PowerShellで/dev/null - Windowsと暮らす](https://win.just4fun.biz/?PowerShell/PowerShell%E3%81%A7/dev/null)

### パイプ
パイプ`|`は前者のコマンドの<u>標準出力</u>を後者の標準入力に設定する。
だからといってまんま`コマンド 0>&1 コマンド`で代用はできない。
`|&`で**1と2を両方コマンドに出力できる。**

<br>

### 入力
`>`で出力できるということは、当然`<`で入力できる。
同様に **入力のリダイレクト** と呼ぶ。
```bash
mysql -h mydbhost.intranet -u myuser -p mydatabase < sqlfile.sql
```
一部のコマンドにしか効かない。試したけどechoは無理だった。

### ヒアドキュメント
こちらの`<<`は **ヒアドキュメント** を作る。
英語だとhere-document。
```bash
#!/bin/sh

NOW\=\`date "+%Y/%m/%d %H:%M:%S"\`

cat <<EOF
Now is $NOW
EOF

cat <<'EOF'
Now is $NOW
EOF

cat <<"EOF"
Now is $NOW
EOF
```
文字通り「スクリプト上にドキュメントを作る」機能。
この場合EOF~EOF間を「そう書かれたドキュメント」として受け取る。
なお、EOFは任意の文字列なのでPUIPUIとかでもいい。

ここでEOF横に出力をくっつけると、ヒアドキュメントを直接ファイルに出力できる。

```sh
cat << EOF > filename.txt
Now is $NOW
EOF
```

派生で`<<-EOF`とすると頭のタブ文字を消せる。（可読性向上）
```bash
#!/bin/sh

NOW\=\`date "+%Y/%m/%d %H:%M:%S"\`

cat <<-EOF
	Now is $NOW
EOF
```
なおこれで消せるのは\t、ハードタブと言われるもののみ。
スペース4つとかは消せないので使うかと言われると……。

### ヒアストリング
`<<<`で文字列を渡せる。
```bash
cat <<< "May the force be with you."
```

[sh/bashのパイプ/リダイレクションの使い方 - dec9ue's diary](http://dec9ue.hatenablog.com/entry/2016/04/02/224249)
[覚えてると案外便利なBashのリダイレクト・パイプの使い方9個 | 俺的備忘録 〜なんかいろいろ〜](https://orebibou.com/ja/home/201602/20160229_001/)

## man bash
マニュアルを出せる。

## echo
入力したテキストを標準出力してくれるコマンド。
### -e
エスケープ文字を開いてくれる。
### クォーテーション
- シングル
全て文字列になる。
- ダブル
変数を展開する。
言い換えると、変数名を変数に置換する。
- バッククォート
コマンドとみなし、実行結果と置換する。
### --help
ヘルプが読める……筈だが、termuxだと普通に出力された。
pkgでmanをインストールし、`man echo`で出力した。
[echoコマンドの詳細まとめました【Linuxコマンド集】](https://eng-entrance.com/linux-command-echo#i-8)

## export
環境変数を設定できるコマンド。
普通は変数は全部大文字。

`export SAMURAI="samurai engineer"`などとすることで動く。
### 確認
`printenv`。
`printenv |grep SAMURAI`などとすると狙った部分だけ出せる。

### 消去
`export -n SAMURAI`。

[【Linuxコマンド】exportで環境変数を設定する方法 | 侍エンジニアブログ](https://www.sejuku.net/blog/53034)

## $1
引数が入っている変数。2以降も同じ。
$0はそのコマンドが入っている場所が入っている。

## dirname
パス名からディレクトリを取得。

## ln
`ln target path`
シンボリックリンクなどを作るコマンド。targetのものをpathに転写する。
cmdのmklinkと逆。

targetのフォルダーをpathにその末尾の名前でリンクファイルとして作るので、pathに同名のファイルかフォルダーがあるとめんどくさいことになる。

`-s`でシンボリックリンクになる。
