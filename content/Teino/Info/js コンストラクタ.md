---
date: 2023-02-03
tags:
 - Info
---

up:: [JavaScript and TypeScript](<../Bar/Program_lang/JavaScript and TypeScript.md>)

## コンストラクタ
ES6以前はクラスの概念はなかった。
そもそもコンストラクタとは日本語で構築子と書き、**インスタンスを作り初期化する関数** のことを指している。

そのため**昔の** Javascriptでよく見るコンストラクタとは以下のもの。
```javascript
function Person(name, age){
  this.name = name;
  this.age = age;
}
//呼び出すことでPerson関数のメソッドとしてnameとageを定義する関数(コンストラクタ)
//C++みたいにコンストラクタで先に変数定義！　とかしなくていい
//さらにreturnも書かなくていい

let person1 = new Person(”太郎”, 22);
let person2 = new Person("次郎", 18);
//newをつけることで別々のものとしてインスタンスが作成できる
/*なお書き方がシンプルでないこと、
　関数リテラルや関数宣言に比べパフォーマンスに劣ることなどから、
　この関数コンストラクタは推奨されていない*/

console.log( person1.name );
console.log( person1.age );

console.log( person2.name );
console.log( person2.age );

```
言うまでもないが、今のJavascriptでこういうことをしたいならクラスを使えばいい。