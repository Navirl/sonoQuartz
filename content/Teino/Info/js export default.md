---
tags:
  - Info
---

daily:: [2024-03-02](/Daily_Note/2024-03-02.md)
up:: [js](../Bar/Program/JavaScript%20and%20TypeScript.md)

exportは変数や関数やクラス(ひっくるめてモジュール)を他のファイルから扱えるようにする奴。
これにdefaultを付けると、そのファイルにおいて**そのモジュールだけをexportする**。なので省略して呼び出せる。

```js
//Message.js
const message = "Hello, world!";
export default message;

//Main.js
import message from './Message.js';

console.log(greeting); // "Hello, world!" が出力されます
```

ES6からdefault推奨。
責務が分解できるし、分かる。

また、どのモジュールを呼び出すかすでに決まっているため、名前を変更して呼び出すこともできる。

```js
import greeting_message from './Message.js';
```
