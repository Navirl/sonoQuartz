---
tags:
 - Info
---

daily:: [2023-02-03](/Daily_Note/2023-02-03.md)
up:: [JavaScript and TypeScript](<../Bar/Program/JavaScript and TypeScript.md>)

## 無名関数と即時関数
### まずは普通の関数（関数宣言）
通常、関数を使う場合はこう書く。
```javascript
function hoge(x,y){
	return x*y;
}
```
また、関数は変数に代入することができる。
```javascript
let myfun = function hoge(x,y){
	return x*y;
}
```
代入した変数に引数を渡すと、中の関数に渡したものとして処理される。
```javascript
let result = myfun(3,2);
//6
```
ちなみに、関数宣言は[ホイスト](ホイスト(Hoisting).md)がかかる。

### 無名関数
ここで、「だったら関数名要らないじゃん」となったのが**無名関数**。
変数への代入時に無名で入力できる。
もちろん引数や戻り値としても使える。
```javascript
let myfun = function (x,y){
	return x*y;
}

let result = myfun(3,2);
//6
```
また、このように関数定義と同時に変数に代入する式を**関数式（関数リテラル）** と呼ぶ。
関数リテラルは**[ホイスト](ホイスト(Hoisting).md)されない。**

なお、マジで無名なわけではなく、.nameをコンソールに出力すると名前がついているのが見える。
### 即時関数
さらに「引数も先に定義すればよくね？」となったのが**即時関数**（IIFE：Invoked Immediatery Function Expression）。
{}の後に();で引数を定義する。セミコロンを忘れずに。
```javascript
let myfun = function (x,y){
	return x*y;
}(3,2);

let result = myfun;
//6
```
### 利点
- 関数の名前を考えなくていい
- 高階関数（関数自体を引数や戻り値として扱うことができる関数）のコードがシンプルになる。
- **[ホイスト(Hoisting)](ホイスト(Hoisting).md)、およびグローバルスコープ名の汚染の回避**

一番下が大きい。


[【JavaScript入門】すぐわかる！無名関数とは | 侍エンジニアブログ](https://www.sejuku.net/blog/60321)

[JavaScriptで即時関数を使う方法【初心者向け】 | TechAcademyマガジン](https://techacademy.jp/magazine/5530)

[【JavaScript】関数定義いろいろ - Qiita](https://qiita.com/tomcky/items/988fc5f56d019e9dc097)