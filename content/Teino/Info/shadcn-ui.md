---
date: 2025-07-16
time: 08:59
tags:
 - Info
---

up:: [CSS](<../Bar/Program/CSS.md>)

Radix UIとTailwind CSSを使って作られたUIコンポーネント集。
カスタマイズが容易でコピペ容易。

[「shadcn/ui」って何が凄いの？実装知らないWebデザイナーが調べてみた｜akane](https://note.com/akane_desu/n/n1276d86d388e)

Radix UIはロジックのみ提供するRadix Primitives、デフォルトスタイルがあるRadix Themesの二種を提供するUIコンポーネントライブラリ。ロジックのみをヘッドレスUIというらしい。

shadcn/uiはRadix Primitivesを元に、Tailwind CSSでスタイルを追加した完全なコンポーネントを提供するUIライブラリ。
特徴としてコピペでコンポーネントを自前プロジェクトに適用するのが念頭であり、パッケージ化は二の次。なので自身は`This is NOT a component library.`を謳っている。

[Radix UIとは？特徴とshadcnとの関係｜koppi](https://note.com/koppi4605/n/ncc995b907981)

実際の使用。npxで初期化と追加を行える。コンポーネントによっては別ライブラリが必要になるため、依存関係の複雑化軽減のために必要な物だけ取り込むこと。

[Not コンポーネントライブラリを謳う shadcn/ui というコンポーネント集について](https://zenn.dev/yy616/articles/940e4727f88c06)

v0で生成されるコンポーネントはここからきている。

デザインツールfigmaにもあるので、そこからコピペも可能。

[巷で噂のshadcn/uiをNext.jsで使ってみた - Qiita](https://qiita.com/twrcd1227/items/d4a67bb155503fde30f5)
