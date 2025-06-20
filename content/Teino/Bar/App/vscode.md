---
date: 2024-08-17
tags:
  - Bar
---

up:: 

## ファイル名変更でライブラリ名変更する奴
`Update Imports On File Move`。MarkdownにもImportsではなくLinksで同様の設定がある。

## insert numbersで連番を挿入するためのマルチカーソル
検索もしくは選択後、`ctrl+shift+L`で検索位置にカーソルを挿入できる。
cursorだとチャットに割り当たってるコマンドなので`Select All Ocurrences Of Field Match`で手動選択。

ちなみにinsert numbersでよくある数字変更後にデフォ数値がついてくる問題だが、それだけを直した拡張機能がある。
[Insert Numbers Fix - Visual Studio Marketplace](https://marketplace.cursorapi.com/items?itemName=alpsmonaco.insertnumbersfix)

## shell変更
settings.jsonでterminal.integrated.profiles.windowsに追加。
後はコマンドパレットからterminal profileで選択できる。

## 正規表現で複数行マッチ
`[\s\S\n]*`。空白、空白以外、改行にマッチ。
`\s`は`[\t\r\n\f]`と等価らしい。\fは改ページ。

[VS Codeで複数行に渡って正規表現を利用する VSCode - Qiita](https://qiita.com/birdwatcher/items/dee34a11619b11e1fe81)

## debug
launch.jsonでどんなふうにデバッグするかを決める。

### FastAPI
uvicornをdebugpy経由で付けて、開いたサーバーにattach。

`python -m debugpy --listen 0.0.0.0:8000 --wait-for-client -m uvicorn infini_craft.server_groq:app --reload       `

```
            "name": "FastAPI Remote Debugger",
            "type": "debugpy",
            "request": "attach",
            "connect": {
                "port": 5678,
                "host": "localhost"
            }

```
[【Docker × FastAPI 】コンテナのFastAPIアプリをローカルからリモートデバッグする方法 \| SCRAWLED TECH BLOG](https://scrawledtechblog.com/docker-fastapi-remote-debug/)
### frontend
通常通りサーバーを開いて、msedgeにサーバーを開かせる。

```
            "name": "frontend debug",
            "type": "msedge",
            "request": "launch",
            "url": "http://localhost:5173",
            "webRoot": "${workspaceFolder}/ui"

```
