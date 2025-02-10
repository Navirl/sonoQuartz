---
date: 2024-04-04
tags:
  - Info
---

up:: [Stable Diffusion](<../Bar/Stable Diffusion.md>)


sdxlは1024x1024が基本だが、これは縦横比ではなくピクセル数が決まっている。約100万px。（1,048,576）
というわけで数値を弄れば上手く別比率の画像が作れる。多少ならズレててもOK。もちろん8で割り切れる数字にすること。
これに従わないと頭が分裂したりする。

[SDXLで高精度に生成するためのサイズ一覧 SDXLサイズチートシート | taziku / AI × クリエイティブ | 東京・名古屋](https://taziku.co.jp/all/sdxl-size)
[SDXL Image Size Cheat Sheet | Civitai](https://civitai.com/articles/2246/sdxl-image-size-cheat-sheet)

### 正方形

width:1024, height:1024　1:1

## SDXL
### 横長画像

width:1152, height:896　nealy 4:3 RV 0.778
width:1216, height:832　nealy 3:2 RV 0.684
width:1344, height:768　nealy 16:9 RV 0.571
width:1568, height:672　21:9 RV 0.429
width:1728, height:576　3:1 RV 0.333
1296x800 1.618

### 縦長画像

width:576, height:1728　1:3 RV 3
width:768, height:1344　nealy 9:16 RV 1.75
width:832, height:1216　nealy 2:3 RV 1.462
width:896, height:1152　3:4 RV 1.286


## SD1.5
基本サイズの512を下回らなければ別に。


## アップスケール
### Hires.fix
低解像度→高解像度へのi2i。
古典的。

### Tile
構図をそのままに書き込みを増やす。
Hiresと合わせてキャンバスを大きくしつつ構図そのまま書き込みを増やすこともできる。

[ControlNetのTileを使って忠実な高解像度化をする｜おっほ](https://note.com/ohou_log/n/na6f1cc2aa2e3)