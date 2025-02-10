---
date: 2024-02-17
tags:
  - Info
---

up:: [ts](<../Bar/Program/JavaScript and TypeScript.md>)

markdownからyamlを簡単に読み込めるライブラリ。最終更新2019。
メソッドは`.loadFront`と`.safeLoadFront`だけ。safeの方だと正規表現をサポートしない。

読み込んだ後に返ってくるのはオブジェクト。
直接`.要素`に代入することで新たに要素を作れる。

読み込み時に`.__content`に元のコンテンツを保持する。
その為ちゃんと最後に`delete yamlObj.__content`などとして消さないと邪魔な要素が出てくる。

メソッド的に使うため、変数内の値を要素として使う場合は[ts 文字列実行](<./ts 文字列実行.md>)などで工夫することになる。


[GitHub - dworthen/js-yaml-front-matter: Parses yaml or json from the beginning of a string or file](https://github.com/dworthen/js-yaml-front-matter?tab=readme-ov-file)

