---
date: 2025-08-21
time: 19:19
tags:
  - Bar
---

up:: [Programming](<./Programming.md>)

書く楽しさに焦点を当てた日本製言語。
pythonぽいが括弧を閉じる必要があったり、関数を一部変更するデコレータ機能が充実してたり、そのせいで柔軟性が高かったりする。ということは複数人で書くの大変だろうなあ。

[Rubyの開発環境を用意しよう！（Windows用）](https://prog-8.com/docs/ruby-env-win)

（2025/08/21）msys2にインストーラが依存している。
wslでいいじゃんというとこだけど、wslはCドライブに入るのでscoopでmsys2に入れた。

rbenvでバージョンを管理できるが、困ってからでいいや。

## print
puts。`puts strings`で動く。`puts(strings)`でも一応動く。
rubyはこの括弧を省略できる言語。

putsはput stringの略。stringとして出力する。
一方生で出したいときは`print`が使える。あまりに使うので`p`一文字でも動く。

## 変数
@変数はインスタンス変数。クラスのインスタンスごとに持たせ、クラス内のどこからでも参照できる変数にできる。pythonのself.変数。
全てのインスタンスで同じ変数を使う（クラス変数）時は、@@で書き込む。pythonだとclass内のdef外で変数を用意するが、rubyはどこでも書き込める。
全てのクラスで同じ変数を使う（グローバル変数）は$。pythonだと普通に全ての外に書いた後、読むときはまず`global global_var`で呼び出してから変更する必要があった。
ちなみに定数も使える。全部大文字で書く。一応記法的には一文字目が大文字でクラス名などに使われていなければ定数扱い。pythonは内部的には変数扱いだった。

```ruby
local_var = "ローカル変数"
@instance_var = "インスタンス変数" 
@@class_var = "クラス変数"
$global_var = "グローバル変数"
CONSTANT_VAR = "定数"
```

定数だけ関数内から定義することは出来ない。クラス内やグローバルは可能。関数で書き換えようとすると定義時点でdynamic constant assignmentエラーが出る。
ちなみにグローバルだと書き換えようとすると書き換えられる。が、警告が出る。一部でのAPI切替やデバッグ切替などを見据えてるっぽいが、今はよく分からない。

```ruby
CONSTANT_VAR = "定数"

class TestClass
    # CONSTANT_VAR = "定数" # ここも可能
    def initialize
        local_var = "ローカル変数"
        @instance_var = "インスタンス変数"
        @@class_var = "クラス変数"
        $global_var = "グローバル変数"
        # CONSTANT_VAR = "定数" # ここは不可能
    end
    
    def get_var(var_type)
        case var_type
        when "local"
            puts local_var
        when "instance"
            puts @instance_var
        when "class"
            puts @@class_var
        when "global"
            puts $global_var
        when "constant"
            puts CONSTANT_VAR
        end
    end

    def set_var(var_type, new_value)
        case var_type
        when "local"
            local_var = new_value
        when "instance"
            @instance_var = new_value
        when "class"
            @@class_var = new_value
        when "global"
            $global_var = new_value
        # when "constant"
        #     CONSTANT_VAR = new_value # 定義したらエラーになる
        end
    end
end

obj1 = TestClass.new
# puts obj1.get_var("local") # ローカルはインスタンスメソッド内でしか使えない
obj2 = TestClass.new
obj2.set_var("instance", "インスタンス変数です")
puts obj1.get_var("instance") # インスタンス変数
puts obj2.get_var("instance") # インスタンス変数です
obj2.set_var("class", "クラス変数です")
puts obj1.get_var("class") # クラス変数です
puts obj2.get_var("class") # クラス変数です
obj2.set_var("global", "グローバル変数です")
puts obj1.get_var("global") # グローバル変数です
puts obj2.get_var("global") # グローバル変数です
$global_var = "グローバル変数ですね"
puts obj1.get_var("global") # グローバル変数ですね
puts obj2.get_var("global") # グローバル変数ですね
puts obj1.get_var("constant") # 定数
puts obj2.get_var("constant") # 定数
```
