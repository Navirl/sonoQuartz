---
tags:
 - Info
---

daily:: [2023-04-01](/Daily_Note/2023-04-01.md)
up:: [Obsidian](<../Bar/App/Obsidian.md>)

## mdbook
Rust製Gitbook風。
Summary.mdにリンク書いたファイルしか開けない。その特性上、順序のあるものを文書化するときは有用。

[Introduction - mdBook Documentation](https://rust-lang.github.io/mdBook/index.html)


## Quartz
Obsidianノートを形保ってサイトに変換してくれるHugoテーマ。
使用する際はこのリポジトリのフォークを作ることになる。最新版に更新する手間を考えると当然だが。
[GitHub - jackyzha0/quartz: 🌱 host your own second brain and digital garden for free](https://github.com/jackyzha0/quartz)

## obsidian-zola
Obsidianノートをサイト化するzolaテーマ。zolaはhugoなどと同じSSG。Rust製なのでアホ早い。
リポジトリのnetlify.toml.exampleをコピーしてnetlify.tomlにし、いつも使ってるobsidianのgitリポジトリに一緒にプッシュ。あとはNetlifyでリポジトリを指定して開くだけで完成する。
仕組み上、Netlify以外では使えない。

内部ではこのzolaのリポジトリのrun.shを実行するようになっている。

netlify.tomlのランディングページは大文字小文字は全て小文字にして記述するとヒットしやすい。
SLUGIFYなしの場合。

.gitignoreをpushしちゃうとallowlistの書き方が効かなくなる。
.gitignoreはローカルだけに置いておくこと。

[.gitignoreでフォルダに対してホワイトリストで管理する方法。特定階層以降を許可 - Qiita](https://qiita.com/officemove/items/b0409cb1ee946edadc3e)

代わりにブランチを分け、公開したいファイルだけ`git checkout branch -- filename`で現在のブランチに持ってくる。ちなみにディレクトリも可能。そして`git pull origin main`。使う前に`git show branch:filename`で確認。

[Git 1ファイルだけ別のブランチから持ってくる - Qiita](https://qiita.com/oret/items/b646fcada9d89ed308c4)

[GitHub - ppeetteerrs/obsidian-zola: A no-brainer solution to turning your Obsidian PKM into a Zola site.](https://github.com/ppeetteerrs/obsidian-zola)


### Cloudflare Pagesで使う
それでも使いたいので。
CloudflareではZolaが標準では使えず、環境変数に設定する必要があることに注意。ついでに0.14.0までしか使えない。

[Build configuration · Cloudflare Pages docs](https://developers.cloudflare.com/pages/platform/build-configuration)
[Cloudflare Pages を Zola で使ってみた感想 - 僕は一寸](https://misoni.me/blog/trying-cloudflare-pages/)

Cloudflareでは静的ページ以上のこと(コメントとか)やりたいなら、Workerという別サービスと連携する必要がある。
これは無料枠が無い。

netlify.tomlに当たるものが無く、設定をファイルにして使いまわせない。更新があったら都度手動で修正する必要がある。

[Cloudflare Pages・Vercel ・Netlify の違いや使い分けをまとめる](https://zenn.dev/catnose99/scraps/6780379210136f)