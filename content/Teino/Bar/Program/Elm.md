---
tags:
  - Bar
---

daily:: [2025-01-02](Daily_Note/2025-01-02.md)
up:: [Programming](<./Programming.md>)
same:: [Haskell](<./Haskell.md>)

純粋[関数型言語](<./関数型言語.md>)。関数型言語による静的Webページ制作のために作られた。

[Elm入門の入門 最初に読むページ #Elm - Qiita](https://qiita.com/arowM/items/5ec5853298fc880353b7)
[ヤギと振り返る恥ずかしいコード -- 次のレベルに上がるために #Elm - Qiita](https://qiita.com/arowM/items/9bc3ac679b87d14036e8)

できることは少ない。
ただいい書き方を強制し誰が書いてもだいたい同じコードにする。

もっとjsっぽいのがいいならPurescriptだろうか。



[Begginnig\_Elm](<../../Info/Begginnig_Elm.md>)

[はじめに · An Introduction to Elm](https://guide.elm-lang.jp)

## The Elm Architecture
ElmがHTMLを作り、HTMLからMsgをElmに送るという構造。

- Elm
    - HTMLを作る
- HTML
    - MsgをElmに送る

さらにElmの中では、Model・View・Updateの構造がある。

- Model
    - アプリの状態
- View
    - 状態をHTMLに変換（表示）
- Update
    - メッセージを使い状態を更新する

わりといろんなところ（Redux）にもパクられているアーキテクチャ。
学んで損はない。

### Elmでの実装
```elm
main =
  Browser.sandbox { init = init, update = update, view = view }
```

`main`に画面に表示するものをまとめて定義する。
アプリ初期化用のinit関数、
表示用のview関数、
更新・入力受け用のupdate関数をここで渡せばOK。

さっきの説明だとModelは静的データチックだったが、実際はこのように初期化関数という形で関数にしてまとめて渡す。
もちろんModelは別に定義する。変数でなく型エイリアスで。

[elm 型の話](<../../Info/elm 型の話.md>)


## init

```elm
type alias Model = Int

init : Model
init =
  0
```

型エイリアスで表現力UP。
関数に一個だけ値がついてるときは戻り値。

表現力の話をするなら、

## Update
```elm
-- UPDATE

type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1
```

カスタム型をenumとしてUpdate処理を分けるやつ。

## View
elmではhtml要素を**関数**として持っている。
View関数でこれらを実行することでhtmlを生成する。これはelm-htmlと呼ばれている？
このおかげで型チェックなどが効く。

一応jsxをelm-htmlに書き換えるシンタックスシュガーライブラリがある。

https://github.com/pzavolinsky/elmx









