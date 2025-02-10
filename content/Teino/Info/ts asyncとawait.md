---
date: 2023-02-03
tags:
 - Info
---

up:: [JavaScript and TypeScript](<../Bar/Program/JavaScript and TypeScript.md>)

## ts asyncとawait
Promiseという構文を書きやすくしたシンタックスシュガー。

[js コールバック関数](<./js コールバック関数.md>)
[js Promise](<./js Promise.md>)

Promiseはjavascriptだが、これはtypescript。
asyncを付けた関数内を非同期処理にし、awaitを付けた関数を同期処理する。つまりawait付きの関数は実行が終わるまで待つ。

awaitはasyncが無いと使えないので、awaitを同期処理関数内で使うことはそもそもできない。

```ts
function waitAndAnswer(message:string) : Promise<any> {
    console.log("Wait for 3 second.");
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`You said ${message}`);
        resolve();
    }, 3000);
    });
}

async function exec() {
    console.log("step 1");
    await waitAndAnswer("hi");
    console.log("step 2");
    await waitAndAnswer("konnichiwa");
    console.log("end");    
}

exec();
```


ちなみに内部はこんな感じ。

```js
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function waitAndAnswers(message) {
    console.log("Wait for 3 second.");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`You said ${message}`);
            resolve();
        }, 3000);
    });
}
function exec() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("step 1");
        yield waitAndAnswers("hi");
        console.log("step 2");
        yield waitAndAnswers("konnichiwa");
        console.log("end");
    });
}
exec();
```

ごちゃごちゃしてるが、要はyieldで一旦処理を止め、戻り値が返ってきた＝処理が終わったらコールバックを起動してnext()で進めているだけ。めっちゃ単純。

[Javascript の yield と generator - Qiita](https://qiita.com/TsuyoshiUshio@github/items/18a0fee6034890b8ab03)
[TypeScript の async/await を理解する　その２ async/await - Qiita](https://qiita.com/TsuyoshiUshio@github/items/2681bac9f7a07f21d9ca)
[JavaScriptのyieldを使って関数の実行を一時停止する](https://tokitsubaki.com/javascript-yield-statement/676/)