---
tags:
 - Info
---

daily:: [2023-03-06](/Daily_Note/2023-03-06.md)
up:: [Obsidian](<../Bar/App/Obsidian.md>)

## Obsidian Win、iOS、Androidで同期
Win、iOS、Androidの三機種間同期。なにもかもObsidian Gitがモバイルで動作しないのが悪い。
iOSはiPad、AndroidはMi Lite 11 5G。
AndroidはMGitかTermuxを使えばいいので、主にiOSのため。

### Obsidian Sync
有料。月10＄、年96＄。
アカウントのアドオンとして提供されており、上位アカウントであるCatalystとは別物。
[Pricing - Obsidian](https://obsidian.md/pricing)

### iCloud
iOSのOSync以外での唯一の公式同期法。
同期までは簡単だが、肝心のiCloudのガードが固すぎて何処からもデータを取り出せない。せめてgitとつながってくれないとどうしようもないんですが……
iOSで使うのに合わせて事前にAndroidからiCloud同期をかける方法も考えたが、怪しいクライアントしかない。
それに携帯に依存するのもあれだしFolderSyncアプリが使えないので同期のコンフリクトとかめんどくさい。だから結局gitになる。

### Dropbox
Dropboxだけでなく、いろんなクラウドにも同時につなげられるプラグイン。
[GitHub - remotely-save/remotely-save](https://github.com/remotely-save/remotely-save)

Dropboxにスナップショットを作るプラグイン。
[GitHub - ryanpcmcquen/obsidian-dropbox-backups: Automated backups to Dropbox for Obsidian.](https://github.com/ryanpcmcquen/obsidian-dropbox-backups)

システム上、同時に編集すると片方の編集だけ反映される。

### Syncthing
P2Pによるファイル共有。
iOSには公式のクライアントが無く、Mobius Syncというアプリを使うことになる。
これは20MBまで無料で、それ以降は買い切りで610円かかる。

### Resilio
P2P。
iOSの場合、ファイル共有の先はSyncフォルダ限定。
外部フォルダを共有することは出来ないので、SyncFoldersなどに頼ることになる。

#### SyncFolders
ローカルファイル同期アプリ。
超マイナー。
[Workflow to Sync Dropbox Files to a Local iOS Vault - #10 by trijste - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/workflow-to-sync-dropbox-files-to-a-local-ios-vault/26466/10)

### a-shell
iOSのシェルアプリ。
Pythonがメインで動いてるらしく、パッケージマネージャはpipがメイン。
あくまでシェルのエミュらしく、gitではなくgitのCラッパーであるlibgit2が動いている。（コマンドもlg2）そのせいか、**資格情報の保存挙動がなんか怪しい**。`lg2 config --global`は機能せず、vimで直接編集する必要がある。**のに碌にglobalを読んでくれない**。localに置いたらある程度反応するらしく、storeにしてnameとe-mailを置くとパスワードの入力だけで済んだ。manager-core？　動きません。もうSSHでいいんじゃないかな。
iOS標準の**ショートカットアプリが使える**。これを採用する一番の理由。
pickFolderと打つことでファイルアプリを開き、**外部のファイルを弄れる。**
submoduleに** --recursiveオプションがない。**
ホームディレクトリは`~/Documents`。File上から見るとa-shellフォルダーの中。
[GitHub - holzschu/a-shell: A terminal for iOS, with multiple windows](https://github.com/holzschu/a-shell)
[Mobile Sync with git on iOS for free using iSH - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/mobile-sync-with-git-on-ios-for-free-using-ish/20861)

### ish
iOSのシェルアプリ。
alpine linuxを起動しているため、6MB弱しかない。パッケージマネージャはapk。gitがそのまま使える。
外部ファイルは`mount -t ios . 空フォルダ`として入ってるフォルダをマウントする必要がある。
[GitHub - ish-app/ish: Linux shell for iOS](https://github.com/ish-app/ish/)
[Mounting other file providers · ish-app/ish Wiki · GitHub](https://github.com/ish-app/ish/wiki/Mounting-other-file-providers)

### blink
iOSのシェルアプリ。というかssh接続用ターミナル。
git使えない。moshというsshの進化版が使えるが、だから何。
[All About Mosh – Blink Shell](https://docs.blink.sh/advanced/advanced-mosh)

### Working Copy
iOSのGitクライアント。見やすいしコンフリクトのResolve機能もあるし、iOSでGitを使うなら必須。
外部ファイルをexternal directoryとしてリンクする機能があるため、SyncFoldersも不要。じゃあ最初にcloneしたときどうすんだって思うが、ファイルアプリでフォルダ移動すればいいんじゃないかな。
pullは無料だがpushは有料。$19.99。
GitHubのEducation Planが続く限りはpushも無料。
[Working Copy, Git on iOS](https://workingcopy.app)

### 結局どうすんの
Git。Educationの間はWorking Copyを使い、切れたら買い直すまではa-shell+ssh接続に移行する。

[GitLabにSSHで接続するまでの手順 - Qiita](https://qiita.com/kyamawaki/items/07fb3332cf3c2f47728a)
[Site Unreachable](https://cwoodall.com/posts/2022-01-02-obsidian-ios-sync/)


2022/10/07
……と思っていたのだが、そもそもlg2はバージョン管理に不適であるというissue。
[Mention `lg2` in `help` · Issue #328 · holzschu/a-shell · GitHub](https://github.com/holzschu/a-shell/issues/328)
さらには実際に試すと[libgit](<./libgitバグ.md>)でエラーが出まくったりでどうしようもない。

ならばとishで本家Gitを使うも、そもそもish自体が重いのか文字が重なったり、3分経ってもpushの結果が一文字も出なかったりして動作が不安定。せめてpushが通れば残りはPlomogitで何とかなりそうなのにな。PlomogitはiOSのオープンソースGitクライアント。同じくlibgitが使われているらしくa-shellがだめならこれもダメ。4年くらい前に更新が止まっている。

結局PolygitとObsidian-gitでしのいでいる。気づいたらObsidian-git使えるようになってた。
Obsidian-gitはisomorphic-gitというjavascript実装を使っている。

まあそこまでやってもiOSのObsidianは重すぎるのかキーボード入力が良く引っかかる。なのでBearで入力とファイル出力してObsidianはもっぱら閲覧用。

