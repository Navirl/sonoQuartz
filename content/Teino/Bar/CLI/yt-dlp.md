---
date: 2025-07-10
time: 14:07
tags:
  - Bar
---

up:: [Programming](<../Program_lang/Programming.md>)

なんでもdlする。

## niconicoのcomments
`yt-dlp url --write-subs --add-header accept-language:ja`
videoがいらないなら`--skip-download`。

[\[Niconico\] Anime danmaku is still broken on Niconico · Issue #6797 · yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp/issues/6797)

## config
色々やったが`${APPDATA}/yt-dlp/config`しか読めなかった。
cookieは適当な拡張機能でyoutubeのやつだけ。`--cookies-from-browser`と`--cookie`を合わせるとファイルとして出力できるが、これは全てのcookieを出力してしまう。

```
--js-runtime node
--embed-metadata
--embed-subs
--embed-thumbnail
--cookies $env:appdata\yt-dlp\cookies.txt
```

なぜか`$env`というゴミファイルができてしまう。
`$env:appdata`の時点で$envファイルのappdataにアクセスする、という意味になるためらしい。回避法が特に見当たらないので放置。""で囲ってもダメだし、スラッシュにしたらそもそも読まなくなる。

この書き方でもcookie読めなくなった。
もうわからん。`--cookies "D:\Scoop\persist\yt-dlp\cookies.txt"`に移行。

```
--js-runtime node
--embed-metadata
--embed-subs
--embed-thumbnail
--cookies "D:\Scoop\persist\yt-dlp\cookies.txt"
-o "%(uploader)s/%(playlist)s/%(playlist_index)02d%(playlist_index& - |)s%(title)s.%(ext)s"
--output-na-placeholder ""
```

## playlistの途中から
```
-I, --playlist-items ITEM_SPEC  Comma-separated playlist_index of the items
                                to download. You can specify a range using
                                "[START]:[STOP][:STEP]". For backward
                                compatibility, START-STOP is also supported.
                                Use negative indices to count from the right
                                and negative STEP to download in reverse
                                order. E.g. "-I 1:3,7,-5::2" used on a
                                playlist of size 15 will download the items
                                at index 1,2,3,7,11,13,15
```

## あるフィールドがある時だけ
`%(field&true_str|false_str)s`
フィールドがあればtrue_strが、無ければfalse_strが出力される。
フィールド自体を出力するなら`{}`で出る。
strになるので02dなどは機能しない。

なのでこういう冗長になる。
`-o "%(uploader)s/%(playlist)s/%(playlist_index)02d%(playlist_index& - |)s%(title)s.%(ext)s"`

それぞれは`&置換演算子`、`|デフォルト値演算子`。
なのであるだけでいいなら`%(field&true_str)`、ないだけでいいなら`%(field|false_str)`でいい。

[GitHub - yt-dlp/yt-dlp: A feature-rich command-line audio/video downloader](https://github.com/yt-dlp/yt-dlp#output-template)

## プレイリストがある時だけ以下のフォルダへ
問題はない時にNAが出力され、NAフォルダに入れられること。
`--output-na-placeholder ""`でプレースホルダを文字無しにすればOK。

## niconicoのコメント
字幕としてダウンロードできる。
しかしnndownloadのものと深さやglobalcommentsフィールドの有無などが違い、そのままだとnicojson2xmlで読めない。
なのでpythonで変換。

```python
#!/usr/bin/env python3
"""
ニコニコ動画コメントデータ変換スクリプト
使用方法: python yt-dlpjson2nicojson.py [input.json] [output.json]
"""

import json
import sys
from pathlib import Path
from typing import List, Dict, Any
from itertools import groupby


def get_fork(comment: Dict[str, Any]) -> str:
    """コメントのforkタイプを判定"""
    commands = comment.get("commands", [])
    
    if len(commands) == 0:
        return "owner"
    elif "184" in commands:
        return "main"
    else:
        return "easy"


def convert_comments(comments: List[Dict[str, Any]]) -> Dict[str, Any]:
    """コメントリストを新形式に変換"""
    
    # スレッドID（固定値）
    thread_id = "1693580826"
    
    # fork別にソートしてグループ化
    sorted_comments = sorted(comments, key=get_fork)
    grouped = groupby(sorted_comments, key=get_fork)
    
    # スレッド配列を作成
    threads = []
    for fork_type, group_comments in grouped:
        comment_list = list(group_comments)
        thread = {
            "commentCount": len(comment_list),
            "comments": comment_list,
            "fork": fork_type,
            "id": thread_id
        }
        threads.append(thread)
    
    # globalCommentsのカウント（mainフォークのコメント数）
    main_comments = [c for c in comments if get_fork(c) == "main"]
    global_comment_count = len(main_comments)
    
    # 最終的な出力構造
    output = {
        "data": {
            "globalComments": [
                {
                    "count": global_comment_count,
                    "id": thread_id
                }
            ],
            "threads": threads
        },
        "meta": {
            "status": 200
        }
    }
    
    return output


def main():
    """メイン処理"""
    # 引数の取得
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    # 入力ファイルの存在確認
    input_path = Path(input_file)
    if not input_path.exists():
        print(f"エラー: 入力ファイル '{input_file}' が見つかりません", file=sys.stderr)
        sys.exit(1)
    
    try:
        # JSONファイルを読み込み
        with open(input_path, "r", encoding="utf-8") as f:
            comments = json.load(f)
        
        # 変換処理
        output = convert_comments(comments)
        
        # JSONファイルに出力
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=4)
        
        print(f"変換完了: {output_file}")
        
    except json.JSONDecodeError as e:
        print(f"エラー: JSONの解析に失敗しました - {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"エラー: 変換に失敗しました - {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
```

それを元にpythonで自動処理。シェルだとyt-dlpのprint出力受け取り時に文字化けしまくったので。



```python
#!/usr/bin/env python3
import os
import subprocess
import sys

WORKDIR = "D:/Downloads"
YTDLP2JSON = os.path.join(WORKDIR, "yt-dlpjson2nicojson/yt-dlpjson2nicojson.py")
NICOJSON2XML = os.path.join(WORKDIR, "nicojson2xml/nicojson2xml.py")
DANMAKU2ASS = os.path.join(WORKDIR, "nicodanmaku2ass/danmaku2ass.py")

os.chdir(WORKDIR)

url = input("URL を入力してください: ").strip()
if not url:
    sys.exit("URL が入力されていません")

# yt-dlp 実行（バイトで受け取る）
proc = subprocess.run(
    ["yt-dlp", "--no-warning", "--print", "after_move:filepath", url],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
)

# Windows(cp932) でデコード
output = proc.stdout.decode("cp932", errors="replace")
print(output)

for line in output.splitlines():
    if not line.strip():
        continue

    video_file = line.strip()
    dir_path = os.path.dirname(video_file)
    name_only = os.path.splitext(os.path.basename(video_file))[0]

    base_name = os.path.join(dir_path, name_only) if dir_path else name_only

    comments_json = f"{base_name}.comments.json"
    comments_conv_json = f"{base_name}.commentsconv.json"
    comments_xml = f"{base_name}.commentsconv.xml"
    ass_file = f"{base_name}.ass"

    subprocess.run(
        ["python3", YTDLP2JSON, comments_json, comments_conv_json],
        check=True,
    )
    subprocess.run(
        ["python3", NICOJSON2XML, comments_conv_json],
        check=True,
    )
    subprocess.run(
        ["python3", DANMAKU2ASS, "-o", ass_file, "-a", "0.8", comments_xml],
        check=True,
    )


```

