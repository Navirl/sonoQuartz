---
tags:
 - Info
---

daily:: [2023-04-08](/Daily_Note/2023-04-08.md)
up:: [Unreal\_Engine](<../Bar/App/Unreal_Engine.md>)

## UE Android SDK
マジでめんどくさかった。UE5.0.1。

まずはAndroid Studioのバージョンを確認。3.5.3が推奨されているが4.0がいいらしい。現在からみるとかなり古いので注意。特にScoopで入れると問答無用の最新なので。

[Androidで実機プレイとパッケージ化する方法【UE5,UE4】](https://zenn.dev/daichi_gamedev/books/unreal-engine-5/viewer/android-play)
[Unreal Engine に Android SDK および NDK を設定する | Unreal Engine ドキュメント](https://docs.unrealengine.com/4.27/ja/SharingAndReleasing/Mobile/Android/Setup/AndroidStudio/)

[Unreal Engine 4.25 で必要な Android NDK 21 のセットアップに関する最新情報](https://www.unrealengine.com/ja/tech-blog/updates-to-required-setup-for-android-ndk-21-in-unreal-engine-4-25)
[Android Studio のダウンロード アーカイブ  |  Android デベロッパー  |  Android Developers](https://developer.android.com/studio/archive)


ところがUEでAndroid NDKをインストールしようと思い、本体のAndroid用バッチファイルを開くと`\Microsoft was unexpected at this time.`が発生。
ちなみにこのバッチは対応するSDK,NDK,CMAKE,build toolを入れてくれる優れもの。確認したいならAndroid StudioでShow Package Detailにチェック。

普通は環境変数のPathに""が入っているとこのエラーが出るらしい。そうでなくてもファイルパスに""が入ってても出るとか。
何度見てもそれらしいものなし。Android Studioも空白のないフォルダに入れなおしたがやはり失敗。

[\Microsoft was unexpected at this time.](https://social.msdn.microsoft.com/Forums/vstudio/en-US/21821c4a-b415-4b55-8779-1d22694a8f82/microsoft-was-unexpected-at-this-time?forum=vssetup)
[Windows 64bitのPATH設定 - Qiita](https://qiita.com/alleum/items/fd6f806b01d6f573943e)

ならばと上からコピーしていって試していくと、どうもこの辺が怪しいと判明。
76-81行目。特にIF文。

```cmd
where.exe /Q adb.exe
IF /I "%ERRORLEVEL%" NEQ "0" (
	echo Current user path: %USERPATH%
	setx PATH "%USERPATH%;%PLATFORMTOOLS%"
	echo Added %PLATFORMTOOLS% to path
)
```

とりあえずここをremでコメントアウトすると、今度はSdkmanager.batでエラー。
ここで一旦諦める。


より調べると、`%USERPATH%`が原因と判明。ユーザー名に括弧が入ってるのが問題だったらしい。入っていないが、この投稿通りUSERPATHに""を付けると直った。
[Android "SetupAndroid.bat" keeps giving this error "was unexpected at this time." UE 4-26 - #2 by J0hn-C0nn0r - Mobile - Unreal Engine Forums](https://forums.unrealengine.com/t/android-setupandroid-bat-keeps-giving-this-error-was-unexpected-at-this-time-ue-4-26/269323/2)

……と思いきや、Sdkmanager.batのエラーが再発。
今度はクリア。82行目で参照しているSdkmanager.batが古いモノらしい。Android Studioプラグインとして新しくCommand line toolをインストールし、それを参照するように82行目を修正する。

[SetupAndroid.bat UE4.25 Error - #17 by Hargrimms - Mobile - Unreal Engine Forums](https://forums.unrealengine.com/t/setupandroid-bat-ue4-25-error/464836/17)

しかし今度はビルド時にNDKROOTがつながっていないとエラーしまくる。
仕方ないので公式ガイド通り4.0を入れる。だってこんな記事あったんだもの。

[UE5・UE4.25以降でAndroidビルドできるようにする（Windows環境）](https://zenn.dev/korinvr/articles/ue5-android-build)

またUE側の設定も行う。SDK,NDK,JDKのパスとAPIバージョン指定。APIは対応するものをAndroid Studioでダウンロードしておく。

[Manually set Android SDK and NDK on UE 5 for M1 MacOS? - #2 by Scionate - Mobile - Unreal Engine Forums](https://forums.unrealengine.com/t/manually-set-android-sdk-and-ndk-on-ue-5-for-m1-macos/523628/2)
[Is Android Studio 4.0 still mandatory for Mobile (-AR/VR) developement in UE5? - #2 by MondRubberduck - Mobile - Unreal Engine Forums](https://forums.unrealengine.com/t/is-android-studio-4-0-still-mandatory-for-mobile-ar-vr-developement-in-ue5/530629/2)

ここでようやくビルドが通る。

ちなみに、まさかと思ってAndroid Studioの最新版をScoopインストールして`C:\Program Files\Android\Android Studio\`向けにシンボリックリンク通すと結局最新版でも動いた。
つまりどこかのパスがここを通っているということなんだろうが。


要するに、
- Android Studioがあって
	- `C:\Program Files\Android\Android Studio\`を通ってStudioにアクセス出来て
	- Android SDK Command-line Tools(latest)をインストールしてて
- UEのコマンドラインツールでSDK,NDK,CMAKE,build toolを入れて
- 開発したいAndroidバージョンのSDKをAndroid Studioで入れて
- UEのパスを正しく設定

すれば動く。

2022/09/17
なんかシンボリックリンクが効かなくなってたので、CにStudioをインストールし直してジャンクションにした。

## Intel HAXM installation failed.
特にHyper-Vは使ってないが、Windows Sandboxが内部で同じような機能を使っていた気がする。
取りあえずHyperviserをONにしてインストしなおした。
[Windows10へのAndroid Studio のインストールでHAXM インストールが失敗する - Qiita](https://qiita.com/taketakekaho/items/b15e60e278ac4ed69706)

## 確立された接続がホスト コンピューターのソウトウェアによって中止されました
ほかにもadbを使ってるやつがいるとこうなるとか。
でもUE一個にしても直んなかった。いちおう携帯を再起動すると直った。は？
[Eclipse ADT「確立された接続がホスト コンピューターのソウトウェアによって中止されました。」 - iwanami10's blog](https://iwana.hateblo.jp/entry/2013/01/20/093022)