---
date: 2022-04-24
tags:
 - Bar
---

up:: [Programming](<./Programming.md>)

## 変数
pythonと同じく、事前に宣言する必要はない。
`[]`で配列になるし、`[c:g]`みたいな感じでkey:valueとして辞書も宣言できる。
呼び出したいときは`{variable}`。

## Strings
++でくっつく。
[Expressions & operators ⋅ Automate ⋅ LlamaLab](https://llamalab.com/automate/doc/expression.html#special_operators)

## Termux連携
taskerプラグインがそのまま読めるのでそれを使う。
直接コマンドは打てないので、ファイルを実行する。ただしTermuxの内部ストレージにあるファイルしか使えないっぽい。
そこに置いてればchmodが7かどうかは問題ないらしい。
[GitHub - termux/termux-tasker: Termux add-on app for integration with Tasker.](https://github.com/termux/termux-tasker#plugin-variables)


## Termux git
コア機能
ワンタップでgitを使用

変えたいもの
パス
コマンド


gitコマンドファイルを作成する


コンフィギュアフォルダを作成、その中にgitコマンドを並べる
名前を見て、そこに無ければ作成

git add .
git commit -m 'c'
git switch main
git pull
git merge sub --commit
git push
git branch -d sub
git switch -c sub

### Switched to branch 'main'
From github.com:Navirl/sonolart
   e6177c80..8183a067  main       -> origin/main
fatal: this operation must be run in a work tree
fatal: Unable to read current working directory: No such file or directory
fatal: Unable to read current working directory: No such file or directory
fatal: Unable to read current working directory: No such file or directory

git mergeでカレントディレクトリがワークツリーにいないからエラー？
カレント指定部分の最後に/を足すと通った。


## fork or subroutine
forkは処理を分岐させる。
親側と分岐側は同時に実行される。戻り値なし。
https://llamalab.com/automate/doc/block/fork.html

subroutineは新たな処理を行う。
分岐側が終了するまで親は動かない。戻り値あり。
戻り値以外の変数は親と互いに独立する。
https://llamalab.com/automate/doc/block/subroutine.html

## Atomic
変数を永続化する。
明示的に消去しない限り残り続ける。
[Atomic example ⋅ Community ⋅ Automate for Android](https://llamalab.com/automate/community/flows/906)
### add and load
保存されている数値に数値を足し合わせるブロック。
足し合わせるほうの数値をデルタ値と呼称する。
[Atomic add & load ⋅ Automate ⋅ LlamaLab](https://llamalab.com/automate/doc/block/atomic_add.html)

## Expression true
式結果がtrueかどうかでflowを分割する、いわゆるif文。
[Expression true ⋅ Automate ⋅ LlamaLab](https://llamalab.com/automate/doc/block/expression_decision.html)
### true
Automateは**bool値を持たない**。
代わりに、下記の値をfalseとし、それ以外をすべてtrueとする。
- null
- 0(number)
- NaN
- 空、もしくは長さが0のtext
- 空のarray
- 空のdictionary

また、boolは無いが論理演算はある。あくまで**左から一つずつ演算していき結果だけ返す**というもの。
普段組み合わせ表だけ見ていると混乱しそう(例えばANDは両方trueの時にtrueを返す→両方をいっぺんに演算している、という誤解を持っている場合)だが、意味は何も変わっていない。

- &&
もし式がfalseなら左の値を返す演算。
- ||
もし式がtrueなら左の値を返す演算。
- ?
もし式がtrueならfalseを返す演算。

もちろん式は()で括れる。

[Expressions & operators ⋅ Automate ⋅ LlamaLab](https://llamalab.com/automate/doc/expression.html#logical_operators)

## split
`array split(text,regex)`
blockではなくfunctionのほうにある。
textを正規表現で分割してarrayにする。
[split ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/function/split.html)

逆の操作はjoin。
`text join(container, delimiter)`
デリミタを入力してarrayかdictionaryをtext変換。
[join ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/function/join.html)

## 現在時刻
`Now`
組み込みの変数。idempotent - 冪等であるため、ブロック中なら何度呼び出しても値は変わらない。

[Variables ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/variable.html#now)

冪等でない値が欲しいなら`text clock(type)`。デバイス起動からの時間も取得可能。

[clock ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/function/clock.html)

なお、どれにしてもUNIX TIMESTAMP、つまり秒数しか取れない。
現在の時間を取りたいなら`text dateFormat(timestamp, pattern, timeZone, language)`を使用する。

## foreach
そのものずばりforeachブロックがある。
ちゃんと最後にforwachブロックに処理を返さないとそこで終わるので注意。

[For each ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/block/for_each.html)

## terminal session action
terminal sessionをフォアにするかバックにするからへんの設定。
[GitHub - termux/termux-tasker: Termux add-on app for integration with Tasker.](https://github.com/termux/termux-tasker?tab=readme-ov-file#terminal-session-action)

```java
/** {@link #EXTRA_SESSION_ACTION} の値で、新しいセッションを現在のセッションとして設定し、
* {@link TERMUX_ACTIVITY} が実行されていない場合はそれを開始して
* 新しいセッションを前面に持ってくる。
*/
public static final int VALUE_EXTRA_SESSION_ACTION_SWITCH_TO_NEW_SESSION_AND_OPEN_ACTIVITY = 0;

/** {@link #EXTRA_SESSION_ACTION} の値で、既存のセッションを現在のセッションとして保持し、
* {@link TERMUX_ACTIVITY} が実行されていない場合はそれを開始して
* 既存のセッションを前面に持ってくる。新しいセッションはセッションリストの左側の
* サイドバーに追加される。
*/
public static final int VALUE_EXTRA_SESSION_ACTION_KEEP_CURRENT_SESSION_AND_OPEN_ACTIVITY = 1;

/** {@link #EXTRA_SESSION_ACTION} の値で、新しいセッションを現在のセッションとして設定するが、
* {@link TERMUX_ACTIVITY} が実行されていない場合はそれを開始せず、
* セッションはTermuxの通知に表示され、新しいセッションを前面に持ってくるために
* クリックできる。{@link TERMUX_ACTIVITY} がすでに実行中の場合は、
* これは {@link #VALUE_EXTRA_SESSION_ACTION_KEEP_CURRENT_SESSION_AND_OPEN_ACTIVITY} のように動作する。
*/
public static final int VALUE_EXTRA_SESSION_ACTION_SWITCH_TO_NEW_SESSION_AND_DONT_OPEN_ACTIVITY = 2;

/** {@link #EXTRA_SESSION_ACTION} の値で、既存のセッションを現在のセッションとして保持するが、
* {@link TERMUX_ACTIVITY} が実行されていない場合はそれを開始せず、
* セッションはTermuxの通知に表示され、既存のセッションを前面に持ってくるために
* クリックできる。{@link TERMUX_ACTIVITY} がすでに実行中の場合は、
* これは {@link #VALUE_EXTRA_SESSION_ACTION_KEEP_CURRENT_SESSION_AND_OPEN_ACTIVITY} のように動作する。
*/
public static final int VALUE_EXTRA_SESSION_ACTION_KEEP_CURRENT_SESSION_AND_DONT_OPEN_ACTIVITY = 3;
```
## 配列の一番後ろの値を抜きたい
`[-1]`で可能。この添字記法をsubscriptという。
そこにも乗ってない情報だが使える。

[Expressions & operators ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/expression.html#subscript_operator)

## if
expression true.