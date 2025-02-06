---
tags:
 - Info
---

daily:: [2023-04-10](/Daily_Note/2023-04-10.md)
up:: [Docker](../Bar/App/Docker.md)
up:: [AIl](../Bar/AI/AI_local.md)
up:: [AIt](../Bar/AI/AI_text.md)
up:: [text-generation-webui](../Bar/App/text-generation-webui.md)

だいたいはここの手法に沿えばいい。
特にwindowsで動かすなら全自動かつ独立環境を提供するインストーラーがあるので、ダウンロード時間を考慮しなければすぐ使える。

[GitHub - oobabooga/text-generation-webui: A gradio web UI for running Large Language Models like LLaMA, llama.cpp, GPT-J, Pythia, OPT, and GALACTICA.](https://github.com/oobabooga/text-generation-webui)

しかしいろんな追加コンテンツの入れ方はlinux前提でwikiに書いてあるので、結局dockerで動かすことにした。


ubuntuコンテナから。gpuを認識させる必要があるので、`docker run`に`--gpus all`で全てのGPUを認識させる。
conda入れてpythonバージョンを3.10.9に決め打ち、c++のビルド環境をaptからbuild-essentialで入れ、torchとtorchvisionとtorchaudioを入れた後リポジトリをクローンしrequirements.txtで必要なライブラリを突っ込む。requirements.txtにはbuild-essentialが必須なライブラリllama-cpp-pythonが混じっているので必ず入れる。

ここまでやってもcudaが入ってないって怒られるかも。
cudaはwsl2で動かしてる場合だとコンテナ上にcuda toolkitをインストールする形になる。必須。
cudaは11.7を決め打ちで要求してくるので、redditのTroubleshootingをよく見て11.7をインストールする。cuda-11-7のインストールでもいい気はするけど。

[LLaMA model · oobabooga/text-generation-webui Wiki · GitHub](https://github.com/oobabooga/text-generation-webui/wiki/LLaMA-model)
[Reddit - Dive into anything](https://www.reddit.com/r/LocalLLaMA/comments/11o6o3f/how_to_install_llama_8bit_and_4bit/)

llama-7b-4bitを使う場合は、`--wbit 4`を指定する。
ロードするファイルが4bitと8bitで別なのでそれを指定するオプション。

[NameError: name 'quant\_cuda' is not defined · Issue #228 · oobabooga/text-generation-webui · GitHub](https://github.com/oobabooga/text-generation-webui/issues/228)

NameError: name 'quant_cuda' is not definedはGPTQリポジトリのsetup_cuda.pyを起動すればいい。`python setup_cuda.py install`

[WSL - NameError: name 'quant\_cuda' is not defined · Issue #371 · oobabooga/text-generation-webui · GitHub](https://github.com/oobabooga/text-generation-webui/issues/371)

llama-7b-4bitは全角スペースが読めないらしい。

.binファイルはllama.cpp用のファイル。名称頭にggmlを付けないとllama.cppとして読み込んでくれない。またmodels以下に適当なフォルダを作ってその中にbinを入れること。


docker run -it --rm --gpus all -p 7860:7860 -p 5000:5000 new2     

python server.py --auto-devices --listen --listen-port 7860 --extension google_translate --model gpt4all-lora-quantized


[深層学習モデル軽量化技術まとめ - Qiita](https://qiita.com/Nurkic/items/a382fc84a34fd0ae9400)


結局帰ってくるwindows版。
引数付けて実行したいときは`cmd_windows.bat`を実行すれば、仮想環境下でcmd実行してくれるみたいなので、そこからserver.pyをつければいい。

rwkvを使う場合は`--rwkv-strategy`を付けることで、モデルそのものを圧縮したりcpuに処理を任せたりできるらしい。渡すときは""を付ける。

[おうちの8GB VRAM GPUでChatRWKVと会話する - きしだのHatena](https://nowokay.hatenablog.com/entry/2023/03/28/192028)
[ChatRWKVを日本語で試す(Windows11, VRAM 11GB環境）｜松xRのnote｜note](https://note.com/eurekachan/n/na87bd5319dfc)
[rwkv · PyPI](https://pypi.org/project/rwkv/)


