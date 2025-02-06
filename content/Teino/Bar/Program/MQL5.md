---
tags:
  - Bar
---

daily:: [2024-05-06](Daily_Note/2024-05-06.md)
up:: [Programming](Programming.md)

MT5で使われる自動化用言語。
ヘッダーも使えるのでほぼ[Cpp](Cpp.md)。

現在のバーはpythonで`rates = mt5.copy_rates_from_pos("EURUSD", mt5.TIMEFRAME_H1, 0, 1)`などとすることで取得できる
一つ前のバーは3600s前なので、(現在のバータイム - 欲しいバータイム)/3600で、欲しいところのバーが何番目なのか分かるはず

テストとして丁度10個前、1684494000を使用する
うまくいった

python
copy_rates_from_pos
バーを抜き出す

MQL5
int OnStart(void)
Startイベントが発生した際に一回だけ実行する
結果を返すことでそのイベントが終了したことを端末に伝えられる
void OnStartもあるが端末に終了を伝えられない古い関数

[OnStart - Event Handling - MQL5 Reference - Reference on algorithmic/automated trading language for MetaTrader 5](https://www.mql5.com/en/docs/event_handlers/onstart)

ちゃんとreturnを付けないとエラーになる

void OnChartEvent()
chartイベントが発生した際に励起する
chartイベントはオブジェクト作ったり、マウスクリックしたりするときに発生する（カスタムイベントも作成可能）

[OnChartEvent - Event Handling - MQL5 Reference - Reference on algorithmic/automated trading language for MetaTrader 5](https://www.mql5.com/en/docs/event_handlers/onchartevent)

一部のイベントは`ChartSetInteger(ChartID(),CHART_EVENT_OBJECT_CREATE,true);`などでフラグを立てて置かないと拾ってくれない
オブジェクトを配置した瞬間に励起するのは`CHARTEVENT_OBJECT_DRAG`

ObjectGetInteger
Object名からオブジェクトを取得し、オブジェクトのInt情報を取り出す
StringならObjectGetStringを、というように使う関数が別になっていることに注意

[ObjectGetInteger - Object Functions - MQL5 Reference - Reference on algorithmic/automated trading language for MetaTrader 5](https://www.mql5.com/en/docs/objects/objectgetinteger)
[Object Properties - Objects Constants - Constants, Enumerations and Structures - MQL5 Reference - Reference on algorithmic/automated trading language for MetaTrader 5](https://www.mql5.com/en/docs/constants/objectconstants/enum_object_property#enum_object_property_string)

TEXT
オブジェクトの配置はxyではなく、時間と値段で決められている。

---

python
numpy関係のもろもろ
[NumPy配列ndarrayの末尾に要素・行・列を追加するappend | note.nkmk.me](https://note.nkmk.me/python-numpy-append/)
[NumPyで空の配列ndarrayを生成するemptyとempty\_like | note.nkmk.me](https://note.nkmk.me/python-numpy-empty-empty-like/)
[NumPyのデータ型dtype一覧とastypeによる変換（キャスト） | note.nkmk.me](https://note.nkmk.me/python-numpy-dtype-astype/)
[NumPyで任意の行・列を削除するnp.deleteの使い方 | note.nkmk.me](https://note.nkmk.me/python-numpy-delete/)

---

スクリプトではOnStart、カスタムインジケータではOnInitと価格データ更新時にOnCalculate、EAではOnInitとOnTickらへんがエントリポイント。

EAからカスタムインジケータの値を使うことは`iCustom`で出来る。グローバル変数を使えば一応スクリプトとかとの連携もできるらしい。
ただまあ、わざわざそれ分ける必要は……まああるか。

CIのOnCalculateのTimeで切り替わりを検知

---

OnCalculate
**Tickが変更されるたびに実行される。**
二種類ある。引数4つの方は`price[]`に前のローソク足全ての始値？　をまとめて入れる。prev_calculatedは直前の呼出しでOnCalculate()が返した値。rates_totalはまだ計算してないローソク足含めた合計値。
10個の方はそれに加え時間含めた詳しいローソク足情報が入るっぽい。

となるとprev_calculatedとrates_totalを比較し、ズレた時だけ実行。
最新の足の時間を`time[]`から取り出し、通貨ペア`ChartSymbol()`と時間足`ChartPeriod()`と一緒にsocket送信。AIに判断してもらって結果を返す。

[ChartSymbol - チャート操作 - MQL5 リファレンス - MetaTrader 5 のためのアルゴリズムの/自動化されたトレーディング言語のリファレンス](https://www.mql5.com/ja/docs/chart_operations/chartsymbol)
[ChartPeriod - チャート操作 - MQL5 リファレンス - MetaTrader 5 のためのアルゴリズムの/自動化されたトレーディング言語のリファレンス](https://www.mql5.com/ja/docs/chart_operations/chartperiod)


[SocketSend - ネットワーク関数 - MQL5 リファレンス - MetaTrader 5 のためのアルゴリズムの/自動化されたトレーディング言語のリファレンス](https://www.mql5.com/ja/docs/network/socketsend)
別スレッドで行うため、カスタムインジケータでは動かせない。
スクリプトかEA。
カスタムインジケータで呼ぶと`Socket connection error: 4014`を返す。
ツール→オプション→エキスパートアドバイザのWebRequestを許可するでlocalhostの登録を忘れずに。

[Runtime Errors - Codes of Errors and Warnings - Constants, Enumerations and Structures - MQL5 Reference - Reference on algorithmic/automated trading language for MetaTrader 5](https://www.mql5.com/en/docs/constants/errorswarnings/errorcodes)

[Network Functions 4014 error - Symbols - General - MQL5 programming forum](https://www.mql5.com/en/forum/349124)

また、送れるのは**バイト配列のみ**。双方でバイト配列からの翻訳機構を作る必要がある。

[StringToCharArray - 変換関数 - MQL5 リファレンス - MetaTrader 5 のためのアルゴリズムの/自動化されたトレーディング言語のリファレンス](https://www.mql5.com/ja/docs/convert/stringtochararray)
MQL5側の文字列toバイト配列。なぜかNULL文字として`\x00`が最後に付く。

---

pythonで文字列を得ることは出来た。
`現在時間,通貨ペア,時間足`という形式でバイト配列で送る。

[定義済み変数 - MQL5 リファレンス - MetaTrader 5 のためのアルゴリズムの/自動化されたトレーディング言語のリファレンス](https://www.mql5.com/ja/docs/predefined)
[iTime - 時系列と指標へのアクセス - MQL5 リファレンス - MetaTrader 5 のためのアルゴリズムの/自動化されたトレーディング言語のリファレンス](https://www.mql5.com/ja/docs/series/itime)
バー時間を取得する関数。
ちなみにTimeGMT()は実行時の時間を取得するので違う。

5,15,16385,16388,16408


MQL5を使用してCSVファイルに追記するプログラムが書きたいです。雛形を書いてください。
プログラムの内容は以下の通りです。

- 取引を開始した際、日付と時間を元にその取引に固有のIDを割り振り、IDに取引開始時間と通貨ペア、見ていた時間足を紐づけて保有する。
- 取引開始後、利確線及び損切線が設定された場合は、それもIDに紐づける。
- 取引終了時、IDとそれに紐づけていたデータをCSV形式で既存のCSVファイルに追記する。


OnTradeTransaction
決済以外のトレード関係操作が発生したら呼び出される。
何で呼ばれたかは第一引数のtransにENUMで含まれてるっぽい。

[OnTradeTransaction - イベント処理 - MQL5 リファレンス - MetaTrader 5 のためのアルゴリズムの/自動化されたトレーディング言語のリファレンス](https://www.mql5.com/ja/docs/event_handlers/ontradetransaction)

注文、ポジション、注文履歴内の注文の三対象。
追加、変更、削除の三操作。
これを掛け合わせた9つに、取引実行に関連しないポジション変更とリクエストの確認通知で11のタイプがある。

注文は取引所への指示。
ポジションは取引結果で保有するもの。
注文が行われてもポジションを持つとは限らない＝約定拒否が有り得るのでこうなる。

[OnTrade - イベント処理 - MQL5 リファレンス - MetaTrader 5 のためのアルゴリズムの/自動化されたトレーディング言語のリファレンス](https://www.mql5.com/ja/docs/event_handlers/ontrade)

## libsocket
cの有名websocket。

[GitHub - warmcat/libwebsockets: canonical libwebsockets.org networking library](https://github.com/warmcat/libwebsockets?tab=readme-ov-file)

まずWindowsでコンパイルする。

[libwebsockets: Notes about building lws](https://libwebsockets.org/lws-api-doc-v4.3-stable/html/md_READMEs_README_build.html)

