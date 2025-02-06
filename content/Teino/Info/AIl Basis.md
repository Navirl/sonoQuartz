---
tags:
 - Info
---

daily:: [2023-06-22](/Daily_Note/2023-06-22.md)
up:: [AI\_local](<../Bar/AI/AI_local.md>)

`nvidia/cuda:12.1.1-runtime-ubuntu22.04`をpull。
`apt update && apt install software-properties-common -y && add-apt-repository ppa:deadsnakes/ppa && apt install python3.10`でpython3.10をインストール。

bitsandbytesをインストールする場合、環境変数を書き換える。`echo $LD_LIBRARY_PATH`で確認。`libcudart.so`がそこに無い場合は追加。今回は
`export LO_LIBRARY_PATH=/usr/local/cuda-12.1/targets/x86_64-linux/lib/`とした。libcudart.soを探したい場合はplocateをインストールしてlocateコマンドで探せる。ちなみにlibcudart.so.12とかをlibcudart.soにリネームしても動く。

[Warning: "The installed version of bitsandbytes was compiled without GPU support." · Issue #112 · TimDettmers/bitsandbytes · GitHub](https://github.com/TimDettmers/bitsandbytes/issues/112)
[NameError: name 'str2optimizer8bit\_blockwise' is not defined · Issue #62 · TimDettmers/bitsandbytes · GitHub](https://github.com/TimDettmers/bitsandbytes/issues/62)
というわけで自前で学習する環境を作ったのだが、まあ全然スペック足りない。確かにGPUは使ってるんだけど、1エポック10分はちょっと。DeepSpeedを使えばまだいける？

