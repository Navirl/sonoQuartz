---
date: 2025-08-22
time: 08:33
tags:
  - Info
---

up:: [ruby](<../Bar/Program_lang/ruby.md>)

ruggedを使用したlibgit使用。
AIに書かせて中身を読む初心者。

[rb git スクリプト](<./rb git スクリプト.md>)

## 最初

```ruby
#!/usr/bin/env ruby
# -*- coding: utf-8 -*-
```

shebangとrubyのマジックコメント。
shebangはenv(環境変数)からrubyを見つけて使う。これにより直接.rbを実行できる。windowsでは読めない。
rubyではファイルのエンコーディングを強制できる。ruby2.0以降はデフォルトがutf-8なのでたいてい不要。ただしマルチバイトなどでバグるので付けたほうが無難。`# encoding: utf-8`だけでも動くが、これじゃないと動かないエディタがあるらしい。それはエディタの問題だと思うので今は直ってそう。
マジックコメントはpythonからの導入。他にも動的文字列の凍結などいろいろ。

[Ruby Code Comments 日本語](https://runebook.dev/ja/docs/ruby/syntax/comments_rdoc)

## initialize

```ruby
require 'rugged'
require 'logger'
require 'optparse'

  def initialize(repo_path, config = {})
    @repo_path = File.expand_path(repo_path)
    @config = default_config.merge(config)
    @logger = setup_logger
    
    # Ruggedリポジトリオブジェクトを初期化
    @repo = Rugged::Repository.open(@repo_path)
    @logger.info("リポジトリを開きました: #{@repo_path}")
  rescue Rugged::OSError, Rugged::RepositoryError => e
    @logger.error("リポジトリの初期化に失敗: #{e.message}")
    exit(1)
  end
```

関数はpythonと同じく`def name(arg**)`で始め、endで閉める。

[変数](<../Bar/Program_lang/ruby.md#変数>)

Rugged::はモジュールからの呼出し。
ちなみにrubyはrustと逆で基本公開。privateを付けることで非公開化可能。
対象と同じ行にprivateを書けばそれだけ非公開になる。逆にprivateだけ別行に書くと、それ以下の対象を全部非公開にする。公開にするときはpublic。

`class Child < Parent`で継承できるのだが、この継承先ではprivateでも読める。

rescueは例外処理。begin-rescue-ensureとなる。rescueに=> eをくっつけることでbeginで起きたエラーをeに入力できる。beginがないなら全てのエラー。
エラーはそれぞれ専用の変数とかに入るので、rescueと=> eの間にその変数を置いておけば内容をeに入力できる。

いろんなエラーで条件分岐するときは、rescueを複数書くこともできる。もちろんいつものようにcase-whenでも分けられる。長いとrescue複数の方が分かりやすそう。

loggerはruby3.5.0以降から標準ライブラリから削除される予定があるので、gemfileに書いておく。

.openはruby3.x以降privateなので.newを使用する。
## default_config

```ruby
  # デフォルト設定を定義
  def default_config
    {
      commit_message: "自動コミット - #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}",
      remote_name: 'origin',
      branch_name: 'main',
      auto_add_all: true,
      force_push: false
    }
  end
```

ハッシュを返す関数。rubyの仕様として、最後に評価された式の値が自動で戻り値になる。Rustにもあるやつ。
なので以下の関数と同一。

```ruby
  # デフォルト設定を定義
  def default_config
    return{
      commit_message: "自動コミット - #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}",
      remote_name: 'origin',
      branch_name: 'main',
      auto_add_all: true,
      force_push: false
    }
  end
```

ハッシュをそのまま置かないのは、コミットメッセージのため。呼び出したときに式が評価されるため、いつでも現在時刻をセットできる。

これで帰ったハッシュに対して`@config = default_config.merge(config)`を呼ぶことで、一部だけ変更したコンフィグを使用し残りはデフォルトのまま使用できる。

## setup_logger

```ruby
  # ログ設定を初期化
  def setup_logger
    logger = Logger.new(STDOUT)
    logger.level = Logger::INFO
    logger.formatter = proc do |severity, datetime, progname, msg|
      "[#{datetime.strftime('%Y-%m-%d %H:%M:%S')}] #{severity}: #{msg}\n"
    end
    logger
  end
```

proc doはプロシージャルオブジェクト。pythonのラムダ式みたいな奴。コードの塊を式でなく値として扱う物らしい。今回はこれを利用しformatterに関数をセットしている。
||で区切られてるのは引数。

procはKernelモジュールのメソッドなのだが、ruby2.7以降で非推奨。Proc.newを使うのが一般的。
Proc.newだと呼出しの際に引数の数が違っても、超えた分の引数は無視、足りない分はnilで埋めて動く。厳密にエラーを出したいならlambda。

```ruby
hash = { a: 1, b: 2, c: 3 }

# hash.eachは|key,value|を渡す
# が、Proc.newなら一つでも大丈夫
hash.each(&Proc.new { |x| puts x }) # [:a, 1], [:b, 2], [:c, 3](配列)
# 配列を要素として渡す全てのメソッドは、引数一つの時[key, value]の配列を返す仕様

hash.each(&lambda { |x| puts x }) # ArgumentError
hash.each(&lambda { |k,v| puts "#{k}: #{v}" }) # OK

hash.each({|x| puts x}) # ブロックを直接渡す場合、Proc.newと同一
hash.each(&-> { |k,v| puts "#{k}: #{v}" }) # lambdaは->で書き換え可能

```

ちなみに、Proc.newはその中でreturnを使うと外の関数ごと抜けるが、lambdaはlambda式だけ抜ける。あとlambdaはちょっとだけ実行が早い。
lambdaかどうか確かめるにはProcオブジェクトに.lambda?を付ける。

severityはログの重要度レベル。
datetimeはログの出力された日時を表すTimeオブジェクト。
prognameはプログラム名やコンポーネント名。今回は使ってない。
msgは本文。

## check_repository_status
```ruby
  # リポジトリの状態をチェック
  def check_repository_status
    @logger.info("リポジトリの状態をチェックしています...")
    
    # ワーキングディレクトリの状態を取得
    status = @repo.status { |file, flags| 
      @logger.debug("#{file}: #{status_flags_to_string(flags)}")
    }
    
    @logger.info("#{status.count}個のファイルに変更があります")
  end
```
{||}はブロック。`@repo.status`に引数として渡す。
do||-endも同じもの。一行なら{||},複数行ならdo||-endが慣習。

status内部でこのブロックが呼び出される際、引数に改めて値を入れる。つまり内部情報でいくつ引数が必要なのか決まっている。
内部でブロックを扱うためには、変換演算子&が付いた変数に一度入れブロック→procオブジェクトに変換する。例えばstatus(&block)等。その後、block.callで呼ぶ。&は一回でいい。

```ruby
# Ruggedライブラリ内部のstatusメソッド（イメージ）
def status(&block)  # ブロックを受け取る
  # リポジトリをスキャンして変更を検出
  changed_files = scan_repository()
  
  changed_files.each do |file_info|
    file_name = file_info[:name]     # "script.rb"
    file_flags = file_info[:status]  # [:wt_modified]
    
    # ブロックが渡されていれば、それを呼び出す
    if block
      block.call(file_name, file_flags)  # ここで値を渡している！
    end
  end
  
  return changed_files
end
```

変換演算子はブロック→procオブジェクトだけでなく、procオブジェクト→ブロックも可能。procオブジェクトに入れて置いていろんな関数にブロックとして渡せる。

```ruby
# Procオブジェクトを作成
my_proc = Proc.new { |x| puts x * 2 }

# &を付けてブロックとして渡す
[1, 2, 3].each(&my_proc)  # => 2, 4, 6

# &なしだとエラー
[1, 2, 3].each(my_proc)   # ❌ エラー：ブロック引数が期待されている
```

||=はor equals。まだ値が代入されていないときのみ代入する演算子。詳しく言うとnilかfalseの時に代入する。

```ruby
@tasks ||= []

@tasks = @tasks || []

if @tasks.nil? || @tasks == false
    @tasks = []
end

# 全て同じ意味
```

<<はappend。配列や文字列に要素を追加する演算子。

```ruby
arr = [1,2,3]
arr << 4
puts arr # [1,2,3,4]

# 二重でも通る
arr << 5 << 6 # {1,2,3,4,5,6}
```

```ruby
str = "Hello"
str << " World"
puts str # "Hello World"

# 文字コードもいける。これは!のコード
str << 33
```

配列なら.pushを使うこともできる。これは<<に出来ない複数個の追加が可能。
ただ<<でもeachなどで回せば複数は入れられる。

先頭に入れるなら.unshiftを使う。

[Rubyでの配列への要素追加方法：\<\<, push, unshiftを徹底解説 \| IT trip](https://ittrip.xyz/ruby/ruby-array-element-addition)


repo.statusの戻り値がnilだと