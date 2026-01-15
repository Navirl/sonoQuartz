---
date: 2025-03-09
time: 13:04
tags:
  - Bar
---

up::

android debug bridge。デバイスと通信するための多用途コマンドラインツール。
これが通るAndroidは大体何でもできる……というのは前の話で、今は色々Android側にセキュリティチェックが入ったので設定してないと一部の機能が使えない。アプリインストールとか画面操作とか。

これを通している間はファイル共有でのエクスプローラーからのファイル確認が出来ないっぽい。

## chromeのタブ出力
```
adb forward tcp:9222 localabstract:chrome_devtools
wget -O tabs.json http://localhost:9222/json/list
```

chromeはこれで行けたがsoulbrowserは出力できなかった。
`chrome:inspect/#devices`には出るので、何か方法があるはず。

[AndroidのChromeアプリで開いているタブのURLを全部取得する方法 - j3iiifn’s blog](https://j3iiifn.hatenablog.com/entry/2019/07/14/193000)
[GitHub - machinateur/tab-transfer: A tool to transfer Google Chrome tabs from your Android or iPhone to your computer.](https://github.com/machinateur/tab-transfer)
[Chrome DevTools MCPをリモート環境かつ複数ユーザーで使うためのセットアップ手順（VcXsrv × SSH X11）](https://zenn.dev/yutoi/articles/568324684ffb01)