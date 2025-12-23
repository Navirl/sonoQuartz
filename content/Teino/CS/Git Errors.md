---
date: 2021-11-13 12:46:02
tags:
 - App/Git
 - Errors
---

ダメそうなら`git fsck`という正当性チェックコマンドがある。

## failed to insert entry : invalid object specified
Gitの方だけど、Unityにもかかわるので。
結論は**OneDriveのせい。** 安易にFreeUpSpaceを掛けた結果生じた。
内部のファイルはかなり細切れかつアクセス量も膨大なので、下手にFreeUpするとAddとかするたびに馬鹿みたいに時間がかかる羽目になる。

FreeUpするならGitフォルダは除外する。

## fatal: mmap failed: Invalid argument
**OneDriveのせい。** 他にも重いファイルがあったりするとこうなるそうだが、自分はOneDriveつけたら直った。

[git fatal: mmap failed: Invalid argument - Stack Overflow](https://stackoverflow.com/questions/60322637/git-fatal-mmap-failed-invalid-argument)
[【Git】fatal: mmap failed: Invalid argument エラーでステージングできないときの対処 – oki2a24](https://oki2a24.com/2016/06/30/resolve-git-fatal-mmap-failed-invalid-argument-error/)

## Uncaught (in promise) Error: bash: /dev/tty: No such device or address
error: failed to execute prompt script (exit code 1)
fatal: could not read Username for 'https://gitlab.com': No such file or directory

資格情報が無いよ、というエラー。obsidian君はいちいち資格情報を入力させてくれない。
ターミナルから`git config --global credential.helper manager-core`を実行すると、GCMに資格情報が保存されgitが使えるようになる。

## fatal: Need to specify how to reconcile divergent branches.
git2.27からpullのデフォルト挙動を決める必要が生まれたらしい。
普通に`git config`を弄って決めとく。

[オプションなし git pull でデフォルトの挙動が未設定だと警告が出る - Qiita](https://qiita.com/toranokopg/items/f6340a69a60238f7d328)
[このgit警告に対処する方法は？「分岐したブランチを調整する方法を指定せずにプルすることはお勧めしません」](https://qastack.jp/programming/62653114/how-to-deal-with-this-git-warning-pulling-without-specifying-how-to-reconcile)

## fatal: Not possible to fast-forward, aborting.
何らかの理由でffが拒否されてるエラー。
`git fetch`から`git pull --rebase`で直るらしいが、私の場合はなんかそのrebaseが詰まってたらしく、rebaseを強制終了して更新を全部abortすると直った。abortは普通に更新する必要のないファイルが更新してたのでやった。

## 「再解析ポイント バッファにあるタグは無効です」
gitファイル群にOnedriveの空き容量空けを実行し、再び保持しようとするといつまでたっても同期されないファイルが。

なんでもファイルのメタ情報がバグってるらしい。
chkdskに/rとドライブ指定をつけて実行。1時間半と出るが、実際はもっとかかるうえ、指定ドライブのファイルにアクセスできなくなるので注意。

[chkdsk | Microsoft Docs](https://docs.microsoft.com/ja-jp/windows-server/administration/windows-commands/chkdsk)
[Windows10：「OneDriveの同期が終了しない / ディレクトリを削除できない」場合の対処 - Qiita](https://qiita.com/SFITB/items/3c2a4f1fa47345d1ee30)

##  git config --global --add safe.directory
git2.35.2から入った、git使うときに変更を及ぼすディレクトリを指定してねというエラー。
なんでもgitconfigの`core.fsmonitor`という記述に**任意のコマンドを実行する脆弱性**があったらしく、それに対処するための措置らしい。
エラー通りにconfigに書き込めばいい。
[いきなりgitが使えなくなった - 2022（山崎はるかのメモ）](http://www.nda.co.jp/memo/git_safe_directory/)
[Git security vulnerability announced | The GitHub Blog](https://github.blog/2022-04-12-git-security-vulnerability-announced/)

[Git - git-config Documentation](https://git-scm.com/docs/git-config#Documentation/git-config.txt-safedirectory)
なお、`git config --global --add safe.directory *`と打ち込むと全てのディレクトリを指定できる。脆弱性より利便が勝る人のためのもの。
なぜか`git config --global --add safe.directory D:/unity/*`とか、ワイルドカード風に使おうとしても**使えない**ので注意。(git version 2.36.0.windows.1)