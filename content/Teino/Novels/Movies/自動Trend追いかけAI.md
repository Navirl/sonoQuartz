
TrendToPDFを実行
[Google Colab](https://colab.research.google.com/drive/187UQT0vxuOZKhGN4g2jeuI3veabaRypg#scrollTo=fNDsWwgh13km)

リアルタイム性が高い情報、嘘がシャレにならない情報は控える
(特に自然災害系)

md時点でファクトチェック
Perplexityに投げるのが早い

Nolangで台本を用意する
手で台本を整形し、CursorのEdit CSVでCSV化



TrendDify
Googleの検索結果をCustom Search APIで入手する。
[Dify のワークフローで Google の Custom Search API を使って検索する #rag - Qiita](https://qiita.com/k-kariya/items/d91a2c24da42d0109c25)

いろいろ付けられる。
[Method: cse.list  |  Custom Search JSON API  |  Google for Developers](https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?hl=ja)

key,cx,qは必須。
keyはAPIとしてコンソールから登録。
cxはProgrammable Search Engineの検索エンジンID。
[ログイン - Google アカウント](https://programmablesearchengine.google.com/controlpanel/overview?cx=303eb4e2b9b044bb0)
qは検索内容。

その他、地域を決められるlr、
検索結果の個数を決めるnum、
順番雄決めるsort、
日付範囲を決めるdateRestrictなどが使える。

検索結果一つで5万行くらいになるため、データの整形やnum制限は必須。

x.comについてはあまり良い検索結果が得られず断念。(なぜか手で検索すると普通にいいのが出る)



自動化

VOICEVOXから直接取るという方法がある。
テキストの分割が手間でズレやすいので、VIVから音素の分割地点を取りたい。
取れたとしてテキスト分割場所はテキストで指定したい。bashよろしく/で分けてもいいが、日付入力で困りそうな気も。パイプが分かりやすい。あとで考えて。

labファイルを見たところ、音の出るタイミングは音声ファイルによって違う。例えば「hog」と「hoge」はhもoも位置が違う。当たり前。

タイトルだけで音を合わせる必要はない。
なので、要はテキストの分割地点がlabファイル上のどれなのかさえ取得できれば何とかなる。

voicevoxにはメモ機能があり、`[]`で囲んだ文字を読まないようにできる。
これで分割する。

```
a. フィリピンの東で発達中
b. フィリピンの東で[]発達中
```

この二つがある時、aのlabファイルから「発達中」のhの最初の時間を取り出し、bの「フィリピンの東で」アイテムをそこまで伸ばせばいい。

問題はそもそも親切に何と対応しているのかが書かれていないことで。

```
フィリピンの東で発達中,フィリピンの東で
フィリピンの東で発達中,発達中
```

こんな感じのCSVを用意するとする。
「フィリピンの東で発達中」の左から「フィリピンの東で」を検索
ヒット地点から「フィリピンの東で」を削除
…いや駄目だ、「2回だよ2回」みたいなセリフに対応できない。

```
フィリピンの東で発達中,フィリピンの東で
,発達中
```

こんな感じにして、「フィリピンの東で発達中」を消費していく。
左にアイテムがあればそれを設定する。無ければ一つ前のアイテムを取得して削っていく。

テキスト上でどこを切るかはこれでわかるが、lab上でどこを切るかは分からない。
なので結局「フィリピンの東で」も音声合成してモーラを取得する必要がありそう。


そんなことしたら重い。そして同じ音でも微妙に音の長さが違うので、結局ずらしが必要になる気がする。

YMM上で表記されている字幕を音で分割したいだけなのに。

ffsubsyncやPremiereでの外部分割も試したが、バチッと合わない。
一応字幕ファイルを読めるらしいのでsrtで指定できればワンチャンある。
[字幕ファイルをもとにボイス/テキストアイテムを追加する | 饅頭遣いのおもちゃ箱](https://manjubox.net/ymm4/faq/editing/item-from-subtitle-file/)
lab中身
```
0 1000000 pau
1000000 1478165 m
1478165 2557682 a
2557682 4217663 i
4217663 5217663 pau

```

pauからpauで分けて取得できるのは分かる



YMM4上で分割を自動化する。

アイテム
```json
{
  "FilePath": "D:\\Test\\YMMproj\\News\\2024年10月30日-2.ymmp",
  "Timeline": {
    "VideoInfo": {
      "FPS": 30,
      "Hz": 48000,
      "Width": 1080,
      "Height": 1920
    },
    "VerticalLine": {
      "IsEnabled": true,
      "StartFrame": 0,
      "LineType": "Time",
      "Line": {
        "$type": "YukkuriMovieMaker.Project.VerticalTimeLine, YukkuriMovieMaker.Plugin",
        "Span": "00:00:00.5000000"
      },
      "Group": 4
    },
    "Items": [
      {
        "$type": "YukkuriMovieMaker.Project.Items.VoiceItem, YukkuriMovieMaker",
        "IsWaveformEnabled": false,
        "CharacterName": "白上虎太郎_T_NoLang_Cl",
        "Serif": "皆さん、",
        "Decorations": [],
        "Hatsuon": "皆さん、",
        "Pronounce": null,
        "VoiceLength": "00:00:00",
        "VoiceCache": null,
        
```

下の方にLayer設定もある。
n番のレイヤーをn番に合わせる

ymmpの方にもconsonant_lengthとvowel_lengthで分けた記述がある。
区切りを取得した後にこれを参照し、区切り地点より前の値を全て合計し、VoiceLengthとの比を算出し、lengthをそれで割れば長さが出るはず。

さらっと言ってるが、一つ一つの分け記述はこんなん。

```json
"accent_phrases": [
              {
                "moras": [
                  {
                    "text": "ト",
                    "consonant": "t",
                    "consonant_length": 0.035971976816654205,
                    "vowel": "o",
                    "vowel_length": 0.06472104042768478,
                    "pitch": 5.352096080780029
                  },
                  {
                    "text": "ク",
                    "consonant": "k",
                    "consonant_length": 0.09592611342668533,
                    "vowel": "u",
                    "vowel_length": 0.05126107484102249,
                    "pitch": 5.412707805633545
                  },
                  {
                    "text": "ニ",
                    "consonant": "n",
                    "consonant_length": 0.047385863959789276,
                    "vowel": "i",
                    "vowel_length": 0.06964733451604843,
                    "pitch": 5.087202072143555
                  }
                ],
                "accent": 1,
                "pause_mora": null,
                "is_interrogative": false
              },
```

分割部を取得するには、どこのどのテキストなのかを取得する必要がある。
となると一文字ずつにID振ったほうが良いが、これチュとかが一つとして登録されてるのでまあ大変。

~~~
下の方にこんなアイテムがある。

```
"kana": "ト'クニ/チュウモ_ク'/スベ'キワ、タイフ'ウガ/タイワ'ンオ/ツウカ'/_シタ'/ア'トニ/シ'ンロオ/ヒガシヨリニ'/カエル'/カノオセエガ'/ア'ルト/イウ'/ヨホオデ'_ス"
```

記号を除いたkanaがあるとする。（このアイテムがあるのはVOICEVOXだけっぽいので、Hatsuonを使う）`'|/|_`

```
トクニチュウモクスベキワ、タイフウガタイワンオツウカシタアトニシンロオヒガシヨリニカエルカノオセエガアルトイウヨホオデス
```

分けた文章も同じ発音になると信じて、例えば「トクニ」を検索する。
~~~

:分割文字列
タイムライン順には並んでない可能性があるので、Layerで絞り込み、Frame(現在位置)の値でソート。

:発音文字列
accent_phrasesを全部くっつけてリストとする。
(結局VOICEVOX特化だけどまあいいや)
(COEIROだとAccentPhrasesとして平仮名で存在する)

分割文字列側はHatsuon部分を使用。これで切る。`'|/|_`
findも使用する必要なく、lenで長さ取得してaccent_phrasesのどこで切れるかを確認する。
[Pythonで文字列を検索（〜を含むか判定、位置取得） | note.nkmk.me](https://note.nkmk.me/python-str-search/#find-rfind)

`accent_phrases[len(分割文字列)+1]`を取得。
あとは前述の計算で長さとって分割文字列のlengthとして適用。

>ymmpの方にもconsonant_lengthとvowel_lengthで分けた記述がある。
区切りを取得した後にこれを参照し、区切り地点より前の値を全て合計し、VoiceLengthとの比を算出し、lengthをそれで割れば長さが出るはず。

後処理でaccent_phrasesを削っておく。

:分割文字列
長さが縮まるので、その分詰める。
一つ前の調整済みアイテムのlength+Frame+1を、現在のアイテムのFrameとしてセット。そしてまた先ほどの処理を行う。
(1つ目は発音文字列の1つ目に合わせる)


VOICEVOXから直接取るのは手間なので、YMM4を最後のレンダラーとして使用する案。


全く別のアイテムの長さを合わせる場合は？
スタックしといて次の文字列が出たら云々って考えたが、ユースケース少なそう。(対応表が必要になる)

なので対応表無し、上下レイヤーでアイテム数が同一の場合のモードを先に考えたほうがよさそう。
普通にレイヤー絞りフレームソートフレーム取得数値入力で終了する。

[Site Unreachable](https://stackblitz.com/edit/sb1-pdgppd?file=index.html)

最初と最後の部分が抜け、ObjectAなど余計なものがつくが、当初の目的は達成している。





同じやり方でVOICEVOXもできそう。
labでごにょごにょ。
ただYMM4はキャラ設定がとても楽なのだ。そのjsonを流用すればいいけど。


完全自動

VIVから声とる
    synthesisポストでYMM4と同じモーラや長さが取れる
    それができる自家用でしか使えない
        一応スマホでもコアだけ取れば出来そう
Pixabay以下APIから画像取得
    わりと変な画像しか取れない
    NoLangでも結構変な画像ばっか使ってる（やせ菌の話中に寺を表示したり、皆さんの周りで上空からの写真を使ったり）
    ほとんどはWikimedia Commonsからなので、それも検討する
MoviePyで声の長さに合わせてテキストを生成して追加
MoviePyで声の長さに合わせて画像追加
    大きさを画像から自動調整
    縦の
    set_startとset_durationさえあればいい
        なので取った長さを足し引きしていけばいい
    
    
## 画像
Pixabay 

画像取得が一番めんどくさいので、それがパッとできると非常に助かる

commons
rustで取得するやつ(license-formatter)があるので、それをcolabに移植する
手打ちで引用情報取る奴
[Attribution Generator](https://lizenzhinweisgenerator.de/?lang=en)

APIリファレンス
[MediaWiki API help - Wikimedia Commons](https://commons.wikimedia.org/w/api.php)

APIサンドボックス
[API sandbox - Wikimedia Commons](https://commons.wikimedia.org/wiki/Special:ApiSandbox)

検索
[MediaWiki API help - MediaWiki](https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bsearch)

画像情報
[MediaWiki API help - MediaWiki](https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bimageinfo)

searchで語句を設定して検索、imageinfoでpageidを再検索してURLを取得するのが流れ。
しかしsearchでなぜか存在するページがヒットしない。

名前空間(srnamespace)でページのどの部分を検索するかを選択できる。
Fileを使えば画像を検索できるっぽい。
Galleryは画像をまとめたコレクションらしい。
Mediaはメディアファイルそのものを検索するが、仮想的な空間で普段使わないらしい。

Commons内でFile:が使われているのを見るに、通常はFileで良さそう。

資格情報はextmetadataに入っている。
通常は短縮名のLicenseShortName、

github/main
VIVに/accent_phrases
    足し引き済み音素長mora_length[]をとる
/accent_phrasesの結果を使用し/synthesisでwavファイルを取る
    parted_voices[]とそれらをくっつけたone_voice

参考
[VOICEVOX API (エンジン)にHTTPリクエストをするための手引書 #Python - Qiita](https://qiita.com/kaguraluna/items/5c1fbe124bbdd0f33bac)
[MediaWiki API help - MediaWiki](https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bimageinfo)
[Help:Namespaces - Wikimedia Commons](https://commons.wikimedia.org/wiki/Help:Namespaces)
[Google Colab](https://colab.research.google.com/drive/187UQT0vxuOZKhGN4g2jeuI3veabaRypg#scrollTo=UdYixW7DtyQK)