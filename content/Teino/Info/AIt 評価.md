---
date: 2025-03-06
time: 18:09
tags:
 - Info
---

up:: [AIt](<../Bar/AI/AI_text.md>)

llmリーダーボードの比較値が分からなかったので。
[Open Japanese LLM Leaderboard - a Hugging Face Space by llm-jp](https://huggingface.co/spaces/llm-jp/open-japanese-llm-leaderboard)
[Open LLM Leaderboard - a Hugging Face Space by open-llm-leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard#/?search=chatwaifu)

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
Fundamental Analysis。基礎分析。
元ネタが見つからないが、wikiを読んで依存関係抽出や固有表現抽出 - Named Entity Recognitionを行うということでいいんだろうか。

## MR
Math Reasoning？ 数学的推論。
MAWPS, MAth Word ProblemSで測る。これは数学の文章問題。

[Papers with Code - MAWPS Dataset](https://paperswithcode.com/dataset/mawps)

## MT
Machine Translation。機械翻訳。
ある言語のテキストを別の言語に翻訳する。
多言語対応モデル用。
日本リーダーボードとしては最も重要そうな値。

[Papers with Code - Machine Translation](https://paperswithcode.com/task/machine-translation)

## STS
Semantic Textual Similarity。意味的テキスト類似性。
二つの文の意味的な類似度を評価する。
文の埋め込み表現の品質測定。
言い換えや重複排除に使う。

[Papers with Code - Semantic Textual Similarity](https://paperswithcode.com/task/semantic-textual-similarity)

## HE
試験問題。
MMLU, Massive Multitask Language Understandingで測る。これは57科目をカバーした広範囲ベンチマーク。

[Papers with Code - MMLU Dataset](https://paperswithcode.com/dataset/mmlu)

日本版JMMLUというのもある。

## CG
Code Generation。コード生成。
MBPP, Mostly Basic Python Programmingで測る。これは初心者のプログラマーでも溶ける容認設計されたpythonプログラミング問題。

[Papers with Code - MBPP Dataset](https://paperswithcode.com/dataset/mbpp)

## SUM
Summarization。要約。
長文を短く要約するタスク。
要約の正確性、簡潔性の評価。
notebooklm的だが、検索結果を分かりやすく伝えるのにも使えそう。

[Papers with Code - Text Summarization](https://paperswithcode.com/task/text-summarization)

## IFEval
Instruction Following Evaluation。指示正確性？
モデルが指示に正確に従う能力の評価。
プロンプト順守能力の測定。
プロンプトを凝るなら重要そう。キャラクター設定とか。

[Papers with Code - Instruction-Following Evaluation for Large Language Models](https://paperswithcode.com/paper/instruction-following-evaluation-for-large)

## BBH
BIG-Bench Hard。llm苦手タスク。
言語モデルが苦手とする複雑なタスク、数学的推論や比喩理解といったものを集めたベンチマーク。
限界の特定。
これが高いと人間らしくなりそう。

[Papers with Code - BBH Dataset](https://paperswithcode.com/dataset/bbh)

## GPQA
Graduate-Level Google-Proof Q&A。専門家レベルQA。
化学における大学院レベルの難問を含むQAベンチマーク。
高度な知識・推論能力の評価。

[GitHub - idavidrein/gpqa: GPQA: A Graduate-Level Google-Proof Q&A Benchmark](https://github.com/idavidrein/gpqa)

## MuSR
Multistep Soft Reasoning。
長いテキストの推論と理解。


[GitHub - Zayne-sprague/MuSR](https://github.com/zayne-sprague/musr)
[Papers with Code - MuSR: Testing the Limits of Chain-of-thought with Multistep Soft Reasoning](https://paperswithcode.com/paper/musr-testing-the-limits-of-chain-of-thought)

## MMLU
Massive Multitask Language Understanding。
数学、法律、医療と歴史を含む57分野の多肢選択問題。
汎用的な知識・推論力の総合評価。
[MC](<#MC>)の専門版か。








