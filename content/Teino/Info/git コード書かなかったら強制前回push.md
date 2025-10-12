---
date: 2025-02-16
time: 21:01
tags:
 - Info
---

up:: [Git](<../Bar/CLI/Git.md>)

殺意を感じるgithub actions。

この実現には前日ブランチ作成、プルリク作成、マージ遂行までを一つで行う必要がある。
また、最終的にはブランチ作成の幅とか作成のトリガーとかを決められるyamlかなんかとそれを読むプログラムを用意することになる。
あと、単純に前日をやっていくと、二回出来なかった時にrevertのrevertにより情報が戻ってきてしまう。どっかにrevertされない対象日情報のsavefileを用意することになりそう。

まあ最初は適当にブランチ切って前日までの全部をsquashしてrevertプッシュすればいいんじゃないか。

`git rebase -i HEAD~n`でnまでのsquashが出来る。
`git rebase コミットハッシュ`で対象コミットのrevertが出来る。


……あっ、日を跨ぐまでこちらの成果をpushせずに、actionsだけrevertコミットをpushしたら、次の日にpushするときコンフリクトする。
別にmergeで何とかすればいいが、作業内容が消えると分かってるマージを行うわけもなく。やっぱりローカル内でやらないと強制力がない。

[Felo（フェロー）- 無料のAI検索エンジン](https://felo.ai/ja/search/4aopsBiDVx3GxyNhziiS9B)
[GitHub Actionsで、自動でプルリクを作成してマージする方法｜ekusiadadus](https://note.com/ekusiadadus/n/n0e8e4ac712a5)
[プルリクエストを自動的にマージする - GitHub Docs](https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)