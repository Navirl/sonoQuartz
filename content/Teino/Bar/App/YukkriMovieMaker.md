---
tags:
  - Bar
aliases:
  - YMM
---

daily:: [2024-04-27](Daily_Note/2024-04-27.md)
up:: 

[ymm short](../../Info/ymm%20short.md)


[ymm 目パチ口パク実ボイス動画](../../Info/ymm%20目パチ口パク実ボイス動画.md)


## 砕け散る
変なとこで切れているのは画面端。
通常ズレないが、グループ制御で物体を動かすとズレてしまう。

## 基本
[【YMM4】初心者っぽい編集から脱するためのいくつかのヒント｜Bluemist](https://note.com/bluemist/n/nf77df5735324)

## 削除
グループ（合成）にした際、これがあるとその部分を切り抜ける。
合成内でこれ以下のオブジェクトは削除され、グループ外の下のオブジェクトが見える状態になる。そのためグループ外に背景用オブジェクト必須。

複数グループを使用する場合は、一番下（タイムライン上では上）だけ削除にすればいい。

デプス削除を使用する場面は多くない。単純な形状で切り抜けない木の枝とかの時、斜めの物体が無くzが明確な時等。
物体のカメラとの距離で切り取ってるだけなので、**斜めの物体を綺麗に削除できない**。

その場合はポイント指定のセグメンテーションを行えばいい。
端っこが雑になるが境界ぼかしで誤魔化す。よほど細いもの相手じゃなければこれで行ける。

が、単純な形状で切り抜けるならもうそれでいいやん。

1f目が切り抜けないことがあるが、WebPとか動画アイテムで切り抜くときの弊害？


## 背景
どのレイヤーにいても強制的に一番後ろに飛ばす。


## 場面切替
別々のアイテム同士で処理をしている。
そのためグループ制御（合成）を全体に効かせた切れ目のない一アイテムだと、「勝手に画像内で切り替わっている」扱いになり感知できない。ちゃんと区切る。
「縁取り用にグループ合成を全体にかけて使用している」などのユースケースで当たる。

逆にまとめることで場面切替を無効化するテクニックの方が使いそう。

場面切替の為に画面を複製して重ねてるっぽい。
なので画面複製（画面外領域ON）で拡大率を下げ、これより下に置くと、複製でカットされた部分を複製で修正される前に場面切替による複製が入るため、周囲に黒味が入る。

すぐ思いつくのはグループ制御で何とかする方法。

## 口パク
立ち絵なら設定しとけばOK。

立ち絵が一定してないのに口パクしなければならないことがある。
その場合は縦一列に開き→閉じのループを並べ、必要な数コピー。
その後横一列に整列を掛ければ簡単に口パクできる。

形を変えるだけなら反復拡大縮小でも仕込めばいい。


## 音楽
ハイテンポ・アップテンポのテクノトランスが作業用におすすめ。

## 透過動画読み込み
webm、mov、proresなどが透過動画をサポートしている
しかしYMM4にそれらの透過情報を読み込むことは出来ない

なのでwebpを使用する（apngは非対応、ただし連番pngは最初選んだら動画として使える）、これは動く立ち絵の形式として採用されている
YMM4上では動画として扱われるので心配なし、ただちょっと重いのとIrfanviewやxnviewじゃないと確認できない

```
$videos = Get-ChildItem -Path "$PSScriptRoot\source" -Include "*.avi" -Recurse -File
# $outputPath = "$PSScriptRoot\converted\"
# New-Item -ItemType Directory -Force -Path $outputPath
foreach ($video in $videos) {
    $name = $video.BaseName
    $outputPath = Split-Path $video -Parent
    ffmpeg -i $video.FullName -c:v libwebp_anim -lossless 1 -compression_level 6 -loop 0 "$outputPath\$($name)_aw.webp"
}

$userInput = Read-Host "AVIファイルを削除しますか。[y/N]"
$removeBool = $userInput -eq "y"
if($removeBool){
    foreach ($video in $videos) {
        Remove-Item -Force $video
    }
    Write-Host "AVIファイルの削除が完了しました。"
}
Read-Host
```

先駆者
libwebp_animである点に注意
これにしないとフレームが更新されず重なってしまう
他の記事だとlibwebpだが、それは古い情報なので注意
compression_levelは指定しとくと軽くなるが処理に時間がかかる、ちなデフォ4
[【YMM4】『YMM4ひとくちTIPS - その02』の補足｜L.A.D.](https://note.com/laminadolor/n/ncb29aeee1f9e)

公式
libwebp_animが無いのでloopの解説もない
[FFmpeg Codecs Documentation](https://ffmpeg.org/ffmpeg-codecs.html)

presetは被写体によって変わる
losslessは0で不可逆のフラグ、1をqualityと一緒にすると変換できない動画もある
[ffmpegでアニメーションWebPを作るコマンドオプションメモ\[倍速\]\[fps\]\[解像度\] - まだ中学生のブログ](https://madachugakusei.hatenablog.com/entry/2016/10/08/225950)

qscaleは今は無い
[ffmpeg で アニメーションWebP（Animated WebP）を作る | ニコラボ](https://nico-lab.net/create_animated_webp_with_ffmpeg/)

品質は80以上はほぼ見分けがつかない
[実際の業務でWebPを使うときのおすすめ変換パラメーター JPEG/PNG編 #画像処理 - Qiita](https://qiita.com/miyanaga/items/45a8fb7683f475287f8b)

色がくすむという話だが、animated webpもくすむという話はいまいち出てこない
なので気にしない

静止webpはuse_sharp_yuvで色変化を抑えられる
しかしこのオプションをffmpegがサポートしてない
cwebpなら対応してるらしいが、これは静止画のみ
[WebP の色劣化問題の改善 #YUV420 - Qiita](https://qiita.com/yoya/items/f5ef9b66b556eda9e6bf)



webp画質参考
[movie2image test(gif/apng/WebP)](https://bu-kurokky.github.io/presentension/benchmark/img_test.html)

## 高速化
もろもろの高速化プラグインがある
[HighSpeedVideoReaderPlugin - YMM4プラグイン](https://ymm4plugin.wiki.fc2.com/wiki/HighSpeedVideoReaderPlugin)

## 電車
[電車揺れのような微振動と振動の繰り返しを表現する - ymm4note](https://scrapbox.io/ymm4note/電車揺れのような微振動と振動の繰り返しを表現する)

## 黒板落書き
[黒板落書き風|エッジ抽出と抽象化 - ymm4note](https://scrapbox.io/ymm4note/黒板落書き風%7Cエッジ抽出と抽象化)
## 立体化
影を画像にして消失点を弄れば3Ⅾ的に厚みを出せる。
[YMM4だけで開いた3Dぽいドア素材を作る - ymm4note](https://scrapbox.io/ymm4note/YMM4だけで開いた3Dぽいドア素材を作る)

## 喋るときにエフェクト
立ち絵素材には喋る瞬間にかけるエフェクトを設定する場所がある。

[YMM4だけでADVゲーム風メッセージ＆ぴょこぴょこさせる - ymm4note](https://scrapbox.io/ymm4note/YMM4だけでADVゲーム風メッセージ＆ぴょこぴょこさせる)

## グリッチ
一応手で作れる。ただしノイズ素材必要。

[【YMM4解説単発】YMM4だけでグリッチ効果を作ってみる【ゆっくりMovieMaker4】 - YouTube](https://www.youtube.com/watch?v=Tq7kThGtqSU)

## 画面等分
ちまちま大きさ揃えるより、四角形で枠作ってクリッピングのが早い。
[x.com](https://twitter.com/bluemist_im/status/1641466630273376256)

## 文字
一文字ずつ表示と文字分割で好き勝手出来る。
[よく見る演出や効果をYMM4でやってみる4 字幕の演出色々 ～VOICEROID+CeVIO実況にYMM4を使いたい人のメモ～【ゆっくりMovieMaker4α】｜Bluemist](https://note.com/bluemist/n/necaefbcd5c71)

## もやもや
シンプレックスノイズをいろいろやってなじませるともやる。
[よく見る演出や効果をYMM4でやってみる4 字幕の演出色々 ～VOICEROID+CeVIO実況にYMM4を使いたい人のメモ～【ゆっくりMovieMaker4α】｜Bluemist](https://note.com/bluemist/n/necaefbcd5c71)

## ハーフトーン
上下に入れ、はみ出るように立ち絵を入れる程度が無難。
[網点/ハーフトーンを使ったデザイン - ymm4note](https://scrapbox.io/ymm4note/網点%2Fハーフトーンを使ったデザイン)

## PSD立ち絵チェック
中ボタン、ctrlホイールがショートカットとして存在する
効果はフォルダ内独立チェック、チェック移動
[PSD立ち絵のチェック操作はマウス中ボタン - ymm4note](https://scrapbox.io/ymm4note/PSD立ち絵のチェック操作はマウス中ボタン)

## 比率指定の-43.7
サイズと比率を使う際、縦横比さえ合わせればいいなら計算済み小数点を入れればOK
16:9なら-43.7
[縦横比-43.7は16:9比率の近似値を出せる便利な数字 - ymm4note](https://scrapbox.io/ymm4note/縦横比-43.7は16:9比率の近似値を出せる便利な数字)

## 場面切替
画面の複製と同じように機能するため、全体を変形させると後ろの黒色が見える
拡大縮小を一緒に掛けること

アニメーションはアイテムの長さそのままで適用されるので、場面に正確にエフェクトを付ける場合は変化地点に中間点を打つ必要がある。

重ねのみ
前の画像の下に後の画像を重ねるだけ。特に何かしない。
手前に描画する画像をどちらにするかは選べる。

切り替えのみ
重ねのみと同じように重ね、長さの中心まで来たら前の画像を消す。

押し出しとスライドの違い
押し出しは後の画像が動くが、スライドは動かない。紙芝居式。

[よく見る演出や効果をYMM4でやってみる5【場面転換(トランジション)】(v4.22.0.0改訂版)｜Bluemist](https://note.com/bluemist/n/n94139a3aafde)

## ディスプレイスメントマップ
取り込んだものの輝度値を使用して凹凸を付ける。グレスケ化。
凹凸はxy方向にどの程度移動させるかで表現し、それぞれの値は設定可能。

[【YMM4】ディスプレイスメントマップってどんな機能？使い方と使用例について解説！｜イクリ](https://note.com/ikuri_blog/n/n632455233894)

呼吸ができるらしい。

[【YMM4解説単発】YMM4だけで呼吸アニメーションを作る。【VOICEROID解説】 - YouTube](https://www.youtube.com/watch?v=Vo_U3nKx3zg)

ちなみに3Dだとメッシュを直接画像で動かす物。
ポリ割が足りないと表面を移動できないため、ハイポリでないと使わない。

## ぼかしのサイズ固定
画像の本来のサイズ以上にぼかしが広がらないようにする。

## Depth Mapから切抜き
Depthを配置→二値化→削除でグループ化。

## 極座標変換（描画位置）
0,0を中心にx,zを回転、yを半径として座標変換する。
範囲はいくつで一周するかを決める。

## 描画位置（極座標）
現在位置を中心に半径、角度、角度Φを加算する。

## 極座標変換
画像のx中心y上を極座標の中心とし、その逆側であるx中心y下を極座標の上開始地点として、残りのピクセルをそれに従って極座標変換する。
直交(0,1)を極(0,0),直交(0,-1)を極(0,1)といったほうが早い。

中心位置が効かない(2024/10/19)のでカスタムは難しい。
ただし3D回転の二次元配置は使える。

## 立体光
反射と立体化にハイトマップがあり、そこにデプスマップを指定すると立体にできる。

## 表情アイテムを指定しても変わらない
表情は立ち絵、ボイス、表情から指定できる。
一番下のアイテムの表情が適用される。
デフォルトは立ち絵の表情。
以上の決まりに表情を変更のチェック有無は関係ない。チェックを入れていないのは表情を変更しない、つまりデフォルトの立ち絵の表情を適用するという意味になる。

## ショートカットキーがどれか分からない
C#のkeys enumに従うのだが、結構ぐちゃぐちゃ。

[Windows日本語環境におけるJIS配列とUS配列のスキャンコードを全て列挙してみた #Keyboard - Qiita](https://qiita.com/crotczet/items/4e65684dbf12942e27f2)

## 機能の詳細が知りたい
リリースノートは以下にあるので、googleで`site:https://manjubox.net`として調べればいい。

[Home | 饅頭遣いのおもちゃ箱](https://manjubox.net)

## ボイスキャッシュ
普段からONでいい。
1分につき1MBくらい増える？
けど他のプロジェクトからデータを取ってくることが多いと、開くたびにいらない読み込みが入るのはストレス。

