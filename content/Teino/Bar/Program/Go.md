---
tags:
  - Bar
---

daily:: [2024-01-29](Daily_Note/2024-01-29.md)
up:: [Programming](<./Programming.md>)

[Rust](<./Rust.md>)と並び立つ有名言語。
Googleが管理しているのでRustより安心感がある。

`var name string`のように変数を宣言できるが、`name := "str"`で直接型推論しながら変数宣言できるのが特徴。

## 名づけ慣習
頭小文字はprivate変数、大文字はpublic変数。
2単語以上はキャメルケース。

`package`はそのファイルのコード自体に名前をつけてるっぽい？

## 出力
`fmt.Println()`。python2っぽい`fmt.Printf()`もある。
Printfは`%`と文字でいろいろ事前フォーマット可能。`%v`で直接か`%s`で文字列が使いやすそう。`%T`で型が出せる。
[fmt.Printfなんかこわくない #Go - Qiita](https://qiita.com/rock619/items/14eb2b32f189514b5c3c#v-2)

## 標準入力
`bufio.NewScanner`でos.Stdinを拾い、.Scan()する。
スキャン結果は.Text()で取得。
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
	fmt.Println("Hello " + name)
}
```

## 値変換
str->intなら`strconv.Atoi(str)`で変換。戻り値は(int,error)なので`v, _ := strconv.Atoi(str)`などで対処。
反対は`strconv.Itoa(int)`。
他のstr->値は`strconv.ParseFloat(str,size)`など。逆は`strconv.FormatFloat(float, byte, precision, size)`など。
[【Golang】文字列と数値の変換(strconv) #Go - Qiita](https://qiita.com/mei4n/items/308e75092e2a058d75f2)
[strconv package - strconv - Go Packages](https://pkg.go.dev/strconv@go1.19)

## if
pythonぽいが、`{}`で囲む。おわり。

## 三項演算
ない。ifで地道に割る。
複雑になりすぎるかららしい。
[Goに三項演算子が採用されない理由](https://zenn.dev/nobonobo/articles/09d884f1f520d6)


## flag
コマンドライン引数を解析するライブラリ。
import "flag"


引数を入れる変数を定義→
関数に変数ポインタ渡してバインド→
解析(代入)

という流れ。

定義とバインドは同時に行えるが、そうするとポインタが返されるので`*`を使い実数値を取得することになる。

## type
typeは[Elm](<./Elm.md>)でいうカスタム型。
[Goを学びたての人が誤解しがちなtypeと構造体について #golang #Go - Qiita](https://qiita.com/tenntenn/items/45c568d43e950292bc31)