---
date: 2025-05-02
time: 18:49
tags:
  - Bar
---

up::

実は何でもできるやつ。
設定さえすれば特定の操作でプログラム起動もできるはず。

v1とv2で結構変わった。
[AutoHotKey v1-\>v2への移行 ～Emacs-likeなキーバインド設定編～ - Qiita](https://qiita.com/asublue/items/0e3fad2667545793466d)

なので公式リファレンスを見るのが早い。
[Title Unavailable \| Site Unreachable](https://www.autohotkey.com/docs/v2/lib/Random.htm)

## 例
```
; デバッグ用にキー表示
InstallKeybdHook
KeyHistory
; ahk(autohotkey)のv2でのみ動かす
#Requires AutoHotkey v2.0

; キーが被っても動かす
#UseHook

; Notepad（メモ帳）でのみ動かす
#HotIf WinActive("ahk_exe Notepad.exe")	

; gをjに
g::j

; ;をuに
`;::u

; kをkとlに
k::
{
    Send("{k}{l}")
}
ｊ
```

## ＃
`#なんか`で特殊な機能が発動する。

`#Requires AutoHotkey v2.0`
ahk(autohotkey)のv2を指定する。
v1とv2でかなり変わってるので念のため。

`#UseHook`
諸々あって入れると処理が早くなったりする。

`#HotIf WinActive("ahk_exe ウィンドウ名")`
特定のウィンドウがアクティブの時だけキー入れ替えを行う。

## メモ
`;`（セミコロン）以降から行終わりまでの文字は認識されない。
いわゆるコメントアウト。

## 基本
`a::s`
これでaキーがsキーになる。

セミコロン、コロン、コンマは手前に`` ` ``（＠の上）が必要。
他キーは以下。

[キーリスト - AutoHotkey Wiki](https://ahkwiki.net/KeyList#Key_Enter)

## 複数キー
```
k::
{
    Send("{k}{l}")
}
```

sendで送る。
変更前キーが変更後キーと被ってるときは、変更前に`$`をつけ`$k::`とするか`#UseHook`を追加。
[ホットキー - AutoHotkey Wiki](https://ahkwiki.net/Hotkeys)

## ウィンドウ指定
`#HotIf WinActive("ahk_exe Notepad.exe")`
ウィンドウ名はwindowspyで確認。
[\[AutoHotKey\]#IfWinActiveで対象ウインドウを指定する](https://pouhon.net/ahk-win-active/2812/)

プロセス指定などもできる。
[ウィンドウ指定の方法 - AutoHotkey Wiki](https://ahkwiki.net/Window)

## ランダム数値
`Random(min,max)`
[Title Unavailable \| Site Unreachable](https://www.autohotkey.com/docs/v2/lib/Random.htm)
## sleep
`Sleep int`
()はいらない。

## 代入
`:=`

## キー入力可視
```
InstallKeybdHook
KeyHistory
```

