---
date: 2026-02-19
time: 18:08
tags:
  - Bar
---

up:: [Programming](Programming.md)

ゲームでよく見るインタプリタ言語。
ゲームでしか見ないのにしぶとい。

## table
luaのデータ構造はtable一本。構造体も辞書も配列も全部これ。
containは無いので自力で実装すること。

[6.6 テーブル操作 - Lua 5.4 リファレンスマニュアル (翻訳) - inzkyk.xyz](https://inzkyk.xyz/lua_5_4/standard_libraries/table_manipulation/)

### 作成
`{}`で作る。
メソッドは以下。

[Lua 5.5 Reference Manual](https://www.lua.org/manual/5.5/manual.html#6.7)

辞書として追加するときは`table["key"] = value`が基本
ただし糖衣構文で`table.key = value`もサポートしている、レコード的な書き方

`table.key`は`table["key"]`と同値であって、`table[key]`ではない
key変数の展開を行うなら`table[key]`を使うこと
[Programming in Lua : 2.5](https://www.lua.org/pil/2.5.html)
### for
直接forで回せない。forは関数しか回せないので、配列形式ならipairs、辞書形式ならpairsで関数にする必要がある。

```lua
local test2 = {2}
-- ipairs(test2) とすることで、ループ用の関数が返されます
for i, v in ipairs(test2) do 
    print(i) 
end
```

[Gemini - direct access to Google AI](https://gemini.google.com/share/04b9472e9c89)

### サイズ
getn,maxnでサイズが取れるとあるが5.2以降ではできない。
nilがあること自体バグというのが大きいが、連想配列が前提であるというのもある。
`#table`は残ってる。これはnilがあると未定義動作。

特別に`local NIL = {}`を定義する手もある
他と型を合わせたfalseや0や""といった既定値を入れる手もある、安全的にはこれが一番
table.packでもいい

### pack,unpack
table.pack
[Lua \| Tables \| pack() \| Codecademy](https://www.codecademy.com/resources/docs/lua/tables/pack)
テーブルを作る関数
{}で直接作るのと違い、.nにテーブルの総数を追記してくれる
これはnilを含む

table.unpack
[lua の unpack - Qiita](https://qiita.com/ousttrue/items/a2c4acd4ce94198e345f)
テーブルを分解してそれぞれ受け取れる関数

### メタテーブル
振る舞いを変えるメタテーブル機能と、振る舞いそれぞれに付いた名前であるメタメソッドがある。
`setmetatable(table,metatable)`で変更可能。metatable内は`{metamethod = object}`のようにテーブルで入力する。

[Lua 5.5 Reference Manual](https://www.lua.org/manual/5.5/manual.html#2.4)
[Luaでメタテーブルを扱ってみよう！スクリプト解説 Roblox Studio](https://roblog.jp/studio/luaでメタテーブルを扱ってみよう！スクリプト解/)

一番使うのは`__index`。
対象のテーブルに指定のキーが無い時、このメタメソッドに入っているテーブルに探しに行く。
リファレンス見る限り、対象もメタメソッド内もテーブルじゃなくてもいいっぽい？　どっちかというとキーが無い時に起こすイベントっぽい。

反対は`__newindex`。代入時に動く。
こちらは関数を入れるのが一般、注意としてその関数の中でメタテーブルがらみの代入を行うと無限ループになるので、代わりにrawsetで入力する。
[\_\_newindexを利用したテーブルへの値の追加](https://zenn.dev/takei0107/articles/89ea6a58e539b2)

### フィールド
`table.key = value`など、キーとして登録しとけばいい。
フィールドはlocalいらない。

### メソッド
```lua
function table:method()
    -- 処理
end
```
こうすることでテーブルにメソッドを紐づけられる。
呼出しはtable.method。

## local変数
`local v`とすることでローカル変数を宣言できる。グローバルは`v`。
これはdo-endブロック内でのみ生存する。

[Programming in Lua : 4.2](https://www.lua.org/pil/4.2.html)

## モジュール
最後に無名テーブルを返し、テーブル内に関数や値を登録しとけばいい。
呼び出すときはrequireと.を使う。

```lua
-- mod.lua
local greet = function(name)
    local user_name = tostring(name) or "unname"
    print("Hello " .. user_name .. "!")
end

local add = function(x, y)
    local x_val = tonumber(x) or 0
    local y_val = tonumber(y) or 0

    return x_val + y_val
end

--外部公開したい関数をテーブルメンバーに登録してreturnします。
return {
	greet = greet,
	add = add,
}
```

```lua
-- myscript.lua
local mod = require("mod")
mod.greet('utakamo')
print('add(10,20) = ' .. mod.add(10,20))
```

```sh
kamo@kamo:~ $ ls
myscript.lua   mod.lua    <---同じディレクトリに今回作成したスクリプトを置いています。
kamo@kamo:~ $ lua myscript.lua
Hello utakamo!
add(10,20) = 20
```

[Luaプログラミング文法まとめ その２（モジュール・メタテーブル）](https://utakamo.com/article/lua/grammar/memo02.html)

module側でテーブルを返すようにし、requireでテーブルを受け取るという仕組み
なのでこのような書き方も可能、普通にテーブルを定義してるだけ

```lua
return {
    hello = "hello",
	world = "world",
}
```

どうもrequireを共有でもしてるのか、別々のファイルから`require(data.struct)`と`require(struct)`のように別の呼び方でそれぞれ呼び出すと`The same file is required with different names.`警告が表示される。どっちかに定める。

[Programming in Lua : 8.1](https://www.lua.org/pil/8.1.html)


モジュール名は`...`、チャンクの引数で呼び出せる？

```lua
-- foo.lua
local modname = ... -- チャンクの引数
local function greet()
  print("Hello from " .. modname)
end
return {
  greet = greet,
}

```

```lua
local foo = require "foo"
foo.greet() -- Hello from foo
```

[Luaのモジュール徹底解説（Lua 5.1〜5.3対応） - Qiita](https://qiita.com/mod_poppo/items/ef3d8a6fe03f7f426426)

## string
文字列連結には`..`を用いる

[Programming in Lua : 2.4](https://www.lua.org/pil/2.4.html)

### パターンマッチ
`string.match(string,"pattern")`が使える。
パターンは正規表現ではなく、軽量化した別表現。\が%に変わったくらいだけど。
()で抜き出して一気に代入も可能。

findは一致した場所、gmatchはfor文用のイテレータを返す。

