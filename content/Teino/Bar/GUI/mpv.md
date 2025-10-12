---
date: 2025-01-01
tags:
  - Bar
---

up::

CLIメディアプレイヤー。

## toggle speed
input.confに以下。
mpvと同じ階層に置けばいい？
```
\ cycle-values speed "2.0" "1"
```
[Hotkey to toggle playback speed? : r/mpv](https://www.reddit.com/r/mpv/comments/10v0jtf/hotkey_to_toggle_playback_speed/)

## 設定
`mpv.conf`を同階層に配置。
デフォルトの設定項目の他、コマンドラインオプションを設定することもできる。
例えば起動時の音量を変更する場合はこう。
```
volume=50
```
[mpv/etc/mpv.conf at master · mpv-player/mpv · GitHub](https://github.com/mpv-player/mpv/blob/master/etc/mpv.conf)
[mpv.io](https://mpv.io/manual/master/#putting-command-line-options-into-the-configuration-file)
[mpv.io](https://mpv.io/manual/master/#options)