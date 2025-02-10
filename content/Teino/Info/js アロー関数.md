---
date: 2023-02-03
tags:
 - Info
---

up:: [JavaScript and TypeScript](<../Bar/Program/JavaScript and TypeScript.md>)

## アロー関数
[無名関数](<./js 無名関数と即時関数.md>)をより簡単に書くための表記。
functionを省略し、引数と処理の間に=>を挟む。
```javascript
let myfun = (x,y) =>{
	return x*y;
}

let result = myfun(3,2);
//6
```
条件が整うと、より簡単に書くこともできる。
### 処理が一文の場合
処理の{}とreturn文を省略できる。
```javascript
let myfun = (x,y) => x*y;

let result = myfun(3,2);
//6
```
### 引数が一つの場合
引数の()を省略できる。
```javascript
let myfun = x =>{
	return console.log('x');
}

let result = myfun("Hellow,world");
//6
```

ちなみに、**引数が無い場合は省略できない。** 空の()を置く必要がある。

[【JavaScript】アロー関数式を学ぶついでにthisも復習する話 - Qiita](https://qiita.com/mejileben/items/69e5facdb60781927929)

[JavaScript アロー関数を説明するよ - Qiita](https://qiita.com/may88seiji/items/4a49c7c78b55d75d693b)

この関数は通常と仕様が違い、宣言時に関数が存在するところをthisとして設定する。
通常は関数自体がthisを持ちそれを使用するが、これはthisを持たず代わりに外部のthisを使用する為。