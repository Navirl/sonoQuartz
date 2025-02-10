---
date: 2025-02-09
tags:
 - Bar
---

up:: [App](<./App.md>)

[GitHub - zed-industries/zed: Code at the speed of thought – Zed is a high-performance, multiplayer code editor from the creators of Atom and Tree-sitter.](https://github.com/zed-industries/zed?tab=readme-ov-file)

Editor。Atomの開発者の一人が作った。
CopilotとVimキーバインドがプリインされてる他、ローカルファイルを公開することによるペアプロ、Discordのようなチャットとノート機能など、いろいろ入ってメモリ40MB。とても軽い。

scoopのversions bucketから入れられるが、これは公式が提供している物ではない。
というか公式はwindowsのビルドを出してない。Macがメインでwindowsは自分でビルドしてねと言う感じ。

Atomが元なのでVSCode派だとちょっととっつきにくい。その場合はlapceがいい競合かもしれない。

[Lapce - Lightning-fast and Powerful Code Editor](https://lap.dev/lapce/)

git機能がvscodeより弱い。incomingとoutcomingをGUIで指定したいんだけど。
ここはlapceにもないので、手動でやるかneovimでも頼るか。

10万行放り込んでも動く。
lapceは今（2025/02/09）のところ固まるのでここは大きい。

たいていの設定はjsonを直でいじる。
vimのjjでNormalに戻るキーバインドはこう。
```json
[
  {
    "context": "Editor && vim_mode == insert && !menu",
    "bindings": { "j j": "vim::NormalBefore" }
  }
]
```

[思考のスピードでコードを書け！！Rust製の次世代エディタ「Zed」](https://zenn.dev/smartcamp/articles/c421e752119cee)

extensionはGUI上にない。コマンドパレット`C-P`で開くか直接`C-X`で開ける。