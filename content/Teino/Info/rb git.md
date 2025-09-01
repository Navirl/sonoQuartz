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
status内部でこのブロックが呼び出される際、引数に

repo.statusの戻り値がnilだと