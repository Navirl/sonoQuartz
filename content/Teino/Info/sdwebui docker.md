---
date: 2023-04-15
tags:
 - Info
---

up:: [Docker](<../Bar/App/Docker.md>)
up:: [AI\_local](<../Bar/AI/AI_local.md>)
up:: [stable-diffusion-webui](<../Bar/App/stable-diffusion-webui.md>)

SDやWDを動かす奴。
VRAM結構食うので設定注意。

[GitHub - AUTOMATIC1111/stable-diffusion-webui: Stable Diffusion web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

launch.pyがrootではうごかないのでユーザーを作る。
rucやexecの-uは既に存在するユーザーにログインするオプションっぽい。このidはidコマンドで確認でき、rootは0で一般ユーザーは1000から順にIdMサーバーなるもので割り振られるらしい。
なので普通にrootで入って`useradd ユーザー名`を使いユーザー追加、runの-uでユーザー名を指定して入ったほうがよさそう。ちなみに削除は`userdel`、パスワードは`passwd`。adduserでもいい。
既定だとhome以下に権限がないので、rootから`chmod 777 -R home`などとして権限を渡しておく。chownでもいい。

[Dockerでrootとuserを切り替えてコンテナに入る - Qiita](https://qiita.com/Nahuel/items/d11d169ba7c40b413e6b)
[第2章 Identity Management サーバーのインストールおよびアンインストール Red Hat Enterprise Linux 7 | Red Hat Customer Portal](https://access.redhat.com/documentation/ja-jp/red_hat_enterprise_linux/7/html/linux_domain_identity_authentication_and_policy_guide/installing-ipa)

libGL.so.1が無いって言われるのでlibgl1をインストール。
libgthread-2.0.so.0が無いのでlibglib2.0-0をインストール。
普通のlinuxには入ってるらしい。

[Problem running / installing on WSL · Issue 790 · AUTOMATIC1111/stable-diffusion-webui · GitHub](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/790)


これを見ながらdocker初期設定。

[stable-diffusion-webui-docker/Dockerfile.Lite at main · camenduru/stable-diffusion-webui-docker · GitHub](https://github.com/camenduru/stable-diffusion-webui-docker/blob/main/Dockerfile.Lite)

まずイメージ。NVIDIAのcudaインストール済みを使う。
そのまま使うために`-it`、
ブラウザ開くためのポート開くために`-p`、手前がホストで奥がゲスト。
GPU使うので`--gpus`。allにしとけば複数のGPUでも読み込む。
念のため尻尾にコマンド。これ無いとbashを開かないイメージ(python)見たので。
`docker run -ti -p 7860:7860 --gpus all nvidia/cuda:11.7.1-base-ubuntu22.04 bash`

次にコマンド。
`apt update && apt install git wget adduser python3 python3-venv libgl1 libglib2.0-0 git-lfs`

ユーザー追加。rootユーザーだとwebui.shが実行できない。
別に標準の`useradd`でもユーザーは追加できるが、`adduser`を使うことで対話形式でホームディレクトリ変更したりパスワード設定したりできるらしい。あとubuntuが推してる。
パスワード無しにするために`--disabled-password`、
他の入力を省略するために`--gecos ''`、
ユーザー切り替えるために`su`、
ユーザーの所有するディレクトリに飛ぶために`cd $home`。
`adduser --disabled-password --gecos '' seika && su seika && cd $home`

あとは公式。
`bash <(wget -qO- https://raw.githubusercontent.com/AUTOMATIC1111/stable-diffusion-webui/master/webui.sh)`

途中でルートユーザーが欲しくなった時。containerをIDで入力する場合は補完がかかるため、他と違うなら頭の3文字程度でも動く。
`docker exec -it container bash`

次から起動するときは、`webui.sh`に適切にオプションを渡せばOK。`launch.py`からだと仮想環境を認識しない。`webui.sh`の中を見るに、`source venv/bin/activate`を打てば仮想環境が起動していけそう？

`source`コマンドは、シェルスクリプトを現在のシェルセッションで実行するためのコマンドです。通常、シェルスクリプトはサブシェルで実行されますが、`source`コマンドを使用すると、スクリプト内で定義された変数や関数が現在のシェルセッションで使用可能になります。

例えば、仮想環境のアクティブ化スクリプトは、仮想環境内のPythonインタープリターを使用するように環境変数を設定します。このスクリプトを`source`コマンドで実行することにより、現在のシェルセッションで仮想環境がアクティブ化されます。

ただし--listenは必ずつけて置かないとブラウザで開けない。このフラグを付けると**ホームネットワークからアクセスできるようになる**ため、標準だと拡張機能を入れることが出来なくなっている。`--enable-insecure-extension-access`を付ければ行けるが使用注意。`docker run -p 127.0.0.0:7890:127.0.0.0:7890`は普通に通してくれない。
[Command Line Arguments and Settings · AUTOMATIC1111/stable-diffusion-webui Wiki · GitHub](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Command-Line-Arguments-and-Settings)
[[Bug]: AssertionError: extension access disabed because of commandline flags · Issue 4215 · AUTOMATIC1111/stable-diffusion-webui · GitHub](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/4215)

前提として、コンテナはホストマシンとは別のIPアドレスを持っている。だから簡単にはアクセスできない。wslも同じなのに何であっちは繋げられるんだ。
[コンテナーのネットワーク | Docker ドキュメント](https://matsuand.github.io/docs.docker.jp.onthefly/config/containers/container-networking/)
[WSL を使用したネットワーク アプリケーションへのアクセス | Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/wsl/networking)
127.0.0.0はループバックアドレス。自分に返ってくる接続。一方0.0.0.0は接続をリッスンする（ファイアウォールが接続を許可している）ためのアドレス。他のネットワークからも接続できる。

dockerをホストネットワークスタックを共有するようにコンテナを起動する方法がある。ネットワークスタックはネットワーク構成という意味。`-network=host container`フラグをdocker runにくっつければいい。ただしlinux通してスタックにアクセスできちゃうってことなので結構危ない。

[How to Connect to Localhost Within a Docker Container](https://www.howtogeek.com/devops/how-to-connect-to-localhost-within-a-docker-container/)

外部からモデルファイルを入れるときは、`docker cp localpath container:path`でコピーする。あて先は`models/Stable-diffusion`。SDだとCheckpointと呼ばれてるっぽいのか。

メモリは制作中で7.3GBくらい。
ブラウザ二個点けると普通に死ぬ。

とりあえず調べて適当に。

masterpiece,best quality,detailed,1girl,solo,loli

(worst quality, low quality:1.4), (lip, nose, tooth, rouge, lipstick, eyeshadow:1.4), (jpeg artifacts:1.4), (depth of field, bokeh, blurry, film grain, chromatic aberration, lens flare:1.0), (abs, muscular, rib:1.0), greyscale, monochrome, dusty sunbeams, trembling, motion lines, motion blur, emphasis lines, text, title, logo, signature, completely nude,

![00000-3174189050](<../images/00000-3174189050.png>)

元のプロンプトではnsfwが入ってた。
そういう用途、しかもcompletely nudeを弾く徹底ぶり。

[(request) loli – AbyssOrangeMix3 AOM3A1B.safetensors [9600da17] | erompt](https://erompt.com/request-loli-9600da17-aom3a1b/)

開くとR-18なので注意。

ちなみに途中で生成止めると顔だけぱきっとしてて黒目がでかいホラー画像になる。
出来ちゃったから貼ろうとしたけどやめた。何が悲しくて自分のメモでダメージ受けなきゃならんのだ。

---

```
modules.devices.NansException: A tensor with all NaNs was produced in Unet. This could be either because there's not enough precision to represent the picture, or because your video card does not support half type. Try setting the "Upcast cross attention layer to float32" option in Settings > Stable Diffusion or using the --no-half commandline argument to fix this. Use --disable-nan-check commandline argument to disable this check.
```

コミュニティも原因を掴み切れない謎エラー。
[[Bug]: A tensor with all NaNs was produced in Unet · Issue 6923 · AUTOMATIC1111/stable-diffusion-webui · GitHub](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/6923)

注文通りに引数付けても変化なし。
設定のStable Diffusionの項、`Upcast cross attention layer to float32`をONにすれば直るという話が大半だが、効果なし。

デフォルトのモデルを一回読み込んでから、もう一度目的のファイルを読み込ませるといいという話も。初回起動時にモデルファイルを配置してるとデフォルトモデルがダウンロードされないので、ここからダウンロードしておく。
[runwayml/stable-diffusion-v1-5 at main](https://huggingface.co/runwayml/stable-diffusion-v1-5/tree/main)

結局`--disable-nan-check`だけつけ、upcastなんたらはチェック外すと動いた。

`set COMMANDLINE_ARGS=--autolaunch --no-half --disable-nan-check --medvram --api`