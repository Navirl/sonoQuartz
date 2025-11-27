---
date: 2021-07-17
tags:
  - Bar
---

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

`git log -- file`
`git restore --source=commitID^ -- file`

[Gitで、特定のファイルを削除したコミットを見つけて復元する方法 · GitHub](https://gist.github.com/hyuki/dad2ddc040b2b5670bdfdbfda0329ac2)
[\[git\] 戻したい時よく使っているコマンドまとめ Git - Qiita](https://qiita.com/rch1223/items/9377446c3d010d91399b)
[Gitで過去に削除したファイルを検索、復元させる方法](https://rcmdnk.com/blog/2017/10/01/computer-git/)
[commitしたファイルや変更箇所は"git show"で確認できる Git - Qiita](https://qiita.com/shuhei_m/items/a80385d8d42df795a06b)


## You asked to pull from the remote 'github', but did not specify
a branch. Because this is not the default configured remote
for your current branch, you must specify a branch on the command line.

branchに設定されてるリモートブランチ(上流ブランチ、upstream branch)とpull対象が別だと怒られるやつ？

-u, もしくは--set-upstream origin/mainつけてpushすると上流ブランチがそっちに移る。
branchで直接いじる場合は-uか--set-upstream-to=origin/main。後者は=が必要。

[上流ブランチがなくてエラーになった時の対応方法 Git - Qiita](https://qiita.com/ponsuke0531/items/410735b544795506fdc5)

## ローカルブランチを上流ブランチにしたい
git push -u . プッシュしたいローカルブランチ名

[Git で「追跡ブランチ」って言うのやめましょう Git - Qiita](https://qiita.com/uasi/items/69368c17c79e99aaddbf)

## 上流ブランチに何が設定されているか知りたい
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


[Gitのリモートブランチを削除するまとめ GitHub - Qiita](https://qiita.com/yuu_ta/items/519ea47ac2c1ded032d9)


## submodule消去
```sh
$ git submodule deinit -f 追加したサブモジュール
$ git rm -f 追加したサブモジュール
$ rm -rf .git/modules/追加したサブモジュール 
```
[\[git\] submoduleの削除、再追加について Git - Qiita](https://qiita.com/k_yamashita/items/040c04f8798d2384806e)

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

[Gitはどうやってテキストファイルとバイナリファイルを自動識別しているのか？ diff - Qiita](https://qiita.com/okuoku/items/a21bfa68570ca67817ac)


## 取り消し
add前なら`git checkout -- .`
個別にやるなら`git checkout ファイル名orディレクトリ名`
add後なら`git reset`
個別なら`git reset ファイル名`
コミット後なら`git reset --soft HEAD^`

[Gitの変更を取り消すには( git statusした時の modifiedの取り消し方やコミットの取り消し方など)](https://zenn.dev/norihashimo/articles/8afc81ff48451c)


## 過去ファイルを検索して引っ張ってくる
`git grep "Post" $(git log --pretty=format:%H -- ./src/CanvasNodesView.ts)`

`git log -p -- file`で対象の変更履歴を全部見られる。

`git checkout (hash)`

## does not have a commit checked out
他でも起きるがsubmoduleで起きた。

```
git rm submoduleFolder
git submodule add submoduleURL
```

これでsubmoduleを追加しなおしただけ。
他に色々突っかかってたが、vscodeで一個ずつ削った。

[git submodule がコンフリクトしたときの対処法 単に自分が古い場合編 - @kyanny's blog](https://blog.kyanny.me/entry/2016/07/05/232126#gsc.tab=0)
[Submodule 同士でコンフリクリしたときの解決方法 - git \| nju33](https://nju33.com/notes/git/articles/Submodule%20同士でコンフリクリしたときの解決方法#問題の%20Submodule%20を削除する)

## termuxで使う

termuxは/storage/emulated/0だと色々リンクとかで引っかかり倒す。
なので本体をhome直下に置きgit worktreeで読み取れる位置にセットするやり方。

gitコマンドはworktreeでセットしたところで使える。
ただ`/storage/emulated/0`ではなく`~/storage/shared/`から使う。


[\[Feature\]: Make git usage on /storage/emulated/0 possible. · Issue #3777 · termux/termux-app](https://github.com/termux/termux-app/issues/3777)
[Git Worktreeをわかりやすく解説](https://zenn.dev/hiraoku/articles/56f4f9ffc6d186)
[徹底解説：git worktree の使い方 # Git - Qiita](https://qiita.com/syukan3/items/dab71e88ce91bca44432)

でもgitui経由でlibgit使ったほうが安定するし……
ちなみにlazygitは動かなかった。
## git submodule update --init --remote
updateは親で記録しているコミットに子を更新。
--initは親clone時に空になっているsubmoduleの本体ファイルを親記録コミットを元にclone。
--remoteは親記録コミットを更新。

[git submodule update \[--init\|--remote\] を勉強し直す # Git - Qiita](https://qiita.com/o-s-w/items/a214b9bf7b8504058118)

## repository path is not owned by current user
safedirectoryに追加。

`git config --global --add safe.directory /storage/emulated/0/Documents/Niztra/sonolart/.obsidian
/plugins/obsidian-wom



## Conventional Commits
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
コミットメッセージに規範を導入する試み。

基本的に`fix:`か`feat:`を前に付け、その後にコミットメッセージを続ける。fixがパッチバージョンでfeatがマイナーバージョン。
破壊的変更が入る場合は`fix!:`などとする。

## stash
`git stash`だけで動く。取り出すときは`git stash pop`。
[【Git】stashコマンドのまとめと使い方 〜変更差分の一時退避〜 # 初心者 - Qiita](https://qiita.com/nakaji0210/items/330f6dcb361da074c2c0)

## github-flowを使用する時
開発ブランチと本番ブランチのデプロイは、本番ブランチにいろんな機能が組み合わさっていく以上別物。開発ブランチのデプロイだけで全部分からない。

そこで本番ブランチのうち、タグを打ったコミットだけをデプロイする。
簡単だが確認フェイズを入れることで本番ブランチデプロイの品質を担保する。

[タグ付けデプロイの思想的裏付け - Qiita](https://qiita.com/niisan-tokyo/items/22500c8b7a3cb44331ee)

## コミットメッセージで検索、ハッシュから過去ファイル確認
`git log --grep name --oneline`でハッシュを手に入れ、
`git show hash:file`で確認できる。fileは相対パス不可。

## no submodule mapping found
submoduleでもないのにgit cloneを入れ子にし、.gitを削除してcommitすると発生。
submoduleみたいなことしたのにそれを証明する.gitmodulesもなく.git/configも無いのでパニック。

submodule扱いされてるフォルダをキャッシュから消してコミットし直せばOK。
pwshにgrepは無いのでslsを使用する。

```sh
# ファイルパーミッションにSubmoduleになっているものを探す
$ git ls-files --stage | grep 160000
160000 58e597f4bb5d3f15680a25814bfee5041027b7c9 0	hadoop

# 一旦ｒｍする
$ git rm --cached hadoop
rm 'hadoop'


$ git status

# 追加戻し
$ git add .
$ git commit --amend


```

[「no submodule mapping found in .gitmodules」解決の一例です - Qiita](https://qiita.com/liubin/items/6450dba5f63de7ff5675)

## lfsで過去改変
lfsは過去を改変し、対象ファイルを最初からlfsであったようにすることが出来る。
gitの都合上過去を変えないとlfsによる軽量化の恩恵が新規追加ファイルにしかかからない。

`git lfs migrate --include="*.png" --everything`
--includeは`git lfs track "*.png"などとして.gitattributeに追加する手間を省く。
--everythingは全てのブランチに対して行う。

## LFS objects are missing. Ensure LFS is properly set up or try a manual "git lfs push --all".
workflowで起きた、lfs無いよ問題。
よく考えればlfsを設定してないとポインタファイルしかcloneできないわけで。それをgitlabに流そうとしてもlfsはストレージに無いよと言われて当然な気がする。

なので
```
    - run: |
        git lfs install
```
をgitlab同期前に入れて解決。