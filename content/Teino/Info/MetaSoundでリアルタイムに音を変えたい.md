---
date: 2022-07-01
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/GUI/UE5.0.2.md>)
source:: [Using MetaSounds, you can adjust audio parameters during runtime per component! Sorry folks, Nanite and Lumen can't compete! *Watch with audio* : unrealengine](https://www.reddit.com/r/unrealengine/comments/no49dc/using_metasounds_you_can_adjust_audio_parameters/)

Variableの代わりに**Input**を増やし、Blueprint側からSet ~ Parameterで**名前指定して**いじくる。複数あるがどれでも動く。
ただしTargetに付けるのはMetaSoundSourceを直接Blueprintにくっつけた時にできる**Audio Component**。MetaSoundSourceはSound Baseにもくっつくがこれでは値は変更できないらしい。

![](<../images/Pasted image 20220701211410.webp>)

![](<../images/Pasted image 20220701211439.webp>)

![](<../images/Pasted image 20220701211527.webp>)