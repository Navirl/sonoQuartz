---
date: 2022-10-08
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/App/UE5.0.2.md>)
source:: [UE4 - Tutorial - VR Widget Interactions! - YouTube](https://www.youtube.com/watch?v=jC91FFkxgh4)
source:: [Unreal Engine の UMG Widget Interaction コンポーネント | Unreal Engine ドキュメント](https://docs.unrealengine.com/5.0/ja/umg-widget-interaction-components-in-unreal-engine/)

Widget Interactionというコンポーネントがあるので、これで触る。
クリックは適当なボタンからPress Pointer Key**とRelease Pointer Kye**を呼び出す。両方呼ばないとClickにならないので注意。
触った時だけこれを呼びたいならGet Hovered Widget ComponentをIs Validにかければ、たぶん行ける。
