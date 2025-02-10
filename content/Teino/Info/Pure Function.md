---
date: 2022-06-17
tags:
 - Info
aliases: 純粋関数
---

up:: [UE5.0.2](<../Bar/App/UE5.0.2.md>)
source:: [UE4 Pure関数とNonPure関数｜株式会社ヒストリア](https://historia.co.jp/archives/3929/)

==戻り値が参照されているとき==に実行される関数。
関数の設定内にあるPureチェックボックスをONにすればいい。
<!--SR:!2022-09-06,60,290-->

値が同じであっても何度でも呼び出されてしまうので注意。
その関係上、ForEachLoopと合わせるなら工夫が必要。

[BP,Blueprintアンチパターン その2 -Pure関数+ForEachLoop-](http://unwitherer.blogspot.com/2017/04/bpblueprint-2-pureforeachloop.html)

なお普通の関数は、==次に同じノードが実行される==まで戻り値が保存される。
そのため、別イベントに戻り値を簡単に渡せるけどどう考えても安全じゃないよなこれ。
それを利用して、同じ値を求めてるときにあえて普通の関数にするという最適化手法がある。
<!--SR:!2022-09-15,68,310-->