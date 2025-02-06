---
tags:
  - Bar
aliases:
  - AIo
---

daily:: [2024-09-29](Daily_Note/2024-09-29.md)
up:: 

ローカルじゃないオンラインサービスの整理。多すぎ。

## テキスト
[AI_text](AI_text.md)
## 画像
[AI_image](AI_image.md)

## 動画
### Nolang
日本発動画生成サービス。
1分を指定すると2秒くらいはみ出るが、どの道デフォルトの読みあげは遅すぎなので手作業で加速させる分と割り切ったほうが良いかもしれない。

ffmpegで1.05倍速させるやつ。
```sh
ffmpeg -i input.mp4 -c:v hevc_nvenc -b:v 8M -bufsize 8M -vf "setpts=PTS/1.05,fps=60" -af "atempo=1.05" output.mp4
```

別の音声を追加する奴。
これする場合はNolangからのBGMをカットする。

```sh
ffmpeg -i input.mp4 -i audio.mp3 -filter_complex "[0:v]setpts=PTS/1.05,fps=60[v];[0:a]atempo=1.05[a1];[a1][1:a]amix=inputs=2:duration=first:weights=1 0.1[a]" -map "[v]" -map "[a]" -c:v hevc_nvenc -b:v 8M -bufsize 8M output.mp4
```



### VMEG
素材指定で動画生成するサービス。
商品紹介しかできない。(2024/10/19)

それより動画の翻訳サービスが有用。
動画を読み込み、その人の声で翻訳して音声を付けられる。（クレジットを翻訳2回分追加で消費する）
当然だが元の動画の音声はカットされるので注意。

無料版だとVMEGロゴの圧が強い……

解説
[”Nolang”にも負けない動画生成AI「VMEG」が誰も知らないのに神AIツールすぎる。 - YouTube](https://www.youtube.com/watch?v=OObGs-LaFDQ)

### VideoFX
Googleの動画生成。
商用利用について明記されていない。
[AI Test Kitchen](https://aitestkitchen.withgoogle.com/tools/video-fx)

### Haiper
動画生成。
SoraとかLuma DreamMachineの系列。
[Haiper - AI Video Generator](https://haiper.ai/creations)
## 音楽
### MusicFX
Googleの音楽生成。
商用利用について明記されていない。
[MusicFX](https://aitestkitchen.withgoogle.com/tools/music-fx)

### Suno AI
最初に有名になった音楽作成。
今もなんやかんや強い。

[Suno AI](https://suno.com/about)

### Udio
Suno AI対抗で有名になったAI作成
今はSunoの機能が追いついた。

[Udio | AI Music Generator - Official Website](https://www.udio.com/home)

### NeuralNote
[Site Unreachable](https://gigazine.net/news/20230515-neuralnote/)

MIDI変換。

## オートメーション
### Dify
いろんなサービスを簡単に接続する。
[Dify](../App/Dify.md)

### Restack
AIエージェント。
セルフホスト可能。

[The framework for autonomous intelligence — Restack](https://www.restack.io)

## その他
### CodeAGI
あらゆる形式のExcel設計書を読み込んでプログラムに変える。

[【生成AI】知らないと後悔する、GPT-4oだけでシステム開発を300%効率化するハック【CodeAGI】 #Python - Qiita](https://qiita.com/nqdior/items/1bef77d46e199f8ec97c)

公式サイトが2000年代かと思うほどダサい（2024/07/21）が、相手がレガシー日本企業と考えるとこんなもんなのかもしれない。

[サービス | SOPPRA Digital transformation株式会社](https://www.soppradx.com/service.html)
## インスタンス
### Novita.AI
AI関連のサービスを簡単にGPUクラウド上で使えるようにする。
Difyから呼べる。
