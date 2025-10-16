---
date: 2022-07-28
tags:
 - Info
---

up:: [Programming](<../Bar/Program_lang/Programming.md>)
up:: [JavaScript and TypeScript](<../Bar/Program_lang/JavaScript and TypeScript.md>)

引数として渡す関数をコールバック関数という。

```js
function getDate(callback){
	callback(new Date);
}
```

こんな感じに、引数に別関数を要求しておけば、関数内でその別関数の処理タイミングを自由に決められる。

[高階関数、カリー化](<./高階関数、カリー化.md>)

が、これは例えばこのように階層が深くなると見にくくなる。

```js
getDate(function(data1) {
 
    getSomething1(function(data2) {
    
        getSomething2(function(data3) {
        
            getSomething3(function(data4) {
 
            });
 
        });
 
    });
```

それを解決するのがPromise。