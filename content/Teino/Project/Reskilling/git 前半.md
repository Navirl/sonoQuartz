[Git](<../../Bar/App/Git.md>)

[Git研修【MIXI 23新卒技術研修】 - YouTube](https://www.youtube.com/watch?v=lWkO8bQ9pSo)

バージョン管理システム、VCS
履歴辿れる、容量抑える、改竄に強い

- スナップショット
    - 新しいファイルは「保存」
    - 変更ファイルは「変更部分を保存」
    - 変更がないファイルは「前のデータを参照」
        - そのまま都度保存ではない
        - 前のデータは効率的に圧縮される
- [Gitの「スナップショット」とは？ 容量の心配は必要ないの？ #Git - Qiita](https://qiita.com/yamazaki_25/items/9d6c3971be9f3bbd9c67)

時系列とブランチでバージョン管理できる
別時系列がbranch、合わせるのがmerge

git config --global init.defaultBranch でinit時に作られるbranchを変更できる
masterからmainにしたりとか

git merge-base branch1 branch2 で分岐コミットを調べられる

git log hash branch filenameでどんな修正を加えたかを調べられる

## rebaseとmerge

### ブランチ分岐変更

以下ブランチをmainとdevelopとし、mainにdevelopをmergeするとする

fast-forward mergeはコンフリクトを起こさないmerge
merge元のコミットがHEADの時、fast-forwardになる
mergeというか、diffも何もなく先っちょにくっつけるだけ

rebaseはdevelopのbaseをHEADに書き換え、強制的にfast-forward mergeを行う
コンフリクトをremoteではなく手元で起こせるため、簡単に修正できる
特にgithubのpublicリポジトリとかでやりたくなる

しかし、手元でコンフリさせるならmainをdevelopにマージすればいい
rebaseの利点はcommitsにマージコミットが混ざらないことだが、強制pushが必要になってしまう
なのでmergeが主流

### レビュー待ちブランチからブランチを切った時
レビュー待ちブランチ（branch1）からブランチ切る（branch2）
レビューが終わりbranch1をmainにマージ
すると既にマージ済みのコミットがPRのコミットに出てきてしまう（レビュー済みの情報が出るためレビュー面倒）

そういう時はrebase
マージ済みのmainのコミットをbaseにすることにより、コミットを自分の分だけにする

### コミット履歴の修正
- 並べ替え
- 合体（squash）
- メッセージ変更
- 過去のコミットを修正

全部`-i`でできる
終わったら`--continue`で確定する

`-i HEAD~3`とするとHEADから3つを扱える
その後何をするかはエディター上で決める（pick、squash、dropなど）

## 強制Push
pushはファイルへの追加などしか許されない
rebaseは履歴が書き換わるため、強制pushで書き換える必要がある

強制pushで有名なのは`git push -F`だが、これはローカル状態をリモートに完全上書きする。
ここでremote上に他の人が既にpushしたコミットがあった場合でも**それを消す**危険なコマンド。

なので代わりに`git push --force-with-lease --force-if-includes`を使う。

[Git - git-push Documentation](https://git-scm.com/docs/git-push)

`--force-with-lease`は、リベース済みを明示できる。
リモートが更新されていない→refがコミットを指している時のみpushできる。
ロックではなくリースする（借りる）という意味。

`--force-if-includes`は、リモートの先端がローカルに統合されている→ローカルの`reflog`からリモート先端に到達できる場合→リモートの更新が全てローカルに含まれる時にpush。


## bisect
こっからここまでのどこかのコミットでバグったが、どれか分からない。
というときに二分木探索で手動で調べられる。
テストスクリプトを組んで一緒に使うのが早い。

## resetとrevert
resetはコミットを消す、つまり履歴に関わるため強制pushが必要。
revertは逆のコミットを付けるので問題なくpushできる。

## log
`--graph`で綺麗に出せる。
`--oneline`だと変更部分だけになる？

## stash
変更の一時退避。
`stash list`で一覧。
`stash apply 番号`で復元。
`stash pop`で復元しつつ削除。

実質コミットみたいなものなので`stash@{n}`で参照できる。

## -
一つ前に**いた**ブランチ。
`git checkout - `で戻ったり、
`git merge -`で一つ前を現在にマージしたりできる。

## 分散型
「リポジトリの全履歴を含めた完全なコピーがローカルにある」という意味。

集中型は全部サーバーにあるため、ローカル編集中はファイルがロックされる。
分散型は誰がどんな修正をしていても編集できる。


## ブランチ運用
自由度が高いせいですぐごちゃつく
なのでいくつかやり方がある

### Git Flow
リモート**リポジトリ**は一個というやり方。
remoteに複数を設定しない。

forkしたリポジトリの元の追従とかでたまに複数になる。

### main, develop

mainブランチはリリース用（ユーザー用）にし、変更時はタグをつける。
普段の変更は全部developに投げるやり方。

### feature

develop内で一つの機能の編集ごとにfeatureブランチを作る。
これは複数できて当然。終わったらdevelopにmerge。

一つの機能で分けないと
- 機能ごとのデバッグが出来ない
- 差分が大きくなりコンフリしがち
- 機能ごとのrevertも難しい

場合によってはfeatureから機能をさらに切り出し別のfeatureへ、ということも。
その時はworkという名前にMixiはしている。

他、概念実証もここ

### release(staging)
リリースの**準備**をするところ。
チームによってはstagingという名前も。

bugfix、version表記やタイムスタンプ更新、アプリの審査など
**最終確認**
大体自動化されるところ

新機能を追加しては**いけない**。

### hotfix
本番環境のバグのうち、**緊急性の高いもの**を修正するためのブランチ。
develop以外で唯一mainから切られる。

完了したらdevelopか、直でmainか、場合によってはreleaseに送られる。

developがreleaseを挟む都合上、遅くなるためこのブランチが切られる。
でも普通releaseは自動化されるのでこのブランチが出ることは少ない。


Github Flow、トランクベース開発

## GitHub
リポジトリホスティングサービス。

### Issue
気になったことをマークダウンで書き留める。
相談程度でもよく使われる。
問題解決はProjectでもできるので。

ラベルで分類、マイルストーンで期限、assignなど。

### Pull Request
作業を取り込んでほしいときのやつ
元はfork元のリポジトリに頼むものなので、Merge Requestではない。（GitHub以外だとMerge Requestと呼ぶことも）

駄目だったら指摘する（レビュー）

- プルリクは細かく
    - 巨大だと時間がかかり、他のPRが増えコンフリする
- 大きくなりがちなら、途中レビュー
    - さらにfeatureを切る、WIPつける、draft PR出すなど
- コミットログはキレイに
    - こまめにコミット、出来れば最後に`git rebase -i`で整え
    - 厳しい時はfast-forwardできないと却下される

>[! attention]
>- できるだけCIに任す
>    - テストは書く、フォーマットでスペース差分を減らす
> - 仕様の穴、セキュリティ、法などにまず注力
>     - 次に負債、設計、計算量・レイテンシを見る
> - ついでに自分のPRもレビューしろ
> - レビューは5W1H、どこがどういう理由でよくないかを書く
>     - 合わせて、どういう方法ならいいかを書くと議論しやすい
>     - あるなら定量的な指標を活用する
> - テキストはきつくなりがちなので、絵文字とかで1.5倍優しく
>     - HRT（謙虚・尊敬・信頼）の原則
>     - Humility, Respect, Trust
>     - Googleのやつ
>     - [謙虚・尊敬・信頼の「HRTの原則」｜Googleに学ぶ良いチームの作り方 - 俺の遺言を聴いてほしい](https://oreno-yuigon.hatenablog.com/entry/2018/02/04/182941)


## Actions
CI/CD
.githubにyaml置く

## Projects
kanban型タスク管理
機能が少ないので、ZenHubで機能追加して使うといいらしい

## Wiki
wiki
機能が貧弱、docbaseでよくない

## Security
- Security Policy
- Security Advisories
- Dependabot

この三つの機能の編集
主にOSS用
Dependabotくらいしか実際は使わない

### Security Policy
脆弱性報告の手順。マークダウンで書いとく。
### Security Advisories
非公開Issue的な。主に脆弱性について議論を交わす。
対応パッチリリース後に公開できる。
### Dependabot
コードからの依存パッケージバージョン解析。
脆弱性があればアラートを飛ばす。


## Insights
リポジトリの活発具合について
自分のリポジトリだと使わない
新しいライブラリとかのメンテ頻度を調べられる

## Settings
設定
Branch Protection rulesでbranchについてpush規定などの設定が出来る。
branchは正規表現で指定可能。

前に書いたmainやdevelopのルールを書いておく。

[git 後半](<./git 後半.md>)


