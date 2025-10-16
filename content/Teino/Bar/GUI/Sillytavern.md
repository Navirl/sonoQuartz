---
date: 2023-05-03
tags:
  - Bar
aliases:
  - ST
---

down:: [Pygmalion](<../../Info/Pygmalion.md>)

AIキャラクターに特化したテキスト生成AIのクライアント。
OodaBoogaかkoboldAIからAPIを貰って動かすのが一番安定。
どっち使うかは好みの問題。

[GitHub - Cohee1207/SillyTavern: TavernAI for nerds](https://github.com/Cohee1207/SillyTavern)

本当はTavernAIという元の奴があったが、その更新が遅いからとか拡張機能が入らないからとかでSillyTavernという別プロジェクトが派生した。
大体使うのはSillyの方なのでそっちのURLを張る。TavernAIも簡単にキャラクターを追加できるという点では優秀。

ただのクライアントなのでスマホでも動く。
その場合はColabでOodaを動かせばいい。

Ooda+ColabのURLが書かれてるReddit。
[Which AI is best for phone? : r/PygmalionAI](https://www.reddit.com/r/PygmalionAI/comments/12uznum/which_ai_is_best_for_phone/)
[Which one works best for you? : r/PygmalionAI](https://www.reddit.com/r/PygmalionAI/comments/135au5o/which_one_works_best_for_you/)

P1GM4L10Nは普通にPygmalionをモデルに変換したもの。
Googleからの検索避けかもしれない。
[Regarding the recent Colab ban : r/PygmalionAI](https://www.reddit.com/r/PygmalionAI/comments/12bygy4/regarding_the_recent_colab_ban/)

Colab proじゃないと、GPUインスタンスにしても実際はGPUが動いておらずエラー吐いて止まるということがある。
[Problem with TavernAI, Colab, and KoboldAI : r/PygmalionAI](https://www.reddit.com/r/PygmalionAI/comments/11tktyn/problem_with_tavernai_colab_and_koboldai/)

## ollama
[Silly Tavern X Ollama](https://avivarma1.medium.com/silly-tavern-x-ollama-94801bfbbdd5)
[Use Ollama with any GGUF Model on Hugging Face Hub](https://huggingface.co/docs/hub/ollama)
簡単に動くが、早くはなく多機能でもない

## koboldcpp
DuckDuckGoを介したウェブサーチが可能。
[Release koboldcpp-1.81.1 · LostRuins/koboldcpp](https://github.com/LostRuins/koboldcpp/releases/tag/v1.81.1)

ビジョンモデルの画像入力も受け付けている。
この入力はtabbyapiでもできる？
[r/SillyTavernAI - Reddit](https://www.reddit.com/r/SillyTavernAI/comments/1i08ye2/does_st_support_vision_models/)

途中でモデルを切り替えることは出来ない。
Kaggleだといちいちモデル切り替えのために止めなければならない。
そうしたいならollamaを使ったほうが良い。

ただここはそもそもそんなモデル切り替える用事があるのかというところ。
テストならまだしも、本番の時にモデルちまちま切り替えるのは。




## tabbyapi
裏でexllamaを動かす。
exl形式しか動かせない？

## comfyui
[r/SillyTavernAI - Reddit](https://www.reddit.com/r/SillyTavernAI/comments/1j3ub9y/i_have_searched_and_searched_how_can_i_get_the_ai/)
AIメッセージに反応させて画像を生成させることは出来る。

[r/SillyTavernAI - Reddit](https://www.reddit.com/r/SillyTavernAI/comments/1k9bpsp/comfyui_sillytavern_expressions_workflow/)
[r/SillyTavernAI - Reddit](https://www.reddit.com/r/SillyTavernAI/comments/1kb0s7n/sillytavern_expressions_workflow_v2_for_comfyui/)
expression生成ワークフロー。

sdxlはタグなので、llmから出力させるのは厳しい。
illustriousなら自然言語対応とハイブリッドなので、ある程度行けるか。

ワークフローをAPI形式で出力。`%prompt%`などのプレースホルダーを仕込めば、sillytavernから変更できる。

ILだとマスピとかは背景を一緒に書くのでないならいらない。

## Web Search
Tavily AI、KoboldCppが有力。

## Function Calling
LLMに画像生成させたりWeb検索させたいときに使う。
設定からEnable Function Callingを使用。

## xtts
古い名前はcoqui-tts。
今はfork版に開発が移っている。
alltalk_tts経由。

## Fish speech
openaudioというモデルを使用している。
sillytavernでは使えない。

## CosyVoice
非公式対応。
WinとMacのぶんしかクライアントがない。

## LM Studio
[SillyTavern + LM Studio + 他 でMCPを使ったメモ｜ぬるぽらぼ](https://note.com/nullpolab/n/n4883fdf4b308#c8fb6818-5997-408a-a6bf-d1555d615a71)
チャット完了、http://127.0.0.1:1234/v1、None。

