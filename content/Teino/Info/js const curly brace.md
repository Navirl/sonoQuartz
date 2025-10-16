---
date: 2023-03-17
tags:
 - Info
---

up:: [JavaScript and TypeScript](<../Bar/Program_lang/JavaScript and TypeScript.md>)

以下の二つは等価。

```javascript
const {
  abc,
  def
} = Object;
```

```javascript
var abc = Object.abc;
var def = Object.def;
```

要はオブジェクトプロパティをそのままどこかで使いたいときに短く書ける記法。
配列でも同じような記法が使える。

```javascript
const a = items[0];
const b = items[1];
const c = items[2];

// Can be written as:
const [a, b, c] = items;
```