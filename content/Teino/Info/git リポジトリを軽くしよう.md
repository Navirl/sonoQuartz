---
date: 2022-10-17
tags:
 - Info
---

up:: [Git](<../Bar/CLI/Git.md>)
source:: [パーシャルクローンとシャロークローンを活用しよう - GitHubブログ](https://github.blog/jp/2021-01-13-get-up-to-speed-with-partial-clone-and-shallow-clone/)
source:: [巨大なリポジトリをクローンするときに便利なパーシャルクローンとsparse-checkout - Vがいる日々](https://vlike-vlife.netlify.app/posts/git_partial_clone)
source:: [Git - git-clone Documentation](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt)

全部オブジェクト。全部イミュータブル。

blobは実ファイル。zlibで可逆圧縮されている。
treeはディレクトリ。「ファイル名」と「blobもしくはtreeオブジェクトへの参照」を持つ。
commitはトップtreeへの参照、コミットユーザ、タイムスタンプ、コミットメッセージ、親コミットへの参照(なければinitial、2つあればmerge)を持つ。

refsはcommitのポインタ。branch,HEAD,tagの三種ある。
tagは軽量タグとアノテーションタグの二種ある。
軽量タグはCommitへのリファレンスを持つ。アノテーションタグは追加情報と軽量タグへのリファレンスを持つ。

git addの時点でblobオブジェクトが作成される。
git commitを行うことでtreeとcommitオブジェクトが作成される。
treeの参照はaddで変わったblob(もしくはtree)のみ書き換わる。

git fetchはリモートリポジトリの状態がローカルに反映される。
ただしローカルのbranch,HEADなどのリファレンスは動かない。

git merge --ffはbranchが移動する。
commitオブジェクトは作られない。

git merge。リモートの変更をローカルにマージすると考える。
ローカルのcommitオブジェクトはイミュータブル、変更不可。出来るのはgitオブジェクトの追加、もしくはリファレンスの移動。
なので一度merge commitで両方の編集を合体させる。

git rebase。どちらも変更済みの状態でmerge commitを作ると履歴が追いづらくなる。
ここで片方をもう片方の後ろにあったことにする、作成するのがrebase。

[たぶんもう怖くないGit \~Git内部の仕組み\~ Git - Qiita](https://qiita.com/marchin_1989/items/2ec01553e907f3a9e6bb)

## 一部歴史クローン

blobless clone, treeless clone, shallow cloneの三つがある。blobやtreeについてはここ。
source:: [コミットはスナップショットであり差分ではない - GitHubブログ](https://github.blog/jp/2021-01-06-commits-are-snapshots-not-diffs/)

gitでの操作が必要ならblobless。`git clone --filter=blob:none <url>`。歴史上の実ファイルをダウンロードしない。commitとtree、Headのblobのみ用意する。
履歴の参照だけでいいならtreeless。`git clone --filter=tree:0 <url>`。歴史上のディレクトリをダウンロードしない。commitのみ。ただしgit logなど履歴を参照するとtreeを取得する。
一回ビルドして捨てるならshallow。`git clone --depth=<N> <url>`。歴史をHEADから数えて`<N>`までしかダウンロードしない。gitコマンドが正しく動かなくなるので非推奨。

source:: [version control - How to delete a blob from a Git repo - Stack Overflow](https://stackoverflow.com/questions/7201720/how-to-delete-a-blob-from-a-git-repo)
source:: [git clone - Can you convert an existing git repository to be a "blobless" one? - Stack Overflow](https://stackoverflow.com/questions/68811902/can-you-convert-an-existing-git-repository-to-be-a-blobless-one)

既にあるローカルリポジトリをブロブレスにするならローカルクローンが早い。`file://`は必須。
`rm .git/objects/path/to/blob`はgitがupdateしたのか見つからない。

## clone時にmainを持ってこない

source:: [容量の大きいリポジトリを必要最低限の情報だけ clone する方法 - Qiita](https://qiita.com/kinpira/items/21c3a24f7a74b1056904)

最初のmainブランチが必要無いなら`--no-checkout`でcheckoutしないことができる。その後はちゃんと手動で目当てのブランチに`checkout`する。



後のcheckoutが面倒なら、`--single-branch --branch <branch>`でたぶん直接いける。`-b`でも指定可。


## 一部ディレクトリクローン

source:: [Git sparse-checkout を試してみる｜晴栄リコ@新人2年目VTuber｜note](https://note.com/haruelico/n/nedd794fd3d00)
source:: [Git - git-sparse-checkout Documentation](https://git-scm.com/docs/git-sparse-checkout)
source:: [モノリポ時代に知っておくと便利な「git sparse-checkout」 - kakakakakku blog](https://kakakakakku.hatenablog.com/entry/2020/06/04/104940)
source:: [sparse checkout でリポジトリの一部だけを持ってくる](https://leico.github.io/TechnicalNote/Git/sparse-checkout)

`sparse-checkout`コマンドを使う。アローリスト方式で一部ディレクトリだけクローンするコマンド。

まずは`git sparse-checkout init --cone`を使用し、リポジトリ直下のファイルだけにする。
その後`git sparse-checkout set <path>`を使い、クローンするリポジトリを指定する。

`set`は上書きになるため、後から他のディレクトリも追加したい場合は`add`を使う。2.38.1では技術的問題でパスを削除するコマンド（`remove`みたいな）が**存在しない**ので注意。
現在のパスを確認したいときは`list`。

パスは`.git/info/sparse-checkout`に保存されている。形式は.gitignoreと一緒。なので`!<path>`とすれば除外指定できる。

クローン時に`git clone --sparse --no-checkout url`とすると、すでに`git sparse-checkout init --cone`された状態でクローンするので早い。とはいえそのままではblobを持ってきてしまい完全cloneと変わらない早さになる。bloblessなどを使用。
`--no-checkout`を使用することでファイル取得を防いでいる。
その後は同じく`git sparse-checkout set <path>`、pull、checkout。


sparseを辞めたいときは`git sparse-checkout diasable`。

`init`は2.38.1時点だと消すかもという話が出ている。
実際消えたら代わりになるのは`reapply`？　直接`set --cone`でもいけそう？

`init`についてる`--cone`はコーンモードの意味。これはディレクトリ指定しか使えないモード。`--no-cone`とすればファイル指定もできるが、いろいろ問題が起きるらしく非推奨。.gitignoreはディナイリスト形式なのに対し、sparse-checkoutがアローリスト形式なのが問題らしい。


## その他

source:: [Git - git-gc Documentation](https://git-scm.com/docs/git-gc)
source:: [ブログズミ: git gc --aggressive するそのまえに](https://srz-zumix.blogspot.com/2019/03/git-gc-aggressive.html)

submoduleを使ってる場合はその参照で重くなってるかもしれない。

