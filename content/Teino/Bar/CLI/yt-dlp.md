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
