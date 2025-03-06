---
date: 2025-03-06
time: 18:09
tags:
 - Info
---

up:: [AIt](<../Bar/AI/AI_text.md>)

## NLI
Natural Language Inference。自然言語推論。
二つの文、前提と仮説の論理関係を判定する。含意とか矛盾とか。
文脈理解や推論能力。
シンプル。

[Papers with Code - Natural Language Inference](https://paperswithcode.com/task/natural-language-inference)

## QA
Question Answering。質問応答。
質問に対してテキストから答えを抽出・生成する。
検索するならこれが重要？

[Papers with Code - Question Answering](https://paperswithcode.com/task/question-answering)

## RC
Reading Comprehension。読解。
長文を読んで、内容に基づく質問に答える。
複雑な文脈理解や推論能力。
ソースを読んでの回答など、notebooklm的か。

[Papers with Code - Reading Comprehension](https://paperswithcode.com/task/reading-comprehension)

内容に基づく質問なので、多肢選択も含まれる。

## MC
Multiple Choice。多肢選択。
複数の選択肢から正解を選ぶ。
知識や推論能力。
検索だと重要そう。

[Papers with Code - Multiple-choice](https://paperswithcode.com/task/multiple-choice)

## EL
Entity Linking。実体対応。
文中の実体、人名や地名などを知識ベースのIDに対応付ける。
知識統合や検索システム。
[RC](<#RC>)に近い様な。

[Papers with Code - Entity Linking](https://paperswithcode.com/task/entity-linking)

## FA
Factual Accuracy。事実正確性。
生成内容の事実正確性を評価する。
幻覚への対応。
あまり高いと創造性が低そう。

## MR
Multi-hop Reasoning。マルチホップ推論。
複数の文や知識を組み合わせて推論する。
[EL](<#EL>)に近い様な。

## MT
Machine Translation。機械翻訳。
ある言語のテキストを別の言語に翻訳する。
多言語対応モデル用。あまり高くても別に……

## STS
Semantic Textual Similarity。意味的テキスト類似性。
二つの文の意味的な類似度を評価する。
文の埋め込み表現の品質測定。
開発者用っぽい。

## HE
Humor Evaluation。ユーモア評価。
ユーモアの検出や生成。
創造性や文脈理解の高度な評価。
[FA](<#FA>)とぶつかりそう。

## CG
Commonsense Generation。常識生成。
常識的な知識に基づくテキスト生成。
日常的な推論能力の評価。
なんのどこの常識だ。

## SUM
Summarization。要約。
長文を短く要約するタスク。
要約の正確性、簡潔性の評価。
notebooklm的だが、検索結果を分かりやすく伝えるのにも使えそう。

## IFEval
Instruction Following Evaluation。指示正確性？
モデルが指示に正確に従う能力の評価。
プロンプト順守能力の測定。
プロンプトを凝るなら重要そう。キャラクター設定とか。

## BBH
BIG-Gench Hard。llm苦手タスク。
言語モデルが苦手とする複雑なタスク、数学的推論や比喩理解といったものを集めたベンチマーク。
限界の特定。
これが高いと人間らしくなりそう。

## GPQA
Graduate-Lebel Google-Proof Q&A。専門家レベルQA。
専門家レベルの難問を含むQAベンチマーク。
高度な知識・推論能力の評価。
どの専門家？

## MUSR
Multi-Task User Satisfaction Ration。
複数タスクにおけるユーザー満足度。
何の満足度でどうやって評価する。

## MMLU
Massive Multitask Language Understanding。
数学、法律、歴史を含む57分野の多肢選択問題。
汎用的な知識・推論力の総合評価。
[MC](<#MC>)の専門版か。








