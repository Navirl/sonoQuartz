---
date: 2025-07-09
time: 11:57
tags:
  - Project
---

up:: [wails](../Bar/Framework/wails.md)

![https://bcdn.docswell.com/page/KE49N1Y1J1.jpg](https://bcdn.docswell.com/page/KE49N1Y1J1.jpg)

[PC用キーボードを用いた演奏システム \| ドクセル](https://www.docswell.com/s/kthrlab/KYD1RP-thesis-2022-shida#p9)

wailsピアノ
この研究ではベロシティをRNN実装してるが、一旦無視する

vstを読めるようにし、各音をキーに割り当てる
強弱、オクターブ上げ下げも忘れず

ベロシティを長押し＋離したときに発音で表現する手も考えたが、押すタイミングが実際とズレるのはいかがなものか。あと音を出しっぱなしにする用事もあるので長押し操作をそこに割り当てるわけにもいかない。やっぱり無視でいいんじゃないか。
操作感知の時間差でベロシティ差をつけるのがオーソドックス。理論上左手のコードが簡素化されて暇なのでShiftあたりにベロシティボタンを付ければいい。まぁ、追々。