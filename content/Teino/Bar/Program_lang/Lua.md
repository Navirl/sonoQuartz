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

## EmmyLua
Luaに型サポートなど追加するプラグイン。
zedでdebuggerを使う場合はテストに追加コードが必要。

テストでデバッガがアタッチされるまで実行を止め、それからデバッガを起動する。
実行を止めるあたりはこれ。
[GitHub - EmmyLua/EmmyLuaDebugger: EmmyLua Debugger](https://github.com/EmmyLua/EmmyLuaDebugger)

でzedにこれをインストールしてデバッガを起動。
EmmyLua Debug Adapterはこれに含まれるっぽい。
[GitHub - EmmyLuaLs/Zed-EmmyLua](https://github.com/EmmyLuaLs/Zed-EmmyLua)

## table出力
```lua
-- Source - https://stackoverflow.com/a/27028488
-- Posted by hookenz, modified by community. See post 'Timeline' for change history
-- Retrieved 2026-03-05, License - CC BY-SA 4.0

function dump(o)
   if type(o) == 'table' then
      local s = '{ '
      for k,v in pairs(o) do
         if type(k) ~= 'number' then k = '"'..k..'"' end
         s = s .. '['..k..'] = ' .. dump(v) .. ','
      end
      return s .. '} '
   else
      return tostring(o)
   end
end

```

どこかで見つけたものの改変らしい
SO以外で書かれてるならCC-BY-SAはかからないが、改変を加えられてるなら微妙なところじゃないか

[lua - How to dump a table to console? - Stack Overflow](https://stackoverflow.com/questions/9168058/how-to-dump-a-table-to-console)

```lua
-- Print contents of `tbl`, with indentation.
-- `indent` sets the initial level of indentation.
function tprint (tbl, indent)
  if not indent then indent = 0 end
  for k, v in pairs(tbl) do
    formatting = string.rep("  ", indent) .. k .. ": "
    if type(v) == "table" then
      print(formatting)
      tprint(v, indent+1)
    elseif type(v) == 'boolean' then
      print(formatting .. tostring(v))		
    else
      print(formatting .. v)
    end
  end
end
```

気になるならこっちを
ただしさっきのと違って、コードに貼りつけて直接テーブルとして再利用できない

[Added check for boolean.](https://gist.github.com/ripter/4270799)

大きいプロジェクトならライブラリとして以下を使うのも

[GitHub - kikito/inspect.lua: Human-readable representation of Lua tables](https://github.com/kikito/inspect.lua)

## luarocks
luaのパッケージマネージャ。
scoopで入れられる。

[GitHub - luarocks/luarocks: LuaRocks is the package manager for the Lua programming language.](https://github.com/luarocks/luarocks)


luarocks initをかまさないとカレントディレクトリではなくluarocksに入る。
が、scoopから入れたluarocksだとバージョンを正しく認識できずpurge諸々が使えなくなるっぽい。
なのでluarocksに入れてしまうのがいいかもしれない。エディターのエラーは無視。(2026/03/10)

luarocks initで(project_name)-dev-1.rockspecというファイルが出来る
これはluarocksにアップロードするときに必要なファイル

## TypescriptToLua
tsからluaに変換できる。
luaはスクリプト言語としてシンプルで柔軟だが、forのあとのdoとかcontinueないとか、大きいプロジェクトでは力不足。
そこでこれ。`local name = require("lib")`も`import * as name from "lib"`で可能。

テストフレームワークを考えるとこれがいいか。

[GitHub - TypeScriptToLua/TypeScriptToLua: Typescript to lua transpiler. https://typescripttolua.github.io/](https://github.com/TypeScriptToLua/TypeScriptToLua)
## moonscript
luaを書きやすくしたやつ。
最近はほぼ動いておらず、yuescriptやtealの方が優勢。
[GitHub - leafo/moonscript: :crescent\_moon: A language that compiles to Lua](https://github.com/leafo/moonscript)
## YueScript
luaを書きやすくしたやつ。
Dora SSRというゲームエンジン向けに書かれてる。
[GitHub - IppClub/YueScript: A delightful language that compiles to Lua](https://github.com/IppClub/YueScript)
## busted
luaのテストフレームワーク。
[GitHub - lunarmodules/busted: Elegant Lua unit testing.](https://github.com/lunarmodules/busted)

`describe("name",function())`でテストの説明、そのfunction中に`it("name",function())`で一つのテストを定義できる。
実際のテストはassertやassert以下に追加された一連のテスト関数、あるいは独自のassertで行う。

起動はターミナルから`busted testfile`。luaから起動する方法もあるけどscoopから入れてる都合上試せなかった。

### describe
describeは代わりにinsulate、exposeを使用することもできる。
insulateは環境をそのブロック内に隔離する。exposeは公開する。
平たく言うとexposeなら変数を外に出せる。

デフォルトで全てのdescribeブロックはinsulate扱い。
無効化も可能。

説明中にタグを付けられる。`describe("name #tag",function())`。
あるタグのテストだけ実行したり、逆に除外したりできる。

### it
itは代わりにsetup,before_each,after_each,teardownが使える。
setupはdescribeブロックの最初で動く。
before_eachはsetupの直前。
after_eachはsetupの直後。
teardownはdescribeブロックの最後。

it内部では`finally(function())`が使える。
外側の変数を無視して関数を実行する。

itの名前だけ決まってるときは、代わりに`pending("name")`が使える。

### assert
まず`assert.is`か`assert.is_not`かで、そのアサートがTFどっちを求めてるか決める。
それから`assert.is.equal(v,v)`などとしてアサートする。

are,are_not,has_no,was,was_notなどのエイリアスがある。

equals。二つのインスタンスが同じか。
same。二つの値が同じか。equalsより深い。

trushy。trueか。これはisがいらない。
反対はfals。

error。メッセージだけ出す通常の例外。これも使える。

boolを返す関数をassert:registerで登録すると、独自のアサーションを登録できる。

### spy
関数をラッピングし、その関数が何回呼ばれたか・ある引数で呼ばれたかといった情報を自動で登録する関数。

関数に使うときは`spy.new(function())`。
テーブルのメソッドに使うときは`spy.on(tbl,"method_name")`。
これでラッピングした関数を`assert.spy(s).was.called()`などとしてアサーションに使う。

テーブルのメソッドに使えるので、`spy.on(_G,"print")`でprintを取得できる。

情報を登録するには一度メソッドを実行する必要がある。
メソッドを実行せず、呼ばれたという情報だけ登録したい場面では`stub(tbl,"method_name")`が使える。
printをprintせずに読んだり。

テーブルのメソッドを全部ラップしたい時は、`mock(tbl,bool)`が使える。boolをtrueにするとstubとしてラップできる。

### Matcher
spyで引数を調べる時、なんでもいいから引数が呼ばれた場合・二つの引数で呼ばれた場合・文字列で呼ばれた場合といった条件で調べたい時がある。
そういう時はMatcher。`require("luassert.match")`を入れておかないと使えない。

## `_G`,`_ENV`
`_G`はグローバル変数を全部保持するテーブル。Lua起動時に作成される。
`_ENV`はどのテーブルの変数を見に行くかを決定するローカル参照。ここを書き換えると以降グローバル変数はそのテーブルを参照することになる。デフォルトでは`_G`を指す。

[Programming in Lua : 14](https://www.lua.org/pil/14.html)