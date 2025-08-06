---
date: 2025-07-02
time: 19:43
tags:
  - Bar
---

up:: [Programming](<./Programming.md>)

レジスタとメモリを直接操る言語。
PowerPC Assemblyを見た感想なので、間違ってるかも。

[How to Make your own Cheat Codes](https://mariokartwii.com/showthread.php?tid=830)
[Assembly Tutorial](https://mariokartwii.com/showthread.php?tid=940)
[Basic ASM Code Debugging and Analysis for the Beginner Coder](https://mariokartwii.com/showthread.php?tid=1383)

[Claude](https://claude.ai/chat/10771d09-e094-4eb6-9724-b302e34b3888)

```assembly
.loc_0x0:
  b         -0x2EC34
  stw       r3, 0xB0(r30)
  lbz       r4, 0x28(r1)
  mulli     r4, r4, 0x4
  lis       r5, 0x8000
  ori       r5, r5, 0x2F00
  lwzx      r27, r5, r4
  cmpwi     r27, 0
  beq-      .loc_0x44
  li        r3, 0x80
  stb       r3, 0x2A(r1)
.loc_0x2C:
  addi      r3, r1, 0x24
  bl        0x65E30
  stw       r3, 0xB4(r30)
  subi      r27, r27, 0x1
  cmpwi     r27, 0
  bgt+      .loc_0x2C
.loc_0x44:
  b         0x2EBF8
```

このコードはPowerPCアセンブリ言語で書かれており、主にループ処理を行うプログラムです。以下、各部分を詳しく解説します：

## 初期設定部分

```assembly
.loc_0x0:
  b         -0x2EC34          ; 別の場所へ分岐（おそらく初期化処理）
  stw       r3, 0xB0(r30)     ; r3の値をr30+0xB0のメモリ位置に保存
```

## 配列アクセスとループカウンタ設定

```assembly
  lbz       r4, 0x28(r1)      ; r1+0x28から1バイト読み込み（配列インデックス）
  mulli     r4, r4, 0x4       ; r4を4倍（4バイト単位でのアクセス）
  lis       r5, 0x8000        ; r5の上位16ビットに0x8000を設定
  ori       r5, r5, 0x2F00    ; r5に0x2F00をOR（結果：0x80002F00）
  lwzx      r27, r5, r4       ; 配列[r5+r4]からループカウンタをr27に読み込み
```

## ループ条件チェック

```assembly
  cmpwi     r27, 0            ; r27と0を比較
  beq-      .loc_0x44         ; r27が0なら終了処理へジャンプ
  li        r3, 0x80          ; r3に0x80を設定
  stb       r3, 0x2A(r1)      ; r1+0x2Aに0x80を1バイト保存
```

## メインループ処理

```assembly
.loc_0x2C:
  addi      r3, r1, 0x24      ; r3 = r1 + 0x24（引数設定）
  bl        0x65E30           ; 関数呼び出し
  stw       r3, 0xB4(r30)     ; 戻り値をr30+0xB4に保存
  subi      r27, r27, 0x1     ; ループカウンタを1減算
  cmpwi     r27, 0            ; カウンタと0を比較
  bgt+      .loc_0x2C         ; カウンタ>0なら.loc_0x2Cへ戻る
```

## 終了処理

```assembly
.loc_0x44:
  b         0x2EBF8           ; 終了処理へジャンプ
```

## 処理の概要

1. メモリアドレス0x80002F00を基準とした配列から、インデックスに基づいてループ回数を取得
2. 取得した回数分だけループを実行
3. ループ内では関数（0x65E30）を呼び出し、その結果を保存
4. カウンタが0になるまで繰り返し
5. 最終的に終了処理へ移行

このようなパターンは、ゲームやシステムプログラムでよく見られる、配列データに基づいた反復処理の実装です。



この関数そのものをクローンキャラクターの数分繰り返している。
で、キャラクターの読み込み回数を0x80002F00から4バイト分で抜いてる。
実際にクローンするコードの一例が`04002F04 00000001`。これは2人分。

さて、それはともかく読み込んだキャラクターのデータを何処に保存してるの問題。

```asm
 li        r3, 0x80
  stb       r3, 0x2A(r1)
.loc_0x2C:
  addi      r3, r1, 0x24
  bl        0x65E30
  stw       r3, 0xB4(r30)
```

この辺。ループカウンタが無いならbeq-によりb         0x2EBF8まで飛ばすので。
load immediate。r3に0x80を登録。`addi r3, r0, 0x80`（r0は常に0）の省略形。
store byte。r3のうち下位8ビット、つまり1バイトをr1+0x2Aに登録。r1は事前に出て来てない。
add immediate。r3にr1+0x24を登録。
branch and link。まず用語。Program Counter(PC)は現在実行中の命令のアドレス。Link Register(LR)は戻りアドレス。ここでPC+0x04をLRに保存しとけば、現在の次のアドレスからすぐ始められる。それからPCに任意のアドレスを打ち込めばジャンプが実現できる。つまりこれは次アドレスをLRに保存しつつ0x65E30をPCに打ち込みジャンプするための命令。ちなみに32MB±がジャンプ限界。
store word。r3のうち32ビット、つまり1ワード（4バイト）をr30+0xB4に登録。今回のasmは0x00000000からも分かるように、1ワードとはつまり全部を指す。

キャラクターのデータ長はE90（海外版02）程度。

最初2行が別々なのは仕様。全部32ビットで命令長を統一するため。他にもいろいろあるらしい。

怪しいのはr1, 0x65E30, r30。r3は完全に入れ物なので違いそう。

beq-まではクローン分含めた全てのキャラクター分読み込まれる。
なのでこの間で新しいキャラクター分のデータを用意してるはず。

80031b4c

parcent書き込み
8008904c
800894c4
800893fc

sp
804ec8d8
804EC902
r30
80451f50
80452004

ピチューを使ってもクローンHP値を特定できない。
たまに正しい値があるということは、絶対どこかに確保してるのは間違いないのに。取る順も変わらない。
完全に乱数制御して同じ値を取るしかなさそう。

65E30自体は全てのキャラクターが通る。
