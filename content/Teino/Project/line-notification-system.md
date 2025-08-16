「あまりにもLINE通知が来ないので、LINEログインを元に新規メッセージの内容だけを通知するwailsアプリを作成したいです。必要なAPIと関数を列挙してください。」

というFeloへの質問から始めた奴。最終的にwindowsのline通知をUWPで拾ってpythonでタスクトレイアイコンと設定UI作ってwailsにWSSでつないで送ることに。

## .NETは使わないのか
場合によって取得できない、複雑という話が合ったので敬遠。結果UWPの複雑性に殴られている。pythonでの直取得も同様。

## msbuildが通らない
通知を拾うためにwindowsのSDKが必要。そのバージョンを指定する必要がある。
バージョンは対象のcsprojで
```
<TargetPlatformVersion Condition=" '$(TargetPlatformVersion)' == '' ">10.0.19041.0</TargetPlatformVersion>
    <TargetPlatformMinVersion>10.0.17763.0</TargetPlatformMinVersion>
```
みたいな感じで指定されてるのだが、これがx86にしか書いておらずx64には設定されていない。原因か？と思ったがこれで全体設定らしい。

## 画像がペイロードされない

めんどいので全部pythonに移行。

