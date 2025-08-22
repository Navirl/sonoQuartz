---
date: 2025-08-22
time: 08:33
tags:
  - Info
---

up:: [ruby](<../Bar/Program_lang/ruby.md>)

ruggedを使用したlibgit使用。
AIに書かせて中身を読む初心者。

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

rescueは例外処理。begin-rescue-ensureとなる。rescueに=> eをくっつけることでbeginで起きたエラーをeに入力できる。
エラーはそれぞれ専用の変数とかに入るので、rescueと=> eの間にその変数を置いておけば内容をeに入力できる。

いろんなエラーで条件分岐するときは、rescueを複数書くこともできる。もちろんいつものようにcase-whenでも分けられる。長いとrescue複数の方が分かりやすそう。
