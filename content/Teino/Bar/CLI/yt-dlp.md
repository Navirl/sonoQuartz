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