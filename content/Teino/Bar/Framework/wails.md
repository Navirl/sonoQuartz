---
date: 2025-02-03
tags:
 - Bar
---

up:: [Go](<../Program_lang/Go.md>)
same:: [Tauri](<./Tauri.md>)

[GitHub - wailsapp/wails: Create beautiful applications using Go](https://github.com/wailsapp/wails)

goのtauri的なデスクトップアプリケーションフレームワーク。
WebViewを使用するところも同じ。

今のところモバイル対応はして無さそう。
[CLI \| Wails](https://wails.io/docs/reference/cli#platforms)

モバイル対応しているフレームワークにはfyneというのがある。
こちらはWebViewではなくGLFWというOpenGL上で動かすフレームワークを使っているらしい。
ただしUIはfyneの物を使うことになる。マテリアルデザインを参考にしているらしく、そこそこリッチではある。

[GoでクロスプラットフォームGUI(2022)](https://zenn.dev/nobonobo/articles/6cc4c510988e82)
[GitHub - fyne-io/fyne: Cross platform GUI toolkit in Go inspired by Material Design](https://github.com/fyne-io/fyne)

全部GoがいいならGioというのも。TailScaleに使われた実績が強すぎる。
ソースがGitHub管理ではなさそう。即時モードっぽい。
[Gio UI](https://gioui.org)
[Medium](https://medium.com/@osho_jay/building-lightweight-cross-platform-applications-entirely-in-go-no-js-no-bs-4b737e3f5067)


[wails 基礎](<../../Info/wails 基礎.md>)

## デバッグ
バックエンドは適当にlaunch属性で仕掛ければ動く。ただしビルドにタグを付けないと怒られるのでbuildFlagsを忘れずに。
```json
        {
            "name": "Go Backend Only",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}",
            "env": {},
            "console": "integratedTerminal",
            "buildFlags": "-tags=dev"
        },
```

フロントエンドはバックエンドを起動->デバッグモードでchrome起動->chromeに対してattachという流れ。なので三つプロセスを動かす。
edgeではなんかポートが見つからなくて動かなかった。

```json
        {
            "name": "Launch Browser",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:34115",
            "runtimeArgs": [
                "--remote-debugging-port=5173",
            ],
            "runtimeExecutable": "D:\\Scoop\\shims\\chrome.exe"
        },
        {
            "name": "attach to chrome",
            "type": "chrome",
            "request": "attach",
            "port": 5173,
            "webRoot": "${workspaceFolder}/frontend",
            "sourceMaps": true,
        }
```
scoopで入れたchromeだとruntimeを見つけてくれないのでruntimeExecutableもいる。
portの5173はwailsがなんかこれにしてたから。urlのポートは何でもいい。

[Wails を始めてみた - Qiita](https://qiita.com/tinymouse/items/d95029ad20665bdf1128)
[ChatGPT - Wails エラー対策](https://chatgpt.com/share/68cbe510-8ba8-8009-aa23-d2e0d005ba74)
[How to debug frontend through vite on vscode · wailsapp/wails · Discussion #2877](https://github.com/wailsapp/wails/discussions/2877)

goが無いとtype goがセットできない。
typescriptがある場合はソースマップの専用設定がないとブレークポイントが付かない。
[VSCodeでTypeScriptファイルをデバッグする方法（esbuildを使用） - Qiita](https://qiita.com/Yuumillar/items/22471eb596618faa0164)
フロントエンドとバックエンドは結局同時にデバッグできない？

## Option.App
wails.Runに渡してるのは`option.App`構造体。
ゲームで言ういわゆる設定項目。
[オプション \| Wails](https://wails.io/ja/docs/reference/options/#application-options)

[wails フレームレスウィンドウ](<../../Info/wails フレームレスウィンドウ.md>)

## svelte
```html
<script>
  import logo from './assets/images/logo-universal.png'
  import {Greet} from '../wailsjs/go/main/App.js'

  let resultText = "Please enter your name below 👇"
  let name

  function greet() {
    Greet(name).then(result => resultText = result)
  }
</script>

<main>
  <img alt="Wails logo" id="logo" src="{logo}">
  <div class="result" id="result">{resultText}</div>
  <div class="input-box" id="input">
    <input autocomplete="off" bind:value={name} class="input" id="name" type="text"/>
    <button class="btn" on:click={greet}>Greet</button>
  </div>
</main>

<style>

  #logo {
    display: block;
    width: 50%;
    height: 50%;
    margin: auto;
    padding: 10% 0 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-origin: content-box;
  }

  .result {
    height: 20px;
    line-height: 20px;
    margin: 1.5rem auto;
  }

  .input-box .btn {
    width: 60px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: none;
    margin: 0 0 0 20px;
    padding: 0 8px;
    cursor: pointer;
  }

  .input-box .btn:hover {
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    color: #333333;
  }

  .input-box .input {
    border: none;
    border-radius: 3px;
    outline: none;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background-color: rgba(240, 240, 240, 1);
    -webkit-font-smoothing: antialiased;
  }

  .input-box .input:hover {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }

  .input-box .input:focus {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }

</style>


```

## マルチウィンドウ
wails2.xでは対応していない。3からは対応。

[Support Multiple Windows · Issue #1480 · wailsapp/wails](https://github.com/wailsapp/wails/issues/1480)