---
date: 2023-01-30
tags:
 - Info
---

up:: [Obsidian](<../Bar/GUI/Obsidian.md>)

## Graph-analysys
自動で関連ノートを探す。
[Obsidianのリンクを元にして関連ノートを見つけ出すプラグイン – ごりゅご.com](https://goryugo.com/20211115/graph-analysis/)

## Dataview
検索結果を**ファイル内の**リストやテーブルに表示する。
Javascriptが実行できるので、何か表示したいだけならプラグインを作らずともこれで間に合うことも多い。
[Dataview](https://blacksmithgu.github.io/obsidian-dataview/)

## obsidian-text-expand
検索結果に対してのリンクを一気に張る。
[mrjackphil/obsidian-text-expand: A simple text expand plugin for Obsidian.md](https://github.com/mrjackphil/obsidian-text-expand)

## typewriter-scroll
常に文章を真ん中に持ってくる。
そのせいかモバイルからだと文章選択時に勝手にどこまでも滑っていく。

## BibleGateway-to-Obsidian
毎日聖書から一つ引用してマークダウンにする。
**Ruby必須。**
[GitHub - selfire1/BibleGateway-to-Obsidian: This script adapts jgclark's BibleGateway-to-Markdown script to export for use in Obsidian.](https://github.com/selfire1/BibleGateway-to-Obsidian)

## your-papa/obsidian-Smart2Brain
[GitHub - your-papa/obsidian-Smart2Brain: An Obsidian plugin to interact with your privacy focused AI-Assistant making your second brain even smarter!](https://github.com/your-papa/obsidian-Smart2Brain)
llmと接続して検索。
最初にembeddingを行うため長い待ち時間が発生する。
また、ollmaでembeddingを行おうとすると即VRAM不足で止まる。

## linanwx/aosr
[GitHub - linanwx/aosr: Aosr is Another Obsidian plugin for Spaced Repetition.](https://github.com/linanwx/aosr)
spaced repetitionの別バージョン。
大体SRで良くないってなるが、複数行を両方にサポートするのは強い。
あとデッキ機能がある。

レビューインターフェースが標準ページで開くのもありがたい。
実はSRでもできるが。

ただタグを著しく汚染する。

また、ファイル単位のreview機能が無い。
repeatプラグインはdataviewが必要なので却下。

つまり複数行をどうしても導入したいとき以外に使う用途が無い気がする。

## chhoumann/quickadd
[GitHub - chhoumann/quickadd: QuickAdd for Obsidian](https://github.com/chhoumann/quickadd)

テンプレートを挿入したり、ノートから情報を読んだり、マクロ組んだりできる。
特定のフォルダに特定のテンプレートを適用して挿入できる機能が便利。