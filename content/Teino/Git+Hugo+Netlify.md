---
date: 2021-10-17 09:24:16
tags:
 - Learning
---

## 流れ
[Hugoでサイトを作る](#Hugoでサイトを作る)
[テーマをインストールする](#テーマをインストールする) 
[一回サーバー建てて確認](#一回サーバー建てて確認)
[Gitリポジトリにプッシュ](#Gitリポジトリにプッシュ)
[Netlifyに登録する](#Netlifyに登録する)
[Previewを確認](#Previewを確認)
[ドメインを設定](#ドメインを設定)
[DNSを設定](#DNSを設定)
完成

### Hugoでサイトを作る
[index 1](Fesig/content/posts/test/index%201.md)
[HugoとNetlifyで、簡単に自分のブログを公開してみよう！｜株式会社しずおかオンライン](https://www.esz.co.jp/blog/181.html)


#### Hugoのフォルダ構造
[Hugo's Directory Structure Explained](https://www.jakewiesler.com/blog/hugo-directory-structure)

#### PaperMod
[Installation · adityatelange/hugo-PaperMod Wiki](https://github.com/adityatelange/hugo-PaperMod/wiki/Installation)
この通りにやればindex.mdは表示できるのだが、それ以外のmdファイルのリスト表示ができない。

表示するにはconfig.ymlをいじる必要がある。
[FAQs · adityatelange/hugo-PaperMod Wiki](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#add-menu-to-site)

デフォルトだと一番上に最近更新されたページが出てくる。
変えたいならHome-Info Modeに。
[Features · adityatelange/hugo-PaperMod Wiki](https://github.com/adityatelange/hugo-PaperMod/wiki/Features#regular-mode-default-mode)

### テーマをインストールする
### 一回サーバー建てて確認
### Gitリポジトリにプッシュ 
### Netlifyに登録する
[Host on Netlify \| Hugo](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/)
### Previewを確認
### ドメインを設定
[freenomで無料ドメインを取得する｜ふじい｜note](https://note.com/dafujii/n/n406f385651e2)
freenom使用。簡単に取れるが、なぜか取得時に.tkなどTLDまで打たないと取れない。

今もそうかは知らないが、.tkは**連続90日で25回の訪問がなかったサイトを自動的に使用停止する。** また、使用停止したドメインは広告ページに置き換わり、再取得には料金が必要になる。他のTLD使ったほうがよさそう。
[.tk - Wikipedia](https://ja.wikipedia.org/wiki/.tk)
### DNSを設定
ドメインのDNSと、NetlifyのDNSの二種類がある。
NetlifyのDNSのほうが高機能なのでそちらを使う。
[Netlifyで独自ドメインを設定する](https://www.ravness.com/posts/netlifydomain)

やりかたはカスタムDNSを選んでNetlify側から提示されるDNSサーバーを入力するだけ。

### EX テーマファイルいじり



[テーマ Pagermod のカスタマイズ · k-kaz](https://k-kaz-git.github.io/post/hugo-custom-theme-pagermod/)