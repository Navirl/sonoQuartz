---
date: 2021-09-25
tags:
  - Bar
---

up:: 


## アス比維持リサイズ
`-vf scale=1280:-1`。維持したいほうを-1にする。
ちなみに両方指定するなら`-s 1280x720`。

[【ffmpeg】動画の解像度を指定してリサイズ、アスペクト比を維持したまま解像度を変更する、回転する - Qiita](https://qiita.com/riversun/items/d09d8e596a20ec1798f3)

## カット
```
-ss 00:00:00.000 #(ミリ秒省略可)
-to 00:00:00.000 #同上
-t 数値
```
-ssで開始地点、-toで終了地点、-tで開始地点からの秒数。
-ss、-toでも秒数による指定は可能。
一応無劣化変換のために`-c copy`をつけて置くことを推奨。

[FFmpegで動画を切り出す方法まとめ！無劣化カット方法もあわせてご紹介](https://jp.videoproc.com/edit-convert/cut-videos-using-ffmpeg.htm)
[ffmpeg で指定時間でカットするまとめ \| ニコラボ](https://nico-lab.net/cutting_ffmpeg/)

## バッチファイルでまとめて
[\[Windows\]ffmpegとbatファイルで快適ドラッグ＆ドロップ変換 – Ayutanalects](https://www.ayutanalects.com/tips/1020)

## 音量正規化
audioにloudnormフィルタ。
動画だろうとかけて返してくれる。

`ffmpeg -i aaa.mkv -c:v copy -filter:a loudnorm bbb.mkv`

[ffmpegでお手軽音量正規化 - krmdsrv](https://scrapbox.io/krmdsrv/ffmpeg%E3%81%A7%E3%81%8A%E6%89%8B%E8%BB%BD%E9%9F%B3%E9%87%8F%E6%AD%A3%E8%A6%8F%E5%8C%96)
## map
`-map 0:a:1`

[ffmpegのmapを解説する ffmpeg - Qiita](https://qiita.com/cabbage_lettuce/items/21348358ba46f4110d75)

## codecs
`ffmpeg -codecs`

## fps
`-vf fps=30`
多ければ前後を平均したフレームを挿入。
[ffmpeg でのフレームレート設定の違い | ニコラボ](https://nico-lab.net/setting_fps_with_ffmpeg/)

pts。presentation time stamp。表示タイムスタンプ。
dts。decoding time stamp。デコードタイムスタンプ。
IPBフレームで表示とデコードのタイミングがずれるので二つ必要。

[ffmpeg を使うなら知っておきたい話 PTSとかDTSの話：音ずれ問題や時間が変になるときのために ヽ(ﾟｰﾟ\*ヽ)(ﾉ\*ﾟｰﾟ)ﾉわぁい - Qiita](https://qiita.com/scleen_x_x/items/7f857f2d08de22dee274)
## png切り出し