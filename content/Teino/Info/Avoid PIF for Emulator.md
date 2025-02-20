---
date: 2024-11-23
tags:
  - Info
---

up:: [Eclipse](<../Bar/Eclipse.md>)

とにかくFPを偽装してplay integrityを回避、さらにmagisk hideや後継のdenylistを使用してroot使用を隠蔽、最後にmagisk自体を検知されないよう偽装という流れ。
PI回避とroot隠蔽と本体隠蔽が出来れば要は何でもいい。

## Play Integrity

SafetyNet is used former, but Play Integrity Fix now.
(Apps have introduced Play Integrity in reason)
[Site Unreachable](https://mitanyan98.hatenablog.com/entry/2022/01/27/233421)
[Site Unreachable](https://mitanyan98.hatenablog.com/entry/2021/10/06/092850)
[PSA: SafetyNet has been replaced by Play Integrity : r/androidroot](https://www.reddit.com/r/androidroot/comments/z7yysu/psa_safetynet_has_been_replaced_by_play_integrity/)

play integrityはFingerprintで端末を管理しており、FPが不正っぽい動き(急に単一のFPから1万アクセスが来たり)をしていたらGoogle側からBANできる。
なのでBANされないようにいろんなFPを使っていこうねと言うのが今の流れ。
[Play Integrity Fixのつかいかた(v14系列&dev対応/2024年版)｜MONE FIERA](https://note.com/forsaken_love02/n/n544b7945396c?sub_rt=share_pw)

調べていくとxiaomiのFPが有望視されてるっぽい。
米中の摩擦で禁止されにくいとか。たしかPIFのissueに書いてた。

## APatch
現在(2024/11/23)APatchという方法が主流っぽい。
他がユーザーレベルの中Kernelベースで変更する。

[FAQ | APatch Docs](https://apatch.dev/faq.html)

boot.imgが必要になる。たいていは何とかROMを入手して抽出することになる。
エミュの場合は仮想ディスクを漁ると出てくる。.vmdkを見つけ、内部の.imgを開く。kernelとramdiskが含まれていればその.imgがboot.img。

[\[GUIDE\]Magisk, SuperSU and Xposed for MEmu 7.3.2 or LDPlayer 4.0.45 | Page 3 | XDA Forums](https://xdaforums.com/t/guide-magisk-supersu-and-xposed-for-memu-7-3-2-or-ldplayer-4-0-45.4222919/page-3#post-84723623)

そのはずなのだが、上手く動かない。

boot.imgのサイズがエミュレータだと同じでなければならないらしい。こいつが別のパーティションramdiskに保存されており、それが非常に小さいため。
なのでパッチ当てて多少大きくなったりするとアウトになる。
つまりboot.imgが要らないkitsune maskしかほぼ使えない。
[How to install Kitsune Mask (Magisk Delta) on Android emulators (Easy installation)](https://www.andnixsh.com/2024/09/how-to-install-kitsune-mask-magisk.html)


## Kitsune Mask（Magisk）

noxで動かす何かしら。
効かなかった。noxはインストール自体は上手くいくのだが、rootを切った後にスーパーユーザーの欄がグレーアウトしたままになる。
[Mumu Android 12: Magisk magic mount bind mount built-in /system/bin/su su to magisk's mounted simlink su when /system/bin/su exists · Issue 8 · HuskyDG/magisk-files · GitHub](https://github.com/HuskyDG/magisk-files/issues/8)

memu。ダメ。
インストールの時点で失敗する。

下のが動いたので必要なくなったガイド
[androidエミュレーターにmagiskを入れてパケットキャプチャをする｜RARYA](https://note.com/rarya/n/n3ee92c2c56d6)


bluestacksを使用。
tweakerは更新停止してるらしい。代替で示されている方法は動かなかった。そもそも外部アプリを入れるので面倒というのはある。
[BlueStacks Tweaker - Official Site](https://bstweaker.ru)

bluestacksをkitsune maskで使用する。

[GitHub - RobThePCGuy/Root-Bluestacks-with-Kitsune-Mask: Steps to root Bluestacks 5 with Kitsune Mask without any external tools.](https://github.com/RobThePCGuy/Root-Bluestacks-with-Kitsune-Mask)

動いたには動いたが、チェックが通らない。
また直でのmagiskのバージョンアップができない。本家アプリはインストールできるが、本体をインストールできない。よって最終バージョンは下記のβ版27001。
[Releases · HuskyDG/magisk-files](https://github.com/HuskyDG/magisk-files/releases)

そのままやるとなぜか弾かれたが、bluestacksを再インストールすると動いた。
使用バージョンはv26.4-kitsune-2。

## ZygiskNext
[GitHub - Dr-TSNG/ZygiskNext: Standalone implementation of Zygisk](https://github.com/Dr-TSNG/ZygiskNext)
Zygiskの代替。MagiskからZygiskだけ切り出したもの。
更新が活発でこちらを使うのがいいのだが、kitsuneだと入れて組み込みZygiskを切った時点で全て止まってしまった。

[\[Bug\] None of the modules using Zygisk work 使用zygisk的模块表现为不工作，尽管模块似乎工作 · Issue 157 · Dr-TSNG/ZygiskNext · GitHub](https://github.com/Dr-TSNG/ZygiskNext/issues/157)
## PixelFlasher
Pixelをいろいろできるやつ。
その一部にpif editorがついており、好きなだけガチャできる。

[📳🔥 PixelFlasher, a GUI tool for flashing / updating / rooting / managing Pixel phones. | XDA Forums](https://xdaforums.com/t/pixelflasher-a-gui-tool-for-flashing-updating-rooting-managing-pixel-phones.4415453/#post-87412305)
[Use Custom Fingerprint/Build.Prop to Pass Play Integrity Test](https://droidwin.com/use-custom-fingerprint-build-prop-to-pass-play-integrity-test/)
[List of custom fingerprints/JSON/build prop that pass Play Integrity](https://droidwin.com/list-of-custom-fingerprints-json-build-prop-that-pass-play-integrity/)

ただしADB接続したmagisk付きスマホが必要。
BluestacksはADBの設定があるのでONにしておく。

## PlayIntegrityFix
詰まった。play integrityを回避するためのfingerprintを書き換えるPlayIntegrityFixがFPを書き換えてくれない。
[GitHub - chiteroman/PlayIntegrityFix: Fix Play Integrity (and SafetyNet) verdicts.](https://github.com/chiteroman/PlayIntegrityFix)

Play IntegrityはSPICというアプリの他、Play Storeの開発者オプションからも確認できる。
単体アプリだと1日10000回までしかAPI呼出し出来ないらしい。なので駄目そうだったらStoreへ。
[GitHub - herzhenr/spic-android: A Simple Play Integrity Checker which uses Google Play Integrity API to check the Integrity of the Device](https://github.com/herzhenr/spic-android)
[SPIC - Play Integrity Checker - Google Play のアプリ](https://play.google.com/store/apps/details?id=com.henrikherzig.playintegritychecker)
[Android Integrity Checker - Google Play のアプリ](https://play.google.com/store/apps/details?id=com.thend.integritychecker)
[Play Integrity API Checker - Google Play のアプリ](https://play.google.com/store/apps/details?id=gr.nikolasspyr.integritycheck)
[ルートビア新鮮な - Google Play のアプリ](https://play.google.com/store/apps/details?id=com.kimchangyoun.rootbeerFresh.sample)

なんかどれもそもそもチェック自体ミスってるような……
Play Storeと通信できてない気がする。

PIFは/data/adbのpif.jsonから書き換えるFPを読み込んでいる。
なのでこのファイルを直接書き換えれば好きにFPを決められる。
以下は起動のたびにpif.jsonを書き換えるzygisk mod。使われていない？
[GitHub - daboynb/playcurlNEXT](https://github.com/daboynb/playcurlNEXT)


というかnoxはなぜかインストール時のオプションが表示されない。バグ？

そもそもzygisk modはARM用で、x86に対応している物は少ないという指摘。
[How to install Kitsune Mask (Magisk Delta) on Android emulators (Easy installation)](https://www.andnixsh.com/2024/09/how-to-install-kitsune-mask-magisk.html)


syntax error: unexpected "fi" (expecting "then")
WSLでautopif2.shを使おうとしたときのエラー。
改行コードが違う可能性がある。LFじゃないと正しく読めない。

[bashの構文が間違っていないのにSyntaxエラーで失敗する問題｜mokunin](https://note.com/note_is_poo/n/n5b90df4a11e6)


大体いったが、Magisk uds checkerで止まる。
対象のファイルを440にするmod。shamikoとか標準のDenylistで本来十分のはずなので必要ない。
[Release Magisk UDS Check Bypass · SecureCodeSolutionsDev/Oitache-Mroane · GitHub](https://github.com/SecureCodeSolutionsDev/Oitache-Mroane/releases/tag/Root)


error -17 integrity api error (-17): there is a transient error on the calling device
デバイス側のエラー。
PIFをバージョンアップしたりするくらいしかない。pifがおかしいだけなので頑張って正常なpif探せという声も。
[\[HELP\] Error getting token from Google : r/Magisk](https://www.reddit.com/r/Magisk/comments/1dz5i7i/help_error_getting_token_from_google/)


要するに、PIF云々以前にエミュ判定が辛い。
今はどうしようもない。

## pif詳細

[🔧 \[MODULE\] Play Integrity Fix (SafetyNet fix) | Page 177 | XDA Forums](https://xdaforums.com/t/module-play-integrity-fix-safetynet-fix.4607985/page-177#post-89189572)
[Site Unreachable](https://xdaforums.com/t/how-to-search-find-your-own-fingerprints-noob-friendly-a-comprehensive-guide-w-tips-discussion-for-complete-noobs-from-one.4645816/)
[\[News\] Custom PIF.JSON files collection for Play Integrity Fix : r/Magisk](https://www.reddit.com/r/Magisk/comments/18myolm/news_custom_pifjson_files_collection_for_play/)
[PIF FAQ | XDA Forums](https://xdaforums.com/t/pif-faq.4653307/)

## Zygisk Assistant
rootとzygisk隠蔽強化。
shamikoと同じ。

[GitHub - snake-4/Zygisk-Assistant: A Zygisk module to hide root for KernelSU, Magisk and APatch, designed to work on Android 5.0 and above.](https://github.com/snake-4/Zygisk-Assistant)

## Android Studio Emulator
公式の奴。
まともに下記のアプリで認証迄持っていけるのがこれくらいしかない。
[Play Integrity API Checker - Google Play のアプリ](https://play.google.com/store/apps/details?id=gr.nikolasspyr.integritycheck)


[GitHub - shakalaca/MagiskOnEmulator: Install Magisk on Official Android Emulator](https://github.com/shakalaca/MagiskOnEmulator)

rootAVDを使用したが、your device needs reflash magiskが出たため断念。
[newbit / rootAVD · GitLab](https://gitlab.com/newbit/rootAVD)

appLicensingVerdict UNEVALUATED
appRecongnitionVerdict UNEVALUATED