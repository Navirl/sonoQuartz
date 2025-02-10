---
date: 2024-03-02
tags:
  - Bar
---

up:: [ts](<../Program/JavaScript and TypeScript.md>)
up:: [Programming](<../Program/Programming.md>)

コンポーネントを組み合わせてブラウザの画面を作れるライブラリ。

コンポーネントの組み合わせを作る物であり、コンポーネントそのものがどう実装されるかは関与しない。ここはNext.jsとかの仕事。

これでモバイルアプリを作りたいなら[React Native](<../Framework/React Native.md>)や[NativeScript](<../Framework/NativeScript.md>)という方法がある。

[クイックスタート – React](https://ja.react.dev/learn)

## コンポーネントの作成とネスト
コンポーネントとは**Markupを返すJavascript関数**。
独自のロジックと外見を持つUIの部品。
HTMLタグとの混同を防ぐため大文字で始める。というか、じゃないと動かない。

以下は単純な例。
```jsx
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

これをこのように分割することもできる。

```jsx
//App.js
import MyButton from "./Mybutton";

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}

//Mybutton.js
export default function MyButton() {
    return (
      <button>
        I'm a button
      </button>
    );
  }
```

## JSXでマークアップを書く
コンポーネントは複数のJSXタグを返せない。
なので`<>...</>`等空タグでもいいので囲い、一つにする。

```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

## スタイルの追加

CSSクラスは`className`で指定する。HTMLでいう`class`。
```jsx
<img className="avatar" />
```

実際のCSSは別ファイルに記述する。
```css
/*css file*/
.avatar{
    border-radius: 50%;
}
```

CSSファイルの追加法に規則はない。


## データの表示
波括弧を使えばJSX内でJavascriptを使える。式を入れることも可能。
```jsx
return (
  <h1>
    {user.name}
  </h1>
);
```

## 条件付きレンダー
ifや?や[&&](<../../Info/js アンパサンドと縦線.md>)を使って分岐させる。

## リストのレンダー
forやmapを使って一気に書く。
一応mapの方だけ書く。
```jsx
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```
mapで配列を変換するやつ。

リストに使う`<li>`にはkey属性が付与されている。
これはリストの各項目を一意に識別するための文字列又は数値。
削除・並べ替え・挿入などの場合にReactが状況を把握するためにある。

## イベントに応答する
イベントハンドラ関数を渡すと、イベント発生時に実行してくれるコンポーネントがいくつか存在する。
```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

## 画面の更新
コンポーネントに情報を記憶させる。`useState`。[React Native](<../Framework/React Native.md#state>)も参照のこと。
`useState`を用いる。セッタゲッタ初期値渡して使用。
```jsx
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

## フックの仕様
`use`で始まる関数はHook。通常の関数より制限が多い。
**コンポーネントのトップレベル、または他のフック内でのみ呼び出せる**。
条件分岐やループ内で呼ぶ場合は新たなコンポーネントを抽出し配置する。

二つ以上のStateの情報を同期したい場合は、一つ上のコンポーネントに入れる。
例えばさっきの[画面の更新](<#画面の更新>)ではMyButtonにフックを入れたが、今度はMyAppにフックを入れる。
```jsx
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

入れたフックをpropsを介して呼び出す。
この手法はstateのリフトアップと呼ばれる。

## React Nativeに変換する
`<div>`は`<Text>`や`<View>`に
`<button>`を`<Button>`に
`className`を`style`などに変更する。

もちろんそのまま書き換えるだけではいけない、それぞれ変数を変更する


[React Tutorial](<../../Info/React Tutorial.md>)

## useEffect
関数に副作用、つまり関数外への作用を追加するためのフック。
関数で変数を変更ではなく、変数を

昔のclassコンポーネントというのではコンポーネント一つに付き副作用が一つしか書けなかったらしい。
これは複数追加できるので、関心毎に分離できる。

実行タイミングは第二引数で決定する。

指定ないならレンダリングごと。
空配列なら初回レンダリング。
配列に1つ以上の値があるなら、レンダリング時にその値に変更がある時。

下手にほっとくと副作用が積み重なりメモリリークする。
なのでreturnにはクリーンアップ用の関数を仕込む必要がある。

[useEffectをちゃんと理解する #React - Qiita](https://qiita.com/diskszk/items/333511fb97d24f52a439)

第一引数に指定した関数を実行できるのだが、ここに指定できるのは**返り値がvoidの関数**のみ。他の関数をセットするとエラーになる。もちろんクリーンアップ関数も。

## useState
値を保持する奴。第一引数は読み込み用。第二引数は変更用の関数。
変更用の関数内からなら、読み込み用の引数を操作できる。

第二引数は**非同期**なので、連続してそのまま変更用関数を呼ぶとバグる。
そうしたいときは第二引数の関数にラムダなどで引数付き関数を入れる。そのラムダに入る引数では同期される。

また、作ったステートは当然コンポーネントで使うのだが、この時ステートはツリーごとに作成される。
ただしツリーにkeyが設定されている場合は同じツリーでも独立する。

[【React】useStateの基本と利用時の注意点まとめ #React - Qiita](https://qiita.com/TaikiTkwkbysh/items/780144eea9ea0469b73c)

## React.FC
これを付けるとオリジナルの関数コンポーネントを定義できる。
例えばマークアップの一部分を分割して処理したいなってとき、これでコンポーネントを作ってJSXを返せるようにし、部分ごとに処理するようにできる。

反対にコンポーネントにJSXを渡したいときは、引数(props)で指定できるchildrenを返すようにすればいい。

[React×TypeScript　基本の型定義 #React - Qiita](https://qiita.com/hinako_n/items/97ccaf85eb40d7e45657)

### 詳しい話
FCは単純な型定義。FunctionComponentの略。
似たものにVFCというのがある。VoidFunctionComponent。違いは引数がPropsWithChildrenであること。

propTypes(型チェック。Typescriptならいらない)
contectTypes(コンテキストタイプ指定。propTypesと同様)
defaultProps(propsのデフォルト値、別の書き方がある)
displayName(コンポーネントの名前表示、無くても表示できる)

以上の4つを持つが、普通にTypescriptがあれば要らない。

なので、今やるなら返り値の型をJSX.Elementとするのが分かりやすい。
あとjsに由来するので型無しでJSXを返すこともできる。分かりにくいので非推奨。

[【検証】React.FC と React.VFC はべつに使わなくていい説 – KRAY Inc.](https://kray.jp/blog/dont-have-to-use-react-fc-and-react-vfc/)