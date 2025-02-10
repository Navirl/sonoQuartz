---
date: 2025-02-03
tags:
 - Info
---

up:: [wails](<../Bar/Framework/wails.md>)

[どうやって動いているの? \| Wails](https://wails.io/ja/docs/howdoesitwork)

## 概念
バックでGo、フロントでJSを動かす。
二つのランタイムはIPC通信を行う。この方法は二つある。
- bind
    - 関数や構造体などのGoコードをフロントエンドに渡す。
- events
    - イベントにより処理タイミングや値を渡す。

## 操作
wails buildで成果物ビルド。

## 処理
```go
package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "sample",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
```

（NewAppなどの中身はapp.goにある）
wails.Run()メソッドを一回呼び出すことで動く。
ここでウィンドウや読み込むアセットの設定を行う。

- `Title` - ウィンドウのタイトルバーに表示されるテキスト
- `Width` & `Height` - ウィンドウの大きさ
- `Assets` - アプリのフロントエンドアセット（必須）
- `OnStartup` - ウィンドウが作成され、フロントエンドの読み込みを開始しようとする時のコールバック
- `OnShutdown` - アプリを終了しようとするときのコールバック
- `Bind` - フロントエンドにバインドさせたい構造体インスタンスのスライス

フロントエンドアセット無しでアプリは作成できない。
アセットはそのまま使う。バンドルを生成する必要はない。

起動したアプリは`index.html`を読み込む。

アセットは`embed.FS`から読む。ディレクトリはどこでもいい。使うパスはメインコードからの相対パス。

`wails dev`使用時は、アセット更新を検知しライブリロードする。

### ライフサイクル
OnStartupは`index.html`を読む直前にコールバックされる。
OnStartupにはGoの標準的contextが渡される。
このcontextはwailsのラインタイムを呼ぶときに必要。参照は保持しておく。

OnShutdownはアプリがシャットダウンされる直前。
同じくContextが渡される。

OnDomReadyというコールバックもある。
`index.html`に含まれる全てのアセットが読み込み終わった後。
JSの`body onload`にあたる。

OnBeforeClose。ウィンドウを閉じる直前。

### バインド
`Bind`はフロントエンドに公開する**構造体のメソッド**を指定する。
実際指定するのは構造体のインスタンス。`&App{}`とか。
MVCのコントローラ？

起動時、Bindのオプションから構造体を特定、パブリックメソッド（大文字始まりのメソッド）を探す。
これを元にフロントエンドでそのメソッドを呼ぶためのJSを生成する。

main.goでデフォルトで置いてあるバインドはNewApp()が入ったappのみ。中身がapp.goに書いてあるがインスタンスをreturnするだけ。

### フロントエンド
バインドは`/wailsjs/go/main/構造体名`に生成される。呼ぶときはこれをimport。
```javascript
// ...
import {Greet} from '../wailsjs/go/main/App'

    function doGreeting(name) {
        Greet(name).then((result) => {
            // resultを使って何かする
        })
    }
```
typescriptの型定義ファイルも生成する。

生成されたメソッドはPromiseを返す。返り値は1つ目がresolveで処理中身、二つ目はresultっぽい。
二つ目がerror型のerrorインスタンスを返すとエラーとみなされる。これは`reject`ハンドラを通る。

Goで構造体を返す場合は、JSではクラスとして返される。
JSからマップやクラスを渡すと、Goでは構造体として扱われる。

`dev`ではバインドしたGoメソッドで使用している全構造体の型が定義されたTypescriptモジュール、`model.ts`が生成される。

シグネチャ（インターフェース内の変数指定）に構造体を使用するGoメソッドも使える。
バインドされており、引数又は返り値として指定されているGo構造体は、（生成される`model.ts`からインポートした）Typescript定義を持つ。このためJSでも同じデータモデルを使用可能。

### ランタイムメソッド
JSのランタイムは`window.runtime`にある。
デバッグに役立ったりするタスクがある。