---
tags:
 - Bar
 - App
---

daily:: [2023-04-08](Daily_Note/2023-04-08.md)
up:: [PowerShell\_and\_Command-Line](<./PowerShell_and_Command-Line.md>)

脱出はexit。

[Windows 11 に WSL2 Ubuntu をインストールして使ってみる【誰でもできるよ】｜hiro20180901](https://note.com/hiro20180901/n/nc798a07485e2)

一度完全に落とす場合は`wsl -t name`。
`wsl -l -v`で状態を確認できる。

[WSLでUbuntuを停止（シャットダウン）する手順（WSL2） – マゴトログ シュミニイキル](https://blog.janjan.net/2021/03/25/windows10-wsl-os-running-status-check/)

最近はいろいろwindowsの設定を引き継いでくれるが、通信関係のファイアウォールとかはデフォルトでは無理っぽい。
なのでWindows側の`~/.wslconfig`に以下を書く。

```ini
# .wslconfigに書く
[wsl2]
networkingMode=mirrored
```

[WSLのミラーモードを使おう！](https://zenn.dev/roymccrain/articles/5d22f968088312)

でもこれでもwslのdockerにwindowsのollamaをつなぐとかいう変な設定は流石に無理。
大人しくwslでollamaを使う。

追記:ミラーモードを使うと何故かhttps://registry-1.docker.io/v2/に接続できなくなってしまう。
なので切った。

## docker
公式に従う。
[Ubuntu \| Docker Docs](https://docs.docker.com/engine/install/ubuntu/)

## could not select device driver "nvidia" with capabilities: gpu
wslは標準でGPUを使用しないようにしている。
なのでそれをONにする。Nvidiaドライバーをインストール。

[Installing the NVIDIA Container Toolkit — NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#docker)
[WSL でのパーミッション設定・GPU の有効化 #WSL2 - Qiita](https://qiita.com/MinadukiSekina/items/71455b433e66eb4da397)


## 環境変数をwindowsと共有
[Title Unavailable \| Site Unreachable](https://news.mynavi.jp/techplus/article/techp3798/)
[WSL2 LinuxとのWindowsの相互運用性 \[Ground Sunlight\]](http://www.y2sunlight.com/ground/doku.php?id=wsl2:interop)
[WSL その128 - Windowsの環境変数とLinuxの環境変数を相互に引き継ぎ可能に - kledgeb](https://kledgeb.blogspot.com/2017/12/wsl-128-windowslinux.html)
