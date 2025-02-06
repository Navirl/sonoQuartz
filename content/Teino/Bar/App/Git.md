---
tags:
 - Bar
 - App
---

daily:: [2021-07-17](Daily_Note/2021-07-17.md)
up:: 

## subtree
[【手順】git subtreeコマンドの使い方 - Qiita](https://qiita.com/takahashi-kazuki/items/0c34b3bc5da6700d38a5)
[Git Subtree 事始め - Qiita](https://qiita.com/mikakane/items/487ca8b3acddfa5fdb41)
消すときはディレクトリさえ消せばいい。コミットは残るが。

#### 説明
サブリポジトリをメインリポジトリの**ブランチ**として取り込むやり方。サブのhistoryがメインのhistoryに**一緒に載る。**
ちなみに最初のsubtreeで`--squash`しないと、メインhistoryに**サブのこれまでのhistoryが一気に全部載る**。squash推奨。

サブの変更をメインに反映するには、`git subtree push`すればいい。これでサブのリモートに変更を反映できる。サブのローカルを更新するときは`git subtree pull`。メインとサブは直接くっついているので、サブのローカルが更新されるとメインのローカルも更新される。この二つも`--squash`しないとhistoryが全部載るので注意。

注意点として、実はこのコマンドは`git merge -s subtree`で指定できるmergeのオプション、subtreeの**ラッパー**。その関係上**リモートにその操作のログは残らない**ため、メインをcloneした際にどれがsubtreeなのかという情報は**消滅する**。前述のとおりサブのhistoryはメインに残るためファイルを扱うだけなら問題は無いが、同じように作業したいなら`git subtree add`を使用してリンクしなおす必要がある。

mergeなので、メインからサブのhistoryだけ示すことは出来ない。

サブのlfsは**非対応**。

本当に、本当に複雑性が上がるのであまり推奨しない。
対応してるソフトもSourceTreeくらいだし。GitKrakenが対応していない。

[Git subtree のパワー | Atlassian Japan 公式ブログ | アトラシアン株式会社](https://www.atlassian.com/ja/blog/the-power-of-git-subtree)
[Git のマージ戦略のオプションとサンプル | Atlassian Git Tutorial](https://www.atlassian.com/ja/git/tutorials/using-branches/merge-strategy)

[Differences between git submodule and subtree - Stack Overflow](https://stackoverflow.com/questions/31769820/differences-between-git-submodule-and-subtree)
[git submodule と git subtree から見る外部リポジトリの取り扱い - tech.guitarrapc.cóm](https://tech.guitarrapc.com/entry/2019/03/16/065700)

#### split
subtree特有の機能。ディレクトリを切り出し、別のブランチとして切り分ける。
**過去のコミットも切り分けて新しいブランチに反映する**のが特徴。そのせいで、巨大なリポジトリでは時間がかかる。
`--rejoin`を付けると、次のsplit時にそれをつけてsplitした履歴より前を見なくなるらしい。

ちなみに、`git subtree push`は**中でsplitを使用している。**


[git subtree でリポジトリ in リポジトリを実現する│FORCIA CUBE│フォルシア株式会社](https://www.forcia.com/blog/001564.html)
[git-subtree移行メモ - Qiita](https://qiita.com/shogo82148/items/04b29b195dbbb373152f#rejoin%E3%81%97%E3%81%9F%E3%81%A8%E3%81%8D)

## git lfs
大きいファイルを扱うときのやつ。
一つのファイルに対し、git上にポインターファイル、外部ストレージ上に実体、と分離する。
このシステム上、gitのポインターファイルはlfsであると認識させる必要がある。

## .gitignoreが反映されない
キャッシュが残ってる。
`git rm -r --cached [ファイル名]`でキャッシュを削除すればいい。`.`で全指定しても問題ない。
大量のコミットを要求されるが、コミットログは.gitignoreを反映した部分しか残らない。

[.gitignoreに記載したのに反映されない件 - Qiita](https://qiita.com/fuwamaki/items/3ed021163e50beab7154)

## https vs ssh
sshの利点はパスワードを入力せずに済むこと。
httpsの利点は手軽。こちらでもパスワードを入力しない方法はあるが、その場合credential helperを使わないとセキュリティリスクになる。そのためPCでないとhttpsはほぼ使えない。

[HTTPS vs SSH in git](https://ourtechroom.com/tech/https-vs-ssh-in-git/)
[termux ssh接続](<../../Info/termux ssh接続.md>)

## 文字化け
utf-8エンコードを指定する。
powershellなら`notepad $PROFILE`として以下。

[PowerShellでgit add -pを実行した際の日本語文字化け問題の解決策](https://zenn.dev/ijiwarunahello/articles/1b3d8272f07bf4)

bashなら`export LESSCHARSET=UTF-8`を.bashrcにでも書く。

https://www-creators.com/archives/78

## 特定ファイルの復元
`log`でファイルを見つけ、`restore`で戻す。コミットを忘れず。
中身が知りたいならgit showを使う。

[Gitで、特定のファイルを削除したコミットを見つけて復元する方法 · GitHub](https://gist.github.com/hyuki/dad2ddc040b2b5670bdfdbfda0329ac2)
[\[git\] 戻したい時よく使っているコマンドまとめ #Git - Qiita](https://qiita.com/rch1223/items/9377446c3d010d91399b)
[Gitで過去に削除したファイルを検索、復元させる方法](https://rcmdnk.com/blog/2017/10/01/computer-git/)
[commitしたファイルや変更箇所は"git show"で確認できる #Git - Qiita](https://qiita.com/shuhei_m/items/a80385d8d42df795a06b)


## You asked to pull from the remote 'github', but did not specify
a branch. Because this is not the default configured remote
for your current branch, you must specify a branch on the command line.

branchに設定されてるリモートブランチ(上流ブランチ、upstream branch)とpull対象が別だと怒られるやつ？

-u, もしくは--set-upstream origin/mainつけてpushすると上流ブランチがそっちに移る。
branchで直接いじる場合は-uか--set-upstream-to=origin/main。後者は=が必要。

[上流ブランチがなくてエラーになった時の対応方法 #Git - Qiita](https://qiita.com/ponsuke0531/items/410735b544795506fdc5)

## ローカルブランチを上流ブランチにしたい
git push -u . プッシュしたいローカルブランチ名

[Git で「追跡ブランチ」って言うのやめましょう #Git - Qiita](https://qiita.com/uasi/items/69368c17c79e99aaddbf)

## 蒸留ブランチに何が設定されているか知りたい
git branch -vv

## リモートブランチを削除する
git push -d origin branch_name

pushを使うことに注意。

また、削除前にpullしたリモートブランチがローカルに残る問題はfetchで解決する。

git fetch --prune
もしくは
git fetch -p

常にこれを実行したい場合は、設定でprune=trueを書き込む。

git config --global fetch.prune true


```
[fetch]
	prune = true
```


[Gitのリモートブランチを削除するまとめ #GitHub - Qiita](https://qiita.com/yuu_ta/items/519ea47ac2c1ded032d9)


## submodule消去
```sh
$ git submodule deinit -f 追加したサブモジュール
$ git rm -f 追加したサブモジュール
$ rm -rf .git/modules/追加したサブモジュール 
```
[\[git\] submoduleの削除、再追加について #Git - Qiita](https://qiita.com/k_yamashita/items/040c04f8798d2384806e)

git rmを忘れず。

## bareとmirror
どちらもベアリポジトリをとれる。
mirrorはgit remote update時にHEADを最新に追従してくれる。

[git clone時のmirrorとbareの違い | exMedia](https://www.exmedia.jp/blog/git-clone時のmirrorとbareの違い/)


## secretを含んだファイルをpushしちゃった
git filter-repoで削る。
履歴を弄ることになるのでバックアップを取る。
あとstashが消えるのでなんとかしとく。

まずは元で履歴からファイルを削除する。
```bash
git rm -r --cached PATH
git commit -a -m "message"
git push
```

次に新しくリポジトリをクローン。やらないとflesh clone云々でエラーが出る。
```bash
git clone URL
```

secretがあるとこを指定してfilter。
```bash
git filter-repo --invert-path --path PATH
```

`git filter-repo`を使用すると、リモートが削除される。
再度追加する。
```bash
git remote add URL
```

最後に履歴を弄った分を強制pushして終了。
```bash
git push origin --force --all
```

[リポジトリからの機微なデータの削除 - GitHub Docs](https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
[公開予定でないソースをリモートにプッシュ・プルリクエストしてしまった時の対処法](https://zenn.dev/protein/articles/commit-and-push-sources-delete-pull-requests)

[GitHub & BitBucket HTML Preview](https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html)
[docs/content/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository.md at main · github/docs · GitHub](https://github.com/github/docs/blob/main/content/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository.md)
[git filter-repoを使って過去のコミットの内容を書き換える | ikapblog](https://blog.ikappio.com/replace-past-committed-content-using-git-filter-repo/#toc4)

要するにめちゃくちゃ面倒（この後も個々のlocalやforkにはsecret残るので、それらの対処を行う）なので、最初から起きないようにするのが吉。

パブリックリポジトリならGitHub Secret scanning's push protectionというのが使えるので、ONにしておく。

[GitHub の Secret scanning’s push protection を試してみる](https://zenn.dev/kou_pg_0131/articles/gh-secret-scannings-push-protection)

## textとbinaryを分ける手法
先頭8000バイト以内に`NUL`があるかどうか。

[Gitはどうやってテキストファイルとバイナリファイルを自動識別しているのか？ #diff - Qiita](https://qiita.com/okuoku/items/a21bfa68570ca67817ac)