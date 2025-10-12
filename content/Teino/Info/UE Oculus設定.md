---
date: 2022-10-04
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/GUI/UE5.0.2.md>)
source:: [Oculusの開発者登録　備忘録 - Qiita](https://qiita.com/nekoharuyuki/items/79c2c4fa6bf88d11b108)
source:: [Site Unreachable](https://developer.oculus.com/documentation/unreal/unreal-quick-start-guide-quest/)
source:: [Oculus Questで動くアプリをUnreal Engineで作ってみる(1) - Qiita](https://qiita.com/Azarashi-Tech/items/f69af9b496694e01c502#%E5%8F%82%E8%80%83%E3%81%AB%E3%81%97%E3%81%9F%E5%8B%95%E7%94%BB)
source:: [UE4でOculusQuest2を動かす１ - Qiita](https://qiita.com/HnniTns/items/57e1c9ade062d85a8972)

まずはMetaアカウントを作成、スマホにOculusアプリを入れてログイン、コードを使ってOculusと連携（本体情報に書いてる）。
その後アカウントを組織アカウントにグレードアップ。今回はなんか電話番号入れたら何とかなった。

次は有線接続。付属しているコードでは何故か通らなかったので、携帯のコードを流用してOKもらう。
ついでにUEのDevice ManagerでAndroidバージョンを確認、それにあったSDKを入れておく。

プロジェクト設定はいろいろ複雑。
デフォルトのタッチインターフェースをNoneにしたり、
モバイルHDRをOFFにしたり、
全画面没入モードを有効化したり、
Oculus用署名ファイル削除したりパッケージ対象にQuest指定したり。

デバッグ起動するときは、アウトプットログに注意。ずっと進みっぱなしに見えるが、RUN COMMAND STARTEDが表示される辺りからすでに起動可能になっている。

入れたアプリをQuestで起動するときは、アプリライブラリから右上の全てをタッチ、提供元不明を選択。そこにあるアプリを起動すればいい。
