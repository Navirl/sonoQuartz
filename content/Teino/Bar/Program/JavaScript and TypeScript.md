---
tags:
  - Bar
aliases:
  - js
  - ts
---

daily:: [2022-11-02](Daily_Note/2022-11-02.md)
up:: [Programming](<./Programming.md>)

## Scrapbox徹底解剖
[Scrapbox徹底解剖](../Nontagged/Scrapbox徹底解剖.md)

## オブジェクト指向
色々勝手が違う。
特に、全てがインスタンスであることとthisの指すものの違い。
[Javascriptでオブジェクト指向するときに覚えておくべきこと - Qiita](https://qiita.com/awakia/items/8ff451ca5f8ae0122be7)

## const {} = foo

##  ERR_PNPM_NO_GLOBAL_BIN_DIR  Unable to find the global bin directory

Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.

pnpmを使うときに怒られる奴。pnpm setupを入れてターミナル再起動。

## `console.log(typeof([]))`
配列はオブジェクトの一種なので、`object`を返す。

## for in とfor of
forinはオブジェクトのプロパティ。
配列に対して使用するとインデックスが回される。

forofは反復処理用。
配列もちゃんと回せる。

## npxをpnpmで
pnpm exec
[pnpm execとpnpm dlx #Node.js - Qiita](https://qiita.com/KokiSakano/items/30ca5f154bff1a3d2b61)

## npmでローカルインストールしたパッケージをCLI実行
`npx`。package.jsonのscriptsに追加するnpm-scriptという方法も。

[npm でローカルインストールしたパッケージを CLI でコマンド実行する方法（npm-srcipts, npx） #npm-scripts - Qiita](https://qiita.com/sugurutakahashi12345/items/b814a09b65d8852226ad)

## pnpmストアフォルダ
ハードリンク張られるが、これはpnpm store pathで取得できる。
同一ドライブじゃないとだめ。
[How to get pnpm store directory - Stack Overflow](https://stackoverflow.com/questions/55403775/how-to-get-pnpm-store-directory)
[how to change pnpm store folder path · pnpm · Discussion #7289 · GitHub](https://github.com/orgs/pnpm/discussions/7289)
