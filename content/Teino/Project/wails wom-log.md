---
date: 2025-07-09
time: 11:57
tags:
  - Project
---

up:: [wails](<../Bar/Framework/wails.md>)

## 2025/07/03
**main.go**
wailsのエントリーポイント。
appにNewApp()でアプリのインスタンスを作成。

errでwails.Run()により起動。wails.Run()はウィンドウ表示、イベントループ開始などをやっている。
appはBindやOnStartupで登録。これでフロントエンドからGoを呼べる。
errは戻り値を入れてるだけ。wails.Run()は代入中に既に実行されている。

if err != nilはwails.Run()のエラーメッセージ表示用。
nilはnullのこと。nullはポインタだけっぽいがnilなら「なにもない」を表せる。smalltalkとかpascalで使う記法。ちなみに略語じゃなく一般名詞。N/Aはnot applicable、該当無し。

**app.go**
NewApp()を規定している。main.goとはpackageが同じなので問題なくmain.goから呼べる。

`func (レシーバ変数 型) 名前(引数) (戻り値型){本体}`。
メソッドレシーバにより何の型の値に付属した関数なのか示せる。
直接関数を呼び出すのではなく、対象型.関数()という形状で呼ぶ。

型は柔軟に作れるが、今はとりあえず`type 名前 struct{}`で構造体を作れるということだけ。

**app.jsx**
まずreturnから。
h1でタイトル文字、textareaで入力スペース。
都度classNameでcss登録。
buttonにはonClickで関数登録。
一番最後で、divでstatusを表示している。useStateでフックをセットしてるので、setStatusを使用しここに文字列を入れるだけでDOM変更してstatusを表示できる。

SaveTextとLoadTextがメソッドレシーバがついているのに、App構造体のインスタンス無しで呼び出せている。
これはwailsが裏側で**構造体に付属したメソッドを**構造体を元にしてただの関数のように生成している。
構造体を直接呼び出すことは出来ない。

なんか名前空間みたいな構造体の使い方だが、Goに名前空間やクラスは無いのでこうなってる。
これも構造体にインスタンス管理が出来たりできるので悪くない。

importで使うcssをインポートしておく。

**main.jsx**
renderでdocumentのappに<App/>をマウントしている。

documentはブラウザ使うと使えるグローバル変数。WebView。

**go mod tidy**
go.modとgo.sumの整理。
modはモジュール管理、sumはハッシュ管理。