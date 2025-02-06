---
tags:
 - Info
---

daily:: [2022-09-23](Daily_Note/2022-09-23.md)
up:: [UE5.0.2](<../Bar/App/UE5.0.2.md>)
source:: [虚幻 Accessed None trying to read property....问题_牧鱼ys的博客-CSDN博客](https://blog.csdn.net/qq_30310145/article/details/107947498)

Blueprint Runtime Error: "Accessed None trying to read property CallFunc_Create_ReturnValue". Node: Add to Viewport Graph: EventGraph Function: Execute Ubergraph Non AR Blueprint: NonAR

空になる可能性があるアクタをそのまま使うとたまにこのエラーが出る。遭遇したのはレベルブループリントでウィジェット配置したとき。
is validで事前にそのアクタが存在するかどうか評価すると消える。赤エラーじゃなくて黄色注意ぐらいで出てほしい。