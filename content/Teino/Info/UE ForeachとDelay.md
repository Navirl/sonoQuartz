---
date: 2022-11-07
tags:
 - Info
---

up:: [UE](<../Bar/App/Unreal_Engine.md>)
source:: [How to make a "For Loop with Delay" Macro : unrealengine](https://www.reddit.com/r/unrealengine/comments/flu7o3/how_to_make_a_for_loop_with_delay_macro/)
source:: [UE4 DelayとForLoopについて色々実験した - Gaming Life](https://ai-gaminglife.hatenablog.com/entry/2017/12/16/143033)

Foreachは出来るだけ早く仕事を終わらせようとするらしい。そのため、Delayが入るとさっさと次のループを始めてしまう。

Foreachをマクロで自作し、そのマクロ内にdelayを挟む場合は、ちゃんとdelayを含んで処理してくれる。

特にIndexを使う用事が無く、ただ繰り返したいならSet Timer By Eventを使う。Loopingを外し、Eventから再びSet Timer By Eventに繋げばいい、らしいけどどうせもう一回必要になるしマクロのほうが手っ取り早略

