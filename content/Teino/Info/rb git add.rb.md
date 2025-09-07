```ruby
#!/usr/bin/env ruby
require 'rugged'

def git_add_all(repo_path)
  begin
    # リポジトリを開く
    repo = Rugged::Repository.new(repo_path)
    
    # インデックス（ステージングエリア）を取得
    index = repo.index
    
    # ワーキングディレクトリの状態を取得
    status = repo.status do |file, flags|
      # 新規ファイル、変更されたファイル、削除されたファイルをすべて処理
      if flags.include?(:worktree_new) ||        # 新規ファイル
         flags.include?(:worktree_modified) ||   # 変更されたファイル
         flags.include?(:worktree_deleted)       # 削除されたファイル
        
        puts "Adding: #{file}"
        
        if flags.include?(:worktree_deleted)
          # 削除されたファイルの場合
          index.remove(file)
        else
          # 新規・変更されたファイルの場合
          index.add(file)
        end
      end
    end
    
    # インデックスへの変更を書き込み
    index.write
    
    puts "Successfully staged all changes."
    puts "Files staged: #{index.count} entries"
    
    # ステージングされたファイルの一覧を表示
    puts "\nStaged files:"
    index.each do |entry|
      puts "  #{entry[:path]}"
    end
    
  rescue Rugged::RepositoryError => e
    puts "Repository error: #{e.message}"
  rescue => e
    puts "Error: #{e.message}"
  end
end

# より簡潔な実装版
def git_add_all_simple(repo_path)
  repo = Rugged::Repository.new(repo_path)
  index = repo.index
  
  # add_allメソッドを使用（より簡単）
  index.add_all
  index.write
  
  puts "All changes staged successfully!"
end

# 使用例
if __FILE__ == $0
  repo_path = ARGV[0] || '.'  # 引数で指定されたパス、または現在のディレクトリ
  
  puts "=== 詳細版でのステージング ==="
  git_add_all(repo_path)
  
  puts "\n" + "="*50
  puts "=== 簡潔版でのステージング ==="
  # git_add_all_simple(repo_path)
end

```