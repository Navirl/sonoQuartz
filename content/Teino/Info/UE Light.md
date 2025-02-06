---
tags:
 - Info
---

daily:: [2022-11-07](Daily_Note/2022-11-07.md)
up:: [UE5.0.2](../Bar/App/UE5.0.2.md)
source:: [【UE5】ライティング と ライトベイク について　ライトの基礎を解説 | メタタイムCG](https://metatimecg.com/ue5-lighting-build-basic/)
source:: [【UE5】Lumen の注意点やTipsをまとめてみた | メタタイムCG](https://metatimecg.com/ue5-lumen-tips/)
source:: [【UE5】Lumenとは？使い方も解説！｜UnrealEngine5(UE5)の教科書[旧]](https://zenn.dev/daichi_gamedev/books/unreal-engine-5/viewer/how-to-use-lumen)

Sky Lightを段階的に明るくしても間接光がうまくいかず。

ここを見る限り、従来のライトだと間接光を使用する場合は必ずビルドが必要。

Lumenは間接光の表現をリアルタイムにするが、光の強さが途中で変更された場合の表現はサポートしてない可能性。

つまり、開幕だけ欲しい間接光の明るさにして暗くすればOK。