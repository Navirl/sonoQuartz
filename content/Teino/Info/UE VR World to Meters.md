---
tags:
 - Info
---

daily:: [2022-11-12](Daily_Note/2022-11-12.md)
up:: [UE5.0.2](../Bar/App/UE5.0.2.md)

VRでワールドのサイズ感を手軽に変更する機能。1mが何単位か示す。
Player Pawnを単純にスケールした時と違い、左右の目の距離感そのままで巨大化できる。酔いを防止するためにも大きくなりたいなら必ずこの値を使う。
……と思ってたが、たぶんPlayer Pawnをスケールしたのと変わらない。10000にして気づいた。

source:: [World to Meters設定を変更した際にMotion Controller Componentによるトラッキングがおかしくなる問題について - ぼっちプログラマのメモ](https://pafuhana1213.hatenablog.com/entry/2017/05/21/175253)

たまに手の位置なんかがバグるが、その時はMotion Controllerをスケールすればいいという報告あり。
当然手に持ってるものもスケールされてしまうのでその補正も組んでおく。