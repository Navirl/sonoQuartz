---
tags:
 - Bar
 - App
aliases:
 - oobabooga
 - tgwebui
---

daily:: [2023-05-08](/Daily_Note/2023-05-08.md)
up:: [Docker](<./Docker.md>)
up:: [GAI](<../AI/AI_local.md>)
up:: [AIt](<../AI/AI_text.md>)
same:: [Tavern](<./Tavern.md>)
same:: [stable-diffusion-webui](<./stable-diffusion-webui.md>)
down:: [AIl local textchatbot](<../../Info/AIl local textchatbot.md>)

テキスト生成モデルを動かすUIとして一番有力なクライアント。
本名より製作者のoobaboogaのほうでよく呼ばれる。

ワンクリで動かすなら、本体を先に入れたりしないほうがうまく動く。
先に入れたいなら本体、GPTQ、拡張機能のrequirements.txtを手動でインストールすることになる。
GPTQはsetup_cuda.pyを実行する。リポジトリまでディレクトリ移動しないとインストーラが仕事しないので注意。

Error checking compiler version for cl
アプデとかでcl.exeへのパスが消えてることで発生する。