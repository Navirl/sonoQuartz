---
date: 2025-07-30
time: 13:01
tags:
  - Bar
---

up:: [Programming](<./Programming.md>)

これをここに置くのもなんか違う気がするが。
所謂競技プログラミング。

## input, output

```python
input_line = input()
print("XXXXXX")
```

```go
package main

import (
    "fmt"
    "bufio"
    "os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)

	sc.Scan()
	name := sc.Text()
	fmt.Println(name)
}
```

```ts
import * as fs from "fs";

const inputs = fs.readFileSync(process.stdin.fd, "utf8");
// あるいは
const inputs = fs.readFileSync(0, "utf8");

let outputBuffer = "";
function print(out: string | number | bigint) {
  outputBuffer += out;
}
function println(out: string | number | bigint) {
  print(out);
  print("\n");
}
function flush() {
  console.log(outputBuffer);
}

// ... 省略
for(let i = 0; i < N; ++i) {
  println(ans[i]);
}
flush();

```
[TypeScriptでAtCoderをやってみよう! - Qiita](https://qiita.com/cosocaf/items/255003ecec1d3badfc7b#4-標準出力)

Windowsではパイプを使わないとクラッシュするので、実質入力はテキストファイルを介して行うようになる。
console.logが遅いので一気に出力するようにする。
競プロでTSは一般的ではない。型が大きな値に対応しておらず、対応した型は遅いらしい。一般的なのはC++かpythonかRust。

[TypeScript で AtCoder をやって思ったこと : TRISHAFT](https://tris5572.github.io/blog/posts/2023/2023-06-atcoder-typescript/)
[TypeScriptでAtCoder始めたいからツール作った](https://zenn.dev/soray677/articles/43edde52534b8e)

元ブラウザ用言語が標準入力なんて普段使わないし。
デバッグ用の標準出力がconsole.log()なのはわかるが。

## 分割

```python
inputArray = inputs.split()
```

[Pythonで文字列を分割（区切り文字、改行、正規表現、文字数） \| note.nkmk.me](https://note.nkmk.me/python-split-rsplit-splitlines-re/)
デフォで空白文字区切り。指定するなら文字列で入れる。

```go
import {
    "strings"
}

inputArray := strings.Split(name, " ")
```

[Go言語 Split 文字列を分割して配列にする \| ITSakura](https://itsakura.com/golang-split)
うっかりシングルクォーテーションで指定しないように。

```ts
const inputArray = inputs.split(/\s/);
```