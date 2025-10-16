---
date: 2025-06-06
time: 18:15
tags:
 - Info
---

up:: [Programming](<../Bar/Program_lang/Programming.md>)

bit, byte
最小単位はbit。0か1。
byteは8bit。2~8で256通り。バイナリ的には00~ff。
たまに8bit以外をbyteと呼ぶこともあるので厳密にはオクテットを使う。まずないが。

word
CPUが一度に処理できるデータ量を表す。CPUが何ビットで動いているかで変わる。
現代CPUなら大抵64bit=8byte。
今回の対象はＧＣなので16bit=2byte。

short
符号付き短長整数型。16bit=2byte？

float
単精度実数型。32bit=4byte?

https://qiita.com/shikuno_dev/items/e8351d9f0ee51bbbf326
https://marycore.jp/prog/c-lang/data-type-ranges-and-bit-byte-sizes/
https://chokuto.ifdef.jp/urawaza/datatype.html