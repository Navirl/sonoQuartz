---
tags:
  - Bar
---

daily:: [2025-01-02](Daily_Note/2025-01-02.md)
up::

CLIであいまい検索。
パイプを通すか`command $(fzf)`か`fzf --bind 'enter:(command {})`でプロセス開始。

[GitHub - junegunn/fzf: :cherry\_blossom: A command-line fuzzy finder](https://github.com/junegunn/fzf?tab=readme-ov-file#vimneovim-plugin)

fzfは単なるテキスト検索。そのため本来fzfだけだと何も起きない。
fzfのコマンドは環境変数`FZF_DEFAULT_COMMAND`に指定されたコマンドの出力を受け取ったことになる。

ここに`fd -t f`を指定してファイル検索をするのがセオリーらしいが、動作を見るに元から設定されているような。

[Navigating a filesystem quickly with fzf and fd](https://mike.place/2017/fzf-fd/)

## 完全一致
`'hoge`
[GitHub - junegunn/fzf: :cherry\_blossom: A command-line fuzzy finder](https://github.com/junegunn/fzf?tab=readme-ov-file#search-syntax)