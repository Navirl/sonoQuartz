---
date: 2023-03-02
tags:
 - Info
aliases:
 - DP
 - 動的計画法
---

up:: [Programming](<../Bar/Program/Programming.md>)

対象を複数の部分問題に分割し、部分問題の計算結果を記録しながら解いていく手法。
フィボナッチ数列を解くときとか。

普通に再帰プログラム組むと一つずつゴリ押しで解き時間がかかるが、一つ前の計算結果を記録しておけば圧倒的速度で終えられる。

フィボなら想像できるが、実際に使うときはもっと複雑。
というわけでまずはA問題。

## A 問題 - Frog 1
$N$ 個の足場があって、$i$ 番目の足場の高さは $h_i$ です。<br>
最初、足場 $1$ にカエルがいて、ぴょんぴょん跳ねながら足場 $N$ へと向かいます。カエルは足場 $i$ にいるときに

足場 $i$ から足場 $i+1$ へと移動する (そのコストは $|h_i - h_{i+1}|$)
足場 $i$ から足場 $i+2$ へと移動する (そのコストは $|h_i - h_{i+2}|$)

のいずれかの行動を選べます。カエルが足場 $1$ から足場 $N$ へと移動するのに必要な最小コストを求めよ。

![https://camo.qiitausercontent.com/726389f3cf29fbd6916b6cf92b966d0e65d587fc/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f31386363303339662d666232652d663839352d353332632d6265383663336564373566632e6a706567](https://camo.qiitausercontent.com/726389f3cf29fbd6916b6cf92b966d0e65d587fc/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f31386363303339662d666232652d663839352d353332632d6265383663336564373566632e6a706567)

まずは各値を格納するための配列を用意。DP値という。
これを1から埋めていけば、最小が分かる。

![https://camo.qiitausercontent.com/37c56225a1f7b2da51c5372509bd983cf0493263/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f35373139343631322d323934332d643664392d643461362d3466306165393837323864342e6a706567](https://camo.qiitausercontent.com/37c56225a1f7b2da51c5372509bd983cf0493263/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f35373139343631322d323934332d643664392d643461362d3466306165393837323864342e6a706567)

ノード2は1からしか飛べないので、コスト7。

![https://camo.qiitausercontent.com/d3fb1d767b3a36e687e32b60e54c8e7740292a93/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f36643636646262362d316234382d383930332d643834362d3434623136623363353030612e6a706567](https://camo.qiitausercontent.com/d3fb1d767b3a36e687e32b60e54c8e7740292a93/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f36643636646262362d316234382d383930332d643834362d3434623136623363353030612e6a706567)

ノード3は1か2から飛べる。
この時、**双方のコストを比較**し低い方を扱う。

![https://camo.qiitausercontent.com/5e9d27280d6444d3ce38c3ad5534bbd7439d49dd/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f64316532613539352d333639392d623534392d643362352d3330393537376333306463372e6a706567](https://camo.qiitausercontent.com/5e9d27280d6444d3ce38c3ad5534bbd7439d49dd/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f64316532613539352d333639392d623534392d643362352d3330393537376333306463372e6a706567)

ノード3以降も同じように埋めていく。

![https://camo.qiitausercontent.com/fa58c7e423b6a510c8464f80d18215590870685f/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f33326331633738352d663761642d636231382d336231642d6533346432306365633662372e6a706567](https://camo.qiitausercontent.com/fa58c7e423b6a510c8464f80d18215590870685f/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3138323936332f33326331633738352d663761642d636231382d336231642d6533346432306365633662372e6a706567)

これで最終的なコスト、8が出せる。
訊かれてるのはあくまで最終コストであり、そこに至る道筋とかは無くていいのでこの計算方法が効く。

### 貰うDP
というわけで先ほどの問題を制約$2 \le N \le 10^{5}$で解く。

```cpp
template<class T> inline bool chmin(T& a, T b){
	if(a > b){
		a = b;
		return true;
	}
	return false;
}

void main(){
	for(int i = 0;i < 10000;i++){
		
	}
}
```

と思ったけど、cppで文字式ってどうやって出力すればいいんだ？
このテンプレートはa=bしかない、b=aになる式は無いし必要ない。

考察読む。`dp[i]`がコストになるとき、まだ飛んでない`dp[0]`のコストは0。
計算してない部分のコストは`INF`を入れて計算できるようにする。
ノードiへ飛ぶコストは
```cpp
chmin(dp[i],  dp[i - 1] + abs(h[i] - h[i - 1]));
chmin(dp[i],  dp[i - 2] + abs(h[i] - h[i - 2]));
```
と二連で比較すればOK。`dp[i]`はDPテーブル上のi番目の最小コスト、`dp[i - 1]`はDPテーブル上の一つ前の最小コスト、`h[i]`はi番目のノードが持つコスト、`abs(h[i] - h[i - 1])`は一つ前からi番目に飛んだ時のコスト。なので`dp[i - 1] + abs(h[i] - h[i - 1])`は`dp[i]`に入るかもしれない最小コストの一例になる。`dp[i]`はもともとINFなので最初は必ず`dp[i - 1] + abs(h[i] - h[i - 1])`のほうが小さくなり`dp[i]`になる。
ただし`dp[1]`は2つ目ないので注意。

正解はこちら。
定義しなきゃいけない各コスト、そしてN回の部分は`cin >> `で入力してもらう。

```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return 1; } return 0; }
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return 1; } return 0; }

const long long INF = 1LL << 60;

// 入力
int N;
long long h[100010];

// DP テーブル
long long dp[100010];

int main() {
    int N; cin >> N;
    for (int i = 0; i < N; ++i) cin >> h[i];

    // 初期化 (最小化問題なので INF に初期化)
    for (int i = 0; i < 100010; ++i) dp[i] = INF;

    // 初期条件
    dp[0] = 0;

    // ループ
    for (int i = 1; i < N; ++i) {
        chmin(dp[i], dp[i - 1] + abs(h[i] - h[i - 1]));
        if (i > 1) chmin(dp[i], dp[i - 2] + abs(h[i] - h[i - 2]));
    }

    // 答え
    cout << dp[N-1] << endl;
}
```
0番目が1本目になるので、N本目はDPテーブル上だとN-1番目になることに注意。
これが貰うDP、前の値を貰う式になる。

### 配るDP
こちらではあるノードから先のノードを考える。
i番目からi+1に飛んだ時のi+1のコスト、同じくi+2のコストを算出する。比較部分はこう。

```cpp
chmin(dp[i + 1],  dp[i + 1] + abs(h[i] - h[i + 1]));
chmin(dp[i + 2],  dp[i + 2] + abs(h[i] - h[i + 2]));
```

要素数二つ分余計に出る代わりに、1つ目のif計算が必要なくなるはず。

```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return 1; } return 0; }
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return 1; } return 0; }

const long long INF = 1LL << 60;

// 入力
int N;
long long h[100010];

// DP テーブル
long long dp[100010];

int main() {
    int N; cin >> N;
    for (int i = 0; i < N; ++i) cin >> h[i];

    // 初期化 (最小化問題なので INF に初期化)
    for (int i = 0; i < 100010; ++i) dp[i] = INF;

    // 初期条件
    dp[0] = 0;

    // ループ
    for (int i = 0; i < N; ++i) {
		chmin(dp[i + 1],  dp[i + 1] + abs(h[i] - h[i + 1]));
		chmin(dp[i + 2],  dp[i + 2] + abs(h[i] - h[i + 2]));
    }

    // 答え
    cout << dp[N-1] << endl;
}
```
### メモ化再帰

再帰関数の途中までの計算処理をメモする。
貰うDPは前から、配るDPは後ろへなら、このメモ化再帰は「再帰関数で都度計算しつつすでに答えが出てる部分はifで弾く」ということをする。最もif文を酷使するDP。

別の言い方でいうなら前二つが漸化式、これが全探索のメモ化。
漸化式もメモってるので本来同じだが。

```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return true; } return false; }
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return true; } return false; }

const long long INF = 1LL << 60;

// 入力
int N;
long long h[100010];

// メモ用の DP テーブル
long long dp[100010];

long long rec(int i) {
    // DP の値が更新されていたらそのままリターン
    if (dp[i] < INF) return dp[i];

    // 足場 0 のコストは 0
    if (i == 0) return 0;

    // i-1, i-2 それぞれ試す
    long long res = INF;
    chmin(res, rec(i-1) + abs(h[i] - h[i - 1])); // 足場 i-1 から来た場合
    if (i > 1) chmin(res, rec(i-2) + abs(h[i] - h[i - 2])); // 足場 i-2 から来た場合

    // 結果をメモしながら、返す
    return dp[i] = res;
}

int main() {
    int N; cin >> N;
    for (int i = 0; i < N; ++i) cin >> h[i];

    // 初期化 (最小化問題なので INF に初期化)
    for (int i = 0; i < 100010; ++i) dp[i] = INF;

    // 答え
    cout << rec(N-1) << endl;
}
```

答案提出部で直接再帰関数を動かしてよし。

[動的計画法超入門！ Educational DP Contest の A ～ E 問題の解説と類題集 - Qiita](https://qiita.com/drken/items/dc53c683d6de8aeacf5a#3-a-%E5%95%8F%E9%A1%8C%E3%81%8B%E3%82%89-e-%E5%95%8F%E9%A1%8C%E3%81%BE%E3%81%A7)

## B 問題 - Frog 2

【問題概要】
$N$ 個の足場があって、$i$ 番目の足場の高さは $h_i$ です。
最初、足場 $1$ にカエルがいて、ぴょんぴょん跳ねながら足場 $N$ へと向かいます。カエルは足場 $i$ にいるときに


足場 $i$ から足場 $i+1$ へと移動する (そのコストは $|h_i - h_{i+1}|$)
足場 $i$ から足場 $i+2$ へと移動する (そのコストは $|h_i - h_{i+2}|$)
...
足場 $i$ から足場 $i+K$ へと移動する (そのコストは $|h_i - h_{i+K}|$)


のいずれかの行動を選べます。カエルが足場 $1$ から足場 $N$ へと移動するのに必要な最小コストを求めよ。

【制約】


$2 \le N \le 10^{5}$
$1 \le K \le 100$

### まずは自分で
配るDPでやってみる。
比較する部分がKになったので、そこをcinで入れてfor突っ込めばいいはず。
iにいるときに+kまで飛べると考えると、これ都度cin必要なのでは。

```cpp
chmin(dp[i + j],  dp[i + j] + abs(h[i] - h[i + j]));
```

```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return 1; } return 0; }
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return 1; } return 0; }

const long long INF = 1LL << 60;

// 入力
int N;
long long h[100010];

// DP テーブル
long long dp[100010];

int main() {
    int N; cin >> N;
    for (int i = 0; i < N; ++i) cin >> h[i];

    // 初期化 (最小化問題なので INF に初期化)
    for (int i = 0; i < 100010; ++i) dp[i] = INF;

    // 初期条件
    dp[0] = 0;
    int K;

    // ループ
    for (int i = 0; i < N; ++i) {
	    cin >> K;
	    for(int j = 1;j < K;++j){
		    chmin(dp[i + j],  dp[i + j] + abs(h[i] - h[i + j]));
	    }
	}

    // 答え
    cout << dp[N-1] << endl;
}
```

### 解答
```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return true; } return false; }
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return true; } return false; }

const long long INF = 1LL << 60;

// 入力
int N;
long long h[110000];

// DP テーブル
long long dp[110000];

int main() {
    int N, K; cin >> N >> K;
    for (int i = 0; i < N; ++i) cin >> h[i];

    // 初期化 (最小化問題なので INF に初期化)
    for (int i = 0; i < 110000; ++i) dp[i] = INF;

    // 初期条件
    dp[0] = 0;

    // ループ
    for (int i = 0; i < N; ++i) {
        for (int j = 1; j <= K; ++j) {
            chmin(dp[i + j], dp[i] + abs(h[i] - h[i + j]));
        }
    }

    // 答え
    cout << dp[N-1] << endl;
}
```

Kは固定値。Nと一緒に確定していい。
コストが必要だから0から始めてるNループと違い、KのループはKまでやらなきゃいけないので、`<=`にしておくこと。

## C 問題 - Vacation
【問題概要】
$N$ 日間の夏休みです。$i$ 日目には、

A: 海で泳ぐ。幸福度 $a_i$ を加算
B: 山で虫取りする。幸福度 $b_i$ を加算
C: 家で宿題をする。幸福度 $c_i$ を加算

の三択の中から好きなものを選ぶことができます。ただし、2 日連続で A, B, C のうちの同一種類の活動を選択をすることはできません。この制約下で最終的に得られる幸福度の総和を最大にせよ。

【制約】


$1 \le N \le 10^{5}$

### キーポイント

-   DP テーブルに添字を付け加えて拡張する

### 自分
とりあえずテンプレ部分を。
```cpp
template<T>chmin(T& a,T b){
	if(a > b){
		a = b;
		return true;
	}
	return false;
}
```

```cpp
template<class T> inline bool chmin(T& a, T b){
	if(a > b){
		a = b;
		return true;
	}
	return false;
}

void main(){
	for(int i = 0;i < 10000;i++){
		
	}
}
```

- `template<class T>`とする
- inlineとboolを関数名の前に

```cpp
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return true; } return false; }
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return true; } return false; }

int main(){
	
}
```

```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return true; } return false; }
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return true; } return false; }

const long long INF = 1LL << 60;

long long h[110000];

// DP テーブル
long long dp[110000];

int main() {
    int N, K; cin >> N >> K;
    for (int i = 0; i < N; ++i) cin >> h[i];

    // 初期化 
    for (int i = 0; i < 110000; ++i) dp[i] = INF;

}
```

```
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;
```
を追加
`long long`は8バイト、すなわち64ビット型。c99というやつからの互換性らしい。
ちなみにlongは4バイト、shortが2バイト。intは実行PCによって2だったり4だったり。
`1LL`は1をlong long型で表現するという意味。それを60回左シフトしてINF扱いにしている。
これをconstで定義すれば変化しないINFが完成する。
同じく配列もlong long型で生成しておく。

[long long型 - cpprefjp C++日本語リファレンス](https://cpprefjp.github.io/lang/cpp11/long_long_type.html)

やっと書き始められる。

……ここまで用意して気づいたけど、そうか二次元テーブル必要な最大問題かこれ。

例えば3,2,1、以前の数字無し、6回の足し算最大に、だったらまず323232を考える。この合計は15。
貰うDPでやると、前回値がmax以外ならmax追加。maxならmax-1追加。その一つ前はmax以外ならmax追加。maxならmax-1追加。……そんな簡単なことある？　1個目はN奇数対策でmax。

いや問題文を見るにabcは数列っぽいし、日によってカードが変わる問題？
とりあえず固定と考えて進める。

```cpp
template<class T> inline bool chmin(T& a, T b){ if ( a > b) { a = b; return true; } return false; }
template<class T> inline bool chmax(T& a, T b){ if ( a < b) { a = b; return true; } return false; }

const long long INF = 1LL << 60;

long long h[3];

long long dp[110000][2];

int main(){
	//初期化
	for(int i = 0; i < 3 ; ++i ){
		cin >> h[i];
	}
	int N; cin >> N;

	for(int i = 0; i < N ; ++i ){
		dp[i][0] = 0;
		dp[i][1] = 0;
	}

	dp[0] = 0;
	for(int i = 0; i < 3 ; ++i ){
		if(chmax(dp[0][0], h[i])){ dp[0][1] = i};
	}

	//DP
	for(int i = 0; i < N ; ++i ){
		for(int j = 0; j < 3 ; ++j ){
			if(dp[i][1] != j){
				if(chmax(dp[i][0], h[j])){ dp[i][1] = j};
			}
		}
	}
	
	cout << dp[N-1] << endl;
	
}

```

### 解答
```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return true; } return false; }
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return true; } return false; }

// 入力
int N;
long long a[100010][3]; // a[i], b[i], c[i] をそれぞれまとめて a[i][0], a[i][1], a[i][2] にしてしまう

// DP テーブル
long long dp[100010][3];

int main() {
    int N; cin >> N;
    for (int i = 0; i < N; ++i) for (int j = 0; j < 3; ++j) cin >> a[i][j];

    // 初期化は既に 0 に初期化される
    // 初期条件も既に 0 で OK

    // ループ
    for (int i = 0; i < N; ++i) {
        for (int j = 0; j < 3; ++j) {
            for (int k = 0; k < 3; ++k) {
                if (j == k) continue;
                chmax(dp[i + 1][k], dp[i][j] + a[i][k]);
            }
        }
    }

    // 答え
    long long res = 0;
    for (int j = 0; j < 3; ++j) chmax(res, dp[N][j]);
    cout << res << endl;
}
```

`a[i][]`はi日ごとの用意してるカード。毎日どれが最大になるかは違う。
cppの否定は`!=`、`!()`などがあるが、そもそも否定があると読みにくいので`continue;`で外に出すのがいい。
初日はそのまま、`[0]`、`[1]`、`[2]`にそれぞれabcの値が入る。
あとはdpの一個先に、前日＋本日のカード値を入れてはchmax比較。つまり常に高い値の方を選ぶようにしてdpを進めていく。

最終的に三つ用意された`dp[N][j]`で、どれが一番値が高いかを比較して提出。

ポイントは、組み合わせは無数にあるものの、最大を選ぶなら初期値さえ決まれば**最適な値はすでに決まっている**ということ。
なので最終で比較する値は三つで済む。

## D 問題 - Knapsack 1
【問題概要】
$N$ 個の品物があって、$i$ 番目の品物の重さは $w_i$、価値は $v_i$ で与えられている。
この $N$ 個の品物から「重さの総和が $W$ を超えないように」いくつか選びます。このとき選んだ品物の価値の総和の最大値を求めよ。

【制約】


$1 \le N \le 100$
$1 \le W \le 10^5$
$1 \le w_i \le W$
$1 \le v_i \le 10^9$
入力はすべて整数

### キーポイント

ナップサック DP
「部分和」を DP テーブルの添字に付け加える

### 自分
ナップサックの時間だオラァ！
もう考えたくないがそれでも。

Wは最小値問題、ｖは最大値問題。
ｖを先に解いて、計算がはみ出た瞬間に切って……ってそれただの再帰関数では。
でもこれ単純に前が決まったら次の値が一意に定まるわけじゃないぞ。メモ化再帰しかない気がする。
それはつまり部分和が何個出来るのかわからない……わけじゃないな、最大重さは10^5だから100全てがこれだった場合以上に最適組合せは増えないはず。

重さがはみ出ない中で最も価値あるものを常に入れる。

```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return true; } return false; }
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return true; } return false; }

const long long INF = 1LL << 60;

// 入力
int N; int W;
long long a[110][2]; //品物の価値と重さ

long long dp[110][2]; //総計の価値と重さ

int main(){
	//初期化
	int N; cin >> N;
	int W; cin >> W;
	
	for(int i = 0; i < N ; ++i ){
		cin >> a[i][0];
		cin >> a[i][1];
	}

	for(int i = 0; i < N; ++i){
		dp[i][0] = a[i][0];
		dp[i][1] = a[i][1];
	}	

	for(int i = 1; i < N; ++i){
		for(int j = 0; j < N; ++j){
			if(dp[i][1] + a[j][1] > W) {continue;}
			if(chmax(dp[i][0], dp[i - 1][0] + a[j][0])){ dp[i][1] = dp[i][1] + a[j][1]; }
		}
	}

	long long rec = 0;
	for(int i = 0; i < N; ++i){
			chmax(rec, dp[i][0]);
	}
	
	cout << rec << endl;
}

```

### 解答
```cpp
#include <iostream>
using namespace std;
template<class T> inline bool chmax(T& a, T b) { if (a < b) { a = b; return true; } return false; }
template<class T> inline bool chmin(T& a, T b) { if (a > b) { a = b; return true; } return false; }
const long long INF = 1LL<<60;

// 入力
int N;
long long W, weight[110], value[110]; // 品物の個数は 100 個なので少し余裕持たせてサイズ 110 に

// DPテーブル
long long dp[110][100100] = {0};

int main() {
    cin >> N >> W;
    for (int i = 0; i < N; ++i) cin >> weight[i] >> value[i];

    // DPループ
    for (int i = 0; i < N; ++i) {
        for (int sum_w = 0; sum_w <= W; ++sum_w) {

            // i 番目の品物を選ぶ場合
            if (sum_w - weight[i] >= 0) {
                chmax(dp[i+1][sum_w], dp[i][sum_w - weight[i]] + value[i]);
            }

            // i 番目の品物を選ばない場合
            chmax(dp[i+1][sum_w], dp[i][sum_w]);
        }
    }

    // 最適値の出力
    cout << dp[N][W] << endl;
}
```

cinはNとWに同時に
同じく`weight[i]とvalue[i]`に同時に入れる。
`weight[i]とvalue[i]`は一次元配列でそれぞれ定義。

Ｎ、要素数の最大値迄回す関数と
W、重さの最大値迄回す関数。

