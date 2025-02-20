---
date: 2024-12-07
tags:
  - Bar
---

up::

[Git+Hugo+Netlify](<../../Git+Hugo+Netlify.md>)
まさかの三年前からの続き。

## 特定のディレクトリのみビルド
### headless page

```yaml
---
build: 
  list: always
  publishResources: true 
  render: always
---
```

各ファイルにビルドオプションをつけられる。
ここでrender: neverを指定すればファイルはレンダーされない。

### headless section

```yaml
---
cascade:
- build:
    list: local
    publishResources: false
    render: never
title: Headless section
---
```

cascadeをつけることで、それよりも下のページに設定を渡せる。
子ページであって本体ページの設定は別にやる必要がある。

listをlocalにすると、page collectionがglobalからlocalになるらしい。page collectionはhugo側からpageを認識する単位。

publishResourceをfalseにすると、参照されないページリソースをビルドしないようになるっぽい。

[Build options | Hugo](https://gohugo.io/content-management/build-options/)


これはyamlによる方法であり、他にも
- ビルド時に`--contentDir`を指定する
- config.tomlで除外ディレクトリを指定する
などがある。永続ならconfig.tomlが早そう。


## セクションページ
hugoはディレクトリごとにセクションというコンテンツ管理の単位を作る。
セクションには_index.mdを置くことでセクションページ、つまりセクションの見出しを作ることができる。

見出しがある以外はディレクトリと大して変わらない。

セクションページはセクションのリストページのため、リストテンプレートが適用される。
セクション内やsection以下、default以下などからリストテンプレートは検索される。

リストページはこの他、タグやカテゴリなどのタクソノミーに自動生成されるものがある。

[hugoのセクションページという概念について基礎から詳しく解説してください。](https://felo.ai/search/apxgf89KZK6Qt8YwjL6BQw?invite=rRKXGDWOelDkk)

## page collection
hugoでページをまとめて扱うための概念。
動的ページ生成などが可能。近いのはobsidianのdataviewか。
関数でページの塊が取得できるのも同様。

フィルタリング、並べ替え、単一ページの複数ページ分割などが可能。
日付による記事一覧やサイトマップに。

## ファイル名とurl
urlはファイル名と関係なく自由に変更可能。
エイリアスや日付によってセクション変更も可能。

[URL management | Hugo](https://gohugo.io/content-management/urls/#permalinks)

## 設定
直下にhugo.yamlを置く。
tomlやjsonも可能。

設定をディレクトリで分けたり結合して読んだりできる。

レスポンスコードによってファイルも指定可能。
つまり404ページが作れる。

[Configure Hugo | Hugo](https://gohugo.io/getting-started/configuration/#configure-page)

## 改行できない
hugoはgoldmarkをパーサーとして使用している。
goldmarkのレンダラー設定をhugo.yamlから弄ればOK。
```yaml
markup:
  goldmark:
    renderer:
      hardWraps: tru
```

[Configure markup | Hugo](https://gohugo.io/getting-started/configuration-markup/)
[HugoのMarkdownでGitHub的改行をしたい Hugo - Qiita](https://qiita.com/sijiaoh/items/3dcbbed720a2fc668ca8)

## contentディレクトリの変更
一応できるが、postsフォルダの変更が見つからない。

[【HUGO】content フォルダを変更する方法【contentDir, config.toml】 | シラベルノート](https://srbrnote.work/archives/6635)

## 要約が長い
CJKに対応させる。
```yaml
hasCJKLanguage: true
```
[Configure Hugo | Hugo](https://gohugo.io/getting-started/configuration/#hascjklanguage)

## ファイル名をタイトルに
テンプレートの問題。
テーマのテンプレートを書き換える。

```yaml
{{ if .Title }}
    <h1>{{ .Title }}</h1>
{{ else }}
    <h1>{{ .File.BaseFileName }}</h1>
{{ end }}
```

## submoduleの削除
```powershell
git submodule deinit -f 追加したサブモジュール
git rm -f 追加したサブモジュール
rm -rf .git/modules/追加したサブモジュール 
```

[\[git\] submoduleの削除、再追加について Git - Qiita](https://qiita.com/k_yamashita/items/040c04f8798d2384806e)

deinitとgit rmを使用する。

## :1:1": invalid YAML delimiter
bulletから始めると怒られやすい。
空でいいのでfrontmatterを置くか、適当に全角空白を置く。

## range can't iterate over Character, EoSD
コンマで区切ってるだけの複数タグはサポートされていない。
箇条書きにするか角括弧でくくる。

tagsは一つでもリスト表記にしないといけない。
obsidianのlive previewなら自動でリスト表記になる。

## titleとdateを追加するシェルスクリプト
date入れとけばzolaが動くようになるので。
titleはついで。

```sh
#!/bin/bash

# 処理対象のディレクトリを指定（カレントディレクトリをデフォルトに設定）
TARGET_DIR=${1:-.}

# 対象ディレクトリ内のすべてのMarkdownファイルを処理
find "$TARGET_DIR" -type f -name "*.md" | while read file; do
  # ファイル名（拡張子を除く）を取得
  filename=$(basename "$file" .md)

  # YAMLフロントマターが存在するか確認
  if grep -q "^---" "$file"; then
    # フロントマターの中に `title:` が存在するか確認
    if ! grep -q "^title:" "$file"; then
      # `title:` を追加
      sed -i "0,/^---/a title: \"$filename\"" "$file"
      echo "Added title: \"$filename\" to $file"
    fi

    # フロントマターの中に `date:` が存在する場合、更新
    if grep -q "^date:" "$file"; then
      sed -i "/^date:/c\date: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00" "$file"
      echo "Updated date for $file"
    else
      # `date:` が存在しない場合、新規追加
      sed -i "0,/^---/a date: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00" "$file"
      echo "Added date to $file"
    fi
  else
    # フロントマターがない場合、新規作成
    echo -e "---\ntitle: \"$filename\"\ndate: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00\n---\n$(cat "$file")" > "$file"
    echo "Created front matter and added title and date to $file"
  fi
done
```

v2
fm外にdateがあるとそれを更新してしまったので
```sh
#!/bin/bash
# 処理対象のディレクトリを指定（カレントディレクトリをデフォルトに設定）
TARGET_DIR=${1:-.}

# 対象ディレクトリ内のすべてのMarkdownファイルを処理
find "$TARGET_DIR" -type f -name "*.md" | while read file; do
  # ファイル名（拡張子を除く）を取得
  filename=$(basename "$file" .md)
  
  # YAMLフロントマターが存在するか確認
  if grep -q "^---" "$file"; then
    # フロントマターの最初と最後の行番号を取得
    start_line=$(grep -n "^---" "$file" | head -1 | cut -d: -f1)
    end_line=$(grep -n "^---" "$file" | head -2 | tail -1 | cut -d: -f1)
    
    if [ -n "$start_line" ] && [ -n "$end_line" ]; then
      # フロントマター内に title: が存在するか確認
      if ! sed -n "${start_line},${end_line}p" "$file" | grep -q "^title:"; then
        # title: を追加（フロントマター内の最初の --- の直後）
        sed -i "${start_line}a title: \"$filename\"" "$file"
        echo "Added title: \"$filename\" to $file"
      fi
      
      # フロントマター内に date: が存在するか確認
      if sed -n "${start_line},${end_line}p" "$file" | grep -q "^date:"; then
        # date: を更新（フロントマター内のみ）
        sed -i "${start_line},${end_line}s/^date:.*/date: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00/" "$file"
        echo "Updated date for $file"
      else
        # date: を追加
        sed -i "${start_line}a date: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00" "$file"
        echo "Added date to $file"
      fi
    fi
  else
    # フロントマターがない場合、新規作成
    echo -e "---\ntitle: \"$filename\"\ndate: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00\n---\n$(cat "$file")" > "$file"
    echo "Created front matter and added title and date to $file"
  fi
done
```

v2.1
unix2dosによるCRLF保存
```sh
#!/bin/bash
# 処理対象のディレクトリを指定（カレントディレクトリをデフォルトに設定）
TARGET_DIR=${1:-.}

# unix2dosコマンドの存在確認
if ! command -v unix2dos &> /dev/null; then
    echo "unix2dos command not found. Please install dos2unix package."
    exit 1
fi

# 対象ディレクトリ内のすべてのMarkdownファイルを処理
find "$TARGET_DIR" -type f -name "*.md" | while read file; do
  # ファイル名（拡張子を除く）を取得
  filename=$(basename "$file" .md)
  
  # YAMLフロントマターが存在するか確認
  if grep -q "^---" "$file"; then
    # フロントマターの最初と最後の行番号を取得
    start_line=$(grep -n "^---" "$file" | head -1 | cut -d: -f1)
    end_line=$(grep -n "^---" "$file" | head -2 | tail -1 | cut -d: -f1)
    
    if [ -n "$start_line" ] && [ -n "$end_line" ]; then
      # フロントマター内に title: が存在するか確認
      if ! sed -n "${start_line},${end_line}p" "$file" | grep -q "^title:"; then
        # title: を追加（フロントマター内の最初の --- の直後）
        sed -i "${start_line}a title: \"$filename\"" "$file"
        unix2dos "$file" > /dev/null 2>&1
        echo "Added title: \"$filename\" to $file"
      fi
      
      # フロントマター内に date: が存在するか確認
      if sed -n "${start_line},${end_line}p" "$file" | grep -q "^date:"; then
        # date: を更新（フロントマター内のみ）
        sed -i "${start_line},${end_line}s/^date:.*/date: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00/" "$file"
        unix2dos "$file" > /dev/null 2>&1
        echo "Updated date for $file"
      else
        # date: を追加
        sed -i "${start_line}a date: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00" "$file"
        unix2dos "$file" > /dev/null 2>&1
        echo "Added date to $file"
      fi
    fi
  else
    # フロントマターがない場合、新規作成
    echo -e "---\ntitle: \"$filename\"\ndate: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00\n---\n$(cat "$file")" > "$file"
    unix2dos "$file" > /dev/null 2>&1
    echo "Created front matter and added title and date to $file"
  fi
done
```


以下はgit hook用。
`./,git/hooks/pre-commit`に入れる。ディレクトリじゃなくファイル名。

```sh
#!/bin/bash

# ステージングされたファイルのリストを取得
git diff --cached --name-only --diff-filter=AM | grep '\.md' | while read file; do
  # ファイル名（拡張子を除く）を取得
  filename=$(basename "$file" .md)

  # YAMLフロントマターが存在するか確認
  if grep -q "^---" "$file"; then
    # フロントマターの中に `title:` が存在するか確認
    if ! grep -q "^title:" "$file"; then
      # `title:` を追加
      sed -i "0,/^---/a title: \"$filename\"" "$file"
      echo "Added title: \"$filename\" to $file"
    fi

    # フロントマターの中に `date:` が存在する場合、更新
    if grep -q "^date:" "$file"; then
      sed -i "/^date:/c\date: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00" "$file"
      echo "Updated date for $file"
    else
      # `date:` が存在しない場合、新規追加
      sed -i "0,/^---/a date: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00" "$file"
      echo "Added date to $file"
    fi
  else
    # フロントマターがない場合、新規作成
    echo -e "---\ntitle: \"$filename\"\ndate: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00\n---\n$(cat "$file")" > "$file"
    echo "Created front matter and added title and date to $file"
  fi

  # ファイルを再ステージング
  git add "$file"
done
```

yaml使用前提なので、tomlがあると無理矢理追加されtomlは無視される。

[Git pre-commitフックでFrontmatterの「更新日時」を自動更新する - SIS Lab](https://www.meganii.com/blog/2021/02/11/how-to-update-the-modification-date-of-content-with-git-precommit/)
[Gitのフック（hook）について調べてみた - Programming Self-Study Notebook](https://overworker.hatenablog.jp/entry/2021/03/13/230553)
[Hugo の Front Matter を変更する. | 髭、はえ初めし頃。](https://d3.haro.jp/docs/2021/hugo_front-matter/)

## internalリンクが正常に作動しない
[CrawlLinks](https://quartz.jzhao.xyz/plugins/CrawlLinks)というものがquartzにはあるらしい。調べる。

[GitHub - devidw/obsidian-to-hugo: Process Obsidian notes to publish them with Hugo. Supports transformation of Obsidian wiki links into Hugo shortcodes for internal linking.](https://github.com/devidw/obsidian-to-hugo)
[GitHub - thomasweitzel/zolarwind: A localizable blog theme using Tailwind CSS for styling and KaTex for math](https://github.com/thomasweitzel/zolarwind?tab=readme-ov-file)
[URL management | Hugo](https://gohugo.io/content-management/urls/)
[Links and cross references | Hugo](https://gohugo.io/content-management/cross-references/)

レンダリングフックでどうにかなる？

[How can I convert markdown files contains relative link with end with \*.md to hugo links? - support - HUGO](https://discourse.gohugo.io/t/how-can-i-convert-markdown-files-contains-relative-link-with-end-with-md-to-hugo-links/42087/3?felosearch_translate=1)
[Links and cross references | Hugo](https://gohugo.io/content-management/cross-references/)