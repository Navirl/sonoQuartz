---
tags:
 - Bar
 - App
---

daily:: [2023-03-15](Daily_Note/2023-03-15.md)
up:: [Rust](../Program/Rust.md)

rustで作られたゲームエンジン。元は3D専用だが2Dもできる。
ECSが前提のBevyと違い、こちらは昔ながらのOOP。しかもUnityっぽいエディタ付き。

じゃあUEばりにノーコードで行けるかというとそういうわけじゃない。チュートリアルはなんかエンジン初期化からオブジェクト生成から全部コードでやってるし。

エディタ上で自分の書いたコードを使う場合は、lib.rsにpub useでファイル登録、及びfn registerで登録してオブジェクトにアタッチ。
なおドキュメントのScript Registrationに書かれてる部分では足りない。ちゃんとMyScriptを見つけられるよう、lib.rsにmod my_scriptで展開しておく必要がある。おかしいなpub useで行けるはずなんだけどな？

[Scripts - Fyrox Book](https://fyrox-book.github.io/fyrox/scripting/script.html)
[Rust Module](../../Info/Rust%20Module.md)

物理制御がうまくいかないので一旦塩漬け。