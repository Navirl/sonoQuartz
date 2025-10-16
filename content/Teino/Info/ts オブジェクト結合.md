---
date: 2024-01-09
tags:
  - Info
---

up:: [JavaScript and TypeScript](<../Bar/Program_lang/JavaScript and TypeScript.md>)

スプレッド演算子や`Object.assign()`を使うことが出来る。

```ts
function mergeObjects(obj1, obj2) {
   return { ...obj1, ...obj2 };
}

let obj1 = { a: 1, b: 2 };
let obj2 = { b: 3, c: 4 };

console.log(mergeObjects(obj1, obj2)); // { a: 1, b: 3, c: 4 }
```

スプレッド演算子`...var`は変数を展開するもの。文字列内の`${var}`みたいなの。同じキー持ちは後から書き換えたものが優先される。

shallow copyなのでネスト以下のものを書き換えると元が変わる。防ぐならネスト以下は個別に展開していくこと。

[JSのスプレッド構文を理解する JavaScript - Qiita](https://qiita.com/akisx/items/682a4283c13fe336c547)

Object.assign()は以下。

```ts
function mergeObjects(obj1, obj2) {
   return Object.assign({}, obj1, obj2);
}

let obj1 = { a: 1, b: 2 };
let obj2 = { b: 3, c: 4 };

console.log(mergeObjects(obj1, obj2)); // { a: 1, b: 3, c: 4 }

```

[\[JavaScript\]Object.assignを基礎から理解する JavaScript - Qiita](https://qiita.com/HuntingRathalos/items/1c22ca800d09ea2f8330)

二つはほぼ同じだが、スプレッド構文の方が新しく、Object.prototypeが汚染されセッタがセットされているときでもセッタを呼び出さない。

[Object.assign({}, obj) と { ...obj } の違い JavaScript - Qiita](https://qiita.com/uhyo/items/eaed00f1af9b0b7ee2e6)