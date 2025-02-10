---
date: 2025-02-03
tags:
 - Info
---

up:: [wails](<../Bar/Framework/wails.md>)

## フレームレスウィンドウ
`Option.App`で`Flameless: true,`を設定する。

これだけだとドラッグできなくなるので、ドラッグハンドル用の要素を付ける。
任意のHTML要素にCSSスタイルで`--wails-draggable:drag`というのをくっつければOK。これは全ての子要素に継承される。子要素でハンドルにしたくないものがあったら`--wails-draggable:no-drag`。

動的なスタイリングがあるとこれで問題が出て、回避策もあるみたいだが、これは困った時でいいや。

[フレームレスアプリケーション \| Wails](https://wails.io/ja/docs/guides/frameless)

windowsの影とかが要らないときは、`DisableFramelessWindowDecorations: true`を設定する。
これはwindows固有の問題なので、`Windows: &windows.Options{}`に入っている。`windows.Options`は`"github.com/wailsapp/wails/v2/pkg/options/windows"`をimportしないと使えないので注意。

[Options \| Wails](https://wails.io/docs/reference/options/)