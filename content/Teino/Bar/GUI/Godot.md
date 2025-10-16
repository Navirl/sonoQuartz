---
date: 2023-03-15
tags:
  - Bar
---

up:: 

MITライセンスのゲームエンジン。英語読みだとゴドー。
UnityやUEと比べると軽く、その軽さたるやAndroid上でも動かせるレベル。それでもVR動かせるらしいっすよ。

[Dev snapshot: Godot 3.5 beta 3](https://godotengine.org/article/dev-snapshot-godot-3-5-beta-3/)

基本はGDScriptという独自言語。pythonに似た記法でそこそこ早い。
Csharp版を使うとCsharpで開発できる。APIを呼ぶ形でPythonやRustでも開発できる。
Visual ScriptingというUEみたいなノード繋げる奴もあったけど、4.0から廃止されたとか。

コンソール向けのビルドもできなくはない。
ただライセンスの関係で会社に委託することになる。

[Godot Game Engine を使う10の理由 - Qiita](https://qiita.com/harumaxy/items/85930db188c8ca43bac8)

4.0のデバッグvscode対応は暫くお待ちください……(2023/03/15)

[Godot GDExtension](<../../Info/Godot GDExtension.md>)

[GodotのGDScriptふわっとした話｜NwSnKn](https://note.com/nwsnkn/n/n757580791c10)


## Tauri使う
Tauriは使えないが、Webview部分であるwryを使うアセットならある。
WebViewノードでHTMLを読めるっぽい。
現時点（2025/01/10）ではウィンドウに直接レンダリングしかできなさそう。
それらが必要ならChrome埋め込みのgdcef、qtを使用するgodot-webviewなどを使う。

[Godot WRY — UI with HTML, CSS and JS - Godot Asset Library](https://godotengine.org/asset-library/asset/3426)
[TauriからWebViewだけ引っこ抜いて使う - あずんひの日](https://aznhe21.hatenablog.com/entry/2022/12/03/rust-wry)


