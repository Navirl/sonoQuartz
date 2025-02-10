---
date: 2024-08-14
tags:
  - Bar
---

up:: [Rust](<../Program/Rust.md>)

Electronと同様、デスクトップアプリをブラウザ技術で作る。
ElectronはChromiumを搭載しているのに比べ、こちらはWebViewというOS固有のものを使用しているので小さい。あとバックエンドがRustなので早い。

wryというライブラリが各OSのWebViewへアクセスを提供している。

rustあるあるだが、強い型制約のため少しアップデートがしにくいことに注意。
代わりにgoを使った[wails](<./wails.md>)というのがある。
[(Go, Golang) Wails に入門する – Ewig Leere(Lab2)](https://labor.ewigleere.net/2024/06/16/getting-started-with-wails-golang/)

## Get Start
各パッケージマネージャやpowershellからプロジェクトを立ち上げられる。
[What is Tauri? \| Tauri](https://tauri.app/start/)

フロントエンドにElmはない。（2025/01/10）
Pureからで良ければいろいろ手はありそう。
[Site Unreachable](https://dev.to/jxxcarlson/making-an-elm-desktop-app-with-tauri-3n3)
[Elm + Tauriの感想 - yowanai.com](https://yowanai.com/blog/dzrmoexpo/)
[GitHub - elm-land/tauri: A template for using Elm Land to build desktop apps with Tauri!](https://github.com/elm-land/tauri)

Tauriは公式にSSRをサポートしていない。
[SvelteKit \| Tauri](https://v2.tauri.app/start/frontend/sveltekit/)

Rustフロントエンドという手もある。
[\[Rust + GUI\] icedからDioxusに改宗した話 #Rust - Qiita](https://qiita.com/Yosh31207/items/6cebdaa7ead8f6846d82)

Dioxusはjsx風の`rsx!`マクロで表記する。
なおDioxus自体はマルチプラットフォームアプリをRustだけで作るほぼTauriなプロジェクト。書き方だけTauriに持ってきてるっぽい。こちらは仮想DOM。

eguiはゲームと同じく毎フレーム画面更新するimmediate mode。
簡単だが重い。

Elmにインスパイアされたicedという別プロジェクトはある。
[\[Rust\] icedに入門したのでメモを残す #GUI - Qiita](https://qiita.com/Yosh31207/items/81632c6e2b54eb2f6f7c)
[\[Rust + GUI\] icedからDioxusに改宗した話 #Rust - Qiita](https://qiita.com/Yosh31207/items/6cebdaa7ead8f6846d82)

svelteを使用する場合はsveltekitが使用され、Viteビルド環境が整備される。
5.16のsvelteはroutes/+page.svelteがindex.html的なファイル。他の.svelteはファイルシステムベースでそれぞれのURLにルーティングされる？
[SvelteKit チュートリアル - 記事投稿サイトを作ってみよう](https://azukiazusa.dev/blog/sveltekit-tutorial-create-a-blog-site/?felosearch_translate=1)

## hot-reloading
live-serverをインストールし、tauri.conf.jsonのdevpathと合わせて起動。
package.jsonのscriptに`"dev": "vite && live-server public --port=1420 --no-borwser",`を仕込むと自動で起動できる。
Viteの後じゃないとviteが実行されないのか上手くいかない。

[すべてをカスタマイズせよ RustでTAURI GUIツールキットを試す(2)：ホットリロードにする](https://jnsmith.blog.fc2.com/blog-entry-188.html)
[live-server - npm](https://www.npmjs.com/package/live-server)

## `#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]`
内部属性。main.rsにあるため、プロジェクト全体≒バイナリクレート全体にかかる。

デバッグアサーションが無効な際（リリースビルド）にwindows用にビルドする。つまりコンソールを表示しない。

## フロントとバックを繋ぐ
Eventを使う。

[Events | Tauri Apps](https://tauri.app/v1/guides/features/events/)

なお、reactは`@tauri-apps/api`を通してinvokeを使うことでtauri側で`#[tauri::command]`、及び`tauri::Builder::default().invoke_handler`を通し公開されているコマンドを使用することができる。

複数公開する場合は以下のようにgenerate_handlerを増やす。直接Builderを増やすと上書きしてしまう。

```rust
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,get_image_paths])
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
```

[Calling Rust from the frontend | Tauri Apps](https://tauri.app/v1/guides/features/command/)

## 画像を読み込む
ファイルパスがそのままだと`ERR_UNKNOWN_URL_SCHEME`で引っかかる。
なのでまず`convertFileSrc`で変更。

その後、ローカルファイルを読めるように`tauri.conf.json`でプロトコルを変更。

```json
"tauri": {
    "allowlist": {
      "protocol": {
        "asset": true,
        "assetScope": ["**"]
      }
    },
```

安全のためにCSPで自分のファイルだけ読めるように。

```json
{
  "tauri": {
    "security": {
      "csp": "default-src 'self'; img-src 'self' asset: https://asset.localhost"
    },
```

[tauriでWebViewから直接ローカルファイル読み込む](https://zenn.dev/bpk_t/scraps/4f9523470ea151)
[コンテンツセキュリティポリシー (CSP) - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)

## vscodeでフロントエンドデバッグ
デバッグで出来たexeに対してlaunch.jsonを仕掛ける。
bunに変えたりexe名を変える。9222はwindows用。
一度`bun tauri dev`などでexeを作っておかないとダメ。

[Is there a recommended way to debug a tauri application (react used as frontend) in vscode on Windows? · tauri-apps/tauri · Discussion #4210 · GitHub](https://github.com/tauri-apps/tauri/discussions/4210)

[tauri security](<../../Info/tauri security.md>)

[tauri 階層構造](<../../Info/tauri 階層構造.md>)

[tauri tauri.conf.json](<../../Info/tauri tauri.conf.json.md>)

## ウィンドウ状態など
[Tauri でフレームレスウィンドウのアプリケーションを作成する #TypeScript - Qiita](https://qiita.com/takavfx/items/9bf518a5bc3cc7c19509)
[Tauri でウィンドウ状態を保存・再現する #Rust - Qiita](https://qiita.com/takavfx/items/531bc89ac402f9cdf6a7)
[Tauri v2 x Svelte 5 で、アプリケーション開発をはじめる！ #Rust - Qiita](https://qiita.com/takavfx/items/248250daacde5d400bd9)

## Godot連携
reactからgodotのwebassemblyを呼べるライブラリがある。
逆はないです。

https://github.com/calico-games/react-native-godot

tauriからwebassembly読めば無敵？

## 他アプリ呼出し
exeを登録できるsidecar機能というのがあるらしい。
[【全CLIアプリGUI化計画】TauriでTypeScriptやRustからCLIアプリを呼び出す #TypeScript - Qiita](https://qiita.com/namn1125/items/36482917d9c7a8adb658)