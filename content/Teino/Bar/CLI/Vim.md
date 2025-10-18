---
date: 2025-10-17
time: 01:40
tags:
  - Bar
---

up::

## hit-a-hintみたいな飛び方がしたい
easymotionという拡張機能がある。
vscodeなら標準で入ってるので、機能をONにする**のとvim.leaderを設定する**ことで作動する。

[vim コマンド集 - Qiita](https://qiita.com/ktoyod/items/0a8491cdb6c0191ab0cc)

## 文字を検索する
`/"str"`。カーソル前なら`?"str"`。
同じ行内でカーソル後なら`f"str"`もいける。前ならF。
次と前の検索結果を見るときはnとN。

[【初心者向け】viでの文字列の検索方法を一通り](https://eng-entrance.com/linux-vi-search)

## 対応括弧に飛ぶ
`%`

## よく使う奴
w。次の単語の先頭へ。word
b。現在の単語か、前の単語の先頭へ後退。back
e。単語のendまで。end

それぞれ大文字にするとドットやコロンの記号を含めて一つの単語とする。

i。カーソルの左から挿入モード。insert
a。カーソルの右から挿入モード。addition?
I。行の先頭から挿入モード。
A。行の終端から挿入モード。
o。カーソルの下の空行を挿入して挿入モード。obtrude - 押し付ける？
O。カーソル行に空行を挿入して挿入モード。
s。カーソルの下の文字を削除して挿入モード。subtract
S。カーソル行を削除して挿入モード。

D。カーソルから右側を削除。Delete
C。カーソルから右側を削除して挿入モード。Cut

[VSCodeで始めるVim 初心者 - Qiita](https://qiita.com/jintz/items/d357478271179c90ffab#カーソル移動の基本)

d。削除。
"数字"dd。複数行削除。

"数字""コマンド"。数字回のコマンド繰り返し。
.。編集系操作繰り返し。
;。検索系操作繰り返し。

^。行頭へ。
$。行末へ。
f"文字"。カーソルがある行の文字へ。大文字にすると逆検索。
+。下の行の先頭へ。obsidianでは機能しない。
-。上の行の先頭へ。obsidianでは機能しない。

"数字"G, :"数字"。数字行へ。Ground？
"数字"j。その行から数えて数字分下の行へ。HJKLのJの数字繰り返し。
"数字"k。その行から数えて数字分上の行へ。HJKLのKの数字繰り返し。
Ctrl + u。半画面分戻る。up
Ctrl + d。半画面分進む。down。obsidianだとDelete paragraphと被っているので削除しておく。
Ctrl + b。１画面分戻る。forward。大体被ってる
Ctrl + f。１画面分進む。backward。大体被ってる
H、M、L。それぞれウィンドウ内の上、真ん中、下の行へ。HighMediumLow

u。undo
Ctrl+r。redo

`*`。カーソル下の単語検索。上向きにするときは`#`。
`/"文字"`。検索。置換は`:%s/hoge/huga/g`。逆向きは`?`
n。次の一致箇所にジャンプ。
N。前の一致箇所にジャンプ。

:buffes。バッファ一覧表示。
:bn。次のバッファに移動。
:bd。バッファ削除。

:wq。保存して終了。
:q。終了。
:q!。保存せず終了。


[【入門】Vimで高速で移動\~プラグインなしでの移動まとめ\~ Vim - Qiita](https://qiita.com/takeharu/items/9d1c3577f8868f7b07b5)

g"行移動"。表示上の行で移動できる。
gg。ファイルの始端へ。
G。ファイルの終端へ。

[Vimの様々なカーソル移動のやり方 Vim - Qiita](https://qiita.com/gorilla0513/items/afd32389bc5554f175e0)

jj。インサートモードから戻る。
設定が必要。
```text
inoremap <silent> jj <ESC>
```
[Vim で ESC キーの代わりに jj でインサートモードから抜けるには | Mitomex Blog](https://www.mitomex.blog/vim-esc-jj/)

`:e`。ファイルを開ける。edit。直感的な`:f`はファイル名を変更するコマンド。

[Editing - Neovim docs](https://neovim.io/doc/user/editing.html)

`~`。大文字小文字のトグル。
ビジュアルモードではUで大文字化、uで小文字化。
[大文字と小文字を変換する \| まくまくVimノート](https://maku77.github.io/vim/edit/uppercase-lowercase.html)

J。下の行と連結。
そのままだとスペースが入るので、gJとしてスペースなし連結が一般的。
### 若干応用
`<S-v>`。Visual lineモード、行単位での選択を行う。
`:%s/foo/bar/g`。ファイル全体で置換。%を外せば行だけ、gを外せば行中一回だけ。
置換時に確認する場合はgのところにcを入れる。
Visualモードで%を外すと選択部分だけで置換する。
[vimのパターン検索と置換で知っておくべきこと - neovim/vim入門](https://kaworu.jpn.org/vim/vimのパターン検索と置換で知っておくべきこと#:s.E3.81.AB.E3.82.88.E3.82.8B.E7.BD.AE.E6.8F.9B)

## Obsidian Vim
jj。インサートモードから戻る。
inoremapはサポートされてないらしい。

```plain
imap jj <Esc>
```

[ObsidianのvimモードでもjkやjjでEscする | Obsidian TIPS(JP)](https://obsidiantips.com/tips-vim-jk-esc/)
[Obsidianのvimでinoremap jj \<ESC\>が効かない問題の回避策 Vim - Qiita](https://qiita.com/AngelCase/items/dac6c87c4d116f2d616c)


## Neovim
[Neovim](<./Neovim.md>)

## VSCode Neovim
裏でNeoVimを動かしてるだけなので、Neovimを設定すれば設定できる。

[WindowsでVSCode Neovimを使うには（winget） Vim - Qiita](https://qiita.com/az2410/items/70aa6696fa759fb924f4)

jjでnormalに戻る
破壊的変更がされたらしく、settings.jsonへの追記が必要になる。

```
{
    "vscode-neovim.compositeKeys": {
        "jj": {
            "command": "vscode-neovim.escape"
        }
    }
}
```

[VSCode Neovim Extension の jj が変わったっぽい](https://zenn.dev/arawii/articles/8faa84003bf399)

スペースを使う案

[vscode neovim 必須級キーバインド4選](https://zenn.dev/masaphil/articles/0daf775c215e58)
[VSCode Neovim Extension を使えば、修飾キーが1つ増えるぜ](https://zenn.dev/lovegraph/articles/b3d68f65b37599)

[Integrate Neovim inside VSCode. VSCode productivity with Neovim | by Shaik Zahid | Medium](https://medium.com/@shaikzahid0713/integrate-neovim-inside-vscode-5662d8855f9d)


## E576: Error while reading ShaDa file: last entry specified that it occupies 42 bytes, but file ended earlier
`C:\Users\ユーザー名\AppData\Local\nvim-data\shada\main.shada`を消去する。
vim終了時に状態を記録するshadaファイルがなんかおかしいのが原因。

[vimにて「E576: Error while reading ShaDa file: last entry specified that it occupies 42 bytes, but file ended earlier」というエラーが出た時の対処法。 - おじさんの毎日](https://ojisanndaradara.hatenablog.jp/entry/2024/10/16/190155)

## 日本語入力IME問題
insertモードからnormalモードに戻る時、IMEがONのままだとコマンドが打てない。
そういうときの対処。

日本語にVimコマンドを割り当ててしまう。
楽だけど使いたいコマンドに都度割当てるのが手間。
[Vimでの日本語編集がはかどるキーマッピング Vim - Qiita](https://qiita.com/ssh0/items/9e7f0d8b8f033183dd0b)

## mapとnoremap
mapはショートカットを入力する奴。キーをVimの入力に割り当てる。
noremapは基本同じだが、キーをVimの機能に割り当てるのが特徴。Vimの入力がいくらmapで切り替わっていても、元々その入力で出来たはずの操作を呼び出す。

特別な理由が無ければnoremapを使う。

また、頭に文字を付けることで動作するモードを限定できる。
insertモードでしか使わないならinoremap等。

[【図解Vim】mapとnoremap - ここぽんのーと](https://cocopon.me/blog/2013/10/vim-map-noremap/)

## `<silent>`
コマンドに表示しない。

## ファイル名変更
:saveas。ファイルを別名保存する。
:file。バッファの名称を変更する。:wが必要。
:!mv % 。ファイルを移動する。%は現在のファイル名。
:edit。新しくファイルを開く。


## 慣れたら
[慣れてきた頃に知りたいVimの便利機能](https://zenn.dev/sun_asterisk/articles/6b2bf762a7e510)
[VimやNeovimコマンドで覚えなきゃいけないコマンド覚書 vimrc - Qiita](https://qiita.com/Nedward/items/c9f4c739210b0a8b5137)

## コマンド履歴
q:。q/やq?でも出る。直接編集可。
`<C-c>`でコマンドをラインにコピーできる。
なお、:の後に上下キーを押せば直近の履歴は出る。

[コマンド履歴、検索履歴を活用して、作業効率を上げよう。 — 名無しのvim使い](https://nanasi.jp/articles/howto/editing/use-command-history.html)

## mark
|コマンド|内容|
|---|---|
|:marks|mark一覧を表示する|
|m[a-zA-Z]|カーソル位置をmarkする|
|``|直前のマークへ移動|
|C-o|古いマークへ移動|
|C-i|新しいマークへ移動|
|`[a-zA-Z]|指定のマークに移動|
|'[a-zA-Z]|指定のマークの行頭に移動|
|:delmarks [a-zA-Z]|マークの削除|
|:delmarks!|マークの一括削除|

使えるとめちゃくちゃ楽。
このマーク、**ファイルを跨いでセット**するのだけ注意。

[Vimのマーク機能、使い方まとめ Vim - Qiita](https://qiita.com/syui/items/442fd0905a1f2005c10e)

delmarksは打つのだるい。
neovimならdmxで消せるプラグインがある。

[GitHub - chentoast/marks.nvim: A better user experience for viewing and interacting with Vim marks.](https://github.com/chentoast/marks.nvim?tab=readme-ov-file)

## 中級者
[中級 Vim 操作](https://zenn.dev/vim_jp/articles/2024-06-05-vim-middle-class-features)

`c])`は使いやすそう。

## 矩形選択からの全行入力
矩形選択から`I`で挿入モードに入り、ノーマルモードに戻る。
ノーマルモードに戻る際に入力が全行に反映される。

## ノーマルモードのまま改行（ドットリピート対応）
[neovimでノーマルモードのまま一行挿入を行うには](https://felo.ai/ja/search/ZTwdsj9fX3LhQfvTDh3qbM)
[Claude](https://claude.ai/share/7f849dbf-ef3c-491d-8f9a-f4f8a36744b8)

```lua
-- ノーマルモードのまま改行追加
-- 上に空行を挿入
function _G.insert_blank_above()
	vim.cmd('call append(line(".") - 1, "")')
end

vim.keymap.set("n", "<Space>O", function()
	vim.go.operatorfunc = "v:lua.insert_blank_above"
	return "g@_"
end, { noremap = true, expr = true })

-- 下に空行を挿入
function _G.insert_blank_below()
	vim.cmd('call append(line("."), "")')
end

vim.keymap.set("n", "<Space>o", function()
	vim.go.operatorfunc = "v:lua.insert_blank_below"
	return "g@_"
end, { noremap = true, expr = true })
```
`g@`でoperatorfuncに設定されたオペレータ関数を実行するという処理らしい。
`_`を追加することで現在の行にそのオペレータを適用する。

オペレータ関数はドットリピートに対応している。


## exコマンド
:から始まるコマンドはexコマンド。
自前で作ることもできるらしい。
[vimindex - Vim日本語ドキュメント](https://vim-jp.org/vimdoc-ja/vimindex.html#ex-cmd-index)

:g。global。
`:[range]g[lobal]/{pattern}/[cmd]`の形式で、range範囲内でpatternにマッチする行にcmdを実行する。
g!にすると一致しない物に対して。:vは=:g!。

[repeat - Vim日本語ドキュメント](https://vim-jp.org/vimdoc-ja/repeat.html#:g)

```vim
:g/^/ if (line('.') % 3 == 0) | put _ | endif
```

行頭、現在カーソルがある行数字がmod3で0のときブラックホールレジスタで空行追加

## 差分確認
`nvim -d file1 file2`で最初から開くか、`:vert diffsplit file2`でもう一つ開くか、複数開いてからそれぞれ`:diffthis`する。
ちなみに`:windo diffthis`で全部一気にdiffthisできる。

`:diffpatch`でバッファと比較できる。