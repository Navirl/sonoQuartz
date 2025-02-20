---
date: 2025-02-16
time: 17:55
tags:
 - Info
---

up:: [dioxus](<../Bar/Framework/dioxus.md>)


## 基礎
`dx new appname`で始める。

dioxus固有機能はdioxus.tomlから。
画像とかはasset以下へ。

src以下のmain.rsの`fn Main()`がエントリーポイント。
ここで関数をdioxusコンポーネントとして読み込む関数、`dioxus::launch()`を使用してApp関数を読むという流れ。
launchは`dioxus::prelude`以下にある。


コンポーネントは**props構造体しか引数に取れない**。さらに、props構造体（親から子に渡したい値を纏めて置くもの）はすべてProps, PartialEq, Cloneを実装する必要がある。

```rust
#[derive(Props, PartialEq, Clone)]
struct DogAppProps {
    breed: String,
}
```

面倒なのでマクロが用意されている。
`#[component]`を実装すれば、引数を暗黙的なprops構造体に変換できる。

```rust
fn DogApp(props: DogAppProps) -> Element {
    todo!()
}
```

> [! note]
>  ちなみに、直接引数を取るようにしなかったのはパフォーマンスと状態管理のため。
>  1. コンポーネントはレンダリングされるたびに`.clone()`を生成する。このためpropsの誤変更が減る。引数がprops固定なのでcloneの実装が楽。
>  2. propsが変更されると再レンダリングが走る。この変更のために`PartialEq`が使用される。引数固定だと比較が効率的。
>  3. 引数固定なのでインターフェースが明確。他のコンポーネントとの連携や再利用が簡単になる。
> 
>  あとReactもこの仕様なので移行が楽。


## rsx
[Dioxus \| Fullstack crossplatform app framework for Rust](https://dioxuslabs.com/learn/0.6/guide/rsx/)
rsx内の要素は全てホットリロード対応。

rsx内の文字列は`format!()`を通したものとして扱われる。
その為`{}`で囲んで外の変数を表示できる。

最終的に文字列になる式なら、rsxに直接含められる。

```rust
rsx! {
    // Anything that's `Display`
    {"Something"}

    // Optionals
    {show_title.then(|| rsx! { "title!" } )}

    // And iterators
    ul {
        {(0..5).map(|i| rsx! { "{i}" })}
    }
}
```

一つ一つにrsxを付ける必要もない。なので以下のように書き換えられる。

```rust
rsx! {
    if show_title {
        "title!"
    }

    ul {
        for item in 0..5 {
            "{item}"
        }
    }
}
```

リストを回している時、キー属性を追加するとパフォーマンスと状態管理に良いらしい。
よくわからんので後回し。

## スタイリング
cssが使える。
