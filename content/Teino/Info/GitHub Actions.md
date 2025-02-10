---
date: 2025-02-06
tags:
 - Info
---

up:: [Git](<../Bar/App/Git.md>)

タスクランナー。GitHubへのプッシュなどをトリガーにいろいろできる。
一番使うのはたぶんpagesへのオートビルド。

## ERESOLVE unable to resolve dependency tree
quartzでgithub pagesへのdeploy時にエラー。
npmのpackage依存関係が解決できないよエラー。そもそも手元でエラーしてた。

ちゃんとpackage.jsonを管理してれば起こりようがない。
今回は何も考えずにbotのpull requestを認証したためこうなった。
元のリポジトリからpackage.jsonとpackage-lock.jsonをコピーして貼り付けて終わり。


[ERESOLVE unable to resolve dependency treeの解決方法 #Docker - Qiita](https://qiita.com/koh97222/items/c46d1ef2a63b92bb6c15)
[Obsidian + Quartz + Github Page を使ってサイト公開｜devlive](https://note.com/devlive/n/n3250edc2ee8f)
[Hosting](https://quartz.jzhao.xyz/hosting#github-pages)