
### 型の話
elmは値だけでなく、関数にも型がある。
例えばString.lengthは`String -> Int`型。Stringを受けてIntを返す。

複数の引数を持つ、例えば繰り返し回数と文を与え回数分文を繰り返すString.repeatは`Int -> String -> String`。
これは`Int -> (String -> String)`と等しい。つまりあらゆる関数は引数が一つしかない。
もし`(String -> String)`を返してほしい場合、`String.repeat 2`のような指定で返せる。部分適用。このおかげで`List.map (String.repeat 2) ["ha","choo"] == ["haha","choochoo"]`なんてのもできる。

Elmには**データ構造は常に最後の引数である**という慣習がある。

部分適用は分かりにくくなるので、以下のようにしてヘルパー関数を作るのが一般的。自己定義になるのでコメント付けて思い出しやすくするのもいい。

```elm
-- List.map reduplicate ["ha", "choo"]

reduplicate : String -> String
reduplicate string =
  String.repeat 2 string
```

関数
関数名 : 引数 -> (引数) -> 戻り値
関数名 戻り値 = 
  内部処理

### パイプライン
terminalのアレ。関数部分適用を利用し、値に関数を適用していく読みやすい書き方が使える。

```elm
-- BEFORE
sanitize : String -> Maybe Int
sanitize input =
  String.toInt (String.trim input)
```

```elm
-- AFTER
sanitize : String -> Maybe Int
sanitize input =
  input
    |> String.trim
    |> String.toInt
```

ただ長くなりがちなので、3,4個くらいチェインするならヘルパー関数使ったほうがいいかも。

### 型注釈
関数の型には、コンパイラが推論を行うドキュメント、型注釈をつけることができる。

```elm
half : Float -> Float
half n =
  n / 2

-- half 256 == 128
-- half "3" -- error!

hypotenuse : Float -> Float -> Float
hypotenuse a b =
  sqrt (a^2 + b^2)

-- hypotenuse 3 4  == 5
-- hypotenuse 5 12 == 13

checkPower : Int -> String
checkPower powerLevel =
  if powerLevel > 9000 then "It's over 9000!!!" else "Meh"

-- checkPower 9001 == "It's over 9000!!!"
-- checkPower True -- error!
```

コメントと同じく`--`をつける。
型注釈はエラーメッセージにも使われるため、型の質が上がる。

### 型変数
普通はString -> Intのように型 -> 型だが、型以外にも変数指定もできる。

```elm
List.length
<function> : List a -> Int
```

この場合はListの中身をaという変数で受ける。
この型を指定する変数を型変数という。

一部を除き、型変数はどんな型も受け入れる。
なのでallを意味するa。

慣習的に一文字が多いが、頭が小文字なら何文字でもいい。

### 制約付き型変数
以下の型変数は一定の型しか入らない。

- numberにはIntかFloatを当てはめられます
- appendableにはStringかList aを当てはめられます
- comparableにはIntかFloat,Char,String,そしてcomparableな値で構成されるリストまたはタプルを当てはめられます
- compappendにはStringかList comparableを当てはめられます

これらは演算子を使いやすくするためにある。

### 型エイリアス
レコード型という、複数の型をまとめておける型がある。
これをまともに扱うと、毎回中身を正確に書かないと使えず面倒&ミス増える。

こういう時も便利な型エイリアス。
型に別名をつけて扱えるだけの機能だが、まとめるにも便利。

```elm
type alias User =
  { name : String
  , age : Int
  }


-- WITH ALIAS

isOldEnoughToVote : User -> Bool
isOldEnoughToVote user =
  user.age >= 18


-- WITHOUT ALIAS

isOldEnoughToVote : { name : String, age : Int } -> Bool
isOldEnoughToVote user =
  user.age >= 18

```

elmのアーキテクチャ上Modelを受け取ってModelを返すときがある。
Msgも追加する`update`など。

こういうときも型エイリアス。`Msg -> Model -> Model`と書けるのはこのおかげ。書きミスなく変更を一つにまとめられる。

レコードに型エイリアスを作ると、レコードコンストラクターというものが作られる。
初期値を与えてレコードを作れる機能。

```elm
> type alias User = { name : String, age : Int }

> User
<function> : String -> Int -> User

> User "Sue" 58
{ name = "Sue", age = 58 } : User

> User "Tom" 31
{ name = "Tom", age = 31 } : User

>  
```

### カスタム型
ここまでは型の仕様や注釈、使い方の話。
自前の型を作る際は以下。

```elm
type UserStatus = Regular | Visitor
```

type 型名 = 含める型セット(単数可) | 含める型セット(単数可) | ... 

型エイリアスに含めた例。

```elm
type UserStatus
  = Regular
  | Visitor

type alias User =
  { status : UserStatus
  , name : String
  }

thomas = { status = Regular, name = "Thomas" }
kate95 = { status = Visitor, name = "kate95" }
```

ここでRegular, VisitorはStringとかでなく、その名称をした型。
status使用時は引用符なしのRegular, Visitorしか入らない。
これは別に関数とかでもなくそういうもの。(そのため値は一意に定まる)


カスタム型は受け入れる型を「1つ目の型に関連する型」としてセットで持てる。(pythonのsetのことではない)(元の文書では"関連する型"しか明言されてない)
扱い的にはレコード型を持ってる感じだが、一言もレコードって書かれてないし実際違う概念。

なので上記のコードはこのようにまとめられる。

```elm
type User
  = Regular String
  | Visitor String

thomas = Regular "Thomas"
kate95 = Visitor "kate95"
```

この型セットは**数を揃えなくていい**。ここがレコードと違う。
なので以下のことができる。

```elm
> type User
|   = Regular String Int
|   | Visitor String
| 

> Regular
<function> : String -> Int -> User

> Visitor
<function> : String -> User

> Regular "Thomas" 44
Regular "Thomas" 44 : User

> Visitor "kate95"
Visitor "kate95" : User
```


カスタム型を使用することで、同じような関数を型にまとめることができる。
例えば以下。

```elm
type Msg
  = PressedEnter
  | ChangedDraft String
  | ReceivedMessage { user : User, message : String }
  | ClickedExit
```

Stringでもレコードでも何でも持てる。持たないこともできる。


データのローディング中、成功、失敗を分けることもできる。




この機能により、カスタム型は取りうる値の範囲(濃度)が加算になるため、乗算のレコードに比べて大幅に濃度を減らせる。つまりチェックする値範囲が減りバグが減る。
なお発想としてはEnumの模様。他言語でもEnumで同じことができる。

https://guide.elm-lang.jp/appendix/types_as_sets.html

表現力を上げる意味では型エイリアスが使えるが、制限して濃度を下げる用途でカスタム型が使える。
カスタム型で型エイリアスの使い方も出来る気がするが、それをやると多分複雑になりすぎる。元の型のチェックとかも型エイリアスなら使える気がするし、型エイリアスで済む・適切なら型エイリアスのほうが良さそう。

Go言語のtypeはカスタム型にあたる。1つの型である構造体に名前をつける用途に使われ気味っぽいが、もう少しいろいろできる。

https://qiita.com/tenntenn/items/45c568d43e950292bc31

## パターンマッチング

https://guide.elm-lang.jp/types/pattern_matching.html

カスタム型はcaseで分けるのが一般的。
関数によってはカスタム型の使わない引数を受け取ってしまうことがあるが、そのときは`*`で受け取り使わないことを明示する。ワイルドカード。

