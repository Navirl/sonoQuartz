---
date: 2023-02-10
tags:
 - Info
---

up:: [JavaScript and TypeScript](<../Bar/Program_lang/JavaScript and TypeScript.md>)

`Array[]`の中から特定条件にあてはまるものを取り出し、新たな配列を作る関数。
より詳しく言うと、コールバック関数でtrueを返した要素だけ残す関数。なのでコールバック関数は必ず戻り値がbooleanになる。

```ts
// items配列の要素である文字列内に「.html」という文字が含まれているものだけを抽出する。

const items = ["hogehoge", "piyopiyo.html", "fugafuga.css"];

const filtered = items.filter((item)=>{
  return item.includes(".html");
});

console.log(filtered);
// [ 'piyopiyo.html' ]

console.log(items);
// [ 'hogehoge', 'piyopiyo.html', 'fugafuga.css' ] 破壊的ではないので元の配列は壊れない。
```
ちなみにfilterに第二引数を与えると、コールバック関数内でthisとして呼ぶことが出来る。

[【TypeScript】filterで頑張る - Kuzunoha-NEのブログ](https://kuzunoha-ne.hateblo.jp/entry/2020/02/29/214231)
[【JavaScript入門】filterで配列のデータを抽出する方法 | 侍エンジニアブログ](https://www.sejuku.net/blog/21887)

さらに[js アンパサンドと縦線](<./js アンパサンドと縦線.md>)を使って配列内にfalseが含まれた場合、`.filter((v)=>v)`などして値をそのまま入れて出すだけでtrueになる値だけ取り出せる。