---
date: 2023-02-03
tags:
 - Info
---

up:: [JavaScript and TypeScript](<../Bar/Program/JavaScript and TypeScript.md>)


```js
var result = new Promise(function(resolve) {
 
    resolve(new Date);
 
})
```

`new Promise()`でPromiseオブジェクトができる。これはオブジェクトであり変数に入れられるのがポイント。このオブジェクトには引数として関数を渡すことが出来、その関数の実行が終わるまで待つことが出来る。
引数が欲しい場合は`(resolve) => {resolve(var)}`として、resolve引数に引数として渡せばいい。

で、このthenはチェーンで連結できる。

```js
result
.then(function(data) { return getSomething1(item) })
 
.then(function(item) { return getSomething2(item) })
 
.then(function(item) { getSomething3(item) })
```

~~当然チェーン出来るのはPromiseオブジェクトだけなので、チェーンする場合はreturnでPromiseオブジェクトを受け取ること。~~

thenの場合でも、元の関数階層と同じく戻り値は次のthen内の引数として渡されている。Promiseオブジェクトから辿っていくと当然の帰結。（resolve引数を関数扱いして引数を与えている→resolve引数に関数オブジェクトが入ってる）

これからわかるように、thenは一つずつ処理を済ませていくタイプ。
一方、`Promise.all([Promise...])`で一気にPromiseオブジェクトを実行することもできる。非同期処理を一気に終わらせられて効率が良い。
また、この`.all`もPromiseオブジェクトなので、`.then`をくっつけ次の処理を入れることが出来る。


この処理は非同期であるため、正しく結果が返ってこない可能性もある。
エラーの値を返したいなら`(resolve, reject) => {}`として、resolve同様引数に引数として渡せばいい。というかほぼ確定でresolveとrejectはセット運用するけど。

引数が二つの場合はthen内に関数も二つ入れればOK。

```js
get(url)
.then(function( response ) {
  
    console.log( response );
 
}, function( error ) {
 
 
    //エラー処理を記述する
    console.error( error );
 
})
```

この書き方的に、たぶんresolveとかrejectって分かりやすくしてるだけで、別にどんな名前でもいいんだろうな。

[【JavaScript入門】誰でも分かるPromiseの使い方とサンプル例まとめ！ | 侍エンジニアブログ](https://www.sejuku.net/blog/52314)

ちょっと新しくなると、成功なら.then、失敗なら.catchで受け取れるようになる。
こっちはresolveとrejectがちゃんと紐づいてるらしい。

[JavaScriptのPromiseオブジェクトのcatchメソッドについて現役エンジニアが解説【初心者向け】 | TechAcademyマガジン](https://magazine.techacademy.jp/magazine/36415)

[JavaScriptのPromiseを理解する - Qiita](https://qiita.com/cotton11aq/items/e4719a7deacb7663a0b8)