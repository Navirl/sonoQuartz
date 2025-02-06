---
tags:
  - Info
---

daily:: [2024-12-06 FX](../Daily_Note/2024-12-06%20FX.md)
up:: [コーパス](<./コーパス.md>)

読みあげの文章は以下から。
[GitHub - Haruqa/ita-corpus: ITAコーパスの文章リスト](https://github.com/Haruqa/ita-corpus/)

収録と分類はOREMOを使うのが一般的。上記でも推奨されている。実際一回やった。
[Site Unreachable](https://note.com/joumonsugi/n/nbcad291ac5c5)

ただこいつの最終更新が2014年であり、Windowsのアプデで止まる予感がある。
なので今度はCoRecoを使う。
[GitHub - TylorShine/coreco-recorder: CoReco: A general-purpose Corpus viewer/Recorder](https://github.com/TylorShine/coreco-recorder)
ビット深度はPCM_16。

収録注意点
- 止めるのは基本「、」、「。」がある時のみ
    - MYCOEIROINKでは「・」は続ける
- 音割れしない
- 感情、声質、スピード、読み方などは全ての文で一定に
    - 文章の意味はいったん置いておく
    - 「アニメのような強い感情はダメだけど一定の感情をもって、キャラの声は維持しながらも抑揚は抑えめで、朗読でも棒読みでもなく自然に話す感じでお願いします！」
        - [個人で合成音声キャラ運営やAItuberの声のコーパスのご依頼する時の声の方の探し方と収録方法｜夕輝ひかり](https://note.com/itamana/n/nd483c32af311#9423AF39-2907-4344-BB4E-53F82106ADED)
    - ITAは感情と朗読があるが、読み方を変えるという記述が無いので両方同じ読み方で

[個人で合成音声キャラ運営やAItuberの声のコーパスのご依頼する時の声の方の探し方と収録方法｜夕輝ひかり](https://note.com/itamana/n/nd483c32af311#9423AF39-2907-4344-BB4E-53F82106ADED)

長い文章だと以上の注意点は難しい
一応句読点区切りで収録もできる、SoXのインストールが必要

[OREMOでITAコーパスを句読点区切りで収録するキット - 巽のブログ](https://tatsu3.hateblo.jp/entry/2022/07/29/071056)

他参考
[ITAコーパスの録音方法まとめ - 巽のブログ](https://tatsu3.hateblo.jp/entry/2022/10/08/180405)
[個人で合成音声キャラ運営やAItuberの声のコーパスのご依頼する時の声の方の探し方と収録方法｜夕輝ひかり](https://note.com/itamana/n/nd483c32af311#9423AF39-2907-4344-BB4E-53F82106ADED)
[Google Colab](https://colab.research.google.com/drive/1BqaB-Zv5RuaQp-OW0effsFVGCYwvaJ4R?usp=sharing#scrollTo=XonqbnmmumCJ)