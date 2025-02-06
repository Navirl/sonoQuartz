---
tags:
 - Info
---

daily:: [2023-01-30](/Daily_Note/2023-01-30.md)
up:: [Obsidian](<../Bar/App/Obsidian.md>)

## 前提
何かしらをシンプルに表示したいだけなら、Javascriptが実行できるDataviewプラグインで間に合う。

## 基本
`export default`で`Plugin`を継承したクラス内の、`async onload()`関数で大体実装する。ここはプラグインをONにしたときに読み込まれる関数。
関数をそのまま実行することは基本なく、const変数に入れてパッケージングするのが普通っぽい。
ほとんどの関数はobsidian.d.tsに入っており、一緒に簡単なドキュメントが書かれている。vscodeでサンプルプラグインフォルダを開き関数ごとに定義へ飛ぶといい。

公式リファレンスを読むと`obsidian.WorkSpace.geActiveFile()`などが出来そうに見えるがこれは間違い。
Appのプロパティから`obsidian.app.workspace.getActiveFile()`などとしないとアクセスできない。appをimportしてる場合でもappは必要。

[workspace - Developer Documentation](https://docs.obsidian.md/Reference/TypeScript+API/App/workspace)

## addRibbonIcon(preset, mouseover, callback) : HTMLElement;
Pluginの関数。こういうのは左側のアイコン並んでる場所にアイコンを追加する。
引数1はプリセット画像、引数2はマウスオーバー時の文字列。引数3は様々な動作をラムダ式で入れられる。()内に反応させるイベントトリガー、{}内に処理。
とりあえず通知を出したいときは、`new Notice('文字');`でNoticeクラスを生成する処理を入れる。

## addClass(class)
Element(interface)の関数。Elementに追加で機能をつけられる。
細かいことは書いてないが、たぶんObsidian内にあるCSSの要素的なものは全部Elementを継承してるとかそんなん。
とりあえずHTMLElementからは呼べる。

[Ob button note](<./Ob button note.md>)
[Ob sample note](<./Ob sample note.md>)