---
date: 2025-10-17
time: 01:22
tags:
  - Bar
---

up:: [Git](<../CLI/Git.md>)

gitホスティングサービス。

## githubでいうarchive
読み取り専用リポジトリを指すほか、ソースコードをまるごとダウンロードするのにも使うURLの一部。
Download zipと同じ。
`https://github.com/libgit2/libgit2/archive/v1.9.1.tar.gz`で行けるが、本来`https://github.com/<owner>/<repo>/archive/refs/tags/<tag>.tar.gz`という形式のはず。何で通ってるんだ。

## ミラー
codebergはプライベートを基本推奨してない。
[Frequently Asked Questions \| Codeberg Documentation](https://docs.codeberg.org/getting-started/faq/#how-about-private-repositories%3F)

## Githubに動画をアップ
GithubのMarkdownエディタにD&Dでいける。

## githubとssh接続
ssh−agentにkey登録のひと手間がクライアント側に必要。
`exec ssh-agent bash`でエージェントを実行し、`ssh-add privatekeypath`で登録。

https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

場合によってパーミッションエラーが出るので、`chmod 600 privatekeypath`で自分しか変更できないようにする。

https://qiita.com/yyy752/items/32f66d877de41655b7bb
