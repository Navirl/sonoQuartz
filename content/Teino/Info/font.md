---
date: 2025-10-12
time: 11:02
tags:
 - Info
---

up:: [Art](<../Bar/Art.md>)

## qiitaの文字がやたら太い
ヒラギノが指定されているため。
ヒラギノはW0-W9で太さ指定ができるが、一般のフォントはW1-W10のため太さが一段階ズレる。
仕方ないのでstylebotでbodyをNoto Sans JPに強制指定した。zennも太かったので同様に。

[font-familyで「ヒラギノ明朝」を指定すると、Windowsでフォールバックフォントの太さが変わってしまう問題の回避策 - Qiita](https://qiita.com/sarap422/items/ea2084b7352e9d8adda4)
[Figmaのヒラギノ系のfont-weightが狂っている!? - Qiita](https://qiita.com/gilly/items/9dd49f5e1e040fbafadf)