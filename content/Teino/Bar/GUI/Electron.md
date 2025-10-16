---
date: 2024-08-13
tags:
  - Bar
---

up:: 

ブラウザ上で動かすことであらゆるデバイス上でアプリを動くようにしたやつ。
ブラウザで使える技術は全部使える。[React](<../Framework/React.md>)で組める。

## 最小限
[クイック スタート | Electron](https://www.electronjs.org/ja/docs/latest/tutorial/quick-start)
[Electron Fiddle + p5js で半透明アプリをつくる Electron - Qiita](https://qiita.com/mathrax-s/items/b280c893dd7b202ba8ea)

`npm init`でpackage.jsonを生成。
`npm i electron`で始められる。

package.jsonのscriptsにstartとして`electron .`を追加。これで`npm run start`でelectronを起動できる。

.vscode/launch.jsonにデバッグ設定追加。
```json
{
    "version": "0.2.0",
    "compounds": [
      {
        "name": "Main + renderer",
        "configurations": ["Main", "Renderer"],
        "stopAll": true
      }
    ],
    "configurations": [
      {
        "name": "Renderer",
        "port": 9222,
        "request": "attach",
        "type": "chrome",
        "webRoot": "${workspaceFolder}"
      },
      {
        "name": "Main",
        "type": "node",
        "request": "launch",
        "cwd": "${workspaceFolder}",
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
        "windows": {
          "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
        },
        "args": [".", "--remote-debugging-port=9222"],
        "outputCapture": "std",
        "console": "integratedTerminal"
      }
    ]
  }
```

必要なファイルは`main.js`のみ。これはpackage.jsonで名前を変えられる。他はmainコード内で変更。
画面が欲しければ`index.html`
プリロードしたければ`preload.js`
htmlを後から変更するなら`renderer.json`（これはhtmlに設定する）

プリロードでは様々な特権が必要な操作を追加できる
というか公開できる、インターフェースみたいなの

## プロセス間通信
デバッグに見えるように、メインとレンダラーのプロセスは別
なので二つを繋ぐ通信を作る

レンダラー側から読めるjsである`renderer.js`から、`preload.js`に公開されている通信を呼ぶ
通信は`preload.js`に設定されている`main.js`の関数を呼ぶ、という仕組み

