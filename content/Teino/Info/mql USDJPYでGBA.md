---
tags:
  - Info
---

daily:: [2024-05-06](/Daily_Note/2024-05-06.md)
up:: [MQL5](<../Bar/Program/MQL5.md>)

```cpp
//+------------------------------------------------------------------+
//|                                                     SampleEA.mq5 |
//|                        Copyright 2024, MetaQuotes Software Corp. |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property strict

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
    EventSetMillisecondTimer(333);// 1秒ごとにOnTimerを呼び出す
    return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
    EventKillTimer(); // タイマーを停止
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
    // 通常はOnTickは使用しないが、必要に応じて処理を記述
}

void SendHttpRequest(string key) {
    // HTTPリクエストを送信するコード
    // 例えば、WebRequestを使用してリクエストを送信する
    string url;
    StringConcatenate(url,"http://localhost:5000/mgba-http/button/tap?key=",key);
    printf(url);
    string cookie = "";           // クッキー
    string referer = "";        // リファラ
    int timeout = 5000;
    char data[];
    int data_size = 10;
    char result[];
    string rh = "";
    int response = WebRequest("POST",url,cookie,referer,timeout,data,data_size,result,rh);
    
    // レスポンスの内容を処理する
    Print("Response: " + IntegerToString(response));
}

int valuetobit(double former,double present){
   if(former < present){
      return 0;
   }else if(former > present){
      return 1;
   }else{
      return 2;
   }
}

double f_usdjpy_ask = 0;
double f_usdjpy_bid = 0;
double f_eurusd_ask = 0;
double f_eurusd_bid = 0;

//+------------------------------------------------------------------+
//| Timer function                                                   |
//+------------------------------------------------------------------+
void OnTimer()
{
    double usdjpy_ask = SymbolInfoDouble("USDJPY", SYMBOL_ASK); // Askの値を取得
    double usdjpy_bid = SymbolInfoDouble("USDJPY", SYMBOL_BID); // Bidの値を取得

    Print("f_Ask: ", f_usdjpy_ask, "  Ask: ", usdjpy_ask); // コンソールにAskとBidの値を出力
    
    Print("usdjpy: ", IntegerToString(valuetobit(f_usdjpy_ask,usdjpy_ask)));
    
    int uj_ask_i = valuetobit(f_usdjpy_ask,usdjpy_ask);
    int uj_bid_i = valuetobit(f_usdjpy_bid,usdjpy_bid);
    
    switch(uj_ask_i)
    {
      case 0:
         switch(uj_bid_i)
         {
            case 0:
               SendHttpRequest("Up");
               break;
            case 1:
               SendHttpRequest("Down");
               break;
            default:
               SendHttpRequest("A");
               break;
         }
         break;
      case 1:
         switch(uj_bid_i)
         {
            case 0:
               SendHttpRequest("Left");
               break;
            case 1:
               SendHttpRequest("Right");
               break;
            default:
               SendHttpRequest("B");
               break;
         }
         break;
      default:
         switch(uj_bid_i)
         {
            case 0:
               SendHttpRequest("L");
               break;
            case 1:
               SendHttpRequest("R");
               break;
            default:
               if(rand() % 2 == 0){
                  SendHttpRequest("Start");
               }else{
                  SendHttpRequest("Select");
               }
               break;
         }
         break;
    }
 
    //SendHttpRequest();

    f_usdjpy_ask = usdjpy_ask;// Askの値を取得
    f_usdjpy_bid = usdjpy_bid;// Bidの値を取得
    //f_eurusd_ask = eurusd_ask;// Bidの値を取得
    //f_eurusd_bid = eurusd_bid;// Bidの値を取得
    
}

```

WebRequestは独立スレッド系のためカスタムインジケータで動かず、また外部接続なのでストラテジーテスターで動かない。


[Creating Tick Indicators in MQL5 - MQL5 Articles](https://www.mql5.com/en/articles/60)
[Event Handling Functions - Functions - Language Basics - MQL5 Reference - Reference on algorithmic/automated trading language for MetaTrader 5](https://www.mql5.com/en/docs/basis/function/events#oncalculate)
[取引ストラテジーのテスト - MQL5 プログラム - MQL5 リファレンス - MetaTrader 5 のためのアルゴリズムの/自動化されたトレーディング言語のリファレンス](https://www.mql5.com/ja/docs/runtime/testing#alert_etc)
