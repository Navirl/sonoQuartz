---
date: 2025-11-14
time: 00:08
tags:
 - Info
---

up:: [The_gaming](../Project/programs/The_gaming.md)


## 選定

じゃあ何使うのって、ほぼ[Godot](<../../Bar/GUI/Godot.md>)しかない。まずエディタがクソ重いUEは除外。Unityは悪くないが前使ったので。Godotはスクリプト言語が使えて簡単。3Dももちろん使えるので後でVR移行も可能。エディタとしての成熟もよし。OSS。

BevyとFyroxは成熟してない。スクリプトも使えない。（一応そういう拡張はあるっぽい）
[bevy\_scriptum — Rust game dev // Lib.rs](https://lib.rs/crates/bevy_scriptum)
[GitHub - makspll/bevy\_mod\_scripting: Bevy Scripting Plugin](https://github.com/makspll/bevy_mod_scripting)
EbitenとGamemakerは2D限定。


……きっちりゲームエンジンに落とす必要があるのかというところだが。
やっぱりコアをRustで作ってGodotにAPI公開がよさそう。

## 課題
あるにはあるけど、実際解決するのはぶち当たってからでいいんじゃないかな……

### タスク管理
GitHub Projectsで充分。
困ってからAsanaとかClickupとかNotionとかJiraとかTaigaを持ち出せば良し。


### 外部起動
いきなり否定するようだが、いちいちGodotを点けるのは重い。
なので各ソフト自体は外部からでも起動できるようにする。まあ基本。

APIを作りこむことになる。それもうコアはゲームエンジンですらないほうがいいな。ただのAPIサーバーを作るとこからだ。

### ブラウザ
触ってるものがたいていローカルサーバ立てるソフトばっか（ブラウザで何でも動かそうって気運なので当然）である以上、どうにかしてブラウザをゲーム内から使用できるようにしたいところ。

[Felo - 無料のAI検索エンジン](https://felo.ai/search/mMTkroxQMt8b6hwGKChD2m)

訊いてみたら

- Chromium Embedded Framework、CEFを使う
- HTML5エクスポートして、iframeで表示
- ブラウザをテクスチャ化して貼り付け
- 外部ブラウザを開くコマンドを実行

なんかがあるらしい。CEFは重くなるので遠慮したい。
実際に統合するとこんなんになって850MBとか取る。あとAndroidとiOSがサポートされてないとか。
[GitHub - face-hh/wattesigma](https://github.com/face-hh/wattesigma)
[GitHub - raphipod/GDCef: Chromium Embedded Framework as Godot GDNative](https://github.com/raphipod/GDCef?tab=readme-ov-file)
[GDCEF Godot4 - Godot Asset Library](https://godotengine.org/asset-library/asset/2508)

htmlをwryで表示するやつ
外部urlではない
https://github.com/doceazedo/godot_wry




### 分離ビルド
全てを取り込むと当然激烈重くなるので、適切に分離してビルドしたい。
DLC機能とか調べたらいけそう？

## 言語
kotlinはjvmで動き、llvmでネイティブコードコンパイルによるマルチプラットフォームも可能。とはいえサポートはモバイル優先ぽいが。
https://developer.android.com/kotlin/multiplatform?hl=ja
静的型付けで高パフォーマンス。
一応godotのサポートもある。
https://godot-kotl.in/en/stable/

rustはコンパイラの安全性が高い。エラーが起きたら直しやすい。必要になれば低レベルも可能。高パフォーマンス。マルチプラットフォームはtauriで。
goは並列処理に強くシンプルらしい。高パフォーマンス。マルチプラットフォームは分散状況っぽい。
https://zenn.dev/nobonobo/articles/6cc4c510988e82

どれにしろバインディングを挟むので、どうも結構速度が落ちるっぽい。
gdscriptが前提でこれらは頻繁な高負荷処理。なので高パフォーマンスな言語しかここは対応してない。コミュニティで対応明言があり有名なのはgoとrustとswiftだけ。
https://docs.godotengine.org/en/stable/tutorials/scripting/gdextension/what_is_gdextension.html#doc-what-is-gdnative-third-party-bindings

正直場合によって最適な言語を使い分けるのが一番早い気もする。
UIにjs使う感覚。あとフレームワークでも結構変わる。
それより何を作るかだから……

## データ
人間的に、動くシステムを作るより情報を残すだけのデータを作るほうが作りやすい。プログラミングもデータでシステムが読み込んでるだけだし。
となるとデータドリブンが必然だと思う。体系化されてないデータへAPIでアクセスする。

[DDDとクリーンアーキテクチャをはじめよう-Rust編](https://zenn.dev/poporo/articles/20251011_1_start_ddd_and_clean_architecture_rust)

DDDはドメインの話であり、そもそもソフトウェアで解決するべき範囲を定めるという工程があることに注意。

[ふわっと理解するDDD \~ドメイン駆動設計\~ - Qiita](https://qiita.com/yu-saito-ceres/items/f73262cedcdd6e8e75c8)

[USDM](<../../Info/USDM.md>)もそうだが、ソフトウェアで変更する範囲をしっかり定めないと作れない。
テストとか、評価とか、報酬とかを動くことそのもので与える。