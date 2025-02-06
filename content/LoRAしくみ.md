---
tags:
 - Info
---

daily:: [2023-05-01](/Daily_Note/2023-05-01.md)
up:: [AI_local](../Bar/AI/AI_local.md)

[AI を自分好みに調整できる、追加学習まとめ ( その５: LoRA)｜teftef｜note](https://note.com/te_ftef/n/n096ef64cb6c1)

Low-Rank Adaptation。transformerの持つ層に対して、パラメータの全てではなく一部だけを更新することで、素早く学習する。



内部では、transformerの各層にランク分解行列を挿入する。






まずはガウスの消去法から。
[ガウスの消去法による連立一次方程式の解き方 | 高校数学の美しい物語](https://manabitimes.jp/math/1170)

ランク分解行列とは行列を複数の行列の積に分解したもの。

業界男系

そもそも行列のランクとは、行列が生成するベクトル空間の次元。

行エシュロン形とは、二つの条件を満たす行列。
1. ゼロでない行がゼロのある行より上にある。
2. 各ゼロでない行の先頭の非ゼロ

これ仕組み的にloraでGPT4Allをunfilteredに！　っていうのは難しそう。
かといって直接学習かけるのは難しい。GPT-4の学習、LoRAないとVRAM1.2TBだって。DeepSpeedなら変わるのか？　いやああいつも80GBとか平気で使うから……

[GitHub - microsoft/DeepSpeed: DeepSpeed is a deep learning optimization library that makes distributed training and inference easy, efficient, and effective.](https://github.com/microsoft/DeepSpeed)