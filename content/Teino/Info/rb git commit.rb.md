```ruby
#!/usr/bin/env ruby
require 'rugged'
require 'time'

def git_commit(repo_path, author_name = 'aloc', author_email = 'aloc@example.com')
  begin
    # リポジトリを開く
    repo = Rugged::Repository.new(repo_path)
    
    # インデックス（ステージングエリア）を取得
    index = repo.index
    
    # ステージングされたファイルがあるかチェック
    if index.count == 0
      puts "No files staged for commit."
      return false
    end
    
    # 現在時刻でコミットメッセージを作成
    commit_message = Time.now.strftime("%Y-%m-%d %H:%M:%S")
    
    # ステージングされたファイルからツリーを作成
    tree_oid = index.write_tree(repo)
    tree = repo.lookup(tree_oid)
    
    # 親コミットを取得（初回コミットの場合はnil）
    parents = []
    unless repo.empty?
      parents << repo.head.target
    end
    
    # 作者情報を設定
    author = {
      name: author_name,
      email: author_email,
      time: Time.now
    }
    
    # コミッターは作者と同じに設定
    committer = author.dup
    
    # コミットを作成
    commit_oid = Rugged::Commit.create(
      repo,
      author: author,
      committer: committer,
      message: commit_message,
      parents: parents,
      tree: tree
    )
    
    # HEADを新しいコミットに更新
    repo.head = commit_oid
    
    # 結果を表示
    puts "Commit created successfully!"
    puts "Commit ID: #{commit_oid}"
    puts "Message: #{commit_message}"
    puts "Author: #{author_name} <#{author_email}>"
    puts "Files committed: #{index.count} entries"
    
    # コミットされたファイルの一覧を表示
    puts "\nCommitted files:"
    index.each do |entry|
      puts "  #{entry[:path]}"
    end
    
    return true
    
  rescue Rugged::RepositoryError => e
    puts "Repository error: #{e.message}"
    return false
  rescue => e
    puts "Error: #{e.message}"
    return false
  end
end

# より詳細な情報付きでのコミット
def git_commit_detailed(repo_path, author_name = 'aloc', author_email = 'aloc@example.com')
  begin
    repo = Rugged::Repository.new(repo_path)
    index = repo.index
    
    # ステージングエリアの状態をチェック
    staged_files = []
    index.each { |entry| staged_files << entry[:path] }
    
    if staged_files.empty?
      puts "No files staged for commit."
      return false
    end
    
    puts "Files to be committed:"
    staged_files.each { |file| puts "  #{file}" }
    
    # 現在時刻でコミットメッセージを作成
    commit_time = Time.now
    commit_message = commit_time.strftime("%Y-%m-%d %H:%M:%S")
    
    # ツリーオブジェクトを作成
    tree_oid = index.write_tree(repo)
    
    # 親コミットを取得
    parents = []
    if !repo.empty? && repo.head_detached? == false
      begin
        parents << repo.head.target
      rescue Rugged::ReferenceError
        # HEADが存在しない場合（初回コミット）
      end
    end
    
    # 作者とコミッター情報
    signature = {
      name: author_name,
      email: author_email,
      time: commit_time
    }
    
    # コミット作成
    commit_oid = Rugged::Commit.create(
      repo,
      author: signature,
      committer: signature,
      message: commit_message,
      parents: parents,
      tree: tree_oid,
      update_ref: 'HEAD'  # HEADを自動更新
    )
    
    puts "\n✅ Commit successful!"
    puts "Commit SHA: #{commit_oid[0..7]}...#{commit_oid[-8..-1]}"
    puts "Message: '#{commit_message}'"
    puts "Author: #{author_name} <#{author_email}>"
    puts "Timestamp: #{commit_time}"
    
    return commit_oid
    
  rescue => e
    puts "❌ Commit failed: #{e.message}"
    return false
  end
end

# ワンライナー的なシンプルなコミット関数
def quick_commit(repo_path = '.')
  repo = Rugged::Repository.new(repo_path)
  index = repo.index
  
  return false if index.count == 0
  
  commit_message = Time.now.strftime("%Y-%m-%d %H:%M:%S")
  
  commit_oid = Rugged::Commit.create(
    repo,
    author: { name: 'aloc', email: 'aloc@example.com', time: Time.now },
    committer: { name: 'aloc', email: 'aloc@example.com', time: Time.now },
    message: commit_message,
    parents: repo.empty? ? [] : [repo.head.target],
    tree: index.write_tree(repo),
    update_ref: 'HEAD'
  )
  
  puts "Quick commit: #{commit_oid[0..7]} - #{commit_message}"
  return commit_oid
end

# 使用例
if __FILE__ == $0
  repo_path = ARGV[0] || '.'
  author_name = ARGV[1] || 'aloc'
  author_email = ARGV[2] || 'aloc@example.com'
  
  puts "=== ステージングされたファイルをコミット ==="
  puts "Repository: #{File.expand_path(repo_path)}"
  puts "Author: #{author_name} <#{author_email}>"
  puts "Timestamp format: YYYY-MM-DD HH:mm:ss"
  puts "-" * 50
  
  success = git_commit_detailed(repo_path, author_name, author_email)
  
  if success
    puts "\n🎉 All done!"
  else
    puts "\n❌ Commit was not successful."
  end
end
```