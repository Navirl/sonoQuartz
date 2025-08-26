---
date: 2025-08-25
time: 20:02
tags:
 - Info
---

up:: [ruby](<../Bar/Program_lang/ruby.md>)



```ruby
#!/usr/bin/env ruby
# -*- coding: utf-8 -*-

require 'rugged'
require 'logger'
require 'optparse'

class GitAutomation
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

  # ログ設定を初期化
  def setup_logger
    logger = Logger.new(STDOUT)
    logger.level = Logger::INFO
    logger.formatter = proc do |severity, datetime, progname, msg|
      "[#{datetime.strftime('%Y-%m-%d %H:%M:%S')}] #{severity}: #{msg}\n"
    end
    logger
  end

  # ターミナル起動時のメイン処理
  def run_startup_sequence
    @logger.info("Git自動化処理を開始します")
    
    begin
      # 1. 現在の状態をチェック
      check_repository_status
      
      # 2. 既存の競合状態の確認
      if has_merge_conflicts?
        handle_unresolved_conflicts
        exit(0)
      end
      
      # 3. ローカル変更があればコミット
      commit_changes if has_changes?
      
      # 4. リモートから最新情報を取得（プル操作）
      pull_result = pull_changes if @config[:auto_pull]
      
      # 5. プル時に競合が発生した場合の処理
      if pull_result == :conflicts
        handle_merge_conflicts
        exit(0)
      end
      
      # 6. リモートにプッシュ
      push_changes if @config[:auto_push]
      
      @logger.info("全ての処理が正常に完了しました")
      
    rescue => e
      @logger.error("処理中にエラーが発生: #{e.message}")
      @logger.debug(e.backtrace.join("\n"))
      exit(1)
    end
  end

  private

  # リポジトリの状態をチェック
  def check_repository_status
    @logger.info("リポジトリの状態をチェックしています...")
    
    # ワーキングディレクトリの状態を取得
    status = @repo.status { |file, flags| 
      @logger.debug("#{file}: #{status_flags_to_string(flags)}")
    }
    
    @logger.info("#{status.count}個のファイルに変更があります")
  end

  # ステータスフラグを文字列に変換（デバッグ用）
  def status_flags_to_string(flags)
    status_types = []
    status_types << "新規" if flags.include?(:wt_new)
    status_types << "変更" if flags.include?(:wt_modified)
    status_types << "削除" if flags.include?(:wt_deleted)
    status_types << "ステージング済み" if flags.include?(:index_modified)
    status_types.join(", ")
  end

  # 競合状態をチェック
  def has_merge_conflicts?
    # ワーキングディレクトリで競合しているファイルがあるかチェック
    @repo.status.any? { |file, flags| flags.include?(:conflicted) }
  end

  # 変更があるかチェック
  def has_changes?
    # ワーキングディレクトリまたはインデックスに変更があるかチェック
    !@repo.status.empty?
  end

  # 未解決の競合を処理
  def handle_unresolved_conflicts
    @logger.error("=" * 60)
    @logger.error("未解決のマージ競合が検出されました！")
    @logger.error("=" * 60)
    
    # 競合しているファイルを表示
    conflicted_files = []
    @repo.status.each do |file, flags|
      if flags.include?(:conflicted)
        conflicted_files << file
        @logger.error("競合ファイル: #{file}")
      end
    end
    
    @logger.error("")
    @logger.error("手動で競合を解決してください:")
    @logger.error("1. 上記のファイルで競合マーカー（<<<<<<<, =======, >>>>>>>）を解決")
    @logger.error("2. git add <解決したファイル> でステージング")
    @logger.error("3. git commit でマージコミットを作成")
    @logger.error("4. このスクリプトを再実行してください")
    @logger.error("")
    @logger.error("現在の状態確認: git status")
    @logger.error("=" * 60)
  end

  # マージ競合を処理（プル時に発生）
  def handle_merge_conflicts
    @logger.error("=" * 60)
    @logger.error("プル時にマージ競合が発生しました！")
    @logger.error("=" * 60)
    
    # 競合しているファイルを表示
    conflicted_files = []
    @repo.status.each do |file, flags|
      if flags.include?(:conflicted)
        conflicted_files << file
        @logger.error("競合ファイル: #{file}")
      end
    end
    
    @logger.error("")
    @logger.error("リモートの変更とローカルの変更が競合しています。")
    @logger.error("")
    @logger.error("手動で競合を解決してください:")
    @logger.error("1. 上記のファイルで競合マーカーを解決")
    @logger.error("2. git add <解決したファイル> でステージング")
    @logger.error("3. git commit でマージコミットを作成")
    @logger.error("4. このスクリプトを再実行してください")
    @logger.error("")
    @logger.error("現在の状態確認: git status")
    @logger.error("競合解決のヒント: git diff")
    @logger.error("=" * 60)
  end

  # リモートから変更を取得（プル操作）
  def pull_changes
    @logger.info("リモートから最新の変更を取得しています...")
    
    # リモートブランチの参照を取得
    remote = @repo.remotes[@config[:remote_name]]
    raise "リモート '#{@config[:remote_name]}' が見つかりません" unless remote
    
    # フェッチを実行
    remote.fetch
    @logger.info("フェッチが完了しました")
    
    # マージ処理を実行し、結果を返す
    perform_merge
  end

  # マージ処理を実行
  def perform_merge
    remote_branch = "refs/remotes/#{@config[:remote_name]}/#{@config[:branch_name]}"
    
    begin
      remote_commit = @repo.references[remote_branch].target
      head_commit = @repo.head.target
      
      # マージベースを確認
      merge_base = @repo.merge_base(head_commit, remote_commit)
      
      if merge_base == head_commit.oid
        # Fast-forward可能
        @repo.references.update("refs/heads/#{@config[:branch_name]}", remote_commit.oid)
        @repo.checkout_head(strategy: :force)
        @logger.info("Fast-forwardマージを実行しました")
        :success
      elsif merge_base == remote_commit.oid
        # ローカルブランチの方が進んでいる（リモートに変更なし）
        @logger.info("ローカルブランチの方が進んでいます")
        :success
      else
        # 3-way マージが必要
        @logger.info("3-wayマージを実行しています...")
        
        begin
          # 3-wayマージを実行
          merge_index = @repo.merge_commits(head_commit, remote_commit)
          
          if merge_index.conflicts?
            # 競合が発生
            @logger.warn("マージ競合が検出されました")
            
            # 競合情報をワーキングディレクトリに書き出し
            @repo.checkout_index(merge_index, strategy: :allow_conflicts)
            
            return :conflicts
          else
            # 競合なしでマージ可能
            @repo.index.read(merge_index)
            
            # マージコミットを作成
            signature = get_signature
            merge_commit_oid = Rugged::Commit.create(@repo,
              author: signature,
              committer: signature,
              message: "Merge branch '#{@config[:remote_name]}/#{@config[:branch_name]}'",
              parents: [head_commit, remote_commit],
              tree: @repo.index.write_tree(@repo)
            )
            
            # HEADを更新
            @repo.references.update("refs/heads/#{@config[:branch_name]}", merge_commit_oid)
            
            @logger.info("3-wayマージが完了しました")
            :success
          end
        rescue => e
          @logger.error("マージ処理でエラー: #{e.message}")
          :conflicts
        end
      end
      
    rescue Rugged::ReferenceError => e
      @logger.warn("リモートブランチが見つかりません: #{e.message}")
      :success
    end
  end

  # 変更をコミット
  def commit_changes
    @logger.info("変更をコミットしています...")
    
    # 全ファイルをステージングエリアに追加（設定により）
    if @config[:auto_add_all]
      add_all_changes
    end
    
    # ステージングエリアが空でないかチェック
    return unless has_staged_changes?
    
    # コミットを作成
    create_commit
  end

  # 全ての変更をステージングエリアに追加
  def add_all_changes
    @logger.debug("全ての変更をステージングエリアに追加しています...")
    
    index = @repo.index
    
    # ワーキングディレクトリの全変更を追加
    @repo.status.each do |file, flags|
      if flags.include?(:wt_new) || flags.include?(:wt_modified)
        index.add(file)
        @logger.debug("追加: #{file}")
      elsif flags.include?(:wt_deleted)
        index.remove(file)
        @logger.debug("削除: #{file}")
      end
    end
    
    index.write
    @logger.info("ステージングが完了しました")
  end

  # ステージングエリアに変更があるかチェック
  def has_staged_changes?
    # HEADとインデックスを比較
    head_tree = @repo.head.target.tree
    index_tree = @repo.index.write_tree(@repo)
    
    head_tree.oid != index_tree
  end

  # コミットを作成
  def create_commit
    # 署名情報を取得（Gitの設定から）
    signature = get_signature
    
    # 親コミットを取得
    parents = @repo.empty? ? [] : [@repo.head.target]
    
    # コミットを作成
    commit_oid = Rugged::Commit.create(@repo,
      author: signature,
      committer: signature,
      message: @config[:commit_message],
      parents: parents,
      tree: @repo.index.write_tree(@repo)
    )
    
    @logger.info("コミットを作成しました: #{commit_oid[0..7]}")
    @logger.info("メッセージ: #{@config[:commit_message]}")
  end

  # Git署名情報を取得
  def get_signature
    config = @repo.config
    name = config['user.name'] || ENV['USER'] || 'Unknown User'
    email = config['user.email'] || "#{ENV['USER']}@localhost"
    
    Rugged::Signature.new(name, email, Time.now)
  end

  # リモートにプッシュ
  def push_changes
    @logger.info("リモートにプッシュしています...")
    
    remote = @repo.remotes[@config[:remote_name]]
    raise "リモート '#{@config[:remote_name]}' が見つかりません" unless remote
    
    # プッシュを実行
    refspec = "refs/heads/#{@config[:branch_name]}:refs/heads/#{@config[:branch_name]}"
    options = {}
    options[:force] = true if @config[:force_push]
    
    remote.push([refspec], options)
    @logger.info("プッシュが完了しました")
  rescue Rugged::NetworkError => e
    @logger.error("ネットワークエラー: #{e.message}")
    raise
  end
end

# コマンドライン引数の処理
def parse_options
  options = {
    repo_path: Dir.pwd,
    auto_pull: true,
    auto_push: true,
    commit_message: nil
  }
  
  OptionParser.new do |opts|
    opts.banner = "使用法: #{$0} [オプション]"
    
    opts.on("-r", "--repo PATH", "リポジトリのパス（デフォルト: カレントディレクトリ）") do |path|
      options[:repo_path] = path
    end
    
    opts.on("-m", "--message MESSAGE", "コミットメッセージ") do |message|
      options[:commit_message] = message
    end
    
    opts.on("--no-pull", "プル処理をスキップ") do
      options[:auto_pull] = false
    end
    
    opts.on("--no-push", "プッシュ処理をスキップ") do
      options[:auto_push] = false
    end
    
    opts.on("--force-push", "強制プッシュを有効にする") do
      options[:force_push] = true
    end
    
    opts.on("-h", "--help", "このヘルプを表示") do
      puts opts
      exit
    end
  end.parse!
  
  options
end

# メイン実行部分
if __FILE__ == $0
  begin
    options = parse_options
    
    # 設定を準備
    config = {
      auto_pull: options[:auto_pull],
      auto_push: options[:auto_push],
      force_push: options[:force_push] || false
    }
    config[:commit_message] = options[:commit_message] if options[:commit_message]
    
    # Git自動化を実行
    automation = GitAutomation.new(options[:repo_path], config)
    automation.run_startup_sequence
    
  rescue Interrupt
    puts "\n処理が中断されました"
    exit(1)
  rescue => e
    puts "エラー: #{e.message}"
    exit(1)
  end
end
```