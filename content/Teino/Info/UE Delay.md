---
date: 2022-12-05
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/App/UE5.0.2.md>)

一つのBlueprintインスタンス内で、Delayが終わってないうちに同じDelayノードを使うと、一つ目のDelayの後の処理が行われないらしい。
カスタムイベントで個別のBlueprintに実行させれば（一つのインスタンス内で同じDelayノードを使わなければ）大丈夫。
