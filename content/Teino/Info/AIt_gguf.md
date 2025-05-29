---
date: 2025-05-29
time: 13:00
tags:
 - Info
---

up:: [AIt](<../Bar/AI/AI_text.md>)
up:: [AIt\_quantization](<./AIt_quantization.md>)

[Felo（フェロー）- 無料のAI検索エンジン](https://felo.ai/search/QVJowiUrNyLuy73KRUwqHE)
felo情報

static、imatrix、IQ Quantsなどがある。
重ねて使えるものもあるので、あんま同一に語ってはいけないが。

## static
staticは以前からあるほう。少量のデータ(キャリブレーションデータ)で活性化する値を収集して圧縮する。
KはK-qunatsという新しい量子化。

## imatrix
imatrixはimportant matrixの略。重要度行列で重要な部分を見つけ、その精度を優先的に保持する。こちらもキャリブレーションデータを使用するが、ここで各重みと出力で重要度を取り後で使う。
低ビット量子化でも精度が落ちにくいらしい。

たまにi1とついているモデルがあるが、これはimatrixを使用していることのしるしらしい。

システム上他の量子化と組み合わせ可能。

## IQ Quants
IQ Quants。QuIP＃のアイデアを取り入れた量子化。
これの低ビットの品質のため、元々imatrixは来た。

従来よりも低ビットで高性能、高速で推論可能。
代わりにCPU負荷が少し高いらしい。




